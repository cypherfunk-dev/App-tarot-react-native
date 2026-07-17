import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="arcanos"
          options={{
            title: "Arcanos",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "book" : "book-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="tirada"
          options={{
            title: "Tirada",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "shuffle" : "shuffle-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explorar"
          options={{
            title: "Explorar",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "compass" : "compass-outline"}
                color={color}
              />
            ),
          }}
        />
    </Tabs>
  );
};

export default TabLayout;
