import Link from 'next/link';
import CarCard from '@/components/car-card';
import { cars, eras, brands } from '@/lib/cars';

export const metadata = { title: 'La colección' };
type Query = Record<string, string | string[] | undefined>;

export default async function Catalogo({ searchParams }: { searchParams: Promise<Query> }) {
  const query = await searchParams;
  const marca = typeof query.marca === 'string' ? query.marca : '';
  const epoca = typeof query.epoca === 'string' ? query.epoca : '';
  const filtered = cars.filter((car) => (!marca || car.marca === marca) && (!epoca || car.época === epoca));

  return (
    <>
      <header className="page-head">
        <span className="eyebrow">El archivo Obsidian</span>
        <h1>La colección<span className="red">.</span></h1>
        <p>{cars.length} maneras de entender lo extraordinario. Encuentra la época, la marca y la máquina que hablan tu idioma.</p>
      </header>
      <section className="catalog">
        <form action="/catalogo" method="get" className="filters">
          <div className="field">
            <label htmlFor="marca">Marca</label>
            <select key={marca} name="marca" id="marca" defaultValue={marca}>
              <option value="">Todas las marcas</option>
              {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="epoca">Época</label>
            <select key={epoca} name="epoca" id="epoca" defaultValue={epoca}>
              <option value="">Todas las épocas</option>
              {eras.map((era) => <option key={era} value={era}>{era}</option>)}
            </select>
          </div>
          <button type="submit" className="button">Aplicar filtros ↗</button>
          {(marca || epoca) && <Link className="button" href="/catalogo">Limpiar</Link>}
          <span className="count" aria-live="polite">{filtered.length} de {cars.length} automóviles</span>
        </form>
        {filtered.length ? (
          <div className="grid">{filtered.map((car) => <CarCard key={car.id} car={car} />)}</div>
        ) : (
          <div className="empty">
            <h2>Ninguna coincidencia.</h2>
            <p>Prueba otra combinación de marca y época.</p>
            <Link className="button" href="/catalogo">Ver toda la colección ↗</Link>
          </div>
        )}
      </section>
    </>
  );
}
