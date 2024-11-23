// components/CartItem.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CartItem = ({ item, onRemove }) => {
  const { product, quantity } = item;
  const subtotal = (product.price * quantity).toFixed(2);

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.productName}>{product.productName}</Text>
        <Text style={styles.price}>Rs. {product.price}</Text>
        <Text style={styles.quantity}>Quantity: {quantity}</Text>
        <Text style={styles.subtotal}>Subtotal: Rs. {subtotal}</Text>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={onRemove}>
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#888',
  },
  subtotal: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  deleteBtn: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 8,
  },
});

export default CartItem;