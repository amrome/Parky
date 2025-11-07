import React, { useMemo } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Svg, { Rect, Line, G, Text as SvgText } from "react-native-svg";
import { useBooking } from "../context/BookingContext";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const SVGParkingMap = ({ zone, slots, onSlotPress }) => {
  const { getSlotBooking, isSlotFullyBooked, bookings } = useBooking();

  // Map dimensions
  const mapWidth = screenWidth * 2; // Make it wider for horizontal scrolling
  const mapHeight = screenHeight * 0.7;
  const slotWidth = 60;
  const slotHeight = 100;
  const slotSpacing = 15;
  const rowSpacing = 150;

  // Calculate slot colors
  const slotColors = useMemo(() => {
    const colors = {};
    slots.forEach((slot) => {
      const currentBooking = getSlotBooking(slot.id);
      const fullyBooked = isSlotFullyBooked(slot.id);

      if (fullyBooked) {
        colors[slot.id] = "#F44336"; // Red
      } else if (currentBooking) {
        colors[slot.id] = "#FF9800"; // Orange
      } else {
        colors[slot.id] = "#4CAF50"; // Green
      }
    });
    return colors;
  }, [bookings, slots]);

  // Calculate slot positions
  const getSlotPosition = (slot) => {
    const slotNum = parseInt(slot.id.split("-")[1]) - 1;

    if (slot.zone === "left-wing") {
      // Top row - 20 slots
      const col = slotNum % 20;
      return {
        x: 100 + col * (slotWidth + slotSpacing),
        y: 50,
      };
    } else if (slot.zone === "right-wing") {
      // Bottom row - 25 slots
      const col = slotNum % 25;
      return {
        x: 100 + col * (slotWidth + slotSpacing),
        y: 50 + rowSpacing,
      };
    }
    return { x: 0, y: 0 };
  };

  // Filter slots by zone
  const filteredSlots = slots.filter((s) =>
    zone === "all" ? true : s.zone === zone
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      <Svg width={mapWidth} height={mapHeight} style={styles.svg}>
        {/* Road lanes */}
        <Rect x="50" y="0" width={mapWidth - 100} height={40} fill="#666" />
        <Line
          x1="50"
          y1="20"
          x2={mapWidth - 50}
          y2="20"
          stroke="#FFD700"
          strokeWidth="2"
          strokeDasharray="10,5"
        />

        <Rect
          x="50"
          y={rowSpacing - 10}
          width={mapWidth - 100}
          height={40}
          fill="#666"
        />
        <Line
          x1="50"
          y1={rowSpacing + 10}
          x2={mapWidth - 50}
          y2={rowSpacing + 10}
          stroke="#FFD700"
          strokeWidth="2"
          strokeDasharray="10,5"
        />

        <Rect
          x="50"
          y={rowSpacing * 2}
          width={mapWidth - 100}
          height={40}
          fill="#666"
        />
        <Line
          x1="50"
          y1={rowSpacing * 2 + 20}
          x2={mapWidth - 50}
          y2={rowSpacing * 2 + 20}
          stroke="#FFD700"
          strokeWidth="2"
          strokeDasharray="10,5"
        />

        {/* Parking slots */}
        {filteredSlots.map((slot) => {
          const pos = getSlotPosition(slot);
          const color = slotColors[slot.id] || "#4CAF50";

          return (
            <G key={slot.id}>
              {/* Slot rectangle */}
              <Rect
                x={pos.x}
                y={pos.y}
                width={slotWidth}
                height={slotHeight}
                fill={color}
                stroke="#fff"
                strokeWidth="3"
                rx="4"
                onPress={() => onSlotPress(slot)}
              />

              {/* Slot number */}
              <SvgText
                x={pos.x + slotWidth / 2}
                y={pos.y + slotHeight / 2 + 5}
                fill="#fff"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
              >
                {slot.id}
              </SvgText>
            </G>
          );
        })}
      </Svg>

      {/* Instructions overlay */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          👆 Tap slots to book • Scroll horizontally
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingVertical: 20,
  },
  svg: {
    backgroundColor: "#f5f5f5",
  },
  instructions: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  instructionText: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "600",
  },
});

export default SVGParkingMap;
