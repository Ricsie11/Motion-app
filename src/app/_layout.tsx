import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

type Props = {
  backgroundColor?: string;
};

export default function RootLayout({ backgroundColor = "#121212" }: Props) {
  return (
  
    <SafeAreaProvider style={{ flex: 1, backgroundColor }}>
      <StatusBar style="light" /> 
      <Stack screenOptions={{ contentStyle: { backgroundColor } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
