import { webpackModules } from "@cumcord/modules";

let blocking = {
  'compat': '2.1.0',

  'science': true,
  'sentry': true,
  'crash': true
};

let originals = {
  'analytics1': undefined,
  'analytics2': undefined,
  'crash': undefined
};

const setAnalytics = (val) => {
  if (!val) enableAnalytics();
    else disableAnalytics();
};

const enableAnalytics = () => {
  const analyticsMod1 = webpackModules.findByProps('analyticsTrackingStoreMaker');
  const analyticsMod2 = webpackModules.findByProps('getSuperPropertiesBase64');

  analyticsMod1.AnalyticsActionHandlers.handleTrack = originals.analytics1;
  analyticsMod2.track = originals.analytics2;
};

const disableAnalytics = () => {
  const analyticsMod1 = webpackModules.findByProps('analyticsTrackingStoreMaker');
  const analyticsMod2 = webpackModules.findByProps('getSuperPropertiesBase64');

  originals.analytics1 = analyticsMod1.AnalyticsActionHandlers.handleTrack;
  analyticsMod1.AnalyticsActionHandlers.handleTrack = () => {};

  originals.analytics2 = analyticsMod2.track;
  analyticsMod2.track = () => {};
};

const setCrash = (val) => {
  if (!val) enableCrash();
    else disableCrash();
};

const enableCrash = () => {
  const crashMod = webpackModules.findByProps('submitLiveCrashReport');

  crashMod.submitLiveCrashReport = originals.crash;
};

const disableCrash = () => {
  const crashMod = webpackModules.findByProps('submitLiveCrashReport');

  originals.crash = crashMod.submitLiveCrashReport;
  crashMod.submitLiveCrashReport = () => {};
};

const setSentry = (val) => {
  if (!val) enableSentry();
    else disableSentry();
};

const enableSentry = () => {
  window.__SENTRY__.hub.getClient().getOptions().enabled = true;
};

const disableSentry = () => {
  window.__SENTRY__.hub.getClient().getOptions().enabled = false;
};

export default {
    onLoad: async function() {
    setAnalytics(blocking.science);
    setSentry(blocking.sentry);
    setCrash(blocking.crash);
  },

  onUnload: async function() {
    try {
      enableAnalytics();
      enableSentry();
      enableCrash();
    } catch (e) {}

  },

};