import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

/**
 * Base Shimmer Placeholder component built with pure React Native Animated API.
 * Performs a smooth, looping opacity pulse (from 0.35 to 0.95) to simulate shimmer loading.
 */
export function ShimmerBox({ width = '100%', height = 20, borderRadius = 8, style }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.92],
  });

  return (
    <Animated.View
      style={[
        styles.shimmerBase,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
}

/**
 * Card List Skeleton (Used for Record List, Matches, News, Schedules)
 */
export function CardListShimmerSkeleton({ count = 6 }) {
  return (
    <View style={styles.skeletonContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.cardSkeletonContainer}>
          <ShimmerBox width={44} height={44} borderRadius={12} style={{ marginRight: 14 }} />
          <View style={{ flex: 1 }}>
            <ShimmerBox width="60%" height={16} borderRadius={6} style={{ marginBottom: 8 }} />
            <ShimmerBox width="35%" height={12} borderRadius={4} />
          </View>
          <ShimmerBox width={36} height={32} borderRadius={10} style={{ marginLeft: 12 }} />
        </View>
      ))}
    </View>
  );
}

/**
 * Table Skeleton (Used for Points Table and Record Details)
 */
export function TableShimmerSkeleton({ rows = 8 }) {
  return (
    <View style={styles.skeletonContainer}>
      {/* Header bar shimmer */}
      <ShimmerBox width="100%" height={44} borderRadius={10} style={{ marginBottom: 12 }} />
      {/* Row shimmers */}
      {Array.from({ length: rows }).map((_, index) => (
        <View key={index} style={styles.tableRowSkeletonContainer}>
          <ShimmerBox width="12%" height={16} borderRadius={4} />
          <ShimmerBox width="45%" height={16} borderRadius={4} style={{ marginHorizontal: 12 }} />
          <ShimmerBox width="20%" height={16} borderRadius={4} />
        </View>
      ))}
    </View>
  );
}

/**
 * Hero Banner & Media Cards Skeleton (Used for Banners, Videos, Main News)
 */
export function HeroBannerShimmerSkeleton() {
  return (
    <View style={styles.skeletonContainer}>
      <ShimmerBox width="100%" height={160} borderRadius={16} style={{ marginBottom: 16 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <ShimmerBox width="48%" height={110} borderRadius={14} />
        <ShimmerBox width="48%" height={110} borderRadius={14} />
      </View>
      <CardListShimmerSkeleton count={3} />
    </View>
  );
}

const styles = StyleSheet.create({
  shimmerBase: {
    backgroundColor: '#E2E8F0',
  },
  skeletonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardSkeletonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginBottom: 12,
  },
  tableRowSkeletonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
});

export default ShimmerBox;
