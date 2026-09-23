import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { RecordListSkeleton } from '../components/ShimmerSkeleton';
import {
  T20_WORLD_CUP_PLAYOFFS,
  ODI_WORLD_CUP_PLAYOFFS,
  TEST_WTC_PLAYOFFS,
} from '../data/worldCupData';
import AdContainer from '../components/AdContainer';

export default function PlayoffsScreen({ onBack }) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState('t20_wc'); // 't20_wc' | 'odi_wc' | 'wtc'
  const [playoffList, setPlayoffList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const loadPlayoffData = useCallback(async (tourney) => {
    setLoading(true);
    const t = tourney || selectedTournament;

    setTimeout(() => {
      if (t === 'odi_wc') {
        setPlayoffList(ODI_WORLD_CUP_PLAYOFFS);
      } else if (t === 'wtc') {
        setPlayoffList(TEST_WTC_PLAYOFFS);
      } else {
        setPlayoffList(T20_WORLD_CUP_PLAYOFFS);
      }
      setLoading(false);
      setRefreshing(false);
    }, 200);
  }, [selectedTournament]);

  useEffect(() => {
    loadPlayoffData(selectedTournament);
  }, [selectedTournament]);

  const onRefresh = () => {
    setRefreshing(true);
    loadPlayoffData(selectedTournament);
  };

  const handleSelectTournament = (tourney) => {
    setSelectedTournament(tourney);
  };

  const getHeaderTitle = () => {
    if (selectedTournament === 't20_wc') return 'T20 WC History';
    if (selectedTournament === 'odi_wc') return 'ODI WC History';
    return 'Test (WTC) History';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. Header Bar */}
      <View style={styles.topHeaderBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>

        {/* Top Right Sleek Live Badge */}
        <View style={styles.topRightLiveBadge}>
          <Ionicons name="flash" size={13} color="#059669" style={{ marginRight: 3 }} />
          <Text style={styles.topRightLiveText}>LIVE LINE</Text>
        </View>
      </View>

      <AdContainer screen="playoffs" style={{ marginHorizontal: 12 }} />

      {/* 2. Tournament Selector (T20 World Cup | ODI World Cup | Test (WTC)) */}
      <View style={styles.tournamentSegmentRow}>
        <TouchableOpacity
          onPress={() => handleSelectTournament('t20_wc')}
          style={[
            styles.segmentBtn,
            selectedTournament === 't20_wc' && styles.segmentBtnActive,
          ]}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.segmentBtnText,
              selectedTournament === 't20_wc' && styles.segmentBtnTextActive,
            ]}
          >
            T20 World Cup
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelectTournament('odi_wc')}
          style={[
            styles.segmentBtn,
            selectedTournament === 'odi_wc' && styles.segmentBtnActive,
          ]}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.segmentBtnText,
              selectedTournament === 'odi_wc' && styles.segmentBtnTextActive,
            ]}
          >
            ODI World Cup
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelectTournament('wtc')}
          style={[
            styles.segmentBtn,
            selectedTournament === 'wtc' && styles.segmentBtnActive,
          ]}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.segmentBtnText,
              selectedTournament === 'wtc' && styles.segmentBtnTextActive,
            ]}
          >
            Test (WTC)
          </Text>
        </TouchableOpacity>
      </View>

      {/* 3. Top Sub-Header Showcase Card */}
      <View style={styles.adBannerCard}>
        <View style={styles.adIconBox}>
          <View style={styles.adRedBallCircle}>
            <Ionicons name="trophy-outline" size={18} color="#008000" />
          </View>
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>World Cup History</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            Explore all T20, ODI & Test (WTC) champions & finals history
          </Text>
        </View>

        <View style={styles.installButton}>
          <Text style={styles.installButtonText}>Explore</Text>
        </View>
      </View>

      {/* 4. Playoff & Champions History Cards List */}
      {loading ? (
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
            <ActivityIndicator size="small" color="#008000" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 13, color: '#008000', fontWeight: '700' }}>
              Fetching {getHeaderTitle()}...
            </Text>
          </View>
          <RecordListSkeleton count={6} />
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#008000"
              colors={['#008000', '#10B981', '#009270']}
            />
          }
        >
          {playoffList.map((item, index) => (
            <View key={item.year || index} style={styles.worldCupCard}>
              <View style={styles.wcYearRow}>
                <View style={styles.yearBadge}>
                  <Ionicons name="trophy" size={16} color="#F59E0B" style={{ marginRight: 6 }} />
                  <Text style={styles.yearBadgeText}>{item.year} Champions</Text>
                </View>
                <Text style={styles.wcVenueText}>{item.venue}</Text>
              </View>

              <View style={styles.wcTeamRow}>
                <View style={styles.wcWinnerBox}>
                  <Text style={styles.wcLabelText}>WINNER</Text>
                  <Text style={styles.wcWinnerText}>{item.winner}</Text>
                </View>
                <View style={styles.wcVsBox}>
                  <Text style={styles.wcVsText}>VS</Text>
                </View>
                <View style={styles.wcRunnerBox}>
                  <Text style={styles.wcLabelText}>RUNNER-UP</Text>
                  <Text style={styles.wcRunnerText}>{item.runnerUp}</Text>
                </View>
              </View>

              <View style={styles.wcMarginBox}>
                <Text style={styles.wcMarginText}>{item.margin}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Bottom Showcase Banner */}
      <AdContainer screen="playoffs" style={{ marginHorizontal: 12 }} />
      <View style={styles.bottomAdBanner}>
        <View style={styles.adIconBox}>
          <View style={styles.adRedBallCircle}>
            <Ionicons name="baseball" size={18} color="#DC2626" />
          </View>
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>Live Match Stats</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            Get real-time stats and updates for every Cricket match
          </Text>
        </View>

        <View style={styles.installButton}>
          <Text style={styles.installButtonText}>View Live</Text>
        </View>
      </View>

      {/* Full Screen Image Modal */}
      <Modal
        visible={!!selectedImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.imageModalContainer}>
          <TouchableOpacity
            style={styles.closeModalBtn}
            onPress={() => setSelectedImage(null)}
          >
            <Ionicons name="close-circle" size={36} color="#FFFFFF" />
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Header Bar */
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
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
    textAlign: 'center',
  },

  /* Tournament Segment Row */
  tournamentSegmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F1F5F9',
    marginHorizontal: 16,
    marginTop: 10,
    padding: 4,
    borderRadius: 12,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  segmentBtnActive: {
    backgroundColor: '#008000',
  },
  segmentBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  segmentBtnTextActive: {
    color: '#FFFFFF',
  },

  /* Top Right Sleek Live Badge */
  topRightLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#6EE7B7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  topRightLiveText: {
    color: '#047857',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  /* Sub-Header AD Card */
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
  adIconBox: {
    marginRight: 10,
  },
  adRedBallCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0FDF4',
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

  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  playoffCard: {
    backgroundColor: '#ECFDF3',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#16A34A',
    padding: 12,
    marginBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  yearBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#056E2B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  yearBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  tapToViewText: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '700',
  },
  playoffImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  noImagePlaceholder: {
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#008000',
  },

  /* World Cup Structured Card Styles */
  worldCupCard: {
    backgroundColor: '#ECFDF3',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#16A34A',
    padding: 14,
    marginBottom: 14,
  },
  wcYearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  wcVenueText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
    marginLeft: 8,
  },
  wcTeamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  wcWinnerBox: {
    flex: 1,
    alignItems: 'flex-start',
  },
  wcRunnerBox: {
    flex: 1,
    alignItems: 'flex-end',
  },
  wcVsBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#008000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  wcVsText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  wcLabelText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    marginBottom: 2,
  },
  wcWinnerText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#008000',
  },
  wcRunnerText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  wcMarginBox: {
    marginTop: 10,
    alignItems: 'center',
  },
  wcMarginText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },

  /* Bottom AD Banner */
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

  /* Image Modal */
  imageModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModalBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  fullScreenImage: {
    width: '95%',
    height: '80%',
  },
});
