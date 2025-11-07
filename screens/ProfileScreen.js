import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBooking } from "../context/BookingContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const { bookings } = useBooking();

  // Mock user data - in production, this would come from authentication/state management
  const user = {
    name: "Student Name",
    email: "student@yu.edu.sa",
    studentId: "202400001",
    department: "Computer Science",
    balance: 50,
  };

  // Calculate statistics from real bookings
  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const totalHours = bookings.reduce(
      (sum, booking) => sum + booking.duration,
      0
    );
    const totalSpent = bookings.reduce(
      (sum, booking) => sum + booking.totalCost,
      0
    );

    return {
      totalBookings,
      totalHours,
      totalSpent,
    };
  }, [bookings]);

  // Reset all data function
  const handleResetData = () => {
    Alert.alert(
      "Reset All Data",
      "Are you sure you want to delete all bookings? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("bookings");
              Alert.alert(
                "Success",
                "All data has been reset. Please restart the app to see changes."
              );
            } catch (error) {
              Alert.alert("Error", "Failed to reset data. Please try again.");
              console.error("Error resetting data:", error);
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    { id: 1, title: "Payment Methods", icon: "💳", screen: "PaymentMethods" },
    { id: 2, title: "Parking History", icon: "📊", screen: "MyBookings" },
    { id: 3, title: "Notifications", icon: "🔔", screen: "Notifications" },
    { id: 4, title: "Help & Support", icon: "❓", screen: "Support" },
    { id: 5, title: "Settings", icon: "⚙️", screen: "Settings" },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Text>
          </View>

          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.studentId}>ID: {user.studentId}</Text>
        </View>

        {/* Wallet Card */}
        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <Text style={styles.walletTitle}>Student Wallet</Text>
            <Text style={styles.walletIcon}>👛</Text>
          </View>

          <Text style={styles.walletBalance}>{user.balance} SAR</Text>

          <TouchableOpacity style={styles.topUpButton}>
            <Text style={styles.topUpButtonText}>Top Up Wallet</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalBookings}</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalHours}h</Text>
            <Text style={styles.statLabel}>Total Time</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalSpent}</Text>
            <Text style={styles.statLabel}>Total Spent (SAR)</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                // Navigation will be added when screens are created
                console.log(`Navigate to ${item.screen}`);
              }}
            >
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Reset Data Button */}
        <TouchableOpacity style={styles.resetButton} onPress={handleResetData}>
          <Text style={styles.resetText}>🗑️ Reset All Data</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FF6B35", // Orange
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  studentId: {
    fontSize: 12,
    color: "#999",
  },
  walletCard: {
    backgroundColor: "#1a1a1a", // Black
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  walletHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  walletTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  walletIcon: {
    fontSize: 24,
  },
  walletBalance: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  topUpButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  topUpButtonText: {
    color: "#FF6B35", // Orange
    fontSize: 16,
    fontWeight: "600",
  },
  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
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
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FF6B35", // Orange
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E0E0E0",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  menuArrow: {
    fontSize: 24,
    color: "#999",
  },
  logoutButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F44336",
  },
  logoutText: {
    color: "#F44336",
    fontSize: 16,
    fontWeight: "600",
  },
  resetButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FF9800",
  },
  resetText: {
    color: "#FF9800",
    fontSize: 16,
    fontWeight: "600",
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
  },
});

export default ProfileScreen;
