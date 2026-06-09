import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { createContext, useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "daytask-tasks";

// ── Type ───────────────────────────────────────────────
export type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  reminder: string | null;
};

// ── Context ────────────────────────────────────────────
type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  setReminder: (id: string, date: string | null) => void;
};

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => {},
  sortOrder: "newest",
  setSortOrder: () => {},
  setReminder: () => {},
});

export const useTaskContext = () => useContext(TaskContext);

// ── Layout ─────────────────────────────────────────────
const RootLayout = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setTasks(parsed.tasks || []);
          setSortOrder(parsed.sortOrder || "newest");
        }
      } catch (e) {
        console.error("Failed to load tasks:", e);
      } finally {
        setLoaded(true);
      }
    };
    load();
  }, []);

 
  useEffect(() => {
    if (!loaded) return;
    const save = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ tasks, sortOrder })
        );
      } catch (e) {
        console.error("Failed to save tasks:", e);
      }
    };
    save();
  }, [tasks, sortOrder, loaded]);

  const setReminder = (id: string, date: string | null) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, reminder: date } : t))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, sortOrder, setSortOrder, setReminder }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#1A1209",
          tabBarInactiveTintColor: "#999999",
          tabBarStyle: {
            position: "absolute",
            bottom: Platform.OS === "android" ? 30 : 24,
            marginHorizontal: 30,
            alignSelf: "center",
            width: "auto",
            borderRadius: 20,
            height: 52,
            backgroundColor: "#68553a",
            borderTopWidth: 0,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
            paddingBottom: Platform.OS === "ios" ? 0 : 10,
          },
          tabBarItemStyle: {
            height: 54,
          },
          sceneStyle: { backgroundColor: "#F5EFE6" },
        }}
      >
        <Tabs.Screen
          name="today"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "calendar" : "calendar-outline"}
                size={20}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "stats-chart" : "stats-chart-outline"}
                size={20}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={20}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </TaskContext.Provider>
  );
};

export default RootLayout;