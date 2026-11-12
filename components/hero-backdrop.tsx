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
    // Only one image ahead; never fetch the whole rotation on initial render.
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
    const hero = root.current?.closest<HTMLElement>('.hero');
    if (!hero || reduce) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty('--glow-x', `${(event.clientX - rect.left) / rect.width * 100}%`);
        hero.style.setProperty('--glow-y', `${(event.clientY - rect.top) / rect.height * 100}%`);
      });
    };
    hero.addEventListener('pointermove', move, { passive: true });
    return () => { hero.removeEventListener('pointermove', move); cancelAnimationFrame(frame); };
  }, [reduce]);
  return <>
    <div ref={root} className="hero-photo hero-rotation">
      {cars.slice(0, loaded + 1).map((car, index) => <div key={car.id} className={`hero-slide${index === current ? ' is-current' : ''}`}>
        <Image src={car.imagen} alt={`${car.marca} ${car.modelo}, colección Obsidian`} fill sizes="(max-width:650px) 100vw, 72vw" quality={80} priority={index === 0} loading={index === 0 ? undefined : 'lazy'} />
      </div>)}
    </div>
    <div className="hero-glow" aria-hidden="true" />
  </>;
}
