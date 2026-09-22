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
import { ALL_RECORDS_CATEGORIES } from '../data/allRecordsData';

// Folder Graphic Component to match Screenshot 1 & 3
const FolderGraphic = () => (
  <View style={styles.folderArtBox}>


    {/* Back tab of folder */}
    <View style={styles.folderTabBack} />
    {/* Paper sheet inside folder */}
    <View style={styles.folderSheetPaper} />
    {/* Main body of folder */}
    <View style={styles.folderBodyFront} />
  </View>
);

export default function AllRecordsScreen({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleBackPress = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    } else if (onBack) {
      onBack();
    } 
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. Header Bar matching Screenshot */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {selectedCategory ? 'Record Details' : 'All Record List'}
        </Text>

        {/* Top Right Sleek Live Badge */}
        <View style={styles.topRightLiveBadge}>
          <Ionicons name="flash" size={13} color="#059669" style={{ marginRight: 3 }} />
          <Text style={styles.topRightLiveText}>LIVE LINE</Text>
        </View>
      </View>

      {/* 2. Top Sub-Header Showcase Card */}
      <View style={styles.adBannerCard}>
        <View style={styles.adIconBox}>
          {selectedCategory ? (
            <View style={styles.adNewsIconCircle}>
              <Ionicons name="newspaper-outline" size={20} color="#0284C7" />
            </View>
          ) : (
            <View style={styles.adHighlightsIconCircle}>
              <Ionicons name="play-circle-outline" size={20} color="#7C3AED" />
            </View>
          )}
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>
            {selectedCategory ? 'IPL News' : 'IPL Highlights'}
          </Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            {selectedCategory
              ? 'Stay updated with the latest IPL news and'
              : 'Catch up on today\'s match highlights in minutes!'}
          </Text>
        </View>

        <View style={styles.installButton}>
          <Text style={styles.installButtonText}>Explore</Text>
        </View>
      </View>

      {/* 3. Main Content View */}
      {!selectedCategory ? (
        /* SCREEN A: All Record List */
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {ALL_RECORDS_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              activeOpacity={0.8}
              onPress={() => handleSelectCategory(cat)}
            >
              <View style={styles.categoryLeft}>
                <FolderGraphic />
                <Text style={styles.categoryTitle}>{cat.title}</Text>
              </View>

              {/* Green circular icon button with double chevron >> */}
              <View style={styles.greenChevronBtn}>
                <Ionicons name="chevron-forward" size={14} color="#FFFFFF" style={{ marginRight: -6 }} />
                <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        /* SCREEN B: Record Details */
        <View style={styles.detailsContainer}>
          {/* Green Table Header Row */}
          <View style={styles.tableHeaderBar}>
            <Text style={[styles.tableHeaderText, { flex: 0.2, textAlign: 'left' }]}>Pos</Text>
            <Text style={[styles.tableHeaderText, { flex: 0.5, textAlign: 'center' }]}>Player Name</Text>
            <Text style={[styles.tableHeaderText, { flex: 0.3, textAlign: 'right' }]}>
              {selectedCategory.metricHeader}
            </Text>
          </View>

          {/* Table Rows List */}
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.detailsScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {selectedCategory.data.map((item) => (
              <View key={item.pos} style={styles.detailRowCard}>
                <Text style={[styles.detailRowText, { flex: 0.2, textAlign: 'left' }]}>
                  {item.pos}.
                </Text>
                <Text style={[styles.detailRowText, { flex: 0.5, textAlign: 'center' }]}>
                  {item.player}
                </Text>
                <Text style={[styles.detailRowText, { flex: 0.3, textAlign: 'right' }]}>
                  {item.value}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* 4. Bottom Sub-Footer AD Banner */}
      <View style={styles.bottomAdBanner}>
        <View style={styles.adIconBox}>
          <View style={styles.adFooterIconCircle}>
            <Ionicons name="globe-outline" size={20} color="#0284C7" />
            <View style={styles.adTagPill}>
              <Text style={styles.adTagText}>AD</Text>
            </View>
          </View>
        </View>

        <View style={styles.adTextBox}>
          <Text style={styles.adTitle} numberOfLines={1}>
            {selectedCategory ? 'IPL News' : 'Live Match Stats'}
          </Text>
          <Text style={styles.adSubtitle} numberOfLines={1}>
            {selectedCategory
              ? 'Stay updated with the latest IPL news and'
              : 'Get real-time stats and updates for every Cricket'}
          </Text>
        </View>

        <View style={styles.installButton}>
          <Text style={styles.installButtonText}>View Live</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Top Header Bar */
  headerBar: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
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

  /* Top & Bottom Sub-Header AD Card */
  adBannerCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F8FAFC',
  marginHorizontal: 16,
  marginTop: 10,
  marginBottom: 8,
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
  adHighlightsIconCircle: {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: '#F3E8FF',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
},
  adNewsIconCircle: {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: '#E0F2FE',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
},
  adFooterIconCircle: {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: '#E0F2FE',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
},
  adTagPill: {
  position: 'absolute',
  top: -2,
  left: -2,
  backgroundColor: '#7C3AED',
  borderRadius: 6,
  paddingHorizontal: 3,
  paddingVertical: 1,
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
  paddingHorizontal: 20,
  paddingVertical: 8,
  borderRadius: 8,
},
  installButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '700',
},

  /* Folder Art Component Styles */
  folderArtBox: {
  width: 44,
  height: 38,
  marginRight: 16,
  position: 'relative',
  justifyContent: 'flex-end',
},
  folderTabBack: {
  position: 'absolute',
  top: 2,
  left: 4,
  width: 20,
  height: 8,
  backgroundColor: '#D97706',
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
},
  folderSheetPaper: {
  position: 'absolute',
  top: 4,
  left: 8,
  width: 26,
  height: 20,
  backgroundColor: '#E2E8F0',
  borderRadius: 2,
  borderWidth: 1,
  borderColor: '#CBD5E1',
},
  folderBodyFront: {
  width: 44,
  height: 28,
  backgroundColor: '#F59E0B',
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#D97706',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 2,
  elevation: 2,
},

  /* Scroll Content */
  scrollContainer: {
  flex: 1,
},
  scrollContent: {
  paddingHorizontal: 16,
  paddingTop: 6,
  paddingBottom: 16,
},

  /* Category List Item Card */
  categoryCard: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#ECFDF3',
  borderWidth: 1.2,
  borderColor: '#16A34A',
  borderRadius: 16,
  paddingVertical: 14,
  paddingHorizontal: 16,
  marginBottom: 12,
},
  categoryLeft: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
},
  categoryTitle: {
  fontSize: 18,
  fontWeight: '800',
  color: '#000000',
  flex: 1,
},
  greenChevronBtn: {
  width: 44,
  height: 32,
  borderRadius: 10,
  backgroundColor: '#056E2B',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},

  /* Record Details View */
  detailsContainer: {
  flex: 1,
},
  tableHeaderBar: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#056E2B',
  paddingVertical: 12,
  paddingHorizontal: 20,
  marginTop: 4,
},
  tableHeaderText: {
  fontSize: 16,
  fontWeight: '800',
  color: '#FFFFFF',
},
  detailsScrollContent: {
  paddingHorizontal: 16,
  paddingTop: 12,
  paddingBottom: 16,
},
  detailRowCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#ECFDF3',
  borderWidth: 1.2,
  borderColor: '#16A34A',
  borderRadius: 16,
  paddingVertical: 14,
  paddingHorizontal: 16,
  marginBottom: 10,
},
  detailRowText: {
  fontSize: 16,
  fontWeight: '700',
  color: '#000000',
},
});
