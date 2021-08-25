import { webpackModules } from "@cumcord/modules";
let original;
let interval;
let deleted = [];

const styleMessage = async ({ id }) => {
  let el = document.getElementById(`chat-messages-${id}`);
  if (!el) return;

  if (el.classList.contains('cc-deleted-message')) return;

  el.classList.add('cc-deleted-message');
  el.style.backgroundColor = 'rgba(240, 71, 71, 0.1)';
};

const run = () => {
  for (let obj of deleted) {
    styleMessage(obj);
  }
};

const getWantedHandler = (mod) => mod._orderedActionHandlers.MESSAGE_DELETE.find((x) => x.actionHandler.toString().includes('revealedMessageId'));

let index = 0;

const setup = () => {
  const mod = webpackModules.findByProps('register');

  try {
    original = getWantedHandler(mod);
    console.log("Sucessfully injected noMessageDeletion")
  } catch (e) {
    console.error("Failed to inject noMessageDeletion");
    return setTimeout(setup, 3000);
  }

  index = mod._orderedActionHandlers.MESSAGE_DELETE.indexOf(getWantedHandler(mod));

  mod._orderedActionHandlers.MESSAGE_DELETE[index] = {
    actionHandler: (obj) => {
      // console.log(obj);

      if (deleted.find((x) => x.id === obj.id)) { return; }
      
      deleted.push(obj);

      styleMessage(obj);
    },

    storeDidChange: function() { }
  };

};

export default {
  async onLoad() {
    interval = setInterval(run, 300);

    setup();
  },
  async onUnload() {
    clearInterval(interval);

    for (let e of document.getElementsByClassName('gm-deleted-message')) {
      e.remove();
    }

    webpackModules.findByProps('register')._orderedActionHandlers.MESSAGE_DELETE[index] = original;
    
  },
};
