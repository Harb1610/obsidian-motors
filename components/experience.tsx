'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import { motion, useReducedMotion } from 'framer-motion';

const Metal = dynamic(() => import('@paper-design/shaders-react').then(m => m.LiquidMetal), { ssr: false });
const Border = dynamic(() => import('@paper-design/shaders-react').then(m => m.PulsingBorder), { ssr: false });
const context: WebGLContextAttributes = { alpha: true, premultipliedAlpha: false, preserveDrawingBuffer: true, powerPreference: 'low-power' };

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ autoRaf: true, duration: 1.05, smoothWheel: true });
    return () => lenis.destroy();
  }, []);
  return null;
}

export function Atmosphere({ border = false }: { border?: boolean }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReady(!preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  if (!ready) return null;
  return <div className="shader" aria-hidden="true" style={{ pointerEvents: 'none' }}>
    {border ? <Border style={{ width: '100%', height: '100%' }} webGlContextAttributes={context} minPixelRatio={1} maxPixelCount={450000} colors={['#d90429', '#71717a']} colorBack="#09090b" speed={0.15} thickness={0.03} roundness={0.02} /> :
      <Metal style={{ width: '100%', height: '100%', opacity: 0.48 }} webGlContextAttributes={context} minPixelRatio={1} maxPixelCount={650000} shape="none" colorBack="#09090b" colorTint="#9c858a" repetition={1.5} softness={0.55} shiftRed={0.12} shiftBlue={0} distortion={0.15} contour={0.2} angle={70} speed={0.12} scale={1} />}
  </div>;
}

export function Reveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.65 }}>{children}</motion.div>;
}
