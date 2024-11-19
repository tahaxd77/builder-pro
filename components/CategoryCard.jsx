// components/CategoryCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CategoryCard = ({ category, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
      <Image
            source={typeof category.image === 'string' 
              ? { uri: category.image }
              : category.image}
            style={styles.categoryImage}
            resizeMode="cover"
          />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{category.name}</Text>
        <Text style={styles.description}>{category.description}</Text>
        <Text style={styles.count}>{category.count}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  count: {
    fontSize: 12,
    color: '#888',
  }
});

export default CategoryCard;