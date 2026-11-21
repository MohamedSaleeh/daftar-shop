export type Currency = 'SYP'|'USD'|'TRY';
export const currencies:Currency[]=['SYP','USD','TRY'];
export const symbols:Record<Currency,string>={SYP:'ل.س',USD:'$',TRY:'₺'};
export const uid=():string=>{if(typeof crypto.randomUUID==='function')return crypto.randomUUID();const b=crypto.getRandomValues(new Uint8Array(16));b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;const h=Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;};
export const now=()=>new Date().toISOString();
export const round=(n:number)=>Math.round((n+Number.EPSILON)*10000)/10000;
export const money=(n:number,c:Currency)=>`${new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(n)} ${symbols[c]}`;
export interface RecordBase {id:string;createdAt:string;updatedAt:string;status:string}
export interface ProductVariant extends RecordBase {productId:string;name:string;attributes:{name:string;value:string}[];unit:string;price:number;currency:Currency;tracked:boolean;stock:number;trackedSince?:string;threshold:number;cost?:number;costCurrency?:Currency;pack?:{name:string;factor:number}}
export interface Person extends RecordBase {name:string;kind:'customer'|'supplier';phone:string;note:string}
export interface SaleItem {id:string;productId:string;name:string;qty:number;unit:string;factor:number;price:number;cost?:number;tracked:boolean;returned:number}
export interface Payment {id:string;createdAt:string;currency:Currency;amount:number;settled:number;rate:number;kind:'initial'|'collection'|'refund'}
export interface Invoice extends RecordBase {kind:'sale'|'purchase';number:string;personId:string;currency:Currency;items:SaleItem[];discount:number;total:number;paid:number;returned:number;payments:Payment[];history:{at:string;text:string}[];attachment?:string;note:string}
export interface CashMovement {id:string;createdAt:string;currency:Currency;amount:number;label:string;operationId:string;category:string}
export interface LedgerEntry {id:string;createdAt:string;personId:string;currency:Currency;amount:number;label:string;operationId:string;exchange?:{paymentCurrency:Currency;amount:number;rate:number;settled:number}}
export interface InventoryMovement {id:string;createdAt:string;productId:string;qty:number;label:string;operationId:string}
export interface SaleReturn {id:string;createdAt:string;invoiceId:string;itemId:string;qty:number;amount:number;restock:boolean;mode:'cash'|'debt'}
export interface State {version:1;shop:{name:string;type:string;currency:Currency;ready:boolean};products:ProductVariant[];people:Person[];invoices:Invoice[];cash:CashMovement[];ledger:LedgerEntry[];inventory:InventoryMovement[];returns:SaleReturn[];sessions:{id:string;createdAt:string;currency:Currency;expected:number;actual:number;note:string}[];archives:{id:string;createdAt:string;personId:string;currency:Currency;amount:number;image:string;note:string}[];rates:Record<string,number>;license:{local:boolean;cloud:boolean;trialEnd:string;offline:boolean};}
export const emptyState=():State=>({version:1,shop:{name:'محلي',type:'',currency:'SYP',ready:false},products:[],people:[],invoices:[],cash:[],ledger:[],inventory:[],returns:[],sessions:[],archives:[],rates:{},license:{local:false,cloud:false,trialEnd:new Date(Date.now()+30*86400000).toISOString(),offline:false}});
export const readOnly=(s:State)=>!s.license.local&&!s.license.cloud&&new Date(s.license.trialEnd).getTime()<Date.now();
export const cashBalance=(s:State,c:Currency)=>round(s.cash.filter(m=>m.currency===c).reduce((a,m)=>a+m.amount,0));
export const debt=(s:State,id:string,c:Currency)=>round(s.ledger.filter(m=>m.personId===id&&m.currency===c).reduce((a,m)=>a+m.amount,0));
export const remaining=(i:Invoice)=>round(i.total-i.returned-i.paid);
export const label=(p:ProductVariant)=>[p.name,...p.attributes.map(a=>a.value)].join(' — ');
export function assert(ok:unknown,message:string):asserts ok {if(!ok)throw new Error(message)}
export const positive=(n:number)=>Number.isFinite(n)&&n>0;
export const nonnegative=(n:number)=>Number.isFinite(n)&&n>=0;
export const base=()=>({id:uid(),createdAt:now(),updatedAt:now(),status:'active'});
