import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import {
  InterstitialAd,
  TestIds,
  AdEventType,
  isAdMobAvailable,
} from '../services/admobService';

export default function InterstitialAdModal({
  visible,
  onClose,
  adId = 'ca-app-pub-3940256099942544/1033173712',
}) {
  const { theme, isDarkMode } = useTheme();
  const [canClose, setCanClose] = useState(false);

  const resolvedAdId = adId || (TestIds && TestIds.INTERSTITIAL) || 'ca-app-pub-3940256099942544/1033173712';

  useEffect(() => {
    if (!visible) {
      setCanClose(false);
      return;
    }

    let interstitialInstance = null;
    let unsubscribeLoaded = null;
    let unsubscribeClosed = null;
    let unsubscribeError = null;

    if (isAdMobAvailable && InterstitialAd && AdEventType) {
      try {
        interstitialInstance = InterstitialAd.createForAdRequest(resolvedAdId, {
          requestNonPersonalizedAdsOnly: true,
        });

        unsubscribeLoaded = interstitialInstance.addAdEventListener(AdEventType.LOADED, () => {
          console.log('AdMob Interstitial loaded successfully, showing now...');
          try {
            interstitialInstance.show();
          } catch (err) {
            console.log('Interstitial show error:', err);
          }
        });

        unsubscribeClosed = interstitialInstance.addAdEventListener(AdEventType.CLOSED, () => {
          console.log('AdMob Interstitial closed by user');
          if (onClose) onClose();
        });

        unsubscribeError = interstitialInstance.addAdEventListener(AdEventType.ERROR, (error) => {
          console.warn('AdMob Interstitial failed to load:', error);
          if (onClose) onClose();
        });

        interstitialInstance.load();
      } catch (err) {
        console.log('Interstitial creation warning:', err);
      }
    }

    const timer = setTimeout(() => {
      setCanClose(true);
    }, 1200);

    return () => {
      clearTimeout(timer);
      if (unsubscribeLoaded) unsubscribeLoaded();
      if (unsubscribeClosed) unsubscribeClosed();
      if (unsubscribeError) unsubscribeError();
    };
  }, [visible, resolvedAdId]);

  if (!visible) return null;

  return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: '#0F172A', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 30, justifyContent: 'space-between' }}>
        {/* Top Header bar with close X button */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
            <View style={{ backgroundColor: '#F59E0B', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3, marginRight: 6 }}>
              <Text style={{ color: '#000', fontSize: 10, fontWeight: '900' }}>TEST AD</Text>
            </View>
            <Text style={{ color: '#E2E8F0', fontSize: 11, fontWeight: '700' }}>Google AdMob Interstitial Test Ad</Text>
          </View>

          <TouchableOpacity
            onPress={onClose}
            disabled={!canClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: canClose ? 'rgba(239, 68, 68, 0.9)' : 'rgba(255,255,255,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="close" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Center Interstitial Card */}
        <View style={{ backgroundColor: '#1E293B', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#334155', alignItems: 'center', elevation: 10 }}>
          <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#3B82F622', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
            <MaterialCommunityIcons name="google-ads" size={36} color="#3B82F6" />
          </View>

          <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '900', textAlign: 'center', marginBottom: 6 }}>
            Google AdMob Interstitial
          </Text>

          <Text style={{ color: '#94A3B8', fontSize: 12, textAlign: 'center', marginBottom: 18 }}>
            Full screen test interstitial ad loaded via react-native-google-mobile-ads SDK
          </Text>

          <View style={{ backgroundColor: '#0F172A', padding: 12, borderRadius: 12, width: '100%', alignItems: 'center', marginBottom: 18 }}>
            <Text style={{ color: '#64748B', fontSize: 10, fontWeight: '800', marginBottom: 2 }}>ADMOB TEST UNIT ID</Text>
            <Text style={{ color: '#38BDF8', fontSize: 11, fontFamily: 'monospace', fontWeight: 'bold' }}>{resolvedAdId}</Text>
          </View>

          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: '#3B82F6',
              width: '100%',
              paddingVertical: 12,
              borderRadius: 14,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '900' }}>
              CLOSE TEST AD
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom footer text */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#64748B', fontSize: 11, textAlign: 'center' }}>
            Google Mobile Ads SDK • Dynamically Managed via Firebase
          </Text>
        </View>
      </View>
    </Modal>
  );
}
