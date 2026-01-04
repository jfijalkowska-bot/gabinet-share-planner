import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AffiliateNotificationRequest {
  type: 'new_referral' | 'commission_earned' | 'payout_processed';
  affiliateId: string;
  referredUserEmail?: string;
  amount?: number;
  commission?: number;
  planType?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { type, affiliateId, referredUserEmail, amount, commission, planType }: AffiliateNotificationRequest = await req.json();

    // Get affiliate's email from auth.users
    const { data: userData, error: userError } = await supabaseClient.auth.admin.getUserById(affiliateId);
    
    if (userError || !userData?.user?.email) {
      throw new Error("Could not find affiliate user email");
    }

    const affiliateEmail = userData.user.email;
    let subject = "";
    let htmlContent = "";

    switch (type) {
      case 'new_referral':
        subject = "🎉 Nowy użytkownik zarejestrował się z Twojego linku!";
        htmlContent = `
          <h2>Gratulacje!</h2>
          <p>Nowy użytkownik właśnie zarejestrował się używając Twojego linku polecającego.</p>
          <p>Gdy ta osoba dokona pierwszej płatności, otrzymasz 7% prowizji!</p>
          <p>Kontynuuj polecanie platformy i zwiększaj swoje zarobki.</p>
          <p>Pozdrawiamy,<br>Zespół GabinetShare</p>
        `;
        break;

      case 'commission_earned':
        subject = `💰 Zarobiłeś ${commission?.toFixed(2)} PLN prowizji!`;
        htmlContent = `
          <h2>Świetna wiadomość!</h2>
          <p>Osoba, którą poleciłeś, właśnie dokonała płatności!</p>
          <p><strong>Kwota płatności:</strong> ${amount?.toFixed(2)} PLN</p>
          <p><strong>Twoja prowizja (7%):</strong> ${commission?.toFixed(2)} PLN</p>
          <p><strong>Typ planu:</strong> ${planType || 'Subskrypcja'}</p>
          <p>Prowizja zostanie przekazana na Twoje konto Stripe Connect.</p>
          <p>Pozdrawiamy,<br>Zespół GabinetShare</p>
        `;
        break;

      case 'payout_processed':
        subject = `✅ Wypłata ${amount?.toFixed(2)} PLN została przetworzona!`;
        htmlContent = `
          <h2>Wypłata zrealizowana!</h2>
          <p>Twoja wypłata w wysokości <strong>${amount?.toFixed(2)} PLN</strong> została pomyślnie przetworzona.</p>
          <p>Środki powinny pojawić się na Twoim koncie bankowym w ciągu 2-5 dni roboczych.</p>
          <p>Dziękujemy za udział w programie partnerskim!</p>
          <p>Pozdrawiamy,<br>Zespół GabinetShare</p>
        `;
        break;
    }

    // Save notification to database
    await supabaseClient.from("notifications").insert({
      user_id: affiliateId,
      title: subject,
      message: htmlContent.replace(/<[^>]*>/g, '').substring(0, 500),
      type: 'affiliate',
    });

    // Send email
    if (Deno.env.get("RESEND_API_KEY")) {
      await resend.emails.send({
        from: "GabinetShare <onboarding@resend.dev>",
        to: [affiliateEmail],
        subject: subject,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              h2 { color: #2563eb; }
              p { margin: 10px 0; }
              strong { color: #1e40af; }
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
          </html>
        `,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending affiliate notification:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
