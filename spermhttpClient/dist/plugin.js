(function(){"use strict";var a,t;async function e(o){await cumcord.plugins.importPlugin("http://localhost:"+o+"/"),a=!0,t=o,setInterval(n,1e3)}async function n(){if(a){var o=JSON.parse(await(await fetch("http://localhost:"+t+"/reload.json")).text()).reload;o&&(console.log("spermhttpClient: Reloading..."),await cumcord.plugins.removePlugin("http://localhost:"+t+"/"),await cumcord.plugins.importPlugin("http://localhost:"+t+"/"))}}function l(){a=!1}window.spermhttpClient={setDevCode:e,disableDevMode:l};var i=o=>({onLoad(){console.log("spermhttpClient: Started.")},async onUnload(){a=!1,await cumcord.plugins.removePlugin("http://localhost:"+t+"/")}});return i})();
