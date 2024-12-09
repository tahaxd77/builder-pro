// app/(tabs)/_layout.jsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'; // Adjust the path based on your project structure

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'categories':
                iconName = 'list';
                break;
              case 'cart':
                iconName = 'shopping-cart';
                break;
              case 'profile':
                iconName = 'user';
                break;
              case 'products':
                iconName = 'box';
                break;
              default:
                iconName = 'circle';
            }

            return <Feather name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.active,     // e.g., "#2C3E50"
          tabBarInactiveTintColor: Colors.inactive, // e.g., "#95A5A6"
        })}
      >
        <Tabs.Screen name="categories" options={{ title: 'Categories' }} />
        <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});