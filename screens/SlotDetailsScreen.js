import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SlotIndicator from "../components/SlotIndicator";

const SlotDetailsScreen = ({ route, navigation }) => {
  const { slot } = route.params;

  const handleReserveSlot = () => {
    navigation.navigate("Checkout", { slot });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Slot Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.slotNumber}>{slot.id}</Text>
            <SlotIndicator status={slot.status} size={20} />
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
            </Text>
          </View>
        </View>

        {/* Slot Information Card */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Parking Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍 Location:</Text>
            <Text style={styles.infoValue}>{slot.building} Building</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🅿️ Zone:</Text>
            <Text style={styles.infoValue}>
              {slot.zone === "left-wing" ? "Left Wing" : "Right Wing"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📊 Row:</Text>
            <Text style={styles.infoValue}>Row {slot.row}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🔢 Position:</Text>
            <Text style={styles.infoValue}>Position {slot.position}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>💰 Hourly Rate:</Text>
            <Text style={[styles.infoValue, styles.priceText]}>
              {slot.price} SAR/hour
            </Text>
          </View>
        </View>

        {/* Features Card */}
        <View style={styles.featuresCard}>
          <Text style={styles.cardTitle}>Features</Text>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={styles.featureText}>24/7 Security Monitoring</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📷</Text>
            <Text style={styles.featureText}>CCTV Coverage</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🌤️</Text>
            <Text style={styles.featureText}>Covered Parking</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🚶</Text>
            <Text style={styles.featureText}>Close to Campus Entrance</Text>
          </View>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>🗺️ Location Map</Text>
          <Text style={styles.mapSubtext}>
            Exact slot location on campus map
          </Text>
        </View>

        {/* Reserve Button */}
        {slot.status === "available" && (
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={handleReserveSlot}
          >
            <Text style={styles.reserveButtonText}>Reserve This Slot</Text>
          </TouchableOpacity>
        )}

        {slot.status === "occupied" && (
          <View style={styles.occupiedNotice}>
            <Text style={styles.occupiedText}>
              This slot is currently occupied
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  slotNumber: {
    fontSize: 36,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  statusBadge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  priceText: {
    color: "#007AFF",
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
  },
  featuresCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: "#666",
  },
  mapPlaceholder: {
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderStyle: "dashed",
  },
  mapText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  reserveButton: {
    backgroundColor: "#007AFF",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  occupiedNotice: {
    backgroundColor: "#FFEBEE",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F44336",
  },
  occupiedText: {
    color: "#F44336",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SlotDetailsScreen;
