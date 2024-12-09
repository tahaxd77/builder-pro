// components/NavItem.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors'; // Ensure you have a Colors.js exporting necessary colors

const NavItem = ({ name, label, active, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.navItem} 
      onPress={onPress} 
      accessibilityLabel={`Navigate to ${label}`}
    >
      <Feather 
        name={name} 
        size={24} 
        color={active ? Colors.active : Colors.inactive} 
      />
      <Text style={active ? styles.navText : styles.navTextInactive}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: Colors.active, // e.g., "#2C3E50"
    marginTop: 4,
    fontWeight: '600',
  },
  navTextInactive: {
    fontSize: 12,
    color: Colors.inactive, // e.g., "#95A5A6"
    marginTop: 4,
    fontWeight: '600',
  },
});

export default NavItem;