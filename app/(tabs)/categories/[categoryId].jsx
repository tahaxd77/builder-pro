import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import productData from '../../../data/products.json';
import ProductCard from '../../../components/ProductCard';
import { StatusBar } from 'react-native';


const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function Products() {
  const { categoryId,categoryName } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const headerHeight = 100;
  const scrollY = useRef(new Animated.Value(0)).current;

const headerTranslateY = scrollY.interpolate({
  inputRange: [0, headerHeight],
  outputRange: [0, -headerHeight],
  extrapolate: 'clamp'
});

const headerOpacity = scrollY.interpolate({
  inputRange: [0, headerHeight],
  outputRange: [1, 0],
  extrapolate: 'clamp'
});


  const filteredProducts = productData.products.filter(product => 
    String(product.CategoryID) === String(categoryId)
  );

  const category = productData.categories?.find(
    cat => String(cat.id) === String(categoryId)
  );

 


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Animated.spring(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    }, 1000);
  }, [categoryId]);

  const renderProduct = ({ item, index }) => (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            })
          }],
          marginLeft: index % 2 === 0 ? 0 : 16,
        }
      ]}
    >
      <ProductCard
        product={item}
        onPress={() => {
          try {
            console.log('Navigating to product:', item.ProductID); // Debug log
            router.push({
              pathname: `categories/productDetails/${item.ProductID}`,
              params: { 
                productId: item.ProductID,
                productName: item.ProductName,
                price: item.UnitPrice,
                stock: item.UnitsInStock
              }
            });
          } catch (error) {
            console.error('Navigation error:', error);
          }
        }}
      />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.headerContainer,
        {
          transform: [{ translateY: headerTranslateY }],
          zIndex: 1,
          opacity: headerOpacity
        }
      ]}>
        <LinearGradient
          colors={['#1E3B70', '#29539B']}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{categoryName}</Text>
          
        </LinearGradient>
      </Animated.View>

      <Animated.FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.ProductID}
        numColumns={2}
        contentContainerStyle={[styles.listContainer, {paddingTop: headerHeight + 10}]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex : 100,
    height: 100,
    
  },
  
  listContainer: {
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    padding:17,
    marginBottom: 12,
    flexDirection: 'row', // Ensure row layout
    alignItems: 'center', // Center align items vertically
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    paddingBottom: 1,
  },
  productCount: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    width: '50%',
    textAlign: 'center',
    paddingBottom: 16,
    flexDirection: "column",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#95A5A6',
    marginTop: 8,
    textAlign: 'center',
  },
});