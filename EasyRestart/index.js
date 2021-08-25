import { webpackModules } from "@cumcord/modules";
let keydownHandler;
function showConfirmationModal(title, content, options = {}) {
    const ModalActions = webpackModules.findByProps('openModal', 'updateModal');
    const Markdown = webpackModules.findByDisplayName('Markdown');
    const ConfirmationModal = webpackModules.findByDisplayName('ConfirmModal');
    if (!ModalActions || !ConfirmationModal || !Markdown) return window.alert(content);

    const emptyFunction = () => {};
    const {onConfirm = emptyFunction, onCancel = emptyFunction, confirmText = 'Okay', cancelText = 'Cancel', danger = false, key = undefined} = options;

    if (!Array.isArray(content)) content = [content];
    content = content.map(c => typeof(c) === 'string' ? webpackModules.findByProps('createElement').createElement(Markdown, null, c) : c);
    return ModalActions.openModal(props => {
        return webpackModules.findByProps('createElement').createElement(ConfirmationModal, Object.assign({
            header: title,
            red: danger,
            confirmText: confirmText,
            cancelText: cancelText,
            onConfirm: onConfirm,
            onCancel: onCancel
        }, props), content);
    }, {modalKey: key});
}

export default {
  onLoad() {
    function restartDiscord() {
        if (window.DiscordNative) {
            window.DiscordNative.app.relaunch();
        } else {
            window.location.reload()
        }
    }
    function CreateModal() {
    try{ 
        showConfirmationModal("EasyRestart", "Are you sure you want to restart Discord? This will completely terminate Discord and start the updater (reload on web).", {
            onConfirm: () => restartDiscord()})
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
  }}
