import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useSettings, IPL_TEAMS } from '../context/SettingsContext';
import { TeamFlag } from '../utils/flagHelper';
import { getUserMe, getApiUsage } from '../services/cricketApi';
import { useAds } from '../context/AdContext';
import AdContainer from '../components/AdContainer';

export default function SettingsScreen({ onPreviewSplash }) {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { settings, updateSettings } = useSettings();
  const {
    globalConfig,
    screenConfigs,
    updateGlobalConfig,
    updateScreenConfig,
    resetAllConfigs,
    showAppOpenAd,
    showInterstitialAd,
  } = useAds();

  const [selectedAdScreen, setSelectedAdScreen] = useState('settings');

  // BigBallsData API status state
  const [apiUserInfo, setApiUserInfo] = useState(null);
  const [apiUsageInfo, setApiUsageInfo] = useState(null);

  useEffect(() => {
    async function loadApiStatus() {
      const u = await getUserMe();
      const us = await getApiUsage();
      if (u) setApiUserInfo(u);
      if (us) setApiUsageInfo(us);
    }
    loadApiStatus();
  }, []);

  // Notification Permissions & Alerts (persisted)
  const {
    matchNotifications,
    wicketAlerts,
    newsDigest,
    wifiOnlyVideos,
    soundHaptics,
    favoriteTeam: selectedTeam,
  } = settings;
  const setMatchNotifications = (v) => updateSettings({ matchNotifications: v });
  const setWicketAlerts = (v) => updateSettings({ wicketAlerts: v });
  const setNewsDigest = (v) => updateSettings({ newsDigest: v });
  const setWifiOnlyVideos = (v) => updateSettings({ wifiOnlyVideos: v });
  const setSoundHaptics = (v) => updateSettings({ soundHaptics: v });
  const setSelectedTeam = (v) => updateSettings({ favoriteTeam: v });

  // Cache size is ephemeral, not a persisted preference
  const [cacheSize, setCacheSize] = useState('14.2 MB');

  const teams = IPL_TEAMS;

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear temporary match data and images?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            setCacheSize('0.0 KB');
            Alert.alert('Cache Cleared', 'All temporary cached files have been removed.');
          },
        },
      ]
    );
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: 'Download the Cricbuzz Live Cricket app for fastest live scores, ball-by-ball updates, and IPL standings!',
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleRateApp = () => {
    Alert.alert('Thank You!', 'We appreciate your feedback and love for Cricbuzz!');
  };

  const showPolicyAlert = (title) => {
    Alert.alert(
      title,
      'Cricbuzz values user privacy and transparency. No personal tracking data is shared with third parties.'
    );
  };

  return (
    <View style={{ backgroundColor: theme.bg }} className="flex-1">
      <ScrollView className="flex-1 px-4 pt-3 pb-8" showsVerticalScrollIndicator={false}>
        {/* User Card Header */}
        <View
          style={{
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
          }}
          className="p-4 rounded-3xl border shadow-xs mb-4 flex-row items-center justify-between"
        >
          <View className="flex-row items-center flex-1 mr-2">
            <View className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 items-center justify-center mr-3">
              <Ionicons name="person" size={24} color="#009270" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text style={{ color: theme.text }} className="font-black text-base mr-2">
                  Cricket Fan
                </Text>
                <View className="px-2 py-0.5 bg-emerald-500/15 rounded-full">
                  <Text className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px]">
                    ACTIVE
                  </Text>
                </View>
              </View>
              <Text style={{ color: theme.textMuted }} className="text-xs mt-0.5">
                Fav Team: {selectedTeam} • IPL 2026 Edition
              </Text>
            </View>
          </View>
        </View>

        {/* BigBallsData API Telemetry Card */}
        <Text style={{ color: theme.textMuted }} className="text-xs font-black uppercase tracking-wider px-1 mb-2">
          BigBallsData Unified API Status
        </Text>
        <View
          style={{
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
          }}
          className="p-4 rounded-3xl border shadow-xs mb-5"
        >
          <View className="flex-row items-center justify-between pb-3 border-b" style={{ borderColor: theme.divider }}>
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-emerald-500/15 items-center justify-center mr-2.5">
                <Ionicons name="server-outline" size={18} color="#10B981" />
              </View>
              <View>
                <Text style={{ color: theme.text }} className="font-extrabold text-sm">
                  bigballsdata.com
                </Text>
                <Text style={{ color: theme.textMuted }} className="text-[10px]">
                  https://api.bigballsdata.com/v1
                </Text>
              </View>
            </View>
            <View className="px-2.5 py-1 bg-emerald-500/20 rounded-full flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              <Text className="text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase">
                CONNECTED
              </Text>
            </View>
          </View>

          <View className="pt-3 space-y-2">
            <View className="flex-row justify-between items-center">
              <Text style={{ color: theme.textMuted }} className="text-xs">API Key</Text>
              <Text style={{ color: theme.text }} className="text-xs font-mono font-bold">
                bbs_live_...4qF3
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text style={{ color: theme.textMuted }} className="text-xs">Account Plan</Text>
              <Text style={{ color: theme.accent }} className="text-xs font-extrabold uppercase">
                {apiUserInfo?.plan || 'Free Developer Tier'}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text style={{ color: theme.textMuted }} className="text-xs">Daily Limit</Text>
              <Text style={{ color: theme.text }} className="text-xs font-bold">
                {apiUsageInfo?.limits?.per_day || 500} requests/day
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text style={{ color: theme.textMuted }} className="text-xs">Today's Remaining</Text>
              <Text style={{ color: '#10B981' }} className="text-xs font-black">
                {apiUsageInfo?.remaining_today !== undefined ? apiUsageInfo.remaining_today : 500} req left
              </Text>
            </View>
          </View>
        </View>

        {/* 1. APPEARANCE (LIGHT & DARK MODE) */}
        <Text style={{ color: theme.textMuted }} className="text-xs font-black uppercase tracking-wider px-1 mb-2">
          Appearance
        </Text>
        <View
          style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}
          className="p-4 rounded-3xl border shadow-xs mb-5"
        >
          <View className="flex-row items-center justify-between mb-3.5">
            <View className="flex-row items-center">
              <View
                style={{ backgroundColor: isDarkMode ? '#1E293B' : '#FEF3C7' }}
                className="w-8 h-8 rounded-xl items-center justify-center mr-3"
              >
                <Ionicons
                  name={isDarkMode ? 'moon' : 'sunny'}
                  size={18}
                  color={isDarkMode ? '#10B981' : '#D97706'}
                />
              </View>
              <View>
                <Text style={{ color: theme.text }} className="font-extrabold text-sm">
                  Theme Mode
                </Text>
                <Text style={{ color: theme.textSecondary }} className="text-xs">
                  {isDarkMode ? 'Dark theme enabled' : 'Light theme enabled'}
                </Text>
              </View>
            </View>
          </View>

          {/* Segmented Light/Dark Selector */}
          <View className="flex-row bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl">
            <TouchableOpacity
              onPress={() => {
                if (isDarkMode) toggleTheme();
              }}
              style={{
                backgroundColor: !isDarkMode ? '#FFFFFF' : 'transparent',
                shadowColor: !isDarkMode ? '#000000' : 'transparent',
                shadowOpacity: !isDarkMode ? 0.08 : 0,
                shadowRadius: 3,
                elevation: !isDarkMode ? 2 : 0,
              }}
              className="flex-1 py-2.5 rounded-xl flex-row items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons
                name="sunny"
                size={16}
                color={!isDarkMode ? '#009270' : '#94A3B8'}
                style={{ marginRight: 6 }}
              />
              <Text
                style={{
                  color: !isDarkMode ? '#009270' : '#94A3B8',
                  fontWeight: !isDarkMode ? '800' : '600',
                }}
                className="text-xs"
              >
                Light Mode
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (!isDarkMode) toggleTheme();
              }}
              style={{
                backgroundColor: isDarkMode ? theme.card : 'transparent',
                shadowColor: isDarkMode ? '#000000' : 'transparent',
                shadowOpacity: isDarkMode ? 0.2 : 0,
                shadowRadius: 3,
                elevation: isDarkMode ? 2 : 0,
              }}
              className="flex-1 py-2.5 rounded-xl flex-row items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons
                name="moon"
                size={16}
                color={isDarkMode ? '#10B981' : '#64748B'}
                style={{ marginRight: 6 }}
              />
              <Text
                style={{
                  color: isDarkMode ? '#10B981' : '#64748B',
                  fontWeight: isDarkMode ? '800' : '600',
                }}
                className="text-xs"
              >
                Dark Mode
              </Text>
            </TouchableOpacity>
          </View>

          {/* Re-play Splash Screen Button */}
          {onPreviewSplash && (
            <TouchableOpacity
              onPress={onPreviewSplash}
              style={{ borderColor: theme.divider }}
              className="mt-3.5 pt-3 border-t flex-row items-center justify-between"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <Ionicons name="play-circle-outline" size={18} color="#15803D" style={{ marginRight: 8 }} />
                <Text style={{ color: theme.text }} className="font-extrabold text-xs">
                  Re-play Splash Screen
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* 2. NOTIFICATIONS & PERMISSIONS */}
        <Text style={{ color: theme.textMuted }} className="text-xs font-black uppercase tracking-wider px-1 mb-2">
          Notifications & Alerts
        </Text>
        <View
          style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}
          className="rounded-3xl border shadow-xs mb-5 overflow-hidden"
        >
          {/* Match Alerts */}
          <View className="flex-row items-center justify-between p-4 border-b" style={{ borderColor: theme.divider }}>
            <View className="flex-row items-center flex-1 mr-3">
              <View className="w-8 h-8 rounded-xl bg-blue-500/15 items-center justify-center mr-3">
                <Ionicons name="notifications" size={17} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text style={{ color: theme.text }} className="font-extrabold text-sm">
                  Match Notifications
                </Text>
                <Text style={{ color: theme.textMuted }} className="text-xs">
                  Match start, toss, and final results
                </Text>
              </View>
            </View>
            <Switch
              value={matchNotifications}
              onValueChange={setMatchNotifications}
              trackColor={{ false: '#94A3B8', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Wickets & Boundaries */}
          <View className="flex-row items-center justify-between p-4 border-b" style={{ borderColor: theme.divider }}>
            <View className="flex-row items-center flex-1 mr-3">
              <View className="w-8 h-8 rounded-xl bg-red-500/15 items-center justify-center mr-3">
                <Ionicons name="flash" size={17} color="#EF4444" />
              </View>
              <View className="flex-1">
                <Text style={{ color: theme.text }} className="font-extrabold text-sm">
                  Wicket & Boundary Alerts
                </Text>
                <Text style={{ color: theme.textMuted }} className="text-xs">
                  Instant buzz on 4s, 6s, and fall of wickets
                </Text>
              </View>
            </View>
            <Switch
              value={wicketAlerts}
              onValueChange={setWicketAlerts}
              trackColor={{ false: '#94A3B8', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* News & Editorial Digest */}
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center flex-1 mr-3">
              <View className="w-8 h-8 rounded-xl bg-purple-500/15 items-center justify-center mr-3">
                <Ionicons name="newspaper" size={17} color="#8B5CF6" />
              </View>
              <View className="flex-1">
                <Text style={{ color: theme.text }} className="font-extrabold text-sm">
                  Cricket News Digest
                </Text>
                <Text style={{ color: theme.textMuted }} className="text-xs">
                  Top cricket stories and analysis
                </Text>
              </View>
            </View>
            <Switch
              value={newsDigest}
              onValueChange={setNewsDigest}
              trackColor={{ false: '#94A3B8', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* 3. CRICKET PREFERENCES (FAVORITE TEAM & LANGUAGE) */}
        <Text style={{ color: theme.textMuted }} className="text-xs font-black uppercase tracking-wider px-1 mb-2">
          Cricket Preferences
        </Text>
        <View
          style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}
          className="p-4 rounded-3xl border shadow-xs mb-5"
        >
          {/* Favorite Team */}
          <Text style={{ color: theme.text }} className="font-extrabold text-sm mb-1">
            Favorite IPL Team
          </Text>
          <Text style={{ color: theme.textMuted }} className="text-xs mb-3">
            Prioritize match updates and points table
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-2 -mx-1 px-1 mb-4">
            {teams.map((t) => {
              const isSelected = selectedTeam === t.code;
              return (
                <TouchableOpacity
                  key={t.code}
                  onPress={() => setSelectedTeam(t.code)}
                  style={{
                    backgroundColor: isSelected ? theme.accent : theme.inputBg,
                    borderColor: isSelected ? theme.accent : theme.cardBorder,
                  }}
                  className="flex-row items-center px-3.5 py-2 rounded-2xl border mr-2"
                  activeOpacity={0.75}
                >
                  <TeamFlag
                    countryCode={t.code}
                    teamName={t.name}
                    size={20}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={{
                      color: isSelected ? '#FFFFFF' : theme.text,
                      fontWeight: isSelected ? '900' : '600',
                    }}
                    className="text-xs"
                  >
                    {t.code}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* 4. DATA & PRIVACY PERMISSIONS */}
        <Text style={{ color: theme.textMuted }} className="text-xs font-black uppercase tracking-wider px-1 mb-2">
          Data & Media Settings
        </Text>
        <View
          style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}
          className="rounded-3xl border shadow-xs mb-5 overflow-hidden"
        >
          {/* Wi-Fi Only */}
          <View className="flex-row items-center justify-between p-4 border-b" style={{ borderColor: theme.divider }}>
            <View className="flex-row items-center flex-1 mr-3">
              <View className="w-8 h-8 rounded-xl bg-teal-500/15 items-center justify-center mr-3">
                <Ionicons name="wifi" size={17} color="#0D9488" />
              </View>
              <View className="flex-1">
                <Text style={{ color: theme.text }} className="font-extrabold text-sm">
                  Stream on Wi-Fi Only
                </Text>
                <Text style={{ color: theme.textMuted }} className="text-xs">
                  Save mobile data for match videos
                </Text>
              </View>
            </View>
            <Switch
              value={wifiOnlyVideos}
              onValueChange={setWifiOnlyVideos}
              trackColor={{ false: '#94A3B8', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Sound & Haptics */}
          <View className="flex-row items-center justify-between p-4 border-b" style={{ borderColor: theme.divider }}>
            <View className="flex-row items-center flex-1 mr-3">
              <View className="w-8 h-8 rounded-xl bg-amber-500/15 items-center justify-center mr-3">
                <Ionicons name="volume-medium" size={17} color="#D97706" />
              </View>
              <View className="flex-1">
                <Text style={{ color: theme.text }} className="font-extrabold text-sm">
                  Sound & Haptic Feedback
                </Text>
                <Text style={{ color: theme.textMuted }} className="text-xs">
                  Vibrate on key match moments
                </Text>
              </View>
            </View>
            <Switch
              value={soundHaptics}
              onValueChange={setSoundHaptics}
              trackColor={{ false: '#94A3B8', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>

        {/* 4.5 FIREBASE REMOTE CONFIG & ADMOB TEST ADS MANAGEMENT */}
        <Text style={{ color: theme.textMuted }} className="text-xs font-black uppercase tracking-wider px-1 mb-2">
          Firebase Remote Config & AdMob Management
        </Text>
        <View
          style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}
          className="p-4 rounded-3xl border shadow-xs mb-5"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between pb-3 border-b mb-3" style={{ borderColor: theme.divider }}>
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-amber-500/15 items-center justify-center mr-2.5">
                <Ionicons name="flame" size={18} color="#F59E0B" />
              </View>
              <View>
                <Text style={{ color: theme.text }} className="font-extrabold text-sm">
                  Firebase Remote Config Ads
                </Text>
                <Text style={{ color: theme.textMuted }} className="text-[10px]">
                  Real-time AdMob Units & Dynamic Heights
                </Text>
              </View>
            </View>
            <View className="px-2.5 py-1 bg-emerald-500/20 rounded-full">
              <Text className="text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase">
                FIREBASE LIVE
              </Text>
            </View>
          </View>

          {/* Master Ads Status Switch */}
          <View className="flex-row items-center justify-between py-2 border-b" style={{ borderColor: theme.divider }}>
            <View className="flex-row items-center flex-1 mr-2">
              <Ionicons name="megaphone-outline" size={18} color={theme.accent} style={{ marginRight: 8 }} />
              <View>
                <Text style={{ color: theme.text }} className="font-bold text-xs">
                  Global Ads Status (adsstatus)
                </Text>
                <Text style={{ color: theme.textMuted }} className="text-[10px]">
                  Enable/Disable all app ads globally
                </Text>
              </View>
            </View>
            <Switch
              value={globalConfig?.adsstatus ?? true}
              onValueChange={(val) => updateGlobalConfig({ adsstatus: val })}
              trackColor={{ false: '#94A3B8', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* App Open Status Switch */}
          <View className="flex-row items-center justify-between py-2 border-b" style={{ borderColor: theme.divider }}>
            <View className="flex-row items-center flex-1 mr-2">
              <Ionicons name="open-outline" size={18} color="#3B82F6" style={{ marginRight: 8 }} />
              <View>
                <Text style={{ color: theme.text }} className="font-bold text-xs">
                  App Open Ad (appopen)
                </Text>
                <Text style={{ color: theme.textMuted }} className="text-[10px]">
                  Launch overlay on startup
                </Text>
              </View>
            </View>
            <Switch
              value={globalConfig?.appopen ?? true}
              onValueChange={(val) => updateGlobalConfig({ appopen: val })}
              trackColor={{ false: '#94A3B8', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Interstitial Click Frequency Selector */}
          <View className="py-2.5 border-b" style={{ borderColor: theme.divider }}>
            <View className="flex-row justify-between items-center mb-1.5">
              <Text style={{ color: theme.text }} className="font-bold text-xs">
                Interstitial Click Threshold (interstitial_click)
              </Text>
              <Text style={{ color: '#10B981' }} className="font-black text-xs">
                Every {globalConfig?.interstitial_click ?? 1} click
              </Text>
            </View>
            <View className="flex-row space-x-2">
              {[1, 2, 3, 5].map((count) => {
                const isSelected = (globalConfig?.interstitial_click ?? 1) === count;
                return (
                  <TouchableOpacity
                    key={count}
                    onPress={() => updateGlobalConfig({ interstitial_click: count })}
                    style={{
                      backgroundColor: isSelected ? theme.accent : theme.inputBg,
                      borderColor: isSelected ? theme.accent : theme.cardBorder,
                    }}
                    className="px-3 py-1.5 rounded-xl border mr-2"
                  >
                    <Text
                      style={{
                        color: isSelected ? '#FFF' : theme.text,
                        fontWeight: isSelected ? '900' : '600',
                        fontSize: 11,
                      }}
                    >
                      {count} {count === 1 ? 'click' : 'clicks'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Per Screen JSON Controls */}
          <View className="pt-3 mb-2">
            <Text style={{ color: theme.text }} className="font-black text-xs mb-2">
              Screen-wise Ad Remote Settings (JSON)
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
              {['settings', 'liveScoreHub', 'schedule', 'matches', 'news', 'videos', 't20WorldCup'].map((scr) => {
                const isSelected = selectedAdScreen === scr;
                return (
                  <TouchableOpacity
                    key={scr}
                    onPress={() => setSelectedAdScreen(scr)}
                    style={{
                      backgroundColor: isSelected ? '#10B981' : theme.inputBg,
                      borderColor: isSelected ? '#10B981' : theme.cardBorder,
                    }}
                    className="px-3 py-1.5 rounded-xl border mr-2"
                  >
                    <Text
                      style={{
                        color: isSelected ? '#FFF' : theme.text,
                        fontWeight: isSelected ? '900' : '600',
                        fontSize: 10,
                      }}
                    >
                      {scr}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Selected Screen Editor controls */}
            {(() => {
              const scrConfig = screenConfigs.find((s) => s.screen === selectedAdScreen) || {
                screen: selectedAdScreen,
                ads_type: 'banner',
                banner_type: 'inline_adaptive',
                native_type: 'small_native',
                inline_size: 340,
              };

              return (
                <View style={{ backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC' }} className="p-3 rounded-2xl border" style={{ borderColor: theme.cardBorder }}>
                  <Text style={{ color: theme.textMuted }} className="text-[10px] font-mono mb-2">
                    {JSON.stringify(scrConfig, null, 2)}
                  </Text>

                  {/* Ad Type selector */}
                  <View className="flex-row items-center justify-between mb-2">
                    <Text style={{ color: theme.text }} className="text-xs font-bold">ads_type:</Text>
                    <View className="flex-row space-x-1">
                      {['banner', 'native'].map((type) => (
                        <TouchableOpacity
                          key={type}
                          onPress={() => updateScreenConfig(selectedAdScreen, { ads_type: type })}
                          style={{
                            backgroundColor: scrConfig.ads_type === type ? '#10B981' : theme.card,
                            borderColor: scrConfig.ads_type === type ? '#10B981' : theme.cardBorder,
                          }}
                          className="px-2.5 py-1 rounded-lg border mr-1"
                        >
                          <Text style={{ color: scrConfig.ads_type === type ? '#FFF' : theme.text, fontSize: 10, fontWeight: '800' }}>
                            {type}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Inline Size / Height selector */}
                  <View className="flex-row items-center justify-between mb-2">
                    <Text style={{ color: theme.text }} className="text-xs font-bold">banner_type:</Text>
                    <View className="flex-row space-x-1">
                      {['inline_adaptive', 'banner', 'medium_rectangle'].map((type) => (
                        <TouchableOpacity
                          key={type}
                          onPress={() => updateScreenConfig(selectedAdScreen, { banner_type: type })}
                          style={{
                            backgroundColor: scrConfig.banner_type === type ? '#3B82F6' : theme.card,
                            borderColor: scrConfig.banner_type === type ? '#3B82F6' : theme.cardBorder,
                          }}
                          className="px-2 py-1 rounded-lg border mr-1"
                        >
                          <Text style={{ color: scrConfig.banner_type === type ? '#FFF' : theme.text, fontSize: 9, fontWeight: '800' }}>
                            {type}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Native variant selector */}
                  <View className="flex-row items-center justify-between mb-2">
                    <Text style={{ color: theme.text }} className="text-xs font-bold">native_type:</Text>
                    <View className="flex-row space-x-1">
                      {['small_native', 'big_native'].map((type) => (
                        <TouchableOpacity
                          key={type}
                          onPress={() => updateScreenConfig(selectedAdScreen, { native_type: type })}
                          style={{
                            backgroundColor: scrConfig.native_type === type ? '#10B981' : theme.card,
                            borderColor: scrConfig.native_type === type ? '#10B981' : theme.cardBorder,
                          }}
                          className="px-2.5 py-1 rounded-lg border mr-1"
                        >
                          <Text style={{ color: scrConfig.native_type === type ? '#FFF' : theme.text, fontSize: 10, fontWeight: '800' }}>
                            {type}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Inline Size / Height selector */}
                  <View className="flex-row items-center justify-between">
                    <Text style={{ color: theme.text }} className="text-xs font-bold">inline_size (Height):</Text>
                    <View className="flex-row space-x-1">
                      {[110, 140, 200, 260, 340].map((size) => (
                        <TouchableOpacity
                          key={size}
                          onPress={() => updateScreenConfig(selectedAdScreen, { inline_size: size })}
                          style={{
                            backgroundColor: scrConfig.inline_size === size ? '#3B82F6' : theme.card,
                            borderColor: scrConfig.inline_size === size ? '#3B82F6' : theme.cardBorder,
                          }}
                          className="px-2 py-1 rounded-lg border mr-1"
                        >
                          <Text style={{ color: scrConfig.inline_size === size ? '#FFF' : theme.text, fontSize: 10, fontWeight: '800' }}>
                            {size}px
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              );
            })()}
          </View>

          {/* Test Ad Buttons */}
          <View className="flex-row space-x-2 pt-2 border-t mt-2" style={{ borderColor: theme.divider }}>
            <TouchableOpacity
              onPress={showAppOpenAd}
              className="flex-1 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 items-center mr-1"
            >
              <Text className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px]">
                Test App Open Ad
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => showInterstitialAd()}
              className="flex-1 py-2 rounded-xl bg-blue-500/20 border border-blue-500/40 items-center ml-1"
            >
              <Text className="text-blue-600 dark:text-blue-400 font-extrabold text-[11px]">
                Test Interstitial Ad
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dynamic Ad Placement for Settings Screen */}
        <AdContainer screen="settings" />

        {/* 5. ABOUT & SUPPORT */}
        <Text style={{ color: theme.textMuted }} className="text-xs font-black uppercase tracking-wider px-1 mb-2">
          About & Support
        </Text>
        <View
          style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}
          className="rounded-3xl border shadow-xs mb-8 overflow-hidden"
        >
          <TouchableOpacity
            onPress={handleShareApp}
            className="flex-row items-center justify-between p-4 border-b"
            style={{ borderColor: theme.divider }}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-indigo-500/15 items-center justify-center mr-3">
                <Ionicons name="share-social-outline" size={17} color="#6366F1" />
              </View>
              <Text style={{ color: theme.text }} className="font-bold text-sm">
                Share Cricbuzz App
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRateApp}
            className="flex-row items-center justify-between p-4 border-b"
            style={{ borderColor: theme.divider }}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-amber-500/15 items-center justify-center mr-3">
                <Ionicons name="star-outline" size={17} color="#F59E0B" />
              </View>
              <Text style={{ color: theme.text }} className="font-bold text-sm">
                Rate us on Play Store
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => showPolicyAlert('Privacy Policy')}
            className="flex-row items-center justify-between p-4 border-b"
            style={{ borderColor: theme.divider }}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-slate-500/15 items-center justify-center mr-3">
                <Ionicons name="shield-checkmark-outline" size={17} color="#64748B" />
              </View>
              <Text style={{ color: theme.text }} className="font-bold text-sm">
                Privacy Policy & Permissions
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
          </TouchableOpacity>

          <View className="p-4 flex-row items-center justify-between bg-slate-50 dark:bg-slate-900/40">
            <View>
              <Text style={{ color: theme.text }} className="font-extrabold text-xs">
                cricbuzz Mobile
              </Text>
              <Text style={{ color: theme.textMuted }} className="text-[10px]">
                Version 2.4.0 (Build 2026.1)
              </Text>
            </View>
            <View className="px-2.5 py-1 bg-emerald-500/20 rounded-full">
              <Text className="text-emerald-500 font-black text-[10px] tracking-wider uppercase">
                Up to date
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
