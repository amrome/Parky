import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet } from "react-native";
import { BookingProvider } from "./context/BookingContext";

// Import Screens
import HomeScreen from "./screens/HomeScreen";
import SlotDetailsScreen from "./screens/SlotDetailsScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import MyBookingsScreen from "./screens/MyBookingsScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack Navigator (Home -> Details -> Checkout flow)
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007AFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SlotDetails"
        component={SlotDetailsScreen}
        options={{ title: "Slot Details" }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Checkout" }}
      />
    </Stack.Navigator>
  );
}

// Simple Tab Icon Component
const TabIcon = ({ icon, size }) => {
  return <Text style={{ fontSize: size }}>{icon}</Text>;
};

// Bottom Tab Navigator
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF6B35", // Orange
        tabBarInactiveTintColor: "#666", // Grey
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 70,
          borderTopWidth: 1,
          borderTopColor: "#2a2a2a", // Dark grey
          backgroundColor: "#1a1a1a", // Black
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          borderRadius: 15,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 5,
        },
        headerStyle: {
          backgroundColor: "#1a1a1a", // Black
          shadowColor: "transparent", // Remove shadow
          elevation: 0, // Remove shadow on Android
        },
        headerTintColor: "#FF6B35", // Orange
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <TabIcon icon="🏠" size={size} />,
        }}
      />
      <Tab.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{
          title: "My Bookings",
          tabBarIcon: ({ color, size }) => <TabIcon icon="🅿️" size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <TabIcon icon="👤" size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <BookingProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <BottomTabs />
          {/* Background fill for space below navbar */}
          <View style={styles.navbarBackground} />
        </View>
      </NavigationContainer>
    </BookingProvider>
  );
}

const styles = StyleSheet.create({
  navbarBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: "#1a1a1a", // Same as navbar
  },
});
