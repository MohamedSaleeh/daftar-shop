import {ReactNode} from 'react';
import {X,Inbox,ArrowUpLeft} from 'lucide-react';
import {Currency,currencies,symbols} from '../domain/model';
export function Button({children,onClick,secondary=false,danger=false,disabled=false,type='button'}:{children:ReactNode;onClick?:()=>void;secondary?:boolean;danger?:boolean;disabled?:boolean;type?:'button'|'submit'}){return <button type={type} className={`btn ${secondary?'secondary':''} ${danger?'danger':''}`} disabled={disabled} onClick={onClick}>{children}</button>}
export function Field({label,children}:{label:string;children:ReactNode}){return <label className="field"><span>{label}</span>{children}</label>}
export function NumberInput({value,onChange,min=0,placeholder='0'}:{value:number|string;onChange:(n:number)=>void;min?:number;placeholder?:string}){return <input type="number" dir="ltr" inputMode="decimal" step="any" min={min} value={value} placeholder={placeholder} onChange={e=>onChange(Number(e.target.value))}/>}
export function CurrencySelect({value,onChange}:{value:Currency;onChange:(c:Currency)=>void}){return <select value={value} onChange={e=>onChange(e.target.value as Currency)}>{currencies.map(c=><option key={c} value={c}>{c} — {symbols[c]}</option>)}</select>}
export function CurrencyTabs({value,onChange}:{value:Currency;onChange:(c:Currency)=>void}){return <div className="tabs currency">{currencies.map(c=><button key={c} className={value===c?'active':''} onClick={()=>onChange(c)}>{symbols[c]} <small>{c}</small></button>)}</div>}
export function Modal({title,children,onClose,wide=false}:{title:string;children:ReactNode;onClose:()=>void;wide?:boolean}){return <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)onClose()}}><section role="dialog" aria-modal="true" aria-label={title} className={`modal ${wide?'wide':''}`}><header><h2>{title}</h2><button aria-label="إغلاق" className="icon-button" onClick={onClose}><X size={20}/></button></header>{children}</section></div>}
export function Empty({text,action}:{text:string;action?:ReactNode}){return <div className="empty"><Inbox size={34}/><h3>{text}</h3><p>خطوة صغيرة، ودفترك يصير أوضح.</p>{action}</div>}
export function ErrorText({text}:{text:string}){return text?<p role="alert" className="error">{text}</p>:null}
export function SectionTitle({title,subtitle,action}:{title:string;subtitle?:string;action?:ReactNode}){return <div className="section-title"><div><h1>{title}</h1>{subtitle&&<p>{subtitle}</p>}</div>{action}</div>}
export function Card({children,className=''}:{children:ReactNode;className?:string}){return <section className={'card '+className}>{children}</section>}
export const Arrow=()=> <ArrowUpLeft size={17}/>;
export const date=(s:string)=>new Date(s).toLocaleString('ar-SY',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
