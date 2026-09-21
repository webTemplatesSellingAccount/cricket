import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish, isPreview = false, onClose }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.spring(logoScaleAnim, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleNextScreen = () => {
    if (onClose) onClose();
    if (onFinish) onFinish();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <TouchableOpacity
        activeOpacity={0.98}
        onPress={handleNextScreen}
        style={styles.mainWrapper}
      >
        {/* Upper Centered Content Section */}
        <Animated.View
          style={[
            styles.centerSection,
            { opacity: fadeAnim, transform: [{ scale: logoScaleAnim }] }
          ]}
        >
          {/* Centered Rounded Logo Image */}
          <View style={styles.logoWrapper}>
            <Image
              source={require('../../assets/splash_logo.jpg')}
              style={styles.logoImage}
              resizeMode="cover"
            />
          </View>

          {/* Title Row: Live Cricket TV HD with Green Underline under TV HD */}
          <View style={styles.liveCricketRow}>
            <Text style={styles.liveCricketTitle}>Live Cricket </Text>
            <View style={styles.tvHdWrapper}>
              <Text style={styles.tvHdTitle}>TV HD</Text>
              <View style={styles.greenUnderlineBar} />
            </View>
          </View>

          {/* Subtitle Text */}
          <Text style={styles.subtitleText}>
            Get live Cricket score updates in mobile
          </Text>
        </Animated.View>

        {/* Bottom Cricket Players Illustration (Flush to screen bottom edge) */}
        <Animated.View style={[styles.bottomIllustrationWrapper, { opacity: fadeAnim }]}>
          <Image
            source={require('../../assets/splash_cricket_players.jpg')}
            style={styles.playersIllustrationImage}
            resizeMode="cover"
          />
        </Animated.View>
      </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /* Center Section Styles */
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: height * 0.05,
  },
  logoWrapper: {
    width: 155,
    height: 155,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  liveCricketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  liveCricketTitle: {
    fontSize: 27,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -0.3,
  },
  tvHdWrapper: {
    alignItems: 'center',
  },
  tvHdTitle: {
    fontSize: 27,
    fontWeight: '900',
    color: '#007A3B',
    letterSpacing: -0.3,
  },
  greenUnderlineBar: {
    width: '100%',
    height: 3.5,
    backgroundColor: '#007A3B',
    borderRadius: 2,
    marginTop: 1,
  },
  subtitleText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4B5563',
    textAlign: 'center',
  },

  /* Bottom Illustration Styles */
  bottomIllustrationWrapper: {
    width: width,
    height: height * 0.28,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 0,
    marginBottom: 0,
  },
  playersIllustrationImage: {
    width: '100%',
    height: '100%',
  },
});

