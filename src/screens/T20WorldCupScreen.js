import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  T20_WC_META,
  T20_WC_TITLE_COUNTS,
  T20_WC_EDITIONS,
  T20_WC_2026_GROUPS,
  T20_WC_2026_SQUADS,
  T20_WC_2026_VENUES,
} from '../data/t20WorldCupFullData';
import { TeamFlag } from '../utils/flagHelper';

export default function T20WorldCupScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState('finals'); // 'finals' | 'groups' | 'squads' | 'venues'
  const [selectedSquadTeam, setSelectedSquadTeam] = useState('India');

  const squadTeamList = Object.keys(T20_WC_2026_SQUADS);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. Header Bar */}
      <View style={styles.topHeaderBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>T20 World Cup</Text>

        {/* Top Right Circular AD Badge */}
        <TouchableOpacity
          onPress={() => Alert.alert('T20 World Cup', 'Welcome to T20 World Cup Hub!')}
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
          <Text style={styles.adTitle} numberOfLines={1}>T20 World Cup Highlights</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            Full history, Groups & Squads
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
          <Text style={styles.heroStripTitle}>Champions Leaderboard (10 Editions)</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.leaderboardScroll}>
          {T20_WC_TITLE_COUNTS.map((item) => (
            <View key={item.team} style={styles.titleCountPill}>
              <TeamFlag teamName={item.team} countryCode={item.code} size={18} style={{ marginRight: 6 }} />
              <Text style={styles.teamPillName}>{item.team}</Text>
              <View style={styles.trophyPillBadge}>
                <Text style={styles.trophyBadgeText}>🏆 {item.titles}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 4. Sub Navigation Tabs (Champions | Groups | Squads | Venues) */}
      <View style={styles.navTabRow}>
        <TouchableOpacity
          onPress={() => setActiveTab('finals')}
          style={[styles.tabBtn, activeTab === 'finals' && styles.tabBtnActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'finals' && styles.tabBtnTextActive]}>
            Finals
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('groups')}
          style={[styles.tabBtn, activeTab === 'groups' && styles.tabBtnActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'groups' && styles.tabBtnTextActive]}>
            Groups
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('squads')}
          style={[styles.tabBtn, activeTab === 'squads' && styles.tabBtnActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'squads' && styles.tabBtnTextActive]}>
            Squads
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

      {/* 5. Main Content Section based on Active Tab */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>

        {/* TAB 1: FINALS & EDITIONS HISTORY */}
        {activeTab === 'finals' && (
          <View>
            {T20_WC_EDITIONS.map((ed) => (
              <View key={ed.id} style={styles.editionCard}>
                <View style={styles.editionHeaderRow}>
                  <View style={styles.yearBadge}>
                    <Ionicons name="ribbon" size={14} color="#F59E0B" style={{ marginRight: 4 }} />
                    <Text style={styles.yearBadgeText}>{ed.year} (Edition {ed.edition})</Text>
                  </View>
                  <Text style={styles.hostText}>Host: {ed.hosts.join(', ')}</Text>
                </View>

                {/* Match Result Banner */}
                <View style={styles.resultBanner}>
                  <View style={styles.teamWinnerBox}>
                    <TeamFlag teamName={ed.champion} size={20} style={{ marginRight: 6 }} />
                    <Text style={styles.winnerText}>{ed.champion}</Text>
                    <Text style={styles.crownPill}>WINNER 🏆</Text>
                  </View>

                  <View style={styles.vsBadge}>
                    <Text style={styles.vsText}>VS</Text>
                  </View>

                  <View style={styles.teamRunnerBox}>
                    <TeamFlag teamName={ed.runner_up} size={20} style={{ marginRight: 6 }} />
                    <Text style={styles.runnerText}>{ed.runner_up}</Text>
                  </View>
                </View>

                <View style={styles.resultSummaryRow}>
                  <Text style={styles.resultMarginText}>
                    {ed.final?.result || `${ed.champion} won the tournament`}
                  </Text>
                  {ed.final?.venue && (
                    <Text style={styles.venueLocationText}>
                      📍 {ed.final.venue}, {ed.final.city}
                    </Text>
                  )}
                </View>

                {/* Scores if available (e.g. Final) */}
                {ed.final?.scores && (
                  <View style={styles.scoreDetailsBox}>
                    <Text style={styles.scoreText}>
                      🇮🇳 India: {ed.final.scores.India.runs}/{ed.final.scores.India.wickets} ({ed.final.scores.India.overs} ov)
                    </Text>
                    <Text style={styles.scoreText}>
                      🇳🇿 New Zealand: {ed.final.scores['New Zealand'].runs}/{ed.final.scores['New Zealand'].wickets} ({ed.final.scores['New Zealand'].overs} ov)
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* TAB 2: GROUPS */}
        {activeTab === 'groups' && (
          <View style={styles.groupsContainer}>
            <View style={styles.groupsHeaderNote}>
              <Text style={styles.groupsNoteText}>
                T20 World Cup Format: 20 Teams split into 4 Groups. Top 2 from each group advance to Super 8.
              </Text>
            </View>

            {Object.keys(T20_WC_2026_GROUPS).map((groupKey) => (
              <View key={groupKey} style={styles.groupCard}>
                <View style={styles.groupHeaderBar}>
                  <Text style={styles.groupHeaderText}>Group {groupKey}</Text>
                  <Text style={styles.groupSubText}>5 Teams</Text>
                </View>

                <View style={styles.groupTeamsList}>
                  {T20_WC_2026_GROUPS[groupKey].map((teamName, idx) => (
                    <View key={teamName} style={styles.groupTeamRow}>
                      <Text style={styles.groupRankIndex}>{idx + 1}.</Text>
                      <TeamFlag teamName={teamName} size={22} style={{ marginRight: 10 }} />
                      <Text style={styles.groupTeamName}>{teamName}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* TAB 3: SQUADS */}
        {activeTab === 'squads' && (
          <View>
            {/* Squad Team Selector Scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
              {squadTeamList.map((tName) => {
                const isSelected = selectedSquadTeam === tName;
                return (
                  <TouchableOpacity
                    key={tName}
                    onPress={() => setSelectedSquadTeam(tName)}
                    style={[styles.teamSelectPill, isSelected && styles.teamSelectPillActive]}
                    activeOpacity={0.8}
                  >
                    <TeamFlag teamName={tName} size={18} style={{ marginRight: 6 }} />
                    <Text style={[styles.teamSelectText, isSelected && styles.teamSelectTextActive]}>
                      {tName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Squad List Box */}
            <View style={styles.squadCardContainer}>
              <View style={styles.squadCardHeader}>
                <TeamFlag teamName={selectedSquadTeam} size={26} style={{ marginRight: 10 }} />
                <Text style={styles.squadCardTitle}>{selectedSquadTeam} Squad</Text>
                <Text style={styles.squadCountBadge}>15 Players</Text>
              </View>

              <View style={styles.squadPlayerList}>
                {(T20_WC_2026_SQUADS[selectedSquadTeam] || []).map((player, idx) => (
                  <View key={player} style={styles.squadPlayerRow}>
                    <View style={styles.playerNumCircle}>
                      <Text style={styles.playerNumText}>{idx + 1}</Text>
                    </View>
                    <Text style={styles.playerNameText}>{player}</Text>
                    {player.includes('(C)') && (
                      <View style={styles.captainBadge}>
                        <Text style={styles.captainBadgeText}>CAPTAIN</Text>
                      </View>
                    )}
                    {player.includes('(WK)') && (
                      <View style={styles.wkBadge}>
                        <Text style={styles.wkBadgeText}>WK</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* TAB 4: VENUES */}
        {activeTab === 'venues' && (
          <View>
            <View style={styles.groupsHeaderNote}>
              <Text style={styles.groupsNoteText}>
                T20 World Cup Venues: Host Grounds across India & Sri Lanka.
              </Text>
            </View>

            {T20_WC_2026_VENUES.map((v) => (
              <View key={v.id} style={styles.venueCard}>
                <View style={styles.venueHeaderRow}>
                  <Ionicons name="location" size={20} color="#008000" style={{ marginRight: 8 }} />
                  <Text style={styles.venueNameText}>{v.name}</Text>
                </View>

                <View style={styles.venueMetaRow}>
                  <Text style={styles.venueMetaText}>📍 {v.city}, {v.country}</Text>
                  <Text style={styles.venueCapacityText}>🏟️ Capacity: {v.capacity}</Text>
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
          <Text style={styles.adTitle} numberOfLines={1}>Live Cricket Updates</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            Get ball-by-ball scores & T20 World Cup stats
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

  /* Top & Bottom Sub-Header AD Card */
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
  scoreDetailsBox: {
    marginTop: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#047857',
  },

  /* Groups Tab */
  groupsContainer: {
    paddingVertical: 2,
  },
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
  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#CBD5E1',
    marginBottom: 12,
    overflow: 'hidden',
  },
  groupHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#056E2B',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  groupHeaderText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  groupSubText: {
    fontSize: 12,
    color: '#DCFCE7',
    fontWeight: '600',
  },
  groupTeamsList: {
    padding: 10,
  },
  groupTeamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  groupRankIndex: {
    fontSize: 14,
    fontWeight: '800',
    color: '#64748B',
    width: 24,
  },
  groupTeamName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },

  /* Squads Tab */
  teamSelectPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  teamSelectPillActive: {
    backgroundColor: '#ECFDF3',
    borderColor: '#16A34A',
  },
  teamSelectText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  teamSelectTextActive: {
    color: '#008000',
    fontWeight: '800',
  },
  squadCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#16A34A',
    overflow: 'hidden',
  },
  squadCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF3',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#A7F3D0',
  },
  squadCardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#008000',
    flex: 1,
  },
  squadCountBadge: {
    backgroundColor: '#056E2B',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  squadPlayerList: {
    padding: 12,
  },
  squadPlayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  playerNumCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  playerNumText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
  },
  playerNameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  captainBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  captainBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#B45309',
  },
  wkBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0284C7',
    marginLeft: 4,
  },
  wkBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#0369A1',
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
