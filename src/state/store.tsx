import {createContext,useContext,useState,ReactNode} from 'react';
import {State,emptyState} from '../domain/model';
import {transact} from '../domain/operations';
const KEY='daftar-shop-v1';
import {validateState} from '../domain/backup';
export {validateState} from '../domain/backup';
function load(){try{const raw=localStorage.getItem(KEY);return raw?validateState(JSON.parse(raw)):emptyState()}catch{return emptyState()}}
const Ctx=createContext< {s:State;mutate:(fn:(s:State)=>void)=>void;replace:(s:State)=>void;notice:(m:string)=>void}>(null!);
export function Provider({children}:{children:ReactNode}){const [s,set]=useState(load);const [message,msg]=useState('');const replace=(next:State)=>{try{localStorage.setItem(KEY,JSON.stringify(next));set(next)}catch{throw new Error('لم يتم الحفظ: مساحة المتصفح غير كافية. أنشئ نسخة احتياطية وقلل الصور.')}};const notice=(m:string)=>{msg(m);setTimeout(()=>msg(''),4500)};return <Ctx.Provider value={{s,replace,mutate:fn=>replace(transact(s,fn)),notice}}>{children}{message&&<div role="status" className="toast">{message}</div>}</Ctx.Provider>}
export const useStore=()=>useContext(Ctx);
