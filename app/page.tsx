import Link from 'next/link';
import Image from 'next/image';
import { cars, eras } from '@/lib/cars';
import CarCard from '@/components/car-card';
import { Atmosphere, Reveal } from '@/components/experience';

export default function Home() {
  const featured = [cars[3], cars[10], cars[21]];
  const hero = cars[10];
  return <>
    <section className="hero">
      <Atmosphere />
      <div className="hero-photo"><Image src={hero.imagen} alt={`${hero.marca} ${hero.modelo}, protagonista de nuestra colección`} fill priority sizes="(max-width:650px) 100vw, 72vw" quality={85} /></div>
      <div className="hero-content">
        <span className="eyebrow">Bogotá · Colección de automóviles excepcionales</span>
        <h1><span>OBSIDIAN</span><span>MOTORS</span></h1>
        <p>No vendemos velocidad.<br />Reunimos las máquinas que hicieron de ella un arte.</p>
        <Link className="button primary" href="/catalogo">Descubrir la colección <span>↗</span></Link>
      </div>
      <div className="hero-bottom"><span><strong>{cars.length}</strong> Leyendas del asfalto</span><span><strong>0{eras.length}</strong> Épocas irrepetibles</span><span>Desliza para descubrir ↓</span></div>
    </section>
    <section className="section"><Reveal>
      <div className="section-head"><div><span className="eyebrow">La evolución del deportivo moderno</span><h2>Épocas</h2></div><p className="meta">Dos capítulos. Una misma pasión.</p></div>
      <div className="epochs" style={{gridTemplateColumns:'repeat(2, minmax(0, 1fr))'}}>{eras.map((era, i) => <Link href={`/catalogo?epoca=${encodeURIComponent(era)}`} className="epoch" key={era}>
        <span className="number">0{i + 1} / {cars.filter(car => car.época === era).length} AUTOMÓVILES</span><span className="arrow">↗</span><h3>{era.split(' (')[0]}</h3><p>{era.split('(')[1].replace(')', '')}</p>
      </Link>)}</div>
    </Reveal></section>
    <section className="section featured">
      <div className="section-head"><div><span className="eyebrow">Selección Obsidian</span><h2>Fuera de lo ordinario.</h2></div><Link href="/catalogo">Ver los 40 automóviles ↗</Link></div>
      <div className="grid">{featured.map(car => <Reveal key={car.id}><CarCard car={car} /></Reveal>)}</div>
    </section>
    <section className="manifesto contact-cta"><Atmosphere border /><span className="meta red">La diferencia está en lo que sientes</span><h2>Hay automóviles.<br />Y hay piezas de historia.</h2><p>Desde los iconos del nuevo milenio hasta la ingeniería del mañana. Una colección digital para quienes entienden que conducir es mucho más que llegar.</p><Link href="/contacto" className="button">Comenzar una conversación <span>↗</span></Link></section>
  </>;
}
