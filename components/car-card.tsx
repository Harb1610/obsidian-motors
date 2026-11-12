import Link from 'next/link';
import Image from 'next/image';
import { money, type Car } from '@/lib/cars';
export { eras, money } from '@/lib/cars';

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/auto/${car.slug}`} className="car" aria-label={`Ver ${car.marca} ${car.modelo}, ${car.año}`}>
      <div className="photo">
        <span className="tag">{car.época.split(' (')[0]}</span>
        <Image src={car.imagen} alt={`${car.marca} ${car.modelo}`} fill sizes="(max-width:650px) 88vw, (max-width:1000px) 42vw, 28vw" quality={80} />
      </div>
      <div className="car-body">
        <span className="brand">{car.marca}</span>
        <h3>{car.modelo}</h3>
        <div className="car-foot">
          <span>{car.año} <span className="red">/</span> {car.potencia} CV</span>
          <span>{money(car.precio_usd)} <span className="red">↗</span></span>
        </div>
      </div>
    </Link>
  );
}
