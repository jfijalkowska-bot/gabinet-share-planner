import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-CONNECT-ONBOARD] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

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
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Sprawdź czy użytkownik ma już konto Connect
    const { data: existingAccount } = await supabaseClient
      .from("affiliate_accounts")
      .select("stripe_connect_account_id, onboarding_complete")
      .eq("user_id", user.id)
      .single();

    let accountId = existingAccount?.stripe_connect_account_id;

    if (!accountId) {
      // Utwórz nowe konto Connect Express
      logStep("Creating new Connect account");
      const account = await stripe.accounts.create({
        type: "express",
        country: "PL",
        email: user.email,
        capabilities: {
          transfers: { requested: true },
        },
        business_type: "individual",
        metadata: {
          user_id: user.id,
        },
      });
      accountId = account.id;
      logStep("Connect account created", { accountId });

      // Zapisz w bazie
      await supabaseClient.from("affiliate_accounts").insert({
        user_id: user.id,
        stripe_connect_account_id: accountId,
        onboarding_complete: false,
      });
    }

    // Utwórz link do onboardingu
    const origin = req.headers.get("origin") || "https://gabinetshare.pl";
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${origin}/affiliate?refresh=true`,
      return_url: `${origin}/affiliate?success=true`,
      type: "account_onboarding",
    });
    logStep("Account link created", { url: accountLink.url });

    return new Response(JSON.stringify({ url: accountLink.url }), {
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
