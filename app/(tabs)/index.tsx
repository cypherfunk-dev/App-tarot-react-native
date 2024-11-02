import "../../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Inicio from "./inicio";
const Index = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Inicio />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
export default Index;
