/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
import{dcLocalStorage as e,dcSessionStorage as t}from"../../../common/local-storage.js";import{dcTabStorage as a}from"../tab-storage.js";import{util as n}from"../content-util.js";import{signInUtil as r}from"./signInUtils.js";import{privateApi as i}from"../content-privateApi.js";import{COOLDOWN_FOR_LFT_PROMPT as o,OptionPageActions as s,LOCAL_FILE_PERMISSION_URL as c,LOCAL_FTE_WINDOW as d}from"../../../common/constant.js";import{indexedDBScript as l}from"../../../common/indexDB.js";import{loggingApi as m}from"../../../common/loggingApi.js";import{updateExtUserState as g,isNewUser as p}from"../../../common/util.js";import f from"./ResponseHeaders.js";import u from"./BookmarkUtils.js";import h from"./LruUtil.js";import{analytics as I,events as w}from"../../../common/analytics.js";import{fileUtil as b}from"./fileUtil.js";await e.init(),await t.init();const v=e.getItem("appLocale");let S=!1;!function(){let y,_,L,E,P,T,R,k,U,D,C,B,F,A,M,x,O,V,N,$,H,W,G,j,z="";const q=chrome.runtime.getURL("viewer.html"),J=chrome.runtime.getURL("signInHandler.html"),Y="file:",K=["https:","http:",Y],X=e=>{if(!e)return!1;try{const t=new URL(e),a=t.protocol;let n=-1!==K.indexOf(a);return n=a===Y?t.pathname.toLowerCase().endsWith(".pdf"):n,n}catch(e){return!1}};function Z(e){const t=a.getItem("search");return new URLSearchParams(t).get(e)}function Q(e,t){return A?(M=M||1,e.tabId=M,e.mimeHandled=!0,chrome.runtime.sendMessage(e,t)):chrome.runtime.sendMessage(e,t)}function ee(e,t){return new URLSearchParams(e).get(t)||""}function te(){if(E=ee(document.location.search,"pdfurl"),W=ee(document.location.search,"tabId"),G=ee(document.location.search,"aw"),!X(E))return void(P=!1);!function(){const e=new URLSearchParams(document.location.search),n=t.getItem("rtParams");if(n){const a=n.split(",").map((t=>e.has(t)?`&${t}=${e.get(t)}`:null)).join("")||"";t.setItem("payPalUrl",a),t.removeItem("rtParams")}e.has("dialog!dropin")&&a.setItem("dialog!dropin",e.get("dialog!dropin")),e.has("load!dropin")&&a.setItem("load!dropin",e.get("load!dropin"))}();const e=a.getItem("search");(!e||ee(e,"pdfurl")!==E||e.length<document.location.search)&&a.setItem("search",document.location.search),L=ee(document.location.search,"pdffilename")||ee(e,"pdffilename")||Se(E),document.title=L;const n="/"+E+location.hash;history.replaceState({},L,n)}function ae(t=!1){if(A)try{t||Q({main_op:"viewer-type",viewer:"mime-native"}),setTimeout((()=>{i.reloadWithNativeViewer({contentLength:parseInt(y)||0})}),100)}catch(e){re("DCBrowserExt:Viewer:FallbackToNative:Failed")}else try{setTimeout((()=>{chrome.tabs.getCurrent((function(t){e.setItem(`reloadurl-${t.id}`,E),window.location.href=E}))}),500)}catch(e){re("DCBrowserExt:Viewer:FallbackToNative:Failed")}}const ne=t=>{try{const a=new URL(e.getItem("cdnUrl")),n=[/^https:\/\/([a-zA-Z\d-]+\.){0,}(adobe|acrobat)\.com(:[0-9]*)?$/];return t===a.origin&&!!n.find((e=>e.test(t)))}catch(e){return!1}};function re(e){const t={main_op:"analytics"};t.analytics=[[e]],Q(t)}function ie(){let e,t=q;return A?(e="?mimePdfUrl="+encodeURIComponent(E),t=J):(e=a.getItem("search"),e||(e="?pdfurl="+E)),new URL(t+e)}const oe=["AdobeID","openid","DCAPI","sign_user_read","sign_user_write","sign_user_login","sign_library_read","sign_library_write","agreement_send","agreement_read","agreement_write","ab.manage","additional_info.account_type","sao.ACOM_ESIGN_TRIAL","widget_read","widget_write","workflow_read","workflow_write"];function se(t={}){if(e.getItem("csi")){const e={...t,pdfUrl:E};return void r.cdnSignIn(e)}const a=ie(),i=e.getItem("cdnUrl"),o=t.sign_up?1:0,s=n.generateStateCSRF(),c=e.getItem("enableCSRF"),d=JSON.stringify({touchp:t.touchpoint||"",signIn:!0,...c&&{state:s}}),l=e.getItem("theme")||"auto",m=`${i}?la=true&locale=${v||e.getItem("locale")}&theme=${l}&ru=${encodeURIComponent(a.href)}&rp=${d}&su=${o}#/susi`;chrome.tabs.update({url:m,active:!0})}function ce(){let e;e=A?ie().href:window.location.href,r.sign_out(e)}function de(t={}){if(e.getItem("csi")){const e={...t,pdfUrl:E};return void r.cdnSignIn(e)}let n=new URL(J);const i=t.idp_token;return n.searchParams.append("socialSignIn","true"),n.searchParams.append("mimePdfUrl",encodeURIComponent(E)),a.setItem("idp_token",i),n.href}function le(e={}){A?chrome.tabs.update({url:de(e),active:!0}):r.socialSignIn(e,ie(),E)}function me(t={}){if(e.getItem("csi")){try{const e=new URL(JSON.parse(t.url));delete t.url;const a={...t,pdfUrl:E},n=r.getCDNSignURL(a);e.searchParams.append("redirect_uri",n),chrome.tabs.update({url:e.href,active:!0})}catch(e){chrome.tabs.update({url:E})}return}const i=t.application||"google",o=e.getItem("viewerImsClientIdSocial"),s=e.getItem("imsURL"),c=n.uuid(),d=ie();d.hash=d.hash+"signIn=true";const l=new URL(s+"/ims/authorize/v1"),m={ac:n.getAppCode(),csrf:c};a.setItem("csrf",c),l.searchParams.append("response_type","token"),l.searchParams.append("idp_flow","social.deep_link.web"),l.searchParams.append("client_id",o),l.searchParams.append("provider_id",i),l.searchParams.append("redirect_uri",d),l.searchParams.append("scope",oe.join(",")),l.searchParams.append("locale",v||e.getItem("locale")),l.searchParams.append("state",JSON.stringify(m)),l.searchParams.append("xApiClientId",o),l.searchParams.append("xApiClientLocation ",i),chrome.tabs.update({url:l.href,active:!0})}const ge={isSharePointURL:!1,isSharePointFeatureEnabled:!1,isFrictionlessEnabled:!0,featureFlags:[],isFillAndSignRegisteryEnabled:!1};class pe{constructor(e){this.iframeElement=void 0,this.parentDiv=e}createIframe=t=>{const a=window.document,n=(e.getItem("cdnUrl"),a.createElement("iframe"));n.setAttribute("src",t),n.setAttribute("id","dc-view-frame"),n.setAttribute("allowfullscreen","allowfullscreen"),n.setAttribute("allow","clipboard-read; clipboard-write;"),n.style.width="100vw",n.style.height="100vh",n.style.border="none",n.style.overflow="hidden",this.parentDiv.appendChild(n),m.info({message:"Viewer Iframe created"}),this.iframeElement=a.getElementById("dc-view-frame")};_sendMessage=(e,t)=>{this.iframeElement&&ne(t)&&function(e){let t=Date.now();return new Promise((function a(n,r){T&&(P||A)?n(P||A):e&&Date.now()-t>=e?r(new Error("timeout")):setTimeout(a.bind(this,n,r),30)}))}(1e6).then((a=>a&&this.iframeElement.contentWindow.postMessage(e,t)))};sendStartupConfigs=(e,a)=>{this._sendMessage({type:"nativeConfigs",nativeConfigs:ge,extUrl:encodeURI(e),returnParamsUrl:t.getItem("payPalUrl"),isInstallTypeUpsell:S},a)};sendFileMetaData=(e,t,a,n,r,i,o,s)=>{this._sendMessage({fileUrl:r,fileName:i,fileSize:a,acceptRanges:n,handShakeTime:t,type:e,isFrictionlessEnabled:ge.isFrictionlessEnabled,isReloadOrBackForward:s,isMimeHandled:A},o)};sendSubmitFormResponse=(e,t)=>{this._sendMessage({type:"submitForm",response:e},t)};sendRecentUrl=async(e,t,a,n=!1)=>{await chrome.extension.isAllowedFileSchemeAccess()||(t=t?.filter((e=>!e.url.startsWith("file://")))),this._sendMessage({type:"RecentUrls",permission:e,showOverlay:n,recentUrls:t},a)};sendProgress=(e,t,a,n)=>{this._sendMessage({total:t,loaded:a,type:e},n)};sendInitialBuffer=(e,t,a,n,r)=>{this._sendMessage({type:e,downLoadstartTime:t,downLoadEndTime:a,buffer:n},r)};sendBufferRanges=(e,t,a,n)=>{this._sendMessage({type:e,range:t,buffer:a},n)};preview=(e,t,n,r,i,o,s)=>{const c="true"===a.getItem("bufferFromIndexedDB");a.removeItem("bufferFromIndexedDB"),this._sendMessage({fileSize:n,type:e,fileBuffer:t,fileName:r,downLoadstartTime:i,downLoadEndTime:o,fromIndexedDB:c},s)};openInAcrobatResponse=(e,t,a)=>{this._sendMessage({type:e,res:t},a)};postLog=(e,t,a,n,r)=>{this._sendMessage({type:e,reqId:t,message:a,error:n},r)};sendCertificateValidationResponse=(e,t)=>{this._sendMessage({type:"certificateValidationResponse",response:e},t)}}function fe(t,a){try{C=void 0!==C?C:"false"!==e.getItem("logAnalytics")&&"false"!==e.getItem("ANALYTICS_OPT_IN_ADMIN"),C&&(U&&_?U.postLog("log",D,t,a,_.origin):setTimeout((()=>{U&&_&&U.postLog("log",D,t,a,_.origin)}),500))}catch(e){}}function ue(){let e;return e=A?E:window.location.href,e}function he(){const t=ue(),n=(t.split("#")||[]).pop();if(n.indexOf("access_token=")>-1)try{const i=new URLSearchParams(n).get("access_token"),{client_id:o}=JSON.parse(window.atob(i.split(".")[1]))||{},s=e.getItem("viewerImsClientId");if([s,e.getItem("viewerImsClientIdSocial")].includes(o)){const e=a.getItem("csrf");a.removeItem("csrf");const n=r.parseCSRF(new URL(t));(!e||!n||n!==e)&&(re("DCBrowserExt:Viewer:User:Error:NonMatchingCsrfToken:FailedToLogin"),ce())}}catch{}}function Ie(t,a,n,r,i){i&&t.forEach((e=>{n.has(e)&&a.searchParams.append(e,n.get(e))})),r&&t.forEach((t=>{""!==e.getItem(t)&&a.searchParams.append(t,e.getItem(t))}))}const we=()=>{try{const r=e.getItem("cdnUrl"),i=new URL(r);if(!ne(i.origin))return fe("Invalid CDN URL detected","Invalid Origin"),void ae();_||(_=i);let o=e.getItem("viewer-locale");o||(o=e.getItem("locale"));const s="false"!==e.getItem("logAnalytics"),c="false"!==e.getItem("ANALYTICS_OPT_IN_ADMIN"),d=s&&c?"true":c?"optinOff":"gpoOff",l="true"===e.getItem("betaOptOut");i.searchParams.append("locale",v||o),i.searchParams.append("logAnalytics",d),i.searchParams.append("callingApp",chrome.runtime.id),i.searchParams.append("betaOptOut",l),i.searchParams.append("lfa",e.getItem("isAllowedLocalFileAccess")||"false"),i.searchParams.append("enableCaretMode",V),t.getItem("signInTp")&&i.searchParams.append("touchp",t.getItem("signInTp")),i.searchParams.append("rvu",e.getItem("userState")?.rvu??null);const m=e.getItem("installType")||"update",g=e.getItem("installSource");i.searchParams.append("version",`${chrome.runtime.getManifest().version}:${m}`),i.searchParams.append("installSource",g),i.searchParams.append("storage",JSON.stringify(e.getItem("viewerStorage")||{})),i.searchParams.append("tabId",W),"false"===e.getItem("staticFteCoachmarkShown")&&i.searchParams.append("showFTECoachmark","true"),"true"!==Z("googlePrint")&&!0!==x||"false"===a.getItem("googleAppsPrint")||i.searchParams.append("googleAppsPrint","true"),i.searchParams.append("sdp",e.getItem("sdp")?"1":"0"),i.searchParams.append("sds",e.getItem("sds")?"1":"0");const f=H.read(E);f&&(delete f.filename,delete f.lastVisited,i.searchParams.append("docState",JSON.stringify(f))),i.searchParams.append("nu",p()),i.searchParams.append("rs",e.getItem("rs")?"1":"0"),i.searchParams.append("nm",e.getItem("supportNightMode")?"1":"0"),i.searchParams.append("dpt",e.getItem("isDarkPageThemeEnabled")?"1":"0"),i.searchParams.append("adminDisableGenAI","true"===e.getItem("DISABLE_GENAI_BY_ADMIN")?"1":"0");const u=["dropin!","provider!","app!","forceDisableGenAI"],h=["analytics","logToConsole","enableLogging","frictionless","sessionId","linearization","ev","ao"],I=["rrv","isDeskTop","isAcrobat","theme","defaultOwnerShipExperiment","sessionId","ev","ao","ip","rate","genAI","mv","pi","ks","edd","tpt","lft","fsu","dcs","egal","ots","egaf","gga","pnb","subv2","s3d","ips"];let w=a.getItem("signinTouchPointData");w=JSON.parse(w||"{}"),w&&"object"==typeof w&&Object.keys(w).length&&(i.searchParams.append("tp",w.touchpoint),i.searchParams.append("acmt",w.allowCommentsInShare?"1":"0")),a.removeItem("signinTouchPointData");e.getItem("env");let b;b=A?new URLSearchParams(new URL(E).search):new URLSearchParams(window.location.search);n=i,["dialog!dropin","load!dropin"].forEach((e=>{""!==(a.getItem(e)||"")&&n.searchParams.append(e,a.getItem(e))})),Ie(h,i,b,!1,!0),Ie(I,i,b,!0,!1);let S=i.href;u.forEach((e=>{b.forEach(((t,a)=>{a.startsWith(e)&&(S=S+"&"+a+"="+t)}))})),""===t.getItem("payPalUrl")||""===a.getItem("dialog!dropin")&&""===a.getItem("load!dropin")||(S+=t.getItem("payPalUrl"));const y=a.getItem("access_token");return a.removeItem("access_token"),`${S}${y?`/#${y}`:""}`}catch(e){re("DCBrowserExt:Viewer:Iframe:Creation:Failed"),ae()}var n},be=(a,n,r="localStorage")=>{if(n){const i="localStorage"===r?e.getItem(a):t.getItem(a);let o;i&&i.tabsInfo?(o=i.tabsInfo,o.includes(n)||o.push(n)):o=[n],"localStorage"===r?e.setItem(a,{tabsInfo:o}):t.setItem(a,{tabsInfo:o})}},ve=()=>{try{!function(){try{let e=ue();e&&e.indexOf("#")>-1&&(r.saveAccessToken(e),r.signInAnalyticsLogging(e),r.checkSignInFromEditVerbPaywall(e),e=e.split("#")[0],A?E=e:(window.location.hash=e,history.replaceState(null,document.title,e)))}catch(e){}}(),A&&(W=M);const a=window.document.getElementById("Adobe-dc-view");A||(y=Z("clen")||-1),U=new pe(a);const n=we();U.createIframe(n),g(),window.addEventListener("message",(a=>{!a.data||!ne(a.origin)||R||"hsready"!==a.data.type&&"ready"!==a.data.type||(R=!0,k=(new Date).getTime(),D=a.data.requestId,"on"===a.data.killSwitch?(re("DCBrowserExt:Viewer:KillSwitch:Turned:On"),e.setItem("pdfViewer","false"),i.setViewerState("disabled"),e.setItem("killSwitch","on"),A?ae(!0):setTimeout((()=>{window.location.href=E}),200)):e.getItem("killSwitch")&&(re("DCBrowserExt:Viewer:KillSwitch:Turned:Off"),e.removeItem("killSwitch")),t.getItem("signInTp")&&t.removeItem("signInTp"))}))}catch(e){fe("Error create Iframe",e)}};function Se(e){if(L)return L;let t=e;try{const a=e.split("?")[0].split("/").filter((e=>e.length>0)),n=a.length>0?a[a.length-1]:"untitled";t=n;const r=n.length-4;(n.length<4||n.toLowerCase().indexOf(".pdf")!==r)&&(t+=".pdf")}catch(e){fe("Error in getFileNameFromURL",e)}return t}function ye(e,t){let a=!1;return function(n){n.lengthComputable&&(y=n.total,e.sendProgress("progress",n.total,n.loaded,t),a||(!function(e){const t=H.read(E)||{},a={main_op:"getFileSize",fileSize:e,tabId:W,docLastOpenState:t,target:"offscreen"};chrome.runtime.sendMessage(a)}(y),a=!0))}}function _e(e,t){"PDF"===function(e){if(e)try{let t=new URL(e).pathname;return t.substr(t.lastIndexOf(".")+1).toUpperCase()}catch(e){return""}return""}(e)&&(P=!0);const a=new XMLHttpRequest;a.open("GET",e),a.responseType="arraybuffer",a.onreadystatechange=function(){4===a.readyState&&(200!==a.status&&0!=a.status||(t({buffer:a.response,mimeType:a.getResponseHeader("content-type")}),Ee(a.response)))},a.send(null)}async function Le(){try{const t=a.getItem("bufferTabId");if(t){const e=await l.getDataFromIndexedDB(t);if(e&&e.fileBuffer)return a.setItem("bufferFromIndexedDB",!0),P=!0,{buffer:e.fileBuffer}}else{const t=e.getItem("tabIdMap");if(t){const n=(A?await chrome.tabs.query({active:!0,currentWindow:!0}):[await chrome.tabs.getCurrent()])[0];if(n&&t[n.id]){a.setItem("bufferTabId",t[n.id]);const r=await l.getDataFromIndexedDB(t[n.id]);if(Object.keys(t).length>1?(delete t[n.id],e.setItem("tabIdMap",t)):e.removeItem("tabIdMap"),r&&r.fileBuffer)return a.setItem("bufferFromIndexedDB",!0),P=!0,{buffer:r.fileBuffer}}}}}catch(e){}return a.setItem("bufferFromIndexedDB",!1),{}}function Ee(e){const t=H.read(E)||{},a=new Blob([e],{type:"application/pdf"}),n={main_op:"getFileBuffer",fileBufferBlob:URL.createObjectURL(a),tabId:W,docLastOpenState:t,target:"offscreen"};chrome.runtime.sendMessage(n)}function Pe(e,t,a){return new Promise(((n,r)=>{const i=E;if(i.startsWith("file://"))return void _e(i,n);const o=new XMLHttpRequest;o.open("GET",i),o.responseType="arraybuffer",t&&o.setRequestHeader("If-Range","randomrange"),o.onreadystatechange=function(e,t){return function(a){if(this.readyState==this.HEADERS_RECEIVED){if(!function(e,t){const a=e.getResponseHeader("content-type"),n=e.getResponseHeader("content-disposition");if(a){const e=a.toLowerCase().split(";",1)[0].trim();if(n&&/^\s*attachment[;]?/i.test(n))return!1;if("application/pdf"===e)return!0;if("application/octet-stream"===e&&n&&/\.pdf(["']|$)/i.test(n))return!0}return!1}(e))return fe("Fall back to native - not pdf from headers"),ae();if(P=!0,"true"===G){const e=this.getResponseHeader("accept-ranges"),a=this.getResponseHeader("content-length");e&&"bytes"===e&&a&&Number(a)>0&&Q({main_op:"setupWorkerOffscreen",pdfURL:t,pdfSize:+a,acceptRanges:!0,tabId:W})}}}}(o,i),o.onprogress=ye(e,a),o.onload=()=>{if(o.status>=200&&o.status<400)n({buffer:o.response,mimeType:o.getResponseHeader("content-type"),downLoadEndTime:(new Date).getTime()}),Ee(o.response);else{const e={status:o.status,statusText:o.statusText};r({message:"Invalid response fetching content",error:e})}},o.onerror=e=>{r({message:"Error to download file contents",error:e})},o.ontimeout=e=>{r({message:"Timeout to download file contents",error:e})},o.send()}))}function Te(e,t){re(`DCBrowserExt:Viewer:SignIn:AdobeYolo:${e}:clicked`),chrome.tabs.query({active:!0,currentWindow:!0},(function(e){var t=e[0]&&e[0].id;be("adobeYoloTabsInfo",t,"sessionStorage")})),Q({main_op:"launchJumpUrl",details:{source:e,userGuid:t}},(t=>{U._sendMessage({type:"adobeYoloJumpResponse",response:t,source:e},_.origin)}))}function Re(e,t,...a){A?l.storeBufferAndCall(e,t,M,...a):chrome.tabs.getCurrent((function(n){l.storeBufferAndCall(e,t,n.id,...a)}))}function ke(e){U._sendMessage({type:"redirectToAcrobatWeb",response:e},_.origin)}function Ue(){A?chrome.tabs.reload(M):chrome.tabs.getCurrent((e=>{chrome.tabs.reload(e.id)}))}function De(r,m){switch(m.data.main_op){case"open_in_acrobat":case"fillsign":!async function(t,a){const r={main_op:"open_in_acrobat"};if("fillsign"===a.data.main_op&&(r.paramName="FillnSign"),r.url=a.data.url,r.click_context="pdfviewer",r.timeStamp=Date.now(),r.filename=a.data&&a.data.filename,a.data.fileBuffer){const e=new Blob([a.data.fileBuffer],{type:"application/pdf"});r.dataURL=URL.createObjectURL(e)}if(O=function(e){"fillsign"===a.data.main_op?t.openInAcrobatResponse("FILLSIGN_IN_DESKTOP_APP",e,a.origin):t.openInAcrobatResponse("OPEN_IN_DESKTOP_APP",e,a.origin),fe(`Open In Acrobat - (${a.data.main_op}) response- ${e}`)},e.getItem("isSharepointFeatureEnabled"))if(ge.isSharePointURL)r.workflow_name="SharePoint",r.isSharePointURL=!0,Q(r,O);else{const e=await n.checkForSharePointURL(r.url);r.isSharePointURL=e,e&&(r.workflow_name="SharePoint"),Q(r,O)}else Q(r,O)}(r,m);break;case"complete_conversion":re("DCBrowserExt:Viewer:Verbs:Conversion:Redirection"),function(e){const t={};t.main_op=e.data.main_op,t.conversion_url=decodeURIComponent(e.data.conversion_url),t.timeStamp=Date.now(),Q(t)}(m);break;case"updateLocale":re("DCBrowserExt:Viewer:User:Locale:Updated"),e.setItem("viewer-locale",m.data.locale),Q({main_op:"localeChange",locale:m.data.locale}),chrome.tabs.reload();break;case"setInitialLocale":let p=!1;e.getItem("viewer-locale")||(p=!0,e.setItem("viewer-locale",m.data.locale),re("DCBrowserExt:Viewer:User:Locale:Initial")),m.data.reloadReq&&p&&chrome.tabs.reload();break;case"error-sign-in":!function(e){const t=n.uuid();a.setItem("csrf",t);const r=new URL(e),i=ie();i.hash=i.hash+`state=${t}&signInError=true`,r.searchParams.set("redirect_uri",i),chrome.tabs.update({url:r.href,active:!0})}(m.data.url);break;case"deleteViewerLocale":e.getItem("viewer-locale")&&(e.removeItem("viewer-locale"),chrome.tabs.reload());break;case"signin":re("DCBrowserExt:Viewer:Ims:Sign:In"),a.setItem("signInSource",m.data.source),a.setItem("signinTouchPointData",JSON.stringify({touchpoint:m.data.tp,allowCommentsInShare:m.data.allowCommentsInShare})),re(`DCBrowserExt:Viewer:Ims:Sign:In:${m.data.source}`),Re(m.data.fileBuffer,se,m.data);break;case"googleSignIn":re("DCBrowserExt:Viewer:Ims:Sign:In"),re(`DCBrowserExt:Viewer:Ims:Sign:In:${m.data.source}`),a.setItem("signInSource",m.data.source),Re(m.data.fileBuffer,me,m.data);break;case"signup":re("DCBrowserExt:Viewer:Ims:Sign:Up"),a.setItem("signUpSource",m.data.source),re(`DCBrowserExt:Viewer:Ims:Sign:Up:${m.data.source}`),Re(m.data.fileBuffer,se,m.data);break;case"reload_viewer":chrome.tabs.reload();break;case"reload_current_tab":Ue();case"upsell_event":!function(e){if(e&&e.url){const a=new URL(decodeURIComponent(e.url));e.returnUrlParams&&t.setItem("rtParams",e.returnUrlParams.toString()),"_blank"===e.target?chrome.tabs.create({url:a.href,active:!0}):chrome.tabs.update({url:a.href,active:!0})}}(m.data);break;case"upsell_remove_urlParams":t.removeItem("rtParams"),t.removeItem("payPalUrl"),a.removeItem("dialog!dropin"),a.removeItem("load!dropin");break;case"fetchLocalRecents":const f=new URL(e.getItem("cdnUrl")).origin;if(m.data.fetchRecents){const e=m.data.showOverlay;!async function(e,t,a=!1){const n=H.getAllItems();e.sendRecentUrl(!0,n,t,a)}(U,f,e)}else U.sendRecentUrl(!0,null,f);break;case"socialSignIn":re("DCBrowserExt:Viewer:Ims:Sign:In"),re(`DCBrowserExt:Viewer:Ims:Sign:In:${m.data.source}`),a.setItem("signInSource",m.data.source),Re(m.data.fileBuffer,le,m.data);break;case"openRecentFileLink":const h={};h.main_op=m.data.main_op,h.recent_file_url=decodeURIComponent(m.data.recent_file_url),Q(h);break;case"updateCurrentURL":!async function(e){const{redirectURL:t,copyToClipboard:a}=e;if(a)try{await navigator.clipboard.writeText(a)}catch(e){}const n=A?M:(await chrome.tabs.getCurrent())?.id;chrome.tabs.update(n,{url:t})}(m.data);break;case"saveFileBufferAndReload":case"saveFileBufferAndReload":Re(m.data.fileBuffer,Ue);break;case"userSubscriptionData":if(A){const e={};e.eventType=m.data.main_op,e.userSubscriptionData=m.data.userSubscriptionData,e.data=m.data,e.main_op=m.data.main_op;Q(e,(function(e){e&&"showUninstallPopUp"===e.main_op&&U._sendMessage({type:"showUninstallPopUp"},_.origin)}))}break;case"uninstall":A&&Q({main_op:"uninstall",defaultUrl:E});break;case"submit_form":fetch(m.data.resource,m.data.options).then((e=>{U.sendSubmitFormResponse(e.ok,m.origin)})).catch((()=>{U.sendSubmitFormResponse(!1,m.origin)}));break;case"ownerShipExperimentShown":e.removeItem("defaultOwnerShipExperiment");break;case"openAcrobatOptions":chrome.runtime.openOptionsPage(),re(`DCBrowserExt:Viewer:ManagePref:clicked:${m.data.source}`);break;case"openExtensionSettings":const b=e.getItem("openSettingsInWindow");b?chrome.tabs.query({active:!0,currentWindow:!0},(function(t){const a=t[0];e.setItem("lastOpenTabId",a.id),chrome.windows.get(a.windowId,(function(t){const{height:a}=d,n=Math.round(1.2*d.width),r=Math.round(.5*(t.height-a)+t.top),i=Math.round(.5*(t.width-n)+t.left);chrome.windows.create({height:a,width:n,left:i,top:r,focused:!0,type:"popup",url:c},(t=>{e.setItem("settingsWindow",t)}))}))})):chrome.tabs.create({url:c,active:!0}),I.event(w.LOCAL_FILE_ACCESS_TOUCHPOINT_SETTINGS_OPENED,{VARIANT:b?"InWindow":"InTab"}),e.setItem("LocalFileAccessTouchpointsFromViewer",!0),setTimeout((()=>{e.removeItem("LocalFileAccessTouchpointsFromViewer")}),o),Q({main_op:"triggerBufferSave"});break;case"encryptedWriteFile":({secureString:z}=m.data),Ae(document.title);break;case"launchJump":Re(m.data.fileBuffer,Te,m.data.source,m.data.userGuid);break;case"saveAsEvent":!async function(e){try{if(re("DCBrowserExt:Viewer:SaveToMyComputer:"+($?"fileHandlerExist":"fileHandlerNotExist")),$)j=!1;else{const t={suggestedName:`${e.fileName}.pdf`,types:[{description:"PDF file",accept:{"application/pdf":[".pdf"]}}]};$=await window.showSaveFilePicker(t),j=!0,Ae($?.name)}U._sendMessage({type:"newSaveToLocalResponse",newAsset:j,updatedFileName:$?.name},_.origin)}catch(e){$=null,fe("Save As Handler Error",e),U._sendMessage({type:"newSaveToLocalResponse",error:e},_.origin)}}(m.data);break;case"downloadFile":!async function(e){try{let t=e.fileUrl;if(!t){const a=new Blob([e.fileBuffer],{type:"application/pdf"});t=URL.createObjectURL(a)}await chrome.downloads.download({url:t,conflictAction:"uniquify",saveAs:!0,...e.fileName&&{filename:`${e.fileName}.pdf`}})}catch(e){fe("downloadFile error",e),U._sendMessage({type:"downloadFileError"},_.origin)}}(m.data);break;case"rememberSaveLocationPreference":!function(t){let a="";t.cloudStorage&&!e.getItem("selectedSaveLocationPreference")?a="PreferenceMigrationSuccess":t.cloudStorage||(a="SaveDialogRememberMe");a&&re(`DCBrowserExt:Viewer:ChangeSaveLocationPreference:${a}`);(!t.cloudStorage||t.cloudStorage&&!e.getItem("selectedSaveLocationPreference"))&&(e.setItem("saveLocation",t.saveLocation),e.setItem("selectedSaveLocationPreference",!0),Q({panel_op:"options_page",requestType:s.OPTIONS_UPDATE_TOGGLE,toggleId:"saveLocationPreferenceTitle",toggleVal:t.saveLocation}))}(m.data);break;case"appRenderingDone":ze();break;case"saveFileBuffer":Re(m.data.fileBuffer);break;case"deleteFileBuffer":const v=a.getItem("bufferTabId");v&&l.deleteDataFromIndexedDB(v),a.removeItem("bufferTabId");case"appRenderingDone":ze();break;case"writeToLocalSavedFile":!async function(e){try{const t=await $.createWritable();await t.write(e.fileBuffer),await t.close(),U._sendMessage({type:"newSaveToLocalResponse",newAsset:j,updatedFileName:$?.name,isFileWriteStage:!0},_.origin)}catch(e){$=null,fe("Write to Local File Error",e),U._sendMessage({type:"newSaveToLocalResponse",error:e,isFileWriteStage:!0},_.origin)}}(m.data);break;case"bookmarkWeb":u(m.data.url,ke,re);break;case"updateDocumentViewState":!function(e){const{documentViewState:t}=e;H.writeAndSyncWithHistory(E,t)}(m.data);break;case"validateEdgeCertificateForDigitalSignature":i.validateCertificate(m.data).then((e=>U.sendCertificateValidationResponse(e,m.origin)));break;case"documentViewThemeChange":!function(t){e.getItem("theme")!==t.data&&(e.setItem("theme",t.theme),Q({panel_op:"options_page",requestType:s.OPTIONS_UPDATE_TOGGLE,toggleId:"appearancePrefTitle",toggleVal:t.theme}));e.getItem("isDarkPageThemeEnabled")!==t.isDarkPageThemeEnabled&&e.setItem("isDarkPageThemeEnabled",t.isDarkPageThemeEnabled)}(m.data);break;case"enableGenAIFeaturesToggledFromViewer":g=m.data,e.getItem("egaf")!==g.isEnabled&&(e.setItem("egaf",g.isEnabled.toString()),Q({panel_op:"options_page",requestType:s.OPTIONS_UPDATE_TOGGLE,toggleId:"enableGenAIFeaturesTitle",toggleVal:g.isEnabled}));break;case"genAIEligible":!function(t){e.setItem("genAIEligible",t.isEligible.toString())}(m.data);break;case"rrvLayerRemoved":chrome.runtime.sendMessage({main_op:"rrvLayerRemoved",tabId:m.data.tabId,target:"offscreen"})}var g}function Ce(e){try{const t=new TextDecoder("utf-8").decode(e.buffer);let a=!1;-1!=t.indexOf("Linearized 1")?a=!0:-1!=t.indexOf("Linearized")&&re("DCBrowserExt:Viewer:Linearization:Linearized:Version:Other"),U._sendMessage({type:"Linearization",linearized:a},_.origin)}catch(e){re("DCBrowserExt:Viewer:Linearization:Linearized:Detection:Failed"),fe("Linearization Detection failed",e)}}function Be(t,a,n,r){n.then((n=>{const i=n.downLoadEndTime,o=n.buffer;n.buffer.byteLength;t.preview("preview",o,y,L,r,i,a.origin),U._sendMessage({type:"NavigationStartTime",time:window.performance&&window.performance.timing&&window.performance.timing.navigationStart},_.origin),!0===e.getItem("isSaveLocationPrefEnabled")&&U._sendMessage({type:"changeSaveLocationPreference",saveLocation:e.getItem("saveLocation"),onLoad:!0},_.origin)})).catch((e=>(re("DCBrowserExt:Viewer:Error:FallbackToNative:FileDownload:Failed"),ae()))).finally((()=>{e.removeItem("sessionStarted")}))}class Fe{constructor(){this.request={main_op:"analytics"}}analytics=e=>{this.request.analytics||(this.request.analytics=[]),this.request.analytics.push([e])};sendAnalytics=()=>{Q(this.request)}}function Ae(e){e&&(document.title=e+z)}const Me=(t,a,n)=>{const r=n?"viewerStorage":"viewerStorageAsync",i=e.getItem(r)||{};i[t]=a,e.setItem(r,i)},xe=t=>{const a=e.getItem("viewerStorage")||{},n=e.getItem("viewerStorageAsync")||{};delete a[t],delete n[t],e.setItem("viewerStorage",a),e.setItem("viewerStorageAsync",n)};function Oe(t,n,r,i){return o=>{try{if(o.data&&o.origin&&ne(o.origin)&&(e=>{try{return e&&e.source&&e.source.top.location.origin==="chrome-extension://"+chrome.runtime.id}catch(e){return!1}})(o)){if(o.data.main_op)return De(t,o);switch(o.data.type){case"ready":if(A?async function(t,n,r,i){let o=new Fe;T=!0;const s=E;document.title=L;const c=N.getHeaderValue("accept-ranges"),d=!a.getItem("bufferTabId")&&c&&"bytes"===c.toLowerCase()?"true":"false";t.sendFileMetaData("metadata",k,y,d,s,L,n.origin,!1),He(),r&&r.then((e=>{t.sendInitialBuffer("initialBuffer",e.startTime,e.endTime,e.buffer,n.origin),Ce(e)})).catch((e=>{t.sendInitialBuffer("initialBuffer",0,0,-1,n.origin),o.analytics("DCBrowserExt:Viewer:Error:Linearization:InitialBufiled")})),e.removeItem("isReload"),e.removeItem("isBackForward");const l=window.performance&&window.performance.timing&&window.performance.timing.navigationStart,m=Le();(await m).buffer?Be(t,n,m,l):(fetch(i.streamUrl).then((e=>{let a=0;return new Response(new ReadableStream({start(r){const i=e.body.getReader();!function e(){i.read().then((({done:i,value:o})=>{i?r.close():(a+=o.byteLength,t.sendProgress("progress",y,a,n.origin),r.enqueue(o),e())})).catch((e=>{r.error(e)}))}()}}))})).then((e=>e.arrayBuffer())).then((a=>{y=a.byteLength,Ee(a),t.preview("preview",a,a.byteLength,L,l,(new Date).getTime(),n.origin),U._sendMessage({type:"NavigationStartTime",time:window.performance&&window.performance.timing&&window.performance.timing.navigationStart},n.origin),!0===e.getItem("isSaveLocationPrefEnabled")&&U._sendMessage({type:"changeSaveLocationPreference",saveLocation:e.getItem("saveLocation"),onLoad:!0},n.origin)})).catch((e=>(o.analytics("DCBrowserExt:Viewer:Error:FallbackToNative:FileDownload:Failed"),ae()))),o.sendAnalytics()),fe("Viewer loaded")}(t,o,r,n):function(e,t,n,r,i){T=!0;const o=E,s=!a.getItem("bufferTabId")&&Z("chunk")||"false",c=window.performance.getEntriesByType("navigation").map((e=>e.type)).includes("reload"),d=window.performance.getEntriesByType("navigation").map((e=>e.type)).includes("back_forward");e.sendFileMetaData("metadata",k,y,s,encodeURI(o),L,t.origin,c||d),He(),n?n.then((a=>{e.sendInitialBuffer("initialBuffer",a.startTime,a.endTime,a.buffer,t.origin),Ce(a)})).catch((a=>{e.sendInitialBuffer("initialBuffer",0,0,-1,t.origin),m.error("Linearization InitialBuffer Failed")})):e.sendInitialBuffer("initialBuffer",0,0,-1,t.origin),Be(e,t,r,i),fe("Viewer loaded")}(t,o,r,n,i),Q({main_op:"getUserInfoFromAcrobat"},(e=>{U._sendMessage({type:"adobeYoloUserData",...e},_.origin)})),o.data.visitorID){const t=e.getItem("viewerVisitorID");e.setItem("viewerVisitorID",o.data.visitorID),t&&t!==o.data.visitorID&&re("DCBrowserExt:Analytics:viewerVisitorID:MCMID:Changed")}break;case"getFileBufferRange":!function(e,t){let a={url:E};b.getFileBufferRange(a,e.data.range).then((a=>{F||(F=!0),t.sendBufferRanges("bufferRanges",`${e.data.range.start}-${e.data.range.end}`,a.buffer,e.origin)})).catch((a=>{re("DCBrowserExt:Viewer:Error:Linearization:Range:Failed"),t.sendBufferRanges("bufferRanges",`${e.data.range.start}-${e.data.range.end}`,-1,e.origin)}))}(o,t);break;case"previewFailed":B||(re("DCBrowserExt:Viewer:Error:FallbackToNative:Preview:Failed"),B=!0,ae());break;case"lastUserGuid":e.setItem("lastUserGuid",o.data.value);break;case"signin":re("DCBrowserExt:Viewer:Ims:Sign:In"),se();break;case"signout":re("DCBrowserExt:Viewer:Ims:Sign:Out"),e.removeItem("viewer-locale"),e.removeItem("userDetailsFetchedTimeStamp"),e.removeItem("discoveryExpiryTime"),e.removeItem("viewer-locale"),Re(o.data.fileBuffer,ce);break;case"googleAppsPrintShown":a.setItem("googleAppsPrint","false"),re("DCBrowserExt:Viewer:GoogleApps:Print:Shown");break;case"signInExperimentShown":chrome.tabs.query({active:!0,currentWindow:!0},(function(t){const a=t[0],n=(new Date).getTime();e.setItem("signInExperimentShown",JSON.stringify({currTabId:a.id,timestamp:n}))}));break;case"disableViewer":e.setItem("pdfViewer","false"),chrome.tabs.reload();break;case"signInExperimentClosed":case"signInExperimentSkipped":e.setItem("signInExperimentSuppressed","true");break;case"enableBeta":e.setItem("betaOptOut","false"),chrome.tabs.reload();break;case"disableBeta":e.setItem("betaOptOut","true"),chrome.tabs.reload();break;case"updateTitle":Ae(o.data.title);break;case"viewer_set_item":Me(o.data.key,o.data.value,o.data.startup);break;case"viewer_remove_item":xe(o.data.key)}}}catch(e){re("DCBrowserExt:Viewer:Error:MessageHandler:Unknown")}}}function Ve(){if(!R)return re("DCBrowserExt:Viewer:Error:Handshake:TimedOut"),ae(),!1}const Ne=t=>{try{e.getItem("enableCSRF")&&he();const n=N.getHeaderValue("content-length");y=n;const r=N.getHeaderValue("accept-ranges"),i=r&&"bytes"===r.toLowerCase();E=t.originalUrl,ve(),L=function(){let e;const t=N.getHeaderValue("content-disposition");if(t&&/\.pdf(["']|$)/i.test(t)){const a=/filename[^;=\n\*]?=((['"]).*?\2|[^;\n]*)/.exec(t);null!=a&&a.length>1&&(e=a[1].replace(/['"]/g,""))}return e||(e=Se(E)),decodeURIComponent(e)}();const o={url:E},s=new URL(e.getItem("cdnUrl"));_||(_=s);let c=null;const d="false"!==Z("linearization")&&!a.getItem("bufferTabId");d&&i&&n>0&&(c=b.getFileBufferRange(o,{start:0,end:1024})),window.addEventListener("message",Oe(U,t,c)),We(),setTimeout(Ve,25e3)}catch(e){fe("InitMimeHandlerScript failed",e),ae()}},$e=async()=>{try{if(e.getItem("enableCSRF")&&he(),!X(E))return void(P=!1);ve();const t=Z("clen")||-1,n=Z("chunk")||!1,r="false"!==Z("linearization")&&!a.getItem("bufferTabId"),i={url:E},o=(new Date).getTime(),s=new URL(e.getItem("cdnUrl"));L=Z("pdffilename")||Se(E),document.title=decodeURIComponent(L),_||(_=s);let c=null;const d=r&&n&&t>0;d&&(c=b.getFileBufferRange(i,{start:0,end:1024}));const l=Le(),m=(await l).buffer?l:Pe(U,d,s.origin);window.addEventListener("message",Oe(U,m,c,o)),setTimeout(Ve,25e3),(()=>{try{E&&(e=E,e?.includes("acrobatPromotionSource"))&&re(`DCBrowserExt:Viewer:ExtnViewerPdfOpened:${ee(new URL(E)?.search,"acrobatPromotionSource")}`)}catch(e){}var e})()}catch(e){fe("InitScript failed",e),ae()}};function He(){if(a.getItem("signInAction")){const e=a.getItem("signInAction");U._sendMessage({type:"signInInformation",action:e,source:"signIn"===e?a.getItem("signInSource"):a.getItem("signUpSource")},_.origin),a.removeItem("signInSource"),a.removeItem("signUpSource"),a.removeItem("signInAction")}}async function We(){chrome.storage.onChanged.addListener(((t,a)=>{"local"===a&&Object.entries(t).forEach((([t,{newValue:a}])=>{switch(t){case"theme":U._sendMessage({type:"themeChange",theme:a},_.origin);break;case"ANALYTICS_OPT_IN_ADMIN":{const t="false"!==e.getItem("logAnalytics"),n="false"!==a;U._sendMessage({type:"analyticsTrackingChange",value:t&&n},_.origin);break}case"saveLocation":U._sendMessage({type:"changeSaveLocationPreference",saveLocation:a},_.origin);break;case"isDarkPageThemeEnabled":U._sendMessage({type:"darkPageThemeChange",isDarkPageThemeEnabled:a},_.origin);break;case"egaf":U._sendMessage({type:"enableGenAIFeaturesToggled",enableGenAIFeatures:a},_.origin);break;case"akamai":Q({main_op:"reRegisterUninstallUrl"})}}))})),await async function(){return S=await i.isInstalledViaUpsell(),S}(),U._sendMessage({type:"setAsyncStorage",storage:e.getItem("viewerStorageAsync")},_.origin),Q({main_op:"viewer-startup",url:E,startup_time:Date.now(),viewer:!0},(e=>{ge.isSharePointURL=!!e.isSharePointURL,ge.isSharePointFeatureEnabled=!!e.isSharePointEnabled,ge.isFrictionlessEnabled=!!e.isFrictionlessEnabled,ge.featureFlags=e.featureFlags,ge.isFillAndSignRegisteryEnabled=e.isFillnSignEnabled;const t=ie().href;U.sendStartupConfigs(t,_.origin)})),Q({main_op:"get-features&groups",cachePurge:"LAZY"},(e=>{U._sendMessage({type:"featureGroups",featureGroups:e.featureGroups,featureFlags:e.featureFlags,ffResponse:e.ffResponse},_.origin)})),A?setTimeout((()=>be("loadedTabsInfo",M)),2e3):Q({main_op:"updateLoadedTabsInfo"}),H.writeAndSyncWithHistory(E,{filename:L,lastVisited:Date.now()})}function Ge(e){Q({main_op:"caret_mode_toggle_handler",toggleCaretModeValue:e})}function je(t){switch(t.panel_op&&!0===t.reload_in_native&&(delete t.is_viewer,chrome.tabs.reload(t.tabId)),t.content_op){case"showLocalFileAccessToast":t.tabId&&t.tabId!==e.getItem("lastOpenTabId")||U._sendMessage({type:"showLocalFileAccessToast"},_.origin);break;case"rapidRenditionResponse":U._sendMessage({type:"rapidRenditionResponse",pageRendition:t.pageRendition,perfMarker:t.perfMarker},_.origin);break;case"rapidRenditionError":U._sendMessage({type:"rapidRenditionError",error:t.error},_.origin)}switch(t.main_op){case"relay_to_content":if("dismiss"===t.content_op){delete t.content_op,delete t.reload_in_native;let e=document.getElementById("__acrobatDialog__");return void(e&&(e.remove(),e=null))}"caret_mode_toggle_handler"===t.content_op&&U._sendMessage({type:"toggleCaretMode",toggleCaretModeValue:t.status},_.origin);break;case"reset":U._sendMessage({type:"toggleAnalytics",logAnalytics:t.analytics_on},_.origin);break;case"showUninstallPopUp":U._sendMessage({type:"showUninstallPopUp"},_.origin);break;case"jumpUrlSuccess":(!A||t.tabInfo&&t.tabInfo.includes(M))&&U._sendMessage({type:"adobeYoloJumpUrlSuccess"},_.origin);break;case"triggerBufferSave":U._sendMessage({type:"triggerBufferSave"},_.origin);break;case"downloadFileSuccess":U._sendMessage({type:"downloadFileSuccess"},_.origin)}return!1}function ze(){const t=e.getItem("userState");let a=!1;if(void 0!==t?.rvu&&(a=!0),!0!==t.rvu){const t={rvu:a};e.setItem("userState",t)}}document.addEventListener("DOMContentLoaded",function(e){const t=(new Date).getTime();let a=window.setInterval((function(){(function(){const e=document.getElementById("dc-view-frame");return e&&e.contentWindow&&1===e.contentWindow.length}()||(new Date).getTime()-t>15e3)&&(window.clearInterval(a),e.call(this))}),200)}((function(){const e=document.getElementById("dc-view-frame");e&&e.contentWindow&&e.contentWindow.focus()}))),void 0!==chrome.runtime&&(H=new h,i.isMimeHandlerAvailable().then((async function(t){if(chrome.runtime.onMessage.addListener(je),t){if(A=!0,!window.navigator.onLine&&e.getItem("offlineSupportDisable"))return void ae();e.getItem("sessionStarted")||(e.setItem("sessionId",n.uuid()),e.setItem("sessionStarted",!0));const t=await i.getStreamInfo()||{};N=new f(t.responseHeaders),M=t.tabId;let a=await Q({main_op:"check-is-google-print"});x=a&&a.isGooglePrint,V=await i.caretModeStatus(),i.addCaretModeListener(Ge),Q({main_op:"viewer-preview",startup_time:Date.now(),viewer:!0},(()=>Ne(t)));const r=N.getHeaderValue("content-length"),o=N.getHeaderValue("accept-ranges"),s=o&&"bytes"===o.toLowerCase();r>0&&s&&Q({main_op:"setupWorkerOffscreen",pdfURL:t.originalUrl,pdfSize:+r,acceptRanges:s});e.getItem("firstOpenedTabId")||e.setItem("firstOpenedTabId",M)}else te(),$e(),We()})))}();