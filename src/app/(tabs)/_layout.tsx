import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";

function TabBarBackground() {
  return (
    <BlurView
      intensity={60}
      tint="dark"
      style={StyleSheet.absoluteFill}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "rgba(255,255,255,0.3)",
        tabBarLabelStyle: {
          fontFamily: "Inter_400Regular",
          fontSize: 11,
          letterSpacing: 0.3,
          marginBottom: Platform.OS === "ios" ? 0 : 4,
        },
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0.5,
          borderTopColor: "rgba(255,255,255,0.07)",
          elevation: 0,
          position: "absolute",
        },
        tabBarBackground: () => <TabBarBackground />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconActive : styles.iconInactive}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={20}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          title: "Abbonamenti",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconActive : styles.iconInactive}>
              <Ionicons
                name={focused ? "card" : "card-outline"}
                size={20}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconActive: {
    width: 36,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(99,102,241,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  iconInactive: {
    width: 36,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
});