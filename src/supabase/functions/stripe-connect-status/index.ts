import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-CONNECT-STATUS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id });

    // Sprawdź czy użytkownik ma konto Connect
    const { data: affiliateAccount } = await supabaseClient
      .from("affiliate_accounts")
      .select("stripe_connect_account_id, onboarding_complete")
      .eq("user_id", user.id)
      .single();

    if (!affiliateAccount) {
      return new Response(JSON.stringify({ 
        connected: false,
        onboarding_complete: false,
        can_receive_payments: false
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    
    // Pobierz szczegóły konta ze Stripe
    const account = await stripe.accounts.retrieve(affiliateAccount.stripe_connect_account_id);
    const canReceivePayments = account.charges_enabled && account.payouts_enabled;
    
    logStep("Account status retrieved", { 
      accountId: account.id, 
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled 
    });

    // Zaktualizuj status w bazie jeśli onboarding został ukończony
    if (canReceivePayments && !affiliateAccount.onboarding_complete) {
      await supabaseClient
        .from("affiliate_accounts")
        .update({ onboarding_complete: true, updated_at: new Date().toISOString() })
        .eq("user_id", user.id);
    }

    return new Response(JSON.stringify({
      connected: true,
      onboarding_complete: canReceivePayments,
      can_receive_payments: canReceivePayments,
      account_id: account.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
