import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Modal,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getIplPointTable } from '../services/cricketApi';
import { TeamFlag } from '../utils/flagHelper';
import { TableSkeleton } from '../components/ShimmerSkeleton';
import EmptyStateView from '../components/EmptyStateView';
import {
  T20_WORLD_CUP_STANDINGS,
  ODI_WORLD_CUP_STANDINGS,
  T20_WORLD_CUP_YEARS,
  ODI_WORLD_CUP_YEARS,
} from '../data/worldCupData';

export default function PointsTableScreen({ onBack }) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pointsTable, setPointsTable] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('ipl'); // 'ipl' | 't20_wc' | 'odi_wc'
  const [selectedYear, setSelectedYear] = useState('2024');
  const [yearDrawerVisible, setYearDrawerVisible] = useState(false);

  const iplYears = [
    '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018',
    '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008'
  ];

  const currentAvailableYears =
    selectedTournament === 'ipl'
      ? iplYears
      : selectedTournament === 't20_wc'
        ? T20_WORLD_CUP_YEARS
        : ODI_WORLD_CUP_YEARS;

  const loadPointsTable = useCallback(async (tournament, yearToFetch, isSilent = false) => {
    const tourney = tournament || selectedTournament;
    const yr = yearToFetch || selectedYear;

    if (!isSilent) setLoading(true);

    if (tourney === 'ipl') {
      try {
        const res = await getIplPointTable(yr);
        setPointsTable(res.pointsTable || []);
      } catch (err) {
        console.warn('IPL Points Table fetch err:', err.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    } else if (tourney === 't20_wc') {
      setTimeout(() => {
        const data = T20_WORLD_CUP_STANDINGS[yr] || T20_WORLD_CUP_STANDINGS['2024'] || [];
        const formatted = data.map((item) => ({
          rank: item.rank,
          team: item.team,
          shortName: item.code || item.team,
          code: item.code,
          logo: item.logo || null,
          played: item.p,
          won: item.w,
          lost: item.l,
          points: item.pts,
          nrr: item.nrr,
        }));
        setPointsTable(formatted);
        setLoading(false);
        setRefreshing(false);
      }, 300);
    } else if (tourney === 'odi_wc') {
      setTimeout(() => {
        const data = ODI_WORLD_CUP_STANDINGS[yr] || ODI_WORLD_CUP_STANDINGS['2023'] || [];
        const formatted = data.map((item) => ({
          rank: item.rank,
          team: item.team,
          shortName: item.code || item.team,
          code: item.code,
          logo: item.logo || null,
          played: item.p,
          won: item.w,
          lost: item.l,
          points: item.pts,
          nrr: item.nrr,
        }));
        setPointsTable(formatted);
        setLoading(false);
        setRefreshing(false);
      }, 300);
    }
  }, [selectedTournament, selectedYear]);

  useEffect(() => {
    loadPointsTable(selectedTournament, selectedYear);
  }, [selectedTournament, selectedYear]);

  const onRefresh = () => {
    setRefreshing(true);
    loadPointsTable(selectedTournament, selectedYear);
  };

  const handleSelectTournament = (tourney) => {
    setSelectedTournament(tourney);
    const defaultYr =
      tourney === 'ipl' ? '2024' : tourney === 't20_wc' ? '2024' : '2023';
    setSelectedYear(defaultYr);
  };

  const onSelectYear = (yr) => {
    setSelectedYear(yr);
    setYearDrawerVisible(false);
  };

  const getTournamentLabel = () => {
    if (selectedTournament === 'ipl') return `IPL ${selectedYear}`;
    if (selectedTournament === 't20_wc') return `T20 World Cup ${selectedYear}`;
    return `ODI World Cup ${selectedYear}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. Header Bar */}
      <View style={styles.topHeaderBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Point Table</Text>

        <TouchableOpacity
          onPress={() => setYearDrawerVisible(true)}
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

      {/* 2. Tournament Segment Selector (IPL | T20 World Cup | ODI World Cup) */}
      <View style={styles.tournamentSegmentRow}>
        <TouchableOpacity
          onPress={() => handleSelectTournament('ipl')}
          style={[
            styles.segmentBtn,
            selectedTournament === 'ipl' && styles.segmentBtnActive,
          ]}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.segmentBtnText,
              selectedTournament === 'ipl' && styles.segmentBtnTextActive,
            ]}
          >
            IPL
          </Text>
        </TouchableOpacity>

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
      </View>

      {/* 3. Top Sub-Header AD Card */}
      <View style={styles.adBannerCard}>
        <View style={styles.adIconBox}>
          <TouchableOpacity onPress={() => setYearDrawerVisible(true)} style={styles.adRedBallCircle}>
            <Ionicons name="baseball" size={18} color="#DC2626" />
            <View style={styles.adBadgePillGreen}>
              <Text style={styles.adBadgeText}>AD</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>Cricket News & Highlights</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            Catch real-time tournament standings & match stats
          </Text>
        </View>

        <TouchableOpacity style={styles.installButton} activeOpacity={0.85}>
          <Text style={styles.installButtonText}>Install</Text>
        </TouchableOpacity>
      </View>

      {/* Season Year Selector Bar Trigger */}
      <View style={styles.yearSelectorRow}>
        <TouchableOpacity
          onPress={() => setYearDrawerVisible(true)}
          style={styles.yearTriggerBtn}
          activeOpacity={0.8}
        >
          <Ionicons name="calendar-outline" size={16} color="#008000" style={{ marginRight: 6 }} />
          <Text style={styles.yearTriggerText}>Season: {getTournamentLabel()}</Text>
          <Ionicons name="chevron-down" size={16} color="#008000" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>

      {/* 4. Main Points Table Content */}
      {loading ? (
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12 }}>
            <ActivityIndicator size="small" color="#008000" style={{ marginRight: 8 }} />
            <Text style={{ color: '#008000', fontSize: 13, fontWeight: '700' }}>
              FETCHING {getTournamentLabel().toUpperCase()} STANDINGS...
            </Text>
          </View>
          <TableSkeleton rows={10} />
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.scrollContent}
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
          {pointsTable.length === 0 ? (
            <EmptyStateView type="general" onRefresh={onRefresh} actionLabel="Reload Standings" />
          ) : (
            <View style={styles.tableContainer}>
              {/* Solid Green Table Header Row */}
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.tableHeaderCell, { flex: 1.8, textAlign: 'left', paddingLeft: 8 }]}>Team</Text>
                <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: 'center' }]}>Loss</Text>
                <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: 'center' }]}>Match</Text>
                <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: 'center' }]}>Points</Text>
                <Text style={[styles.tableHeaderCell, { flex: 1.2, textAlign: 'center' }]}>Nt.Rate</Text>
              </View>

              {/* Table Data Rows */}
              {pointsTable.map((item, idx) => (
                <View key={item.rank || idx} style={styles.tableDataRow}>
                  {/* Team Logo & Code */}
                  <View style={{ flex: 1.8, flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}>
                    <TeamFlag
                      logo={item.logo}
                      teamName={item.team}
                      countryCode={item.shortName}
                      size={24}
                      style={{ marginRight: 6 }}
                    />
                    <Text style={styles.teamCodeText} numberOfLines={1}>
                      {item.shortName || item.team}
                    </Text>
                  </View>

                  <Text style={[styles.tableDataCell, { flex: 1, textAlign: 'center' }]}>
                    {item.lost}
                  </Text>

                  <Text style={[styles.tableDataCell, { flex: 1, textAlign: 'center' }]}>
                    {item.played}
                  </Text>

                  <Text style={[styles.tableDataCell, { flex: 1, textAlign: 'center', fontWeight: '800' }]}>
                    {item.points}
                  </Text>

                  <Text style={[styles.tableDataCell, { flex: 1.2, textAlign: 'center', color: '#334155' }]}>
                    {item.nrr}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}

      {/* Bottom Ad Banner */}
      <View style={styles.bottomAdBanner}>
        <View style={styles.adIconBox}>
          <TouchableOpacity onPress={() => setYearDrawerVisible(true)} style={styles.adRedBallCircle}>
            <Ionicons name="baseball" size={18} color="#DC2626" />
            <View style={styles.adBadgePillGreen}>
              <Text style={styles.adBadgeText}>AD</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>Live Match Stats</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            Get real-time stats and updates for every Cricket
          </Text>
        </View>

        <TouchableOpacity style={styles.installButton} activeOpacity={0.85}>
          <Text style={styles.installButtonText}>Install</Text>
        </TouchableOpacity>
      </View>

      {/* Year Selection Modal Drawer */}
      <Modal
        visible={yearDrawerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setYearDrawerVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setYearDrawerVisible(false)}
        >
          <View style={styles.modalDrawerContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitleText}>
                Select {selectedTournament === 'ipl' ? 'IPL' : selectedTournament === 't20_wc' ? 'T20 World Cup' : 'ODI World Cup'} Season
              </Text>
              <TouchableOpacity onPress={() => setYearDrawerVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
              {currentAvailableYears.map((yr) => {
                const isSelected = selectedYear === yr;
                return (
                  <TouchableOpacity
                    key={yr}
                    onPress={() => onSelectYear(yr)}
                    style={[
                      styles.yearOptionRow,
                      isSelected && styles.yearOptionRowSelected,
                    ]}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.yearOptionText,
                        isSelected && styles.yearOptionTextSelected,
                      ]}
                    >
                      {selectedTournament === 'ipl' ? `IPL ${yr}` : selectedTournament === 't20_wc' ? `T20 World Cup ${yr}` : `ODI World Cup ${yr}`}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={20} color="#008000" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
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
    fontSize: 22,
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
  adIconBox: {
    marginRight: 10,
  },
  adRedBallCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEF2F2',
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

  /* Season Year Trigger Row */
  yearSelectorRow: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  yearTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  yearTriggerText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#008000',
  },

  /* Table Content */
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#008000',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  tableDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#ECFDF3',
  },
  teamCodeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000000',
  },
  tableDataCell: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
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

  /* Modal Drawer */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalDrawerContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    padding: 4,
  },
  yearOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 6,
    backgroundColor: '#F8FAFC',
  },
  yearOptionRowSelected: {
    backgroundColor: '#ECFDF3',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  yearOptionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  yearOptionTextSelected: {
    color: '#008000',
    fontWeight: '800',
  },
});
