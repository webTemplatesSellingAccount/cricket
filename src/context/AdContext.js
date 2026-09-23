import React, { createContext, useContext, useState, useEffect } from 'react';
import { mobileAds, isAdMobAvailable } from '../services/admobService';
import {
  getGlobalAdsConfig,
  saveGlobalAdsConfig,
  getScreenAdsConfigs,
  saveScreenAdsConfigs,
  resetAdsConfigToDefaults,
  DEFAULT_GLOBAL_ADS_CONFIG,
  DEFAULT_SCREEN_ADS_CONFIG,
} from '../services/adConfigService';
import AppOpenAdModal from '../components/AppOpenAdModal';
import InterstitialAdModal from '../components/InterstitialAdModal';

const AdContext = createContext();

export function AdProvider({ children }) {
  const [globalConfig, setGlobalConfig] = useState(DEFAULT_GLOBAL_ADS_CONFIG);
  const [screenConfigs, setScreenConfigs] = useState(DEFAULT_SCREEN_ADS_CONFIG);
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);

  // Click tracking state for Interstitial threshold
  const [clickCount, setClickCount] = useState(0);

  // Modal visibility states
  const [appOpenVisible, setAppOpenVisible] = useState(false);
  const [interstitialVisible, setInterstitialVisible] = useState(false);
  const [interstitialCallback, setInterstitialCallback] = useState(null);

  // Initialize Mobile Ads SDK and Firebase / local storage config
  useEffect(() => {
    async function initAdsConfig() {
      try {
        if (isAdMobAvailable && mobileAds && typeof mobileAds === 'function') {
          mobileAds()
            .initialize()
            .then((adapterStatuses) => {
              console.log('Google Mobile Ads SDK Initialized:', adapterStatuses);
            })
            .catch((err) => {
              console.log('Google Mobile Ads SDK Init warning:', err);
            });
        }
      } catch (err) {
        console.log('MobileAds native module init check:', err);
      }

      try {
        const [gConfig, sConfigs] = await Promise.all([
          getGlobalAdsConfig(),
          getScreenAdsConfigs(),
        ]);
        setGlobalConfig(gConfig);
        setScreenConfigs(sConfigs);

        // Show App Open Ad on application startup if appopen is enabled in Firebase
        const adsEnabled = gConfig && (gConfig.adsstatus === true || gConfig.adsstatus === 'true' || gConfig.isAdsShow === 1 || gConfig.isAdsShow === '1');
        if (adsEnabled && gConfig.appopen) {
          setTimeout(() => {
            setAppOpenVisible(true);
          }, 600);
        }
      } catch (e) {
        console.error('Error initializing Firebase Ads Context:', e);
      } finally {
        setIsConfigLoaded(true);
      }
    }

    initAdsConfig();
  }, []);

  /**
   * Helper to fetch ad configuration for a given screen name
   */
  const getScreenAdConfig = (screenName) => {
    const found = screenConfigs.find((item) => item.screen === screenName);
    if (found) return found;
    return {
      screen: screenName,
      ads_type: 'banner',
      banner_type: 'inline_adaptive',
      native_type: 'small_native',
      inline_size: 140,
      enabled: true,
    };
  };

  /**
   * Update global Firebase configuration
   */
  const updateGlobalConfig = async (partialConfig) => {
    const updated = await saveGlobalAdsConfig({ ...globalConfig, ...partialConfig });
    setGlobalConfig(updated);
  };

  /**
   * Update screen-wise configuration for a specific screen name
   */
  const updateScreenConfig = async (screenName, partialScreenConfig) => {
    const updatedScreens = screenConfigs.map((item) => {
      if (item.screen === screenName) {
        return { ...item, ...partialScreenConfig };
      }
      return item;
    });

    // If screen was not found, add it
    if (!updatedScreens.some((item) => item.screen === screenName)) {
      updatedScreens.push({
        screen: screenName,
        ads_type: 'banner',
        banner_type: 'inline_adaptive',
        native_type: 'small_native',
        inline_size: 140,
        enabled: true,
        ...partialScreenConfig,
      });
    }

    const saved = await saveScreenAdsConfigs(updatedScreens);
    setScreenConfigs(saved);
  };

  /**
   * Reset all Firebase configurations to default values
   */
  const resetAllConfigs = async () => {
    const defaultUnified = await resetAdsConfigToDefaults();
    setGlobalConfig(defaultUnified);
    setScreenConfigs(defaultUnified.screens || []);
  };

  /**
   * Directly show App Open Ad modal
   */
  const showAppOpenAd = () => {
    if (globalConfig && (globalConfig.adsstatus === true || globalConfig.adsstatus === 'true' || globalConfig.isAdsShow === 1 || globalConfig.isAdsShow === '1')) {
      setAppOpenVisible(true);
    }
  };

  /**
   * Directly show Interstitial Ad modal
   */
  const showInterstitialAd = (onCloseCallback) => {
    if (!globalConfig || !(globalConfig.adsstatus === true || globalConfig.adsstatus === 'true' || globalConfig.isAdsShow === 1 || globalConfig.isAdsShow === '1')) {
      if (onCloseCallback) onCloseCallback();
      return;
    }
    setInterstitialCallback(() => onCloseCallback);
    setInterstitialVisible(true);
  };

  /**
   * Trigger user click counter. If counter hits Firebase interstitial_click threshold, present Interstitial Ad!
   */
  const recordUserClick = (onComplete) => {
    if (!globalConfig || !(globalConfig.adsstatus === true || globalConfig.adsstatus === 'true' || globalConfig.isAdsShow === 1 || globalConfig.isAdsShow === '1')) {
      if (onComplete) onComplete();
      return;
    }

    const threshold = (globalConfig && globalConfig.interstitial_click !== undefined) ? globalConfig.interstitial_click : 1;
    const nextCount = clickCount + 1;

    if (nextCount >= threshold) {
      setClickCount(0);
      showInterstitialAd(onComplete);
    } else {
      setClickCount(nextCount);
      if (onComplete) onComplete();
    }
  };

  const handleAppOpenClose = () => {
    setAppOpenVisible(false);
  };

  const handleInterstitialClose = () => {
    setInterstitialVisible(false);
    if (interstitialCallback) {
      interstitialCallback();
      setInterstitialCallback(null);
    }
  };

  const appOpenAdId = DEFAULT_GLOBAL_ADS_CONFIG.appopenadid;
  const intertrialAdId = DEFAULT_GLOBAL_ADS_CONFIG.intertrialadid;

  return (
    <AdContext.Provider
      value={{
        globalConfig,
        screenConfigs,
        isConfigLoaded,
        getScreenAdConfig,
        updateGlobalConfig,
        updateScreenConfig,
        resetAllConfigs,
        showAppOpenAd,
        showInterstitialAd,
        recordUserClick,
      }}
    >
      {children}
      {/* Full-screen Ad Mob Test Modals */}
      <AppOpenAdModal
        visible={appOpenVisible}
        onClose={handleAppOpenClose}
        adId={appOpenAdId}
      />
      <InterstitialAdModal
        visible={interstitialVisible}
        onClose={handleInterstitialClose}
        adId={intertrialAdId}
      />
    </AdContext.Provider>
  );
}

export function useAds() {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
}
