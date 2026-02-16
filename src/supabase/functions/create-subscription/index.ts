import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@14.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { planType } = await req.json();

    if (!planType) {
      throw new Error('Plan type is required');
    }

    // Define plan prices (in PLN, smallest currency unit - grosze)
    const planPrices: Record<string, { amount: number; name: string }> = {
      therapist: { amount: 2900, name: 'Plan Terapeuta - miesięczny' },
      owner: { amount: 5900, name: 'Plan Właściciel - miesięczny' },
      free: { amount: 3900, name: 'Plan Wizytówka - roczny' },
    };

    const plan = planPrices[planType];
    if (!plan) {
      throw new Error('Invalid plan type');
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from('therapist_profiles')
      .select('user_id')
      .eq('user_id', user.id)
      .single();

    const email = user.email || `${user.id}@gabinetshare.com`;
    
    let customer: Stripe.Customer;
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        metadata: { userId: user.id },
      });
    }

    // Create Stripe Price for subscription
    const price = await stripe.prices.create({
      unit_amount: plan.amount,
      currency: 'pln',
      recurring: planType === 'free' ? { interval: 'year' } : { interval: 'month' },
      product_data: {
        name: plan.name,
      },
    });

    // Create checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card', 'p24', 'blik'],
      line_items: [{
        price: price.id,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/register?canceled=true`,
      metadata: {
        userId: user.id,
        planType: planType,
      },
    });

    console.log('Subscription checkout session created:', session.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating subscription:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
