import{S as Q,i as W,s as X,k as _,q as C,a as A,l as b,m as g,r as I,h as d,c as D,n as f,b as J,C as n,D as z,a2 as ee,u as te,Z as K,K as U,g as N,d as H,f as ae,R as re,y as le,z as se,A as ne,B as oe,v as ce}from"../chunks/index.78e4d4d0.js";import{a as ie,A as ue}from"../chunks/apiFetch.0eddb5fd.js";function Y(l,e,a){const t=l.slice();return t[1]=e[a][0],t[2]=e[a][1],t}function Z(l){let e,a,t=l[1]+"",s,v,y,i=V(l[2])+"",m;return{c(){e=_("tr"),a=_("td"),s=C(t),v=A(),y=_("td"),m=A(),this.h()},l(h){e=b(h,"TR",{});var u=g(e);a=b(u,"TD",{class:!0});var x=g(a);s=I(x,t),x.forEach(d),v=D(u),y=b(u,"TD",{class:!0});var o=g(y);o.forEach(d),m=D(u),u.forEach(d),this.h()},h(){f(a,"class","px-6 py-2 sm:py-4 flex mt-2 sm:mt-0 whitespace-nowrap"),f(y,"class","px-6 py-2 sm:py-4 whitespace-nowrap")},m(h,u){J(h,e,u),n(e,a),n(a,s),n(e,v),n(e,y),y.innerHTML=i,n(e,m)},p(h,u){u&1&&t!==(t=h[1]+"")&&te(s,t),u&1&&i!==(i=V(h[2])+"")&&(y.innerHTML=i)},d(h){h&&d(e)}}}function fe(l){let e,a,t,s,v,y,i,m,h,u,x=Object.entries(l[0]),o=[];for(let c=0;c<x.length;c+=1)o[c]=Z(Y(l,x,c));return{c(){e=_("table"),a=_("thead"),t=_("tr"),s=_("th"),v=C("Field"),y=A(),i=_("th"),m=C("Value"),h=A(),u=_("tbody");for(let c=0;c<o.length;c+=1)o[c].c();this.h()},l(c){e=b(c,"TABLE",{class:!0});var E=g(e);a=b(E,"THEAD",{});var r=g(a);t=b(r,"TR",{});var T=g(t);s=b(T,"TH",{class:!0});var $=g(s);v=I($,"Field"),$.forEach(d),y=D(T),i=b(T,"TH",{class:!0});var q=g(i);m=I(q,"Value"),q.forEach(d),T.forEach(d),r.forEach(d),h=D(E),u=b(E,"TBODY",{});var P=g(u);for(let j=0;j<o.length;j+=1)o[j].l(P);P.forEach(d),E.forEach(d),this.h()},h(){f(s,"class","px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"),f(i,"class","px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"),f(e,"class","w-full sm:min-w-full divide-y divide-gray-200")},m(c,E){J(c,e,E),n(e,a),n(a,t),n(t,s),n(s,v),n(t,y),n(t,i),n(i,m),n(e,h),n(e,u);for(let r=0;r<o.length;r+=1)o[r]&&o[r].m(u,null)},p(c,[E]){if(E&1){x=Object.entries(c[0]);let r;for(r=0;r<x.length;r+=1){const T=Y(c,x,r);o[r]?o[r].p(T,E):(o[r]=Z(T),o[r].c(),o[r].m(u,null))}for(;r<o.length;r+=1)o[r].d(1);o.length=x.length}},i:z,o:z,d(c){c&&d(e),ee(o,c)}}}function V(l){if(Array.isArray(l)){if(l.length===0)return"--";{let e="<ul>";for(const a of l)e+='<li class="mt-2 border-t border-gray-300">',e+=V(a),e+="</li>";return e+="</ul>",e}}else if(typeof l=="object"){if(Object.keys(l).length===0)return"{}";{let e="<table>";for(const[a,t]of Object.entries(l))e+=`
            <tr>
              <td>${a}</td>
              <td>${V(t)}</td>
            </tr>`;return e+="</table>",e}}else return l}function de(l,e,a){let{data:t}=e;return l.$$set=s=>{"data"in s&&a(0,t=s.data)},[t]}class he extends Q{constructor(e){super(),W(this,e,de,fe,X,{data:0})}}function pe(l){return l.replace(/[^\w\s()]/gi,"").replace(/\s+/g,"")}function G(l){let e,a;return e=new he({props:{data:l[0]}}),{c(){le(e.$$.fragment)},l(t){se(e.$$.fragment,t)},m(t,s){ne(e,t,s),a=!0},p(t,s){const v={};s&1&&(v.data=t[0]),e.$set(v)},i(t){a||(N(e.$$.fragment,t),a=!0)},o(t){H(e.$$.fragment,t),a=!1},d(t){oe(e,t)}}}function me(l){let e,a,t,s,v,y,i,m,h,u,x,o,c,E,r,T,$,q,P,j,p=l[0]&&G(l);return{c(){e=_("main"),a=_("p"),t=C(`Caso queira pesquisar o CNPJ clique
		`),s=_("a"),v=C("aqui"),y=A(),i=_("div"),m=_("label"),h=C("Busca"),u=A(),x=_("div"),o=_("div"),c=_("label"),E=A(),r=_("input"),T=A(),$=_("div"),p&&p.c(),this.h()},l(w){e=b(w,"MAIN",{class:!0});var k=g(e);a=b(k,"P",{class:!0});var O=g(a);t=I(O,`Caso queira pesquisar o CNPJ clique
		`),s=b(O,"A",{href:!0,class:!0});var S=g(s);v=I(S,"aqui"),S.forEach(d),O.forEach(d),y=D(k),i=b(k,"DIV",{class:!0});var B=g(i);m=b(B,"LABEL",{class:!0,for:!0});var F=g(m);h=I(F,"Busca"),F.forEach(d),u=D(B),x=b(B,"DIV",{class:!0});var M=g(x);o=b(M,"DIV",{class:!0});var L=g(o);c=b(L,"LABEL",{class:!0,for:!0}),g(c).forEach(d),E=D(L),r=b(L,"INPUT",{placeholder:!0,class:!0,type:!0,id:!0}),L.forEach(d),M.forEach(d),B.forEach(d),T=D(k),$=b(k,"DIV",{class:!0});var R=g($);p&&p.l(R),R.forEach(d),k.forEach(d),this.h()},h(){f(s,"href","https://www.diretoriobrasil.net/"),f(s,"class","text-blue-800"),f(a,"class","text-center"),f(m,"class","text-center block uppercase tracking-wide font-bold"),f(m,"for","name"),f(c,"class","self-start block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"),f(c,"for","name"),f(r,"placeholder","Pesquisa geral"),f(r,"class","appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"),f(r,"type","text"),f(r,"id","searchText"),f(o,"class","flex flex-col items-center md:w-1/2"),f(x,"class","flex flex-col md:flex-row items-center justify-center"),f(i,"class","items-center text-center"),f($,"class","p-4 mt-10"),f(e,"class","mt-4")},m(w,k){J(w,e,k),n(e,a),n(a,t),n(a,s),n(s,v),n(e,y),n(e,i),n(i,m),n(m,h),n(i,u),n(i,x),n(x,o),n(o,c),n(o,E),n(o,r),K(r,l[1]),n(e,T),n(e,$),p&&p.m($,null),q=!0,P||(j=[U(r,"input",l[3]),U(r,"keydown",l[4])],P=!0)},p(w,[k]){k&2&&r.value!==w[1]&&K(r,w[1]),w[0]?p?(p.p(w,k),k&1&&N(p,1)):(p=G(w),p.c(),N(p,1),p.m($,null)):p&&(ce(),H(p,1,1,()=>{p=null}),ae())},i(w){q||(N(p),q=!0)},o(w){H(p),q=!1},d(w){w&&d(e),p&&p.d(),P=!1,re(j)}}}function _e(l,e,a){let t=null,s;async function v(m){try{const{data:h}=await ie.get(ue.externalAPI.fetchCNPJData+pe(m));a(0,t=h)}catch(h){console.log(h)}}function y(){s=this.value,a(1,s)}const i=m=>m.key==="Enter"&&v(s);return l.$$.update=()=>{l.$$.dirty&1},[t,s,v,y,i]}class ve extends Q{constructor(e){super(),W(this,e,_e,me,X,{})}}export{ve as component};
