import{D as u,S as c,d as w,r as h,o as b,g as p,s as f,a as y,c as i,b as v,e,L as E,w as L,T as C,f as S,F as x,h as k,t as d,i as l,_ as D}from"./index-BXCxKjZJ.js";const N=()=>{const a=[...u.map(r=>r.name)].sort(()=>Math.random()-.5);return u.map((r,s)=>({...r,name:a[s]}))},g=_=>_==="easy"?c.winnersEasy:_==="medium"?c.winnersMedium:_==="hard"?c.winnersHard:c.winnersCustom,B={class:"honor"},R={class:"honor__player"},T={class:"honor__span honor__span_place"},F={class:"honor__namePlayer"},H={class:"honor__span honor__span_score"},M=w({__name:"HonorBoard",setup(_){const a=h("easy"),n=h([]),r=s=>{s.stopPropagation();const o=s.target;if(o!=null&&o.textContent){a.value=o.textContent.trim().toLowerCase();const t=p(g(a.value));if(t)n.value=t;else{const m=N();n.value=m,f(m,g(a.value))}}};return b(()=>{const s=p(c.winnersEasy);s?n.value=s:(f(u,c.winnersEasy),n.value=u)}),y(()=>{window.removeEventListener("click",r)}),(s,o)=>(l(),i("div",B,[v(E),e("menu",{class:"honor__menu",onClick:r},o[0]||(o[0]=[e("button",{class:"honor__btn"},"easy",-1),e("button",{class:"honor__btn"},"medium",-1),e("button",{class:"honor__btn"},"hard",-1),e("button",{class:"honor__btn"},"custom",-1)])),v(C,{name:"fade-slide",mode:"out-in"},{default:L(()=>[n.value.length?(l(),i("ul",{class:"honor__listWinners",key:a.value},[(l(!0),i(x,null,k(n.value,t=>(l(),i("li",{key:t.id,class:"honor__list"},[e("div",R,[e("span",T,d(t.place),1),e("p",F,d(t.name),1),e("span",H,d(t.score),1)])]))),128))])):S("",!0)]),_:1})]))}}),W=D(M,[["__scopeId","data-v-62d3bbb3"]]);export{W as default};
