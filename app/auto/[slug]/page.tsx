import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cars, money } from '@/lib/cars';
import CarGallery from '@/components/car-gallery';
import { Atmosphere } from '@/components/experience';

export function generateStaticParams() {
  return cars.map(car => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = cars.find(car => car.slug === slug);
  return { title: car ? `${car.marca} ${car.modelo}` : 'Automóvil no encontrado' };
}

export default async function Auto({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = cars.find(car => car.slug === slug);
  if (!car) notFound();

  return <article className="detail">
    <div className="breadcrumb"><Link href="/catalogo">← Volver a la colección</Link> / {car.marca} / {car.año}</div>
    <CarGallery imagenes={car.imagenes} nombre={`${car.marca} ${car.modelo}`} />
    <header className="detail-header">
      <div><span className="eyebrow">{car.marca} · {car.año} · {car.época}</span><h1>{car.modelo}</h1></div>
      <div className="price">{money(car.precio_usd)}<small>PRECIO FICTICIO · SIN OFERTA COMERCIAL</small></div>
    </header>
    <dl className="specs">
      <div className="spec"><dt>Potencia</dt><dd>{car.potencia.toLocaleString('es-CO')} <small>CV</small></dd></div>
      <div className="spec"><dt>0–100 km/h</dt><dd>{car.aceleracion_0_100.toLocaleString('es-CO')} <small>s</small></dd></div>
      <div className="spec"><dt>Velocidad máxima</dt><dd>{car.velocidad_max} <small>km/h</small></dd></div>
      <div className="spec"><dt>Año</dt><dd>{car.año}</dd></div>
    </dl>
    <div className="detail-story">
      <div>
        <h2>Una presencia irrepetible.</h2>
        <p>{car.descripcion}</p>
        <p><span className="meta">Motorización</span><br />{car.motor}</p>
        <p className="source">Cifras orientativas según versión y condiciones; algunas prestaciones son estimaciones, no mediciones de esta unidad. Fotografías ilustrativas del modelo: el año, acabado, carrocería y color pueden variar. Este showroom es una demostración y no dispone de vehículos a la venta.</p>
        <p className="source"><Link href={`/creditos#${car.slug}`}>Fuentes y licencias de las fotografías ↗</Link></p>
      </div>
      <aside className="enquiry contact-cta">
        <Atmosphere border />
        <span className="eyebrow">Atención personalizada</span>
        <h2>El siguiente capítulo.</h2>
        <p>Cuéntanos qué hace especial a este automóvil para ti. Explora una experiencia de asesoría en nuestro showroom ficticio.</p>
        <Link href={`/contacto?auto=${car.slug}`} className="button primary">Solicitar información <span>↗</span></Link>
        <p className="source">Formulario de demostración. No envía correos ni reserva vehículos.</p>
      </aside>
    </div>
  </article>;
}
