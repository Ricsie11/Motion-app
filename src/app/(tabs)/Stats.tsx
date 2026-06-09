import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTaskContext } from "./_layout";

const Stats = () => {
  const { tasks } = useTaskContext();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const pending = total - done;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Overview</Text>
        <Text style={styles.subtitle}>{today}</Text>

        {/* Ring placeholder */}
        <View style={styles.ringCard}>
          <View style={[styles.ring, { borderColor: pct === 100 ? "#4A7C59" : "#C9943A" }]}>
            <Text style={styles.ringPct}>{pct}%</Text>
            <Text style={styles.ringLabel}>complete</Text>
          </View>
          <View style={styles.ringStats}>
            <Text style={styles.ringTotal}>{total}</Text>
            <Text style={styles.ringTotalLabel}>Total Tasks</Text>
            <View style={styles.ringDivider} />
            <View style={styles.ringRow}>
              <View>
                <Text style={styles.ringSubLabel}>Done</Text>
                <Text style={[styles.ringSubValue, { color: "#4A7C59" }]}>
                  {done}
                </Text>
              </View>
              <View>
                <Text style={styles.ringSubLabel}>Left</Text>
                <Text style={[styles.ringSubValue, { color: "#C9943A" }]}>
                  {pending}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Breakdown */}
        {tasks.length > 0 ? (
          <View style={styles.breakdownCard}>
            <Text style={styles.sectionLabel}>Task Breakdown</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${pct}%` }]} />
            </View>
            {tasks.slice(0, 6).map((t) => (
              <View key={t.id} style={styles.breakdownRow}>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: t.completed ? "#4A7C59" : "#C9943A" },
                  ]}
                />
                <Text
                  style={[
                    styles.breakdownText,
                    t.completed && styles.breakdownDone,
                  ]}
                  numberOfLines={1}
                >
                  {t.text}
                </Text>
                <Text style={styles.breakdownStatus}>
                  {t.completed ? "✓" : "○"}
                </Text>
              </View>
            ))}
            {tasks.length > 6 && (
              <Text style={styles.more}>+{tasks.length - 6} more tasks</Text>
            )}
          </View>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📊</Text>
            <Text style={styles.emptyText}>
              Add some tasks to see your stats
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stats;

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
    marginBottom: 10,
  },
  ringCard: {
    backgroundColor: "#FBF7F1",
    borderRadius: 22,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 14,
  },
  ring: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 14,
    borderColor: "#C9943A",
    alignItems: "center",
    justifyContent: "center",
  },
  ringPct: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2D1F14",
  },
  ringLabel: {
    fontSize: 11,
    color: "#8A7060",
  },
  ringStats: {
    flex: 1,
  },
  ringTotal: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2D1F14",
  },
  ringTotalLabel: {
    fontSize: 11,
    color: "#8A7060",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  ringDivider: {
    height: 1,
    backgroundColor: "#D8CCBC",
    marginVertical: 12,
  },
  ringRow: {
    flexDirection: "row",
    gap: 20,
  },
  ringSubLabel: {
    fontSize: 10,
    color: "#8A7060",
    marginBottom: 2,
  },
  ringSubValue: {
    fontSize: 22,
    fontWeight: "600",
  },
  breakdownCard: {
    backgroundColor: "#FBF7F1",
    borderRadius: 22,
    padding: 18,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: "#8A7060",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#EDE5D8",
    borderRadius: 99,
    overflow: "hidden",
    marginBottom: 16,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4A7C59",
    borderRadius: 99,
  },
  breakdownRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  breakdownText: {
    flex: 1,
    fontSize: 13,
    color: "#2D1F14",
  },
  breakdownDone: {
    textDecorationLine: "line-through",
    color: "#B5A090",
  },
  breakdownStatus: {
    fontSize: 11,
    color: "#8A7060",
  },
  more: {
    fontSize: 11,
    color: "#8A7060",
    textAlign: "center",
    paddingTop: 4,
  },
  empty: {
    alignItems: "center",
    paddingTop: 40,
    opacity: 0.5,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 13,
    color: "#8A7060",
  },
  subtitle: {
    fontSize: 14,
    paddingBottom: 20,
    color: "#161414",
    alignSelf: "flex-start",
  },
});
