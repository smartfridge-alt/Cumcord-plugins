(function(r){"use strict";let s,i,t={},n={},l={},a;function d(){if(console.log("refresh count"),t=r.webpackModules.findByProps("guildSeparator"),n=r.webpackModules.findByProps("modeSelectable"),l=r.webpackModules.findByProps("keybind"),a=r.webpackModules.findByProps("getGuilds"),!t)return;const c=Object.keys(a.getGuilds()).length;let e=document.getElementById("cc_server_count");if(e){e.innerHTML=c+" Servers";return}const o=document.querySelector(`.${t.guildSeparator}`);if(o){e=document.createElement("div"),e.className=`${n?n.description+" ":""}${t.listItem} ${l.keybind}`,e.innerHTML=c+" Servers",e.id="cc_server_count";try{o.parentElement.parentElement.insertBefore(e,o.parentElement)}catch(m){console.error(m)}}}var u=c=>({onLoad(){s=window.cumcord.patcher.injectCSS(`
        div#cc_server_count {
            text-align: center;
            font-family: var(--font-primary);
        }
        `),i=setInterval(function(){d()},3e4),d()},onUnload(){try{s(),clearInterval(i),document.getElementById("cc_server_count").remove()}catch(e){console.error(`FAILED TO DETACH SERVER COUNTER: ${e}`)}}});return u})(cumcord.modules);
