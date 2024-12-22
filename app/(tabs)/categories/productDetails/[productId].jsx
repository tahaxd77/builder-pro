import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import useCartStore from '../../../../stores/useCartStore';
import productsData from '../../../../data/products.json';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.4;

export default function ProductDetail() {
  const { productId, productName, price, stock } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const scrollY = useRef(new Animated.Value(0)).current;
  const addToCart = useCartStore(state => state.addToCart);
  const displayProduct = productsData.products.find(
    product => String(product.ProductID) === String(productId)
  );

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT / 2],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Animated Header */}
      <Animated.View
        style={[
            styles.header,
          { transform: [{ translateY: headerTranslateY }] }
        ]}>
  <LinearGradient
    colors={['#1E3B70', '#29539B', '#1E3B70']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.heroGradient}
  >
    <View style={styles.heroContent}>
        <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
      <Animated.View 
        style={[
          styles.priceTag,
          { opacity: imageOpacity }
        ]}
      >
        <Text style={styles.priceAmount}>Concrete</Text>
        <Text style={styles.priceLabel}>Premium Quality Material</Text>
      </Animated.View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Feather name="package" size={24} color="#FFF" />
          <Text style={styles.statValue}>{stock}</Text>
          <Text style={styles.statLabel}>In Stock</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Feather name="truck" size={24} color="#FFF" />
          <Text style={styles.statValue}>24hr</Text>
          <Text style={styles.statLabel}>Delivery</Text>
        </View>
      </View>
    </View>
  </LinearGradient>

  
</Animated.View>
      {/* Content */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        <View style={styles.content}>
          <View style={styles.productInfo}>
            <Text style={styles.category}>Premium Collection</Text>
            <Text style={styles.title}>{productName}</Text>
            <Text style={styles.price}>Rs.{price}</Text>
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.stockInfo}>
              <Feather name="package" size={20} color="#666" />
              <Text style={styles.stockText}>{stock} units in stock</Text>
            </View>

            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={() => quantity > 1 && setQuantity(q => q - 1)}
              >
                <AntDesign name="minus" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={() => quantity < stock && setQuantity(q => q + 1)}
              >
                <AntDesign name="plus" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.description}>
              <Text style={styles.descriptionTitle}>Product Description</Text>
              <Text style={styles.descriptionText}>
                {displayProduct?.Description || 'High-quality product made with premium materials.'}
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            addToCart({ productId, productName, price, stock }, quantity);
          }}
        >
          <Feather name="shopping-cart" size={24} color="white" />
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => {
            addToCart({ productId, productName, price, stock }, quantity);
            router.push('/cart');
          }}
        >
          <Text style={styles.buyButtonText}>Buy Now • Rs.{price * quantity}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroGradient: {
    height: '100%',
    paddingTop: 50,
  },
 
  heroContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  priceTag: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  priceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  priceLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    width: '170',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    width: '90%',
    
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 16,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    width: 60,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: HEADER_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: HEADER_HEIGHT / 2,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    marginTop: HEADER_HEIGHT - 50,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
  productInfo: {
    paddingHorizontal: 20,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    color: '#2C3E50',
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stockText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
    width: '80%',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quantityBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 20,
  },
  description: {
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34495E',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buyButton: {
    flex: 2,
    backgroundColor: '#2C3E50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});