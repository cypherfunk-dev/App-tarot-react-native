// import * as FileSystem from "expo-file-system";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as FileSystem from 'expo-file-system';
// import * as Asset from 'expo-asset';

// const loadConfigFromAssets = async () => {
//   try {
//     const asset = Asset.fromModule(require('./assets/config.json'));
//     await asset.downloadAsync(); // Asegúrate de que está descargado

//     const fileUri = asset.localUri;
//     const fileContents = await FileSystem.readAsStringAsync(fileUri);
//     return JSON.parse(fileContents);
//   } catch (error) {
//     console.error('Error reading asset file:', error);
//   }
// };

// export const readLocalData = async () => {
//   const path = `${FileSystem.documentDirectory}tsconfig.json`;
//   try {
//     const fileContents = await FileSystem.readAsStringAsync(path);
//     return JSON.parse(fileContents);
//   } catch (error) {
//     if ((error as any).code === "ENOENT") {
//       console.error("File not found:", path);
//     } else {
//       console.error("Error reading local fileee:", error);
//     }
//   }
// };

// // no implementado aun

// // const downloadConfigFromWeb = async (url) => {
// //   const path = `${FileSystem.documentDirectory}config.json`;
// //   try {
// //     const response = await fetch(url);
// //     const json = await response.json();

// //     // Guarda el archivo en el sistema local
// //     await FileSystem.writeAsStringAsync(path, JSON.stringify(json));
// //     console.log("Config updated successfully:", json);

// //     return json;
// //   } catch (error) {
// //     console.error("Error updating config:", error);
// //   }
// // };

// // const saveConfigToStorage = async (config) => {
// //   try {
// //     await AsyncStorage.setItem("config", JSON.stringify(config));
// //   } catch (error) {
// //     console.error("Error saving config to storage:", error);
// //   }
// // };

// // const loadConfigFromStorage = async () => {
// //   try {
// //     const jsonValue = await AsyncStorage.getItem("config");
// //     return jsonValue != null ? JSON.parse(jsonValue) : null;
// //   } catch (error) {
// //     console.error("Error loading config from storage:", error);
// //   }
// // };

// // const updateConfig = async () => {
// //     try {
// //       const newConfig = await downloadConfigFromWeb(CONFIG_URL);
// //       setConfig(newConfig);
// //       saveConfigToStorage(newConfig);
// //     } catch (error) {
// //       console.warn('Falling back to local storage due to error:', error);
// //       const storedConfig = await loadConfigFromStorage();
// //       setConfig(storedConfig);
// //     }
// //   };
