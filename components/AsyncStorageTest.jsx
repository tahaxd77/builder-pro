// components/AsyncStorageTest.jsx
import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageTest = () => {
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@test_key', 'Test Value');
      const value = await AsyncStorage.getItem('@test_key');
      Alert.alert('AsyncStorage Test', `Stored Value: ${value}`);
    } catch (error) {
      console.error('AsyncStorage Error:', error);
      Alert.alert('AsyncStorage Error', 'Failed to store data.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Test AsyncStorage" onPress={storeData} />
    </View>
  );
};

export default AsyncStorageTest;