'use strict';_={desc:" Menu items can be selected manually with the mouse/keyboard or by using the <br> <act xsml inln>Select menu item</act> action. <hr b=2>\n <{mode1}> <{MORE}> <hr b=4> <{mode2}>\n ",desc2:" The action that's performed when a menu item is selected depends on the selection <br> method used. <hr b>\n <{mode1}> <{MORE}> <hr b=4> <{mode2}>\n ",mode1:" There are 3 methods of selecting an item, as follows: <{trigTabl}>\n ",mode2:" Each selection method performs a different action, depending on the type of item being <br> selected: <{actTabl}>\n ",
trigTabl:" <hr b=2>\n <table selMode inp>\n <tr><td cap>Method: <th>Normal <th>Secondary 1 <th>Secondary 2\n <tr><td rowspan=3 cap>Triggers:\n <td inp> <mb>Left click</mb> <td inp> <key>Ctrl/Shift</key>+<mb>Left click</mb> <td inp><key>Ctrl</key>+<key>Shift</key>+<mb>Left click</mb>\n <tr><td inp> <key>Enter</key> <td inp> <key>Ctrl/Shift</key>+<key>Enter</key> <td inp><key>Ctrl</key>+<key>Shift</key>+<key>Enter</key>\n <tr><td inp> <td inp> <mb>Middle click</mb> <td inp> <key>Ctrl/Shift</key>+<mb>Middle click</mb>\n <tr> \n </table>\n ",
actTabl:' <hr b=2>\n <table selMode act helpCtx="@/types">\n <tr><td cap>Item type <th>Normal <th>Secondary 1 <th>Secondary 2\n <tr><td><c h=tab>Tab</c> <td>Activate <td>Activate <td>Close\n <tr><td><c h=tbGrp>Tab submenu</c> <td na>(no action) <td na>(no action) <td>Close all\n <tr><td><c h=cTab>Closed tab</c> <td>Reopen <td>Reopen <td na>(no action)\n <tr><td><c h=cWin>Closed window</c> <td na>(no action) <td>Reopen <td>Reopen\n <tr><td><c h=bmrk>Bookmark</c> <td>Open in<br>current tab <td>Open in new<br><u>inactive</u> tab <td>Open in new<br><u>active</u> tab\n <tr><td><c h=bmFld>Bookmark folder</c> <td na>(no action) <td>Open all in new<br>inactive tabs <td>Open all in new<br>inactive tabs\n <tr><td><c h=act>Action</c> <td>Execute <td>Execute <td na>(no action)\n <tr><td><c h=swt>Switch</c> <td>Toggle <td>Toggle <td na>(no action)\n </table>\n ',
types:{aux:" Example of",tab:" <{aux}> <{../types0/tab}>",tbGrp:" <{aux}> <{../types0/tbGrp}>",cTab:" <{aux}> <{../types0/cTab}>",cWin:" <{aux}> <{../types0/cWin}>",bmrk:" <{aux}> <{../types0/bmrk}>",bmFld:" <{aux}> <{../types0/bmFld}>",act:" <{aux}> <{../types0/act}>",swt:" <{aux}> <{../types0/swt}>"},types0:{aux:" item in an <br> <c h=/actions/menu>AutoControl menu</c>. <br>",tab:' a <b>tab</b> <{aux}> <guiElems menu><img><rect style="left: 140px;top: 28px;width: 131px;height: 27px"></rect></guiElems>',
tbGrp:' a <b>tab submenu</b> <{aux}> <guiElems menu><img><rect style="left: 140px;top: 1px;width: 131px;height: 28px"></rect></guiElems>',cTab:' a <b>closed tab</b> <{aux}> <guiElems menu><img><rect style="left: 140px;top: 69px;width: 103px;height: 27px"></rect></guiElems>',cWin:' a <b>closed window</b> <{aux}> <guiElems menu><img><rect style="left: 140px;top: 95px;width: 103px;height: 28px"></rect></guiElems>',bmrk:' a <b>bookmark</b> <{aux}> <guiElems menu><img>\n <rect style="left: 141px;top: 146px;width: 119px;height: 27px"></rect>\n <rect style="left: 141px;top: 175px;width: 119px;height: 26px"></rect>\n </guiElems>',
bmFld:' a <b>bookmark folder</b> <{aux}> <guiElems menu><img><rect style="left: 2px;top: 141px;width: 139px;height: 34px"></rect></guiElems>',act:' an <b>action</b> <{aux}> <guiElems menu><img><rect style="left: 2px;top: 104px;width: 139px;height: 34px"></rect></guiElems>',swt:' a <b><c h=/switch>SWITCH</c></b> <{aux}> <guiElems menu><img><rect style="left: 2px;top: 178px;width: 139px;height: 34px"></rect></guiElems>'},selTypes:{mrkd:" The marked item is the one with the <c h=@/itMrk>item mark</c>.",
hltd:" The item that gets a different background color when <br> navigating the menu with the arrow keys or the mouse.",hvrd:" The item being hovered over by the mouse. This is <br> not necessarily the same as the highlighted item.\n <{MORE}> <hr b> It's possible to perform mouse gestures over menu items. If you <br> do, the hovered item will be obtained\n from the gesture's starting <br> point instead of the mouse's current point.\n i.e. you must begin the <br> gesture over the desired menu item, but you can end the gesture <br> anywhere.\n See <a href=\"<{/URLS/hvrGest}>\">this page</a> for an example.\n "},
itMrk:" <img src=res/menuItemMark.gif right>\n The <b>item mark</b> is a border around <br> an item, shown in blue here. <hr b>\n It indicates the item you want to <br> select.\n "};
