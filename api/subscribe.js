import { Resend } from 'resend';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { email = '', consent = false, website = '' } = req.body || {};
  if (website) return res.status(200).json({ ok: true });

  const normalized = String(email).trim().toLowerCase();
  if (!consent || !emailPattern.test(normalized) || normalized.length > 254) {
    return res.status(400).json({ error: 'Enter a valid email and agree to receive EPYAL updates.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'Newsletter signup is being configured. Please try again shortly.' });
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.contacts.create({
      email: normalized,
      unsubscribed: false
    });
    if (error) {
      const msg = String(error.message || '');
      if (/exist|duplicate|already/i.test(msg)) return res.status(200).json({ ok: true, alreadySubscribed: true });
      console.error('Resend contact error', error);
      return res.status(502).json({ error: 'Unable to add your email right now.' });
    }
    return res.status(200).json({ ok: true, id: data?.id || null });
  } catch (err) {
    console.error('Newsletter subscribe error', err);
    return res.status(500).json({ error: 'Unable to add your email right now.' });
  }
}
