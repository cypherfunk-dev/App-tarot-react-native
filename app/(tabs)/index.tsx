import { Card } from "@/components/Card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
const Index = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Card />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
export default Index;
