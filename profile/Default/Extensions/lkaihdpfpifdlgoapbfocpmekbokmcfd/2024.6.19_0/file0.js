'use strict';const _yy=0,_Df=1,_ui=2,_Hh=3,_Af=4,_Eu=5,_yh=6,_Ms=7,_py=8,_Kg=1,_5i=2,_ph=10,_8r=3,_4e=4,_cd=5,_zw=6,_Id=7,_6u=8,_x=9,_ku=11,_cg=12,_bk=13,_ip=14,_xp=15;let _Gr={},_Fs,_el={};
{let p,w,N,O,P,G,H,Q;var _4t=function(c,a={},d){p={map:{},list:[],urlTests:[],combinSequences:{},gestures:[],neededCaretSt:0};w={trigRepTime:.6,trigStepTime:1.5}.add(d);w.dfltWldcrd=null==w.dfltWldcrd?_go:+w.dfltWldcrd;_ng(w.dfltGestPreconds=a.preconds||{},"chromeState",{active:1});P=O=N=0;G=[{},{}];_Ct=H=!1;_el={};_Fs=parseInt(_np.substr(22,2),36);for(let [h,m]of c)m.disabled||K(m.triggers||[],{type:_Df,param:+h+_Fs});_kd(a,"begin",0,"combins","length")&&_kd(a,"end",0,"combins","length")&&(K(a.end,
{type:_Af,state:!1}),K(a.begin,{type:_Af,state:!0,timeout:a.timeout}));c=p;w=G=p=null;return c};let K=function(c,a){Q=0;for(let d of c)_Cs(d)||R(d,a)},n=function(c,a,d=[],h=[],m="back"){m=m.split(" ");a=a.sc();let k=p.list.push(a)-1;a.preconds=X(d,h,k,"noExtraActions".in(m));0==a.preconds.length&&delete a.preconds;c=S(c);for(let l of c)_ng(p.map,l+19893+171,[])["front".in(m)?"unshift":"push"](k);return k},Y=function(c){c={part:c.part,regex:_i(c.value,c.type).source};let a=_Je(p.urlTests,c);-1==a&&
(a=p.urlTests.push(c)-1);return a},X=function(c,a,d,h=!1){let m=[],k=[],l=[],t={};for(let b of c.concat(a)){a=null;if(b.urlTest)b.urlTest.value&&(a={type:_8r,testIdx:Y(b.urlTest)});else if("chromeState"in b)a=b.chromeState||{},a=[void 0,{type:_5i,value:1},{type:_5i,value:0},{type:_ph,value:1},{type:_ph,value:0},{type:_5i,value:0,negate:!0},{type:_5i,value:1,negate:!0},null][(a.active?1:0)|(a.inactive?2:0)|(a.closed?4:0)];else if(b.menuState)a={type:_bk,menuNum:_Hs(b.menuState.menuId)};else if(b.caretState){var f=
b.caretState;f.off&&f.on&&f.omnibox||(a={type:_cg,value:f.off|f.on<<1|f.omnibox<<2},p.neededCaretSt|=a.value)}else b.mouseOver?a={type:_ip,value:b.mouseOver.region}:b.swtchState?(f=b.swtchState,f.swtchId&&(a={type:_cd,swtchId:+_Yf(f.swtchId)[1],state:f.state,oper:_xs(f.oper)})):b.wildcard?(f=b.wildcard==_go?w.dfltWldcrd:b.wildcard)&&(a={type:_zw,value:f}):"keyStateChange"in b?a={type:_x,value:+b.keyStateChange}:b.prevSeqStep?a={type:_4e,maxTime:b.maxTime}.add(b.prevSeqStep):"actionState"in b?a={type:_Id,
value:b.actionState,actIdx:b.actIdx}:"actionDone"in b?a={type:_6u,value:+b.actionDone,actIdx:b.actIdx}:b.mouseGestState?a={type:_ku,value:b.mouseGestState}:b.clipFmt?a={type:_xp,value:b.clipFmt}:b.keyEvt&&(f=_T(b.keyEvt,!0),f.isDownUp&&!f.miscNum&&(b.keyEvt=f.num|f.type),a=S(b.keyEvt),a={type:_Kg,key1:a[0],key2:a[1],toggleState:b.toggleState},_We(f)&&(p.usesJoystk=!0),!h&&b.block&&L(f)&&!b.toggleState&&(f=n(b.keyEvt,{type:_yy,block:!0},c),n(b.keyEvt,{type:_yh,actIdx:d},T(c),[{keyStateChange:!0}]),
p.list[d].type.in(_py,_Hh)||(n(b.keyEvt|_Lw,{type:_ui,param:_xs("Y")},E(c),[{actionDone:!0,actIdx:f},{actionState:_xs("D"),actIdx:d,negate:!0}]),b.block==_Hd&&n(b.keyEvt|_Lw,{type:_yy,block:!0},E(c),[{actionDone:!0,actIdx:f},{actionState:_xs("D"),actIdx:d}]))));if(a){f=+b.negate==_5d;if(+b.negate&&!f||"not"==b.oper)a.negate=!0;!a.type.in(_8r,_bk,_ip)||a.negate||f||"and"==b.oper?a.type==_ip?k.push(a):a.type==_cd?l.push(a):m.push(a):_ng(t,a.type,[]).push(a)}}l.length&&(l[l.length-1].mark=_xs("S"));
c=[];for(let [,b]of t)1==b.length?c.unshift(b[0]):(b[0].mark=_xs("F"),b[b.length-1].mark=_xs("L"),c.push(...b));return m.concat(l,c,k)},Z=function(c){const a={[_8f]:Symbol(),[_Vs]:"domain",[_lp]:"mainDomain",[_rk]:"path"};let d=[];for(let h of c)if(h.value)d[h.negate?"unshift":"push"]({part:a[h.part],regex:_i(h.value,h.type),negate:h.negate});return h=>{let m=_sw(h),k=[];for(let f of m){a:{var l=_ra[f]||_uu(_ts[f]);for(let b of d){var t=b.negate;if(b.regex.test(b.part==a[_8f]?l:_7o(l,b.part))==(b.negate!=
_5d)){l=!b.negate;break a}}l=t}l&&k.push(f)}return k.length?m.length==k.length?h:_ds(null,{tabs:k}):!1}},aa=function(c){let a=[];for(let d of c||[])if(d.mouseMove&&(c=p.gestures.indexOf(d.mouseMove),-1==c&&(c=p.gestures.push(d.mouseMove)-1),d.eventId=c|_tk),a.push(d),1<+d.repCount){c=d.sc().del("negateSeq").add({maxTime:w.trigRepTime});for(let h=1;h<+d.repCount;++h)a.push(c)}return a},R=function(c,a){const d=_wf(c),h=a.sc(),m=++N,k={},l=aa(d.combins);var t={seqId:m,stepId:0};let f=!1;_ng(d,"preconds");
for(var b=0;b<l.length;++b){let e=l[b];if(!e.eventId)continue;let g=_T(e.eventId,!0),z,B=[];if(g.type==_Wd){if(g.num==_Ta)B.push({clipFmt:e.clipFmt}),e.diffCont&&(e.eventId=_ze|_Wd,g=_T(e.eventId,!0));else if(g.num==_8a){if(!e.evtName)continue;_ng(p,"extEvtNames")[e.evtName.trim().toUpperCase()]=e.eventId-=P++;g=_T(e.eventId,!0)}else _Uj(g.num)&&e.btnId&&(e.eventId=e.btnId,e.block=e.btnId<_Pg?_bt:_Hd,z={mouseOver:[{region:_ew+1+g.num-_yu}]},g=_T(e.eventId,!0));g.num<_Ta&&(_el[g.num]=!0)}else g.type==
_tk&&(f=!0);let I=L(g);g.isDownUp&&!g.miscNum&&(e.eventId=g.num|g.type);var A=b==l.length-1;let C=U(e),u=ba(e,g),ca=u?U(u):void 0;_We(g)&&(p.usesJoystk=!0);1<l.length&&(k[g.devId]=1,k.add(C),f&&(k[_oh]=1));const r=A?e.noAutoRep&&I&&g.devId==_zd?h.add({autoRep:!1}):h:{type:_Ms,param:{seqId:m,stepId:b+1}};r.block=!!e.block;r.PBC=C;if(0==b)if(f)for(let [y,x]of w.dfltGestPreconds)_ng(d.preconds,y,x);else _ng(d.preconds,"chromeState",{active:1,inactive:g.type==_Wd||e.btnId});const M=r.type==_Af&&r.state,
V=r.type==_Af&&!r.state;M&&(B.push({mouseGestState:_xs("S")},{keyStateChange:!0}),d.preconds=_tg(G));V&&(B.push({mouseGestState:_xs("S"),negate:!0},{keyStateChange:!0}),d.preconds={},delete e.wildcard);let v=[];var q=z?Object.assign({},d.preconds,z):d.preconds;for(let [y,x]of q)if(x){if("urlTests"==y)y="urlTest";else if("menuState"==y)x=d.preconds[y]=_ty(x);else if("evtUrl"==y){A&&g.type==_Wd&&g.num<_Qu&&(r.param|=++Q<<24,_Gr[r.param]=Z(x),_Ct=!0);continue}_0p(x)||(x=[x]);for(let W of x)v.push(W.sc().keep("negate",
"oper").add({[y]:W}))}0==b&&g.isDownUp&&g.num==_Ci&&(_7p(e.preconds)||1==C[_Ls]&&1==Object.keys(C))&&(q=H?{mouseOver:{region:_nh},negate:!0}:{urlTest:{part:_8f,type:"starts",value:_Sf.runtime.getURL(_ce)},negate:!0},v.push(q),H^=1);const F=I?e.holdPeriod|0:0;1<l.length&&(0<b||da(e.eventId,l.slice(1))&&!l[b+1].negateSeq)&&v.push({prevSeqStep:t,negate:e.negateSeq,maxTime:1E3*(e.maxTime||w.trigStepTime)+F});t=_3g(e.preconds||[],e.wildcard?{wildcard:+e.wildcard}:[]);let J=e.eventId;F&&(J=++O|_Uf);A&&
1<l.length&&n(J,{type:_Ms,param:{seqId:m,stepId:b+1},PBC:C},v,t,"noExtraActions");q=n(J,r,v,t.concat(B));var D=void 0;F&&(D=r.sc().del("param").add({type:A&&!e.noAutoRep?_Hh:_py,evtId:J,delay:F}),D=n(e.eventId,D,v,t.concat(B)),n(u.eventId,{type:_Eu,actIdx:D}));e.block==_Hd&&_Jd(g)&&(A={type:_yy,block:!0},I?n(u.eventId,A,[],[{actionDone:!0,actIdx:q}]):n(u.eventId,A.add({PBC:ca}),v,t.concat(B)));if(r.block&&I){n(u.eventId,{type:_ui,param:_xs("N")},[],[{actionState:_xs("D"),actIdx:q}]);if(M||V)n(e.eventId,
{type:_yy,block:!0},E(v),[{actionState:0,negate:!0,actIdx:q},{keyStateChange:!1}]),M&&(n(u.eventId,{type:_ui,param:_xs("Y")},[],[{mouseGestState:_xs("S")},{actionState:_xs("I"),actIdx:q}]),n(u.eventId,{type:_yy,block:!0},[],[{mouseGestState:_xs("S")},{actionState:_xs("D"),actIdx:q}]),n(u.eventId,{type:_yh,actIdx:q},[],[{mouseGestState:_xs("S")},{actionState:0,actIdx:q,negate:!0}]));F&&(n(u.eventId,{type:_ui,param:_xs("Y")},E(v),[{actionDone:!0,actIdx:D},{actionState:_xs("D"),actIdx:q,negate:!0}]),
n(u.eventId,{type:_yy,block:!0},E(v),[{actionDone:!0,actIdx:D},{actionState:_xs("D"),actIdx:q}]))}g.isDownUp&&n(e.eventId,{type:_yh,PBC:C,actIdx:q},T(v),[{keyStateChange:!0}],"noExtraActions front");t=r.param}if(f){const [e,g]=G;d.preconds.chromeState||(_Pf("emptyChromeState",{triggerObj:d,origTriggerObj:c,origActionData:a}),d.preconds.chromeState={});_ng(e,"chromeState").add([...d.preconds.chromeState].filter(([,z])=>z));null!==e.caretState&&(d.preconds.caretState?_ng(e,"caretState").add([...d.preconds.caretState].filter(([,
z])=>z)):e.caretState=null);_ut("urlTests",e,g,d.preconds);_ut("menuState",e,g,d.preconds);_ut("mouseOver",e,g,d.preconds);_ut("swtchState",e,g,d.preconds)}1<l.length&&(p.combinSequences[m]={usedDevs:Object.keys(k).map(e=>+e),lastStepId:b});H&&R(c,a);return q},S=function(c){let a=_T(c,!0);if(!_Jd(a))return[c];let d=(_Fk[a.num]||[])[1];if(_0p(d)){c=[];for(let h of d)c.push(h|a.type);return c}return[c]},L=function(c){return _Jd(c)&&c.type==_qa},ba=function(c,a){if(_Jd(a))return c.sc().add({eventId:c.eventId^
_Lw})},E=function(c){return c.filter(a=>!a.prevSeqStep)},T=function(c){return c.filter(a=>!a.mouseOver)},U=function(c){let a={},d=function(k){L(k)&&(a[k.devId]=(a[k.devId]||0)+1)},h=_T(c.eventId,!0);d(h);let m;for(let k of c.preconds||[])k.toggleState?m=!0:d(_T(k.keyEvt,!0));!a[h.devId]&&_Jd(h)&&h.type==_Lw&&(a[h.devId]=-1);m&&!a[_zd]&&(a[_zd]=-1);return a},da=function(c,a){for(let d of a)if(d.eventId==c)return!0;return!1}};
