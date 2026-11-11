'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import { motion, useReducedMotion } from 'framer-motion';
const Mesh = dynamic(() => import('@paper-design/shaders-react').then(m => m.MeshGradient), {ssr:false});
const Border = dynamic(() => import('@paper-design/shaders-react').then(m => m.PulsingBorder), {ssr:false});
export function SmoothScroll(){
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const lenis = new Lenis({autoRaf:true, duration:1.05, smoothWheel:true});
  return ()=>lenis.destroy();
 },[]);
 return null;
}
export function Atmosphere({border=false}:{border?:boolean}){
 const [ready,setReady]=useState(false);
 useEffect(()=>{setReady(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)},[]);
 if(!ready) return null;
 return <div className="shader" aria-hidden="true">{border?<Border style={{width:'100%',height:'100%'}} colors={['#d90429','#71717a']} colorBack="#09090b" speed={0.15} thickness={0.03} roundness={0.02}/>:<Mesh style={{width:'100%',height:'100%'}} colors={['#09090b','#27272a','#650719','#18181b']} speed={0.12}/>}</div>;
}
export function Reveal({children}:{children:React.ReactNode}){
 const reduce=useReducedMotion();
 return <motion.div initial={reduce?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.1}} transition={{duration:0.65}}>{children}</motion.div>;
}
