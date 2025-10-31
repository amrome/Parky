import React from "react";
import { View, StyleSheet } from "react-native";

const SlotIndicator = ({ status, size = 12 }) => {
  const getStatusColor = () => {
    switch (status) {
      case "available":
        return "#4CAF50"; // Green
      case "occupied":
        return "#F44336"; // Red
      case "reserved":
        return "#FFC107"; // Yellow
      default:
        return "#9E9E9E"; // Gray
    }
  };

  return (
    <View
      style={[
        styles.indicator,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: getStatusColor(),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default SlotIndicator;
