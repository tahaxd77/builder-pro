// screens/ProductDetail.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import useCartStore from '../../../../stores/useCartStore';
import productsData from '../../../../data/products.json';

export default function ProductDetail({  }) {
    const { productId, productName, price, stock } = useLocalSearchParams();
    const [quantity, setQuantity] = useState(1);
    const [fadeAnim] = useState(new Animated.Value(0));
    const addToCart = useCartStore(state => state.addToCart);
    const cart = useCartStore(state => state.items);
    const displayProduct = productsData.products.find(product =>String(product.ProductID) === String(productId));
    console.log(displayProduct.ProductID);
    const handleAddToCart = () => {
        addToCart({ productId, productName, price, stock }, quantity);
        Alert.alert('Added to Cart', `You have added ${quantity} of ${productName} to your cart.`);
        //router.push('/cart')
      };
    const handleBuyNow = () => {
        addToCart({ productId, productName, price, stock }, quantity);
        router.push('/cart')
    };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.title}>{productName}</Text>
        <Text style={styles.price}>Rs.{price}</Text>
        
        <View style={styles.divider} />
        
        
        
        <View style={styles.stockInfo}>
          <Text style={styles.stockText}>In Stock: {stock} units</Text>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            onPress={() => quantity > 1 && setQuantity(q => q - 1)}
            style={styles.quantityBtn}
          >
            <AntDesign name="minus" size={24} color="white" />
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{quantity}</Text>
          
          <TouchableOpacity 
            onPress={() => quantity < stock && setQuantity(q => q + 1)}
            style={styles.quantityBtn}
          >
            <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
          <Text style={styles.totalPrice}>Rs.{price * quantity}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleBuyNow}>
            <Text style={styles.addToCartText} >Buy Now</Text>
            <Text style={styles.totalPrice}>Rs.{price * quantity}</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 28,
    color: '#E74C3C',
    fontWeight: 'bold',
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  stockInfo: {
    marginTop: 16,
  },
  stockText: {
    fontSize: 14,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  quantityBtn: {
    backgroundColor: '#E74C3C',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  addToCartBtn: {
    backgroundColor: '#E74C3C',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

