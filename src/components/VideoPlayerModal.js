import React from 'react';
import { Modal, View, Text, TouchableOpacity, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { useTheme } from '../context/ThemeContext';

const { width, height: screenHeight } = Dimensions.get('window');
const videoHeight = (width * 9) / 16;

export default function VideoPlayerModal({ visible, video, onClose }) {
  const { theme } = useTheme();

  const player = useVideoPlayer(video?.videoUrl || null, (p) => {
    p.loop = false;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player?.playing ?? false });
  const { status } = useEvent(player, 'statusChange', { status: player?.status ?? 'idle' });

  React.useEffect(() => {
    if (visible && player) {
      player.play();
    }
    if (!visible && player) {
      player.pause();
    }
  }, [visible, player]);

  const togglePlayPause = () => {
    if (!player) return;
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleClose = () => {
    if (player) player.pause();
    onClose && onClose();
  };

  if (!video) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={handleClose}
    >
      <View style={styles.modalBackground}>
        {/* Top Header Row with Close Button */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            onPress={handleClose}
            style={styles.closeBtn}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.topHeaderTitle} numberOfLines={1}>
            {video.title}
          </Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Video Container Box */}
        <View style={styles.videoSurfaceBox}>
          <VideoView
            player={player}
            style={styles.videoView}
            nativeControls={false}
            contentFit="contain"
          />

          {/* Buffering Indicator */}
          {status === 'loading' && (
            <View style={styles.centeredOverlay} pointerEvents="none">
              <ActivityIndicator size="large" color="#008000" />
            </View>
          )}

          {/* 100% Dead-Centered Play/Pause Button Overlay */}
          <TouchableOpacity
            onPress={togglePlayPause}
            activeOpacity={0.85}
            style={styles.centeredOverlay}
          >
            {status !== 'loading' && (
              <View style={styles.centeredPlayCircle}>
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={36}
                  color="#FFFFFF"
                  style={{ marginLeft: isPlaying ? 0 : 4 }}
                />
              </View>
            )}
          </TouchableOpacity>

          {/* Tag & Duration Badges */}
          {video.tag && (
            <View style={styles.videoTagBadge}>
              <Text style={styles.videoTagText}>{video.tag}</Text>
            </View>
          )}
          {video.duration && (
            <View style={styles.videoDurationBadge}>
              <Text style={styles.videoDurationText}>{video.duration}</Text>
            </View>
          )}
        </View>

        {/* Bottom Details Info Box */}
        <View style={[styles.infoContainer, { backgroundColor: theme.card }]}>
          <Text style={[styles.videoInfoTitle, { color: theme.text }]}>
            {video.title}
          </Text>

          <View style={styles.metaRow}>
            {video.views && (
              <Text style={[styles.metaText, { color: theme.textMuted }]}>
                👁️ {video.views}
              </Text>
            )}
            {video.timeAgo && (
              <Text style={[styles.metaText, { color: theme.textMuted, marginLeft: 12 }]}>
                🕒 {video.timeAgo}
              </Text>
            )}
          </View>

          {video.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>Category: {video.category}</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  topHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  videoSurfaceBox: {
    width: '100%',
    height: videoHeight,
    backgroundColor: '#000000',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoView: {
    width: '100%',
    height: '100%',
  },
  centeredOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  centeredPlayCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(0, 128, 0, 0.85)',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  videoTagBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
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
  videoDurationBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 10,
  },
  videoDurationText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  infoContainer: {
    flex: 1,
    padding: 18,
  },
  videoInfoTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF3',
    borderWidth: 1,
    borderColor: '#86EFAC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#008000',
  },
});
