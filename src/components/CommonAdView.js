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
  NativeAd,
  NativeAdView,
  NativeMediaView,
  NativeAsset,
  NativeAssetType,
} from '../services/admobService';

const { width: screenWidth } = Dimensions.get('window');

/**
 * Helper function to calculate Ad Size based on type, size value, and collapsible state
 */
export function getAdSize(type, size, isCollapsible) {
  const upperType = (type || 'BANNER').toString().toUpperCase().replace(/[- ]/g, '_');

  switch (upperType) {
    case 'BANNER':
      return { width: '100%', height: undefined, name: isCollapsible ? 'ANCHORED_ADAPTIVE_BANNER' : 'BANNER' };
    case 'INLINE_ADAPTIVE':
      return { width: '100%', height: undefined, name: 'INLINE_ADAPTIVE' };
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

  const upper = (type || 'BANNER').toString().toUpperCase().replace(/[- ]/g, '_');
  switch (upper) {
    case 'BANNER':
      return BannerAdSize.BANNER || 'BANNER';
    case 'ANCHORED_ADAPTIVE':
    case 'ANCHORED_ADAPTIVE_BANNER':
      return BannerAdSize.ANCHORED_ADAPTIVE_BANNER || BannerAdSize.BANNER;
    case 'LARGE_BANNER':
      return BannerAdSize.LARGE_BANNER || 'LARGE_BANNER';
    case 'MEDIUM_RECTANGLE':
    case 'BIGNATIVE':
      return BannerAdSize.MEDIUM_RECTANGLE || 'MEDIUM_RECTANGLE';
    case 'SMALLNATIVE':
    case 'SMALL_NATIVE':
      return BannerAdSize.BANNER || 'BANNER';
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
  style,
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
  const isAdsEnabled = globalConfig && (
    globalConfig.adsstatus === true || globalConfig.adsstatus === 'true' ||
    globalConfig.isAdsShow === 1 || globalConfig.isAdsShow === '1'
  ) && screenConfig.enabled !== false;

  const configuredType = forceType || (screenConfig && screenConfig.ads_type) || (globalConfig && globalConfig.ad_type) || 'banner';
  const adType = configuredType.toString().toUpperCase().replace(/[- ]/g, '_');
  const bannerType = (screenConfig && screenConfig.banner_type) || 'inline_adaptive';
  const nativeType = (screenConfig && (screenConfig.native_type || screenConfig.native_size)) || 'small_native';
  const adSizeValue = forceSize || (screenConfig && screenConfig.inline_size) || 140;

  // Resolve Test Ad Unit ID
  const testBannerId = (TestIds && TestIds.BANNER) ? TestIds.BANNER : 'ca-app-pub-3940256099942544/6300978111';
  const configuredBannerId = globalConfig && globalConfig.banneradid;
  const configuredNativeId = globalConfig && globalConfig.nativeadid;
  const resolvedAdUnitId = adType === 'NATIVE'
    ? (configuredNativeId || (TestIds && TestIds.NATIVE) || 'ca-app-pub-3940256099942544/2247696110')
    : (configuredBannerId || testBannerId);

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

  const bannerSizeType = bannerType.toString().toUpperCase().replace(/[- ]/g, '_');
  const computedAdSize = getAdSize(bannerSizeType, adSizeValue, isCollapsible);
  const adSizeEnum = getBannerAdSizeEnum(bannerSizeType, isCollapsible);

  const handleAdClick = () => {
    recordUserClick(() => {
      const url = (globalConfig && globalConfig.privacypolicy) || 'https://example.com/privacy-policy';
      Linking.openURL(url).catch(() => { });
    });
  };

  if (!isAdMobAvailable || (adType === 'NATIVE' ? !NativeAd || !NativeAdView : !BannerAd)) {
    console.log('AdMob banner unavailable: use a development/custom Android build, not Expo Go.');
    return null;
  }

  return adType === 'NATIVE' ? (
    <NativeAdPlacement
      adUnitId={resolvedAdUnitId}
      variant={nativeType}
      screen={screen}
      onLoaded={() => setIsLoading(false)}
      onFailed={() => setAdError(true)}
      style={style}
    />
  ) : (
    <View style={[{ width: '100%', alignItems: 'center', marginVertical: 6 }, style]}>
      <BannerAd
        unitId={resolvedAdUnitId}
        size={adSizeEnum}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        onAdLoaded={() => setIsLoading(false)}
        onAdFailedToLoad={(err) => {
          console.warn(`AdMob banner failed for ${screen}:`, err);
          setAdError(true);
          setIsLoading(false);
        }}
      />
    </View>
  );
}

function NativeAdPlacement({ adUnitId, variant, screen, onLoaded, onFailed, style }) {
  const [nativeAd, setNativeAd] = useState(null);
  const normalizedVariant = variant.toString().toLowerCase().replace(/[- ]/g, '_');
  const isBig = normalizedVariant === 'big_native' || normalizedVariant === 'bignative' || normalizedVariant === 'big';
  const height = isBig ? 300 : 140;

  useEffect(() => {
    let mounted = true;
    let loadedAd;
    NativeAd.createForAdRequest(adUnitId, { requestNonPersonalizedAdsOnly: true })
      .then((ad) => {
        loadedAd = ad;
        if (mounted) {
          setNativeAd(ad);
          onLoaded();
        } else {
          ad.destroy();
        }
      })
      .catch((error) => {
        console.warn(`AdMob native ad failed for ${screen}:`, error);
        onFailed();
      });

    return () => {
      mounted = false;
      if (loadedAd) loadedAd.destroy();
    };
  }, [adUnitId, screen]);

  if (!nativeAd) return null;

  return (
    <NativeAdView nativeAd={nativeAd} style={[{ width: '100%', height, marginVertical: 6 }, style]}>
      <View style={{ flex: 1, padding: 10, backgroundColor: '#FFFFFF', borderRadius: 10 }}>
        <NativeAsset assetType={NativeAssetType.HEADLINE}>
          <Text numberOfLines={1} style={{ fontWeight: '800', fontSize: 14, color: '#111827' }}>{nativeAd.headline}</Text>
        </NativeAsset>
        {isBig && NativeMediaView ? <NativeMediaView style={{ flex: 1, marginVertical: 6 }} resizeMode="cover" /> : null}
        <NativeAsset assetType={NativeAssetType.BODY}>
          <Text numberOfLines={isBig ? 3 : 1} style={{ color: '#4B5563', fontSize: 11, marginTop: 4 }}>{nativeAd.body}</Text>
        </NativeAsset>
        <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
          <Text style={{ color: '#047857', fontWeight: '800', fontSize: 12, marginTop: 5 }}>{nativeAd.callToAction || 'Learn more'}</Text>
        </NativeAsset>
      </View>
    </NativeAdView>
  );
}
