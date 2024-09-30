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
import{util as t}from"../js/content-util.js";import{dcLocalStorage as e}from"../../common/local-storage.js";import{LOCAL_FILE_PERMISSION_URL as n,LOCAL_FTE_WINDOW as o,COOLDOWN_FOR_DOWNLOAD_BANNER as s}from"../../common/constant.js";import{events as c}from"../../common/analytics.js";$(document).ready((()=>{t.translateElements(".translate"),$("#turnOnButton").click((()=>{e.setWithTTL("downloadBanner",!0,s),t.sendAnalytics(c.DOWNLOAD_BANNER_TURN_ON_CLICKED),chrome.tabs.query({active:!0,currentWindow:!0},(function(t){const s=t[0];e.setItem("lastOpenTabId",s.id),chrome.windows.get(s.windowId,(function(t){const{height:c}=o,i=Math.round(1.2*o.width),a=Math.round(.5*(t.height-c)+t.top),d=Math.round(.5*(t.width-i)+t.left);chrome.windows.create({height:c,width:i,left:d,top:a,focused:!0,type:"popup",url:n},(t=>{e.setItem("settingsWindow",t)})),chrome.tabs.sendMessage(s.id,{content_op:"dismiss",downloadBanner:!0})}))}))})),$("#tripleDotMenu").click((()=>{const e=document.getElementById("menuList");e.style.display&&"none"!==e.style.display?e.style.display="none":(t.sendAnalytics(c.DOWNLOAD_BANNER_MENU_SHOWN),e.style.top=$("#tripleDotMenu").offset().top-110+"px",e.style.display="block")})),$("#closeButton").click((()=>{t.sendAnalytics(c.DOWNLOAD_BANNER_CLOSE_CLICKED),chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0]?.id,{content_op:"dismiss",downloadBanner:!0})}))})),$("#doNotShowButton").click((()=>{t.sendAnalytics(c.DOWNLOAD_BANNER_DONT_SHOW_AGAIN_CLICKED),chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0]?.id,{content_op:"dismiss",downloadBanner:!0});const n=e.getItem("downloadBannerData")||{};n.doNotShow=!0,e.setItem("downloadBannerData",n)}))})),$("#closeSuccessToast").click((()=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0]?.id,{content_op:"dismiss",downloadBanner:!0})}))}))}));