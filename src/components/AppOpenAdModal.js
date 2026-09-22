import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import {
  AppOpenAd,
  TestIds,
  AdEventType,
  isAdMobAvailable,
} from '../services/admobService';

export default function AppOpenAdModal({
  visible,
  onClose,
  adId = 'ca-app-pub-3940256099942544/9257395921',
}) {
  const { theme, isDarkMode } = useTheme();
  const [countdown, setCountdown] = useState(3);
  const resolvedAdId = adId || (TestIds && TestIds.APP_OPEN) || 'ca-app-pub-3940256099942544/9257395921';

  useEffect(() => {
    if (!visible) {
      setCountdown(3);
      return;
    }

    // Attempt to load and show real AdMob App Open ad via library if native module exists
    let appOpenAdInstance = null;
    let unsubscribeLoaded = null;
    let unsubscribeClosed = null;

    if (isAdMobAvailable && AppOpenAd && AdEventType) {
      try {
        appOpenAdInstance = AppOpenAd.createForAdRequest(resolvedAdId, {
          requestNonPersonalizedAdsOnly: true,
        });

        unsubscribeLoaded = appOpenAdInstance.addAdEventListener(AdEventType.LOADED, () => {
          console.log('AdMob App Open Ad loaded successfully, showing now...');
          try {
            appOpenAdInstance.show();
          } catch (err) {
            console.log('AppOpenAd show error:', err);
          }
        });

        unsubscribeClosed = appOpenAdInstance.addAdEventListener(AdEventType.CLOSED, () => {
          console.log('AdMob App Open Ad closed by user');
          if (onClose) onClose();
        });

        appOpenAdInstance.load();
      } catch (err) {
        console.log('AppOpenAd creation warning:', err);
      }
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      if (unsubscribeLoaded) unsubscribeLoaded();
      if (unsubscribeClosed) unsubscribeClosed();
    };
  }, [visible, resolvedAdId]);

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent={false} onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: '#02120F', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 40 }}>
        {/* Top Header info */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }}>
            <View style={{ backgroundColor: '#F59E0B', paddingHorizontal: 5, paddingVertical: 1, borderRadius: 3, marginRight: 6 }}>
              <Text style={{ color: '#000', fontSize: 10, fontWeight: '900' }}>TEST AD</Text>
            </View>
            <Text style={{ color: '#A7F3D0', fontSize: 11, fontWeight: '700' }}>Google AdMob App Open Test Ad</Text>
          </View>

          <TouchableOpacity
            onPress={onClose}
            disabled={countdown > 0}
            style={{
              backgroundColor: countdown === 0 ? '#10B981' : 'rgba(255,255,255,0.15)',
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '800', marginRight: countdown > 0 ? 4 : 0 }}>
              {countdown > 0 ? `Skip in ${countdown}s` : 'Continue to App'}
            </Text>
            {countdown === 0 && <Ionicons name="arrow-forward" size={14} color="#FFF" style={{ marginLeft: 4 }} />}
          </TouchableOpacity>
        </View>

        {/* Center Main Graphic Card */}
        <View style={{ alignItems: 'center', marginVertical: 30 }}>
          <View style={{ width: 90, height: 90, borderRadius: 24, backgroundColor: '#059669', justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 8 }}>
            <MaterialCommunityIcons name="google-ads" size={54} color="#FFF" />
          </View>

          <Text style={{ color: '#FFF', fontSize: 24, fontWeight: '900', textAlign: 'center', marginBottom: 8 }}>
            Google AdMob App Open
          </Text>

          <Text style={{ color: '#94A3B8', fontSize: 13, textAlign: 'center', paddingHorizontal: 20, marginBottom: 20 }}>
            Official App Open Test Ad loaded via react-native-google-mobile-ads SDK
          </Text>

          <View style={{ backgroundColor: '#064E3B', borderWidth: 1, borderColor: '#10B981', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, width: '100%', alignItems: 'center' }}>
            <Text style={{ color: '#6EE7B7', fontSize: 11, fontWeight: '800', marginBottom: 2 }}>
              TEST ADMOB UNIT ID
            </Text>
            <Text style={{ color: '#FFF', fontSize: 12, fontFamily: 'monospace', fontWeight: 'bold' }}>
              {resolvedAdId}
            </Text>
          </View>
        </View>

        {/* Bottom Ad Action */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: '#10B981',
              width: '100%',
              paddingVertical: 14,
              borderRadius: 16,
              alignItems: 'center',
              shadowColor: '#10B981',
              shadowOpacity: 0.4,
              shadowRadius: 10,
              elevation: 4,
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '900' }}>
              OPEN APPLICATION
            </Text>
          </TouchableOpacity>
          <Text style={{ color: '#64748B', fontSize: 10, marginTop: 12 }}>
            Google Mobile Ads SDK • Managed via Firebase Remote Config
          </Text>
        </View>
      </View>
    </Modal>
  );
}
