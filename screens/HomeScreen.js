import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ParkingSlot from "../components/ParkingSlot";
import {
  parkingSlots,
  getAvailabilityStats,
  parkingZones,
} from "../utils/parkingData";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [selectedZone, setSelectedZone] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = getAvailabilityStats();

  const filteredSlots = parkingSlots.filter((slot) => {
    const matchesZone = selectedZone === "all" || slot.zone === selectedZone;
    const matchesSearch =
      slot.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slot.building.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesSearch;
  });

  const handleSlotPress = (slot) => {
    if (slot.status === "available") {
      navigation.navigate("SlotDetails", { slot });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Parky</Text>
        <Text style={styles.subtitle}>Alyamamah University Parking</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: "#E8F5E9" }]}>
          <Text style={styles.statNumber}>{stats.available}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#FFEBEE" }]}>
          <Text style={styles.statNumber}>{stats.occupied}</Text>
          <Text style={styles.statLabel}>Occupied</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#E3F2FD" }]}>
          <Text style={styles.statNumber}>{stats.availabilityPercentage}%</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by slot number or building..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Zone Filter */}
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
            All Zones
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
            Left Wing
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
            Right Wing
          </Text>
        </TouchableOpacity>
      </View>

      {/* Parking Map - Slots Grid */}
      <ScrollView
        style={styles.mapContainer}
        contentContainerStyle={styles.mapContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>
          {selectedZone === "all"
            ? "All Parking Slots"
            : selectedZone === "left-wing"
            ? "Left Wing - Tuwaiq Building"
            : "Right Wing - DEF Building"}
        </Text>

        <View style={styles.slotsGrid}>
          {filteredSlots.map((slot) => (
            <ParkingSlot key={slot.id} slot={slot} onPress={handleSlotPress} />
          ))}
        </View>

        {filteredSlots.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No parking slots found</Text>
          </View>
        )}

        {/* Map Placeholder - For future implementation */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>
            📍 Interactive Campus Map
          </Text>
          <Text style={styles.mapPlaceholderSubtext}>
            Upload campus map images to assets/images/
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 20,
    backgroundColor: "#007AFF",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#E3F2FD",
  },
  statsContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    padding: 16,
    margin: 4,
    borderRadius: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    margin: 4,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  filterText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#fff",
  },
  mapContainer: {
    flex: 1,
  },
  mapContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  slotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  mapPlaceholder: {
    marginTop: 24,
    padding: 40,
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#007AFF",
    borderStyle: "dashed",
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 8,
  },
  mapPlaceholderSubtext: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});

export default HomeScreen;
