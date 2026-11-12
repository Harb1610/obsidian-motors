import Link from 'next/link';
import Image from 'next/image';
import { cars, eras } from '@/lib/cars';
import CarCard from '@/components/car-card';
import { Atmosphere, Reveal } from '@/components/experience';

export default function Home() {
  const featured = [cars[3], cars[10], cars[21]];
  return <>
    <section className="hero">
      <Atmosphere />
      <div className="hero-photo"><Image src={cars[10].imagen} alt="Ferrari F40, icono de nuestra colección" fill priority sizes="(max-width:650px) 100vw, 72vw" quality={85} /></div>
      <div className="hero-content">
        <span className="eyebrow">Bogotá · Colección de automóviles excepcionales</span>
        <h1><span>OBSIDIAN</span><span>MOTORS</span></h1>
        <p>No vendemos velocidad.<br />Reunimos las máquinas que hicieron de ella un arte.</p>
        <Link className="button primary" href="/catalogo">Descubrir la colección <span>↗</span></Link>
      </div>
      <div className="hero-bottom"><span><strong>40</strong> Leyendas del asfalto</span><span><strong>04</strong> Épocas irrepetibles</span><span>Desliza para descubrir ↓</span></div>
    </section>
    <section className="section"><Reveal>
      <div className="section-head"><div><span className="eyebrow">Un viaje a través del tiempo</span><h2>Épocas</h2></div><p className="meta">Cuatro capítulos. Una misma pasión.</p></div>
      <div className="epochs">{eras.map((era, i) => <Link href={`/catalogo?epoca=${encodeURIComponent(era)}`} className="epoch" key={era}>
        <span className="number">0{i + 1} / {cars.filter(car => car.época === era).length} AUTOMÓVILES</span><span className="arrow">↗</span><h3>{era.split(' (')[0]}</h3><p>{era.split('(')[1].replace(')', '')}</p>
      </Link>)}</div>
    </Reveal></section>
    <section className="section featured">
      <div className="section-head"><div><span className="eyebrow">Selección Obsidian</span><h2>Fuera de lo ordinario.</h2></div><Link href="/catalogo">Ver los 40 automóviles ↗</Link></div>
      <div className="grid">{featured.map(car => <Reveal key={car.id}><CarCard car={car} /></Reveal>)}</div>
    </section>
    <section className="manifesto contact-cta"><Atmosphere border /><span className="meta red">La diferencia está en lo que sientes</span><h2>Hay automóviles.<br />Y hay piezas de historia.</h2><p>Desde el primer trazo de una carrocería clásica hasta la ingeniería del mañana. Una colección digital para quienes entienden que conducir es mucho más que llegar.</p><Link href="/contacto" className="button">Comenzar una conversación <span>↗</span></Link></section>
  </>;
}
