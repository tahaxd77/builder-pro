// app/(tabs)/profile.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Profile</Text>
      {/* Implement your profile details here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F6FA',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});