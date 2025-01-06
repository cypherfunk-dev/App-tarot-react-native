import { Tabs } from "expo-router";
import { createContext, useState, useMemo } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export const ApplicationContext = createContext<
  | {
      isLectura: boolean;
      setIsLectura: React.Dispatch<React.SetStateAction<boolean>>;
      isResultado: number[];
      setIsResultado: React.Dispatch<React.SetStateAction<number[]>>;
    }
  | undefined
>(undefined);

const TabLayout = () => {
  const [isLectura, setIsLectura] = useState(false);
  const [isResultado, setIsResultado] = useState<number[]>([]);
  const colorScheme = useColorScheme();

  const contextValue = useMemo(
    () => ({ isLectura, setIsLectura, isResultado, setIsResultado }),
    [isLectura, setIsLectura, isResultado, setIsResultado],
  );

  return (
    <ApplicationContext.Provider value={contextValue}>
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
    </ApplicationContext.Provider>
  );
};

export default TabLayout;
