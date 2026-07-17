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
            title: "Hoy",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "sparkles" : "sparkles-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="arcanos"
          options={{
            title: "Grimorio",
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
          name="diario"
          options={{
            title: "Diario",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "journal" : "journal-outline"}
                color={color}
              />
            ),
          }}
        />
    </Tabs>
  );
};

export default TabLayout;
