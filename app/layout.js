import './globals.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import OfferPopup from './components/OfferPopup';
import { WhatsAppFloat } from './components/WhatsApp';
import { brand } from './site';

export const metadata = {
  title: `${brand.name} ${brand.line} | Hotel Linen Manufacturer & Exporter`,
  description: 'Hotel linen manufacturer and exporter since 2010: bed, bath and banquet linen for 4- and 5-star hotels.',
};

// One fixed layout on every device, like the reference. The page is drawn 1260px wide and shown 1000px wide,
// the reference's width: phones and tablets get a 1000px viewport and zoom it out to fit the screen.
export const viewport = { width: 1000, initialScale: undefined };

// Desktop browsers ignore the viewport meta, so zoom the page to 1000px, or to the window when it is narrower,
// so every screen shows the whole layout at the reference's proportions.
const fitToWindow = `(function () {
  var s = document.createElement('style');
  document.head.appendChild(s);
  // 1261 not 1260: one spare pixel so sub-pixel rounding on high-density phones never adds a sideways scroll.
  function fit() { s.textContent = '.page{zoom:' + Math.min(1000, document.documentElement.clientWidth) / 1261 + '}'; }
  fit();
  addEventListener('resize', fit);
})();`;

// Load Google Translate only when a visitor has picked another language (LanguagePicker sets the cookie).
const translate = `(function () {
  if (!/(?:^|; )googtrans=\\/en\\/(?!en(;|$))/.test(document.cookie)) return;
  // Translation swaps text for <font> tags; keep React from crashing when it later updates that text.
  var remove = Node.prototype.removeChild, insert = Node.prototype.insertBefore;
  Node.prototype.removeChild = function (c) { return c.parentNode === this ? remove.call(this, c) : c; };
  Node.prototype.insertBefore = function (n, r) { return r && r.parentNode !== this ? n : insert.call(this, n, r); };
  window.gtInit = function () { new google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'gt'); };
  var s = document.createElement('script');
  s.src = 'https://translate.google.com/translate_a/element.js?cb=gtInit';
  s.async = true;
  document.head.appendChild(s);
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@400;500;600&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: fitToWindow }} />
        <script dangerouslySetInnerHTML={{ __html: translate }} />
      </head>
      <body>
        <div className="page">
          <Header />
          <div className="body">
            <Sidebar />
            <main className="content">{children}</main>
          </div>
          <Footer />
        </div>
        <WhatsAppFloat />
        <OfferPopup />
        <div id="gt" hidden />
      </body>
    </html>
  );
}
