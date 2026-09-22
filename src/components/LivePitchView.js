import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useCricket } from '../context/CricketContext';

export default function LivePitchView({ isLive = true, currentBallResult = null }) {
  const { theme } = useTheme();
  const { matchState, currentInnings, changeBowler } = useCricket();
  const [bowlerPickerVisible, setBowlerPickerVisible] = useState(false);

  const striker = currentInnings.strikers[currentInnings.currentStrikerIndex] || null;
  const nonStrikerIndex = currentInnings.currentStrikerIndex === 0 ? 1 : 0;
  const nonStriker = currentInnings.strikers[nonStrikerIndex] || null;
  const activeBowler = currentInnings.bowlers[currentInnings.currentBowlerIndex] || null;

  const strikerName = (striker && striker.name) || 'Striker';
  const strikerFours = (striker && striker.fours) || 0;
  const strikerSixes = (striker && striker.sixes) || 0;
  const strikerRuns = (striker && striker.runs) || 0;
  const strikerBalls = (striker && striker.balls) || 0;
  const strikerSR = (striker && striker.strikeRate) || '0.0';

  const nonStrikerName = (nonStriker && nonStriker.name) || 'Non-Striker';
  const nonStrikerFours = (nonStriker && nonStriker.fours) || 0;
  const nonStrikerSixes = (nonStriker && nonStriker.sixes) || 0;
  const nonStrikerRuns = (nonStriker && nonStriker.runs) || 0;
  const nonStrikerBalls = (nonStriker && nonStriker.balls) || 0;
  const nonStrikerSR = (nonStriker && nonStriker.strikeRate) || '0.0';

  const bowlerName = (activeBowler && activeBowler.name) || 'Bowler';
  const bowlerOvers = (activeBowler && activeBowler.overs) || '0.0';
  const bowlerEconomy = (activeBowler && activeBowler.economy) || '0.00';
  const bowlerWickets = (activeBowler && activeBowler.wickets) || 0;
  const bowlerRuns = (activeBowler && activeBowler.runs) || 0;
  const bowlerMaidens = (activeBowler && activeBowler.maidens) || 0;

  return (
    <View
      style={{
        backgroundColor: theme.card,
        borderColor: theme.cardBorder,
      }}
      className="p-3.5 rounded-2xl border mb-3 shadow-xs"
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2.5 pb-2 border-b" style={{ borderColor: theme.divider }}>
        <View className="flex-row items-center">
          <Ionicons name="baseball" size={16} color={theme.accent} style={{ marginRight: 6 }} />
          <Text style={{ color: theme.text }} className="font-extrabold text-sm">
            Live Pitch Telemetry
          </Text>
        </View>
        <View className="flex-row items-center bg-emerald-500/15 px-2 py-0.5 rounded-full">
          <View className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
          <Text className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px]">
            {isLive ? 'ON PITCH' : 'PAUSED'}
          </Text>
        </View>
      </View>

      {/* Batsmen Pair */}
      <View className="space-y-2">
        {/* Striker */}
        <View
          style={{
            backgroundColor: theme.statCardBg,
            borderColor: theme.accent + '40',
          }}
          className="flex-row justify-between items-center p-2.5 rounded-xl border"
        >
          <View className="flex-row items-center flex-1 mr-2">
            <View style={{ backgroundColor: theme.accent }} className="w-2.5 h-2.5 rounded-full mr-2 shadow-sm" />
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text style={{ color: theme.text }} className="font-extrabold text-sm" numberOfLines={1}>
                  {strikerName}
                </Text>
                <Text style={{ color: theme.accent }} className="font-extrabold ml-1.5 text-xs">*</Text>
              </View>
              <Text style={{ color: theme.textMuted }} className="text-xs mt-0.5">
                4s: <Text style={{ color: theme.textSecondary }}>{strikerFours}</Text>  |  6s: <Text style={{ color: theme.textSecondary }}>{strikerSixes}</Text>
              </Text>
            </View>
          </View>
          <View className="items-end">
            <Text style={{ color: theme.text }} className="text-base font-black">
              {strikerRuns}
              <Text style={{ color: theme.textMuted }} className="text-xs font-normal"> ({strikerBalls})</Text>
            </Text>
            <Text style={{ color: theme.accent }} className="text-xs font-bold">
              SR {strikerSR}
            </Text>
          </View>
        </View>

        {/* Non-Striker */}
        <View
          style={{
            backgroundColor: theme.statCardBg,
            borderColor: theme.cardBorderSubtle,
          }}
          className="flex-row justify-between items-center p-2.5 rounded-xl border mt-1.5"
        >
          <View className="flex-1 mr-2">
            <Text style={{ color: theme.textSecondary }} className="font-semibold text-sm" numberOfLines={1}>
              {nonStrikerName}
            </Text>
            <Text style={{ color: theme.textMuted }} className="text-xs mt-0.5">
              4s: <Text style={{ color: theme.textSecondary }}>{nonStrikerFours}</Text>  |  6s: <Text style={{ color: theme.textSecondary }}>{nonStrikerSixes}</Text>
            </Text>
          </View>
          <View className="items-end">
            <Text style={{ color: theme.textSecondary }} className="text-base font-bold">
              {nonStrikerRuns}
              <Text style={{ color: theme.textMuted }} className="text-xs font-normal"> ({nonStrikerBalls})</Text>
            </Text>
            <Text style={{ color: theme.textMuted }} className="text-xs font-medium">
              SR {nonStrikerSR}
            </Text>
          </View>
        </View>
      </View>

      {/* Bowler Section */}
      <View className="mt-3 pt-2.5 border-t flex-row justify-between items-center" style={{ borderColor: theme.divider }}>
        <View className="flex-1 mr-2">
          <View className="flex-row items-center">
            <Text style={{ color: theme.textMuted }} className="text-xs font-medium mr-1.5">Bowler:</Text>
            <Text style={{ color: theme.text }} className="font-extrabold text-sm" numberOfLines={1}>
              {bowlerName}
            </Text>
          </View>
          <Text style={{ color: theme.textMuted }} className="text-xs mt-0.5">
            Overs: <Text style={{ color: theme.textSecondary }}>{bowlerOvers}</Text>  |  Econ: <Text style={{ color: theme.textSecondary }}>{bowlerEconomy}</Text>
          </Text>
        </View>

        <View className="flex-row items-center space-x-2">
          <View className="items-end mr-2">
            <Text style={{ color: theme.text }} className="font-black text-sm">
              {bowlerWickets} - {bowlerRuns}
            </Text>
            <Text style={{ color: theme.textMuted }} className="text-xs">M: {bowlerMaidens}</Text>
          </View>

          <TouchableOpacity
            onPress={() => setBowlerPickerVisible(true)}
            style={{ backgroundColor: theme.accentLight }}
            className="p-1.5 rounded-lg"
          >
            <Ionicons name="person-outline" size={16} color={theme.accent} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bowler Selection Modal */}
      <Modal
        visible={bowlerPickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setBowlerPickerVisible(false)}
      >
        <View className="flex-1 bg-black/70 justify-center p-4">
          <View
            style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}
            className="border rounded-2xl p-4 max-h-96 shadow-2xl"
          >
            <View className="flex-row justify-between items-center mb-3 pb-2 border-b" style={{ borderColor: theme.divider }}>
              <Text style={{ color: theme.text }} className="font-black text-base">
                Select Active Bowler
              </Text>
              <TouchableOpacity onPress={() => setBowlerPickerVisible(false)}>
                <Ionicons name="close-circle" size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView className="space-y-2">
              {currentInnings.bowlers.map((b, idx) => (
                <TouchableOpacity
                  key={b.id || idx}
                  onPress={() => {
                    changeBowler(idx);
                    setBowlerPickerVisible(false);
                  }}
                  style={{
                    backgroundColor: idx === currentInnings.currentBowlerIndex ? theme.accent + '20' : theme.inputBg,
                    borderColor: idx === currentInnings.currentBowlerIndex ? theme.accent : theme.cardBorder,
                  }}
                  className="p-3 rounded-xl border flex-row justify-between items-center mb-2"
                >
                  <View>
                    <Text style={{ color: theme.text }} className="font-bold text-sm">
                      {b.name}
                    </Text>
                    <Text style={{ color: theme.textMuted }} className="text-xs">
                      {b.overs} overs • {b.wickets}-{b.runs}
                    </Text>
                  </View>
                  {idx === currentInnings.currentBowlerIndex && (
                    <Ionicons name="checkmark-circle" size={20} color={theme.accent} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
