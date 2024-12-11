// app/(tabs)/categories/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';

export default function CategoriesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Categories' }}
      />
      <Stack.Screen
        name="[categoryId]"
        options={{ title: 'Category Products' }}
      />
      <Stack.Screen
        name="productDetails/[productId]"
        options={{ title: 'Product Details' }}
      />
    </Stack>
  );
}