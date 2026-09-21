import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const consent = body.consent === true;
  const website = String(body.website || "");

  if (website) return NextResponse.json({ ok: true });
  if (!consent || !emailPattern.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Enter a valid email and agree to receive EPYAL updates." },
      { status: 400 }
    );
  }

  let stored = false;
  const supabase = createSupabaseAdminClient();

  if (supabase) {
    const { error } = await supabase.from("newsletter_subscribers").upsert(
      {
        email,
        consented_at: new Date().toISOString(),
        source: "website",
        active: true
      },
      { onConflict: "email" }
    );

    if (!error) stored = true;
    else console.error("newsletter_subscribers upsert failed", error);
  }

  const resendKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (resendKey && audienceId) {
    try {
      const resend = new Resend(resendKey);
      const { error } = await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false
      } as any);
      if (!error) stored = true;
      else if (!/exist|duplicate|already/i.test(String(error.message || ""))) {
        console.error("Resend contact create failed", error);
      } else {
        stored = true;
      }
    } catch (error) {
      console.error("Resend subscribe failed", error);
    }
  }

  if (!stored) {
    return NextResponse.json(
      { error: "Newsletter signup is being configured. Please try again shortly." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
