import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function AdShimmerPlaceholder({ height = 110, style, isNative = false }) {
  const { theme, isDarkMode } = useTheme();
  const shimmerAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 0.85,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0.3,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [shimmerAnim]);

  const bgColor = isDarkMode ? '#1E293B' : '#E2E8F0';
  const shimmerBarColor = isDarkMode ? '#334155' : '#CBD5E1';

  return (
    <View
      style={[
        {
          height: Math.max(height, isNative ? 180 : 80),
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
          borderRadius: 16,
          borderWidth: 1,
          padding: 12,
          justifyContent: 'center',
          overflow: 'hidden',
          marginVertical: 8,
        },
        style,
      ]}
    >
      {/* Top Header Badge */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#F59E0B22', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 8 }}>
            <Text style={{ color: '#D97706', fontSize: 9, fontWeight: '900' }}>AD</Text>
          </View>
          <Animated.View style={{ width: 100, height: 10, borderRadius: 4, backgroundColor: shimmerBarColor, opacity: shimmerAnim }} />
        </View>
        <Ionicons name="sparkles" size={14} color={isDarkMode ? '#64748B' : '#94A3B8'} />
      </View>

      {/* Body shimmer skeleton */}
      {isNative ? (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Animated.View style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: shimmerBarColor, opacity: shimmerAnim, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Animated.View style={{ width: '80%', height: 12, borderRadius: 4, backgroundColor: shimmerBarColor, opacity: shimmerAnim, marginBottom: 6 }} />
              <Animated.View style={{ width: '50%', height: 10, borderRadius: 4, backgroundColor: shimmerBarColor, opacity: shimmerAnim }} />
            </View>
          </View>
          <Animated.View style={{ width: '100%', height: Math.max(30, height - 120), borderRadius: 8, backgroundColor: shimmerBarColor, opacity: shimmerAnim, marginVertical: 6 }} />
          <Animated.View style={{ width: '100%', height: 36, borderRadius: 12, backgroundColor: shimmerBarColor, opacity: shimmerAnim }} />
        </View>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Animated.View style={{ width: '90%', height: 12, borderRadius: 4, backgroundColor: shimmerBarColor, opacity: shimmerAnim, marginBottom: 8 }} />
            <Animated.View style={{ width: '60%', height: 10, borderRadius: 4, backgroundColor: shimmerBarColor, opacity: shimmerAnim }} />
          </View>
          <Animated.View style={{ width: 70, height: height > 140 ? 60 : 36, borderRadius: 10, backgroundColor: shimmerBarColor, opacity: shimmerAnim }} />
        </View>
      )}

      <Text style={{ position: 'absolute', bottom: 4, right: 10, fontSize: 8, color: theme.textMuted, fontStyle: 'italic' }}>
        Loading Google AdMob Test Ad...
      </Text>
    </View>
  );
}
