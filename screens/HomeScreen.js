import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InteractiveMap from "../components/InteractiveMap";
import { parkingSlots, getAvailabilityStats } from "../utils/parkingData";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [selectedZone, setSelectedZone] = useState("all");

  const stats = getAvailabilityStats();

  const filteredSlots = parkingSlots.filter((slot) => {
    const matchesZone = selectedZone === "all" || slot.zone === selectedZone;
    return matchesZone;
  });

  const handleSlotPress = (slot) => {
    if (slot.status === "available") {
      navigation.navigate("SlotDetails", { slot });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Compact Header with Stats */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Parky</Text>
          <View style={styles.quickStats}>
            <View style={styles.quickStat}>
              <View
                style={[styles.statusDot, { backgroundColor: "#4CAF50" }]}
              />
              <Text style={styles.quickStatText}>{stats.available}</Text>
            </View>
            <View style={styles.quickStat}>
              <View
                style={[styles.statusDot, { backgroundColor: "#F44336" }]}
              />
              <Text style={styles.quickStatText}>{stats.occupied}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Zone Filter - Compact */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedZone === "all" && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedZone("all")}
        >
          <Text
            style={[
              styles.filterText,
              selectedZone === "all" && styles.filterTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedZone === "left-wing" && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedZone("left-wing")}
        >
          <Text
            style={[
              styles.filterText,
              selectedZone === "left-wing" && styles.filterTextActive,
            ]}
          >
            Left
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedZone === "right-wing" && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedZone("right-wing")}
        >
          <Text
            style={[
              styles.filterText,
              selectedZone === "right-wing" && styles.filterTextActive,
            ]}
          >
            Right
          </Text>
        </TouchableOpacity>
      </View>

      {/* Interactive Map with Zoom and Slot Overlays - Full Screen */}
      <View style={styles.mapWrapper}>
        <InteractiveMap
          zone={selectedZone}
          slots={filteredSlots}
          onSlotPress={handleSlotPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#1a1a1a", // Black
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FF6B35", // Orange
  },
  quickStats: {
    flexDirection: "row",
    gap: 16,
  },
  quickStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  quickStatText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#2a2a2a", // Dark grey
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#3a3a3a", // Medium grey
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: "#FF6B35", // Orange
  },
  filterText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#fff",
  },
  mapWrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
