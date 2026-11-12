import type { Metadata } from 'next';
import credits from '@/data/photo-credits.json';
import { cars, photoSource } from '@/lib/cars';

export const metadata: Metadata = { title: 'Créditos fotográficos' };

function licenseUrl(license: string) {
  if (license === 'CC0') return 'https://creativecommons.org/publicdomain/zero/1.0/';
  const version = license.match(/\d\.\d/)?.[0] ?? '4.0';
  const family = license.includes('BY-SA') ? 'by-sa' : 'by';
  return `https://creativecommons.org/licenses/${family}/${version}/${license.endsWith('DE') ? 'de/' : ''}`;
}

export default function CreditsPage() {
  return (
    <section className="section container">
      <p className="eyebrow">El origen de cada imagen</p>
      <h1>Créditos fotográficos</h1>
      <p>Las 40 fotografías se sirven desde Wikimedia Commons. Cada enlace permite consultar el archivo, su autor y las condiciones completas de reutilización.</p>
      <p>Tratamiento visual aplicado en el sitio: contraste, saturación, viñeta y recorte mediante CSS. Las fotografías son ilustrativas: el año o la variante fotografiada pueden diferir de la ficha. Los precios y la disponibilidad son ficticios.</p>
      <div className="source">
        {cars.map((car) => {
          const credit = credits.find((entry) => entry.id === car.id);
          return (
            <article key={car.id} style={{ padding: '1.25rem 0', borderBottom: '1px solid rgb(255 255 255 / .08)' }}>
              <h2 style={{ fontSize: '1.6rem' }}>{car.marca} {car.modelo} · {car.año}</h2>
              <p>{car.época}</p>
              <p>Autoría: {credit?.author}. Licencia: <a href={licenseUrl(credit?.license ?? 'CC BY-SA 4.0')}>{credit?.license}</a>.</p>
              <a href={photoSource(car.imagen)}>Ver archivo original y atribución en Wikimedia Commons ↗</a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
