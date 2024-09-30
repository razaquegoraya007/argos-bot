'use strict';_={_:" Generate synthetic keystrokes, button clicks, wheel <br> turns and mouse movements. <br>\n The synthetic input will be sent to the <c h=/focWin>focused window</c> <br> whether it's a Chrome window or not.\n ",seq:" Enter any sequence of keys, buttons, wheels and mouse motions. <br> They will be sent to the <c h=/focWin>focused window</c>\n in the specified order (left <br> to right). Joystick buttons are not supported. <hr b=2>\n When done, <u>click outside</u> the yellow box. <hr b=2>\n While the yellow box is visible, you can quickly remove elements <br> with a <u>right click</u> on each element. <hr b=2>\n To enter a left mouse button, click inside the yellow box while the <br> mouse cursor is a cross.\n <{MORE}> <hr b=2>\n Use the <b>Keyboard</b> and <b>Mouse</b> menus to enter keys and buttons <br> that are not present on your devices. <hr b=2>\n You can add pauses in any part of the input sequence. Click on <br> <b>Advanced options</b> to choose whether other actions should be <br>\n delayed or not when a synthetic-input action takes too long. <hr b=2>\n Remember to <u>release all keys and buttons</u> that are pressed during <br> your input sequence.\n Otherwise those keys or buttons will remain <br> in their pressed state until you physically release them.\n ",
tms:" How many times to send the synthetic input. <br> This multiplier is for the whole input sequence. <br>\n Individual keys and buttons have their own <br> separate multiplier.\n ",qeu:" A synthetic-input action may take some time to complete if <br> it contains pauses or long repetitions.\n For those cases, you <br> can choose what actions will have to wait until this action <br> finishes. <hr b=2>\n \n <b>All actions:</b> All AutoControl actions will be delayed until this <br> synthetic-input action finishes.\n During this wait period, your <br> shortcuts will not respond immediately.\n Hence, if this action <br> takes too long, you should choose <u>Group only</u>. <hr b=2>\n \n <b>Group only:</b> Only synthetic-input actions in the same group <br> will be delayed.\n This allows for synthetic-input of different <br> groups to run in parallel.\n \n \x3c!--b>None:</b> No actions will wait for the input sequence to finish. This <br> option allows two or more synthetic-input actions to run in parallel.--\x3e\n \x3c!-- TODO: include link to page with examples of joystick buttons mapped to keyboard keys with auto-repeat --\x3e\n ",
grp:" The action group has two uses. <hr b>\n <b>First:</b> <br>\n Synthetic-input actions of different groups can run in <br> parallel if you set <u>Postpone actions</u> to <u blu>Group only</u>.\n Whereas <br> actions in the same group will always run sequentially. <hr b>\n <b>Second:</b> <br>\n This group can be used by the <act xsml inln>Stop synth input</act> advanced <br> action to stop synthetic-input actions of a specific group.\n ",kms:" Combine the synthetic sequence with the current state of <br> the modifier keys (<key>Ctrl</key>, <key>Shift</key>, <key>Alt</key>, <key>Win</key>). <hr b=3>\n For example, if the synthetic sequence is <key>A</key>, <key>B</key> and you <br> are holding down <key>Ctrl</key> while that sequence is injected, <br>\n the <c h=/focWin>focused window</c> will see <key>Ctrl</key>+<key>A</key>, <key>Ctrl</key>+<key>B</key>. <hr b=3>\n If this option is unchecked, the focused window will see <br> the synthetic sequence exactly as specified above, even if <br> you are holding down modifier keys.\n ",
ipg:" By default, keystrokes are sent to the <c h=/focWin>focused window</c>, and then the window relays <br> them to the webpage. <br>\n With this option you can bypass the window and send the keystrokes directly to <br> the webpage.\n Doing this has the following benefits and limitations. <hr b=2>\n \n <b>Benefits:</b> <hr b>\n <it></it><c ib>\n By bypassing the browser window, the keystrokes won't trigger the browser's <br> native keyboard shortcuts. <br>\n For example, sending a synthetic <c hl0=\"\">Ctrl+F</c> to a Chrome  window would open the <br>\n search box, but not if those keystrokes are sent from the inside of the webpage.\n \x3c!--Synthetic input sent by AutoControl does not trigger AutoControl's own shortcuts. <hr b=2> --\x3e\n </c> <hr b=2>\n <{MORE}>\n <it></it><c ib>\n Keystrokes can be sent to one or more tabs simultaneously, even if those tabs <br> are unfocused, hidden or minimized.\n </c> <hr b=3>\n \n <b>Limitations:</b> <hr b>\n <it></it><c ib>Sending keystrokes from the inside won't fill text boxes. It will only trigger <br> shortcuts defined by the webpage.</c> <hr b>\n <it></it>It supports <u>keystrokes only</u>. Synthetic mouse input won't work. <hr b>\n <it></it>It does not work on <c h=/protPg>protected pages</c>. <hr b>\n <it></it>It's not supported on Windows XP and Vista. <hr b=4>\n \n On the other hand, sending keystrokes from the outside has none of these benefits <br> and none of these limitations.\n ",
act:" ",hld:" Add a short pause after pressing, releasing or <br> turning a key/button/wheel. <hr b>\n When the action is <b u>Press & Release</b>, the pause is <br> between the press and the release, i.e. it's a <br> hold-down interval.\n <{MORE}> <hr b=2>\n Keep in mind, though, that a synthetic hold-down <br> will not make the key to auto-repeat like physical <br> hold-downs do.\n To achieve that, use the <u b>Times</u> <br> multiplier.\n ",rpt:" How many times to repeat the action (with pause <br> included). <br> For example, if the action is <b u>Press</b> and the pause <br>\n is <b u>0.1</b>, then repeating it 10 times will result in 10 <br> key presses over 1 second.\n ",
xy:" Coordinates at which the mouse action (click or wheel turn) <br> will be performed or where the mouse cursor will be moved. <hr b=2>\n <u>Positive numbers</u> move the coordinates to the <u>right/down</u> <br> of the reference point. <br>\n <u>Negative numbers</u> move the coordinates to the <u>left/up</u>.\n ",wrt:" The X,Y coordinates can be relative to: <hr b>\n <b>Mouse:</b> The current mouse position. <hr b=2>\n <b>Window:</b> The content of the <c h=/focWin>focused window</c>. For browser <br> windows, the content is the visible part of the webpage. <hr b=2>\n <b>Monitor:</b> The monitor where the focused window is. If you <br> have only one monitor, this is the same as <u>Desktop</u>. <hr b=2>\n <b>Desktop:</b> A rectangle covering all your monitors.\n ",
wrtHV:" Select which corner or middle point of the <br> \"<u blk blr>Relative to</u>\" rectangle must be used as a <br>\n reference point for the X,Y coordinates. <hr b=2>\n <b>Example:</b> <hr b>\n Coordinates <c blu hl0>100</c>,<c blu hl0>-50</c> relative to <c blu hl0>Monitor</c>, <br> <c blu hl0>Center-Bottom</c> gives you an\n <b>X</b> of 100 pixels <br> to the right of the monitor's center and a <b>Y</b> of <br> 50 pixels above the monitor's bottom edge.\n ",ani:" Move the mouse smoothly to the new <br> position in the given amount of seconds. <br> Set to zero for an instantaneous jump.",
noBl:" Whether to allow other mouse movements <br> while the smooth transition is taking place."};
