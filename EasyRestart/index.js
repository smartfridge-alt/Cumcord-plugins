
let keydownHandler;


export default (data) => {
  return {
  onLoad() {
    function restartDiscord() {
        if (window.DiscordNative) {
            window.DiscordNative.app.relaunch();
        } else {
            window.location.reload()
        }
    }
    async function CreateModal() {
    try{ 
      cumcord.ui.modals.showConfirmationModal({header: "EasyRestart", content: "Are you sure you want to restart Discord? This will completely terminate Discord and start the updater (reload on web).", confirmText: "Restart", type: "danger"}, (confirmed) => {restartDiscord()})
    } catch (e) {
        console.error(e);
    }
    }
    window.EasyRestart = {
        CreateModal: CreateModal
    }
    keydownHandler = async (event) => {
        if (event.code == "F4") {
          event.preventDefault();
          CreateModal();
        }
      };
      document.addEventListener("keydown", keydownHandler);
  },
  onUnload() {
    keydownHandler = async (event) => {
        if (event.code == "F4") {
          event.preventDefault();
          CreateModal();
        }
      };
    document.removeEventListener("keydown", keydownHandler);
  }}}
