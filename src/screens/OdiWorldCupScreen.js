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
  ODI_WC_META,
  ODI_WC_TITLE_COUNTS,
  ODI_WC_EDITIONS,
} from '../data/odiWorldCupFullData';
import { TeamFlag } from '../utils/flagHelper';

export default function OdiWorldCupScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState('finals'); // 'finals' | 'groups' | 'knockouts'
  const [selectedEditionYear, setSelectedEditionYear] = useState(2023);

  const selectedEditionObj = ODI_WC_EDITIONS.find((ed) => ed.year === selectedEditionYear) || ODI_WC_EDITIONS[0];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. Header Bar */}
      <View style={styles.topHeaderBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>ODI World Cup</Text>

        {/* Top Right Circular AD Badge */}
        <TouchableOpacity
          onPress={() => Alert.alert('ODI World Cup', 'Welcome to ODI World Cup Hub!')}
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
          <Text style={styles.adTitle} numberOfLines={1}>ODI World Cup Highlights</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            13 Complete Editions (1975 - 2023) Standings & Finals
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
          <Text style={styles.heroStripTitle}>ODI Champions Leaderboard (13 Editions)</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.leaderboardScroll}>
          {ODI_WC_TITLE_COUNTS.map((item) => (
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

      {/* 4. Sub Navigation Tabs */}
      <View style={styles.navTabRow}>
        <TouchableOpacity
          onPress={() => setActiveTab('finals')}
          style={[styles.tabBtn, activeTab === 'finals' && styles.tabBtnActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'finals' && styles.tabBtnTextActive]}>
            All 13 Finals
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('groups')}
          style={[styles.tabBtn, activeTab === 'groups' && styles.tabBtnActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'groups' && styles.tabBtnTextActive]}>
            Teams & Groups
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('knockouts')}
          style={[styles.tabBtn, activeTab === 'knockouts' && styles.tabBtnActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'knockouts' && styles.tabBtnTextActive]}>
            Knockouts
          </Text>
        </TouchableOpacity>
      </View>

      {/* 5. Main Content Section */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>

        {/* TAB 1: ALL 13 FINALS */}
        {activeTab === 'finals' && (
          <View>
            {ODI_WC_EDITIONS.map((ed) => (
              <View key={ed.year} style={styles.editionCard}>
                <View style={styles.editionHeaderRow}>
                  <View style={styles.yearBadge}>
                    <Ionicons name="ribbon" size={14} color="#F59E0B" style={{ marginRight: 4 }} />
                    <Text style={styles.yearBadgeText}>{ed.year} (Edition {ed.edition})</Text>
                  </View>
                  <Text style={styles.hostText}>Host: {ed.hosts.join(', ')}</Text>
                </View>

                {/* Result Banner */}
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
                  <Text style={styles.resultMarginText}>{ed.final.margin}</Text>
                  <Text style={styles.venueLocationText}>📍 {ed.final.venue}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* TAB 2: TEAMS & GROUPS */}
        {activeTab === 'groups' && (
          <View>
            {/* Year Selector Scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
              {ODI_WC_EDITIONS.map((ed) => {
                const isSelected = selectedEditionYear === ed.year;
                return (
                  <TouchableOpacity
                    key={ed.year}
                    onPress={() => setSelectedEditionYear(ed.year)}
                    style={[styles.yearSelectPill, isSelected && styles.yearSelectPillActive]}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.yearSelectText, isSelected && styles.yearSelectTextActive]}>
                      {ed.year}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.editionOverviewHeader}>
              <Text style={styles.editionOverviewTitle}>
                {selectedEditionObj.year} ODI World Cup ({selectedEditionObj.teams_count} Teams, {selectedEditionObj.matches} Matches)
              </Text>
              <Text style={styles.editionOverviewDates}>Dates: {selectedEditionObj.dates}</Text>
            </View>

            {Object.keys(selectedEditionObj.groups).map((groupKey) => (
              <View key={groupKey} style={styles.groupCard}>
                <View style={styles.groupHeaderBar}>
                  <Text style={styles.groupHeaderText}>{groupKey}</Text>
                  <Text style={styles.groupSubText}>
                    {selectedEditionObj.groups[groupKey].length} Teams
                  </Text>
                </View>

                <View style={styles.groupTeamsList}>
                  {selectedEditionObj.groups[groupKey].map((tName, idx) => (
                    <View key={tName} style={styles.groupTeamRow}>
                      <Text style={styles.groupRankIndex}>{idx + 1}.</Text>
                      <TeamFlag teamName={tName} size={22} style={{ marginRight: 10 }} />
                      <Text style={styles.groupTeamName}>{tName}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* TAB 3: KNOCKOUTS */}
        {activeTab === 'knockouts' && (
          <View>
            {/* Year Selector Scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
              {ODI_WC_EDITIONS.map((ed) => {
                const isSelected = selectedEditionYear === ed.year;
                return (
                  <TouchableOpacity
                    key={ed.year}
                    onPress={() => setSelectedEditionYear(ed.year)}
                    style={[styles.yearSelectPill, isSelected && styles.yearSelectPillActive]}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.yearSelectText, isSelected && styles.yearSelectTextActive]}>
                      {ed.year}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.knockoutContainer}>
              <Text style={styles.knockoutHeaderTitle}>
                {selectedEditionObj.year} Knockout Path
              </Text>

              {/* Quarter Finals if present */}
              {selectedEditionObj.knockouts?.quarter_finals && (
                <View style={styles.stageSection}>
                  <Text style={styles.stageTitle}>Quarter Finals</Text>
                  {selectedEditionObj.knockouts.quarter_finals.map((matchup, idx) => (
                    <View key={idx} style={styles.matchupRow}>
                      <Text style={styles.matchupTeamText}>{matchup[0]}</Text>
                      <View style={styles.vsBadgeSmall}>
                        <Text style={styles.vsBadgeTextSmall}>VS</Text>
                      </View>
                      <Text style={styles.matchupTeamText}>{matchup[1]}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Semi Finals */}
              {selectedEditionObj.knockouts?.semi_finals && (
                <View style={styles.stageSection}>
                  <Text style={styles.stageTitle}>Semi Finals</Text>
                  {selectedEditionObj.knockouts.semi_finals.map((matchup, idx) => (
                    <View key={idx} style={styles.matchupRow}>
                      <Text style={styles.matchupTeamText}>{matchup[0]}</Text>
                      <View style={styles.vsBadgeSmall}>
                        <Text style={styles.vsBadgeTextSmall}>VS</Text>
                      </View>
                      <Text style={styles.matchupTeamText}>{matchup[1]}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Final Match */}
              {selectedEditionObj.final && (
                <View style={styles.finalStageSection}>
                  <Text style={styles.finalStageTitle}>FINAL CHAMPIONSHIP MATCH</Text>
                  <View style={styles.finalMatchBox}>
                    <View style={styles.finalTeamCol}>
                      <TeamFlag teamName={selectedEditionObj.final.winner} size={24} style={{ marginBottom: 4 }} />
                      <Text style={styles.finalWinnerText}>{selectedEditionObj.final.winner}</Text>
                      <Text style={styles.finalCrownText}>CHAMPION 🏆</Text>
                    </View>

                    <Text style={styles.finalVsText}>DEF.</Text>

                    <View style={styles.finalTeamCol}>
                      <TeamFlag teamName={selectedEditionObj.final.runner_up} size={24} style={{ marginBottom: 4 }} />
                      <Text style={styles.finalRunnerText}>{selectedEditionObj.final.runner_up}</Text>
                    </View>
                  </View>
                  <Text style={styles.finalMarginText}>{selectedEditionObj.final.margin}</Text>
                </View>
              )}
            </View>
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
            Get ball-by-ball scores & ODI World Cup stats
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

  /* Year Selector Pills */
  yearSelectPill: {
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  yearSelectPillActive: {
    backgroundColor: '#ECFDF3',
    borderColor: '#16A34A',
  },
  yearSelectText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  yearSelectTextActive: {
    color: '#008000',
    fontWeight: '800',
  },

  editionOverviewHeader: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  editionOverviewTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#008000',
  },
  editionOverviewDates: {
    fontSize: 12,
    color: '#475569',
    marginTop: 4,
    fontWeight: '600',
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

  /* Knockout Tab */
  knockoutContainer: {
    paddingVertical: 4,
  },
  knockoutHeaderTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  stageSection: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    marginBottom: 12,
  },
  stageTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#008000',
    marginBottom: 8,
  },
  matchupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  matchupTeamText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  vsBadgeSmall: {
    backgroundColor: '#008000',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginHorizontal: 8,
  },
  vsBadgeTextSmall: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  finalStageSection: {
    backgroundColor: '#ECFDF3',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#16A34A',
    padding: 14,
    marginTop: 4,
  },
  finalStageTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#008000',
    textAlign: 'center',
    marginBottom: 10,
  },
  finalMatchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
  },
  finalTeamCol: {
    flex: 1,
    alignItems: 'center',
  },
  finalWinnerText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#008000',
  },
  finalCrownText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#B45309',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  finalVsText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#64748B',
    marginHorizontal: 8,
  },
  finalRunnerText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  finalMarginText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginTop: 10,
  },
});
