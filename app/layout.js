import './globals.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { brand } from './site';

export const metadata = {
  title: `${brand.name} ${brand.line} | Hotel Linen Manufacturer & Exporter`,
  description: 'Hotel linen manufacturer and exporter since 2010: bed, bath and banquet linen for 4- and 5-star hotels.',
};

// One fixed 1260px layout on every device, like the reference: phones and tablets zoom it out to fit the screen.
export const viewport = { width: 1260, initialScale: undefined };

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
