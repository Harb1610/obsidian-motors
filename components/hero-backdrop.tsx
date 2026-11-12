'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Car } from '@/lib/cars';

export default function HeroBackdrop({ cars }: { cars: readonly Car[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [reduce, setReduce] = useState(true);

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
  }, [current, reduce, cars.length]);

  useEffect(() => {
    const photo = root.current;
    const hero = photo?.closest<HTMLElement>('.hero');
    if (!hero || !photo || reduce) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        // Paneo de pocos píxeles: ninguna refracción ni filtro sobre el automóvil.
        photo.style.translate = `${(x - 0.5) * 10}px ${(y - 0.5) * 6}px`;
        hero.style.setProperty('--glow-x', `${x * 100}%`);
        hero.style.setProperty('--glow-y', `${y * 100}%`);
      });
    };
    const reset = () => { photo.style.translate = '0px 0px'; };
    hero.addEventListener('pointermove', move, { passive: true });
    hero.addEventListener('pointerleave', reset);
    return () => {
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', reset);
      cancelAnimationFrame(frame);
      reset();
    };
  }, [reduce]);

  return <>
    <div ref={root} className="hero-photo hero-rotation" style={{ transition: reduce ? 'none' : 'translate 700ms ease-out' }}>
      {cars.slice(0, loaded + 1).map((car, index) => <div key={car.id} data-slide={index} className={`hero-slide${index === current ? ' is-current' : ''}`}>
        <Image src={car.imagen} alt={`${car.marca} ${car.modelo}, colección Obsidian`} fill sizes="(max-width: 700px) 100vw, 72vw" quality={80} priority={index === 0} loading={index === 0 ? undefined : 'lazy'} />
      </div>)}
    </div>
    <div className="hero-glow" aria-hidden="true" />
  </>;
}
