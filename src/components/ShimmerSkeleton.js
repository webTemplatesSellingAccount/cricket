import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export function SkeletonBox({ width = '100%', height = 16, borderRadius = 8, style }) {
  const { theme, isDarkMode } = useTheme();
  const opacityAnim = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.9,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.35,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [opacityAnim]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: isDarkMode ? '#223348' : '#E2E8F0',
          opacity: opacityAnim,
        },
        style,
      ]}
    />
  );
}

export function MatchCardSkeleton() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.card,
        borderColor: theme.cardBorder,
      }}
      className="p-4 rounded-2xl border mb-3 shadow-xs"
    >
      {/* Top series row */}
      <View className="flex-row justify-between items-center pb-2.5 border-b" style={{ borderColor: theme.divider }}>
        <SkeletonBox width={140} height={12} />
        <SkeletonBox width={45} height={18} borderRadius={999} />
      </View>

      {/* Team 1 row */}
      <View className="py-3 space-y-2.5">
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center space-x-2">
            <SkeletonBox width={24} height={24} borderRadius={12} style={{ marginRight: 8 }} />
            <SkeletonBox width={120} height={14} />
          </View>
          <SkeletonBox width={70} height={16} />
        </View>

        {/* Team 2 row */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center space-x-2">
            <SkeletonBox width={24} height={24} borderRadius={12} style={{ marginRight: 8 }} />
            <SkeletonBox width={110} height={14} />
          </View>
          <SkeletonBox width={60} height={16} />
        </View>
      </View>

      {/* Bottom status note */}
      <View className="pt-2 border-t flex-row justify-between items-center" style={{ borderColor: theme.divider }}>
        <SkeletonBox width={180} height={12} />
        <SkeletonBox width={16} height={16} borderRadius={8} />
      </View>
    </View>
  );
}

export function FeaturedCarouselSkeleton() {
  const { theme } = useTheme();

  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <SkeletonBox width={130} height={14} />
        <SkeletonBox width={70} height={14} />
      </View>
      <View
        style={{
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
        }}
        className="p-4 rounded-2xl border"
      >
        <View className="flex-row justify-between items-center pb-2 border-b" style={{ borderColor: theme.divider }}>
          <SkeletonBox width={120} height={12} />
          <SkeletonBox width={40} height={16} borderRadius={999} />
        </View>
        <View className="py-3 space-y-2">
          <View className="flex-row justify-between items-center mb-2">
            <SkeletonBox width={100} height={14} />
            <SkeletonBox width={65} height={16} />
          </View>
          <View className="flex-row justify-between items-center">
            <SkeletonBox width={100} height={14} />
            <SkeletonBox width={65} height={16} />
          </View>
        </View>
        <View className="pt-2 border-t flex-row justify-between items-center" style={{ borderColor: theme.divider }}>
          <SkeletonBox width={160} height={12} />
          <SkeletonBox width={70} height={20} borderRadius={6} />
        </View>
      </View>
    </View>
  );
}

export function TableSkeleton({ rows = 8 }) {
  return (
    <View style={{ paddingVertical: 8 }}>
      {/* Table header bar */}
      <SkeletonBox width="100%" height={44} borderRadius={12} style={{ marginBottom: 12 }} />
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#F8FAFC',
            borderRadius: 14,
            borderWidth: 1,
            borderColor: '#E2E8F0',
            paddingVertical: 14,
            paddingHorizontal: 16,
            marginBottom: 10,
          }}
        >
          <SkeletonBox width="10%" height={16} borderRadius={4} />
          <SkeletonBox width="50%" height={16} borderRadius={4} />
          <SkeletonBox width="20%" height={16} borderRadius={4} />
        </View>
      ))}
    </View>
  );
}

export function RecordListSkeleton({ count = 8 }) {
  return (
    <View style={{ paddingVertical: 8 }}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ECFDF3',
            borderWidth: 1,
            borderColor: '#A7F3D0',
            borderRadius: 16,
            paddingVertical: 14,
            paddingHorizontal: 16,
            marginBottom: 12,
          }}
        >
          <SkeletonBox width={44} height={38} borderRadius={8} style={{ marginRight: 14 }} />
          <SkeletonBox width="55%" height={18} borderRadius={6} style={{ flex: 1 }} />
          <SkeletonBox width={40} height={30} borderRadius={10} style={{ marginLeft: 12 }} />
        </View>
      ))}
    </View>
  );
}

export function NewsArticleSkeleton({ count = 5 }) {
  return (
    <View style={{ paddingVertical: 8 }}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#E2E8F0',
            padding: 12,
            marginBottom: 12,
          }}
        >
          <SkeletonBox width={90} height={70} borderRadius={12} style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <SkeletonBox width="90%" height={16} borderRadius={4} style={{ marginBottom: 6 }} />
            <SkeletonBox width="70%" height={14} borderRadius={4} style={{ marginBottom: 8 }} />
            <SkeletonBox width="30%" height={10} borderRadius={4} />
          </View>
        </View>
      ))}
    </View>
  );
}

export function VideoCardSkeleton({ count = 4 }) {
  return (
    <View style={{ paddingVertical: 8 }}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#E2E8F0',
            marginBottom: 14,
            overflow: 'hidden',
          }}
        >
          <SkeletonBox width="100%" height={190} borderRadius={0} />
          <View style={{ padding: 12 }}>
            <SkeletonBox width="90%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
            <SkeletonBox width="60%" height={14} borderRadius={4} />
          </View>
        </View>
      ))}
    </View>
  );
}
