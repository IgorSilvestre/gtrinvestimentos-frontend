import{w as I}from"./index.08e11ec5.js";import{X as w}from"./index.78e4d4d0.js";const _={message:"Missing Toast Message",autohide:!0,timeout:5e3};function T(){const r=Math.random();return Number(r).toString(32)}function h(r){if(r.autohide===!0)return setTimeout(()=>{z.close(r.id)},r.timeout)}function v(){const{subscribe:r,set:c,update:n}=I([]);return{subscribe:r,trigger:t=>{const e=T();return n(a=>{t&&t.callback&&t.callback({id:e,status:"queued"}),t.hideDismiss&&(t.autohide=!0);const s={..._,...t,id:e};return s.timeoutId=h(s),a.push(s),a}),e},close:t=>n(e=>{if(e.length>0){const a=e.findIndex(i=>i.id===t),s=e[a];s&&(s.callback&&s.callback({id:t,status:"closed"}),s.timeoutId&&clearTimeout(s.timeoutId),e.splice(a,1))}return e}),freeze:t=>n(e=>(e.length>0&&clearTimeout(e[t].timeoutId),e)),unfreeze:t=>n(e=>(e.length>0&&(e[t].timeoutId=h(e[t])),e)),clear:()=>c([])}}const z=v(),d={};function b(r){return r==="local"?localStorage:sessionStorage}function f(r,c,n){const t=(n==null?void 0:n.serializer)??JSON,e=(n==null?void 0:n.storage)??"local";function a(s,i){b(e).setItem(s,t.stringify(i))}if(!d[r]){const s=I(c,u=>{const o=b(e).getItem(r);o&&u(t.parse(o));{const m=l=>{l.key===r&&u(l.newValue?t.parse(l.newValue):null)};return window.addEventListener("storage",m),()=>window.removeEventListener("storage",m)}}),{subscribe:i,set:g}=s;d[r]={set(u){a(r,u),g(u)},update(u){const o=u(w(s));a(r,o),g(o)},subscribe:i}}return d[r]}f("modeOsPrefers",!1);f("modeUserPrefers",void 0);f("modeCurrent",!1);export{z as t};
