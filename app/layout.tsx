import type { Metadata } from 'next';
import { Cormorant_Garamond, Space_Grotesk } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { SmoothScroll } from '@/components/experience';
import './globals.css';
import './navigation.css';
import { cars } from '@/lib/cars';

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-display', display: 'swap' });
const technical = Space_Grotesk({ subsets: ['latin'], variable: '--font-tech', display: 'swap' });
export const metadata: Metadata = {
  title: { default: 'Obsidian Motors | El arte de conducir', template: '%s | Obsidian Motors' },
  description: `Una colección ficticia de ${cars.length} deportivos modernos e hiperdeportivos de 2000 en adelante, reunidos en un showroom digital en Bogotá.`,
  icons: { icon: '/icon', apple: '/icon' },
  openGraph: { title: 'Obsidian Motors', description: `El automóvil como obra de arte. Explora ${cars.length} deportivos modernos e hiperdeportivos.`, locale: 'es_CO', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${technical.variable}`}>
        <SmoothScroll />
        <a className="skip" href="#contenido">Saltar al contenido</a>
        <header className="nav">
          <Link className="brand-link" href="/" aria-label="Obsidian Motors · Inicio">
            <Image className="brand-logo" src="/photo-4b5cf475.jpg" alt="Escudo Obsidian Motors" width={68} height={68} sizes="(max-width: 650px) 48px, 68px" priority />
            <span>OBSIDIAN <span className="red">MOTORS</span></span>
          </Link>
          <nav className="desktop-nav" aria-label="Navegación principal">
            <Link href="/">Inicio</Link>
            <Link href="/catalogo">Colección</Link>
            <Link href="/contacto">Contacto <span className="red">↗</span></Link>
          </nav>
          {/* Disclosure nativo: teclado y estado expandido sin JavaScript adicional.
              Los enlaces móviles navegan el documento y cierran el panel. */}
          <details className="mobile-menu min-[651px]:hidden">
            <summary aria-label="Menú principal">
              <span className="menu-icon" aria-hidden="true"><span /><span /></span>
            </summary>
            <nav aria-label="Navegación móvil">
              <a href="/">Inicio</a>
              <a href="/catalogo">Colección</a>
              <a href="/contacto">Contacto <span className="red" aria-hidden="true">↗</span></a>
            </nav>
          </details>
        </header>
        <main id="contenido">{children}</main>
        <footer>
          <div className="footer-top">
            <Link href="/" className="display">Obsidian Motors<span className="red">.</span></Link>
            <p>El automóvil como obra de arte.<br />Bogotá · Colombia</p>
            <Link href="/catalogo">Explorar la colección ↗</Link>
          </div>
          <div className="footer-bottom">
            <span>© 2026 OBSIDIAN MOTORS</span>
            <span>SHOWROOM FICTICIO · PRECIOS ILUSTRATIVOS EN USD</span>
            <Link href="/creditos">Créditos fotográficos</Link>
            <a href="mailto:showroom@obsidianmotors.com">showroom@obsidianmotors.com</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
