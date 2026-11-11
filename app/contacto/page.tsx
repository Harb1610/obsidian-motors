import ContactForm from '@/components/contact-form';
import cars from '@/data/cars.json';
export const metadata={title:'Contacto'};
export default async function Contacto({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
 const q=await searchParams;const selected=typeof q.auto==='string'&&cars.some(c=>c.slug===q.auto)?q.auto:'';
 return <><header className="page-head"><span className="eyebrow">El comienzo de algo excepcional</span><h1>Hablemos de tu<br/>próxima leyenda<span className="red">.</span></h1><p>Una colección merece una conversación a su altura. Descubre nuestra experiencia de atención personalizada.</p></header><section className="contact-layout"><aside><h2>Siempre, con pasión.</h2><p>Showroom digital ficticio<br/>Bogotá, Colombia</p><a href="mailto:showroom@obsidianmotors.com">showroom@obsidianmotors.com ↗</a><p className="form-note">Dirección de correo ilustrativa. No hay atención comercial real ni vehículos disponibles.</p><p className="meta red">40 automóviles · 4 épocas · Una visión</p></aside><ContactForm selected={selected}/></section></>;
}
