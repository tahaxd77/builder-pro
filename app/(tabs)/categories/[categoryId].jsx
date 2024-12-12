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


const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function Products() {
  const { categoryId,categoryName } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
      <LinearGradient
        colors={['#1E3B70', '#29539B']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <Text style={styles.productCount}>
          {filteredProducts.length} Products
        </Text>
      </LinearGradient>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#29539B" />
        </View>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              renderItem={renderProduct}
              keyExtractor={item => item.ProductID}
              numColumns={2}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="cube-outline" size={80} color="#BDC3C7" />
              <Text style={styles.emptyText}>No products found</Text>
              <Text style={styles.emptySubtext}>
                We'll add new products soon!
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    padding: 16,
    paddingTop: 48,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  backButton: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  productCount: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
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