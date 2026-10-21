import './globals.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
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
      </body>
    </html>
  );
}
