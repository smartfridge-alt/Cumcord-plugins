import {webpackModules} from "@cumcord/modules";

let sep = {}, ms = {}, kb = {}, gg, sub;
export default {
    onLoad() {
        sep = webpackModules.findByProps('guildSeparator');
        ms = webpackModules.findByProps('modeSelectable');
        kb = webpackModules.findByProps('keybind');
        gg = webpackModules.findByProps('getGuilds');
        sub = webpackModules.findByProps('subscribe');
        function refreshCount() {
            //todo better css lmao
            window.cumcord.patcher.injectCSS(`
        div#cc_guild_count {
            text-align: center;
            font-family: --font-primary
            
        }
        `)
            if (!sep) return;
            const num = Object.keys(gg.getGuilds()).length;
    
            let guildCount = document.getElementById('cc_guild_count');
            if (guildCount) {
                if (num === this._num) return; // don't update if # is the same as before
                guildCount.innerHTML = num + ' Servers';
                this._num = num;
                return;
            }
            const separator = document.querySelector(`.${sep.guildSeparator}`);
            if (separator) {
                guildCount = document.createElement('div');
                guildCount.className = `${ms ? ms.description+' ' : ''}${sep.listItem} ${kb.keybind}`;
                guildCount.innerHTML = num + ' Servers';
                guildCount.id = 'cc_guild_count';
                try {
                    separator.parentElement.parentElement.insertBefore(guildCount, separator.parentElement)
                    this._num = num;
                } catch(err) {
                    this.error(err);
                }
            }
            return;
        }
        sub.subscribe('CONNECTION_OPEN', refreshCount);
        sub.subscribe('CONNECTION_RESUMED', refreshCount);
        sub.subscribe('DISPATCH_APPLICATION_STATE_UPDATE', refreshCount);
        sub.subscribe('CHANNEL_PRELOAD', refreshCount);
        sub.subscribe('GUILD_CREATE', refreshCount);
        sub.subscribe('GUILD_DELETE', refreshCount);
        sub.subscribe('GUILD_JOIN', refreshCount);
        refreshCount();
    },
    onUnload() {
        const guildCount = document.getElementById('cc_guild_count');
        if (guildCount) guildCount.remove();
        sub.unsubscribe('CONNECTION_OPEN', this.refreshCount);
        sub.unsubscribe('GUILD_CREATE', this.refreshCount);
        sub.unsubscribe('GUILD_DELETE', this.refreshCount);
        sub.unsubscribe('GUILD_JOIN', this.refreshCount);
    }
};