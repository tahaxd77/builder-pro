// app/_layout.jsx
import React, { Suspense } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Suspense
        fallback={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#2C3E50" />
          </View>
        }
      >
        <Slot />
      </Suspense>
    </SafeAreaProvider>
  );
}