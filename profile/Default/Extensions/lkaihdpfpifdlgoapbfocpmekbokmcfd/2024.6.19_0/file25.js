'use strict';let _Oe=_qf(function*(b,a){let d=$(b).attr("sctnId",a).find("trigActList");"undefined"==typeof _Ch&&(yield _ja("file26.html"));_td(d);_bs(d,yield _Mt("trigActList"),a);_mj(b);$("> header",b).on("click","[newAction]",()=>{_pi(b)}).on("click","[newSectn]",()=>{_Xp()}).on("click","[delSectn]",_ug(function*(){var c=$("trigAct",b);if(!c.length||(yield _Dg("","All actions in this section will be deleted. <hr b=3> Continue?"))){_fa(c);c=$("tabs > sectns");let e=$(`> [pnlId="${$(b).attr("pnlId")}"]`,
c),f=e.next()[0]||e.prev()[0]||e.parent().prev()[0];e.remove();b.remove();c.triggerEvt("change",!0);_Cf(f)()}})).on("mousedown","[select]",function(){_Ea("trigActSelectMenu",this,{},{click(c){_lr(b,$(this).attr("name"),c.ctrlKey);return!0}})}).on("mousedown","[selected]",function(){_aa(this)})});
function _td(b){_Oh.setEvtLtnrs(b);_Ch.setEvtLtnrs(b);$(b).on("dblclick","actions1 > [delete]",function(){let a=$(this).closest("trigAct");a.next("sep").addBack().css("visibility","hidden").slideUp(_Jj(()=>_fa(a)))}).on("click","actions1 > [enable]",function(){_Fp($(this).closest("trigAct"),"disabled")}).on("click","actions1 > [import]",function(){_Hr($(this).closest("trigAct"))}).on("mousedown","actions1 > [menu]",function(){_aa(this,{noSeps:""})}).on("change","trigAct > header [name=title]",function(a){$(this).closest("header").attr("hasTitle",
this.value?"":null)}).on("change","trigAct",_ug(function*(a){if(!$(a.target).parent().closest("[DataModule]")[0]){if(!$(this).attr("actionId")){var d=yield _Mt("trigActList");let c=_7f(d);$(this).attr("actionId",c);let e=$(this).prevAll('trigAct:not([actionId=""]):first').attr("actionId");d.set(c,{sctnId:$(this.closest("panel")).attr("sctnId")},d.getPos(e)+1);_O("trigActList",d)}$(this).removeAttr("empty");d=["trigActList",$(this).attr("actionId"),$(a.target).attr("name")];_O(d,_Me(a.target))}})).on("mousedown",
function(a){1==a.which&&(a.target==this||a.target.parentElement==this?_ei(this,a.clientX,a.clientY,!a.ctrlKey):"move"==getComputedStyle(a.target).cursor&&_3a(this,a.target,a.clientX,a.clientY))})}function _mj(b){const a=$("trigAct",b).length;return $("> header",b).attr("simple",6>a?"":null)}function _bs(b,a,d){for(let [c,e]of a)e.sctnId==d&&b.append(_hs(c,e))}function _7f(b){for(var a=1;b.has(a);++a);return a}
var _7e=_qf(function*(){let b=yield _Mt("trigActList");return function*(){for(let a=1;;++a)b.has(a)||(yield a)}});
function _hs(b="",a={}){return _Ww(_ga)`\n <trigAct actionId="${b}" class="${a.disabled?"disabled":""} ${a.collapsed?"collapsed":""}">\n <header ${a.title?"hasTitle":""}>\n ${_ig("icon",a.icon)}\n <desc><input type=text name=title value="${_tw(a.title||"")}" autocomplete=off spellcheck=false placeholder="Enter a name for the action (optional)..."></desc>\n <actions1 popupCntr>\n ${_Vt?"<button import>Import</button>":""}\n <!--button collapse></button-->\n <button enable></button>\n <button delete>Delete</button>\n <button menu>&vellip;</button>\n </actions1>\n </header>\n <content>\n ${_Oh.make(a.triggers,
"triggers")}\n ${_Ch.make(a.actions,"actions")}\n </content>\n </trigAct>\n <sep></sep>\n `}function _Yo(b){$(b).closest("triggers, actions").triggerEvt("change",!0,!0)}
function _pi(b){b=$("> cont",b)[0].getBoundingClientRect();let a=document.elementFromPoint(b.left+100,b.top+5),d=$(a.closest("trigAct")).nextAll("sep:first")[0]||a.closest("sep");d||_Pf("noClosestSep",{boundRect:b.sc(),elem:a.nodeName,coords:a.getBoundingClientRect().sc()});let c=$(d).nextAll("trigAct:first");c[0]&&c.is("[empty]")?(_Oa(()=>c.addClass("stickout")),setTimeout(()=>c.removeClass("stickout"),500)):_1s(_hs().attr("empty",""),d,!0)}
let _1s=_ug(function*(b,a,d=!1){if(d)var c=$(a)[0].getBoundingClientRect().bottom+150>window.innerHeight;b.insertAfter(a);d&&(b.addClass("insertFX"),yield e=>_Oa(e),c&&(b[1].scrollIntoView({behavior:"smooth",block:"nearest"}),yield _Fy(250)),b.removeClass("insertFX"));_mj(a.closest("panel"))}),_Jw=_ug(function*(b,a){let d=yield _Mt("trigActList");var c=Object.keys(_Ba._Jo);c=new RegExp(`"((?:${c.join("|")}):\\d+)"`,"g");var e=b.filter('[actionId]:not([actionId=""])').get()[a?"reverse":"slice"]();
for(let k of e){e=$(k).attr("actionId");let l=JSON.stringify(d[e]),m={};for(var f=void 0;f=c.exec(l);){f=f[1];let g=_Yf(f)[0],h=_Np(f);_7p(h)||h.name||(m[f]=yield _vi(g,h.value))}l=l.replace(c,(g,h)=>`"${m[h]||h}"`);f=_7f(d);d.set(f,JSON.parse(l),a?0:d.getPos(e)+1);a&&(d[f].sctnId=$(a).closest("panel").attr("sctnId"));_1s(_hs(f,d[f]),a||$(k).next(),1==b.length)}_O("trigActList",d)});
function _fa(b){let a=_Jj(()=>_ha()());b.filter('[actionId]:not([actionId=""])').each((d,c)=>{_O(["trigActList",$(c).attr("actionId")],void 0,200,a)});b.next("sep").addBack().remove()}function _a(b){_er(a=>{let d=b.get().map(c=>$(c).attr("actionId"));_dy(window.frameElement?window.parent:window)._Po([a,d],$("tabs tab[active]").attr("pnlId"))})}
function _Po(b,a=""){const d="string"==typeof b,c=$("<iframe>").prop("src",`${location.pathname}?file=${d?encodeURIComponent(b):"&storInit#"+a}`).prop("storInit",d?null:b).on("titleChange",function(){$("diagFrm > header > l",e).text(this.contentWindow.document.title)}).one("contentReady",(f,k)=>k?e.Show(!1):_H(e))[0];b=Math.min(1030,$(window).width()-10);a=Math.min(650,$(window).height()-10);const e=_Ef(" ",c,"settgsFileEdit",!1,!0,[b,a]);$(e).captureTgtEvt("close",_ug(function*(f,k){k||(f.preventDefault(),
(yield _dy(c.contentWindow)._Vt.safeToClose)&&_H(this))})).find("diagFrm > header ctrls").prepend('\n <b popout title="Pop out"></b>\n <b maximize title="Maximize"></b>\n <b restore title="Restore"></b>\n ').on("click","[popout]",_ug(function*(){let f=c.contentWindow;if(yield _dy(f)._Vt.safeToClose)window.open(f.location.href,"_blank"),_H(e)})).on("click","[maximize], [restore]",()=>{$(e).toggleClass("maximized")})}
let _Fp=_ug(function*(b,a,d=_Fa){if("collapsed"==a&&1==b.length&&(d==_Fa||b.hasClass(a)==!d)){let c=$("> content",b)[0],e=c.offsetHeight;e||(c.style.setProperty("height","auto","important"),e=c.offsetHeight,c.style.height="");c.style.cssText=`height: ${e}px ; transition: .3s height;`;yield f=>_Oa(f);setTimeout(()=>c.style.cssText="",300)}b.filter('[actionId]:not([actionId=""])').each((c,e)=>{c=d==_Fa?!$(e).hasClass(a):d;_O(["trigActList",$(e).attr("actionId"),a],c?!0:void 0);$(e).toggleClass(a,c)})});
function _jj(b){_sd({trigActList:[]},a=>{let d=$(b).attr("sctnId");$("trigAct",b).each((c,e)=>{if(e=$(e).attr("actionId"))a.trigActList[e].sctnId=d,a.trigActList.setPos(e,c)});_or(a)})}var _Vf=_qf(function*(b,a){return"new"==b?yield d=>_Xp(a,d):yield _Cf($(`body > tabs tab[pnlId="${b}"]`)[0])});
function _aa(b,a){let d=b.closest("panel");_Ea("selectedTrigActMenu",b,{attrs:a},{click(c){let e=$(b.closest("trigAct")||$("trigAct.selected",d));switch($(this).attr("name")){case "delete":if("dblclick"!=c.type)return!1;_fa(e);_Ck(d);break;case "enable":_Fp(e,"disabled",_Hj);break;case "disable":_Fp(e,"disabled",_Ns);break;case "tgglEnbl":_Fp(e,"disabled");break;case "collapse":_Fp(e,"collapsed",_Ns);break;case "unclpse":_Fp(e,"collapsed",_Hj);break;case "duplcte":_Jw(e);break;case "export":_a(e);
break;case "import":_Hr(e);break;case "importTo":return{click(){_Hr(e,$(this).attr("pnlId"));return!0},beforePopup:_qf(function*(f){f.append("<item pnlId><b>Main section</b></item>");for(let k of(yield _Ba._fj())||[])f.append(`<item pnlId="${k.id}">${k.name}</item>`)})};case "dupToSectn":return{click(){_Vf($(this).attr("pnlId"))(f=>{_Jw(e,$("trigActList > sep:first-of-type",f))});return!0},beforePopup:_qf(function*(f){for(let k of $("body > tabs tab[pnlId^=actions]:not([active])")){let l=_Me(k);f.append(`<item pnlId="${$(k).attr("pnlId")}">${l.name||
"<b>Main section</b>"}</item>`)}})}}return!0}})}
{var _lr=function(a,d,c=!1){let e="trigAct"+({enbld:":not(.disabled)",dsbld:".disabled",colpsd:".collapsed",unclsd:":not(.collapsed)"}[d]||""),f="invert"==d;f||c||$("trigAct",a).removeClass("selected");c=$(e,a);"named"==d&&(c=c.filter((k,l)=>$("> header [name=title]",l).val()));c[f?"toggleClass":"addClass"]("selected");_Ck(a)},_3a=function(a,d,c,e){let f,k;$(window).on("mousemove.trigActMove",l=>{if(!f){f=$(d.closest("trigAct")).hasClass("selected")?$("trigAct.selected",a):$(d.closest("trigAct"));
for(var m of f)m.boundRect=m.getBoundingClientRect();m=f.first().next()[0].offsetHeight;for(var g of f)g.nextSep=g.nextElementSibling,$(g.nextSep).addClass("noExpand").css("height",m+g.boundRect.height),$(g).prev().add(g.nextSep).addClass("noTarget"),$(g).appendTo(document.body).addClass("floating").css({left:g.boundRect.left,top:g.boundRect.top,width:g.boundRect.width});$(document.body).addClass("trigActDrag")}for(var h of f)h.style.left=h.boundRect.left+l.clientX-c+"px",h.style.top=h.boundRect.top+
l.clientY-e+"px";let n;h=$(document.elementsFromPoint(l.clientX,l.clientY)).filter("sep");if(1<h.length){g=999999;for(let p of h)h=p.getBoundingClientRect(),h=Math.abs((h.top+h.bottom)/2-l.clientY),h<g&&(g=h,n=p)}else n=h[0];n!=k&&($(k).removeClass("hover"),k=n,$(k).addClass("hover"))}).on("mouseup.trigActMove",l=>{$(window).add("body > tabs").off(".trigActMove");if(f){let m=$(k).removeClass("hover").is("sep:not(.noTarget)");m&&$(k).after(f.get().map(g=>g.nextSep));for(let g of f)g.boundRect=g.nextSep.getBoundingClientRect();
for(let g of f)$(g).css("transform",`translate(${parseFloat(g.style.left)-g.boundRect.left}px, ${parseFloat(g.style.top)-g.boundRect.top}px)`),$(g.nextSep).css("height","").before(g);_Oa(()=>setTimeout(()=>{f.css("transform","");setTimeout(()=>{$(".noTarget, .noExpand").removeClass("noTarget noExpand");$(document.body).removeClass("trigActDrag");f.removeClass("floating")[0].style.cssText="";m&&(_mj(_Ck(a)),_mj(_Ck(k)),setTimeout(()=>_jj(k.closest("panel")),250))},280)},50))}});$("body > tabs").on("mouseenter.trigActMove",
"tab[pnlId^=actions]",function(){_Cf(this)()})},_ei=function(a,d,c,e){const f=a.getBoundingClientRect(),k=d-f.left,l=c-f.top;let m;$(window).on("mousemove.selFrame",g=>{var h=a.getBoundingClientRect(),n=g.clientX-h.left,p=g.clientY-h.top;g=Math.min(k,n);h=Math.min(l,p);n=Math.max(k,n);p=Math.max(l,p);m||($(a).addClass("dragging"),m=$("<selectorFrame>").css({left:k,top:l}).appendTo(a));m.css({left:g,top:h,width:n-g,height:p-h});b(a)}).on("mouseup.selFrame",()=>{$(window).off(".selFrame");$("selectorFrame").remove();
$(a).removeClass("dragging")});e&&($("trigAct.selected",a).removeClass("selected"),_Ck(a,!0));$("trigAct",a).each(function(){this.selected=$(this).hasClass("selected")})};let b=_F(100,a=>{let d=$("selectorFrame",a)[0];if(d){var c=d.getBoundingClientRect();$("trigAct",a).each(function(){let e=_Op(c,this.getBoundingClientRect());$(this).toggleClass("selected",e!=this.selected)});_Ck(a)}});var _Ck=(a,d)=>{a=a.closest("panel");d=d?0:$("trigAct.selected",a).length;let c=$("header [selected]",a);$("num",
c).text(d);c.toggleClass("visible",0<d);return a}}function _8y(){for(var b=1;$(`tabs > sectns [value=${b}]`)[0];++b);return b}
function _Xp(b,a){let d=$(_sr({id:_8y(),name:b||"More Actions"})).appendTo("tabs > sectns").triggerEvt("change",!0);_Cf(d[0])(c=>{_aw(`<c>${d.prev()[0]?"Drag to reorder":"Click to rename"}.</c>`,d,"rbt","infoBubble small","","opacity");setTimeout(()=>{if($("tip[move]",c).is(":visible"))$("tip[move] video",c).each((e,f)=>f.load()).show().animate({opacity:1},3E3,"",function(){this.play()}).on("ended",function(){setTimeout(()=>this.play(),1500)})},2500);a&&a(c)})}
function _sr(b){return`<tab pnlId="actions:${b.id}" value={}><param name=id value=${b.id} number><name name=name textInput spellcheck=false>${_tw(b.name||"")}</name></tab>`};
