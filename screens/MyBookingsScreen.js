import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyBookingsScreen = ({ navigation }) => {
  // Mock booking data - in production, this would come from your backend/state management
  const activeBookings = [
    {
      id: "BK-001",
      slotId: "RW-02",
      building: "DEF",
      startTime: "08:00 AM",
      endTime: "10:00 AM",
      duration: 2,
      price: 10,
      status: "active",
      date: "Today",
    },
  ];

  const upcomingBookings = [];

  const pastBookings = [
    {
      id: "BK-002",
      slotId: "LW-05",
      building: "Tuwaiq",
      startTime: "09:00 AM",
      endTime: "11:00 AM",
      duration: 2,
      price: 10,
      status: "completed",
      date: "Oct 30, 2025",
    },
  ];

  const BookingCard = ({ booking }) => {
    const isActive = booking.status === "active";
    const isCompleted = booking.status === "completed";

    return (
      <View style={[styles.bookingCard, isActive && styles.activeCard]}>
        <View style={styles.bookingHeader}>
          <Text style={styles.bookingId}>{booking.id}</Text>
          <View
            style={[
              styles.statusBadge,
              isActive && styles.activeBadge,
              isCompleted && styles.completedBadge,
            ]}
          >
            <Text style={styles.statusText}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🅿️ Slot:</Text>
            <Text style={styles.detailValue}>{booking.slotId}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📍 Building:</Text>
            <Text style={styles.detailValue}>{booking.building}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📅 Date:</Text>
            <Text style={styles.detailValue}>{booking.date}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>⏰ Time:</Text>
            <Text style={styles.detailValue}>
              {booking.startTime} - {booking.endTime}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>💰 Total:</Text>
            <Text style={[styles.detailValue, styles.priceValue]}>
              {booking.price} SAR
            </Text>
          </View>
        </View>

        {isActive && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.qrButton}>
              <Text style={styles.qrButtonText}>Show QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.extendButton}>
              <Text style={styles.extendButtonText}>Extend Time</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>My Bookings</Text>

        {/* Active Bookings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Now</Text>
          {activeBookings.length > 0 ? (
            activeBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🅿️</Text>
              <Text style={styles.emptyText}>No active bookings</Text>
              <TouchableOpacity
                style={styles.findParkingButton}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.findParkingText}>Find Parking</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Upcoming Bookings */}
        {upcomingBookings.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming</Text>
            {upcomingBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </View>
        )}

        {/* Past Bookings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>History</Text>
          {pastBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  bookingCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeCard: {
    borderWidth: 2,
    borderColor: "#FF6B35", // Orange
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  bookingId: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
  },
  activeBadge: {
    backgroundColor: "#FF6B35", // Orange
  },
  completedBadge: {
    backgroundColor: "#666", // Grey
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  bookingDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  priceValue: {
    color: "#FF6B35", // Orange
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  qrButton: {
    flex: 1,
    backgroundColor: "#1a1a1a", // Black
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  qrButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  extendButton: {
    flex: 1,
    backgroundColor: "#FFF4ED", // Light orange
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  extendButtonText: {
    color: "#FF6B35", // Orange
    fontSize: 14,
    fontWeight: "600",
  },
  emptyState: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 20,
  },
  findParkingButton: {
    backgroundColor: "#FF6B35", // Orange
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  findParkingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MyBookingsScreen;
