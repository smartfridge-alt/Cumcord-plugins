let globalTwitchEmotes = JSON.parse(`{"JKanStyle":15,"OptimizePrime":16,"StoneLightning":17,"TheRinger":18,"RedCoat":22,"Kappa":25,"JonCarnage":26,"MrDestructoid":28,"BCWarrior":30,"GingerPower":32,"DansGame":33,"SwiftRage":34,"PJSalt":36,"KevinTurtle":40,"Kreygasm":41,"SSSsss":46,"PunchTrees":47,"ArsonNoSexy":50,"SMOrc":52,"FrankerZ":65,"OneHand":66,"HassanChop":68,"BloodTrail":69,"DBstyle":73,"AsianGlow":74,"BibleThump":86,"ShazBotstix":87,"PMSTwin":92,"FUNgineer":244,"ResidentSleeper":245,"4Head":354,"HotPokket":357,"FailFish":360,"DAESuppy":973,"WholeWheat":1896,"ThunBeast":1898,"TF2John":1899,"RalpherZ":1900,"Kippa":1901,"Keepo":1902,"BigBrother":1904,"SoBayed":1906,"PeoplesChamp":3412,"GrammarKing":3632,"PanicVis":3668,"ANELE":3792,"BrokeBack":4057,"PipeHype":4240,"YouWHY":4337,"RitzMitz":4338,"EleGiggle":4339,"TheThing":7427,"HassaanChop":20225,"BabyRage":22639,"panicBasket":22998,"PermaSmug":27509,"BuddhaBar":27602,"WutFace":28087,"PRChase":28328,"Mau5":30134,"HeyGuys":30259,"NotATK":34875,"mcaT":35063,"TTours":38436,"PraiseIt":38586,"HumbleLife":46881,"CorgiDerp":49106,"ArgieB8":51838,"ShadyLulu":52492,"KappaPride":55338,"CoolCat":58127,"DendiFace":58135,"NotLikeThis":58765,"riPepperonis":62833,"duDudu":62834,"bleedPurple":62835,"twitchRaid":62836,"SeemsGood":64138,"MingLee":68856,"KappaRoss":70433,"KappaClaus":74510,"OhMyDog":81103,"OSFrog":81248,"SeriousSloth":81249,"KomodoHype":81273,"VoHiYo":81274,"MikeHogu":81636,"KappaWealth":81997,"cmonBruh":84608,"SmoocherZ":89945,"NomNom":90075,"StinkyCheese":90076,"ChefFrank":90129,"FutureMan":98562,"OpieOP":100590,"DoritosChip":102242,"PJSugar":102556,"VoteYea":106293,"VoteNay":106294,"RuleFive":107030,"DxCat":110734,"DrinkPurple":110785,"TinyFace":111119,"PicoMause":111300,"TheTarFu":111351,"DatSheffy":111700,"UnSane":111792,"copyThis":112288,"pastaThat":112289,"imGlitch":112290,"GivePLZ":112291,"TakeNRG":112292,"BlargNaut":114738,"DogFace":114835,"Jebaited":114836,"TooSpicy":114846,"WTRuck":114847,"UncleNox":114856,"RaccAttack":114870,"StrawBeary":114876,"PrimeMe":115075,"BrainSlug":115233,"BatChest":115234,"CurseLit":116625,"Poooound":117484,"FreakinStinkin":117701,"SuperVinlin":118772,"TriHard":120232,"CoolStoryBob":123171,"ItsBoshyTime":133468,"KAPOW":133537,"YouDontSay":134254,"UWot":134255,"RlyTho":134256,"PartyTime":135393,"NinjaGrumpy":138325,"MVGame":142140,"TBAngel":143490,"TheIlluminati":145315,"BlessRNG":153556,"MorphinTime":156787,"ThankEgg":160392,"ArigatoNas":160393,"BegWan":160394,"BigPhish":160395,"InuyoFace":160396,"Kappu":160397,"KonCha":160400,"PunOko":160401,"SabaPing":160402,"TearGlove":160403,"TehePelo":160404,"TwitchLit":166263,"CarlSmile":166266,"CrreamAwk":191313,"Squid1":191762,"Squid2":191763,"Squid3":191764,"Squid4":191767,"TwitchUnity":196892,"TPcrunchyroll":323914,"EntropyWins":376765,"PowerUpR":425671,"PowerUpL":425688,"HSCheers":444572,"HSWP":446979,"DarkMode":461298,"TwitchVotes":479745,"TPFufun":508650,"RedTeam":530888,"GreenTeam":530890,"PurpleStar":624501,"FBtouchdown":626795,"PopCorn":724216,"TombRaid":864205,"EarthDay":959018,"PartyHat":965738,"MercyWing1":1003187,"MercyWing2":1003189,"PinkMercy":1003190,"BisexualPride":1064987,"LesbianPride":1064988,"GayPride":1064991,"TransgenderPride":1064995,"AsexualPride":1130348,"PansexualPride":1130349,"TwitchRPG":1220086,"IntersexPride":1221184,"MaxLOL":1290325,"NonBinaryPride":1297279,"GenderFluidPride":1297281,"FBRun":1441261,"FBPass":1441271,"FBSpiral":1441273,"FBBlock":1441276,"FBCatch":1441281,"FBChallenge":1441285,"FBPenalty":1441289,"PixelBob":1547903,"GunRun":1584743,"HolidayCookie":1713813,"HolidayLog":1713816,"HolidayOrnament":1713818,"HolidayPresent":1713819,"HolidaySanta":1713822,"HolidayTree":1713825,"SoonerLater":2113050,"TwitchSings":300116344,"SingsMic":300116349,"SingsNote":300116350}`);

let globalTwitchEmotesEnabled = true;

let interval;

let betterTTVEnabled = true;
let betterTTVEmotes = [];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const emoteReplace = async (n, el, e, src) => {
  const results = n.textContent.match(new RegExp(`([\\s]|^)${e}([\\s]|$)`));

  if (!results) return;
            
  const pre = n.textContent.substring(0, results.index + results[1].length);
  const post = n.textContent.substring(results.index + results[0].length - results[2].length);

  n.textContent = pre;

  let emojiContainerEl = document.createElement('span');
  emojiContainerEl.classList.add('emojiContainer-3X8SvE');

  emojiContainerEl.setAttribute('role', 'button');
  emojiContainerEl.setAttribute('tabindex', '0');

  let imgEl = document.createElement('img');
  imgEl.src = src;

  imgEl.classList.add('emoji', 'jumboable');

  imgEl.draggable = false;
  imgEl.setAttribute('aria-label', e);

  emojiContainerEl.appendChild(imgEl);

  el.insertBefore(emojiContainerEl, n.nextSibling);

  el.insertBefore(document.createTextNode(post), emojiContainerEl.nextSibling);
}

let canvasImg;

  export default {
    // This onLoad function will be called when your plugin loads, as the name implies.
    async onLoad() {
        betterTTVEmotes = JSON.parse(`[{"id":"54fa8f1401e468494b85b537","code":":tf:","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"54fa8fce01e468494b85b53c","code":"CiGrip","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"54fa903b01e468494b85b53f","code":"DatSauce","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"54fa909b01e468494b85b542","code":"ForeverAlone","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"54fa90ba01e468494b85b543","code":"GabeN","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"54fa90f201e468494b85b545","code":"HailHelix","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"54fa932201e468494b85b555","code":"ShoopDaWhoop","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"54fab45f633595ca4c713abc","code":"M&Mjc","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"54fab7d2633595ca4c713abf","code":"bttvNice","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"54fa935601e468494b85b557","code":"TwaT","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"54fa99b601e468494b85b55d","code":"WatChuSay","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"566ca11a65dbbdab32ec0558","code":"tehPoleCat","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"566ca1a365dbbdab32ec055b","code":"AngelThump","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"54fbefeb01abde735115de5b","code":"TaxiBro","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"54fbf00a01abde735115de5c","code":"BroBalt","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"54fbf09c01abde735115de61","code":"CandianRage","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"55028cd2135896936880fdd7","code":"D:","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"550352766f86a5b26c281ba2","code":"VisLaud","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"550b344bff8ecee922d2a3c1","code":"KaRappa","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"566ca00f65dbbdab32ec0544","code":"FishMoley","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"566ca02865dbbdab32ec0547","code":"Hhhehehe","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"566ca04265dbbdab32ec054a","code":"KKona","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"566ca09365dbbdab32ec0555","code":"PoleDoge","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"553b48a21f145f087fc15ca6","code":"sosGame","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"55471c2789d53f2d12781713","code":"CruW","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"555015b77676617e17dd2e8e","code":"RarePepe","imageType":"png","userId":"54f93e618edd5fcd455f213f"},{"id":"555981336ba1901877765555","code":"haHAA","imageType":"png","userId":"54f93e3e8edd5fcd455f213d"},{"id":"55b6524154eefd53777b2580","code":"FeelsBirthdayMan","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"55f324c47f08be9f0a63cce0","code":"RonSmug","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"560577560874de34757d2dc0","code":"KappaCool","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"566c9fc265dbbdab32ec053b","code":"FeelsBadMan","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"566c9f3b65dbbdab32ec052e","code":"bUrself","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"566c9f6365dbbdab32ec0532","code":"ConcernDoge","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"566c9fde65dbbdab32ec053e","code":"FeelsGoodMan","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"566c9ff365dbbdab32ec0541","code":"FireSpeed","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"566ca06065dbbdab32ec054e","code":"NaM","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"566ca38765dbbdab32ec0560","code":"SourPls","imageType":"gif","userId":"5561169bd6b9d206222a8c19"},{"id":"566decae65dbbdab32ec0699","code":"FeelsSnowyMan","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"567b00c61ddbe1786688a633","code":"LuL","imageType":"png","userId":"54f93e618edd5fcd455f213f"},{"id":"56901914991f200c34ffa656","code":"SaltyCorn","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"56e9f494fff3cc5c35e5287e","code":"monkaS","imageType":"png","userId":"55bfba180baa41467919aabf"},{"id":"56f5be00d48006ba34f530a4","code":"VapeNation","imageType":"png","userId":"55583bc00c72ab1d77d8b9b7"},{"id":"56fa09f18eff3b595e93ac26","code":"ariW","imageType":"png","userId":"54ee2465b822020506c52a52"},{"id":"5709ab688eff3b595e93c595","code":"notsquishY","imageType":"png","userId":"54ee2465b822020506c52a52"},{"id":"5733ff12e72c3c0814233e20","code":"FeelsAmazingMan","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"573d38b50ffbf6cc5cc38dc9","code":"DuckerZ","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"59cf182fcbe2693d59d7bf46","code":"SqShy","imageType":"png","userId":"54ee2465b822020506c52a52"},{"id":"58d2e73058d8950a875ad027","code":"Wowee","imageType":"png","userId":"5561169bd6b9d206222a8c19"},{"id":"5dc36a8db537d747e37ac187","code":"WubTF","imageType":"png","userId":"54f93e3e8edd5fcd455f213d"},{"id":"5e76d2ab8c0f5c3723a9a87d","code":"cvR","imageType":"png","userId":"54ee2465b822020506c52a52"},{"id":"5e76d2d2d112fc372574d222","code":"cvL","imageType":"png","userId":"54ee2465b822020506c52a52"},{"id":"5e76d338d6581c3724c0f0b2","code":"cvHazmat","imageType":"png","userId":"54ee2465b822020506c52a52"},{"id":"5e76d399d6581c3724c0f0b8","code":"cvMask","imageType":"png","userId":"54ee2465b822020506c52a52"},{"id":"5ffdf28dc96152314ad63960","code":"DogChamp","imageType":"png","userId":"54f92c8c34fde4ae450d8d26"}]`);
        interval = setInterval(async () => {
            let els = [...document.getElementsByClassName('messageContent-2qWWxC')];
            for (let el of els) {
              if (globalTwitchEmotesEnabled) for (let e in globalTwitchEmotes) {
                if (!el.textContent.includes(e)) continue;
      
                for (let n of el.childNodes) {
                  if (!n.textContent.includes(e)) continue;
      
                  emoteReplace(n, el, e, `https://static-cdn.jtvnw.net/emoticons/v1/${globalTwitchEmotes[e]}/1.0`); // Discord SCP allows Twitch.tv emotes (because of integration)
                }
              }
      
              if (betterTTVEnabled) for (let e of betterTTVEmotes) {
                if (!el.textContent.includes(e.code)) continue;
      
                for (let n of el.childNodes) {
                  if (!n.textContent.includes(e.code)) continue;
      
                  emoteReplace(n, el, e.code, `https://cdn.betterttv.net/emote/${e.id}/2x.${e.imageType}`);
                }
              }
            }
          }, 500);
      
    },
    // This onUnload function will be called when your plugin unloads, as the name *also* implies.
    onUnload() {
        clearInterval(interval);
    }
  }