import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

const Rootlayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1A1209",
        tabBarInactiveTintColor: "999999",
        tabBarStyle: {
          position: "absolute", // Makes the tab bar float above content
          bottom: Platform.OS === "android" ? 80 : 24, // More space on Android above nav buttons
          marginHorizontal: 30,
          alignSelf: "center",
          width: "auto",
          borderRadius: 20,
          height: 52,
          backgroundColor: "#ffffff",
          borderTopWidth: 0,

          // Shadow for iOS
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,

          // Shadow for Android
          elevation: 5,

          // Fixes icon alignment inside the floating container
          paddingBottom: Platform.OS === "ios" ? 0 : 10,
        },
        tabBarItemStyle: {
          height: 54, // Centers the tab items vertically
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Stats"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Rootlayout;
