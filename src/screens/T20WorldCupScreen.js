import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
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
import AdContainer from '../components/AdContainer';

const { width } = Dimensions.get('window');

export default function T20WorldCupScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState('finals'); // 'finals' | 'groups' | 'squads' | 'venues'
  const [selectedSquadTeam, setSelectedSquadTeam] = useState('India');

  const squadTeamList = Object.keys(T20_WC_2026_SQUADS);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. Header Bar */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.headerTitleBox}>
          <Text style={styles.headerTitle}>T20 WORLD CUP</Text>
          <Text style={styles.headerSubtitle}>Official Tournament Hub</Text>
        </View>

        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE LINE</Text>
        </View>
      </View>

      <ScrollView
        style={styles.mainScrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Dynamic Ad Placement Managed via Firebase */}
        <AdContainer screen="t20WorldCup" style={{ marginHorizontal: 16 }} />

        {/* 2. Sleek Modern Hero Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroGradientBg}>
            <View style={styles.heroTopTagRow}>
              <View style={styles.heroBadge}>
                <Ionicons name="trophy" size={13} color="#F59E0B" style={{ marginRight: 4 }} />
                <Text style={styles.heroBadgeText}>ICC T20 WORLD CUP 2026</Text>
              </View>
              <Text style={styles.heroHostText}>🇮🇳 India & 🇱🇰 Sri Lanka</Text>
            </View>

            <Text style={styles.heroTitle}>20 Teams • 55 Matches • 1 Champion</Text>

            {/* Quick Stats Grid */}
            <View style={styles.heroStatsRow}>
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatVal}>10</Text>
                <Text style={styles.heroStatLbl}>Editions</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatVal}>20</Text>
                <Text style={styles.heroStatLbl}>Nations</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatVal}>3🏆</Text>
                <Text style={styles.heroStatLbl}>India (Max)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 3. Champions Leaderboard Carousel */}
        <View style={styles.sectionHeader}>
          <Ionicons name="ribbon" size={18} color="#059669" style={{ marginRight: 6 }} />
          <Text style={styles.sectionTitle}>Trophies Leaderboard</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.leaderboardContainer}
        >
          {T20_WC_TITLE_COUNTS.map((item) => (
            <View key={item.team} style={styles.leaderboardChip}>
              <TeamFlag teamName={item.team} countryCode={item.code} size={22} style={styles.chipFlag} />
              <View style={styles.chipInfo}>
                <Text style={styles.chipTeamName}>{item.team}</Text>
                <Text style={styles.chipTitleCount}>🏆 {item.titles} {item.titles === 1 ? 'Title' : 'Titles'}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* 4. Sub-Navigation Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab('finals')}
            style={[styles.tabBtn, activeTab === 'finals' && styles.tabBtnActive]}
            activeOpacity={0.8}
          >
            <Ionicons
              name="trophy-outline"
              size={16}
              color={activeTab === 'finals' ? '#FFFFFF' : '#64748B'}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.tabText, activeTab === 'finals' && styles.tabTextActive]}>
              Finals
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('groups')}
            style={[styles.tabBtn, activeTab === 'groups' && styles.tabBtnActive]}
            activeOpacity={0.8}
          >
            <Ionicons
              name="grid-outline"
              size={16}
              color={activeTab === 'groups' ? '#FFFFFF' : '#64748B'}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.tabText, activeTab === 'groups' && styles.tabTextActive]}>
              Groups
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('squads')}
            style={[styles.tabBtn, activeTab === 'squads' && styles.tabBtnActive]}
            activeOpacity={0.8}
          >
            <Ionicons
              name="people-outline"
              size={16}
              color={activeTab === 'squads' ? '#FFFFFF' : '#64748B'}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.tabText, activeTab === 'squads' && styles.tabTextActive]}>
              Squads
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('venues')}
            style={[styles.tabBtn, activeTab === 'venues' && styles.tabBtnActive]}
            activeOpacity={0.8}
          >
            <Ionicons
              name="location-outline"
              size={16}
              color={activeTab === 'venues' ? '#FFFFFF' : '#64748B'}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.tabText, activeTab === 'venues' && styles.tabTextActive]}>
              Venues
            </Text>
          </TouchableOpacity>
        </View>

        {/* 5. Tab Views */}

        {/* TAB 1: FINALS HISTORY */}
        {activeTab === 'finals' && (
          <View style={styles.tabContent}>
            {T20_WC_EDITIONS.map((ed) => (
              <View key={ed.id} style={styles.finalsCard}>
                {/* Edition Card Header */}
                <View style={styles.finalsCardHeader}>
                  <View style={styles.yearPill}>
                    <Text style={styles.yearPillText}>{ed.year}</Text>
                  </View>
                  <Text style={styles.editionTag}>Edition #{ed.edition}</Text>
                  <View style={styles.hostPill}>
                    <Ionicons name="earth" size={12} color="#059669" style={{ marginRight: 3 }} />
                    <Text style={styles.hostPillText}>{ed.hosts.join(', ')}</Text>
                  </View>
                </View>

                {/* Match Score Banner */}
                <View style={styles.matchBanner}>
                  {/* Winner Team */}
                  <View style={styles.matchTeamSide}>
                    <TeamFlag teamName={ed.champion} size={28} style={{ marginBottom: 6 }} />
                    <View style={styles.championNameRow}>
                      <Text style={styles.championText}>{ed.champion}</Text>
                      <Ionicons name="trophy" size={14} color="#F59E0B" style={{ marginLeft: 3 }} />
                    </View>
                    <Text style={styles.championBadgeLabel}>WINNER</Text>
                  </View>

                  {/* VS Badge */}
                  <View style={styles.vsContainer}>
                    <View style={styles.vsCircle}>
                      <Text style={styles.vsLabel}>VS</Text>
                    </View>
                    <Text style={styles.finalLabel}>FINAL</Text>
                  </View>

                  {/* Runner-Up Team */}
                  <View style={styles.matchTeamSide}>
                    <TeamFlag teamName={ed.runner_up} size={28} style={{ marginBottom: 6 }} />
                    <Text style={styles.runnerUpText}>{ed.runner_up}</Text>
                    <Text style={styles.runnerUpBadgeLabel}>RUNNER-UP</Text>
                  </View>
                </View>

                {/* Result Description */}
                <View style={styles.resultBox}>
                  <Text style={styles.resultSummaryText}>
                    {ed.final?.result || `${ed.champion} won the tournament`}
                  </Text>
                </View>

                {/* Scores Box if available */}
                {ed.final?.scores && (
                  <View style={styles.scoresGrid}>
                    <View style={styles.scoreRow}>
                      <View style={styles.scoreTeamInfo}>
                        <TeamFlag teamName={ed.champion} size={16} style={{ marginRight: 6 }} />
                        <Text style={styles.scoreTeamName}>{ed.champion}</Text>
                      </View>
                      <Text style={styles.scoreValText}>
                        {ed.final.scores[ed.champion]?.runs}/{ed.final.scores[ed.champion]?.wickets} ({ed.final.scores[ed.champion]?.overs} ov)
                      </Text>
                    </View>

                    <View style={styles.scoreRow}>
                      <View style={styles.scoreTeamInfo}>
                        <TeamFlag teamName={ed.runner_up} size={16} style={{ marginRight: 6 }} />
                        <Text style={styles.scoreTeamName}>{ed.runner_up}</Text>
                      </View>
                      <Text style={styles.scoreValText}>
                        {ed.final.scores[ed.runner_up]?.runs}/{ed.final.scores[ed.runner_up]?.wickets} ({ed.final.scores[ed.runner_up]?.overs} ov)
                      </Text>
                    </View>
                  </View>
                )}

                {/* Venue Footer */}
                {ed.final?.venue && (
                  <View style={styles.venueFooter}>
                    <Ionicons name="location" size={13} color="#64748B" style={{ marginRight: 4 }} />
                    <Text style={styles.venueFooterText}>
                      {ed.final.venue}, {ed.final.city}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* TAB 2: GROUPS */}
        {activeTab === 'groups' && (
          <View style={styles.tabContent}>
            {/* Format Banner */}
            <View style={styles.infoBanner}>
              <Ionicons name="information-circle-outline" size={20} color="#047857" style={{ marginRight: 8 }} />
              <Text style={styles.infoBannerText}>
                20 Nations split across 4 Groups of 5 teams. Top 2 from each group advance to the Super 8s stage.
              </Text>
            </View>

            {Object.keys(T20_WC_2026_GROUPS).map((groupKey) => (
              <View key={groupKey} style={styles.groupCard}>
                <View style={styles.groupHeader}>
                  <View style={styles.groupTitleRow}>
                    <Text style={styles.groupHeaderTitle}>GROUP {groupKey}</Text>
                    <View style={styles.groupBadge}>
                      <Text style={styles.groupBadgeText}>5 TEAMS</Text>
                    </View>
                  </View>
                  <Text style={styles.groupSubHeader}>T20 World Cup 2026</Text>
                </View>

                <View style={styles.groupTeamList}>
                  {T20_WC_2026_GROUPS[groupKey].map((teamName, idx) => (
                    <View
                      key={teamName}
                      style={[
                        styles.groupTeamRow,
                        idx === T20_WC_2026_GROUPS[groupKey].length - 1 && { borderBottomWidth: 0 },
                      ]}
                    >
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankBadgeText}>{idx + 1}</Text>
                      </View>
                      <TeamFlag teamName={teamName} size={24} style={{ marginRight: 12 }} />
                      <Text style={styles.groupTeamNameText}>{teamName}</Text>
                      {idx < 2 && (
                        <View style={styles.qualifyBadge}>
                          <Text style={styles.qualifyBadgeText}>SUPER 8</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* TAB 3: SQUADS */}
        {activeTab === 'squads' && (
          <View style={styles.tabContent}>
            {/* Team Scroll Selector */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.squadTeamSelector}
            >
              {squadTeamList.map((tName) => {
                const isSelected = selectedSquadTeam === tName;
                return (
                  <TouchableOpacity
                    key={tName}
                    onPress={() => setSelectedSquadTeam(tName)}
                    style={[styles.squadTeamChip, isSelected && styles.squadTeamChipActive]}
                    activeOpacity={0.8}
                  >
                    <TeamFlag teamName={tName} size={18} style={{ marginRight: 6 }} />
                    <Text
                      style={[styles.squadTeamChipText, isSelected && styles.squadTeamChipTextActive]}
                    >
                      {tName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Squad Player List Card */}
            <View style={styles.squadContainer}>
              <View style={styles.squadCardTitleBar}>
                <TeamFlag teamName={selectedSquadTeam} size={28} style={{ marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.squadMainTitle}>{selectedSquadTeam} Squad</Text>
                  <Text style={styles.squadSubTitle}>Official 15-Member Roster</Text>
                </View>
                <View style={styles.rosterCountPill}>
                  <Text style={styles.rosterCountText}>15 Players</Text>
                </View>
              </View>

              <View style={styles.playerGrid}>
                {(T20_WC_2026_SQUADS[selectedSquadTeam] || []).map((player, idx) => (
                  <View key={player} style={styles.playerCardRow}>
                    <View style={styles.playerAvatarCircle}>
                      <Text style={styles.playerAvatarText}>{idx + 1}</Text>
                    </View>
                    <Text style={styles.playerNameText}>{player}</Text>

                    {player.includes('(C)') && (
                      <View style={styles.captainPill}>
                        <Text style={styles.captainPillText}>CAPTAIN</Text>
                      </View>
                    )}
                    {player.includes('(WK)') && (
                      <View style={styles.wkPill}>
                        <Text style={styles.wkPillText}>WK</Text>
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
          <View style={styles.tabContent}>
            <View style={styles.infoBanner}>
              <Ionicons name="location-outline" size={20} color="#047857" style={{ marginRight: 8 }} />
              <Text style={styles.infoBannerText}>
                Official Match Venues across Premier Stadiums in India & Sri Lanka.
              </Text>
            </View>

            {T20_WC_2026_VENUES.map((v) => (
              <View key={v.id} style={styles.venueCard}>
                <View style={styles.venueCardHeader}>
                  <View style={styles.venueIconCircle}>
                    <Ionicons name="shield-checkmark" size={18} color="#059669" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.venueNameText}>{v.name}</Text>
                    <Text style={styles.venueCityText}>
                      📍 {v.city}, {v.country}
                    </Text>
                  </View>
                  <View style={styles.capacityPill}>
                    <Ionicons name="people" size={12} color="#047857" style={{ marginRight: 3 }} />
                    <Text style={styles.capacityText}>{v.capacity}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Sleek Live Cricket Updates Banner */}
      <View style={styles.bottomBanner}>
        <View style={styles.bannerIconCircle}>
          <Ionicons name="flash-outline" size={20} color="#059669" />
        </View>

        <View style={styles.bannerTextBox}>
          <Text style={styles.bannerTitle}>T20 World Cup Live Score</Text>
          <Text style={styles.bannerSubtitle}>Real-time ball-by-ball commentary & odds</Text>
        </View>

        <TouchableOpacity style={styles.bannerActionBtn} activeOpacity={0.8}>
          <Text style={styles.bannerActionText}>View Live</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  /* 1. Header Bar */
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleBox: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 1,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#6EE7B7',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
    marginRight: 5,
  },
  liveText: {
    color: '#047857',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  /* Scroll Content */
  mainScrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
  },

  /* 2. Hero Banner */
  heroCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#064E3B',
    elevation: 3,
    shadowColor: '#064E3B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  heroGradientBg: {
    padding: 16,
    backgroundColor: '#047857',
  },
  heroTopTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#064E3B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#059669',
  },
  heroBadgeText: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  heroHostText: {
    color: '#ECFDF5',
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 14,
  },
  heroStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(6, 78, 59, 0.65)',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  heroStatItem: {
    alignItems: 'center',
  },
  heroStatVal: {
    fontSize: 16,
    fontWeight: '900',
    color: '#F59E0B',
  },
  heroStatLbl: {
    fontSize: 10,
    color: '#D1FAE5',
    fontWeight: '600',
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  /* Section Title */
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },

  /* Leaderboard Chips */
  leaderboardContainer: {
    paddingBottom: 12,
  },
  leaderboardChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  chipFlag: {
    marginRight: 8,
  },
  chipInfo: {
    justifyContent: 'center',
  },
  chipTeamName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  chipTitleCount: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
    marginTop: 1,
  },

  /* Tab Buttons */
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 14,
    padding: 4,
    marginVertical: 12,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: '#059669',
    elevation: 2,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  tabContent: {
    marginTop: 4,
  },

  /* Finals Cards */
  finalsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  finalsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  yearPill: {
    backgroundColor: '#059669',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  yearPillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  editionTag: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  hostPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  hostPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },

  /* Match Banner */
  matchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  matchTeamSide: {
    alignItems: 'center',
    flex: 1,
  },
  championNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  championText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#059669',
    textAlign: 'center',
  },
  championBadgeLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  vsContainer: {
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  vsCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsLabel: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  finalLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
    marginTop: 3,
  },
  runnerUpText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#334155',
    textAlign: 'center',
  },
  runnerUpBadgeLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },

  resultBox: {
    marginTop: 12,
    alignItems: 'center',
  },
  resultSummaryText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },

  scoresGrid: {
    marginTop: 10,
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },
  scoreTeamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreTeamName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#064E3B',
  },
  scoreValText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#047857',
  },

  venueFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  venueFooterText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },

  /* Info Banner */
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#6EE7B7',
  },
  infoBannerText: {
    flex: 1,
    fontSize: 12,
    color: '#047857',
    fontWeight: '700',
    lineHeight: 16,
  },

  /* Groups Cards */
  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  groupHeader: {
    backgroundColor: '#064E3B',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  groupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  groupHeaderTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  groupBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  groupBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  groupSubHeader: {
    fontSize: 11,
    color: '#D1FAE5',
    marginTop: 2,
    fontWeight: '600',
  },
  groupTeamList: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  groupTeamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  rankBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rankBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
  },
  groupTeamNameText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  qualifyBadge: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#6EE7B7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  qualifyBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#047857',
  },

  /* Squads Tab */
  squadTeamSelector: {
    paddingBottom: 12,
  },
  squadTeamChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  squadTeamChipActive: {
    backgroundColor: '#059669',
    borderColor: '#047857',
  },
  squadTeamChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  squadTeamChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  squadContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  squadCardTitleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#A7F3D0',
  },
  squadMainTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#064E3B',
  },
  squadSubTitle: {
    fontSize: 11,
    color: '#047857',
    fontWeight: '600',
    marginTop: 1,
  },
  rosterCountPill: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rosterCountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },

  playerGrid: {
    padding: 12,
  },
  playerCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  playerAvatarCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  playerAvatarText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
  },
  playerNameText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  captainPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F59E0B',
    marginLeft: 6,
  },
  captainPillText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#B45309',
  },
  wkPill: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0284C7',
    marginLeft: 4,
  },
  wkPillText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#0369A1',
  },

  /* Venues Tab */
  venueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  venueCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  venueIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  venueNameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  venueCityText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  capacityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  capacityText: {
    fontSize: 11,
    color: '#047857',
    fontWeight: '800',
  },

  /* Bottom Live Score Banner */
  bottomBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  bannerIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  bannerTextBox: {
    flex: 1,
    marginRight: 8,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  bannerSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  bannerActionBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bannerActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
