import { webpackModules } from "@cumcord/modules";
import { injectCSS } from "@cumcord/patcher";
let css;
let timer;
let sep = {},
  ms = {},
  kb = {},
  gg;
function refreshCount() {
  console.log("refresh count");
  sep = webpackModules.findByProps("guildSeparator");
  ms = webpackModules.findByProps("modeSelectable");
  kb = webpackModules.findByProps("keybind");
  gg = webpackModules.findByProps("getGuilds");
  if (!sep) return;
  const num = Object.keys(gg.getGuilds()).length;
  let guildCount = document.getElementById("cc_server_count");
  if (guildCount) {
    guildCount.innerHTML = num + " Servers";
    return;
  }
  const separator = document.querySelector(`.${sep.guildSeparator}`);
  if (separator) {
    guildCount = document.createElement("div");
    guildCount.className = `${ms ? ms.description + " " : ""}${sep.listItem} ${
      kb.keybind
    }`;
    guildCount.innerHTML = num + " Servers";
    guildCount.id = "cc_server_count";
    try {
      separator.parentElement.parentElement.insertBefore(
        guildCount,
        separator.parentElement
      );
    } catch (err) {
      console.error(err);
    }
  }
  return;
}
export default (data) => {
  return {
  onLoad() {
    css = injectCSS(`
        div#cc_server_count {
            text-align: center;
            font-family: var(--font-primary);
        }
        `);
    timer = setInterval(function () {
      refreshCount();
    }, 30000);

    refreshCount();
  },
  onUnload() {
    try {
      css();
      clearInterval(timer);
      document.getElementById("cc_server_count").remove();
    } catch (e) {
      console.error(`FAILED TO DETACH SERVER COUNTER: ${e}`);
    }
  },
}};
