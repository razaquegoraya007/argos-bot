'use strict';function _2i(c,a){return new Date(c.replace(".","-"))<=new Date(a.replace(".","-"))}let _xt=_qf(function*(){let c=yield _Mt("trigActList"),a={totalTrigActs:c.length,enabledTrigActs:0,usedActions:[]};for(let [,b]of c){b.disabled||++a.enabledTrigActs;for(let [d,e,g]of _2t(b.actions||{}))"action"!=d||g.keyId||a.usedActions.add(e)}return a});
function _S(c){let a=["LOCAL","errorEvts",c];_Mt(...a)(b=>{b||(b={});const d=Date.now()/1E3/60/60/24|0;b[d]=(b[d]||0)+1;for(let e in b)6<d-e&&delete b[e];_O(a,b,0)})}function _gf(){return c=>{let a=["LOCAL","errorEvts"];_Mt(...a)(b=>{let d={};b||(b={});const e=Date.now()/1E3/60/60/24|0;for(let [g,h]of b){let f=0;for(let [k,l]of h)6<e-k?delete h[k]:f+=l;d[g]=f?f/Object.keys(h).length:f}_O(a,b,0);c(d)})}}
function _vy(c,a){_2i(c,a)&&_mt(function*(){for(var b=1;5>b;++b){var d=yield _7d(_Vg,yield _ao(_4i,"binary"));if(0==d)break;yield _Fy(5E3)}_Pf("NH0-update",{error:d,n:b})})}function _o(c){2E3<c&&setTimeout(()=>{let a=_wk("NHInitData")||{cnt:0,avg:0,max:0,from:Date.now()};a.avg=(c+a.avg*a.cnt)/(a.cnt+1);a.max=Math.max(c,a.max);++a.cnt;let b=(Date.now()-a.from)/864E5;5<b&&(_Pf("NHInitData",a.sc().add({days:b})),a=void 0);_D("NHInitData",a)})};
