'use client';
import { useEffect, useRef, useState } from 'react';
import { languages } from '../site';

// Google Translate reads the "googtrans" cookie (/en/<language>) when the page loads; see the script in app/layout.js.
const chosen = () => document.cookie.match(/(?:^|; )googtrans=\/en\/([^;]+)/)?.[1] || 'en';

function choose(code) {
  const host = location.hostname;
  // Google may also have set the cookie on the domain: clear every copy, then set the new one.
  for (const domain of ['', `; domain=${host}`, `; domain=.${host}`]) {
    document.cookie = `googtrans=; path=/${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
  if (code !== 'en') document.cookie = `googtrans=/en/${code}; path=/`;
  location.reload();
}

export default function LanguagePicker() {
  const [lang, setLang] = useState('en');
  const ref = useRef(null);
  useEffect(() => {
    setLang(chosen()); // the cookie only exists in the browser
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) ref.current.open = false; };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <details className="lang" ref={ref} translate="no">
      <summary aria-label="Choose language">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9" /></svg>
        {lang.slice(0, 2).toUpperCase()}
      </summary>
      <div className="lang-panel">
        <p className="lang-head">Choose language</p>
        <ul>
          {languages.map(([code, native, english]) => (
            <li key={code}>
              <button type="button" lang={code} aria-current={code === lang || undefined} onClick={() => code !== lang && choose(code)}>
                {native}{english && <small>{english}</small>}
              </button>
            </li>
          ))}
        </ul>
        <p className="lang-note">Automatic translation by Google. The English version is the official one.</p>
      </div>
    </details>
  );
}
