import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@18.5.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

const AFFILIATE_COMMISSION_RATE = 0.07; // 7% prowizji

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

// Funkcja do przetwarzania prowizji partnerskiej
async function processAffiliateCommission(
  stripe: Stripe,
  supabase: any,
  customerId: string,
  amountPaid: number,
  currency: string,
  paymentIntentId: string
) {
  try {
    logStep("Processing affiliate commission", { customerId, amountPaid, currency });

    // Pobierz email klienta ze Stripe
    const customer = await stripe.customers.retrieve(customerId);
    if (!customer || customer.deleted) {
      logStep("Customer not found or deleted");
      return;
    }

    const customerEmail = (customer as Stripe.Customer).email;
    if (!customerEmail) {
      logStep("Customer has no email");
      return;
    }

    // Znajdź użytkownika w Supabase po emailu
    const { data: users } = await supabase.auth.admin.listUsers();
    const payingUser = users?.users?.find((u: any) => u.email === customerEmail);
    
    if (!payingUser) {
      logStep("No user found for email", { email: customerEmail });
      return;
    }

    logStep("Found paying user", { userId: payingUser.id });

    // Sprawdź czy ten użytkownik był polecony
    const { data: conversion } = await supabase
      .from('affiliate_conversions')
      .select('id, referrer_id')
      .eq('referred_user_id', payingUser.id)
      .single();

    if (!conversion) {
      logStep("User was not referred by anyone");
      return;
    }

    logStep("Found referrer", { referrerId: conversion.referrer_id });

    // Sprawdź czy polecający ma połączone konto Stripe Connect
    const { data: affiliateAccount } = await supabase
      .from('affiliate_accounts')
      .select('stripe_connect_account_id, onboarding_complete')
      .eq('user_id', conversion.referrer_id)
      .single();

    if (!affiliateAccount || !affiliateAccount.onboarding_complete) {
      logStep("Referrer doesn't have completed Stripe Connect account - saving pending commission");
      
      // Zapisz prowizję jako pending (bez transferu)
      const commission = Math.round(amountPaid * AFFILIATE_COMMISSION_RATE);
      await supabase.from('affiliate_conversions').update({
        amount: amountPaid,
        commission: commission,
        status: 'pending_payout',
        plan_type: 'subscription',
      }).eq('id', conversion.id);
      
      return;
    }

    // Oblicz prowizję (7%)
    const commissionAmount = Math.round(amountPaid * AFFILIATE_COMMISSION_RATE);
    logStep("Calculated commission", { 
      amountPaid, 
      commissionRate: AFFILIATE_COMMISSION_RATE, 
      commissionAmount 
    });

    // Wykonaj transfer na konto Connect polecającego
    const transfer = await stripe.transfers.create({
      amount: commissionAmount,
      currency: currency.toLowerCase(),
      destination: affiliateAccount.stripe_connect_account_id,
      description: `Prowizja partnerska za polecenie użytkownika`,
      metadata: {
        referrer_id: conversion.referrer_id,
        referred_user_id: payingUser.id,
        payment_intent_id: paymentIntentId,
      },
    });

    logStep("Transfer created", { transferId: transfer.id, amount: commissionAmount });

    // Zaktualizuj rekord konwersji
    await supabase.from('affiliate_conversions').update({
      amount: amountPaid,
      commission: commissionAmount,
      status: 'paid',
      stripe_transfer_id: transfer.id,
      paid_at: new Date().toISOString(),
      plan_type: 'subscription',
    }).eq('id', conversion.id);

    logStep("Affiliate conversion updated");

  } catch (error) {
    logStep("Error processing affiliate commission", { error: String(error) });
    // Nie rzucamy błędu - nie chcemy aby błąd w prowizji zablokował główną płatność
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2025-08-27.basil',
    });

    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      logStep('No stripe signature found');
      return new Response(JSON.stringify({ error: 'No signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.text();
    let event: Stripe.Event;

    try {
      const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
      if (webhookSecret) {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } else {
        console.warn('No webhook secret configured, parsing without validation');
        event = JSON.parse(body);
      }
    } catch (err) {
      logStep('Webhook signature verification failed', { error: String(err) });
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    logStep('Processing webhook event', { type: event.type });

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        logStep('Checkout session completed', { sessionId: session.id, mode: session.mode });

        // Update payment status for one-time payments
        if (session.mode === 'payment') {
          const { error: paymentError } = await supabase
            .from('payments')
            .update({ 
              status: 'completed',
              stripe_payment_intent_id: session.payment_intent as string,
            })
            .eq('stripe_payment_intent_id', session.id);

          if (paymentError) {
            logStep('Error updating payment', { error: paymentError });
          }

          // Przetwórz prowizję partnerską dla płatności jednorazowych
          if (session.customer && session.amount_total) {
            await processAffiliateCommission(
              stripe,
              supabase,
              session.customer as string,
              session.amount_total,
              session.currency || 'pln',
              session.payment_intent as string
            );
          }

          // Update appointment payment status
          const appointmentId = session.metadata?.appointmentId;
          if (appointmentId) {
            await supabase
              .from('appointments')
              .update({ payment_status: 'paid', status: 'confirmed' })
              .eq('id', appointmentId);
          }
        }

        // Handle subscription creation
        if (session.mode === 'subscription' && session.subscription) {
          const { error: subError } = await supabase
            .from('subscriptions')
            .insert({
              user_id: session.metadata?.userId,
              stripe_subscription_id: session.subscription as string,
              stripe_customer_id: session.customer as string,
              plan_type: session.metadata?.planType || 'therapist',
              status: 'active',
              current_period_start: new Date(session.created * 1000).toISOString(),
            });

          if (subError) {
            logStep('Error creating subscription', { error: subError });
          }
        }
        break;
      }

      // KLUCZOWE: Prowizja przy każdej udanej płatności subskrypcji (miesięcznej)
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        logStep('Invoice payment succeeded', { 
          invoiceId: invoice.id, 
          customerId: invoice.customer,
          amountPaid: invoice.amount_paid 
        });

        // Przetwórz prowizję partnerską
        if (invoice.customer && invoice.amount_paid > 0) {
          await processAffiliateCommission(
            stripe,
            supabase,
            invoice.customer as string,
            invoice.amount_paid,
            invoice.currency || 'pln',
            invoice.payment_intent as string || invoice.id
          );
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logStep('Payment intent succeeded', { paymentIntentId: paymentIntent.id });

        await supabase
          .from('payments')
          .update({ status: 'completed' })
          .eq('stripe_payment_intent_id', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logStep('Payment intent failed', { paymentIntentId: paymentIntent.id });

        await supabase
          .from('payments')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', paymentIntent.id);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        logStep('Subscription updated', { subscriptionId: subscription.id });

        await supabase
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        logStep('Subscription deleted', { subscriptionId: subscription.id });

        await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }

      default:
        logStep('Unhandled event type', { type: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    logStep('Webhook error', { error: String(error) });
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
