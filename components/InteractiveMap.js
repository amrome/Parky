import React, { useState } from "react";
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

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const InteractiveMap = ({ zone, slots, onSlotPress }) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // Get the correct image source based on zone
  const getMapSource = () => {
    switch (zone) {
      case "left-wing":
        return require("../assets/images/LeftSide.png");
      case "right-wing":
        return require("../assets/images/RightSide.png");
      default:
        return require("../assets/images/MainPhoto.png");
    }
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
  // You'll need to adjust these based on your actual map layout
  const getSlotPositions = () => {
    const positions = {};

    if (zone === "left-wing") {
      // Left wing slots - Tuwaiq Building (20 slots)
      slots
        .filter((s) => s.zone === "left-wing")
        .forEach((slot, index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          positions[slot.id] = {
            left: 20 + col * 15, // Percentage from left
            top: 30 + row * 15, // Percentage from top
          };
        });
    } else if (zone === "right-wing") {
      // Right wing slots - DEF Building (25 slots)
      slots
        .filter((s) => s.zone === "right-wing")
        .forEach((slot, index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          positions[slot.id] = {
            left: 20 + col * 15,
            top: 25 + row * 12,
          };
        });
    } else {
      // Main view - show both sides
      // Left side
      slots
        .filter((s) => s.zone === "left-wing")
        .slice(0, 10)
        .forEach((slot, index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          positions[slot.id] = {
            left: 10 + col * 7,
            top: 40 + row * 15,
          };
        });
      // Right side
      slots
        .filter((s) => s.zone === "right-wing")
        .slice(0, 10)
        .forEach((slot, index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          positions[slot.id] = {
            left: 55 + col * 7,
            top: 40 + row * 15,
          };
        });
    }

    return positions;
  };

  const slotPositions = getSlotPositions();

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

              const isAvailable = slot.status === "available";

              return (
                <TouchableOpacity
                  key={slotId}
                  style={[
                    styles.slotIndicator,
                    {
                      left: `${position.left}%`,
                      top: `${position.top}%`,
                      backgroundColor: isAvailable ? "#4CAF50" : "#F44336",
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
    width: 40,
    height: 40,
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
