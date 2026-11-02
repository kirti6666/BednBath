'use client';
import { useEffect, useRef, useState } from 'react';
import { languages } from '../site';
import { chosenLanguage, chooseLanguage } from '../language';

export default function LanguagePicker() {
  const [lang, setLang] = useState('en');
  const ref = useRef(null);
  useEffect(() => {
    setLang(chosenLanguage()); // the cookie only exists in the browser
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
              <button type="button" lang={code} aria-current={code === lang || undefined} onClick={() => code !== lang && chooseLanguage(code)}>
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
