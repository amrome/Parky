import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBooking } from "../context/BookingContext";
import { useFocusEffect } from "@react-navigation/native";

const MyBookingsScreen = ({ navigation }) => {
  const {
    bookings,
    loading,
    cancelBooking,
    extendBooking,
    getActiveBookings,
    getPastBookings,
  } = useBooking();
  const [refreshing, setRefreshing] = useState(false);

  // Refresh bookings when screen is focused
  useFocusEffect(
    useCallback(() => {
      // Bookings are already loaded from context
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const activeBookings = getActiveBookings();
  const pastBookings = getPastBookings();

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleCancelBooking = (booking) => {
    Alert.alert(
      "Cancel Booking",
      `Are you sure you want to cancel booking ${booking.bookingNumber}?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            cancelBooking(booking.id);
            Alert.alert("Success", "Booking cancelled successfully");
          },
        },
      ]
    );
  };

  const handleExtendBooking = (booking) => {
    Alert.alert("Extend Booking", "How many additional hours?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "1 Hour",
        onPress: () => {
          extendBooking(booking.id, 1);
          Alert.alert(
            "Success",
            `Booking extended by 1 hour. Additional cost: ${booking.hourlyRate} SAR`
          );
        },
      },
      {
        text: "2 Hours",
        onPress: () => {
          extendBooking(booking.id, 2);
          Alert.alert(
            "Success",
            `Booking extended by 2 hours. Additional cost: ${
              booking.hourlyRate * 2
            } SAR`
          );
        },
      },
    ]);
  };

  const BookingCard = ({ booking }) => {
    const isActive = booking.status === "active";
    const isCompleted =
      booking.status === "completed" || booking.status === "cancelled";
    const isCancelled = booking.status === "cancelled";

    return (
      <View style={[styles.bookingCard, isActive && styles.activeCard]}>
        <View style={styles.bookingHeader}>
          <Text style={styles.bookingId}>{booking.bookingNumber}</Text>
          <View
            style={[
              styles.statusBadge,
              isActive && styles.activeBadge,
              isCompleted && !isCancelled && styles.completedBadge,
              isCancelled && styles.cancelledBadge,
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
            <Text style={styles.detailValue}>
              {formatDate(booking.startTime)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>⏰ Time:</Text>
            <Text style={styles.detailValue}>
              {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>⏱️ Duration:</Text>
            <Text style={styles.detailValue}>
              {booking.duration} hour{booking.duration > 1 ? "s" : ""}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>💰 Total:</Text>
            <Text style={[styles.detailValue, styles.priceValue]}>
              {booking.totalCost} SAR
            </Text>
          </View>
        </View>

        {isActive && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() =>
                Alert.alert(
                  "QR Code",
                  `Show QR code for ${booking.bookingNumber}`
                )
              }
            >
              <Text style={styles.qrButtonText}>Show QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.extendButton}
              onPress={() => handleExtendBooking(booking)}
            >
              <Text style={styles.extendButtonText}>Extend Time</Text>
            </TouchableOpacity>
          </View>
        )}

        {isActive && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancelBooking(booking)}
          >
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>History</Text>
            {pastBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
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
    paddingBottom: 100, // Extra padding to clear the navbar
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
  cancelledBadge: {
    backgroundColor: "#F44336", // Red
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
  cancelButton: {
    marginTop: 8,
    backgroundColor: "#FFEBEE",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F44336",
  },
  cancelButtonText: {
    color: "#F44336",
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
