import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getCricketVideos } from '../services/cricketApi';
import VideoPlayerModal from '../components/VideoPlayerModal';
import { NewsArticleSkeleton } from '../components/ShimmerSkeleton';
import EmptyStateView from '../components/EmptyStateView';

export default function MatchesScreen({ onBack }) {
  const { theme } = useTheme();

  const [activeCategory, setActiveCategory] = useState('All'); // 'All' | 'Highlights' | 'Batting' | 'Wickets'
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [videosList, setVideosList] = useState([]);

  const [playingVideo, setPlayingVideo] = useState(null);
  const [playerVisible, setPlayerVisible] = useState(false);

  const fetchVideos = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const res = await getCricketVideos();
      setVideosList(res.videos || []);
    } catch (err) {
      console.warn('Fetch videos error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchVideos();
  };

  const openVideo = (video) => {
    setPlayingVideo(video);
    setPlayerVisible(true);
  };

  const categories = [
    { id: 'All', label: 'All Highlights' },
    { id: 'Highlights', label: 'Match Highlights' },
    { id: 'Batting', label: 'Best Batting' },
    { id: 'Wickets', label: 'Wickets & Sixes' },
  ];

  const filteredVideos =
    activeCategory === 'All'
      ? videosList
      : videosList.filter((v) => v.category === activeCategory);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. Header Bar */}
      <View style={styles.topHeaderBar}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={28} color="#000000" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 36 }} />
        )}

        <Text style={styles.headerTitle}>Video Highlights</Text>

        {/* Top Right Circular AD Badge Icon */}
        <View style={styles.topRightAdBadge}>
          <View style={styles.adBadgeGreenCircle}>
            <View style={styles.adRedBallCircleHeader}>
              <View style={styles.redBallInner} />
            </View>
            <View style={styles.adSmallPillGreen}>
              <Text style={styles.adSmallPillText}>AD</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 2. Top Sub-Header AD Card */}
      <View style={styles.adBannerCard}>
        <View style={styles.adIconBox}>
          <View style={styles.adPlayCircle}>
            <Ionicons name="play" size={18} color="#008000" />
            <View style={styles.adBadgePillGreen}>
              <Text style={styles.adBadgeText}>AD</Text>
            </View>
          </View>
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>Watch Match Highlights</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            IPL, T20 & ODI World Cup match videos
          </Text>
        </View>

        <TouchableOpacity style={styles.installButton} activeOpacity={0.85}>
          <Text style={styles.installButtonText}>Install</Text>
        </TouchableOpacity>
      </View>

      {/* 3. Category Filter Tabs (All Highlights | Match Highlights | Best Batting | Wickets & Sixes) */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCategory(cat.id)}
                style={[
                  styles.tabButton,
                  isActive && styles.activeTabButton,
                ]}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.tabText,
                    isActive && styles.activeTabText,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 4. Video List Content Area */}
      {loading ? (
        <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 8 }}>
            <ActivityIndicator size="small" color="#008000" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 13, color: '#008000', fontWeight: '700' }}>
              Loading Video Highlights...
            </Text>
          </View>
          <NewsArticleSkeleton count={5} />
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollInner}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#008000"
              colors={['#008000', '#10B981', '#009270']}
            />
          }
        >
          {filteredVideos.length === 0 ? (
            <EmptyStateView
              type="general"
              onRefresh={onRefresh}
              actionLabel="Reload Videos"
            />
          ) : (
            filteredVideos.map((video) => (
              <TouchableOpacity
                key={video.id}
                onPress={() => openVideo(video)}
                style={styles.videoCardContainer}
                activeOpacity={0.88}
              >
                {/* Thumbnail Box */}
                <View style={styles.videoThumbnailBox}>
                  <Image
                    source={{ uri: video.imageUrl }}
                    style={StyleSheet.absoluteFillObject}
                    resizeMode="cover"
                  />
                  <View style={styles.thumbnailDarkOverlay} />

                  {/* Tag Pill top left */}
                  <View style={styles.videoTagBadge}>
                    <Text style={styles.videoTagText}>{video.tag}</Text>
                  </View>

                  {/* Play Icon Circle Center */}
                  <View style={styles.playIconOverlay}>
                    <View style={styles.playIconCircle}>
                      <Ionicons name="play" size={26} color="#FFFFFF" style={{ marginLeft: 3 }} />
                    </View>
                  </View>

                  {/* Duration Pill bottom right */}
                  <View style={styles.durationPill}>
                    <Text style={styles.durationText}>{video.duration}</Text>
                  </View>
                </View>

                {/* Video Title & Info Row */}
                <View style={styles.videoInfoBox}>
                  <Text style={styles.videoTitleText} numberOfLines={2}>
                    {video.title}
                  </Text>
                  <View style={styles.videoMetaRow}>
                    <Text style={styles.videoMetaText}>
                      {video.views} • {video.timeAgo}
                    </Text>
                    <Ionicons name="play-circle-outline" size={18} color="#008000" />
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}

      {/* Bottom Ad Banner */}
      <View style={styles.bottomAdBanner}>
        <View style={styles.adIconBox}>
          <View style={styles.adPlayCircle}>
            <Ionicons name="baseball" size={18} color="#DC2626" />
            <View style={styles.adBadgePillGreen}>
              <Text style={styles.adBadgeText}>AD</Text>
            </View>
          </View>
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>Live Cricket Updates</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            Get ball-by-ball scores & match highlights
          </Text>
        </View>

        <TouchableOpacity style={styles.installButton} activeOpacity={0.85}>
          <Text style={styles.installButtonText}>Install</Text>
        </TouchableOpacity>
      </View>

      {/* Video Player Modal */}
      <VideoPlayerModal
        visible={playerVisible}
        video={playingVideo}
        onClose={() => setPlayerVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Top Header Bar */
  topHeaderBar: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    textAlign: 'center',
  },

  /* Top Right Circular AD Badge Icon */
  topRightAdBadge: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adBadgeGreenCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E6F4EA',
    borderWidth: 1.5,
    borderColor: '#34A853',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  adRedBallCircleHeader: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EA4335',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redBallInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
  },
  adSmallPillGreen: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#34A853',
    borderRadius: 6,
    paddingHorizontal: 3,
    paddingVertical: 1,
  },
  adSmallPillText: {
    fontSize: 7,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  /* Top Sub-Header AD Card */
  adBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bottomAdBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  adIconBox: {
    marginRight: 10,
  },
  adPlayCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ECFDF3',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  adBadgePillGreen: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#16A34A',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  adBadgeText: {
    fontSize: 7,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  adTextBox: {
    flex: 1,
    marginRight: 8,
  },
  adTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  adSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  installButton: {
    backgroundColor: '#008000',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  installButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  /* Tabs Bar */
  tabsContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
  tabsRow: {
    paddingHorizontal: 16,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  activeTabButton: {
    backgroundColor: '#008000',
    borderColor: '#008000',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  /* Scroll Content Area */
  scrollContent: {
    flex: 1,
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },

  /* Video Card Styles */
  videoCardContainer: {
    backgroundColor: '#ECFDF3',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#16A34A',
    marginBottom: 14,
    overflow: 'hidden',
  },
  videoThumbnailBox: {
    width: '100%',
    height: 190,
    backgroundColor: '#0F172A',
    position: 'relative',
  },
  thumbnailDarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  videoTagBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 10,
  },
  videoTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  playIconOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationPill: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 10,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  videoInfoBox: {
    padding: 12,
  },
  videoTitleText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 20,
    marginBottom: 6,
  },
  videoMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoMetaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
});
