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
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import {
  getInProgressFixtures,
  getUpcomingFixtures,
  getCompletedFixtures,
} from '../services/cricketApi';
import { TeamFlag } from '../utils/flagHelper';
import MatchCenterModal from '../components/MatchCenterModal';
import { MatchCardSkeleton } from '../components/ShimmerSkeleton';
import EmptyStateView from '../components/EmptyStateView';

export default function MatchesScreen({ onBack }) {
  const { theme } = useTheme();

  const [activeCategory, setActiveCategory] = useState('All'); // 'All' | 'Live' | 'Upcoming' | 'Completed'
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [allFixtures, setAllFixtures] = useState([]);
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [matchCenterVisible, setMatchCenterVisible] = useState(false);

  const fetchMatches = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const [liveRes, upcomingRes, completedRes] = await Promise.all([
        getInProgressFixtures(10),
        getUpcomingFixtures(20),
        getCompletedFixtures(15),
      ]);

      const liveList = liveRes?.fixtures || [];
      const upcomingList = upcomingRes?.fixtures || [];
      const completedList = completedRes?.fixtures || [];

      // Deduplicate by match ID
      const map = new Map();
      [...liveList, ...upcomingList, ...completedList].forEach((m) => {
        if (m && (m.fixtureId || m.id) && !map.has(m.fixtureId || m.id)) {
          map.set(m.fixtureId || m.id, m);
        }
      });

      setAllFixtures(Array.from(map.values()));
    } catch (err) {
      console.warn('Fetch matches error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMatches();
  };

  const openMatchCenter = (fixture) => {
    setSelectedFixture(fixture);
    setMatchCenterVisible(true);
  };

  const handleInstallPress = () => {
    Alert.alert(
      'Live Cricket Match Stats',
      'Get instant ball-by-ball scores, live run rates, player stats, and match analytics!',
      [
        { text: 'Dismiss', style: 'cancel' },
        { text: 'Get App', onPress: () => { } },
      ]
    );
  };

  const categories = [
    { id: 'All', label: 'All Matches' },
    { id: 'Live', label: '🔴 Live Matches' },
    { id: 'Upcoming', label: '📅 Upcoming' },
    { id: 'Completed', label: '✅ Completed' },
  ];

  const filteredFixtures =
    activeCategory === 'All'
      ? allFixtures
      : allFixtures.filter((f) => f.status === activeCategory);

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

        <Text style={styles.headerTitle}>Cricket Match Stats</Text>

        {/* Top Right Circular AD Badge Icon */}
        <TouchableOpacity style={styles.topRightAdBadge} onPress={handleInstallPress} activeOpacity={0.8}>
          <View style={styles.adBadgeGreenCircle}>
            <View style={styles.adRedBallCircleHeader}>
              <View style={styles.redBallInner} />
            </View>
            <View style={styles.adSmallPillGreen}>
              <Text style={styles.adSmallPillText}>AD</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* 2. Top Sub-Header AD Card */}
      <View style={styles.adBannerCard}>
        <View style={styles.adIconBox}>
          <TouchableOpacity onPress={handleInstallPress} style={styles.adPlayCircle}>
            <Ionicons name="baseball" size={18} color="#008000" />
            <View style={styles.adBadgePillGreen}>
              <Text style={styles.adBadgeText}>AD</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>Live Cricket Match Telemetry</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            Ball-by-ball commentary, player stats & run rates
          </Text>
        </View>

        <TouchableOpacity style={styles.installButton} activeOpacity={0.85} onPress={handleInstallPress}>
          <Text style={styles.installButtonText}>Install</Text>
        </TouchableOpacity>
      </View>

      {/* 3. Category Filter Tabs */}
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

      {/* 4. Match List & Live Stats Content Area */}
      {loading ? (
        <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 8 }}>
            <ActivityIndicator size="small" color="#008000" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 13, color: '#008000', fontWeight: '700' }}>
              LOADING CRICKET MATCH STATS...
            </Text>
          </View>
          {Array.from({ length: 4 }).map((_, i) => (
            <MatchCardSkeleton key={i} />
          ))}
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
          {filteredFixtures.length === 0 ? (
            <EmptyStateView
              type="general"
              onRefresh={onRefresh}
              actionLabel="Reload Match Stats"
            />
          ) : (
            filteredFixtures.map((fixture) => {
              const isLive = fixture.status === 'Live';
              const isFinished = fixture.status === 'Completed';

              return (
                <TouchableOpacity
                  key={fixture.fixtureId || fixture.id}
                  onPress={() => openMatchCenter(fixture)}
                  style={styles.matchCardContainer}
                  activeOpacity={0.88}
                >
                  {/* Series & Format Header Row */}
                  <View style={styles.cardHeaderRow}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialCommunityIcons name="cricket" size={16} color="#008000" style={{ marginRight: 6 }} />
                      <Text style={styles.seriesTitleText} numberOfLines={1}>
                        {fixture.series || 'International Cricket'}
                      </Text>
                    </View>

                    {/* Status Pill */}
                    <View
                      style={[
                        styles.statusPill,
                        isLive ? styles.statusPillLive : isFinished ? styles.statusPillFinished : styles.statusPillUpcoming,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusPillText,
                          isLive ? styles.statusTextLive : isFinished ? styles.statusTextFinished : styles.statusTextUpcoming,
                        ]}
                      >
                        {isLive ? 'LIVE' : isFinished ? 'COMPLETED' : 'UPCOMING'}
                      </Text>
                    </View>
                  </View>

                  {/* Venue Sub-header */}
                  {fixture.venue && (
                    <View style={styles.venueRow}>
                      <Ionicons name="location-outline" size={13} color="#64748B" style={{ marginRight: 4 }} />
                      <Text style={styles.venueText} numberOfLines={1}>{fixture.venue}</Text>
                    </View>
                  )}

                  {/* Score & Team Comparison */}
                  <View style={styles.teamsBox}>
                    {/* Team 1 */}
                    <View style={styles.teamRow}>
                      <View style={styles.teamInfoCol}>
                        <TeamFlag
                          logo={fixture.team1?.logo}
                          teamName={fixture.team1?.name}
                          countryCode={fixture.team1?.shortName}
                          size={26}
                          style={{ marginRight: 8 }}
                        />
                        <Text style={styles.teamNameText} numberOfLines={1}>
                          {fixture.team1?.name || 'Team 1'}
                        </Text>
                      </View>
                      <Text style={styles.scoreText}>
                        {fixture.team1?.score || '-'}{' '}
                        {fixture.team1?.overs && fixture.team1?.overs !== '-' && (
                          <Text style={styles.oversText}>({fixture.team1.overs} ov)</Text>
                        )}
                      </Text>
                    </View>

                    {/* Team 2 */}
                    <View style={styles.teamRow}>
                      <View style={styles.teamInfoCol}>
                        <TeamFlag
                          logo={fixture.team2?.logo}
                          teamName={fixture.team2?.name}
                          countryCode={fixture.team2?.shortName}
                          size={26}
                          style={{ marginRight: 8 }}
                        />
                        <Text style={styles.teamNameText} numberOfLines={1}>
                          {fixture.team2?.name || 'Team 2'}
                        </Text>
                      </View>
                      <Text style={styles.scoreText}>
                        {fixture.team2?.score || '-'}{' '}
                        {fixture.team2?.overs && fixture.team2?.overs !== '-' && (
                          <Text style={styles.oversText}>({fixture.team2.overs} ov)</Text>
                        )}
                      </Text>
                    </View>
                  </View>

                  {/* Live Player & Bowler Telemetry Stats Box */}
                  {(isLive || fixture.striker) && (
                    <View style={styles.telemetryBox}>
                      <View style={styles.telemetryRow}>
                        {fixture.striker && (
                          <Text style={styles.playerStatText}>
                            🏏 <Text style={{ fontWeight: '800' }}>{fixture.striker.name}</Text>: {fixture.striker.runs} ({fixture.striker.balls}b, {fixture.striker.fours}x4, {fixture.striker.sixes}x6)
                          </Text>
                        )}
                        {fixture.nonStriker && (
                          <Text style={styles.playerStatText}>
                            🏏 {fixture.nonStriker.name}: {fixture.nonStriker.runs} ({fixture.nonStriker.balls}b)
                          </Text>
                        )}
                      </View>

                      {fixture.bowler && (
                        <Text style={styles.bowlerStatText}>
                          🎯 <Text style={{ fontWeight: '800' }}>{fixture.bowler.name}</Text>: {fixture.bowler.figures}
                        </Text>
                      )}

                      {/* Run Rates & Timeline */}
                      <View style={styles.runRateRow}>
                        {fixture.currRate && (
                          <Text style={styles.rateBadgeText}>CRR: {fixture.currRate}</Text>
                        )}
                        {fixture.reqRate && fixture.reqRate !== '-' && (
                          <Text style={[styles.rateBadgeText, { marginLeft: 10 }]}>RRR: {fixture.reqRate}</Text>
                        )}
                      </View>

                      {/* Last Balls Over Timeline */}
                      {Array.isArray(fixture.lastBalls) && fixture.lastBalls.length > 0 && (
                        <View style={styles.lastBallsRow}>
                          <Text style={{ fontSize: 11, color: '#64748B', fontWeight: '700', marginRight: 6 }}>
                            This Over:
                          </Text>
                          {fixture.lastBalls.map((b, bIdx) => {
                            const isWicket = b.includes('W');
                            const isSix = b === '6';
                            const isFour = b === '4';
                            return (
                              <View
                                key={bIdx}
                                style={[
                                  styles.ballCircle,
                                  isWicket ? styles.ballWicket : isSix ? styles.ballSix : isFour ? styles.ballFour : styles.ballNormal,
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.ballText,
                                    (isWicket || isSix || isFour) && { color: '#FFFFFF' },
                                  ]}
                                >
                                  {b}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      )}
                    </View>
                  )}

                  {/* Status Note Footer */}
                  {fixture.statusNote && (
                    <View style={styles.cardFooterRow}>
                      <Text style={styles.statusNoteText} numberOfLines={1}>
                        {fixture.statusNote}
                      </Text>
                      <Ionicons name="chevron-forward" size={16} color="#008000" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      )}

      {/* Bottom Ad Banner */}
      <View style={styles.bottomAdBanner}>
        <View style={styles.adIconBox}>
          <TouchableOpacity onPress={handleInstallPress} style={styles.adPlayCircle}>
            <Ionicons name="baseball" size={18} color="#DC2626" />
            <View style={styles.adBadgePillGreen}>
              <Text style={styles.adBadgeText}>AD</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>Live Cricket Updates</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            Get ball-by-ball scores & match highlights
          </Text>
        </View>

        <TouchableOpacity style={styles.installButton} activeOpacity={0.85} onPress={handleInstallPress}>
          <Text style={styles.installButtonText}>Install</Text>
        </TouchableOpacity>
      </View>

      {/* Match Center Detailed Stats Modal */}
      <MatchCenterModal
        visible={matchCenterVisible}
        fixture={selectedFixture}
        onClose={() => setMatchCenterVisible(false)}
      />
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
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    textAlign: 'center',
  },

  /* Top Right Circular AD Badge */
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

  /* Match Card Styles */
  matchCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  seriesTitleText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusPillLive: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  statusPillFinished: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  statusPillUpcoming: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#93C5FD',
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '900',
  },
  statusTextLive: {
    color: '#DC2626',
  },
  statusTextFinished: {
    color: '#16A34A',
  },
  statusTextUpcoming: {
    color: '#2563EB',
  },
  venueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  venueText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  teamsBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  teamInfoCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  teamNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#008000',
  },
  oversText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  telemetryBox: {
    backgroundColor: '#ECFDF3',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    padding: 10,
    marginBottom: 10,
  },
  telemetryRow: {
    marginBottom: 4,
  },
  playerStatText: {
    fontSize: 12,
    color: '#0F172A',
    marginBottom: 2,
  },
  bowlerStatText: {
    fontSize: 12,
    color: '#0F172A',
    marginBottom: 6,
  },
  runRateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rateBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#008000',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  lastBallsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ballCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  ballNormal: {
    backgroundColor: '#E2E8F0',
  },
  ballFour: {
    backgroundColor: '#2563EB',
  },
  ballSix: {
    backgroundColor: '#16A34A',
  },
  ballWicket: {
    backgroundColor: '#DC2626',
  },
  ballText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0F172A',
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  statusNoteText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#008000',
    flex: 1,
    marginRight: 6,
  },
});
