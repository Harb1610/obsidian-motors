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
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
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
    // Solo se anticipa una imagen; no se descarga toda la rotación al inicio.
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
  }, [current, reduce]);
  useEffect(() => {
    const hero = root.current?.closest<HTMLElement>('.hero');
    if (!hero || reduce) return;
    let frame = 0;
    let last = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || performance.now() - last < 40) return;
      last = performance.now();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        setPointer({ x, y });
        hero.style.setProperty('--glow-x', `${x * 100}%`);
        hero.style.setProperty('--glow-y', `${y * 100}%`);
      });
    };
    hero.addEventListener('pointermove', move, { passive: true });
    return () => { hero.removeEventListener('pointermove', move); cancelAnimationFrame(frame); };
  }, [reduce]);
  return <>
    <div ref={root} className="hero-photo hero-rotation">
      {cars.slice(0, loaded + 1).map((car, index) => <div key={car.id} data-slide={index} className={`hero-slide${index === current ? ' is-current' : ''}`}>
        <Image src={car.imagen} alt={`${car.marca} ${car.modelo}, colección Obsidian`} fill sizes="(max-width: 700px) 100vw, 72vw" quality={80} priority={index === 0} loading={index === 0 ? undefined : 'lazy'} onLoad={event => { if (index === current) setTexture(event.currentTarget); }} />
      </div>)}
      {!reduce && texture && <div className="hero-glass" aria-hidden="true" data-glass-shift={((pointer.x - 0.5) * 0.18).toFixed(3)} data-glass-distortion={(0.09 + pointer.y * 0.13).toFixed(3)}>
        <Glass image={texture} style={{ width: '100%', height: '100%' }} minPixelRatio={1} maxPixelCount={350000} fit="cover" colorBack="#00000000" colorShadow="#09090b" colorHighlight="#e7ccd1" shadows={0.02} highlights={0.06} shape="wave" distortionShape="lens" size={0.55} distortion={0.09 + pointer.y * 0.13} shift={(pointer.x - 0.5) * 0.18} angle={75 + pointer.x * 12} blur={0} edges={0.02} speed={0.08} />
      </div>}
    </div>
    <div className="hero-glow" aria-hidden="true" />
  </>;
}
