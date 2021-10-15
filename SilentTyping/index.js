import { webpackModules } from "@cumcord/modules";
let mod;
let orig;
export default (data) => {
  return {
    onLoad() {
    mod = webpackModules.findByProps('startTyping');
    orig = mod.startTyping;

    mod.startTyping = () => {};
  },
  onUnload() {
    webpackModules.findByProps('startTyping').startTyping = orig;
  }
}};
