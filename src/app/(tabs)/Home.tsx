import Spacer from "@/components/Spacer";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Spacer />
      <Text style={{ fontSize: 24, fontWeight: "bold", paddingBottom: 8 }}>Hello 👋</Text>
      <Text style={{ fontSize: 16, textAlign: "center" }}>
        Brace yourself for a fun filled journey!!
      </Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
