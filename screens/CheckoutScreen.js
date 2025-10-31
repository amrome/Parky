import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CheckoutScreen = ({ route, navigation }) => {
  const { slot } = route.params;
  const [duration, setDuration] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const durations = [
    { hours: 1, label: "1 Hour" },
    { hours: 2, label: "2 Hours" },
    { hours: 4, label: "4 Hours" },
    { hours: 8, label: "All Day" },
  ];

  const paymentMethods = [
    { id: "credit-card", label: "Credit Card", icon: "💳" },
    { id: "apple-pay", label: "Apple Pay", icon: "" },
    { id: "student-wallet", label: "Student Wallet", icon: "👛" },
  ];

  const totalPrice = slot.price * duration;

  const handleConfirmPayment = () => {
    Alert.alert(
      "Payment Successful! 🎉",
      `You have reserved slot ${slot.id} for ${duration} hour(s).\nTotal: ${totalPrice} SAR`,
      [
        {
          text: "View Booking",
          onPress: () => navigation.navigate("MyBookings"),
        },
        {
          text: "Back to Home",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Booking Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Booking Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Parking Slot:</Text>
            <Text style={styles.summaryValue}>{slot.id}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Location:</Text>
            <Text style={styles.summaryValue}>{slot.building} Building</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Zone:</Text>
            <Text style={styles.summaryValue}>
              {slot.zone === "left-wing" ? "Left Wing" : "Right Wing"}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Hourly Rate:</Text>
            <Text style={styles.summaryValue}>{slot.price} SAR/hour</Text>
          </View>
        </View>

        {/* Duration Selection */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>Select Duration</Text>

          <View style={styles.durationContainer}>
            {durations.map((item) => (
              <TouchableOpacity
                key={item.hours}
                style={[
                  styles.durationButton,
                  duration === item.hours && styles.durationButtonActive,
                ]}
                onPress={() => setDuration(item.hours)}
              >
                <Text
                  style={[
                    styles.durationText,
                    duration === item.hours && styles.durationTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Method Selection */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>Payment Method</Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentOption,
                paymentMethod === method.id && styles.paymentOptionActive,
              ]}
              onPress={() => setPaymentMethod(method.id)}
            >
              <View style={styles.paymentLeft}>
                <Text style={styles.paymentIcon}>{method.icon}</Text>
                <Text style={styles.paymentLabel}>{method.label}</Text>
              </View>
              <View
                style={[
                  styles.radio,
                  paymentMethod === method.id && styles.radioActive,
                ]}
              >
                {paymentMethod === method.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Price Breakdown */}
        <View style={styles.priceCard}>
          <Text style={styles.cardTitle}>Price Breakdown</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              Parking ({duration} hour{duration > 1 ? "s" : ""})
            </Text>
            <Text style={styles.priceValue}>{totalPrice} SAR</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Fee</Text>
            <Text style={styles.priceValue}>0 SAR</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{totalPrice} SAR</Text>
          </View>
        </View>

        {/* Confirm Payment Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmPayment}
        >
          <Text style={styles.confirmButtonText}>
            Confirm & Pay {totalPrice} SAR
          </Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.termsText}>
          By confirming, you agree to the parking terms and conditions.
          Cancellation is free up to 15 minutes before reservation time.
        </Text>
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
  summaryCard: {
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
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  sectionCard: {
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
  durationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  durationButton: {
    flex: 1,
    minWidth: "45%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    alignItems: "center",
  },
  durationButtonActive: {
    backgroundColor: "#FFF4ED", // Light orange
    borderColor: "#FF6B35", // Orange
  },
  durationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  durationTextActive: {
    color: "#FF6B35", // Orange
  },
  paymentOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  paymentOptionActive: {
    backgroundColor: "#FFF4ED", // Light orange
    borderColor: "#FF6B35", // Orange
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
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
  priceCard: {
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
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    color: "#666",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FF6B35", // Orange
  },
  confirmButton: {
    backgroundColor: "#FF6B35", // Orange
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#FF6B35", // Orange shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  termsText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 18,
  },
});

export default CheckoutScreen;
