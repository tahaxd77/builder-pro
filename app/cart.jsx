// screens/Cart.jsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const handleCheckout = () => {
    Alert.alert('Checkout', 'Proceeding to checkout...');
    // Implement actual checkout logic here
  };

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity 
          style={styles.deleteBtn}
          onPress={() => removeFromCart(item.product.ProductID)}
        >
          <AntDesign name="delete" size={24} color="white" />
        </TouchableOpacity>
      )}
    >
      <View style={styles.cartItem}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.product.ProductName}</Text>
          <Text style={styles.itemPrice}>Rs.{item.product.UnitPrice}</Text>
        </View>
        
        <View style={styles.quantityControl}>
          <Text style={styles.quantity}>x{item.quantity}</Text>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.ProductId}
            contentContainerStyle={styles.listContainer}
          />
          
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>
                Rs.{cartItems.reduce((sum, item) => sum + (item.product.UnitPrice * item.quantity), 0).toFixed(2)}
              </Text>
            </View>
            
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cartItem: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#E74C3C',
    marginTop: 4,
  },
  quantityControl: {
    backgroundColor: '#f8f8f8',
    padding: 8,
    borderRadius: 8,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteBtn: {
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 12,
    marginVertical: 8,
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    elevation: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    color: '#666',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  checkoutBtn: {
    backgroundColor: '#E74C3C',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 32,
  },
  listContainer: {
    paddingBottom: 100,
  },
});