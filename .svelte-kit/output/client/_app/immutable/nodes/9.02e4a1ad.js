import{A as g}from"../chunks/config.c4e28fd4.js";import{S as h,i as P,s as y,k as b,y as c,a as w,l as A,m as S,z as f,c as j,h as d,b as v,A as l,C,g as u,d as _,B as $}from"../chunks/index.78e4d4d0.js";import{P as I}from"../chunks/PersonCard.58d8ce11.js";import{P as U}from"../chunks/PersonForm.18eb1b0b.js";async function z({fetch:o,params:n}){return{person:await(await o(g+"person/"+n.personId)).json()}}const F=Object.freeze(Object.defineProperty({__proto__:null,load:z},Symbol.toStringTag,{value:"Module"}));function E(o){let n,t,s,a,i;return t=new I({props:{person:o[0],noEdit:!0}}),a=new U({props:{person:o[0]}}),a.$on("personUpdated",o[1]),{c(){n=b("main"),c(t.$$.fragment),s=w(),c(a.$$.fragment)},l(e){n=A(e,"MAIN",{});var r=S(n);f(t.$$.fragment,r),s=j(r),f(a.$$.fragment,r),r.forEach(d)},m(e,r){v(e,n,r),l(t,n,null),C(n,s),l(a,n,null),i=!0},p(e,[r]){const m={};r&1&&(m.person=e[0]),t.$set(m);const p={};r&1&&(p.person=e[0]),a.$set(p)},i(e){i||(u(t.$$.fragment,e),u(a.$$.fragment,e),i=!0)},o(e){_(t.$$.fragment,e),_(a.$$.fragment,e),i=!1},d(e){e&&d(n),$(t),$(a)}}}function M(o,n,t){let{data:s}=n,{person:a}=s;function i(e){t(0,a=e.detail)}return o.$$set=e=>{"data"in e&&t(2,s=e.data)},[a,i,s]}class L extends h{constructor(n){super(),P(this,n,M,E,y,{data:2})}}export{L as component,F as universal};
