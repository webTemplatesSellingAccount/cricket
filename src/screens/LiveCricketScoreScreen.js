import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Share,
  Alert,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import MatchesHistoryScreen from './MatchesHistoryScreen';
import PlayoffsScreen from './PlayoffsScreen';
import AllRecordsScreen from './AllRecordsScreen';
import T20WorldCupScreen from './T20WorldCupScreen';
import OdiWorldCupScreen from './OdiWorldCupScreen';
import WorldTestChampionshipScreen from './WorldTestChampionshipScreen';
import {
  VENUES_DATA,
  COUNTRY_FILTERS,
  PITCH_TYPES,
  CAPACITY_RANGES,
  SORT_OPTIONS,
} from '../data/venuesData';

// --- Enhanced Transparent Artwork Graphic Components ---

// 1. Top Green Hero Banner - Left Side 3D Cricket Equipment Artwork
const HeroCricketArt = () => (
  <View style={artStyles.heroContainer}>
    {/* Glow Background Circle */}
    <View style={artStyles.heroGlowCircle} />

    {/* Golden Trophy */}
    <View style={artStyles.trophyWrap}>
      <Ionicons name="trophy" size={44} color="#FFD700" />
    </View>

    {/* Wooden Bat */}
    <View style={artStyles.batWrap}>
      <MaterialCommunityIcons name="cricket" size={52} color="#F59E0B" />
    </View>

    {/* 3 Stumps with Bails */}
    <View style={artStyles.stumpsWrap}>
      <View style={artStyles.bailsTop} />
      <View style={artStyles.stumpBarRow}>
        <View style={artStyles.stumpBar} />
        <View style={artStyles.stumpBar} />
        <View style={artStyles.stumpBar} />
      </View>
    </View>

    {/* Shiny Red Cricket Ball with Seam */}
    <View style={artStyles.ballRed}>
      <View style={artStyles.ballSeam} />
    </View>
  </View>
);

// 2. Cricketer Batsman Graphic for IPL Schedule Card (Transparent BG matching reference image)
const BatsmanArt = () => (
  <View style={artStyles.batsmanContainer}>
    {/* Floating Red Cricket Ball with Seam & Motion Trail */}
    <View style={artStyles.batsmanBallGroup}>
      <View style={artStyles.batsmanRedBall}>
        <View style={artStyles.batsmanBallSeam} />
        <View style={artStyles.batsmanBallGlow} />
      </View>
      <View style={artStyles.batsmanBallMotionLine} />
    </View>

    {/* Cricketer Batsman Figure in Action Stance */}
    <View style={artStyles.batsmanFigure}>
      {/* Helmet & Visor */}
      <View style={artStyles.helmetHead}>
        <View style={artStyles.helmetGridVisor} />
      </View>
      {/* Upper Torso / Jersey */}
      <View style={artStyles.jerseyTorso}>
        <View style={artStyles.jerseyCollar} />
      </View>
      {/* Wooden Bat */}
      <View style={artStyles.cricketBatShape}>
        <View style={artStyles.batHandle} />
      </View>
      {/* Legs & Batting Pads */}
      <View style={artStyles.battingPads}>
        <View style={artStyles.padLegLeft} />
        <View style={artStyles.padLegRight} />
      </View>
    </View>
  </View>
);

// 3. Wickets & Flying Bails & Pink Ball Graphic for Play Game Cards (Transparent BG matching reference image)
const WicketsGameArt = () => (
  <View style={artStyles.wicketsContainer}>
    {/* Flying Bails floating at top angle */}
    <View style={artStyles.bailsFlyRow}>
      <View style={[artStyles.bailBar, { transform: [{ rotate: '-35deg' }], marginRight: 4 }]} />
      <View style={[artStyles.bailBar, { transform: [{ rotate: '25deg' }] }]} />
    </View>

    {/* 3 Golden Stumps */}
    <View style={artStyles.stumpsGroup}>
      <View style={artStyles.stumpBar} />
      <View style={artStyles.stumpBar} />
      <View style={artStyles.stumpBar} />
    </View>

    {/* Bright Pink Cricket Ball with Seam & Speed Lines */}
    <View style={artStyles.pinkBallGroup}>
      <View style={artStyles.pinkBallCore}>
        <View style={artStyles.pinkBallWhiteSeam} />
        <View style={artStyles.pinkBallGloss} />
      </View>
      {/* Motion curves */}
      <View style={artStyles.speedCurveTop} />
      <View style={artStyles.speedCurveBottom} />
    </View>

    {/* Oval Green Grass Patch Base */}
    <View style={artStyles.grassTurfPatch} />
  </View>
);

// 4. Stadium Graphic for Venues Card (Transparent BG)
const StadiumArt = () => (
  <View style={artStyles.stadiumContainer}>
    <View style={artStyles.stadiumBowl}>
      <View style={artStyles.pitchField}>
        <View style={artStyles.pitchStrip} />
      </View>
      <View style={artStyles.flagRow}>
        <Ionicons name="flag" size={10} color="#EF4444" />
        <Ionicons name="flag" size={10} color="#3B82F6" />
        <Ionicons name="flag" size={10} color="#10B981" />
      </View>
    </View>
  </View>
);

// 5. Podium Graphic for Point Table Card (Transparent BG)
const PodiumArt = () => (
  <View style={artStyles.podiumContainer}>
    <View style={artStyles.medalWrap}>
      <Ionicons name="star" size={16} color="#FFD700" />
    </View>
    <View style={artStyles.podiumRow}>
      <View style={[artStyles.podiumBox, { height: 18, backgroundColor: '#3B82F6' }]}>
        <Text style={artStyles.podiumNum}>2</Text>
      </View>
      <View style={[artStyles.podiumBox, { height: 26, backgroundColor: '#EF4444' }]}>
        <Text style={artStyles.podiumNum}>1</Text>
      </View>
      <View style={[artStyles.podiumBox, { height: 14, backgroundColor: '#10B981' }]}>
        <Text style={artStyles.podiumNum}>3</Text>
      </View>
    </View>
  </View>
);

// 6. Yellow File Folder Graphic for All Records Card (Transparent BG)
const FolderArt = () => (
  <View style={artStyles.folderContainer}>
    <View style={artStyles.folderTab} />
    <View style={artStyles.folderBack}>
      <View style={artStyles.folderPaper} />
      <View style={artStyles.folderFront}>
        <View style={artStyles.folderFaceRow}>
          <View style={artStyles.folderEye} />
          <View style={artStyles.folderEye} />
        </View>
        <View style={artStyles.folderSmile} />
      </View>
    </View>
  </View>
);

// 7. Certificate Ribbon Graphic for Playoff History Card (Transparent BG)
const PlayoffCertificateArt = () => (
  <View style={artStyles.certContainer}>
    <View style={artStyles.certSheet}>
      <View style={artStyles.certLineLong} />
      <View style={artStyles.certLineShort} />
      <View style={artStyles.certLineShort} />
      <View style={artStyles.certRibbonBadge}>
        <Ionicons name="ribbon" size={15} color="#F59E0B" />
      </View>
    </View>
  </View>
);

export default function LiveCricketScoreScreen({
  onBack = () => {},
  onNavigateToSchedule = () => {},
  onNavigateToMatches = () => {},
  onNavigateToTable = () => {},
  onNavigateToTab = () => {},
}) {
  const [currentSubScreen, setCurrentSubScreen] = useState(null); // 'records' | 'playoffs'
  const [venuesModalVisible, setVenuesModalVisible] = useState(false);
  const [gameModalVisible, setGameModalVisible] = useState(false);

  // Venue Filter & Search State
  const [venueSearchQuery, setVenueSearchQuery] = useState('');
  const [venueSelectedCountry, setVenueSelectedCountry] = useState('all');
  const [venueSelectedPitch, setVenueSelectedPitch] = useState('All Pitches');
  const [venueSelectedCapacity, setVenueSelectedCapacity] = useState('all');
  const [venueSortBy, setVenueSortBy] = useState('default');
  const [selectedVenueDetail, setSelectedVenueDetail] = useState(null);
  const [showVenueFilterModal, setShowVenueFilterModal] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState({});

  const handleImageError = (id) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  // Calculate stadium count per country for badges
  const countryCounts = useMemo(() => {
    const counts = { all: VENUES_DATA.length };
    VENUES_DATA.forEach((v) => {
      counts[v.country] = (counts[v.country] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter & sort stadium list
  const filteredVenues = useMemo(() => {
    return VENUES_DATA.filter((venue) => {
      // 1. Search Query
      if (venueSearchQuery.trim()) {
        const q = venueSearchQuery.toLowerCase().trim();
        const matchName = venue.name.toLowerCase().includes(q);
        const matchCity = venue.city.toLowerCase().includes(q);
        const matchCountry = venue.country.toLowerCase().includes(q);
        if (!matchName && !matchCity && !matchCountry) return false;
      }
      // 2. Country Filter
      if (
        venueSelectedCountry !== 'all' &&
        venue.country.toLowerCase() !== venueSelectedCountry.toLowerCase()
      ) {
        return false;
      }
      // 3. Pitch Type Filter
      if (venueSelectedPitch !== 'All Pitches' && venue.pitchType !== venueSelectedPitch) {
        return false;
      }
      // 4. Capacity Filter
      if (venueSelectedCapacity === 'above_50k' && venue.capacityNum < 50000) return false;
      if (
        venueSelectedCapacity === '30k_50k' &&
        (venue.capacityNum < 30000 || venue.capacityNum > 50000)
      )
        return false;
      if (venueSelectedCapacity === 'under_30k' && venue.capacityNum >= 30000) return false;

      return true;
    }).sort((a, b) => {
      if (venueSortBy === 'capacity_desc') return b.capacityNum - a.capacityNum;
      if (venueSortBy === 'capacity_asc') return a.capacityNum - b.capacityNum;
      if (venueSortBy === 'name_asc') return a.name.localeCompare(b.name);
      if (venueSortBy === 'opened_asc') return parseInt(a.opened) - parseInt(b.opened);
      return 0;
    });
  }, [venueSearchQuery, venueSelectedCountry, venueSelectedPitch, venueSelectedCapacity, venueSortBy]);

  const hasActiveVenueFilters =
    venueSearchQuery.trim() !== '' ||
    venueSelectedCountry !== 'all' ||
    venueSelectedPitch !== 'All Pitches' ||
    venueSelectedCapacity !== 'all' ||
    venueSortBy !== 'default';

  const resetVenueFilters = () => {
    setVenueSearchQuery('');
    setVenueSelectedCountry('all');
    setVenueSelectedPitch('All Pitches');
    setVenueSelectedCapacity('all');
    setVenueSortBy('default');
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message:
          'Download Live Cricket Score App for fastest live scores, IPL schedule, ball-by-ball updates, points table, and records!',
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'Live Cricket Score respects user privacy. No personal data is stored or shared with third parties.'
    );
  };

  const handlePlayGame = () => {
    setGameModalVisible(true);
  };

  if (currentSubScreen === 'records') {
    return <AllRecordsScreen onBack={() => setCurrentSubScreen(null)} />;
  }

  if (currentSubScreen === 'playoffs') {
    return <PlayoffsScreen onBack={() => setCurrentSubScreen(null)} />;
  }

  if (currentSubScreen === 't20wc') {
    return <T20WorldCupScreen onBack={() => setCurrentSubScreen(null)} />;
  }

  if (currentSubScreen === 'odiwc') {
    return <OdiWorldCupScreen onBack={() => setCurrentSubScreen(null)} />;
  }

  if (currentSubScreen === 'wtc') {
    return <WorldTestChampionshipScreen onBack={() => setCurrentSubScreen(null)} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. Header Matching Screenshots */}
      <View style={styles.topHeaderBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Live Cricket Score</Text>

        {/* Top Right Sleek Live Badge */}
        <View style={styles.topRightLiveBadge}>
          <Ionicons name="flash" size={13} color="#059669" style={{ marginRight: 3 }} />
          <Text style={styles.topRightLiveText}>LIVE LINE</Text>
        </View>
      </View>

      {/* 2. Top Sub-Header Showcase Card */}
      <View style={styles.adBannerCard}>
        <View style={styles.adIconBox}>
          <View style={styles.adPinCircle}>
            <Ionicons name="location" size={18} color="#0284C7" />
          </View>
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>IPL News & Updates</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            Stay updated with real-time IPL scores & series stats
          </Text>
        </View>

        <View style={styles.installButton}>
          <Text style={styles.installButtonText}>Explore</Text>
        </View>
      </View>

      {/* 3. Main Scrollable Content */}
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner 1: Vibrant Green Live Cricket Score Hero Banner */}
        <View style={styles.greenHeroCard}>
          {/* Enhanced 3D Left Cricket Image */}
          <HeroCricketArt />

          {/* Right Text Content */}
          <View style={styles.heroRightBox}>
            <Text style={styles.heroTitle}>Live Cricket Score</Text>
            <Text style={styles.heroSubtitle}>
              Get up to the minute updates on matches from ground
            </Text>

            <TouchableOpacity
              onPress={() => onNavigateToTab && onNavigateToTab('home')}
              style={styles.goToScoreBtn}
              activeOpacity={0.85}
            >
              <Text style={styles.goToScoreText}>Go To Score</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner 2: Grey Card - Cricket Match Stats */}
        <View style={styles.featureAdContainer}>
          <View style={styles.adHeaderRow}>
            <View style={styles.adHeaderAvatar}>
              <Ionicons name="person" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.adHeaderTexts}>
              <Text style={styles.featureAdTitle}>Cricket Match Stats</Text>
              <Text style={styles.featureAdSubtitle} numberOfLines={1}>
                Live scores, ball-by-ball commentary & run rates!
              </Text>
            </View>
          </View>

          <View style={styles.featureImageWrapper}>
            <Image
              source={require('../../assets/welcome_ad_banner.jpg')}
              style={styles.featureImage}
              resizeMode="cover"
            />
          </View>

          <TouchableOpacity
            onPress={() => onNavigateToTab && onNavigateToTab('news')}
            style={styles.greenActionBtn}
            activeOpacity={0.85}
          >
            <Text style={styles.greenActionBtnText}>View Match Stats</Text>
          </TouchableOpacity>
        </View>

        {/* Section 3: 2-Column Grid Cards (Light Green BG #F4FBF6, Solid Green Border #008000) */}
        <View style={styles.gridContainer}>
          {/* Grid Item 1: IPL Schedule */}
          <TouchableOpacity
            onPress={onNavigateToSchedule}
            style={styles.gridCard}
            activeOpacity={0.85}
          >
            <Text style={styles.gridTitle}>IPL Schedule</Text>
            <Text style={styles.gridSubtitle}>
              All IPL match in date, time schedules
            </Text>
            <View style={styles.gridArtWrapper}>
              <BatsmanArt />
            </View>
          </TouchableOpacity>

          {/* Grid Item 2: Cricket Match Stats */}
          <TouchableOpacity
            onPress={() => (onNavigateToMatches ? onNavigateToMatches() : onNavigateToTab && onNavigateToTab('matches'))}
            style={styles.gridCard}
            activeOpacity={0.85}
          >
            <Text style={styles.gridTitle}>Match Stats</Text>
            <Text style={styles.gridSubtitle}>Live scores, run rates & match stats</Text>
            <View style={styles.gridArtWrapper}>
              <MaterialCommunityIcons name="cricket" size={36} color="#008000" />
            </View>
          </TouchableOpacity>

          {/* Grid Item 3: World Cup Hub */}
          <TouchableOpacity
            onPress={() => setCurrentSubScreen('t20wc')}
            style={styles.gridCard}
            activeOpacity={0.85}
          >
            <Text style={styles.gridTitle}>World Cup Hub</Text>
            <Text style={styles.gridSubtitle}>T20 & ODI WC standings & stats</Text>
            <View style={styles.gridArtWrapper}>
              <Ionicons name="trophy" size={36} color="#D97706" />
            </View>
          </TouchableOpacity>

          {/* Grid Item 4: Venues */}
          <TouchableOpacity
            onPress={() => setVenuesModalVisible(true)}
            style={styles.gridCard}
            activeOpacity={0.85}
          >
            <Text style={styles.gridTitle}>Venues</Text>
            <Text style={styles.gridSubtitle}>
              Check all match in location display
            </Text>
            <View style={styles.gridArtWrapper}>
              <StadiumArt />
            </View>
          </TouchableOpacity>
        </View>

        {/* Section 4: Full-width Horizontal Card - Point Table */}
        <TouchableOpacity
          onPress={() => (onNavigateToTable ? onNavigateToTable() : onNavigateToTab && onNavigateToTab('series', 'table'))}
          style={styles.horizontalCard}
          activeOpacity={0.85}
        >
          <View style={styles.horizontalLeft}>
            <PodiumArt />
            <Text style={styles.horizontalTitle}>Point Table</Text>
          </View>

          <View style={styles.greenChevronSquare}>
            <Ionicons name="chevron-forward-sharp" size={14} color="#FFFFFF" style={{ marginLeft: -1 }} />
            <Ionicons name="chevron-forward-sharp" size={14} color="#FFFFFF" style={{ marginLeft: -8 }} />
          </View>
        </TouchableOpacity>

        {/* Section 5: Full-width Horizontal Card - All Records */}
        <TouchableOpacity
          onPress={() => setCurrentSubScreen('records')}
          style={styles.horizontalCard}
          activeOpacity={0.85}
        >
          <View style={styles.horizontalLeft}>
            <FolderArt />
            <Text style={[styles.horizontalTitle, { marginLeft: 16 }]}>All Records</Text>
          </View>

          <View style={styles.greenChevronSquare}>
            <Ionicons name="chevron-forward-sharp" size={14} color="#FFFFFF" style={{ marginLeft: -1 }} />
            <Ionicons name="chevron-forward-sharp" size={14} color="#FFFFFF" style={{ marginLeft: -8 }} />
          </View>
        </TouchableOpacity>

        {/* Section 6: Grey Card - IPL News */}
        <View style={styles.featureAdContainer}>
          <View style={styles.adHeaderRow}>
            <View style={styles.adRedBallCircle}>
              <Ionicons name="baseball" size={18} color="#DC2626" />
            </View>
            <View style={styles.adHeaderTexts}>
              <Text style={styles.featureAdTitle}>IPL News</Text>
              <Text style={styles.featureAdSubtitle} numberOfLines={1}>
                Stay updated with the latest IPL news and
              </Text>
            </View>
          </View>

          <View style={styles.featureImageWrapper}>
            <Image
              source={require('../../assets/welcome_hero_art.jpg')}
              style={styles.featureImage}
              resizeMode="cover"
            />
          </View>

          <TouchableOpacity
            onPress={() => onNavigateToTab && onNavigateToTab('news')}
            style={styles.greenActionBtn}
            activeOpacity={0.85}
          >
            <Text style={styles.greenActionBtnText}>Read More</Text>
          </TouchableOpacity>
        </View>

        {/* Section 7: Full-width Horizontal Card - World Cup History */}
        <TouchableOpacity
          onPress={() => setCurrentSubScreen('playoffs')}
          style={styles.horizontalCard}
          activeOpacity={0.85}
        >
          <View style={styles.horizontalLeft}>
            <Ionicons name="ribbon" size={26} color="#F59E0B" />
            <Text style={[styles.horizontalTitle, { marginLeft: 16 }]}>World Cup History</Text>
          </View>

          <View style={styles.greenChevronSquare}>
            <Ionicons name="chevron-forward-sharp" size={14} color="#FFFFFF" style={{ marginLeft: -1 }} />
            <Ionicons name="chevron-forward-sharp" size={14} color="#FFFFFF" style={{ marginLeft: -8 }} />
          </View>
        </TouchableOpacity>

        {/* Section 8: Full-width Horizontal Card - Playoff History */}
        <TouchableOpacity
          onPress={() => setCurrentSubScreen('playoffs')}
          style={styles.horizontalCard}
          activeOpacity={0.85}
        >
          <View style={styles.horizontalLeft}>
            <PlayoffCertificateArt />
            <Text style={[styles.horizontalTitle, { marginLeft: 16 }]}>Playoff History</Text>
          </View>

          <View style={styles.greenChevronSquare}>
            <Ionicons name="chevron-forward-sharp" size={14} color="#FFFFFF" style={{ marginLeft: -1 }} />
            <Ionicons name="chevron-forward-sharp" size={14} color="#FFFFFF" style={{ marginLeft: -8 }} />
          </View>
        </TouchableOpacity>

        {/* Section 9: Bottom Row Action Buttons */}
        <View style={styles.bottomButtonsRow}>
          <TouchableOpacity
            onPress={handleShareApp}
            style={styles.actionPillButton}
            activeOpacity={0.85}
          >
            <Text style={styles.actionPillText}>Share App</Text>
            <View style={styles.actionIconCircle}>
              <Ionicons name="share-social" size={15} color="#007A3B" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePrivacyPolicy}
            style={styles.actionPillButton}
            activeOpacity={0.85}
          >
            <View style={styles.actionIconCircleLeft}>
              <Ionicons name="shield-checkmark" size={15} color="#007A3B" />
            </View>
            <Text style={styles.actionPillText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 4. Fixed Bottom Sticky AD Banner */}
      <View style={styles.bottomAdBanner}>
        <View style={styles.adIconBox}>
          <View style={styles.adBallBlueCircle}>
            <Ionicons name="baseball" size={20} color="#0284C7" />
            <View style={styles.adTagPillCyan}>
              <Text style={styles.adTagText}>AD</Text>
            </View>
          </View>
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>Live Match Stats</Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            Get real-time stats and updates for every Cricket
          </Text>
        </View>

        <View style={styles.installButton}>
          <Text style={styles.installButtonText}>View Live</Text>
        </View>
      </View>

      {/* Venues Screen / Modal Matching Screenshots 2 & 4 */}
      <Modal visible={venuesModalVisible} animationType="slide" transparent={false} onRequestClose={() => setVenuesModalVisible(false)}>
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

          {/* Top Header Bar */}
          <View style={styles.topHeaderBar}>
            <TouchableOpacity onPress={() => setVenuesModalVisible(false)} style={styles.backButton} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={28} color="#000000" />
            </TouchableOpacity>

            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.headerTitle}>Stadium Venues</Text>
            </View>

            {/* Filter Options Modal Button */}
            <TouchableOpacity
              onPress={() => setShowVenueFilterModal(true)}
              style={[venueCardStyles.topFilterBtn, hasActiveVenueFilters && venueCardStyles.topFilterBtnActive]}
              activeOpacity={0.8}
            >
              <Ionicons name="options-outline" size={19} color={hasActiveVenueFilters ? '#FFFFFF' : '#0F172A'} />
              <Text style={[venueCardStyles.topFilterBtnText, hasActiveVenueFilters && { color: '#FFFFFF' }]}>Filters</Text>
              {hasActiveVenueFilters && <View style={venueCardStyles.filterBadgeDot} />}
            </TouchableOpacity>
          </View>

          {/* Search Bar Input */}
          <View style={venueCardStyles.searchBarContainer}>
            <Ionicons name="search-outline" size={18} color="#64748B" style={{ marginRight: 8 }} />
            <TextInput
              style={venueCardStyles.searchInput}
              placeholder="Search stadium, city or country..."
              placeholderTextColor="#94A3B8"
              value={venueSearchQuery}
              onChangeText={setVenueSearchQuery}
            />
            {venueSearchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setVenueSearchQuery('')} style={{ padding: 2 }}>
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>

          {/* Country Filter Pill Horizontal Bar */}
          <View style={venueCardStyles.countryBarWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 4 }}>
              {COUNTRY_FILTERS.map((item) => {
                const count = item.id === 'all' ? countryCounts.all : countryCounts[item.id] || 0;
                const isSelected = venueSelectedCountry.toLowerCase() === item.id.toLowerCase();
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => setVenueSelectedCountry(item.id)}
                    style={[venueCardStyles.countryPill, isSelected && venueCardStyles.countryPillSelected]}
                    activeOpacity={0.8}
                  >
                    <Text style={{ fontSize: 13, marginRight: 4 }}>{item.flag}</Text>
                    <Text style={[venueCardStyles.countryPillLabel, isSelected && venueCardStyles.countryPillLabelSelected]}>
                      {item.label}
                    </Text>
                    <View style={[venueCardStyles.countBadge, isSelected && venueCardStyles.countBadgeSelected]}>
                      <Text style={[venueCardStyles.countBadgeText, isSelected && venueCardStyles.countBadgeTextSelected]}>
                        {count}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Pitch Type Filter Chips */}
          <View style={venueCardStyles.subFilterBar}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
              {PITCH_TYPES.map((pt) => {
                const isSelected = venueSelectedPitch === pt;
                return (
                  <TouchableOpacity
                    key={pt}
                    onPress={() => setVenueSelectedPitch(pt)}
                    style={[venueCardStyles.pitchChip, isSelected && venueCardStyles.pitchChipSelected]}
                    activeOpacity={0.8}
                  >
                    <Text style={[venueCardStyles.pitchChipText, isSelected && venueCardStyles.pitchChipTextSelected]}>
                      {pt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Active Filter Summary Bar */}
          {hasActiveVenueFilters && (
            <View style={venueCardStyles.activeFilterRow}>
              <Text style={venueCardStyles.activeFilterText}>
                Filters active ({filteredVenues.length} results)
              </Text>
              <TouchableOpacity onPress={resetVenueFilters} style={venueCardStyles.resetBtn}>
                <Ionicons name="refresh-outline" size={14} color="#DC2626" />
                <Text style={venueCardStyles.resetBtnText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Sub-Header AD Card */}
          <View style={styles.adBannerCard}>
            <View style={styles.adIconBox}>
              <View style={styles.adRedBallCircle}>
                <Ionicons name="baseball" size={18} color="#DC2626" />
              </View>
            </View>

            <View style={styles.adTextBox}>
              <Text style={styles.adTitle} numberOfLines={1}>Live Match Stats</Text>
              <Text style={styles.adSubtitle} numberOfLines={1}>
                Ball-by-ball scores, run rates & match telemetry!
              </Text>
            </View>

            <View style={styles.installButton}>
              <Text style={styles.installButtonText}>View Live</Text>
            </View>
          </View>

          {/* Venues List or Empty State */}
          {filteredVenues.length === 0 ? (
            <View style={venueCardStyles.emptyContainer}>
              <Ionicons name="search" size={48} color="#94A3B8" />
              <Text style={venueCardStyles.emptyTitle}>No Stadiums Match Your Filter</Text>
              <Text style={venueCardStyles.emptySubtitle}>Try adjusting your search term, pitch type or country selection.</Text>
              <TouchableOpacity onPress={resetVenueFilters} style={venueCardStyles.emptyResetBtn}>
                <Text style={venueCardStyles.emptyResetBtnText}>Reset All Filters</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
              {filteredVenues.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={venueCardStyles.cardContainer}
                  activeOpacity={0.9}
                  onPress={() => setSelectedVenueDetail(item)}
                >
                  {/* Green Stadium Header Banner */}
                  <View style={venueCardStyles.headerBanner}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <Text style={{ fontSize: 16, marginRight: 6 }}>{item.flag}</Text>
                      <Text style={venueCardStyles.headerBannerText} numberOfLines={1}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={venueCardStyles.cityPillHeader}>
                      <Text style={venueCardStyles.cityPillHeaderText}>{item.city}</Text>
                    </View>
                  </View>

                  {/* Stadium Image with Badges */}
                  <View style={venueCardStyles.imageWrapper}>
                    <Image
                      source={
                        imageErrorMap[item.id] || !item.image
                          ? require('../../assets/venues/narendra_modi_stadium.jpg')
                          : (typeof item.image === 'string' ? { uri: item.image } : item.image)
                      }
                      style={venueCardStyles.stadiumImage}
                      resizeMode="cover"
                      onError={() => handleImageError(item.id)}
                    />

                    {/* Pitch Type Tag Overlay */}
                    <View style={venueCardStyles.pitchTagOverlay}>
                      <Ionicons name="flash-outline" size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
                      <Text style={venueCardStyles.pitchTagOverlayText}>{item.pitchType}</Text>
                    </View>

                    {/* Country Tag Overlay */}
                    <View style={venueCardStyles.countryTagOverlay}>
                      <Text style={venueCardStyles.countryTagOverlayText}>{item.flag} {item.country}</Text>
                    </View>
                  </View>

                  {/* Opened & Capacity Info Bar */}
                  <View style={venueCardStyles.infoRow}>
                    <View style={venueCardStyles.infoBox}>
                      <Text style={venueCardStyles.infoLabelText}>Opened</Text>
                      <Text style={venueCardStyles.infoValText}>{item.opened}</Text>
                    </View>
                    <View style={venueCardStyles.infoDivider} />
                    <View style={venueCardStyles.infoBox}>
                      <Text style={venueCardStyles.infoLabelText}>Capacity</Text>
                      <Text style={venueCardStyles.infoValText}>{item.capacity}</Text>
                    </View>
                    <View style={venueCardStyles.infoDivider} />
                    <View style={venueCardStyles.infoBox}>
                      <Text style={venueCardStyles.infoLabelText}>Floodlights</Text>
                      <Text style={venueCardStyles.infoValText}>{item.floodlights ? 'Yes 💡' : 'No'}</Text>
                    </View>
                  </View>

                  {/* Footer Teams & Detail CTA Bar */}
                  <View style={venueCardStyles.cardFooterRow}>
                    <Text style={venueCardStyles.footerTeamsText} numberOfLines={1}>
                      🏟️ {item.homeTeams}
                    </Text>
                    <View style={venueCardStyles.detailsBtn}>
                      <Text style={venueCardStyles.detailsBtnText}>Details</Text>
                      <Ionicons name="chevron-forward" size={13} color="#008000" />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Bottom AD Banner */}
          <View style={styles.bottomAdBanner}>
            <View style={styles.adIconBox}>
              <View style={styles.adBallBlueCircle}>
                <Ionicons name="baseball" size={20} color="#0284C7" />
              </View>
            </View>

            <View style={styles.adTextBox}>
              <Text style={styles.adTitle} numberOfLines={1}>IPL News</Text>
              <Text style={styles.adSubtitle} numberOfLines={1}>
                Stay updated with the latest IPL news and
              </Text>
            </View>

            <View style={styles.installButton}>
              <Text style={styles.installButtonText}>View Live</Text>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Additional Filters Modal (Capacity & Sort Options) */}
      <Modal visible={showVenueFilterModal} animationType="fade" transparent={true} onRequestClose={() => setShowVenueFilterModal(false)}>
        <TouchableOpacity
          style={modalStyles.overlay}
          activeOpacity={1}
          onPress={() => setShowVenueFilterModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={venueFilterModalStyles.modalContent}
            onPress={(e) => {
              if (e && e.stopPropagation) e.stopPropagation();
            }}
          >
            {/* Header */}
            <View style={venueFilterModalStyles.modalHeader}>
              <View style={venueFilterModalStyles.headerTitleBox}>
                <View style={venueFilterModalStyles.headerIconBadge}>
                  <Ionicons name="options-sharp" size={18} color="#008000" />
                </View>
                <View>
                  <Text style={venueFilterModalStyles.headerTitle}>Filter & Sort Stadiums</Text>
                  <Text style={venueFilterModalStyles.headerSubtitle}>Customize pitch condition, capacity & sorting</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setShowVenueFilterModal(false)}
                style={venueFilterModalStyles.closeBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 8 }} contentContainerStyle={{ paddingBottom: 10 }}>
              {/* Pitch Condition Section */}
              <View style={venueFilterModalStyles.sectionHeaderRow}>
                <Ionicons name="flash" size={14} color="#008000" style={{ marginRight: 6 }} />
                <Text style={venueFilterModalStyles.sectionTitle}>PITCH CONDITION</Text>
              </View>
              <View style={venueFilterModalStyles.chipsWrap}>
                {PITCH_TYPES.map((pt) => {
                  const isSel = venueSelectedPitch === pt;
                  return (
                    <TouchableOpacity
                      key={pt}
                      onPress={() => setVenueSelectedPitch(pt)}
                      style={[venueFilterModalStyles.pitchChip, isSel && venueFilterModalStyles.pitchChipSelected]}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name={isSel ? 'checkmark-circle' : 'ellipse-outline'}
                        size={14}
                        color={isSel ? '#FFFFFF' : '#64748B'}
                        style={{ marginRight: 4 }}
                      />
                      <Text style={[venueFilterModalStyles.pitchChipText, isSel && venueFilterModalStyles.pitchChipTextSelected]}>
                        {pt}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Seating Capacity Section */}
              <View style={[venueFilterModalStyles.sectionHeaderRow, { marginTop: 18 }]}>
                <Ionicons name="people" size={14} color="#008000" style={{ marginRight: 6 }} />
                <Text style={venueFilterModalStyles.sectionTitle}>SEATING CAPACITY</Text>
              </View>
              <View style={venueFilterModalStyles.gridOptions}>
                {CAPACITY_RANGES.map((cap) => {
                  const isSel = venueSelectedCapacity === cap.id;
                  return (
                    <TouchableOpacity
                      key={cap.id}
                      onPress={() => setVenueSelectedCapacity(cap.id)}
                      style={[venueFilterModalStyles.gridCardOption, isSel && venueFilterModalStyles.gridCardOptionSelected]}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name={isSel ? 'radio-button-on' : 'radio-button-off'}
                        size={16}
                        color={isSel ? '#008000' : '#94A3B8'}
                        style={{ marginRight: 8 }}
                      />
                      <Text style={[venueFilterModalStyles.gridOptionText, isSel && venueFilterModalStyles.gridOptionTextSelected]}>
                        {cap.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Sorting Section */}
              <View style={[venueFilterModalStyles.sectionHeaderRow, { marginTop: 18 }]}>
                <Ionicons name="swap-vertical" size={14} color="#008000" style={{ marginRight: 6 }} />
                <Text style={venueFilterModalStyles.sectionTitle}>SORT STADIUMS BY</Text>
              </View>
              <View style={venueFilterModalStyles.gridOptions}>
                {SORT_OPTIONS.map((opt) => {
                  const isSel = venueSortBy === opt.id;
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      onPress={() => setVenueSortBy(opt.id)}
                      style={[venueFilterModalStyles.gridCardOption, isSel && venueFilterModalStyles.gridCardOptionSelected]}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name={isSel ? 'checkmark-circle' : 'ellipse-outline'}
                        size={16}
                        color={isSel ? '#008000' : '#94A3B8'}
                        style={{ marginRight: 8 }}
                      />
                      <Text style={[venueFilterModalStyles.gridOptionText, isSel && venueFilterModalStyles.gridOptionTextSelected]}>
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            {/* Sticky Action Footer Row */}
            <View style={venueFilterModalStyles.footerActionRow}>
              <TouchableOpacity
                onPress={resetVenueFilters}
                style={venueFilterModalStyles.resetBtn}
                activeOpacity={0.8}
              >
                <Ionicons name="refresh-sharp" size={16} color="#DC2626" style={{ marginRight: 4 }} />
                <Text style={venueFilterModalStyles.resetBtnText}>Reset All</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowVenueFilterModal(false)}
                style={venueFilterModalStyles.applyBtn}
                activeOpacity={0.85}
              >
                <Text style={venueFilterModalStyles.applyBtnText}>Apply Filters</Text>
                <Ionicons name="checkmark-circle-sharp" size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Stadium Detail Popup Sheet / Modal */}
      <Modal visible={!!selectedVenueDetail} animationType="slide" transparent={true} onRequestClose={() => setSelectedVenueDetail(null)}>
        <TouchableOpacity
          style={modalStyles.overlay}
          activeOpacity={1}
          onPress={() => setSelectedVenueDetail(null)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={venueDetailModalStyles.modalContent}
            onPress={(e) => {
              if (e && e.stopPropagation) e.stopPropagation();
            }}
          >
            {selectedVenueDetail && (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16 }}>
                {/* Detail Header Image with Badges */}
                <View style={venueDetailModalStyles.heroHeader}>
                  <Image
                    source={
                      imageErrorMap[selectedVenueDetail.id] || !selectedVenueDetail.image
                        ? require('../../assets/venues/narendra_modi_stadium.jpg')
                        : (typeof selectedVenueDetail.image === 'string' ? { uri: selectedVenueDetail.image } : selectedVenueDetail.image)
                    }
                    style={venueDetailModalStyles.heroImage}
                    resizeMode="cover"
                    onError={() => handleImageError(selectedVenueDetail.id)}
                  />

                  {/* Gradient Backdrops / Badges */}
                  <View style={venueDetailModalStyles.topCloseOverlay}>
                    <TouchableOpacity
                      onPress={() => setSelectedVenueDetail(null)}
                      style={venueDetailModalStyles.closeGlassBtn}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="close" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>

                  <View style={venueDetailModalStyles.bottomFlagOverlay}>
                    <Text style={venueDetailModalStyles.bottomFlagText}>
                      {selectedVenueDetail.flag} {selectedVenueDetail.country}
                    </Text>
                  </View>

                  <View style={venueDetailModalStyles.pitchBadgeOverlay}>
                    <Ionicons name="flash-sharp" size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
                    <Text style={venueDetailModalStyles.pitchBadgeOverlayText}>{selectedVenueDetail.pitchType}</Text>
                  </View>
                </View>

                {/* Detail Content Body */}
                <View style={venueDetailModalStyles.bodyPadding}>
                  {/* Title & City Location */}
                  <Text style={venueDetailModalStyles.stadiumTitle}>{selectedVenueDetail.name}</Text>

                  <View style={venueDetailModalStyles.locationRow}>
                    <Ionicons name="location-sharp" size={16} color="#008000" style={{ marginRight: 4 }} />
                    <Text style={venueDetailModalStyles.locationText}>
                      {selectedVenueDetail.city}, {selectedVenueDetail.country}
                    </Text>
                    <View style={venueDetailModalStyles.openedPill}>
                      <Text style={venueDetailModalStyles.openedPillText}>🏛️ Opened {selectedVenueDetail.opened}</Text>
                    </View>
                  </View>

                  {/* Description Box with Left Border Accent */}
                  <View style={venueDetailModalStyles.descriptionCard}>
                    <Text style={venueDetailModalStyles.descriptionText}>
                      {selectedVenueDetail.description}
                    </Text>
                  </View>

                  {/* 3 Columns Stat Boxes */}
                  <View style={venueDetailModalStyles.statGrid3}>
                    <View style={venueDetailModalStyles.statCardItem}>
                      <Ionicons name="calendar-outline" size={18} color="#008000" style={{ marginBottom: 4 }} />
                      <Text style={venueDetailModalStyles.statLabel}>ESTABLISHED</Text>
                      <Text style={venueDetailModalStyles.statValue}>{selectedVenueDetail.opened}</Text>
                    </View>

                    <View style={venueDetailModalStyles.statDivider} />

                    <View style={venueDetailModalStyles.statCardItem}>
                      <Ionicons name="people-outline" size={18} color="#008000" style={{ marginBottom: 4 }} />
                      <Text style={venueDetailModalStyles.statLabel}>CAPACITY</Text>
                      <Text style={venueDetailModalStyles.statValue}>{selectedVenueDetail.capacity}</Text>
                    </View>

                    <View style={venueDetailModalStyles.statDivider} />

                    <View style={venueDetailModalStyles.statCardItem}>
                      <Ionicons name="flash-outline" size={18} color="#008000" style={{ marginBottom: 4 }} />
                      <Text style={venueDetailModalStyles.statLabel}>LIGHTING</Text>
                      <Text style={venueDetailModalStyles.statValue}>{selectedVenueDetail.floodlights ? 'LED Rings 💡' : 'Standard'}</Text>
                    </View>
                  </View>

                  {/* Comprehensive Specifications Box */}
                  <View style={venueDetailModalStyles.specificationsBox}>
                    <View style={venueDetailModalStyles.specRow}>
                      <View style={venueDetailModalStyles.specIconBox}>
                        <Ionicons name="people-sharp" size={16} color="#008000" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={venueDetailModalStyles.specTitle}>Home Teams</Text>
                        <Text style={venueDetailModalStyles.specDesc}>{selectedVenueDetail.homeTeams}</Text>
                      </View>
                    </View>

                    <View style={venueDetailModalStyles.specRow}>
                      <View style={venueDetailModalStyles.specIconBox}>
                        <Ionicons name="compass-sharp" size={16} color="#008000" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={venueDetailModalStyles.specTitle}>Bowling Ends</Text>
                        <Text style={venueDetailModalStyles.specDesc}>{selectedVenueDetail.ends}</Text>
                      </View>
                    </View>

                    <View style={venueDetailModalStyles.specRow}>
                      <View style={venueDetailModalStyles.specIconBox}>
                        <Ionicons name="trophy-sharp" size={16} color="#008000" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={venueDetailModalStyles.specTitle}>Highest Recorded Score</Text>
                        <Text style={venueDetailModalStyles.specDescHighlight}>{selectedVenueDetail.highestTotal}</Text>
                      </View>
                    </View>

                    <View style={venueDetailModalStyles.specRow}>
                      <View style={venueDetailModalStyles.specIconBox}>
                        <Ionicons name="star-sharp" size={16} color="#008000" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={venueDetailModalStyles.specTitle}>Iconic Historic Match</Text>
                        <Text style={venueDetailModalStyles.specDesc}>{selectedVenueDetail.iconicMatch}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Responsive Action Buttons Row */}
                  <View style={venueDetailModalStyles.footerButtonRow}>
                    <TouchableOpacity
                      onPress={() => setSelectedVenueDetail(null)}
                      style={venueDetailModalStyles.closeCTA}
                      activeOpacity={0.85}
                    >
                      <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                      <Text style={venueDetailModalStyles.closeCTAText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Cricket Game Trivia Modal */}
      <Modal visible={gameModalVisible} animationType="fade" transparent={true}>
        <View style={modalStyles.overlay}>
          <View style={modalStyles.content}>
            <View style={modalStyles.header}>
              <Text style={modalStyles.title}>Cricket Trivia Quiz</Text>
              <TouchableOpacity onPress={() => setGameModalVisible(false)}>
                <Ionicons name="close-circle" size={26} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              <Ionicons name="game-controller" size={54} color="#007A3B" />
              <Text style={{ fontSize: 18, fontWeight: '800', marginTop: 12, color: '#0F172A' }}>
                Play & Win Cricket Quiz!
              </Text>
              <Text style={{ fontSize: 13, color: '#64748B', textAlign: 'center', marginTop: 6, paddingHorizontal: 20 }}>
                Test your IPL cricket knowledge with 10 fun questions and win trophies!
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setGameModalVisible(false);
                  Alert.alert('Quiz Started', 'Question 1: Who won the first IPL season in 2008?\n\nAnswer: Rajasthan Royals');
                }}
                style={[styles.greenActionBtn, { width: '80%', marginTop: 20 }]}
              >
                <Text style={styles.greenActionBtnText}>Start Game Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// --- Artwork Styles ---
const artStyles = StyleSheet.create({
  heroContainer: {
    width: 96,
    height: 96,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroGlowCircle: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  trophyWrap: {
    position: 'absolute',
    top: 4,
    left: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  batWrap: {
    position: 'absolute',
    bottom: 2,
    right: 0,
    transform: [{ rotate: '-28deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  stumpsWrap: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    alignItems: 'center',
  },
  bailsTop: {
    width: 18,
    height: 3,
    backgroundColor: '#FEF08A',
    borderRadius: 1.5,
    marginBottom: 1,
  },
  stumpBarRow: {
    flexDirection: 'row',
    gap: 3.5,
  },
  stumpBar: {
    width: 3.5,
    height: 34,
    backgroundColor: '#FEF08A',
    borderRadius: 2,
  },
  ballRed: {
    position: 'absolute',
    top: 36,
    right: 28,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#991B1B',
  },
  ballSeam: {
    width: 14,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  batsmanContainer: {
    width: 56,
    height: 54,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  batsmanBallGroup: {
    position: 'absolute',
    top: 4,
    left: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  batsmanRedBall: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#EF4444',
    borderWidth: 1,
    borderColor: '#B91C1C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  batsmanBallSeam: {
    width: 12,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  batsmanBallGlow: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FCA5A5',
    position: 'absolute',
    top: 2,
    right: 2,
  },
  batsmanBallMotionLine: {
    width: 12,
    height: 2,
    backgroundColor: '#EF4444',
    opacity: 0.5,
    borderRadius: 1,
    marginTop: 2,
  },
  batsmanFigure: {
    width: 42,
    height: 46,
    position: 'relative',
    alignItems: 'center',
  },
  helmetHead: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#475569',
    borderWidth: 1,
    borderColor: '#1E293B',
    position: 'relative',
    zIndex: 3,
  },
  helmetGridVisor: {
    width: 8,
    height: 3,
    backgroundColor: '#94A3B8',
    position: 'absolute',
    bottom: 3,
    left: 1,
    borderRadius: 1,
  },
  jerseyTorso: {
    width: 22,
    height: 18,
    backgroundColor: '#CBD5E1',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginTop: -2,
    position: 'relative',
    zIndex: 2,
  },
  jerseyCollar: {
    width: 10,
    height: 3,
    backgroundColor: '#38BDF8',
    alignSelf: 'center',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  cricketBatShape: {
    width: 7,
    height: 26,
    backgroundColor: '#F59E0B',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#D97706',
    position: 'absolute',
    right: -4,
    top: 8,
    transform: [{ rotate: '-35deg' }],
    zIndex: 4,
  },
  batHandle: {
    width: 3,
    height: 8,
    backgroundColor: '#1E293B',
    alignSelf: 'center',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },
  battingPads: {
    flexDirection: 'row',
    gap: 2,
    marginTop: -2,
    zIndex: 1,
  },
  padLegLeft: {
    width: 9,
    height: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  padLegRight: {
    width: 9,
    height: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  wicketsContainer: {
    width: 54,
    height: 50,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bailsFlyRow: {
    flexDirection: 'row',
    position: 'absolute',
    top: 2,
    alignSelf: 'center',
    zIndex: 3,
  },
  bailBar: {
    width: 10,
    height: 3,
    backgroundColor: '#FBBF24',
    borderRadius: 1.5,
    borderWidth: 0.5,
    borderColor: '#D97706',
  },
  stumpsGroup: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
    zIndex: 2,
  },
  stumpBar: {
    width: 4,
    height: 30,
    backgroundColor: '#F59E0B',
    borderRadius: 2,
    borderWidth: 0.8,
    borderColor: '#D97706',
  },
  pinkBallGroup: {
    position: 'absolute',
    top: 10,
    right: -2,
    zIndex: 4,
    alignItems: 'center',
  },
  pinkBallCore: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: '#EC4899',
    borderWidth: 1,
    borderColor: '#BE185D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinkBallWhiteSeam: {
    width: 14,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    transform: [{ rotate: '-35deg' }],
  },
  pinkBallGloss: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FBCFE8',
    position: 'absolute',
    top: 2,
    right: 2,
  },
  speedCurveTop: {
    width: 12,
    height: 2,
    backgroundColor: '#EC4899',
    opacity: 0.7,
    borderRadius: 1,
    marginTop: 2,
    transform: [{ rotate: '15deg' }],
  },
  speedCurveBottom: {
    width: 9,
    height: 2,
    backgroundColor: '#EC4899',
    opacity: 0.4,
    borderRadius: 1,
    marginTop: 2,
    transform: [{ rotate: '15deg' }],
  },
  grassTurfPatch: {
    width: 48,
    height: 6,
    backgroundColor: '#22C55E',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#16A34A',
    zIndex: 1,
  },
  stadiumContainer: {
    width: 48,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stadiumBowl: {
    width: 44,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E2E8F0',
    borderWidth: 2,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pitchField: {
    width: 26,
    height: 14,
    backgroundColor: '#86EFAC',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pitchStrip: {
    width: 14,
    height: 4,
    backgroundColor: '#FEF08A',
    borderRadius: 1,
  },
  flagRow: {
    position: 'absolute',
    top: -9,
    flexDirection: 'row',
    gap: 4,
  },
  podiumContainer: {
    width: 40,
    height: 38,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  medalWrap: {
    position: 'absolute',
    top: 0,
  },
  podiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2.5,
  },
  podiumBox: {
    width: 11,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  podiumNum: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: '900',
  },
  folderContainer: {
    width: 40,
    height: 36,
    position: 'relative',
  },
  folderTab: {
    width: 16,
    height: 4,
    backgroundColor: '#F59E0B',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  folderBack: {
    width: 38,
    height: 30,
    backgroundColor: '#FBBF24',
    borderRadius: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  folderPaper: {
    width: 30,
    height: 20,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 2,
    borderRadius: 2,
  },
  folderFront: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: '#F59E0B',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  folderFaceRow: {
    flexDirection: 'row',
    gap: 4,
  },
  folderEye: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#78350F',
  },
  folderSmile: {
    width: 7,
    height: 2,
    backgroundColor: '#78350F',
    borderRadius: 1,
    marginTop: 1,
  },
  certContainer: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  certSheet: {
    width: 34,
    height: 36,
    backgroundColor: '#E0F2FE',
    borderWidth: 1.5,
    borderColor: '#38BDF8',
    borderRadius: 6,
    padding: 4,
    position: 'relative',
  },
  certLineLong: {
    width: 22,
    height: 3,
    backgroundColor: '#0284C7',
    borderRadius: 1.5,
    marginBottom: 3,
  },
  certLineShort: {
    width: 15,
    height: 3,
    backgroundColor: '#0284C7',
    borderRadius: 1.5,
    marginBottom: 3,
  },
  certRibbonBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topHeaderBar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
    textAlign: 'center',
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

  /* Top Sub Header Banner */
  adBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#008000',
  },
  adIconBox: {
    marginRight: 10,
  },
  adPinCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  adTagPill: {
    position: 'absolute',
    top: -2,
    left: -2,
    backgroundColor: '#16A34A',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 5,
  },
  adTagText: {
    fontSize: 7,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  adTextBox: {
    flex: 1,
    marginRight: 8,
  },
  adTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 1,
  },
  adSubtitle: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '500',
  },
  installButton: {
    backgroundColor: '#008000',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  installButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  /* Scroll Content */
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollInner: {
    paddingTop: 4,
    paddingBottom: 24,
  },

  /* Hero Green Card */
  greenHeroCard: {
    backgroundColor: '#008000',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#008000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  heroRightBox: {
    flex: 1,
    marginLeft: 14,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  heroSubtitle: {
    color: '#E6F4EA',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 12,
  },
  goToScoreBtn: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  goToScoreText: {
    color: '#008000',
    fontSize: 13,
    fontWeight: '900',
  },

  /* Feature AD Container (Grey Container) */
  featureAdContainer: {
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 14,
  },
  adHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  adHeaderAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginRight: 10,
  },
  adRedBallCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginRight: 10,
  },
  adBadgePillGreen: {
    position: 'absolute',
    top: -2,
    left: -2,
    backgroundColor: '#16A34A',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 5,
  },
  adBadgeText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: '900',
  },
  adHeaderTexts: {
    flex: 1,
  },
  featureAdTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#000000',
  },
  featureAdSubtitle: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '500',
  },
  featureImageWrapper: {
    width: '100%',
    height: 145,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  featureImage: {
    width: '100%',
    height: '100%',
  },
  greenActionBtn: {
    width: '100%',
    backgroundColor: '#008000',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenActionBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  /* 2-Column Grid Cards (Light Green Tint BG #ECFDF3, Solid Green Border #15803D) */
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '48.5%',
    height: 148,
    backgroundColor: '#ECFDF3',
    borderWidth: 1.5,
    borderColor: '#15803D',
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
    position: 'relative',
    justifyContent: 'space-between',
  },
  gridAdPill: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#15803D',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
    zIndex: 2,
  },
  gridAdText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 2,
  },
  gridSubtitle: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '500',
    lineHeight: 14,
  },
  gridArtWrapper: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },

  /* Horizontal Full Cards (Point Table, Play Game, All Records, Playoff History) - Light Green BG #ECFDF3 */
  horizontalCard: {
    backgroundColor: '#ECFDF3',
    borderWidth: 1.5,
    borderColor: '#15803D',
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  horizontalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
    marginLeft: 14,
  },
  greenChevronSquare: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#008000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAdTagGreen: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#16A34A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  cardAdTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },

  /* Bottom Row Buttons */
  bottomButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 16,
  },
  actionPillButton: {
    width: '48.5%',
    height: 44,
    backgroundColor: '#008000',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  actionPillText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginHorizontal: 6,
  },
  actionIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconCircleLeft: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Bottom Sticky AD Banner */
  bottomAdBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  adBallBlueCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  adTagPillCyan: {
    position: 'absolute',
    top: -2,
    left: -2,
    backgroundColor: '#0284C7',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 5,
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  venueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  venueIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  venueName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  venueCity: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
});

const venueCardStyles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#008000',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  headerBanner: {
    backgroundColor: '#008000',
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBannerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  cityPillHeader: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  cityPillHeaderText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  imageWrapper: {
    width: '100%',
    height: 180,
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  stadiumImage: {
    width: '100%',
    height: '100%',
  },
  pitchTagOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pitchTagOverlayText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  countryTagOverlay: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 128, 0, 0.9)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  countryTagOverlayText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
  },
  infoDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#CBD5E1',
  },
  infoLabelText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  footerTeamsText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    flex: 1,
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  detailsBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#008000',
    marginRight: 2,
  },

  /* Search & Filter Header Components */
  topFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    position: 'relative',
  },
  topFilterBtnActive: {
    backgroundColor: '#008000',
    borderColor: '#008000',
  },
  topFilterBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 4,
  },
  filterBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    position: 'absolute',
    top: -2,
    right: -2,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    marginHorizontal: 14,
    marginTop: 8,
    marginBottom: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    padding: 0,
  },
  countryBarWrapper: {
    marginBottom: 4,
  },
  countryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
  },
  countryPillSelected: {
    backgroundColor: '#008000',
    borderColor: '#008000',
    shadowColor: '#008000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  countryPillLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginRight: 6,
  },
  countryPillLabelSelected: {
    color: '#FFFFFF',
  },
  countBadge: {
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  countBadgeSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#334155',
  },
  countBadgeTextSelected: {
    color: '#FFFFFF',
  },
  subFilterBar: {
    marginBottom: 6,
  },
  pitchChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pitchChipSelected: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  pitchChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  pitchChipTextSelected: {
    color: '#FFFFFF',
  },
  activeFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 6,
  },
  activeFilterText: {
    fontSize: 12,
    color: '#008000',
    fontWeight: '700',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#DC2626',
    marginLeft: 3,
  },

  /* Empty State */
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  emptyResetBtn: {
    backgroundColor: '#008000',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 14,
  },
  emptyResetBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  /* Filter Modal Options */
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  filterOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterGridOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  filterGridOptionSelected: {
    backgroundColor: '#DCFCE7',
    borderColor: '#008000',
  },
  filterGridOptionText: {
    fontSize: 12,
    color: '#475569',
  },

  /* Venue Detail Sheet Styles */
  detailStatsBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 12,
    marginTop: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  detailStatItem: {
    alignItems: 'center',
  },
  detailStatLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  detailStatVal: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 2,
  },
  detailInfoCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailRowLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
    width: 100,
  },
  detailRowValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
  },
});

const venueFilterModalStyles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 14,
  },
  headerTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
    fontWeight: '600',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#334155',
    letterSpacing: 0.6,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pitchChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
  },
  pitchChipSelected: {
    backgroundColor: '#008000',
    borderColor: '#008000',
    elevation: 2,
  },
  pitchChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  pitchChipTextSelected: {
    color: '#FFFFFF',
  },
  gridOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridCardOption: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48.5%',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
  },
  gridCardOptionSelected: {
    backgroundColor: '#F0FDF4',
    borderColor: '#008000',
  },
  gridOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    flex: 1,
  },
  gridOptionTextSelected: {
    color: '#008000',
    fontWeight: '800',
  },
  footerActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  resetBtnText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '800',
  },
  applyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#008000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#008000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});

const venueDetailModalStyles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    maxHeight: '90%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  heroHeader: {
    height: 210,
    width: '100%',
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  topCloseOverlay: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 10,
  },
  closeGlassBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  bottomFlagOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    backgroundColor: '#008000',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomFlagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  pitchBadgeOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  pitchBadgeOverlayText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  bodyPadding: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  stadiumTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    lineHeight: 28,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    flexWrap: 'wrap',
    gap: 6,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  openedPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 4,
  },
  openedPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  descriptionCard: {
    backgroundColor: '#F0FDF4',
    borderLeftWidth: 4,
    borderLeftColor: '#008000',
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 13,
    color: '#1E293B',
    lineHeight: 20,
    fontWeight: '500',
  },
  statGrid3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  statCardItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#CBD5E1',
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 2,
  },
  specificationsBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    gap: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  specIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  specTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  specDesc: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 1,
  },
  specDescHighlight: {
    fontSize: 13,
    fontWeight: '800',
    color: '#008000',
    marginTop: 1,
  },
  footerButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 18,
  },
  closeCTA: {
    flex: 1,
    height: 48,
    backgroundColor: '#008000',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#008000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  closeCTAText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
