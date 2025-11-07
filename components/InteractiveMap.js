import React, { useState, useMemo } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useBooking } from "../context/BookingContext";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const InteractiveMap = ({ zone, slots, onSlotPress }) => {
  const { getSlotBooking, isSlotFullyBooked, bookings } = useBooking();
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // Get the correct image source based on zone
  const getMapSource = () => {
    // Use the new parking map for all zones
    return require("../assets/images/Screenshot 2025-11-07 223017.png");
  };

  // Pinch gesture for zooming
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = Math.max(1, Math.min(savedScale.value * event.scale, 3));
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      if (scale.value < 1) {
        scale.value = withSpring(1);
        savedScale.value = 1;
      }
    });

  // Pan gesture for moving the map
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = savedTranslateX.value + event.translationX;
      translateY.value = savedTranslateY.value + event.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  // Combine gestures
  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  // Define slot positions on the map (percentage-based coordinates)
  // Based on the actual parking map layout
  const getSlotPositions = () => {
    const positions = {};

    // Get all slots for the selected zone
    const zoneSlots = slots.filter((s) =>
      zone === "all" ? true : s.zone === zone
    );

    zoneSlots.forEach((slot) => {
      const slotNum = parseInt(slot.id.split("-")[1]);

      if (slot.zone === "left-wing") {
        // Left-wing: 2 rows of 10 slots each (20 total)
        const row = Math.floor((slotNum - 1) / 10); // 0 for first 10, 1 for next 10
        const col = (slotNum - 1) % 10; // Position within the row
        positions[slot.id] = {
          left: 5 + col * 9, // Spread horizontally
          top: 25 + row * 8, // Two rows closer: 25% and 33% (8% gap)
        };
      } else if (slot.zone === "right-wing") {
        // Right-wing: 2 rows (13 slots first row, 12 slots second row)
        const row = Math.floor((slotNum - 1) / 13); // 0 for first 13, 1 for next 12
        const col = (slotNum - 1) % 13; // Position within the row
        positions[slot.id] = {
          left: 5 + col * 7, // Spread horizontally
          top: 58 + row * 8, // Two rows closer: 58% and 66% (8% gap)
        };
      }
    });

    return positions;
  };

  const slotPositions = getSlotPositions();

  // Calculate slot colors - memoized to update when bookings change
  const slotColors = useMemo(() => {
    console.log(
      "[InteractiveMap] Recalculating slot colors, bookings count:",
      bookings.length
    );
    const colors = {};
    slots.forEach((slot) => {
      const currentBooking = getSlotBooking(slot.id);
      const fullyBooked = isSlotFullyBooked(slot.id);

      // Determine color based on booking status
      // Green: Available now
      // Orange: Currently reserved but available for future
      // Red: Fully occupied (all time slots booked for next 24 hours)
      if (fullyBooked) {
        colors[slot.id] = "#F44336"; // Red
        console.log(`[InteractiveMap] ${slot.id} = RED (fully booked)`);
      } else if (currentBooking) {
        colors[slot.id] = "#FF9800"; // Orange
        console.log(`[InteractiveMap] ${slot.id} = ORANGE (has booking)`);
      } else {
        colors[slot.id] = "#4CAF50"; // Green
        console.log(`[InteractiveMap] ${slot.id} = GREEN (available)`);
      }
    });
    return colors;
  }, [bookings, slots]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.mapContainer}>
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.imageContainer, animatedStyle]}>
            <Image
              source={getMapSource()}
              style={styles.mapImage}
              resizeMode="contain"
            />

            {/* Slot Indicators Overlay */}
            {Object.entries(slotPositions).map(([slotId, position]) => {
              const slot = slots.find((s) => s.id === slotId);
              if (!slot) return null;

              const indicatorColor = slotColors[slotId] || "#4CAF50";

              return (
                <TouchableOpacity
                  key={slotId}
                  style={[
                    styles.slotIndicator,
                    {
                      left: `${position.left}%`,
                      top: `${position.top}%`,
                      backgroundColor: indicatorColor,
                    },
                  ]}
                  onPress={() => onSlotPress(slot)}
                >
                  <Text style={styles.slotText}>{slotId}</Text>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </GestureDetector>

        {/* Zoom Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            📌 Pinch to zoom • 👆 Tap slots to book
          </Text>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  slotIndicator: {
    position: "absolute",
    width: 34,
    height: 34,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  slotText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
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

export default InteractiveMap;
