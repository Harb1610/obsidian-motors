'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { Car } from '@/lib/cars';

const Glass = dynamic(() => import('@paper-design/shaders-react').then(m => m.FlutedGlass), { ssr: false });

export default function HeroBackdrop({ cars }: { cars: readonly Car[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState({ current: 0, previous: -1 });
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
    setLoaded(value => Math.max(value, Math.min(1, cars.length - 1)));
    const timer = window.setInterval(() => {
      if (document.hidden || !root.current || root.current.getBoundingClientRect().bottom < 0) return;
      setSlide(value => {
        const next = (value.current + 1) % cars.length;
        const image = root.current?.querySelector<HTMLImageElement>(`[data-slide="${next}"] img`);
        return image?.complete && image.naturalWidth ? { current: next, previous: value.current } : value;
      });
    }, 7500);
    return () => window.clearInterval(timer);
  }, [cars.length]);

  useEffect(() => {
    setLoaded(value => Math.max(value, Math.min(slide.current + 1, cars.length - 1)));
    const image = root.current?.querySelector<HTMLImageElement>(`[data-slide="${slide.current}"] img`);
    if (image?.complete && image.naturalWidth) setTexture(image);
  }, [slide.current, cars.length]);

  return <div ref={root} className="hero-photo hero-rotation">
    {cars.slice(0, loaded + 1).map((car, index) => {
      const active = index === slide.current;
      const leaving = index === slide.previous;
      const animation = slide.previous < 0 ? undefined : active
        ? `${reduce ? 'obsidian-fade-in' : 'obsidian-reveal'} 1.2s cubic-bezier(.77,0,.175,1) both`
        : leaving ? `${reduce ? 'obsidian-fade-out' : 'obsidian-depart'} 1.2s cubic-bezier(.77,0,.175,1) both` : undefined;
      return <div key={car.id} data-slide={index} className={`hero-slide${active ? ' is-current' : ''}`}
        style={{ zIndex: active ? 2 : leaving ? 1 : 0, transition: 'none', animation }}>
        <Image src={car.imagen} alt={`${car.marca} ${car.modelo}, colección Obsidian`} fill
          sizes="(max-width: 700px) 100vw, 72vw" quality={80} priority={index === 0}
          loading={index === 0 ? undefined : 'lazy'}
          onLoad={event => { if (active) setTexture(event.currentTarget); }} />
      </div>;
    })}
    {/* Glass autónomo: ningún parámetro depende del puntero. */}
    {!reduce && texture && <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 3, opacity: 0.06, pointerEvents: 'none', maskImage: 'linear-gradient(90deg,transparent,#fff 45%)' }}>
      <Glass image={texture} style={{ width: '100%', height: '100%' }} minPixelRatio={1} maxPixelCount={350000} fit="cover"
        colorBack="#00000000" colorShadow="#09090b" colorHighlight="#e7ccd1" shadows={0.01} highlights={0.02}
        shape="wave" distortionShape="lens" size={0.55} distortion={0.005} shift={0} angle={90} blur={0} edges={0} speed={0.08} />
    </div>}
    <style>{`
      @keyframes obsidian-reveal {
        from { clip-path: inset(0 100% 0 0); transform: translateX(3%); opacity: .8; }
        to { clip-path: inset(0); transform: translateX(0); opacity: 1; }
      }
      @keyframes obsidian-depart {
        from { transform: translateX(0) scale(1); opacity: 1; }
        to { transform: translateX(-2%) scale(1.04); opacity: 0; }
      }
      @keyframes obsidian-fade-in { from { opacity: 0; } to { opacity: 1; } }
      @keyframes obsidian-fade-out { from { opacity: 1; } to { opacity: 0; } }
    `}</style>
  </div>;
}
