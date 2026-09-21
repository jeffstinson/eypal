"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setPending(true);
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") || ""),
          consent: data.get("consent") === "yes",
          website: String(data.get("website") || "")
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Unable to subscribe right now.");
      setMessage("You’re on the list. Watch your inbox for EPYAL updates.");
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to subscribe right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <div className="newsletter-row">
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input id="newsletter-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
        <input className="honeypot" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="button button-orange" type="submit" disabled={pending}>
          {pending ? "Joining…" : "Subscribe"}
        </button>
      </div>
      <label className="consent-row">
        <input type="checkbox" name="consent" value="yes" required />
        <span>I agree to receive EPYAL email updates and can unsubscribe at any time.</span>
      </label>
      <div className="form-message" role="status" aria-live="polite">{message}</div>
    </form>
  );
}
