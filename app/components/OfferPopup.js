'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { WhatsAppButton } from './WhatsApp';

const SEEN = 'offer-seen';

// Bulk-order offer, shown once per visitor a few seconds after their first page opens.
export default function OfferPopup() {
  const ref = useRef(null);
  useEffect(() => {
    try { if (localStorage.getItem(SEEN)) return; } catch { /* storage blocked: still show it once on this page */ }
    const timer = setTimeout(() => ref.current?.showModal(), 3000);
    return () => clearTimeout(timer);
  }, []);
  const remember = () => { try { localStorage.setItem(SEEN, '1'); } catch { /* storage blocked */ } };
  const close = () => ref.current?.close();

  return (
    // Clicking the dark backdrop (the dialog element itself) closes it too.
    <dialog ref={ref} className="offer" aria-labelledby="offer-title" onClose={remember} onClick={(e) => e.target === ref.current && close()}>
      <form method="dialog"><button className="offer-x" aria-label="Close">×</button></form>
      <p className="eyebrow">Bulk order offer</p>
      <h2 id="offer-title">Get up to <strong>6% off</strong> on bulk orders</h2>
      <p>The larger your order, the bigger the saving. Your discount is confirmed on your quotation.</p>
      <div className="offer-actions">
        <Link href="/enquiry-form" className="btn" onClick={close}>Request a quote</Link>
        <WhatsAppButton topic="a bulk order" />
        <form method="dialog"><button className="offer-no">No thanks</button></form>
      </div>
    </dialog>
  );
}
