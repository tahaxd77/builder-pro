import React from 'react';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="profile" />
      <Stack.Screen name="personalDetails" />
      <Stack.Screen name="shippingDetails" />
      {/* Add any other profile-related screens here */}
    </Stack>
  );
}