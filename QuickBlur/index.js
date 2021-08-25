let css;
let isBlur = false;
export default {
  onLoad() {
    function toggleCSS() {
    console.log('toggleCSS summoned')
      if (isBlur === true) {
        css();
        isBlur = false;
      } else if (isBlur === false) {
        css = window.cumcord.patcher.injectCSS(`
        body {
            filter: blur(2px);
        }
        `);
        isBlur = true;
      }
    }
    window.QuickBlur = {
        toggleCSS: toggleCSS,
    }
    toggleHandler = async (event) => {
    console.log('toggleHandler works')
      if (event.code === "F2") {
        event.preventDefault();
        toggleCSS();
      }
    };
    document.addEventListener("keydown",toggleHandler, false); 
   document.addEventListener("keyup",toggleHandler,false);
   document.addEventListener("keypress",toggleHandler,false);
  },
  onUnload() {
    css();
    
  },
};
