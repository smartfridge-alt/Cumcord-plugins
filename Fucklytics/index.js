import { webpackModules } from "@cumcord/modules";
let originals = {
  'analytics1': undefined,
  'analytics2': undefined,
  'crash': undefined
};
function enableAnalytics() {
  const analyticsMod1 = webpackModules.findByProps('analyticsTrackingStoreMaker');
  const analyticsMod2 = webpackModules.findByProps('getSuperPropertiesBase64');
  analyticsMod1.AnalyticsActionHandlers.handleTrack = originals.analytics1;
  analyticsMod2.track = originals.analytics2;
};

function disableAnalytics() {
  const analyticsMod1 = webpackModules.findByProps('analyticsTrackingStoreMaker');
  const analyticsMod2 = webpackModules.findByProps('getSuperPropertiesBase64');

  originals.analytics1 = analyticsMod1.AnalyticsActionHandlers.handleTrack;
  analyticsMod1.AnalyticsActionHandlers.handleTrack = () => {};

  originals.analytics2 = analyticsMod2.track;
  analyticsMod2.track = () => {};
};

function enableCrash() {
  const crashMod = webpackModules.findByProps('submitLiveCrashReport');

  crashMod.submitLiveCrashReport = originals.crash;
};

function disableCrash() {
  const crashMod = webpackModules.findByProps('submitLiveCrashReport');

  originals.crash = crashMod.submitLiveCrashReport;
  crashMod.submitLiveCrashReport = () => {};
};

function enableSentry(){
  window.__SENTRY__.hub.getClient().getOptions().enabled = true;
};

function disableSentry() {
  window.__SENTRY__.hub.getClient().getOptions().enabled = false;
};

export default (data) => {
  return {
    onLoad: async function() {
    disableSentry();
    disableAnalytics();
    disableCrash();
  },

  onUnload: async function() {
    try {
      enableAnalytics();
      enableSentry();
      enableCrash();
    } catch (e) {}
    console.error("Fucklytics: I farted.")
  },
  }
}; 
