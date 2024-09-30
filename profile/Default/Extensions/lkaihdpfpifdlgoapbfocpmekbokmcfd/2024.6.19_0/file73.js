'use strict';_tt.menuSpec={mruTabsCurrWin:{name:"MRU tabs, current window",help:"cwMru",value:{type:"TSE",content:"currWinTabsMruOrder",commonOptions:{layout:_xs("C"),itemsDistrib:["perGroup",20]},rootOptions:{position:"window",alignHorz:_bw,alignVert:_u,menuSystem:"simple"}}},mruTabsCurrWinThumbs:{name:"MRU tabs, curr. win., with thumbs.",help:"cwMruT",value:{type:"TSE",content:"currWinTabsMruOrder",commonOptions:{layout:_xs("R"),itemsDistrib:["auto"],centerGroups:!0,thumbSize:_Ha,maxItems:20},rootOptions:{position:"window",
alignHorz:_bw,alignVert:_u,menuSystem:"simple"}}},mruTabsAllWins:{name:"MRU tabs, all windows",help:"awMru",value:{type:"TSE",content:"allTabsMruOrder",commonOptions:{layout:_xs("C"),itemsDistrib:["perGroup",20]},rootOptions:{position:"window",alignHorz:_bw,alignVert:_u,menuSystem:"simple"}}},mruTabsAllWinsThumbs:{name:"MRU tabs, all wins., with thumbs.",help:"awMruT",value:{type:"TSE",content:"allTabsMruOrder",commonOptions:{layout:_xs("R"),itemsDistrib:["auto"],centerGroups:!0,thumbSize:_Ha,maxItems:20},
rootOptions:{position:"window",alignHorz:_bw,alignVert:_u,menuSystem:"simple"}}},closedTabs:{name:"Closed tabs",help:"clsd",perms:"ses",value:{type:"closedTabs",commonOptions:{layout:_xs("C")}}},closedTabsThumbs:{name:"Closed tabs with thumbnails",help:"clsdT",perms:"ses",value:{type:"closedTabs",commonOptions:{layout:_xs("R"),itemsDistrib:["auto"],centerGroups:!0,thumbSize:_Ha,maxItems:20},rootOptions:{position:"window",alignHorz:_bw,alignVert:_u,menuSystem:"simple"}}},bookmarksTree:{name:"Bookmarks",
help:"bkm",perms:"bkm",value:{type:"custom",content:[{type:"bmFolder",content:1},{type:"bmFolder",content:2,sepLine:!0,subMenu:!0}],commonOptions:{layout:_xs("C")}}}};
{const a={borderWidth:2,paddingHorz:4,paddingVert:4,margin:1};_tt.menuStyle={std:{name:"Standard",value:{itemMaxWidth:300}},light:{name:"Light",value:{bgColor:4043309055,itemStates:[a.sc().add({bgColor:0,txtColor:4261412864,borderColor:0}),a.sc().add({bgColor:4283205620,txtColor:4294967295,borderColor:0}),a.sc().add({bgColor:0,txtColor:4261412864,borderColor:4278190080}),a.sc().add({bgColor:4283205620,txtColor:4294967295,borderColor:4278190080})],itemMaxWidth:300}},dark:{name:"Dark",value:{bgColor:4030742592,
itemStates:[a.sc().add({bgColor:0,txtColor:4294967295,borderColor:0}),a.sc().add({bgColor:4278190080,txtColor:4294967295,borderColor:0}),a.sc().add({bgColor:0,txtColor:4294967295,borderColor:4294967295}),a.sc().add({bgColor:4278190080,txtColor:4294967295,borderColor:4294967295})],itemMaxWidth:300}}}}let _Gj={},_jt={};function _Hs(a){if(!a)return 0;let [,b]=_Yf(a);return b?+b:-(Object.keys(_tt.menuSpec).indexOf(a)+1)};
