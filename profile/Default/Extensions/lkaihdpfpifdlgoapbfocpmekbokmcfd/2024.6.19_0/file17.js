'use strict';var _Zw,_Dd,_Nd;
{let v=function(){_dj("customEntities.*",(a,b)=>void 0+(_Ba._Jo[b[1]]=_kd(a,...b)));_dj("customEntities.menuStyle",(a,b)=>void 0+_Ba._rg(_kd(a,...b)));_7s("customEntities.binSwtch.*",(a,b)=>_4a&&e(!0));_7s("customEntities.tse","trigActList.*.actions",(a,b)=>void 0+_Ba._Tj(a));_7s("customEntities.menuSpec","previewMakerParams","trigActList.*.actions",(a,b)=>void 0+_Ba._Ss(a));_7s("trigActList.*.triggers","mouseGest.triggers",(a,b)=>void 0+_Ba._Od(a));_7s("trigActList.*.disabled","trigActList.*.",(a,
b)=>void 0+_Ba._Ri(a)+_rt(a));_dj("mouseGest.params",(a,b)=>void 0+_Ba._xh(_kd(a,...b)));_dj("mouseGest.display",(a,b)=>void 0+_Ba._4w(_kd(a,...b)));_dj("toolbarBtns",(a,b)=>_4a&&_Zh(_kd(a,...b)));_dj("sections",(a,b)=>_4a&&$("body").toggleClass("hasSectns",a[b[0]].length));_dj("advOpts.*",(a,b)=>{"ignInjInp"==b[1]?_Ba._Yy(a[b[0]]):_Ba._Od(a)});_Sf.storage.onChanged.addListener((a,b)=>{"local"==b&&_kd(a,"LOCAL","newValue","switchStates")&&e()})};var _Sk={actions:{templ:"trigActsPanel",func:_Oe},options:{templ:"optionsPanel",
func:_4j},help:{templ:"helpPanel"}};let h,e=_F(300,function(a=!1){let b=[..._ea("binSwtch",!0)].map(k=>{let l=_Yf(k)[1];return`<swt entId=${l}><name spellcheck=false>${_Np(k).name}</name><st val=${_Ba._il[l]|0} title="Click to toggle"></st></swt>`}).join("");var c=$("tabs > switches");let d=c.hasClass("visible");c=c.toggleClass("visible",!!b).find("> cont").html(b);a&&(_Ba._8i(),h||!b||d||(h=!0,_aw("<c>Rename your switch here.</c>",c,"rbt","infoBubble small","","opacity")))}),w=function(){$("body > tabs").on("mousedown",
"tab:not([active])",function(){_Cf(this)();this.noNameEdit=!0}).on("mousedown","sectns > tab",function(a){let b;$(document.body).on("mouseenter.sectnTabDrag","sectns > tab:not([active])",c=>{let d=this.getBoundingClientRect();_Ey(this,c.clientY<d.top?-1:1,200);b=!0}).on("mouseup.sectnTabDrag",()=>{$(document.body).off(".sectnTabDrag");b&&$(this).triggerEvt("change",!0)})}).on("click","sectns tab[active]",function(){this.noNameEdit||_Ny($("name",this)[0]);delete this.noNameEdit}).on("focusout","name",
function(){this.innerText.length||(this.innerText="\u2639");this.innerText=this.innerText.replace(/[\r\n]+/g," ").slice(0,50);$(this).triggerEvt("change",!0);this.contentEditable=!1;getSelection().removeAllRanges();this.scrollLeft=0}).on("change","> sectns",function(){_O(_fw(this),_Me(this))});$("body > tabs > switches").on("mousedown","st",function(){_Ba._ae(+$(this).parent().attr("entId"),!+$(this).attr("val"))}).on("click","name",function(){_Ny(this)}).on("keydown","name",function(a){13==a.keyCode&&
this.blur()}).on("change","name",function(){this.innerText=_Xe(this.innerText);let a="binSwtch:"+$(this).parent().attr("entId");_5g([a,"name"],this.innerText,0);$(`[value='${a}'] > l`).text(this.innerText)})};var _Kd="actions";let p=_ug(function*(){v();_Xh();_5r();w();window.onbeforeunload=function(){$(document.body).triggerEvt("mousedown")};let a="AutoControl configuration";"function"==typeof customizeVariant&&([a,_Kd]=yield customizeVariant());document.title=a;(yield _ks(_Ba._yw.wait(),_Fy(500)))||
($("html").css("display","block"),_1w(),yield _ks(_Ba._yw.wait(),_Fy(3E3)),_1w(!1));_Ba._Xj?(m(3,500)(b=>{b||(_Wg(_Ze("natHostNotFound"),{title:"Native Component not working",icon:"error",width:"initial",nearMouse:!1})(c=>{"reload"==c?_Ba._hh(2,!0):"reinstall"==c&&f()}),_Pf("NH-noConnex"))}),_Vt&&!(yield _Vt.afterLoad())||n()):($("html").addClass("visible"),x())});_eg(document.fonts.load("25px logoFont"),document.fonts.load("12px symbols"),document.fonts.load("15px gestureDirs"),a=>_kw("AutoCtrl/file13.js",
a),a=>_gj("AutoCtrl/file96.css",a),_Wp.wait())(p,p);var _4u=_qf(function*(){let a=_Og(yield c=>_Sf.storage.local.get(null,c)),b=$("body > tabs > perms > cont");b[0]&&b.html(yield _ys(a.filter(c=>"bg"!=c)));return a}),_Kw=_qf(function*(a){let b=yield c=>_sd({toolbarBtns:{},sections:[]},c);_Zh(b.toolbarBtns);$("body > tabs > sectns").html(b.sections.map(_sr).join(""));$("body").toggleClass("hasSectns",b.sections.length);e();(a=$(`body > tabs [pnlId='${a}']`)[0])&&(yield _Cf(a));return yield _4u()});
let n=_ug(function*(a=!1){var b=_yg(location);b?(document.title="Script Editor - AutoControl",yield _ja("file35.html",!0),$("html").css("display","block"),yield _Zs(b,!0),$("html").addClass("visible")):(b=(location.hash||"").slice(1)||(_Vt?_9(_kd((yield _Mt("trigActList"))[Symbol.iterator]().next().value,1,"sctnId")):_Kd),b=yield _Kw(b),$("html").addClass("visible"),yield _Fy(600),yield _Ih(b,"permMsgs/missing",!0),yield _Fy(1E3*(a?180:5)),a=$("<contribBtn>Support<br>the project</contribBtn>").appendTo("body > tabs").click(()=>
{let c=_6k("Support the Project",_Ze("contribPanel"),"",!1,!0);$("[contribPanel]",c)[0].scrollTop=0}),yield c=>_Oa(c),a.addClass("onview"),yield _Fy(1700),q(),setInterval(q,6E4))}),q=()=>{let a=$("contribBtn").addClass("animate");setTimeout(()=>a.removeClass("animate"),2E3)},y=0,r=0,f=_ug(function*(a=0){if(!(3E3>Date.now()-r)&&(r=Date.now(),_Pf("NH-dwnld",{method:a}),5.1<=_1i&&11>_1i&&/^win/i.test(navigator.platform)||(yield _Dg("",_Ze("unsupportedOS"),{yes:"Try installing anyway",no:"Cancel",icon:"info",
width:"initial"})))){switch(a){case 0:_Xu(_pr,yield _ao(_4i,"blob"))}$("runInstPane")[0]||_Ze("runInstPane").appendTo("body");3==++y&&setTimeout(()=>_2(_Ze("installTrouble"),{width:"initial"}),3E3);yield _Fy(4E3);$("runInstPane").addClass("visible");t();yield _Fy(3E3);$("installPane ques[help]:not(.open)").each((b,c)=>u(c));yield _Fy(400);$("install").each(function(){this.scrollIntoView({behavior:"smooth"})});yield _Fy(3E4);$("runInstPane").remove()}}),m=_qf(function*(a,b){for(let c=0;c<a;++c){let d=
yield _Ba._ky(_Re,"",b);if(void 0===d)yield _Fy(b);else if("pong"==d)return!0}return!1}),g,t=function(){g||(g=!0,m(Infinity,1E3)(()=>{g=!1;z()}))},u=a=>{let b=function(){$("+ answ",this).css("width",this.offsetWidth).slideToggle(300,function(){});$(this).toggleClass("open")};$(a).siblings("ques.open").each(b);b.call(a)},x=()=>{let a="",b=()=>_2(_Ze("natHostInit"),{width:"initial",nearMouse:!1});$("head title").addClass("notranslate").append(" - Native Component");$(document.body).addClass("installPane");
_Ze("installPane").on("click","install",()=>f(0)).on("click","a[install]",()=>f(3)).on("click","installPane",()=>$("runInstPane").remove()).on("mousedown","faq > ques",function(){u(this)}).on("keypress",c=>{a=(a+String.fromCharCode(c.which)).slice(-10);"NH-INSTALL"==a&&(_Pf("NH-install"),$("runInstPane").remove(),b())}).appendTo("body");_Ba._Xs&&setTimeout(()=>{b();t()},600)},z=()=>{$("installWrap").off("keypress");_H("dialog");$("installPane, runInstPane").remove();$("installWrap")[0]&&(n(!0),setTimeout(()=>
{$("installWrap").fadeOut(1E3,function(){this.remove();$("body").removeClass("installPane")})},350))}};
