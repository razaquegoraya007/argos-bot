'use strict';var _If,_jo;
{let a={};var _Ds=_qf(function*(b,d,c=0){let e=b.id,f=a[e]=Math.random();"normal"!=b.state&&("maximized"==b.state&&(yield _ky(_Fw,{win:_fy[e]|0})),yield _su([e],!0),b=(yield p=>_Ur(e,!1,p))||b);let g=_sj(b);b=_I(_8e(b),1/g);d={}.add(b,d);var l=d.x-b.x,h=d.y-b.y,m=d.w-b.w,q=d.h-b.h,k=Math.max(Math.abs(l),Math.abs(h),Math.abs(m),Math.abs(q));let r=25;c=c||r;k=Math.round(k/Math.max(1,k/c*r));const t=p=>n=>_Sf.windows.update(e,_Rw(_I(p,-1/g)),n);if(2>=k)g=_uy(_ud(d)),yield t(d);else{l/=k;h/=k;m/=k;q/=
k;r=c/k;c=-2/(k-1);for(let p=0,n=2;a[e]==f;n+=c)if(b.x+=l*n,b.y+=h*n,b.w+=m*n,b.h+=q*n,yield t(b),++p<k)yield _Fy(r);else{b.includes(d)||(g=_uy(_ud(d)),yield t(d));break}}})}function _uy(a){return((_Vw[a]||{}).dpiX||96)/96}function _sj(a){return _uy(_1(a))}function _Yp(a,b){const d=_sj(a);return 1==d?_8e(a).includes(b):Math.max(Math.abs(b.x-a.left*d),Math.abs(b.y-a.top*d),Math.abs(b.w-a.width*d),Math.abs(b.h-a.height*d))<=Math.max(2,10/Math.pow(d,2))}
function _1(a){a.monitorId||(a.monitorId=_ud(_8e(a)));return a.monitorId}function _ud(a){let b=-Infinity,d=0;for(let c in _Vw){let e=_Gg(_1p(a,_8e(_Vw[c].bounds)));e>b&&(b=e,d=c)}return d}function _Kj(a,b){let d=Math.max(1,Math.round(a.w/b.w))*b.w,c=Math.max(1,Math.round(a.h/b.h))*b.h;return{x:b.x+b.w*Math.round((a.x-b.x+a.w/2-d/2)/b.w),y:b.y+b.h*Math.round((a.y-b.y+a.h/2-c/2)/b.h),w:d,h:c}}
function _2u(a,b){b in _Vw||(b=Object.keys(_Vw)[0]);let d=_Vw[b].workArea;a=_kf(a,b);return{x:d.left,y:d.top,w:Math.round(d.width/a.cols),h:Math.round(d.height/a.rows)}}function _Pe(a){let b=0;for(let d in _Vw){let c=_Gg(_1p(a,_8e(_Vw[d].workArea)));0<c&&(b+=c)}return b}function _Z(a,b,d){let c="x"==d?"w":"h";return(Math.min(a[d]+a[c],b[d]+b[c])-Math.max(a[d],b[d]))/Math.min(a[c],b[c])}
function _Ot(a,b,d,c){var e=b[c]-a[c];e/=Math.abs(e);for(a={}.add(a);;){let f=_Pe(a)/_Gg(a),g=_Z(d,a,c);if(.99<f||.99<g)break;a[c]+=e*b["x"==c?"w":"h"]}return a}function _mg(a,b,d){a={}.add(a);let c={}.add(a),e=0,f=!1;for(;;){let g=_Pe(c)/_Gg(c);if(.99<g){a.add(c);break}if(g>e)a.add(c),e=g;else if(f)break;else f=!0,c.add(a);c[d]-=b[d];f&&(c["w"==d?"x":"y"]+=b[d])}return a}
function _qo(a,b,d,c){let e=_ud(a),f=_2u(b,e);d=d?_2u(b,d):f;a=_Kj(a,f);let g=a.sc();for(let h of["x","y","w","h"]){let m=c[h]||{};if("val"in m){let q=+m.abs?"x"==h?d.x:"y"==h?d.y:0:a[h];var l=+m.abs?d:f;l=h.in("x","w")?l.w:l.h;a[h]=q+m.val*l;h.in("w","h")&&0>=a[h]&&(a[h]=l)}}a.includes(g)||(e=_ud(a),f=_2u(b,e),a=_Kj(a,f));if(!_Vw[e])return _Pf("badMonitorId",{monId:e,rect:a,MONITORS:_Vw}),a;b=_8e(_Vw[e].workArea);a=_Ot(a,f,b,"x");a=_Ot(a,f,b,"y");a=_mg(a,f,"w");return a=_mg(a,f,"h")}
function _6d(a,b){return _kd(_Vw,a||_ud(b),"workArea")||{left:0,top:0}}function _Gw(a,b,d){a=a.sc();b=_6d(b,a);for(let c of["x","y","w","h"]){let e=d[c]||{};if("val"in e){let f="x"==c?b.left:"y"==c?b.top:0;a[c]=(+e.abs?f:a[c])+e.val;"w"==c&&(a[c]=Math.max(100,a[c]));"h"==c&&(a[c]=Math.max(25,a[c]))}}return a}
function _3w(a,b,d){a=a.sc();b=_6d(b,a);for(let c of["x","y","w","h"]){let e=d[c]||{};if("val"in e){let f="x"==c?b.left:"y"==c?b.top:0,g=a[c.in("x","w")?"w":"h"];a[c]=(+e.abs?f:a[c])+g*e.val/100;"w"==c&&(a[c]=Math.max(100,a[c]));"h"==c&&(a[c]=Math.max(25,a[c]))}}return a}
function _P(a){let b=_Np(a.gridLayout,"gridLayout").value,d=_kf(b,a.baseMonitor),c=+a.cols||+d.cols,e=+a.rows||+d.rows;return[function*(){let f=0,g=0;for(;;)yield _qo({x:1,y:1,w:1,h:1},b,a.baseMonitor,{x:{abs:1,val:(a.x||0)+f},y:{abs:1,val:(a.y||0)+g},w:{abs:1,val:1},h:{abs:1,val:1}}),++f==c&&(f=0,++g==e&&(g=0))}(),c*e]}_tt.gridLayout={grid2x2:{name:"2 x 2 grid",value:{"*":{cols:2,rows:2}}},grid2x1:{name:"2 x 1 grid",value:{"*":{cols:2,rows:1}}},grid3x1:{name:"3 x 1 grid",value:{"*":{cols:3,rows:1}}}};
let _yt=_qf(function*(a){a=yield _ky(_Wi,yield _ee(a));let b={};for(let [d,c]of a)b[_oj[d]]=c;return b});
