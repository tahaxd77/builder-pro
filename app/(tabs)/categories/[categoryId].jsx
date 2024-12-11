import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    Image, 
    TouchableOpacity ,
  } from 'react-native';
  import { useLocalSearchParams } from 'expo-router';
  import { useEffect,useState } from 'react';
  import productData from '../../../data/products.json';
  import ProductCard from '../../../components/ProductCard';
  import { router } from 'expo-router';
  

  
  export default function Products() {
    const { categoryId } = useLocalSearchParams();
    

  const filteredProducts = productData.products.filter(product => 
    String(product.CategoryID) === String(categoryId)
  );


  const renderProduct = ({ item }) => (
    
    <ProductCard 
      product={item}
      onPress={() => {
        console.log('Navigating to ProductDetail with ProductID:', item.ProductID);
        router.push({
          pathname: `categories/productDetails/${item.ProductID}`,
          params: { 
            productName: item.ProductName,
            price: item.UnitPrice,
            stock: item.UnitsInStock
          }
        });
      }}
    />
  );

  return (
    <View style={styles.container}>
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.ProductID}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noProducts}>No products found in this category</Text>
      )}
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F6FA',
    },
    listContainer: {
      padding: 10,
    },
    productCard: {
      backgroundColor: '#fff',
      borderRadius: 15,
      marginBottom: 15,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    productImage: {
      width: '100%',
      height: 200,
    },
    productInfo: {
      padding: 15,
    },
    productName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2C3E50',
    },
    productPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#E74C3C',
      marginTop: 10,
    },
    quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
    },
    quantityButton: {
      backgroundColor: '#007AFF',
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    quantityText: {
      fontSize: 16,
      marginHorizontal: 16,
    },
  });