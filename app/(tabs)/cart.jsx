// Cart.jsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import useCartStore from '../../stores/useCartStore';
import CartItem from '../../components/CartItem';
import { useRouter } from 'expo-router';

export default function Cart() {
  // Select only what you need from the store
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  console.log("items: ", items)
  const router = useRouter();

  // Compute total using useMemo to avoid unnecessary recalculations
  const cartTotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [items]);

  return (
    <View style={styles.container}>
      {items.length > 0 ? (
        <>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <CartItem
                key={item.product.productId}
                item={item}
                onRemove={() => removeFromCart(item.product.productId)}
              />
            )}
            keyExtractor={(item) => item.product.productId}
            contentContainerStyle={styles.listContainer}
          />
          <Text style={styles.totalText}>Total: Rs. {cartTotal.toFixed(2)}</Text>
          <TouchableOpacity style={styles.buyNowButton} onPress={() => router.push('/checkout')}>
          <Text style={styles.buyNowButtonText}>Buy Now</Text>
        </TouchableOpacity>
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
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingBottom: 100,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 32,
  },
  buyNowButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buyNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});