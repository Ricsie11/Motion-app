import Spacer from "@/components/Spacer";
import {
  FlatList,
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
import { useTaskContext } from "./_layout";

const FILTERS = ["All", "Pending", "Completed"];
const TAB_BAR_OFFSET = Platform.OS === "android" ? 82 : 76;

const Home = () => {
  const { tasks, setTasks, sortOrder } = useTaskContext();
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const done = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks((prev) => [
      {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        reminder: null,
      },
      ...prev,
    ]);
    setInput("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const sortedTasks = [...tasks].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  const filteredTasks = sortedTasks.filter((t) => {
    if (filter === "Completed") return t.completed;
    if (filter === "Pending") return !t.completed;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Spacer />

      {/* Date + Title */}
      <Text style={styles.title}>{today}</Text>
      <Text style={styles.subtitle}>My Day</Text>

      {/* Progress bar */}
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

      {/* Input row */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add a task for today..."
          style={[styles.input, { backgroundColor: "#EDE5D8" }]}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={addTask} style={styles.addBtn}>
          <Ionicons name="add" size={20} color="#c5c2be" />
        </TouchableOpacity>
      </View>

      {/* Filter chips */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task list */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>
              {filter === "Completed"
                ? "🎉"
                : filter === "Pending"
                  ? "✅"
                  : "📋"}
            </Text>
            <Text style={styles.emptyText}>
              {filter === "All"
                ? "No tasks yet — add one above!"
                : filter === "Pending"
                  ? "Nothing pending. You're on top of it!"
                  : "No completed tasks yet."}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.taskCard,
              { borderLeftColor: item.completed ? "#4A7C59" : "#C9943A" },
            ]}
          >
            <TouchableOpacity
              onPress={() => toggleTask(item.id)}
              style={styles.checkBtn}
            >
              <Ionicons
                name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                size={22}
                color={item.completed ? "#4A7C59" : "#D8CCBC"}
              />
            </TouchableOpacity>
            <Text
              style={[styles.taskText, item.completed && styles.taskTextDone]}
            >
              {item.text}
            </Text>
            <TouchableOpacity
              onPress={() => deleteTask(item.id)}
              style={styles.deleteBtn}
            >
              <Ionicons name="trash-outline" size={16} color="#8A7060" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Summary strip */}
      {tasks.length > 0 && (
        <View style={styles.summaryRow}>
          <View style={styles.summaryPill}>
            <Text style={styles.summaryLabel}>Pending </Text>
            <Text style={[styles.summaryValue, { color: "#C9943A" }]}>
              {tasks.filter((t) => !t.completed).length}
            </Text>
          </View>
          <View style={styles.summaryPill}>
            <Text style={styles.summaryLabel}>Done </Text>
            <Text style={[styles.summaryValue, { color: "#4A7C59" }]}>
              {done}
            </Text>
          </View>
          <View style={styles.summaryPill}>
            <Text style={styles.summaryLabel}>Total </Text>
            <Text style={[styles.summaryValue, { color: "#2D1F14" }]}>
              {total}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 14,
    paddingBottom: 8,
    color: "#161414",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
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
  addBtn: {
    backgroundColor: "#2D1F14",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  filterRow: {
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 99,
    borderWidth: 1.5,
    borderColor: "#D8CCBC",
  },
  filterChipActive: {
    backgroundColor: "#2D1F14",
    borderColor: "#2D1F14",
  },
  filterText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#8A7060",
  },
  filterTextActive: {
    color: "#F5EFE6",
  },
  flatList: {
    flex: 1,
    width: "100%",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  taskCard: {
    backgroundColor: "#FBF7F1",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderLeftWidth: 3,
  },
  checkBtn: {
    flexShrink: 0,
  },
  taskText: {
    flex: 1,
    fontSize: 14,
    color: "#2D1F14",
    lineHeight: 20,
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    color: "#B5A090",
  },
  deleteBtn: {
    flexShrink: 0,
    padding: 4,
    opacity: 0.5,
  },
  empty: {
    alignItems: "center",
    paddingTop: 52,
    opacity: 0.5,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 13,
    color: "#8A7060",
    textAlign: "center",
    lineHeight: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#D8CCBC",
    marginBottom: TAB_BAR_OFFSET,
  },
  summaryPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDE5D8",
    borderRadius: 99,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 11,
    color: "#8A7060",
  },
  summaryValue: {
    fontSize: 11,
    fontWeight: "700",
  },
});
