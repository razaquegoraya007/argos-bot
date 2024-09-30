'use strict';{let v=new _qy,z;var _Lr=_ug(function*(){_rg(_tt.menuStyle);_rg(_Jo.menuStyle);_Ya(_ar,[yield _8g(yield _Kh("/res/swtchOff.svg",16,16)),yield _8g(yield _Kh("/res/swtchOn.svg",16,16))]);_vd(yield _Kh("/res/actionIcon.svg",16,16),a=>z=a);v&&v.send()});_Lr();var _op=function(a,b=_Gj.items){return b&&b[a]};let A=_qf(function*(a,b,e){let d=_Gj.items,h=d.length,k=[];var g=0;let l=b.commonOptions||{};const n=l.withPreviews?_Ha:l.thumbSize;var f=l.sc().del("maxItems"),m=b.sc().keep("break","sepLine");
const q=f.noTitles;if(b.type.in("TSE","tabGroups")){let c="TSE"==b.type?yield _xd(e,_zk,b.content):b.content;for(let p of c){const r=!g++;k.push({noTitle:q,title:p.length+" tabs",icon:"res/tabs.png",subMenu:!0,itemType:_vw}.add(r?m:null));d.push({type:"tabList",content:p,commonOptions:f}.add(r?m:null))}1==c.length&&(b=d.pop(),k=[],g=0)}if("tabList"==b.type)for(let c of b.content)f={noTitle:q,title:_ts[c].title,icon:_5h(_uu(_ts[c])),itemType:_eo},0==g++&&f.add(m),n&&f.add({previewId:c,thumbSize:n}),
k.push(f),d.push({type:"tab",content:c});else if(b.type.in("closedTabs","closedWin")){a="closedWin"==b.type?b.content.tabs:_Sf.sessions?(yield c=>_Sf.sessions.getRecentlyClosed(c)).map(c=>c.tab||c.window):[];for(let c of a)a={noTitle:q,title:c.tabs?c.tabs.length+" tabs":c.title,icon:c.tabs?"res/tabs.png":_5h(c.url),subMenu:c.tabs?!0:void 0,itemType:c.tabs?_Ae:_ly},0==g++&&a.add(m),n&&!c.tabs&&a.add({previewId:+c.sessionId,thumbSize:n}),k.push(a),d.push({type:c.tabs?"closedWin":"closedTab",content:c,
commonOptions:c.tabs?f:void 0})}else if(b.type.in("bmFolder","bmSubFldr")){a=_Sf.bookmarks&&(yield c=>_Sf.bookmarks.getChildren(b.content+"",c))||[];for(let c of a)k.push({noTitle:q,title:c.title,icon:c.url?_5h(c.url):"res/folder.png",subMenu:!c.url,itemType:c.url?_Jg:_Ti}.add(g++?null:m)),d.push({type:c.url?"bookmark":"bmSubFldr",content:c.id,commonOptions:c.url?void 0:f})}else if("custom"==b.type){g=new x;for(let c of b.content)if(g=g.addNeighbor(1),c.subMenu||c.type.in("custom","action","switch")){let p,
r,w,t;if("TSE"==c.type)p=_Np(c.content,"tse").name||"(Unnamed tab selection)",r="res/tabs.png",w=!0,t=y(c.type);else if("closedTabs"==c.type)p=c.title||"Closed tabs",r="res/tabs.png",w=!0,t=y(c.type);else if("custom"==c.type)p=c.title||"(Unnamed submenu)",w=!0;else if("bmFolder"==c.type){if(m=(_Sf.bookmarks&&(yield E=>_Sf.bookmarks.get(c.content+"",E))||[])[0])p=m.title,r="res/folder.png",w=!0,t=y(c.type)}else if("action"==c.type)(m=yield _Mt("trigActList",c.content))&&!m.disabled&&(p=m.title||"(Unnamed action)",
r=m.icon&&m.icon.img||z,t=_Xw);else if("switch"==c.type&&c.content){p=_Np(c.content).name;t=_hu;var F=+_Yf(c.content)[1]}p&&(k.push({noTitle:q,title:p,icon:r,itemType:t,switchId:F,subMenu:w,break:c.break,sepLine:c.sepLine}),m={commonOptions:f.sc().add(c.commonOptions)}.add(c.sc().del("commonOptions","break","sepLine"),{parentID:a,itemIdx:g}),d.push(m))}else m={commonOptions:f.sc().add(c.commonOptions)}.add(c.sc().del("commonOptions")),m=yield A(a,m,e),k.push(...m)}l.maxItems&&(d.splice(h+l.maxItems),
k.splice(l.maxItems));return k}),y=a=>({TSE:_vw|_Ik,bmFolder:_Ti|_Ik,closedTabs:_bf})[a]||_Mh,B=_qf(function*(a,b,e){a=yield A(a,b,e);b=b.commonOptions||{};var d=a.length,h=b.itemsDistrib&&b.itemsDistrib[0]?b.itemsDistrib:b.layout!=_xs("R")?["numGroups"]:["auto"];d="auto"==h[0]?Math.ceil(Math.sqrt(d)):"numGroups"==h[0]?Math.ceil(d/(h[1]||1)):h[1]||1;let k=new _Wa;h=0;let g=!0;for(let l of a)l.break&&(h=0),l.break=0!=h||g?void 0:!0,l.icon&&_8g(l.icon)(k.onReady(n=>l.icon=n)),g=!1,h=++h%d;yield l=>
k.setCallback(l);_Gj.trigInstId=e;return{style:"std",items:a}.add(b)}),G=(a,b)=>{try{B(a,_Gj.items[a],_Gj.trigInstId)(e=>_Sh(b,e))}catch(e){_Pf("menuError",{stack:e.stack}),_Sh(b,[])}},C=(a,b,e)=>a==b?e:a==e?b:a;var _qw=_qf(function*(a,b,e,d=!1){v&&(yield v.wait(),v=void 0);if(!_Gj.items||(yield H())){_Gj={items:[null],busy:!0};var h=b.rootOptions||{},k=h.position||"mouse";if(yield _ky(_pk,{menuData:yield B(a,b,e),menuEntityNum:_Hs(a),position:_xs(k[0].toUpperCase()),alignHorz:"mouse"==k?C(h.alignHorz,
_fg,_ih):h.alignHorz,alignVert:"mouse"==k?C(h.alignVert,_Y,_9o):h.alignVert,menuSystem:h.menuSystem,usePrvMsPos:d}))_Gj.id=a;delete _Gj.busy}});let u,H=()=>(a=_cy)=>{u=b=>{u=null;a(b)};_Ya(_6a,null,b=>{b||u&&u(!1)})||_Fg(_6e)},I=a=>{a&&(_jt={[_Gj.id]:Date.now()});_Gj.busy||(_Gj={});u&&u(!0)};{const a=[{action:"alterTgtTabs",params:{tse:[{oper:"slice",params:{from:1,to:1}}]}},{action:"activateTabs"}],b=(e,d)=>[{sequence:[{action:"loadUrls",params:{bookmarkId:e}.add(d?{tabPos:"after",refTab:"lastTab"}:
null)}].concat(2==d?a:[]),targets:"currentTab"}];var _dg=_qf(function*(e,d=0){const h=_Gj.items;let k=_op(e,h);if(k){yield _bd();const g=k.type,l=k.content;let n;if("action"==g)2!=d&&(n=yield _dk(_3s[l]||[],null,_ds(null,{usePrevMousePos:!0})));else if("switch"==g)2!=d&&_ae(l,-1);else if("bookmark"==g)e=b(l,d),n=yield _dk(e);else if("bmFolder"==g||"bmSubFldr"==g)0!=d&&(n=yield _dk(b(l,d)));else if("TSE"==g||"tabList"==g){if(2==d){let f="TSE"==g?yield _xd(h.trigInstId,_zk,l):_ag(l);yield m=>_2y(f,
m);_Ya(_cu,e)}}else"tab"==g?2==d?(yield f=>_2y(_ag(l),f),_Ya(_cu,e)):(n=yield f=>_Ys(_ag(l),f),yield f=>_Md(n,f)):"closedTabs"!=g&&("closedWin"==g?0!=d&&(d=yield f=>_Sf.sessions.restore(l.sessionId,f),n=(_kd(d,"window","tabs")||[]).map(f=>f.id),_Ya(_cu,e)):"closedTab"==g&&2!=d&&(d=yield f=>_Sf.sessions.restore(l.sessionId,f),(d=_kd(d,"tab","id"))&&(n=[d]),_Ya(_cu,e)));_Nk=!0;return n}})}let J=_qf(function*(a){let b=_op(a,_Gj.items);if(b)switch(b.type){case "bookmark":return _kd(yield e=>_Sf.bookmarks.get(b.content+
"",e),0,"url");case "tab":return _uu(_ts[b.content]);case "closedTab":return b.content.url}}),D=(a,b)=>{let e=[];for(;a;){e.unshift("content",a.itemIdx);if("string"==typeof a.parentID){e.unshift(a.parentID);break}a=_op(a.parentID,b)}return e},K=_qf(function*(a,b,e,d){var h=_Gj.items;let k=_op(a,h),g=4294967294==b?{parentID:e,itemIdx:new x}:_op(b,h);if(k&&g){if(k.type.in("bookmark","bmSubFldr")){if(4294967294==b)var l={parentId:_op(e,h).content};else(b=_kd(yield f=>_Sf.bookmarks.get(g.content,f),0))&&
(l={parentId:b.parentId,index:b.index+("B"==d?1:0)});return l&&(yield f=>_Sf.bookmarks.move(k.content,l,f))}e=D(k,h);var n=D(g,h);h=e[0];if(_Tp(h)&&!n.join(" ").startsWith(e.join(" "))){a=_Np(h).value;e=_kd(a,...e.slice(1,-1));n=_kd(a,...n.slice(1,-1));let f=e[k.itemIdx],m=n[g.itemIdx],q=e[k.itemIdx+1];q&&(f.sepLine&&(q.sepLine=!0),f.break&&(q.break=!0));f.del("sepLine","break");4294967294==b&&(d="B");"T"==d&&(m.sepLine&&(f.sepLine=!0),m.break&&(f.break=!0),m.del("sepLine","break"));d="B"==d?1:0;
e.remove(f);n.splice(n.indexOf(m)+d,0,f);k.parentID=g.parentID;k.itemIdx.remove();k.itemIdx=g.itemIdx.addNeighbor(d);_5g([h,"value"],a,0);return!0}}}),x=function(a,b){this.list=a?a.list:[];null!=b&&this.list.splice(a+b,0,this)};x.prototype={valueOf(){return this.list.indexOf(this)},toString(){return+this},addNeighbor(a){return new x(this,a)},remove(){this.list.splice(+this,1)[0].list=null}};let L=(a,b)=>[];_dd({[_Tu]:a=>G(a.itemId,a.callback),[_qt]:a=>J(a.itemId)(b=>_Sh(a.callback,b)),[_2w]:a=>K(a.srcItmId,
a.tgtItmId,a.tgtParentId,_eu(a.insertPos))(b=>_Sh(a.callback,!!b)),[_Cy]:a=>_dg(a.itemId,a.selMode)(),[_Kp]:a=>_Sh(a.callback,L(a.itemId,a.parentId)),[_6e]:a=>I(a&&a.click)})};
