import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  WTC_META,
  WTC_CHAMPION_COUNTS,
  WTC_CYCLES,
  WTC_VENUES,
} from '../data/wtcFullData';
import { TeamFlag } from '../utils/flagHelper';

export default function WorldTestChampionshipScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState('finals'); // 'finals' | 'cycles' | 'teams' | 'venues'

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. Header Bar */}
      <View style={styles.topHeaderBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>WTC Test Hub</Text>

        {/* Top Right Circular AD Badge */}
        <TouchableOpacity
          onPress={() => Alert.alert('WTC Test Hub', 'Welcome to World Test Championship!')}
          style={styles.topRightAdBadge}
          activeOpacity={0.8}
        >
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
          <View style={styles.adTrophyCircle}>
            <Ionicons name="trophy" size={20} color="#D97706" />
            <View style={styles.adBadgePillGreen}>
              <Text style={styles.adBadgeText}>AD</Text>
            </View>
          </View>
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>World Test Championship</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            Full WTC Cycles (2019-2027), Standings & Final Scorecards
          </Text>
        </View>

        <TouchableOpacity style={styles.installButton} activeOpacity={0.85}>
          <Text style={styles.installButtonText}>Install</Text>
        </TouchableOpacity>
      </View>

      {/* 3. Hero Championship Leaderboard Strip */}
      <View style={styles.heroStripContainer}>
        <View style={styles.heroTitleRow}>
          <Ionicons name="trophy" size={16} color="#F59E0B" style={{ marginRight: 6 }} />
          <Text style={styles.heroStripTitle}>WTC Champions (2019 - 2025)</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.leaderboardScroll}>
          {WTC_CHAMPION_COUNTS.map((item) => (
            <View key={item.team} style={styles.titleCountPill}>
              <TeamFlag teamName={item.team} countryCode={item.code} size={18} style={{ marginRight: 6 }} />
              <Text style={styles.teamPillName}>{item.team}</Text>
              <View style={styles.trophyPillBadge}>
                <Text style={styles.trophyBadgeText}>🏆 {item.cycle}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 4. Sub Navigation Tabs */}
      <View style={styles.navTabRow}>
        <TouchableOpacity
          onPress={() => setActiveTab('finals')}
          style={[styles.tabBtn, activeTab === 'finals' && styles.tabBtnActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'finals' && styles.tabBtnTextActive]}>
            WTC Finals
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('cycles')}
          style={[styles.tabBtn, activeTab === 'cycles' && styles.tabBtnActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'cycles' && styles.tabBtnTextActive]}>
            WTC Cycles
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('teams')}
          style={[styles.tabBtn, activeTab === 'teams' && styles.tabBtnActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'teams' && styles.tabBtnTextActive]}>
            Test Nations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('venues')}
          style={[styles.tabBtn, activeTab === 'venues' && styles.tabBtnActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'venues' && styles.tabBtnTextActive]}>
            Venues
          </Text>
        </TouchableOpacity>
      </View>

      {/* 5. Main Content Section */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>

        {/* TAB 1: WTC FINALS */}
        {activeTab === 'finals' && (
          <View>
            {WTC_CYCLES.map((c) => {
              if (!c.champion && c.status !== 'Completed') return null;
              return (
                <View key={c.id} style={styles.editionCard}>
                  <View style={styles.editionHeaderRow}>
                    <View style={styles.yearBadge}>
                      <Ionicons name="trophy" size={14} color="#F59E0B" style={{ marginRight: 4 }} />
                      <Text style={styles.yearBadgeText}>WTC Final ({c.cycle})</Text>
                    </View>
                    <Text style={styles.hostText}>Date: {c.final.date}</Text>
                  </View>

                  {/* Match Result Banner */}
                  <View style={styles.resultBanner}>
                    <View style={styles.teamWinnerBox}>
                      <TeamFlag teamName={c.champion} size={20} style={{ marginRight: 6 }} />
                      <Text style={styles.winnerText}>{c.champion}</Text>
                      <Text style={styles.crownPill}>WINNER 🏆</Text>
                    </View>

                    <View style={styles.vsBadge}>
                      <Text style={styles.vsText}>VS</Text>
                    </View>

                    <View style={styles.teamRunnerBox}>
                      <TeamFlag teamName={c.runner_up} size={20} style={{ marginRight: 6 }} />
                      <Text style={styles.runnerText}>{c.runner_up}</Text>
                    </View>
                  </View>

                  <View style={styles.resultSummaryRow}>
                    <Text style={styles.resultMarginText}>{c.final.result}</Text>
                    <Text style={styles.venueLocationText}>
                      📍 {c.final.venue}, {c.final.city}, {c.final.country}
                    </Text>
                  </View>

                  {c.final.player_of_match && (
                    <View style={styles.pomBadgeBox}>
                      <Text style={styles.pomText}>🎖️ Player of Match: {c.final.player_of_match}</Text>
                    </View>
                  )}

                  {/* Scorecard summary if available */}
                  {c.final.scorecard && (
                    <View style={styles.scoreDetailsBox}>
                      <Text style={styles.scoreText}>🇦🇺 Aus 1st: {c.final.scorecard.Australia_1st} | 🇮🇳 Ind 1st: {c.final.scorecard.India_1st}</Text>
                      <Text style={styles.scoreText}>🇦🇺 Aus 2nd: {c.final.scorecard.Australia_2nd} | 🇮🇳 Ind 2nd: {c.final.scorecard.India_2nd}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* TAB 2: WTC CYCLES */}
        {activeTab === 'cycles' && (
          <View>
            {WTC_CYCLES.map((c) => (
              <View key={c.id} style={styles.cycleCard}>
                <View style={styles.cycleHeaderRow}>
                  <Text style={styles.cycleTitle}>{c.name}</Text>
                  <View style={[styles.statusTag, c.status === 'Ongoing' ? styles.statusTagOngoing : styles.statusTagCompleted]}>
                    <Text style={styles.statusTagText}>{c.status}</Text>
                  </View>
                </View>

                <View style={styles.cycleInfoBox}>
                  <Text style={styles.cycleInfoText}>
                    📌 Format: 6 Series per team (3 Home, 3 Away) across 9 Test Nations. Ranked by Points Percentage (PCT).
                  </Text>
                  {c.champion ? (
                    <Text style={styles.cycleWinnerInfoText}>🏆 Champion: {c.champion} (Defeated {c.runner_up})</Text>
                  ) : (
                    <Text style={styles.cycleWinnerInfoText}>⏳ Final Match: Planned for {c.final.date} at {c.final.venue}, {c.final.city}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* TAB 3: TEST NATIONS */}
        {activeTab === 'teams' && (
          <View>
            <View style={styles.groupsHeaderNote}>
              <Text style={styles.groupsNoteText}>
                The 9 Official ICC Full-Member Test Nations competing in World Test Championship cycles:
              </Text>
            </View>

            <View style={styles.teamsGridBox}>
              {WTC_CYCLES[0].teams.map((tName, idx) => (
                <View key={tName} style={styles.testTeamRow}>
                  <Text style={styles.testTeamIndex}>{idx + 1}.</Text>
                  <TeamFlag teamName={tName} size={24} style={{ marginRight: 10 }} />
                  <Text style={styles.testTeamName}>{tName}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* TAB 4: VENUES */}
        {activeTab === 'venues' && (
          <View>
            <View style={styles.groupsHeaderNote}>
              <Text style={styles.groupsNoteText}>
                Historical & Future Host Venues for ICC World Test Championship Finals in England:
              </Text>
            </View>

            {WTC_VENUES.map((v) => (
              <View key={v.id} style={styles.venueCard}>
                <View style={styles.venueHeaderRow}>
                  <Ionicons name="location" size={20} color="#008000" style={{ marginRight: 8 }} />
                  <Text style={styles.venueNameText}>{v.name}</Text>
                </View>

                <View style={styles.venueMetaRow}>
                  <Text style={styles.venueMetaText}>📍 {v.city}, {v.country}</Text>
                  <Text style={styles.venueCapacityText}>🏆 {v.used_for}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* 6. Bottom Ad Banner */}
      <View style={styles.bottomAdBanner}>
        <View style={styles.adIconBox}>
          <View style={styles.adTrophyCircle}>
            <Ionicons name="globe-outline" size={20} color="#0284C7" />
            <View style={styles.adBadgePillGreen}>
              <Text style={styles.adBadgeText}>AD</Text>
            </View>
          </View>
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>Live Test Match Stats</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            Get ball-by-ball updates & WTC Test standings
          </Text>
        </View>

        <TouchableOpacity style={styles.installButton} activeOpacity={0.85}>
          <Text style={styles.installButtonText}>Install</Text>
        </TouchableOpacity>
      </View>
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
  adTrophyCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEF3C7',
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

  /* Hero Leaderboard Strip */
  heroStripContainer: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  heroStripTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#008000',
  },
  leaderboardScroll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleCountPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  teamPillName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginRight: 6,
  },
  trophyPillBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  trophyBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#B45309',
  },

  /* Nav Tabs */
  navTabRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    marginHorizontal: 16,
    marginTop: 10,
    padding: 4,
    borderRadius: 12,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: '#008000',
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  tabBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  /* Edition Card */
  editionCard: {
    backgroundColor: '#ECFDF3',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#16A34A',
    padding: 14,
    marginBottom: 12,
  },
  editionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  hostText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  resultBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  teamWinnerBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  winnerText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#008000',
    marginRight: 6,
  },
  crownPill: {
    fontSize: 9,
    fontWeight: '900',
    color: '#B45309',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
  },
  vsBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#008000',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  vsText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  teamRunnerBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  runnerText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  resultSummaryRow: {
    marginTop: 8,
    alignItems: 'center',
  },
  resultMarginText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  venueLocationText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  pomBadgeBox: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 6,
    marginTop: 8,
    alignItems: 'center',
  },
  pomText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#047857',
  },
  scoreDetailsBox: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },

  /* WTC Cycles Tab */
  cycleCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 14,
    marginBottom: 12,
  },
  cycleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cycleTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusTagOngoing: {
    backgroundColor: '#FEF3C7',
  },
  statusTagCompleted: {
    backgroundColor: '#DCFCE7',
  },
  statusTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
  },
  cycleInfoBox: {
    marginTop: 4,
  },
  cycleInfoText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 16,
    fontWeight: '600',
  },
  cycleWinnerInfoText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#008000',
    marginTop: 6,
  },

  /* Test Nations Tab */
  groupsHeaderNote: {
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  groupsNoteText: {
    fontSize: 12,
    color: '#047857',
    fontWeight: '700',
    lineHeight: 16,
  },
  teamsGridBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#16A34A',
    padding: 12,
  },
  testTeamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  testTeamIndex: {
    fontSize: 14,
    fontWeight: '800',
    color: '#64748B',
    width: 26,
  },
  testTeamName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },

  /* Venues Tab */
  venueCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    marginBottom: 10,
  },
  venueHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  venueNameText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  venueMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  venueMetaText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  venueCapacityText: {
    fontSize: 13,
    color: '#008000',
    fontWeight: '700',
  },
});
