'use client';
import { useRef, useState } from 'react';
import { formsEmail } from '../site';
import { WhatsAppButton, waLink } from './WhatsApp';

const ENDPOINT = `https://formsubmit.co/ajax/${formsEmail}`;

// A form that emails its answers to the admin (a table, one row per field, named after each field's `name`)
// and thanks the visitor in a pop-up.
export default function MailForm({ subject, button, thanksTitle, thanksText, whatsapp = false, children }) {
  const thanks = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [fallback, setFallback] = useState(''); // the answers as a WhatsApp message, offered when email fails

  async function send(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('_honey')) return; // only bots fill the hidden field
    const fields = {};
    for (const [key, value] of data) {
      const v = String(value).trim();
      if (!key.startsWith('_') && v) fields[key] = fields[key] ? `${fields[key]}, ${v}` : v; // ticked boxes join into one row
    }
    const who = [fields.Name, fields['Company / hotel'], fields.Country].filter(Boolean).join(', ');
    setFallback(waLink(`${subject}\n${Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n')}`));
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...fields,
          'Sent from': location.href,
          _subject: `${subject}: ${who}`,
          _replyto: fields.Email,
          _template: 'table',
          _captcha: 'false',
        }),
        signal: AbortSignal.timeout(15000), // give up instead of showing "Sending…" for ever when the mail service is slow or down
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || String(out.success) !== 'true') throw new Error(out.message || `HTTP ${res.status}`);
      form.reset();
      setStatus('idle');
      thanks.current?.showModal();
    } catch (err) {
      console.error('Form not sent:', err);
      setStatus('error');
    }
  }

  return (
    <>
      <form className="form" onSubmit={send}>
        {children}
        <input type="text" name="_honey" hidden tabIndex={-1} autoComplete="off" aria-label="Leave this field empty" />
        <span />
        <div>
          <div className="cta form-actions">
            <button type="submit" className="btn" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : button}</button>
            {whatsapp && <WhatsAppButton />}
          </div>
          {status === 'error' && (
            <p className="form-error" role="alert">
              Sorry, this could not be sent. Please try again, or{' '}
              <a href={fallback} target="_blank" rel="noopener noreferrer">send the same details on WhatsApp</a>.
            </p>
          )}
        </div>
      </form>
      <dialog ref={thanks} className="offer thanks" aria-labelledby="thanks-title">
        <form method="dialog"><button className="offer-x" aria-label="Close">×</button></form>
        <svg className="thanks-tick" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" /><path d="M14 25l7 7 13-15" /></svg>
        <h2 id="thanks-title">{thanksTitle}</h2>
        <p>{thanksText}</p>
        <form method="dialog"><button className="btn">Close</button></form>
      </dialog>
    </>
  );
}
