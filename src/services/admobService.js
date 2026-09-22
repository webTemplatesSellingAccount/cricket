import { NativeModules } from 'react-native';

let mobileAds = null;
let BannerAd = null;
let BannerAdSize = null;
let TestIds = null;
let InterstitialAd = null;
let AppOpenAd = null;
let AdEventType = null;
let isAdMobAvailable = false;

try {
  // Safe check if native module exists in NativeModules before calling require
  const nativeModuleExists =
    (NativeModules && NativeModules.RNGoogleMobileAdsModule) ||
    (NativeModules && NativeModules.RNGoogleMobileAds);

  const gma = require('react-native-google-mobile-ads');
  if (gma) {
    mobileAds = gma.default || gma.mobileAds;
    BannerAd = gma.BannerAd;
    BannerAdSize = gma.BannerAdSize;
    TestIds = gma.TestIds;
    InterstitialAd = gma.InterstitialAd;
    AppOpenAd = gma.AppOpenAd;
    AdEventType = gma.AdEventType;
    if (gma.BannerAd || gma.default) {
      isAdMobAvailable = true;
    }
  }
} catch (e) {
  console.log('[AdMob Service] Native module react-native-google-mobile-ads is not present in Expo Go/Web environment.');
  isAdMobAvailable = false;
}

// Fallback Test Unit IDs in case TestIds is not available from native module
const SAFE_TEST_IDS = {
  BANNER: 'ca-app-pub-3940256099942544/6300978111',
  INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
  APP_OPEN: 'ca-app-pub-3940256099942544/9257395921',
  NATIVE: 'ca-app-pub-3940256099942544/2247696110',
  REWARDED: 'ca-app-pub-3940256099942544/5224354917',
};

const ResolvedTestIds = TestIds || SAFE_TEST_IDS;

export {
  mobileAds,
  BannerAd,
  BannerAdSize,
  ResolvedTestIds as TestIds,
  InterstitialAd,
  AppOpenAd,
  AdEventType,
  isAdMobAvailable,
  SAFE_TEST_IDS,
};
