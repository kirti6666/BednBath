// Google Translate reads the "googtrans" cookie (/en/<language>) when the page loads; see the script in app/layout.js.
export const chosenLanguage = () => document.cookie.match(/(?:^|; )googtrans=\/en\/([^;]+)/)?.[1] || 'en';

export function chooseLanguage(code) {
  const host = location.hostname;
  // Google may also have set the cookie on the domain: clear every copy, then set the new one.
  for (const domain of ['', `; domain=${host}`, `; domain=.${host}`]) {
    document.cookie = `googtrans=; path=/${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
  if (code !== 'en') document.cookie = `googtrans=/en/${code}; path=/`;
  location.reload();
}
