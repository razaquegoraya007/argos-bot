'use strict';var _4f={ding:{name:"Ding",cos:[0,1],sin:[0,0],dfltFreq:400,dfltLen:.7,freq:[],gain:[[.01,0],[1,.01],[.01,1]]},pureWave:{name:"Pure tone",cos:[0,1],sin:[0,0],dfltFreq:440,dfltLen:.2,freq:[],gain:[[.01,0],[1,.01],[1,.99],[.01,1]]},harmMulti:{name:"Harmonic multitone",cos:[0,.1,.1,.1,.1,0,.1,0,0,.1,0,0,0,0,.1,0,0,.1],sin:[0,0,.1,0,.1,0,.1,0,.1,0,.1,0,.1,0,.1,0,0,0],dfltFreq:440,dfltLen:.4,freq:[],gain:[[.01,0],[1,.01],[1,.99],[.01,1]],freqScale:f=>Math.pow(2,f/1800)*f/12},synthStr:{name:"Synthetic string",
cos:[0,.1,0,.1,0,.1,0,.1,0,.1,0,.1,0,.1,0,.1,0,.1,0,.1],sin:[0,0,.1,0,.1,0,.1,0,.1,0,.1,0,.1,0,.1,0,.1,0,.1,0],dfltFreq:370,dfltLen:.7,freq:[],gain:[[.01,0],[1,.01],[.01,1]],freqScale:f=>Math.pow(2,f/700)*f/16},chirp:{name:"Chirp",cos:[0,1],sin:[0,0],dfltFreq:750,dfltLen:.05,freq:[[1,0],[5,.5],[1,1]],gain:[[1,.95],[.01,1]]},pling:{name:"Pling",cos:[0,1],sin:[0,0],dfltFreq:440,dfltLen:.1,freq:[[.02,0],[1,.04],[1.76,.25]],gain:[[.01,0],[1,.02],[1,.6],[.01,1]]},beat:{name:"Beat",cos:[0,1],sin:[0,0],
dfltFreq:500,dfltLen:.3,freq:[[1,0],[.06,1]],gain:[[.01,0],[1,.01],[.01,1]]},laser:{name:"Laser",cos:[0,.4,.3,.2,.1,0,0,0,0,.3,0,0,0,0],sin:[0,0,0,0,0,0,0,0,0,0,0,0,0,0],dfltFreq:1500,dfltLen:.4,freq:[[.1,0],[8,.04],[.4,.45],[.06,1]],gain:[[.01,0],[1,.02],[1,.5],[.2,1]],freqScale:f=>{f=Math.max(1,f-80);return Math.pow(2.1,Math.pow(f,.93)/250)*Math.pow(f,.9)/16}},bleep:{file:"/res/bleep.mp3",name:"Bleep"},sweep:{file:"/res/sweep.mp3",name:"Sweep"},tap:{file:"/res/tap.mp3",name:"Tap"},click:{file:"/res/click.mp3",
name:"Click"},key:{file:"/res/key.mp3",name:"Keystroke"}};
{let f=[],p={},h;var _qh=_ug(function*(a,e,b){"intrrp"==a.mode&&(h&&(h.close(),h=null),speechSynthesis.cancel(),f.length=0,p={});let d=_ng(p,b,[]);d.push([a,e]);if(1==d.length){if("enque"==a.mode?f.push(b):f.push(r(b)),1==f.length)for(;f.length;)f[0]instanceof Promise?yield f[0]:yield r(f[0]),f.shift()}else d.currWait&&2==d.length&&"enque"!=a.mode&&d.currWait.fulfill("advance")});let r=a=>new Promise(_ug(function*(e){let b=p[a],d;for(;b.length;){b[0]=t(...b[0]);d&&(b[0]=Promise.all([d,b[0]]),d=null);
let c=!b[1]||"enque"==b[1][0].mode,g;c&&(g=yield Promise.race([b[0],b.currWait=u()]));c&&"advance"!=g||(d=b[0]);b.shift()}e()})),u=function(){let a;return(new Promise(e=>a=e)).add({fulfill:a})},t=(a,e)=>"voice"==a.type?v(a,e):w(a),v=(a,e)=>new Promise(_ug(function*(b){var d=_Yr(a.text||""),c="";let g=a.usesTabs?_Ga(e):[0];for(let l of g)c+=(yield _xd(0,_Pt,d,_ts[l])).join("\n");c=c.trim();if(!c)return b();d=(yield _if()).filter(l=>(l.lang||navigator.language).startsWith(a.lang));(d=d[a.voice]||d[0])&&
d.localService&&(c=c.replace(/</g,"&lt;"));c=new SpeechSynthesisUtterance(c);c.voice=d;c.lang=d?d.lang:navigator.language;c.rate=a.rate/100;c.pitch=a.pitch/5;c.volume=a.vol/100;c.onend=b;c.onerror=b;speechSynthesis.speak(c)})),n,q={},w=a=>new Promise(_ug(function*(e){h||(h=new AudioContext,n=0);if(a.evtAlias)var b=yield _Ba._ky(_hg,a.evtAlias);else if(a.sndId){var d=_4f[a.sndId]||{};b=d.file}else b=a.file;if(b){if(!q[b]){if(a.sndId)var c=yield _c(b,"arraybuffer");else d=yield _tj(b),c=d.content&&
_Pi(d.content);c&&(q[b]=yield l=>h.decodeAudioData(c,l,()=>l()))}d=q[b]}if(d){a=a.sc();a.vol/=100;a.gap/=100;a.lenP&&(a.len=d.duration*a.lenP/100);d.freqScale&&(a.freq=d.freqScale(a.freq));for(b=0;b<(a.times||1);++b)var g=x(d,a,!b);g.onended=e}else e()})),x=(a,e,b)=>{let d=a instanceof AudioBuffer,c;d?(c=h.createBufferSource(),c.buffer=a,c.playbackRate.value=a.duration/e.len):(c=h.createOscillator(),c.type="sine",c.frequency.value=e.freq,c.setPeriodicWave(h.createPeriodicWave(new Float32Array(a.cos),
new Float32Array(a.sin),{disableNormalization:!0})));var g=h.createGain();g.gain.value=e.vol;g=c.connect(g);if(!d){var l=h.createGain();g=g.connect(l)}if("L"==e.bal||"R"==e.bal){let m=h.createStereoPanner();m.channelCount=1;m.pan.value="R"==e.bal?1:-1;g=g.connect(m)}else if("LR"==e.bal||"RL"==e.bal){var k=h.createPanner();k.panningModel="HRTF";k.coneOuterGain=1;k.positionY.value=0;g=g.connect(k)}g.connect(h.destination);g=h.currentTime+.005;b=b?g:Math.max(g,n+e.gap*e.len);if(!d){for(let m of a.freq)c.frequency.exponentialRampToValueAtTime(e.freq*
m[0],b+m[1]*e.len);for(let m of a.gain)l.gain.exponentialRampToValueAtTime(m[0],b+m[1]*e.len)}k&&(a=.7*("LR"==e.bal?1:-1),k.positionX.value=-a,k.positionX.setValueAtTime(-a,b),k.positionX.linearRampToValueAtTime(a,b+e.len),k.positionZ.value=-.1,k.positionZ.setValueAtTime(-.1,b),k.positionZ.linearRampToValueAtTime(-.3,b+.5*e.len),k.positionZ.linearRampToValueAtTime(-.1,b+e.len));c.start(b);n=b+e.len;c.stop(n);return c}};
