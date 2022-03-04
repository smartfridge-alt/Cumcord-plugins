var devMode;
var port;
async function setDevCode(code) {
  await cumcord.plugins.importPlugin("http://localhost:" + code + "/");
  devMode = true;
  port = code;
  setInterval(checkForUpdates, 1000);
}
async function checkForUpdates() {
  if (devMode) {
    var shouldReload = JSON.parse(
      await (await fetch("http://localhost:" + port + "/reload.json")).text()
    )["reload"];
    if (shouldReload) {
      console.log("spermhttpClient: Reloading...");
      await cumcord.plugins.removePlugin("http://localhost:" + port + "/");
      await cumcord.plugins.importPlugin("http://localhost:" + port + "/");
    }
  }
}
function disableDevMode() {
  devMode = false;
}
window.spermhttpClient = {
  setDevCode,
  disableDevMode,
};
export default (data) => {
  return {
    onLoad() {
      console.log("spermhttpClient: Started.");
    },
    async onUnload() {
        devMode = false;
        await cumcord.plugins.removePlugin("http://localhost:" + port + "/");
    },
  };
};
