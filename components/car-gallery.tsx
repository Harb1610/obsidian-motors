'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Car } from '@/lib/cars';
import styles from './car-gallery.module.css';

export default function CarGallery({ imagenes, nombre }: { imagenes: Car['imagenes']; nombre: string }) {
  const [selected, setSelected] = useState(0);
  const move = (step: number) => setSelected(current => (current + step + imagenes.length) % imagenes.length);

  return <section className={styles.gallery} aria-label={`Galería de ${nombre}`} tabIndex={0}
    onKeyDown={event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
      }
    }}>
    <div className={styles.stage}>
      <Image key={imagenes[selected]} src={imagenes[selected]} alt={`${nombre} · Fotografía ${selected + 1}`}
        fill sizes="(max-width: 700px) 92vw, (max-width: 1400px) 84vw, 1200px" quality={90}
        priority={selected === 0} loading={selected === 0 ? undefined : 'lazy'} className={styles.image} />
      {imagenes.length > 1 && <div className={styles.controls}>
        <button type="button" onClick={() => move(-1)} aria-label="Fotografía anterior">←</button>
        <span aria-live="polite" aria-atomic="true">{String(selected + 1).padStart(2, '0')} / {String(imagenes.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => move(1)} aria-label="Fotografía siguiente">→</button>
      </div>}
    </div>
    <div className={styles.thumbnails} aria-label="Elegir fotografía">
      {imagenes.map((image, index) => <button key={image} type="button"
        aria-label={`Ver fotografía ${index + 1} de ${nombre}`} aria-pressed={selected === index}
        onClick={() => setSelected(index)} className={styles.thumbnail}>
        <Image src={image} alt="" fill sizes="(max-width: 700px) 22vw, 120px" quality={60} loading="lazy" />
        <span>{String(index + 1).padStart(2, '0')}</span>
      </button>)}
    </div>
    <p className={styles.note}>Distintas miradas. Una misma leyenda. <span>Usa las miniaturas o las flechas del teclado.</span></p>
  </section>;
}
