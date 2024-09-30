'use strict';function _bg(){_Sf.permissions.contains({permissions:["tabs"]},a=>{a?_oy()():_Sf.runtime.openOptionsPage()})}var _Vw={};function _je(a){_Sf.system.display.getInfo(b=>{_Vw={};Object.defineProperty(_Vw,"desktop",{writable:!0,value:{x:0,y:0,w:0,h:0}});let c=0;for(let d of b)d.isEnabled&&(d.name||(d.name=`Unnamed monitor ${++c}`),_Vw[d.id]=d,_Vw.desktop=_Co(_Vw.desktop,_8e(d.bounds)));a&&a()})}function _Fd(a){_Ya(_dt,[..._Ba._Vw].map(([,b])=>_6p(_8e(b.bounds)).add({dpi:b.dpiX})),a)}
let _v=_qf(function*(a,b,c,d,e){a:for(let g of b){b=yield f=>_Sf.bookmarks.getChildren(a+"",f);if(!b)break;for(let f of b)if(!f.url&&f.title==g){a=f.id;continue a}let h={parentId:a+"",title:g,dateAdded:Date.now()};h.index=_po(h,b,c,d,e);({id:a}=yield f=>_Sf.bookmarks.create(h.del("dateAdded"),f))}return a});
{let a=_ck,b=(c,d)=>{c=new URL(c);d=new URL(d);let e=a(_3t(c.hostname),_3t(d.hostname));return e||(e=a(c.hostname,d.hostname))||(e=a(c.pathname,d.pathname))?e:(e=a(c.search,d.search))?e:a(c.hash,d.hash)};var _po=(c,d,e,g,h)=>{"asc"==g&&(d=d.slice().reverse());for(let f of d)if(c.id!=f.id){if(!f.url&&c.url){if("folder"==h){if("desc"==g)continue;return f.index+1}if("bkmrk"==h){if("asc"==g)continue;return f.index}}if(f.url&&!c.url){if("bkmrk"==h){if("desc"==g)continue;return f.index+1}if("folder"==h){if("asc"==
g)continue;return f.index}}if("name"==e?0<=a(c.title,f.title):"url"==e?0<=b(c.url||"aa:"+c.title,f.url||"aa:"+f.title):c.dateAdded>=f.dateAdded)return f.index+("asc"==g?1:0)}return"asc"==g?0:d.length}}
let _Os=_qf(function*(a,b,c,d,e,g,h,f){c=(yield _v(c,d,e,g,h))+"";if(d=yield k=>_Sf.bookmarks.getChildren(c,k)){for(let k of d)if(k.url==b){if("keep"==f)return k;if("updt"==f)return yield m=>_Sf.bookmarks.update(k.id,{title:a},m);yield m=>_Sf.bookmarks.remove(k.id,m);d=yield m=>_Sf.bookmarks.getChildren(c,m);break}var l={parentId:c,title:a,url:b,dateAdded:Date.now()};l.index=_po(l,d,e,g,h);return yield k=>_Sf.bookmarks.create(l.del("dateAdded"),k)}});
var _Ie=(a,b=".",c=!1)=>d=>{const e="UTF-16"==c;_Ya(_tp,{file:_p[0],args:(e?"/U":"")+_p[1]+` "${a}"`,dir:b,getStdout:!!c,wideOutput:e},d)},_7d=_qf(function*(a,b,c,d,e,g){c=Math.min(c||2E5,15E5);let h=b.length/c||1;for(let l=0;l<h;++l){var f=b.substr(l*c,c);f=yield _ky(_Qd,{path:a,content:btoa(f),end:l+1>=h&&!g,add:d,modTime:e});"boolean"==typeof f&&(f=!f);if(f)break}return f});
{let a=0;var _tj=_qf(function*(b,c,d,e=2E5){const g=a++%50+1;b=yield _ky(_Jp,{path:b,id:g,charEnc:"text"==c||"charEnc"==c,minModTime:d,chunk:Math.min(e,786E3)});if(!b)return!1;b.content=_0a(b.content)||"";"text"==c&&b.charEnc&&(b.content=_Ej(b.content,b.charEnc));return b})}{let a={},b=0;var _fk=()=>{let c=b++%100+1;delete a[c];return c},_ds=(c,d)=>{c||(c=_fk());_ng(a,c).add(d);return c},_xu=c=>a[c]||{}}
{let a=[],b=_F(100,function(){for(let [c,d]of a){let e=_ds(null,{tabs:d});_Ya(_ii,{evtId:c|_Wd,trigInstId:e})}a=[]});var _Lt=function(c,d=null){if(!(c<_Qu)||d){if(_el[c]){let e=a[a.length-1];e&&e[0]==c?d&&e[1].push(d):a.push([c,d?[d]:[]]);b()}c!=_og&&_Su(c,d)}}}let _mu={};function _Su(a,b){"function"==typeof _5j&&_5j(a,b);if(a=_mu[a]){b=b in _pj?_pj[b].tabs.map(c=>c.id):[b];for(let [,c]of a)for(let d of b)(c[d||0]||_cy)()}}
let _sw=function(a){let b=[];a=_xu(a).tabs;if(!_7p(a))if(a[0]in _ts)b=a;else if(a[0]in _pj)for(let c of a)b.push(..._pj[c].tabs.map(d=>d.id));return b};
function _by(a){_br({width:615,yes:"Stop waiting",no:"Keep waiting"},`\n <b>${_Qk.alias}</b> is waiting for a <act style="display: inline-block; font-size: 84%; padding:4px 6px">Run script</act> action to finish. <br>\n None of your shortcuts will respond while this script is still running. <hr b=2>\n This issue occurs because the script is running <b>synchronously</b> and it's taking too long to finish. <br>\n You can prevent this by running the script <b>asynchronously</b> instead, as shown below: <hr b>\n <img src="/res/runAsync.png" width=340 style="display: block; margin: 0 auto"> <hr b=6>\n \n Do you wish AutoControl to stop waiting for the script to finish? <hr b>\n <b>Stop waiting:</b> Your shortcuts will start responding immediately. <hr b>\n <b>Keep waiting:</b> Your shortcuts will not respond until the script finishes.\n `,b=>
a(b.answer))}
function _9y(a){_br({width:590,yes:"My shortcuts are working fine. <br> Don't show this message again.",no:"Got it. Keep showing this message <br> if the problem continues."},`\n Apparently another program is preventing ${_Qk.alias} from detecting your shortcuts. <br>\n It cannot be determined automatically what program it is. <hr b=2>\n Some possibilities may include:  <hr b=2>\n <li>A third-party shortcut manager.</li>\n <li>An AutoHotKey script or program.</li>\n <li>A virtual KM switch like Synergy or Mouse Without Borders.</li>\n <li>A remote desktop utility like VNC or similar.</li>\n <li>Overly strict antivirus settings.</li>\n <hr b=4>\n To find out the cause, try disabling other programs one at a time till the issue is fixed.\n <hr b=2>\n Please report what the conflict was at the <a href="${_xg.support}" target=_blank>support forum</a>.\n <hr b=2>\n It may as well be just a temporary problem, in which case just close this message. \n `,b=>
a(b.answer))}
function _Sj(a,b=_cy){_br({onloaded:c=>{c.$("key").each(function(){this.innerText=_dy(c)._cj(this.innerText)})},width:500,no:!1},`\n <import src="file80.js"></import>\n <repairTit>REPAIR COMPLETE</repairTit>\n <b>Found issue:</b> <br>\n The following keys/buttons were stuck in their PRESSED state: <hr b=4>\n <center>${a.map(c=>`<key>${c}</key>`).join("")}</center> <hr b=6>\n Shortcuts won't work if there are extra keys or mouse buttons pressed unless you add a wildcard to those shortcuts. <hr b=3>\n If this problem keeps happening, go to the configuration page, then <u>Options</u> > <u>Advanced Options</u>, and adjust the\n "<b>Ignore synthetic input</b>" option and/or the "<b>Trigger's default wildcard</b>" option.\n <hr b=3>\n <!--\n An error report will be sent now. Please provide any additional details that can help fix the problem.\n For example: <hr b>\n What do you use those keys for? <br>\n Are they a shortcut for another program? <br>\n What happens when you press them? <hr b=2>\n <textarea name=comment maxlength=500 placeholder="Enter additional details (optional)..."></textarea>\n -->\n `,c=>
b(c.comment))}
function _Zk(a){if(a&&a.tabs&&a.tabs[0].title){var b=a.tabs.reduce((c,d,e)=>d.active?e:c,0);b=Math.min(a.tabs.length-1,Math.max(0,b-2)+5);b=`\n <c missingWin>\n ${a.tabs.slice(Math.max(0,b-5),b+1).map(c=>`<tab ${c.active?"active":""}><img src="${_5h(_uu(c))}"><tit>${_tw(c.title.substr(0,40))}</tit></tab>`).join("")}\n </c>\n `}_br({width:590,no:!1},`\n <repairTit>REPAIR COMPLETE</repairTit>\n <b>Found issue:</b> <br>\n The ${b?"following":"currently focused"} window was misidentified as belonging to a different browser profile. <br>\n ${b||""}\n <hr b=3>\n If this problem keeps happening, do not ignore it. Try to find out what situation triggers it. <hr b=2>\n <b>For example:</b> <hr b>\n <li> Does it happen whenever the active tab in the window has a specific URL or domain?</li> \n <li> Does it happen immediately after a new browser window is created?</li> \n <li> Does it happen when you move a tab from one window to another?</li> \n <li> Does it affect the amount of browser windows currently open?</li> \n Etc... <hr b=2>\n Please report your findings at the <a href="${_xg.support}" target=_blank>support forum</a>.\n <hr b=3>\n `)}
function _9j(a,b){return(c=_cy,d)=>{"function"==typeof b.code&&(b.code=`(${b.code})()`);b.runAt||(b.runAt="document_start");let e=g=>c(b.allFrames?g:g[0]);0<a?_Sf.tabs.executeScript(a,b,g=>{_pd()?d&&d(_pd()):e(g||[])}):e([])}}function _Iu(a,b=!1){return c=>_Ya(_Hu,{usePrvMsPos:b}.add(a),d=>c(_oj[d]))}
let _Ju=_qf(function*(a,b=!1){let {mouse:c,win:d}=yield _ky(_6w,(b?_Kk:_mi)|_Fh);if((b=_pj[yield _Iu(null,b)])&&"devtools"!=b.type)try{const g=b.activeTab.id;yield _9j(g,{allFrames:!0,matchAboutBlank:!0,file:"file8.js"});let h=[c.x-d.x,c.y-d.y];var e=yield f=>_Sf.tabs.sendMessage(g,{viewportPoint:h,smartMode:a},{frameId:0},f);_pd("BP_to_topFrame")}catch(g){}return _0p(e)?e:[]});
function _ij(a){let b=a.getResponseHeader("Content-Disposition"),c=_rl(a.getResponseHeader("Content-Type"));if(b)var d=(d=b.match(/filename=(?:"([^"]+)"|([^;]+))/))&&(d[1]||d[2]);if(!d){if(d=a.responseURL.match(/^data:([^,;]*)/i))return a=_rl(d[1]),"dataUri"+(a?"."+a:"");d=_Bd(a.responseURL,c)}return _Bd(decodeURIComponent(d),c)}
function _rl(a){const b={"text/plain":"txt","audio/mpeg":"mp3","audio/webm":"weba"};a=(a||"").match(/^[^,;]*/)[0].trim().toLowerCase();if(a in b)return b[a];a=(a.match(/\/([^+]+)/)||[,""])[1].replace(/^x-/,"");return"javascript"==a?"js":5>a.length?a:""}function _Pi(a){let b=new Uint8Array(a.length);for(let c=0;c<a.length;++c)b[c]=a.charCodeAt(c);return b.buffer}
function _ae(a,b){+a||(a=+_Yf(a)[1]);b=_il[a]=-1==b?!_il[a]:!!+b;_Ya(_uw,{states:{[a]:b}});_O(["LOCAL","switchStates",{},a],b,0);_Sf.contextMenus.update("binSwtch:"+a,{checked:b});return b}var _fj=()=>_Mt("sections");
