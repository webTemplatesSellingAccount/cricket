import AsyncStorage from '@react-native-async-storage/async-storage';

const FIREBASE_UNIFIED_ADS_KEY = '@firebase_unified_ads_config_v2';

// Unified 1-Single JSON configuration strictly matching Firebase Remote Config format
export const DEFAULT_UNIFIED_FIREBASE_ADS_CONFIG = {
  adsstatus: true,
  isAdsShow: 1,
  ad_type: 'banner',
  appId: 'ca-app-pub-3940256099942544~3347511713',
  facebookid: 'FB_APP_ID_123456789',
  facebooktoken: 'FB_CLIENT_TOKEN_987654321',
  privacypolicy: 'https://example.com/privacy-policy',
  appopen: true,
  appopenadid: 'ca-app-pub-3940256099942544/9257395921',
  intertrialadid: 'ca-app-pub-3940256099942544/1033173712',
  banneradid: 'ca-app-pub-3940256099942544/6300978111',
  nativeadid: 'ca-app-pub-3940256099942544/2247696110',
  interstitial_click: 1,
  screens: [
    {
      screen: 'liveScoreHub',
      ads_type: 'banner',
      banner_type: 'inline_adaptive',
      inline_size: 110,
      enabled: true,
    },
    {
      screen: 'schedule',
      ads_type: 'banner',
      banner_type: 'inline_adaptive',
      inline_size: 140,
      enabled: true,
    },
    {
      screen: 'matches',
      ads_type: 'banner',
      banner_type: 'inline_adaptive',
      inline_size: 120,
      enabled: true,
    },
    {
      screen: 'settings',
      ads_type: 'banner',
      banner_type: 'inline_adaptive',
      inline_size: 340,
      enabled: true,
    },
    {
      screen: 'news',
      ads_type: 'banner',
      banner_type: 'inline_adaptive',
      inline_size: 140,
      enabled: true,
    },
    {
      screen: 'videos',
      ads_type: 'banner',
      banner_type: 'inline_adaptive',
      inline_size: 140,
      enabled: true,
    },
    {
      screen: 'iplHub',
      ads_type: 'banner',
      banner_type: 'medium_rectangle',
      inline_size: 140,
      enabled: true,
    },
    {
      screen: 't20WorldCup',
      ads_type: 'banner',
      banner_type: 'inline_adaptive',
      inline_size: 130,
      enabled: true,
    },
    {
      screen: 'odiWorldCup',
      ads_type: 'banner',
      banner_type: 'inline_adaptive',
      inline_size: 130,
      enabled: true,
    },
    {
      screen: 'wtc',
      ads_type: 'banner',
      banner_type: 'inline_adaptive',
      inline_size: 130,
      enabled: true,
    },
    {
      screen: 'allRecords',
      ads_type: 'banner',
      banner_type: 'inline_adaptive',
      inline_size: 140,
      enabled: true,
    },
    {
      screen: 'pointsTable',
      ads_type: 'banner',
      banner_type: 'inline_adaptive',
      inline_size: 110,
      enabled: true,
    },
  ],
};

export const DEFAULT_GLOBAL_ADS_CONFIG = DEFAULT_UNIFIED_FIREBASE_ADS_CONFIG;
export const DEFAULT_SCREEN_ADS_CONFIG = DEFAULT_UNIFIED_FIREBASE_ADS_CONFIG.screens;

/**
 * Load Unified Ads Config from Firebase / Storage
 */
export async function getUnifiedAdsConfig() {
  try {
    const json = await AsyncStorage.getItem(FIREBASE_UNIFIED_ADS_KEY);
    if (json) {
      const parsed = JSON.parse(json);
      const merged = {
        ...DEFAULT_UNIFIED_FIREBASE_ADS_CONFIG,
        ...parsed,
        screens: (parsed && Array.isArray(parsed.screens)) ? parsed.screens : DEFAULT_UNIFIED_FIREBASE_ADS_CONFIG.screens,
      };
      console.log('Firebase data fetch success...', merged);
      return merged;
    }
  } catch (e) {
    console.error('Error reading unified ads config:', e);
  }
  console.log('Firebase data fetch success (default config loaded)...', DEFAULT_UNIFIED_FIREBASE_ADS_CONFIG);
  return DEFAULT_UNIFIED_FIREBASE_ADS_CONFIG;
}

/**
 * Save Unified Ads Config to Storage
 */
export async function saveUnifiedAdsConfig(config) {
  try {
    const updated = { ...DEFAULT_UNIFIED_FIREBASE_ADS_CONFIG, ...config };
    await AsyncStorage.setItem(FIREBASE_UNIFIED_ADS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving unified ads config:', e);
    return config;
  }
}

export async function getGlobalAdsConfig() {
  const unified = await getUnifiedAdsConfig();
  return unified;
}

export async function saveGlobalAdsConfig(partialGlobal) {
  const current = await getUnifiedAdsConfig();
  const updated = { ...current, ...partialGlobal };
  return await saveUnifiedAdsConfig(updated);
}

export async function getScreenAdsConfigs() {
  const unified = await getUnifiedAdsConfig();
  return unified.screens || DEFAULT_SCREEN_ADS_CONFIG;
}

export async function saveScreenAdsConfigs(screensArray) {
  const current = await getUnifiedAdsConfig();
  const updated = { ...current, screens: screensArray };
  await saveUnifiedAdsConfig(updated);
  return screensArray;
}

/**
 * Reset Firebase configuration to original default state
 */
export async function resetAdsConfigToDefaults() {
  try {
    await AsyncStorage.removeItem(FIREBASE_UNIFIED_ADS_KEY);
  } catch (e) {
    console.error('Error resetting ads configs:', e);
  }
  return DEFAULT_UNIFIED_FIREBASE_ADS_CONFIG;
}
