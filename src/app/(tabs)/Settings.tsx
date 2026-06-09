import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTaskContext } from "./_layout";

const Settings = () => {
  const { tasks, setTasks, sortOrder, setSortOrder } = useTaskContext();
  const [confirmClear, setConfirmClear] = useState(false);

  const clearAll = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    setTasks([]);
    setConfirmClear(false);
  };

  const Row = ({
    label,
    sub,
    right,
  }: {
    label: string;
    sub?: string;
    right: React.ReactNode;
  }) => (
    <View style={styles.row}>
      <View>
        <Text style={styles.rowLabel}>{label}</Text>
        {sub && <Text style={styles.rowSub}>{sub}</Text>}
      </View>
      {right}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Settings</Text>

        {/* Preferences */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Preferences</Text>
          <Row
            label="Sort tasks"
            sub="Order tasks appear in list"
            right={
              <View style={styles.sortToggle}>
                <TouchableOpacity
                  onPress={() => setSortOrder("newest")}
                  style={[
                    styles.sortBtn,
                    sortOrder === "newest" && styles.sortBtnActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.sortBtnText,
                      sortOrder === "newest" && styles.sortBtnTextActive,
                    ]}
                  >
                    Newest
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSortOrder("oldest")}
                  style={[
                    styles.sortBtn,
                    sortOrder === "oldest" && styles.sortBtnActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.sortBtnText,
                      sortOrder === "oldest" && styles.sortBtnTextActive,
                    ]}
                  >
                    Oldest
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
          <Row
            label="Tasks stored"
            sub="Saved on your device"
            right={<Text style={styles.taskCount}>{tasks.length}</Text>}
          />
        </View>

        {/* Data */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Data</Text>
          <TouchableOpacity
            onPress={clearAll}
            style={[styles.clearBtn, confirmClear && styles.clearBtnConfirm]}
          >
            <Text
              style={[
                styles.clearBtnText,
                confirmClear && styles.clearBtnTextConfirm,
              ]}
            >
              {confirmClear
                ? "Tap again to confirm — cannot be undone"
                : "Clear all tasks"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>About</Text>
          <Row
            label="DayTask"
            right={<Text style={styles.meta}>v1.0.0</Text>}
          />
          <Row
            label="Built for"
            right={
              <Text style={styles.meta}>Your progress, conquered daily 💪</Text>
            }
          />
          <Row
            label="Storage"
            right={<Text style={styles.meta}>Local device</Text>}
          />
          <Text style={styles.about}>
            A simple daily task planner. Add your tasks, mark them complete, and
            stay on top of your day.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EFE6",
  },
  scroll: {
    padding: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D1F14",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FBF7F1",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: "#8A7060",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8CCBC",
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2D1F14",
  },
  rowSub: {
    fontSize: 11,
    color: "#8A7060",
    marginTop: 2,
  },
  sortToggle: {
    flexDirection: "row",
    backgroundColor: "#EDE5D8",
    borderRadius: 10,
    padding: 3,
    gap: 3,
  },
  sortBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  sortBtnActive: {
    backgroundColor: "#2D1F14",
  },
  sortBtnText: {
    fontSize: 12,
    color: "#8A7060",
  },
  sortBtnTextActive: {
    color: "#F5EFE6",
    fontWeight: "600",
  },
  taskCount: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2D1F14",
  },
  clearBtn: {
    marginTop: 4,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#D8CCBC",
    alignItems: "center",
  },
  clearBtnConfirm: {
    backgroundColor: "#B33A3A",
    borderColor: "#B33A3A",
  },
  clearBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#5C3D2E",
  },
  clearBtnTextConfirm: {
    color: "#fff",
  },
  meta: {
    fontSize: 12,
    color: "#8A7060",
  },
  about: {
    fontSize: 12,
    color: "#8A7060",
    lineHeight: 20,
    paddingTop: 12,
  },
});
