import './globals.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { brand } from './data';

export const metadata = { title: `${brand.name} — Hotel Linen`, description: 'Bed linen, towels and blankets supplied in bulk.' };

// Fixed-width page like the reference: phones and tablets zoom the desktop layout out to fit.
export const viewport = { width: 1260, initialScale: undefined };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@400;500&display=swap" />
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
