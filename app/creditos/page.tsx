import type { Metadata } from 'next';
import Link from 'next/link';
import credits from '@/data/photo-credits.json';
import { cars } from '@/lib/cars';

export const metadata: Metadata = { title: 'Créditos fotográficos' };

export default function CreditsPage() {
  return (
    <section className="section container">
      <p className="eyebrow">El origen de cada imagen</p>
      <h1>Créditos fotográficos</h1>
      <p>Las {credits.length} fotografías de nuestros {cars.length} automóviles se sirven desde Wikimedia Commons. Cada enlace permite consultar el archivo, su autor y las condiciones completas de reutilización.</p>
      <p>Tratamiento visual: redimensionado, contraste, saturación, viñeta y recorte mediante CSS. Las fotografías son ilustrativas: año, carrocería, variante o acabado pueden diferir de la ficha. Los precios y la disponibilidad son ficticios.</p>
      <div className="source">
        {cars.map((car) => (
          <article key={car.id} id={car.slug} style={{ padding: '2rem 0', borderBottom: '1px solid rgb(255 255 255 / .08)', scrollMarginTop: '7rem' }}>
            <h2 style={{ fontSize: '1.6rem' }}>{car.marca} {car.modelo} · {car.año}</h2>
            <p>{car.época} · <Link href={`/auto/${car.slug}`}>Ver automóvil ↗</Link></p>
            <ol>
              {credits.filter((entry) => entry.carId === car.id).map((credit, index) => (
                <li key={credit.url} style={{ marginBottom: '1.25rem' }}>
                  <p>{index === 0 ? 'Fotografía principal' : `Fotografía ${index + 1}`} · Autoría: {credit.author}</p>
                  <p>Licencia: <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">{credit.license}</a> · <a href={credit.source} target="_blank" rel="noopener noreferrer">Archivo y atribución en Wikimedia Commons ↗</a></p>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
