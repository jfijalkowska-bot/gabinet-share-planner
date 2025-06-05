
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    const { userId, title, message, type, email, appointmentId } = await req.json();

    // Zapisz powiadomienie w bazie
    await supabaseClient.from("notifications").insert({
      user_id: userId,
      title,
      message,
      type,
      related_appointment_id: appointmentId,
    });

    // Wyślij email jeśli podano
    if (email && Deno.env.get("RESEND_API_KEY")) {
      await resend.emails.send({
        from: "GabinetShare <noreply@gabinetshare.pl>",
        to: [email],
        subject: title,
        html: `
          <h2>${title}</h2>
          <p>${message}</p>
          <p>Pozdrawiamy,<br>Zespół GabinetShare</p>
        `,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
