import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SlotIndicator from "../components/SlotIndicator";
import { useBooking } from "../context/BookingContext";

const SlotDetailsScreen = ({ route, navigation }) => {
  const { slot: routeSlot } = route.params;
  const {
    getSlotById,
    getSlotBooking,
    getSlotBookings,
    checkTimeConflict,
    isSlotFullyBooked,
  } = useBooking();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Get the latest slot data from context to reflect real-time status
  const slot = getSlotById(routeSlot.id) || routeSlot;
  const currentBooking = getSlotBooking(slot.id);
  const allSlotBookings = getSlotBookings(slot.id);
  const fullyBooked = isSlotFullyBooked(slot.id);

  // Determine display status
  const displayStatus = fullyBooked
    ? "occupied"
    : currentBooking
    ? "reserved"
    : "available";

  // Generate available time slots
  const generateAvailableTimeSlots = () => {
    const slots = [];
    const now = new Date();

    if (currentBooking) {
      const bookingEndTime = new Date(currentBooking.endTime);

      // Add time slot right after current booking ends
      const afterBookingTime = new Date(bookingEndTime);
      const afterBookingEndTime = new Date(afterBookingTime);
      afterBookingEndTime.setHours(afterBookingEndTime.getHours() + 2);

      // Check if this time slot conflicts with any existing bookings
      const hasConflict = checkTimeConflict(
        slot.id,
        afterBookingTime.toISOString(),
        afterBookingEndTime.toISOString()
      );

      slots.push({
        id: 1,
        label: `After ${formatTime(bookingEndTime)}`,
        startTime: afterBookingTime.toISOString(),
        available: !hasConflict,
      });
    }

    // Add some future time slots for today
    const laterToday = new Date(now);
    laterToday.setHours(now.getHours() + 3, 0, 0, 0);
    const laterTodayEnd = new Date(laterToday);
    laterTodayEnd.setHours(laterTodayEnd.getHours() + 2);

    if (!currentBooking || laterToday > new Date(currentBooking.endTime)) {
      const hasConflict = checkTimeConflict(
        slot.id,
        laterToday.toISOString(),
        laterTodayEnd.toISOString()
      );

      slots.push({
        id: 2,
        label: `Later Today (${formatTime(laterToday)})`,
        startTime: laterToday.toISOString(),
        available: !hasConflict,
      });
    }

    // Add tomorrow morning slot (8am - 10am)
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0);
    const tomorrowMorningEnd = new Date(tomorrow);
    tomorrowMorningEnd.setHours(10, 0, 0, 0);

    const tomorrowMorningConflict = checkTimeConflict(
      slot.id,
      tomorrow.toISOString(),
      tomorrowMorningEnd.toISOString()
    );

    slots.push({
      id: 3,
      label: `Tomorrow Morning (${formatTime(tomorrow)})`,
      startTime: tomorrow.toISOString(),
      available: !tomorrowMorningConflict,
    });

    // Add tomorrow afternoon slot (2pm - 4pm)
    const tomorrowAfternoon = new Date(tomorrow);
    tomorrowAfternoon.setHours(14, 0, 0, 0);
    const tomorrowAfternoonEnd = new Date(tomorrowAfternoon);
    tomorrowAfternoonEnd.setHours(16, 0, 0, 0);

    const tomorrowAfternoonConflict = checkTimeConflict(
      slot.id,
      tomorrowAfternoon.toISOString(),
      tomorrowAfternoonEnd.toISOString()
    );

    slots.push({
      id: 4,
      label: `Tomorrow Afternoon (${formatTime(tomorrowAfternoon)})`,
      startTime: tomorrowAfternoon.toISOString(),
      available: !tomorrowAfternoonConflict,
    });

    return slots;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const availableTimeSlots = generateAvailableTimeSlots();

  const handleReserveSlot = () => {
    if (slot.status === "occupied" && !selectedTimeSlot) {
      Alert.alert(
        "Select Time Slot",
        "Please select an available time slot to reserve.",
        [{ text: "OK" }]
      );
      return;
    }
    navigation.navigate("Checkout", {
      slot,
      scheduledStartTime:
        selectedTimeSlot?.startTime || new Date().toISOString(),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Slot Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.slotNumber}>{slot.id}</Text>
            <SlotIndicator
              status={currentBooking ? "occupied" : "available"}
              size={20}
            />
          </View>
          <View
            style={[
              styles.statusBadge,
              displayStatus === "available"
                ? styles.statusAvailable
                : displayStatus === "reserved"
                ? styles.statusReserved
                : styles.statusOccupied,
            ]}
          >
            <Text style={styles.statusText}>
              {displayStatus === "reserved"
                ? "Currently Reserved"
                : displayStatus.charAt(0).toUpperCase() +
                  displayStatus.slice(1)}
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
        {/* Map with Slot Location */}
        <View style={styles.mapContainer}>
          <Text style={styles.cardTitle}>📍 Slot Location</Text>
          <Image
            source={
              slot.zone === "left-wing"
                ? require("../assets/images/LeftSide.png")
                : require("../assets/images/RightSide.png")
            }
            style={styles.mapImage}
            resizeMode="contain"
          />
          <Text style={styles.mapSubtext}>
            {slot.building} Building -{" "}
            {slot.zone === "left-wing"
              ? "Left Wing (Tuwaiq)"
              : "Right Wing (DEF)"}
          </Text>
        </View>

        {/* Current Booking Info (if there's an active booking) */}
        {currentBooking && (
          <View style={styles.currentBookingCard}>
            <Text style={styles.cardTitle}>⏰ Current Reservation</Text>
            <View style={styles.bookingInfo}>
              <View style={styles.bookingRow}>
                <Text style={styles.bookingLabel}>Occupied Until:</Text>
                <Text style={styles.bookingValue}>
                  {formatTime(currentBooking.endTime)}
                </Text>
              </View>
              <View style={styles.bookingRow}>
                <Text style={styles.bookingLabel}>Duration:</Text>
                <Text style={styles.bookingValue}>
                  {currentBooking.duration} hour
                  {currentBooking.duration > 1 ? "s" : ""}
                </Text>
              </View>
            </View>
            <View style={styles.occupiedBanner}>
              <Text style={styles.occupiedBannerText}>
                ⏰ Currently Reserved - But you can book for later!
              </Text>
            </View>
          </View>
        )}

        {/* All Bookings for this Slot */}
        {allSlotBookings.length > 0 && (
          <View style={styles.allBookingsCard}>
            <Text style={styles.cardTitle}>
              📋 All Reservations ({allSlotBookings.length})
            </Text>
            {allSlotBookings.map((booking, index) => (
              <View key={booking.id} style={styles.bookingItem}>
                <Text style={styles.bookingItemTitle}>
                  Reservation {index + 1}
                </Text>
                <View style={styles.bookingItemRow}>
                  <Text style={styles.bookingItemLabel}>From:</Text>
                  <Text style={styles.bookingItemValue}>
                    {formatDate(booking.startTime)}{" "}
                    {formatTime(booking.startTime)}
                  </Text>
                </View>
                <View style={styles.bookingItemRow}>
                  <Text style={styles.bookingItemLabel}>Until:</Text>
                  <Text style={styles.bookingItemValue}>
                    {formatDate(booking.endTime)} {formatTime(booking.endTime)}
                  </Text>
                </View>
                <View style={styles.bookingItemRow}>
                  <Text style={styles.bookingItemLabel}>Duration:</Text>
                  <Text style={styles.bookingItemValue}>
                    {booking.duration} hour{booking.duration > 1 ? "s" : ""}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Available Time Slots (always show for scheduling) */}
        <View style={styles.timeSlotsCard}>
          <Text style={styles.cardTitle}>
            {currentBooking ? "📅 Reserve for Later" : "📅 Choose Time Slot"}
          </Text>
          <Text style={styles.timeSlotsSubtitle}>
            {currentBooking
              ? "Select when you want to reserve this slot:"
              : "Reserve now or schedule for later:"}
          </Text>

          {/* Now/Immediate option for available slots */}
          {!currentBooking && (
            <TouchableOpacity
              style={[
                styles.timeSlotButton,
                selectedTimeSlot === null && styles.timeSlotButtonActive,
              ]}
              onPress={() => setSelectedTimeSlot(null)}
            >
              <View style={styles.timeSlotContent}>
                <View>
                  <Text
                    style={[
                      styles.timeSlotLabel,
                      selectedTimeSlot === null && styles.timeSlotLabelActive,
                    ]}
                  >
                    Reserve Now
                  </Text>
                  <Text style={styles.timeSlotTime}>
                    Immediate availability
                  </Text>
                </View>
                <View
                  style={[
                    styles.radio,
                    selectedTimeSlot === null && styles.radioActive,
                  ]}
                >
                  {selectedTimeSlot === null && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}

          {/* Future time slots */}
          {availableTimeSlots.map((timeSlot) => (
            <TouchableOpacity
              key={timeSlot.id}
              style={[
                styles.timeSlotButton,
                selectedTimeSlot?.id === timeSlot.id &&
                  styles.timeSlotButtonActive,
                !timeSlot.available && styles.timeSlotButtonDisabled,
              ]}
              onPress={() =>
                timeSlot.available && setSelectedTimeSlot(timeSlot)
              }
              disabled={!timeSlot.available}
            >
              <View style={styles.timeSlotContent}>
                <View>
                  <Text
                    style={[
                      styles.timeSlotLabel,
                      selectedTimeSlot?.id === timeSlot.id &&
                        styles.timeSlotLabelActive,
                      !timeSlot.available && styles.timeSlotLabelDisabled,
                    ]}
                  >
                    {timeSlot.label}
                  </Text>
                  <Text style={styles.timeSlotTime}>
                    {timeSlot.available ? "✅ Available" : "❌ Not available"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.radio,
                    selectedTimeSlot?.id === timeSlot.id && styles.radioActive,
                  ]}
                >
                  {selectedTimeSlot?.id === timeSlot.id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Reserve Button */}
        {!currentBooking && (
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={handleReserveSlot}
          >
            <Text style={styles.reserveButtonText}>
              {selectedTimeSlot ? "Schedule Reservation" : "Reserve Now"}
            </Text>
          </TouchableOpacity>
        )}

        {currentBooking && (
          <TouchableOpacity
            style={[
              styles.reserveButton,
              !selectedTimeSlot && styles.reserveButtonDisabled,
            ]}
            onPress={handleReserveSlot}
            disabled={!selectedTimeSlot}
          >
            <Text style={styles.reserveButtonText}>
              Reserve for Selected Time
            </Text>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusAvailable: {
    backgroundColor: "#4CAF50", // Green
  },
  statusReserved: {
    backgroundColor: "#FF9800", // Orange (not fully red)
  },
  statusOccupied: {
    backgroundColor: "#F44336", // Red
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
    color: "#FF6B35", // Orange
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
  mapContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginVertical: 12,
  },
  mapSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  reserveButton: {
    backgroundColor: "#FF6B35", // Orange
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#FF6B35", // Orange shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  reserveButtonDisabled: {
    backgroundColor: "#999",
    opacity: 0.5,
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  currentBookingCard: {
    backgroundColor: "#FFF4ED", // Light orange
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#FF6B35",
  },
  bookingInfo: {
    marginBottom: 12,
  },
  bookingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  bookingLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  bookingValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  occupiedBanner: {
    backgroundColor: "#FF9800", // Orange instead of red
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  occupiedBannerText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  timeSlotsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timeSlotsSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  timeSlotButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  timeSlotButtonActive: {
    backgroundColor: "#FFF4ED", // Light orange
    borderColor: "#FF6B35", // Orange
  },
  timeSlotButtonDisabled: {
    opacity: 0.5,
  },
  timeSlotContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeSlotLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  timeSlotLabelActive: {
    color: "#FF6B35",
  },
  timeSlotLabelDisabled: {
    color: "#999",
  },
  timeSlotTime: {
    fontSize: 14,
    color: "#666",
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: {
    borderColor: "#FF6B35", // Orange
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF6B35", // Orange
  },
  occupiedNotice: {
    backgroundColor: "#2a2a2a", // Dark grey
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#666", // Medium grey
  },
  occupiedText: {
    color: "#999", // Light grey
    fontSize: 16,
    fontWeight: "600",
  },
  allBookingsCard: {
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
  bookingItem: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B35",
  },
  bookingItemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  bookingItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  bookingItemLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  bookingItemValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
});

export default SlotDetailsScreen;
