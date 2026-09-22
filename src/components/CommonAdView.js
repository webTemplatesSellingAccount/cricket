import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Linking,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAds } from '../context/AdContext';
import { useTheme } from '../context/ThemeContext';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  isAdMobAvailable,
} from '../services/admobService';

const { width: screenWidth } = Dimensions.get('window');

/**
 * Helper function to calculate Ad Size based on type, size value, and collapsible state
 */
export function getAdSize(type, size, isCollapsible) {
  if (isCollapsible) {
    return { width: '100%', height: 50, name: 'BANNER' };
  }

  const upperType = (type || 'BANNER').toString().toUpperCase();

  switch (upperType) {
    case 'BANNER':
      return { width: '100%', height: 50, name: 'BANNER' };
    case 'LARGE_BANNER':
      return { width: '100%', height: 100, name: 'LARGE_BANNER' };
    case 'MEDIUM_RECTANGLE':
      return { width: '100%', height: 250, name: 'MEDIUM_RECTANGLE' };
    default:
      return { width: '100%', height: Number(size) || 140, name: 'INLINE_ADAPTIVE' };
  }
}

/**
 * Map string ad type to Google AdMob BannerAdSize enum
 */
export function getBannerAdSizeEnum(type, isCollapsible) {
  if (!BannerAdSize) return 'BANNER';
  if (isCollapsible) return BannerAdSize.ANCHORED_ADAPTIVE_BANNER || BannerAdSize.BANNER;

  const upper = (type || 'BANNER').toString().toUpperCase();
  switch (upper) {
    case 'BANNER':
      return BannerAdSize.BANNER || 'BANNER';
    case 'LARGE_BANNER':
      return BannerAdSize.LARGE_BANNER || 'LARGE_BANNER';
    case 'MEDIUM_RECTANGLE':
    case 'BIGNATIVE':
      return BannerAdSize.MEDIUM_RECTANGLE || 'MEDIUM_RECTANGLE';
    case 'SMALLNATIVE':
      return BannerAdSize.ANCHORED_ADAPTIVE_BANNER || BannerAdSize.BANNER;
    default:
      return BannerAdSize.INLINE_ADAPTIVE_BANNER || BannerAdSize.BANNER;
  }
}

/**
 * Small Native Ad Content View (Width: screenWidth, Height: 140)
 */
export function SmallNativeAdContentView({ screenName, onAdClick, adId }) {
  const { theme, isDarkMode } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onAdClick}
      style={{
        width: '100%',
        height: 140,
        backgroundColor: theme.card,
        borderColor: isDarkMode ? '#334155' : '#E2E8F0',
        borderWidth: 1,
        borderRadius: 14,
        padding: 12,
        justifyContent: 'space-between',
        marginVertical: 8,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#F59E0B', paddingHorizontal: 6, paddingVertical: 1.5, borderRadius: 4, marginRight: 8 }}>
            <Text style={{ color: '#000', fontSize: 9, fontWeight: '900' }}>TEST AD</Text>
          </View>
          <Text style={{ color: theme.textMuted, fontSize: 10, fontWeight: '800', textTransform: 'uppercase' }}>
            Google AdMob Small Native Test Ad
          </Text>
        </View>
        <Text style={{ color: '#10B981', fontSize: 9, fontFamily: 'monospace', fontWeight: 'bold' }}>
          AdMob Active
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: '#10B98122', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
          <MaterialCommunityIcons name="google-ads" size={26} color="#10B981" />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: theme.text, fontSize: 13, fontWeight: '800' }}>
            Test Ad: Google Mobile Ads SDK
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <Text style={{ color: '#F59E0B', fontSize: 10, fontWeight: '900', marginRight: 4 }}>5.0 ★</Text>
            <Text style={{ color: theme.textMuted, fontSize: 10 }}>• Official Test Unit</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: theme.textMuted, fontSize: 9, fontFamily: 'monospace' }}>{adId}</Text>
        <View style={{ backgroundColor: '#10B981', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16 }}>
          <Text style={{ color: '#FFF', fontSize: 11, fontWeight: '900' }}>TEST AD</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/**
 * Big Native Ad Content View (Width: screenWidth, Height: 300)
 */
export function BigNativeAdContentView({ screenName, onAdClick, adId }) {
  const { theme, isDarkMode } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onAdClick}
      style={{
        width: '100%',
        height: 300,
        backgroundColor: theme.card,
        borderColor: isDarkMode ? '#334155' : '#E2E8F0',
        borderWidth: 1,
        borderRadius: 18,
        padding: 14,
        justifyContent: 'space-between',
        marginVertical: 8,
        elevation: 3,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#F59E0B', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 8 }}>
            <Text style={{ color: '#000', fontSize: 10, fontWeight: '900' }}>TEST AD</Text>
          </View>
          <Text style={{ color: theme.textMuted, fontSize: 10, fontWeight: '800', textTransform: 'uppercase' }}>
            Google AdMob Big Native Test Ad
          </Text>
        </View>
        <Ionicons name="information-circle-outline" size={16} color={theme.textMuted} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
        <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: '#3B82F622', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
          <MaterialCommunityIcons name="google-ads" size={28} color="#3B82F6" />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: theme.text, fontSize: 15, fontWeight: '900' }}>
            Test Ad: Google Mobile Ads Native
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: 11, marginTop: 2 }}>
            Real-time AdMob Native Test Unit
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: isDarkMode ? '#0F172A' : '#F1F5F9', borderRadius: 12, padding: 12, alignItems: 'center', justifyContent: 'center', marginVertical: 6 }}>
        <MaterialCommunityIcons name="google-ads" size={42} color="#10B981" />
        <Text style={{ color: theme.text, fontSize: 12, fontWeight: '800', marginTop: 6, textAlign: 'center' }}>
          Nice job! AdMob Test Ad loaded successfully!
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <Text style={{ color: theme.textMuted, fontSize: 9, fontFamily: 'monospace' }}>{adId}</Text>
        <View style={{ backgroundColor: '#3B82F6', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 }}>
          <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '900' }}>TEST AD ACTION</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/**
 * Banner View Container matching adSize dimensions
 */
export function BannerViewContainer({ adSize, isLoading, screenName, onAdClick, adId }) {
  const { theme, isDarkMode } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onAdClick}
      style={{
        width: adSize.width,
        height: adSize.height,
        backgroundColor: theme.card,
        borderColor: isDarkMode ? '#334155' : '#E2E8F0',
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 8,
        justifyContent: 'space-between',
        opacity: isLoading ? 0 : 1,
        elevation: 1,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#F59E0B', paddingHorizontal: 5, paddingVertical: 1, borderRadius: 3, marginRight: 6 }}>
            <Text style={{ color: '#000', fontSize: 9, fontWeight: '900' }}>TEST AD</Text>
          </View>
          <Text style={{ color: theme.textMuted, fontSize: 10, fontWeight: '700' }}>
            Google AdMob Banner ({adSize.name})
          </Text>
        </View>
        <Text style={{ color: '#10B981', fontSize: 9, fontWeight: '800' }}>
          H: {adSize.height}px
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text numberOfLines={1} style={{ color: theme.text, fontSize: 12, fontWeight: '800' }}>
            Nice Job! AdMob Test Banner Loaded
          </Text>
          <Text numberOfLines={adSize.height > 100 ? 2 : 1} style={{ color: theme.textSecondary, fontSize: 10, marginTop: 2 }}>
            Official Google Mobile Ads Test Unit
          </Text>
        </View>

        <View style={{ backgroundColor: '#059669', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 }}>
          <Text style={{ color: '#FFF', fontSize: 10, fontWeight: '900' }}>TEST</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: theme.textMuted, fontSize: 8, fontFamily: 'monospace' }}>{adId}</Text>
        <Text style={{ color: theme.textMuted, fontSize: 8 }}>{screenName}</Text>
      </View>
    </TouchableOpacity>
  );
}

/**
 * Common Ad View rendering real react-native-google-mobile-ads BannerAd component
 */
export default function CommonAdView({
  screen = 'default',
  isCollapsible = false,
  forceType,
  forceSize,
}) {
  const adsContext = useAds();
  const globalConfig = adsContext.globalConfig;
  const getScreenAdConfig = adsContext.getScreenAdConfig;
  const recordUserClick = adsContext.recordUserClick;

  const { theme, isDarkMode } = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [adError, setAdError] = useState(false);

  const screenConfig = getScreenAdConfig(screen);

  // Mapped Firebase data
  const isAdsEnabled = (
    !globalConfig ||
    globalConfig.adsstatus === true || globalConfig.adsstatus === 'true' ||
    globalConfig.isAdsShow === 1 || globalConfig.isAdsShow === '1' || globalConfig.isAdsShow === true ||
    (globalConfig.adsstatus !== false && globalConfig.isAdsShow !== 0)
  );

  const adType = (forceType || (screenConfig && screenConfig.ads_type) || (globalConfig && globalConfig.ad_type) || 'BANNER').toString().toUpperCase();
  const adSizeValue = forceSize || (screenConfig && screenConfig.inline_size) || 140;

  // Resolve Test Ad Unit ID
  const testBannerId = (TestIds && TestIds.BANNER) ? TestIds.BANNER : 'ca-app-pub-3940256099942544/6300978111';
  const testNativeId = 'ca-app-pub-3940256099942544/2247696110';
  const resolvedAdUnitId = (adType === 'SMALLNATIVE' || adType === 'BIGNATIVE')
    ? ((globalConfig && globalConfig.nativeadid) || testNativeId)
    : ((globalConfig && globalConfig.banneradid) || testBannerId);

  useEffect(() => {
    setIsLoading(true);
    setAdError(false);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    console.log('GAEventsTracker.logEvents("BanerAdsShow")', {
      AdType: adType,
      screen: screen,
      adUnitId: resolvedAdUnitId,
    });

    return () => clearTimeout(timer);
  }, [screen, adType, adSizeValue, isAdsEnabled]);

  if (!isAdsEnabled) {
    return null;
  }

  const computedAdSize = getAdSize(adType, adSizeValue, isCollapsible);
  const adSizeEnum = getBannerAdSizeEnum(adType, isCollapsible);

  const handleAdClick = () => {
    recordUserClick(() => {
      const url = (globalConfig && globalConfig.privacypolicy) || 'https://example.com/privacy-policy';
      Linking.openURL(url).catch(() => { });
    });
  };

  const shimmerAnim = new Animated.Value(0.3);
  Animated.loop(
    Animated.sequence([
      Animated.timing(shimmerAnim, { toValue: 0.85, duration: 700, useNativeDriver: true }),
      Animated.timing(shimmerAnim, { toValue: 0.3, duration: 700, useNativeDriver: true }),
    ])
  ).start();

  // If react-native-google-mobile-ads BannerAd component is available and no fatal rendering error occurs
  const renderNativeBannerAd = () => {
    if (isAdMobAvailable && BannerAd && !adError) {
      try {
        return (
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <BannerAd
              unitId={resolvedAdUnitId}
              size={adSizeEnum}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              onAdLoaded={() => {
                console.log(`AdMob Banner loaded successfully for screen ${screen}`);
                setIsLoading(false);
              }}
              onAdFailedToLoad={(err) => {
                console.log(`AdMob Banner failed to load for ${screen}:`, err);
                setAdError(true);
                setIsLoading(false);
              }}
            />
          </View>
        );
      } catch (err) {
        console.log('BannerAd render exception:', err);
      }
    }
    return null;
  };

  const nativeBanner = renderNativeBannerAd();
  if (nativeBanner && !adError) {
    return (
      <View style={{ width: '100%', alignItems: 'center', marginVertical: 6 }}>
        {nativeBanner}
      </View>
    );
  }

  // Fallback / standard Google AdMob Test Ad template matching requested type
  return (
    <View style={{ width: '100%', alignItems: 'center', marginVertical: 6 }}>
      {adType === 'SMALLNATIVE' ? (
        <SmallNativeAdContentView screenName={screen} onAdClick={handleAdClick} adId={resolvedAdUnitId} />
      ) : adType === 'BIGNATIVE' ? (
        <BigNativeAdContentView screenName={screen} onAdClick={handleAdClick} adId={resolvedAdUnitId} />
      ) : (
        <View style={{ width: computedAdSize.width, height: computedAdSize.height, alignItems: 'center' }}>
          {isLoading && (
            <View
              style={{
                position: 'absolute',
                width: computedAdSize.width,
                height: computedAdSize.height,
                borderRadius: 8,
                backgroundColor: isDarkMode ? '#1E293B' : '#E2E8F0',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: theme.cardBorder,
              }}
            >
              <Animated.View
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: 8,
                  backgroundColor: isDarkMode ? '#334155' : '#CBD5E1',
                  opacity: shimmerAnim,
                }}
              />
              <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12, fontWeight: '700' }}>
                Loading AdMob Test Ad…
              </Text>
            </View>
          )}

          <BannerViewContainer
            adSize={computedAdSize}
            isLoading={isLoading}
            screenName={screen}
            onAdClick={handleAdClick}
            adId={resolvedAdUnitId}
          />
        </View>
      )}
    </View>
  );
}
