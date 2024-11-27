import { Stack } from "expo-router";

export default function Layout() {
  return (
    
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2C3E50",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
  );
}
