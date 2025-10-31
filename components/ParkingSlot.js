import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import SlotIndicator from "./SlotIndicator";

const ParkingSlot = ({ slot, onPress }) => {
  const isAvailable = slot.status === "available";

  return (
    <TouchableOpacity
      style={[
        styles.slotContainer,
        {
          backgroundColor: isAvailable ? "#E8F5E9" : "#FFEBEE", // Green bg for available, red for occupied
          borderColor: isAvailable ? "#4CAF50" : "#F44336", // Green border for available, red for occupied
        },
      ]}
      onPress={() => onPress(slot)}
      disabled={!isAvailable}
    >
      <View style={styles.header}>
        <Text style={styles.slotNumber}>{slot.id}</Text>
        <SlotIndicator status={slot.status} size={14} />
      </View>

      <Text style={styles.building}>{slot.building}</Text>
      <Text style={styles.price}>{slot.price} SAR/hr</Text>

      {!isAvailable && (
        <View style={styles.occupiedBadge}>
          <Text style={styles.occupiedText}>Occupied</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  slotContainer: {
    padding: 12,
    margin: 6,
    borderRadius: 12,
    borderWidth: 2,
    minWidth: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  slotNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  building: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6B35", // Orange
  },
  occupiedBadge: {
    marginTop: 8,
    backgroundColor: "#F44336", // Red
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  occupiedText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
});

export default ParkingSlot;
