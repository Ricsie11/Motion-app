# DailyTask 🗓️

> **Your progress, conquered daily 💪**

A clean, minimal daily task planner built with React Native and Expo. Add tasks, track progress, and stay on top of your day — one task at a time.

---

## Features

- **Add Tasks** — quickly add tasks via the input bar or keyboard submit
- **Toggle Completion** — mark tasks as done with a single tap
- **Delete Tasks** — swipe or tap to remove tasks
- **Filter View** — switch between All, Pending, and Completed tasks
- **Progress Bar** — live visual progress of your day
- **Summary Strip** — at-a-glance count of pending, done, and total tasks
- **Stats Overview** — completion ring and task breakdown on the Stats tab
- **Sort Order** — sort tasks by newest or oldest from Settings
- **Clear All** — wipe all tasks with a two-tap confirm safety check
- **Persistent Storage** — tasks survive app restarts and phone reboots via AsyncStorage

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native |
| Platform | Expo (SDK 51+) |
| Navigation | Expo Router (file-based tabs) |
| Storage | AsyncStorage |
| State | React Context API |
| Icons | Expo Vector Icons (Ionicons) |
| Gradient | expo-linear-gradient |
| Language | TypeScript |

---

## Project Structure

```
app/
  (tabs)/
    _layout.tsx       # Tab navigation, Context, AsyncStorage, Task type
    today.tsx         # Main screen — add, toggle, delete, filter tasks
    stats.tsx         # Overview — completion ring and task breakdown
    settings.tsx      # Sort order, clear tasks, about

assets/
  images/
    icon.jpg          # App icon (1024x1024)

components/
  Spacer.tsx          # Reusable spacer component
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- Android Studio or Xcode (for device simulators)

### Installation

```bash
# Clone the repository
git clone https://github.com/Ricsie11/Motion-app.git

# Navigate into the project
cd Motion-app

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Run on Device

```bash
# Android
npx expo run:android

# iOS
npx expo run:ios

# Expo Go (scan QR)
npx expo start
```

---

## Dependencies

```bash
npx expo install \
  expo-router \
  expo-linear-gradient \
  expo-image \
  expo-splash-screen \
  @react-native-async-storage/async-storage \
  react-native-safe-area-context \
  @expo/vector-icons
```

---

## Color Palette

| Name | Hex | Used For |
|---|---|---|
| Deep Walnut | `#1A1209` | Splash background, app icon |
| Dark Brown | `#2D1F14` | Primary text, buttons, active chips |
| Amber | `#C9943A` | Pending tasks, progress ring, accent |
| Warm Cream | `#F5EFE6` | Screen backgrounds |
| Cream Dark | `#EDE5D8` | Input fields, summary pills |
| Forest Green | `#4A7C59` | Completed tasks, progress fill |
| Muted Brown | `#8A7060` | Labels, subtitles, placeholders |

---

## App Configuration

```json
{
  "expo": {
    "name": "DailyTask",
    "slug": "DailyTask",
    "version": "1.0.0",
    "icon": "./assets/images/icon.jpg",
    "splash": {
      "backgroundColor": "#1A1209"
    }
  }
}
```

---

## Task Data Model

```ts
type Task = {
  id: string;           // unique timestamp-based ID
  text: string;         // task content
  completed: boolean;   // completion status
  createdAt: string;    // ISO date string
  reminder: string | null; // ISO date string or null
};
```

---

## Roadmap

- [ ] Due date picker per task
- [ ] Weekly stats history
- [ ] Dark mode support
- [ ] Task categories / tags
- [ ] Swipe to delete gesture

---

## Developer

Built by Group 2 StandAlone Team 

---

## License

MIT License — free to use, modify, and distribute.