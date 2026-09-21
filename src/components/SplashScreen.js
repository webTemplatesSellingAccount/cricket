import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish, isPreview = false, onClose }) {
  const [showInitialSplash, setShowInitialSplash] = useState(!isPreview);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.75)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.spring(logoScaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();

    if (!isPreview) {
      const timer = setTimeout(() => {
        setShowInitialSplash(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPreview]);

  const handleGetStarted = () => {
    if (onClose) onClose();
    if (onFinish) onFinish();
  };

  // 1. Initial Centered App Icon Splash Screen
  if (showInitialSplash) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowInitialSplash(false)}
          style={styles.initialSplashContainer}
        >
          <Animated.View
            style={[
              styles.centeredLogoBox,
              { opacity: fadeAnim, transform: [{ scale: logoScaleAnim }] },
            ]}
          >
            {/* Centered App Logo Card */}
            <View style={styles.logoCircleWrapper}>
              <Image
                source={require('../../assets/icon.png')}
                style={styles.logoImage}
                resizeMode="cover"
              />
            </View>

            {/* App Name & Branding */}
            <Text style={styles.splashAppTitle}>Live Cricket TV HD</Text>
            <Text style={styles.splashAppSubtitle}>
              Ball-By-Ball Commentary & Real-Time Scores
            </Text>

            {/* Spinner indicator */}
            <View style={styles.splashSpinnerBox}>
              <ActivityIndicator size="small" color="#008000" />
            </View>
          </Animated.View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Animated.View style={[styles.mainWrapper, { opacity: fadeAnim }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
        >
          {/* Top Floating Ad Card (Exact Match with Image 1) */}
          <View style={styles.adCardContainer}>
            {/* Ad Header Row */}
            <View style={styles.adHeaderRow}>
              <View style={styles.adIconCircle}>
                <Ionicons name="baseball" size={18} color="#0284C7" />
                <View style={styles.adBadgePill}>
                  <Text style={styles.adBadgeText}>AD</Text>
                </View>
              </View>
              <View style={styles.adHeaderTextContainer}>
                <Text style={styles.adTitleText}>Live Match Stats</Text>
                <Text style={styles.adSubtitleText} numberOfLines={1}>
                  Get real-time stats and updates for every Cricket
                </Text>
              </View>
            </View>

            {/* Ad Banner Image */}
            <View style={styles.adImageWrapper}>
              <Image
                source={require('../../assets/welcome_ad_banner.jpg')}
                style={styles.adBannerImage}
                resizeMode="cover"
              />
            </View>

            {/* View Stats Button */}
            <TouchableOpacity
              onPress={handleGetStarted}
              style={styles.viewStatsButton}
              activeOpacity={0.85}
            >
              <Text style={styles.viewStatsButtonText}>View Stats</Text>
            </TouchableOpacity>
          </View>

          {/* Hero Cricket Illustration Artwork */}
          <View style={styles.heroArtWrapper}>
            <Image
              source={require('../../assets/welcome_hero_art.jpg')}
              style={styles.heroArtImage}
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text Section */}
          <View style={styles.welcomeTextSection}>
            <Text style={styles.welcomeToText}>Welcome To,</Text>

            <View style={styles.liveCricketRow}>
              <Text style={styles.liveCricketTitle}>Live Cricket </Text>
              <View style={styles.tvHdWrapper}>
                <Text style={styles.tvHdTitle}>TV HD</Text>
                <View style={styles.greenUnderlineBar} />
              </View>
            </View>

            <Text style={styles.welcomeSubtitle}>
              Highly engaging and entertaining ball-by-ball commentary
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Full Width "Get Started" Button (Exact Match) */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            onPress={handleGetStarted}
            style={styles.getStartedButton}
            activeOpacity={0.85}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <View style={styles.cricketIconSquare}>
              <Image
                source={require('../../assets/get_started_batsman_icon.jpg')}
                style={styles.batsmanIconImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },

  /* Top Ad Card Styles */
  adCardContainer: {
    backgroundColor: '#EFEFEF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 10,
    marginBottom: 0,
  },
  adHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  adIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginRight: 10,
  },
  adBadgePill: {
    position: 'absolute',
    top: -2,
    left: -2,
    backgroundColor: '#0284C7',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 5,
  },
  adBadgeText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: '900',
  },
  adHeaderTextContainer: {
    flex: 1,
  },
  adTitleText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
  },
  adSubtitleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  adImageWrapper: {
    width: '100%',
    height: 145,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  adBannerImage: {
    width: '100%',
    height: '100%',
  },
  viewStatsButton: {
    width: '100%',
    backgroundColor: '#007A3B',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStatsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  /* Hero Artwork Styles */
  heroArtWrapper: {
    width: '100%',
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -45,
    marginBottom: 5,
  },
  heroArtImage: {
    width: '100%',
    height: '100%',
  },

  /* Welcome Text Section */
  welcomeTextSection: {
    paddingHorizontal: 8,
    marginTop: 4,
  },
  welcomeToText: {
    fontSize: 34,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -0.5,
  },
  liveCricketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -2,
  },
  liveCricketTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -0.5,
  },
  tvHdWrapper: {
    alignItems: 'center',
  },
  tvHdTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#007A3B',
    letterSpacing: -0.5,
  },
  greenUnderlineBar: {
    width: '100%',
    height: 3.5,
    backgroundColor: '#007A3B',
    borderRadius: 2,
    marginTop: 1,
  },
  welcomeSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4B5563',
    marginTop: 12,
    lineHeight: 22,
  },

  /* Bottom Get Started Button */
  bottomButtonContainer: {
    alignItems: 'center',
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
  },
  getStartedButton: {
    width: width * 0.68,
    height: 48,
    backgroundColor: '#007A3B',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    elevation: 3,
    shadowColor: '#007A3B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  cricketIconSquare: {
    position: 'absolute',
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    overflow: 'hidden',
  },
  batsmanIconImage: {
    width: '90%',
    height: '90%',
  },
  /* Initial Centered Logo Splash Screen Styles */
  initialSplashContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredLogoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoCircleWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#007A3B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    borderWidth: 3,
    borderColor: '#007A3B',
    marginBottom: 24,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  splashAppTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -0.3,
    marginBottom: 6,
    textAlign: 'center',
  },
  splashAppSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 28,
  },
  splashSpinnerBox: {
    marginTop: 8,
  },
});

