'use strict';function _Mo(a,b,d="",c="",e=!1){d=`<select name="${d}" ${c}>`;e&&(d+="<option>");for(let [g,h]of a)d+=`<option value="${g}" ${b==g?"selected":""}>${h}`;return d+"</select>"}function _Gy(a,b,d=""){return`<input type=checkbox ${a?`name="${a}"`:""} ${b?"checked":""} ${d}>`}{let a;var _8p=function(b,d,c,e=""){!0===b&&(b=a="radioGroup_"+Math.random());b||(b=a);return`<input type=radio name="${b}" value="${d}" ${d==c?"checked":""} ${e}>`}}
function _ba(a,b,d="",c=""){return`<input type=text name="${a}" value="${_tw(b||"")}" ${c} placeholder="${d}" style="--len: ${(b||"").length}" spellcheck=false>`}function _7y(a,b,d,c,e,g=""){a=a[b];"function"==typeof a&&(a=a());return`<customSelect options=${b} colSize="${e||""}" name=${d} value="${c}" ${g}><l>${_3g(a[c])[0]}</l></customSelect>`}
function _1u(a,b,d,c,e=""){a=_Eh(a);return`<customSelect name="${b}" value="${d}" colSize="${c||""}" ${e} options="${_tw(JSON.stringify(a))}">${a.has(d)?_3g(a[d])[0]:"&nbsp;"}</customSelect>`}
function _ma(a){var b=$(a).attr("options"),d=$(a).attr("value");let c=+$(a).attr("colSize");try{var e=JSON.parse(b)}catch(h){}if(!e){var g=$(a).closest("[optionsCollection]").prop("optionsCollection");e=b?g[b]:{[d]:$(a).html()};"function"==typeof e&&(e=e())}b="";g=0;for(let [h,f]of e){f=_3g(f);f[2]&&g&&(b+="<hr>");e=h==d?"selected":"";const k=_Tp(h+"")?"custom":"";b+=`<opt value="${h}" ${e} ${k} ${f[3]||""}><l>${f[0]}</l> ${f[1]?`<h h=${f[1]}></h>`:""}</opt>`;++g==c&&(b+="</group><group>")}b=b?`<group>${b}</group>`:
"<empty>No options</empty>";d=$(a).is("[helpCtx]")?`helpCtx="/${_Cg($(a).attr("helpCtx")||$(a).attr("name"),_ka(a)).join("/")}"`:"";return $(`<optionsSelect popupCntr DataModule ${d} ${""}>${b}</optionsSelect>`).on("click","opt",function(){$(this).closest("optionsSelect").triggerEvt("focusLost");$(a).attr("value")!=$(this).attr("value")&&$(a).html($(">l",this)[0].outerHTML).attr("value",$(this).attr("value")).triggerEvt("change",!0)}).on("close",function(){$(this).remove()})}
let _xe=(()=>{function a(c,e,g){function h(f,k=[]){let l="";for(let m of f.children){if(m.url&&g)continue;f=[];let n=m.children?h(m,f):"";l+=`\n <item key=${m.id} ${m.url||!n?"":`content=${f[0]|0}`} ${m.id==c?"selected":""}>\n <b></b><c>${b(m)}</c>\n </item>\n <children>${n}</children>\n `;if(m.id==c||f[0])k[0]=1}return l}return $(`<bmTree>${h(e)}</bmTree>`).on("click","b",function(f){f.stopImmediatePropagation();f=$(this).closest("item");f.attr("content",+!+f.attr("content"))})}function b(c){return`<img src="${c.url?
_tw(_5h(c.url)):"/res/folder.png"}"><t>${_tw(c.title)}</t>`}function d(c,e){_Sf.bookmarks.getTree(([g])=>{g=a($(c).attr("value"),g,e).on("click","item > c",function(){$(c).attr("value",$(this).closest("item").attr("key")).html($(this).html()).triggerEvt("change",!0);$(this).triggerEvt("focusLost",!0)});_aw(g,c,"btlr","tailAndShadowBig noTail");$("item[selected]",g).each(function(){this.scrollIntoViewIfNeeded(!0)})})}return function(c,e,g=!1){let h=$(`<customSelect name=${c} placeholder="Choose a ${g?
"":"bookmark or"} folder..."></customSelect>`);if(!_Sf.bookmarks)return h;_Sf.bookmarks.get(e+"",f=>{!_pd()&&f&&f[0]&&h.attr("value",e).html(b(f[0]))});return h.on("mousedown",function(){d(this,g)})}})();
function _pp(a){var b="";let d=a.value;for(let [c,e]of _Ba._Vw){let g=d[c]||{};b+=`\n <div monId=${c}>\n <cell>${e.name}</cell>\n <cell>\n <input type=number name=cols value="${g.cols||1}" min=1 max=30>\n &times;\n <input type=number name=rows value="${g.rows||1}" min=1 max=30>\n </cell>\n </div>`}b=$(`\n <gridLayoutEditor>\n <monitorList>\n <div><cell></cell><cell><c><l>Cols</l> <l>Rows</l></c></cell></div>\n ${b}\n </monitorList>\n </gridLayoutEditor>\n `).on("input",function(c){c.stopPropagation();
let e=$(c.target).closest("[monId]").attr("monId");_ng(d,e,c.target.name,_Me(c.target),NaN);$(this).removeClass("empty");$(a).triggerEvt("change")});_7p(d)&&b.addClass("empty");return b}function _jp(a,b,d="",c="",e="",g=""){return $(`<FSPathInput ${e}>${_ba(a,b,d,"field "+g)}<button>...</button></FSPathInput>`).on("click","button",_ug(function*(){let h=$(this).prev(),f=h.val();h.is("[locPlhlr]")&&(f=yield _Ba._9i(f));let k=yield _Js(f,c);k&&k!=f&&(h.val(k),h.triggerEvt("input change",!0))}))}
function _Xu(a,b,d){let c=document.createElement("A");c.download=a;c.href=d?b:URL.createObjectURL(b instanceof Blob?b:new Blob([b]));c.click();d||setTimeout(()=>URL.revokeObjectURL(c.href),2E3)}function _du(a){_th("file11.js")(()=>_Cd(a))}function _Mg(a,b,d,c=!1){c&&a.points.clear();c=a.viewportElement.createSVGPoint();c.x=b;c.y=d;a.points.appendItem(c)}
function _Xh(){_as();$(document).captureEvt("mousedown","customSelect edit",function(a){a.stopPropagation();let b=$(this).closest("customSelect");a="other"==b.attr("value")?()=>_ni.tse.editor(b[0]):()=>_be(b.attr("value"));_dr(a,this)}).on("mousedown","action > targets edit",function(a){a.stopImmediatePropagation()}).on("mousedown","customSelect[options]",function(){_aw(_ma(this),this,"btrl")}).captureEvt("change","customSelect",function(a,b){b||("other"==$(this).attr("value")?setTimeout(()=>$("edit",
this).triggerEvt("mousedown",!0),100):delete this.value)}).on("input","input[type=text], [textInput]",_1d(200,function(){$(this).triggerEvt("change",!0)})).on("keydown","input[type=text], [textInput]",function(a){13==a.keyCode&&this.blur()}).captureEvt("click dblclick","btn[del], button[delete], del, item[name=delete]",function(a){clearTimeout(this.delMsgTimer);"click"==a.type&&(this.delMsgTimer=setTimeout(()=>{this.helpBubble=_aw("<help noPopupAround><nobr>Double click to delete</nobr></help>",this,
"rbtl","infoBubble small","","opacity")},250))}).on("click","[initDemo]",function(){_du($(this).attr("initDemo"))}).on("click","a[href]",function(){if(this.href.endsWith(".exe"))return!0;this.href.startsWith("chrome:")?_Sf.tabs.create({url:this.href}):open(this.href,"_blank");return!1}).on("mousedown","iconPick",function(){_aw(_xo(this,$(this).attr("use")),this,"btrl","tailOnly noTail")}).on("change","iconPick:not(iconUID)",function(){$(this).attr("img",this.value.img?"":null).css("--img",this.value.img?
`url(${this.value.img})`:"")}).captureEvt("input focus","[autoDim]",function(){$(this).css({width:"20px","flex-grow":0,"min-width":"auto"}).css("width",this.scrollWidth+4).css({"flex-grow":"","min-width":""})}).on("mousedown","customSelect[entityType]",function(){_aw(_r(this),this,"btrl","borderAndShadowSimple noTail")});$(document.body).captureEvt("click","[perms]",function(a){a.originalEvent.isTrusted&&!$(this).is("input[type=checkbox]:not(:checked)")&&(a.stopPropagation(),a.preventDefault(),_Ih($(this).attr("perms"),
"permMsgs/feature")(b=>b&&a.target.click()))})}
let _Ea=_ug(function*(a,b,d={},c={}){a=_Ze(a).attr(d.attrs||{});c.beforePopup&&(yield c.beforePopup(a));let e,g;if(_aw(a,b,d.sideOrder||"btrl","noTail"))a.on("mouseenter","item",function(){g=setTimeout(()=>{$(this).is(".popup")||$(this).parent().triggerEvt("mousedown",!0)},300)}).on("mouseenter","item[menu]:not(.popup)",function(h){e=setTimeout(()=>$(this).triggerEvt("click",!0),300)}).on("mouseleave","item",function(){clearTimeout(e);clearTimeout(g)}).on("click dblclick","item",function(h){$(this).is("[menu]")?
$(this).is(".popup")||_Ea($(this).attr("menu"),this,{sideOrder:"r<l<"},c.click.call(this,h)):c.click.call(this,h)&&$(this).triggerEvt("close",!0)})});
function _nu(a,b,d,c=!0){let e={tit:"title",url:"url",domn:"domain",mdom:"mainDomain",path:"path",dPth:"dirPath",prot:"url.protocol",qry:"url.query",frag:"url.fragment",sltn:"selection",ombar:"omnibox",obWrd:"omnibox.words",clbrd:"clipboard",exClb1:"clipboard(1)",clbLns:"clipboard.lines",clbWrd:"clipboard.words",date:"date",var:"var.<v>var_name</v>",dir:"dir.<v>dir_name</v>",env:"env.<v>env_name</v>",fname:"fileName",fext:"fileExt",txt:"text",L_prof:"profile",L_desk:"desktop",L_doc:"documents",L_star:"startup",
L_rec:"recent",L_win:"winDir",L_prog:"progFiles",L_prg86:"progFilesX86",L_app:"appData",L_tmp:"temp",L_drv:"systemDrive"};c&&d.push("var");let [g,h]=_3g(a);$(g).on("mousedown","[button]",function(f){let k=h?this.closest(h):g;k&&(f.preventDefault(),f=_Ww(_ga)`\n <templExprMenu popupCntr>\n ${d.map(l=>`<it><c>&lt;${e[l]}&gt;</c> <h h='/actions/tmplExpr/${l}'></h></it>`)}\n </templExprMenu>\n `.on("close",function(){this.remove()}).on("mousedown",l=>{l.target.closest("help")||l.preventDefault()}).on("click",
"it",function(){_ti($("[field]",k)[0],this.innerText.trim());$(this).closest("templExprMenu").triggerEvt("focusLost")}),_aw(f,$(k).find("[popupAround]").addBack("[popupAround]")[0]||this,b))})};
