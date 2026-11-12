'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { Car } from '@/lib/cars';

const Glass = dynamic(() => import('@paper-design/shaders-react').then(m => m.FlutedGlass), { ssr: false });

export default function HeroBackdrop({ cars }: { cars: readonly Car[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [reduce, setReduce] = useState(true);
  const [texture, setTexture] = useState<HTMLImageElement>();

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduce) return;
    setLoaded(value => Math.max(value, 1));
    const timer = window.setInterval(() => {
      if (document.hidden || !root.current || root.current.getBoundingClientRect().bottom < 0) return;
      setCurrent(value => (value + 1) % cars.length);
    }, 7500);
    return () => window.clearInterval(timer);
  }, [reduce, cars.length]);

  useEffect(() => {
    if (!reduce) setLoaded(value => Math.max(value, Math.min(current + 1, cars.length - 1)));
    const image = root.current?.querySelector<HTMLImageElement>(`[data-slide="${current}"] img`);
    if (image?.complete && image.naturalWidth) setTexture(image);
  }, [current, reduce, cars.length]);

  return <div ref={root} className="hero-photo hero-rotation">
    {cars.slice(0, loaded + 1).map((car, index) => <div key={car.id} data-slide={index} className={`hero-slide${index === current ? ' is-current' : ''}`}>
      <Image src={car.imagen} alt={`${car.marca} ${car.modelo}, colección Obsidian`} fill sizes="(max-width: 700px) 100vw, 72vw" quality={80} priority={index === 0} loading={index === 0 ? undefined : 'lazy'} onLoad={event => { if (index === current) setTexture(event.currentTarget); }} />
    </div>)}
    {/* Parámetros constantes: sin eventos ni estado del puntero en el hero. */}
    {!reduce && texture && <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none', maskImage: 'linear-gradient(90deg,transparent,#fff 45%)' }}>
      <Glass image={texture} style={{ width: '100%', height: '100%' }} minPixelRatio={1} maxPixelCount={350000} fit="cover" colorBack="#00000000" colorShadow="#09090b" colorHighlight="#e7ccd1" shadows={0.01} highlights={0.02} shape="wave" distortionShape="lens" size={0.55} distortion={0.005} shift={0} angle={90} blur={0} edges={0} speed={0.08} />
    </div>}
  </div>;
}
