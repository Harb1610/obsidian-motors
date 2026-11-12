import collection from '@/data/cars.json';

/** Contrato único inferido de los datos: no se duplican interfaces. */
export type Car = (typeof collection)[number];
export const cars: readonly Car[] = collection;
export const eras = Array.from(new Set(cars.map(car => car.época)));
export const brands = Array.from(new Set(cars.map(car => car.marca))).sort();
const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 0, currencyDisplay: 'code',
});
export const money = (value: number) => currency.format(value);
