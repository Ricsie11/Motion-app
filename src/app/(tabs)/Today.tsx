import Spacer from "@/components/Spacer";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const done  = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const pct   = total ? Math.round((done / total) * 100) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Spacer />
      <Text style={styles.title}>{today}</Text>
      <Text style={styles.subtitle}>My Day</Text>

      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={["#4A7C59", "#82B298"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${pct}%` }]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {done}/{total} done
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.view1}>
        <TextInput
          placeholder="Enter your text here..."
          style={[styles.input, { backgroundColor: "#EDE5D8" }]}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#2D1F14",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
          }}
        >
          <Ionicons name="add" size={20} color="#c5c2be" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 14,
    paddingBottom: 8,
    color: "#161414",
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 28,
    alignSelf: "flex-start",
    color: "#161414",
    fontFamily: Platform.select({
      ios: "AvenirNext-Regular",
      android: "sans-serif",
      default: "System",
    }),
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    color: "#161414",
    width: "80%",
  },
  view1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
    width: "100%",
    paddingHorizontal: 20,
  },
  progressTrack: {
    flex: 1,
    height: 5,
    backgroundColor: "#D8CCBC",
    borderRadius: 99,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 99,
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4A7C59",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#D8CCBC",
    marginVertical: 10,
  },
});