import{X as ne,S as Z,i as W,s as ee,Y as le,k as y,q as D,a as x,l as v,m as k,r as B,h as f,c as L,n as _,b as C,C as p,Z as K,K as H,_ as se,g as $,d as A,R as oe,$ as ce,D as S,w as te,a0 as ie,y as V,z as R,A as U,a1 as ue,B as q,f as ae,o as fe,v as re,a2 as he,O as pe,P as me}from"../chunks/index.78e4d4d0.js";import{g as de}from"../chunks/navigation.55c11801.js";import{A as F,a as _e}from"../chunks/apiFetch.0eddb5fd.js";import{A as ge,t as be}from"../chunks/config.c4e28fd4.js";import{I as ye,P as ve}from"../chunks/Pagination.a9f16dd6.js";import{C as ke}from"../chunks/CompanyCard.275e1a09.js";import{L as Ee}from"../chunks/Loader.b35f0416.js";import{g as we}from"../chunks/tagQueries.f543cd75.js";import{c as Se,S as Pe}from"../chunks/Select.8a162bf7.js";import{f as Te}from"../chunks/index.8852ef22.js";const Ie=ne(ye);async function Q(i=1,e=Ie){return await fetch(ge+F.company.get+`?page=${i}&limit=${e}`)}function $e(i){return{c:S,l:S,m:S,p:S,i:S,o:S,d:S}}function Ae(i){let e,t,r,l,n,o;function a(c){i[7](c)}let u={placeholder:"Pesquisar por tags",items:i[10],multiple:!0,filter:Se};return i[3]!==void 0&&(u.value=i[3]),l=new Pe({props:u}),te.push(()=>ie(l,"value",a)),{c(){e=y("label"),t=D("Tags"),r=x(),V(l.$$.fragment),this.h()},l(c){e=v(c,"LABEL",{class:!0,for:!0});var s=k(e);t=B(s,"Tags"),s.forEach(f),r=L(c),R(l.$$.fragment,c),this.h()},h(){_(e,"class","self-start block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"),_(e,"for","tags")},m(c,s){C(c,e,s),p(e,t),C(c,r,s),U(l,c,s),o=!0},p(c,s){const E={};!n&&s&8&&(n=!0,E.value=c[3],ue(()=>n=!1)),l.$set(E)},i(c){o||($(l.$$.fragment,c),o=!0)},o(c){A(l.$$.fragment,c),o=!1},d(c){c&&f(e),c&&f(r),q(l,c)}}}function Ce(i){let e,t;return{c(){e=y("p"),t=D("Loading Search...")},l(r){e=v(r,"P",{});var l=k(e);t=B(l,"Loading Search..."),l.forEach(f)},m(r,l){C(r,e,l),p(e,t)},p:S,i:S,o:S,d(r){r&&f(e)}}}function xe(i){let e,t,r,l,n,o,a,u,c,s,E,I,g,P,m,w,j,d,h={ctx:i,current:null,token:null,hasCatch:!1,pending:Ce,then:Ae,catch:$e,value:10,blocks:[,,,]};return le(i[4],h),{c(){e=y("main"),t=y("label"),r=D("Busca"),l=x(),n=y("div"),o=y("div"),a=y("label"),u=D("Texto"),c=x(),s=y("input"),E=x(),h.block.c(),I=x(),g=y("div"),P=y("button"),m=D("Buscar"),this.h()},l(T){e=v(T,"MAIN",{});var b=k(e);t=v(b,"LABEL",{class:!0,for:!0});var N=k(t);r=B(N,"Busca"),N.forEach(f),l=L(b),n=v(b,"DIV",{class:!0});var M=k(n);o=v(M,"DIV",{class:!0});var O=k(o);a=v(O,"LABEL",{class:!0,for:!0});var z=k(a);u=B(z,"Texto"),z.forEach(f),c=L(O),s=v(O,"INPUT",{placeholder:!0,class:!0,type:!0,id:!0}),E=L(O),h.block.l(O),O.forEach(f),I=L(M),g=v(M,"DIV",{class:!0});var G=k(g);P=v(G,"BUTTON",{class:!0});var J=k(P);m=B(J,"Buscar"),J.forEach(f),G.forEach(f),M.forEach(f),b.forEach(f),this.h()},h(){_(t,"class","text-center block uppercase tracking-wide font-bold"),_(t,"for","name"),_(a,"class","self-start block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"),_(a,"for","name"),_(s,"placeholder","Pesquisa geral"),_(s,"class","appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"),_(s,"type","text"),_(s,"id","searchText"),_(o,"class","flex flex-col items-center md:w-1/2"),_(P,"class","btn variant-filled-primary ml-3"),_(g,"class","flex items-center justify-center md:ml-10 mt-4 md:mt-0"),_(n,"class","flex flex-col md:flex-row items-center justify-center")},m(T,b){C(T,e,b),p(e,t),p(t,r),p(e,l),p(e,n),p(n,o),p(o,a),p(a,u),p(o,c),p(o,s),K(s,i[2]),p(o,E),h.block.m(o,h.anchor=null),h.mount=()=>o,h.anchor=null,p(n,I),p(n,g),p(g,P),p(P,m),w=!0,j||(d=[H(s,"input",i[5]),H(s,"keydown",i[6]),H(P,"click",i[8])],j=!0)},p(T,[b]){i=T,b&4&&s.value!==i[2]&&K(s,i[2]),se(h,i,b)},i(T){w||($(h.block),w=!0)},o(T){for(let b=0;b<3;b+=1){const N=h.blocks[b];A(N)}w=!1},d(T){T&&f(e),h.block.d(),h.token=null,h=null,j=!1,oe(d)}}}function Le(i,e,t){let{endpoint:r}=e;const l=ce();let n=we(),o="",a=[];async function u(g,P){if(a&&a.length>0){const m=a.map(w=>w.value.trim());P.tags=m}else delete P.tags;try{const m=await _e.get(g+"?"+new URLSearchParams(P).toString());console.log("SHOULD DISPATCH",await m.data),l("search",{data:await m.data,params:P})}catch(m){return console.log(m),new Error(JSON.stringify(m))}}function c(){o=this.value,t(2,o)}const s=g=>g.key==="Enter"&&u(r,{tags:a,query:o});function E(g){a=g,t(3,a)}const I=()=>u(r,{tags:a,query:o});return i.$$set=g=>{"endpoint"in g&&t(0,r=g.endpoint)},[r,u,o,a,n,c,s,E,I]}class De extends Z{constructor(e){super(),W(this,e,Le,xe,ee,{endpoint:0,handleSearch:1})}get handleSearch(){return this.$$.ctx[1]}}function X(i,e,t){const r=i.slice();return r[12]=e[t],r}function Be(i){let e,t,r;return{c(){e=y("div"),t=y("p"),r=D("Não foi possível carregar empresas.."),this.h()},l(l){e=v(l,"DIV",{class:!0});var n=k(e);t=v(n,"P",{});var o=k(t);r=B(o,"Não foi possível carregar empresas.."),o.forEach(f),n.forEach(f),this.h()},h(){_(e,"class","flex justify-center mx-4 my-6")},m(l,n){C(l,e,n),p(e,t),p(t,r)},p:S,i:S,o:S,d(l){l&&f(e)}}}function Ne(i){let e,t,r,l=i[0],n=[];for(let a=0;a<l.length;a+=1)n[a]=Y(X(i,l,a));const o=a=>A(n[a],1,1,()=>{n[a]=null});return t=new ve({props:{currentPage:i[1],totalPages:i[6],onPageChange:i[11]}}),{c(){for(let a=0;a<n.length;a+=1)n[a].c();e=x(),V(t.$$.fragment)},l(a){for(let u=0;u<n.length;u+=1)n[u].l(a);e=L(a),R(t.$$.fragment,a)},m(a,u){for(let c=0;c<n.length;c+=1)n[c]&&n[c].m(a,u);C(a,e,u),U(t,a,u),r=!0},p(a,u){if(u&1){l=a[0];let s;for(s=0;s<l.length;s+=1){const E=X(a,l,s);n[s]?(n[s].p(E,u),$(n[s],1)):(n[s]=Y(E),n[s].c(),$(n[s],1),n[s].m(e.parentNode,e))}for(re(),s=l.length;s<n.length;s+=1)o(s);ae()}const c={};u&2&&(c.currentPage=a[1]),u&64&&(c.totalPages=a[6]),u&63&&(c.onPageChange=a[11]),t.$set(c)},i(a){if(!r){for(let u=0;u<l.length;u+=1)$(n[u]);$(t.$$.fragment,a),r=!0}},o(a){n=n.filter(Boolean);for(let u=0;u<n.length;u+=1)A(n[u]);A(t.$$.fragment,a),r=!1},d(a){he(n,a),a&&f(e),q(t,a)}}}function je(i){let e,t,r;return t=new Ee({}),{c(){e=y("div"),V(t.$$.fragment),this.h()},l(l){e=v(l,"DIV",{class:!0});var n=k(e);R(t.$$.fragment,n),n.forEach(f),this.h()},h(){_(e,"class","flex justify-center mx-4 my-6")},m(l,n){C(l,e,n),U(t,e,null),r=!0},p:S,i(l){r||($(t.$$.fragment,l),r=!0)},o(l){A(t.$$.fragment,l),r=!1},d(l){l&&f(e),q(t)}}}function Oe(i){let e,t,r;return{c(){e=y("div"),t=y("p"),r=D("Nenhuma empresa encontrada"),this.h()},l(l){e=v(l,"DIV",{class:!0});var n=k(e);t=v(n,"P",{});var o=k(t);r=B(o,"Nenhuma empresa encontrada"),o.forEach(f),n.forEach(f),this.h()},h(){_(e,"class","flex justify-center mx-4 my-2")},m(l,n){C(l,e,n),p(e,t),p(t,r)},p:S,i:S,o:S,d(l){l&&f(e)}}}function Y(i){let e,t,r,l,n;return t=new ke({props:{company:i[12]}}),{c(){e=y("a"),V(t.$$.fragment),this.h()},l(o){e=v(o,"A",{href:!0});var a=k(e);R(t.$$.fragment,a),a.forEach(f),this.h()},h(){_(e,"href",r=`/company/${i[12]._id}`)},m(o,a){C(o,e,a),U(t,e,null),n=!0},p(o,a){i=o;const u={};a&1&&(u.company=i[12]),t.$set(u),(!n||a&1&&r!==(r=`/company/${i[12]._id}`))&&_(e,"href",r)},i(o){n||($(t.$$.fragment,o),l||pe(()=>{l=me(e,Te,be.defaultFlyEntry),l.start()}),n=!0)},o(o){A(t.$$.fragment,o),n=!1},d(o){o&&f(e),q(t)}}}function Ve(i){let e,t,r,l,n,o,a,u,c,s,E,I,g,P={endpoint:F.company.search};a=new De({props:P}),i[10](a),a.$on("search",i[8]);const m=[Oe,je,Ne,Be],w=[];function j(d,h){return d[0]&&d[0].length===0?0:d[5]?1:d[0]&&d[0].length>0?2:3}return c=j(i),s=w[c]=m[c](i),{c(){e=y("main"),t=y("div"),r=y("button"),l=D("Criar Empresa"),n=x(),o=y("div"),V(a.$$.fragment),u=x(),s.c(),this.h()},l(d){e=v(d,"MAIN",{});var h=k(e);t=v(h,"DIV",{class:!0});var T=k(t);r=v(T,"BUTTON",{type:!0,class:!0});var b=k(r);l=B(b,"Criar Empresa"),b.forEach(f),T.forEach(f),n=L(h),o=v(h,"DIV",{class:!0});var N=k(o);R(a.$$.fragment,N),N.forEach(f),u=L(h),s.l(h),h.forEach(f),this.h()},h(){_(r,"type","button"),_(r,"class","text-black bg-green-400 p-2 rounded-2xl"),_(t,"class","flex justify-end my-2 mx-4"),_(o,"class","p-4")},m(d,h){C(d,e,h),p(e,t),p(t,r),p(r,l),p(e,n),p(e,o),U(a,o,null),p(e,u),w[c].m(e,null),E=!0,I||(g=H(r,"click",i[9]),I=!0)},p(d,[h]){const T={};a.$set(T);let b=c;c=j(d),c===b?w[c].p(d,h):(re(),A(w[b],1,1,()=>{w[b]=null}),ae(),s=w[c],s?s.p(d,h):(s=w[c]=m[c](d),s.c()),$(s,1),s.m(e,null))},i(d){E||($(a.$$.fragment,d),$(s),E=!0)},o(d){A(a.$$.fragment,d),A(s),E=!1},d(d){d&&f(e),i[10](null),q(a),w[c].d(),I=!1,g()}}}function Re(i,e,t){let r,l,n,o={},a=!1,u=!0,c=1,s=1;fe(async()=>{const m=await Q();t(2,r=await m.json()),t(0,l=(r==null?void 0:r.data)??null),t(6,s=(r==null?void 0:r.totalPages)??1),t(5,u=!1)});function E(m){t(5,u=!0),t(2,r=m.detail.data),r?(t(0,l=r.data),t(6,s=r.totalPages)):t(0,l=null),a||t(1,c=1),t(4,a=!0),t(5,u=!1)}const I=()=>de("/company/new");function g(m){te[m?"unshift":"push"](()=>{n=m,t(3,n)})}const P=async m=>{if(t(5,u=!0),a)console.log(n),console.log("SEARCH"),n.handleSearch(F.company.search,{...o,page:m});else{const w=await Q(m);t(2,r=await w.json()),t(0,l=r==null?void 0:r.data)}t(1,c=m),t(5,u=!1),window.scrollTo({top:0,behavior:"smooth"})};return i.$$.update=()=>{i.$$.dirty&3},[l,c,r,n,a,u,s,o,E,I,g,P]}class Xe extends Z{constructor(e){super(),W(this,e,Re,Ve,ee,{})}}export{Xe as component};
