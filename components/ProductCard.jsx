import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const ProductCard = ({product, onPress}) => {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.ProductName}</Text>
        <Text style={styles.productPrice}>Rs.{product.UnitPrice}</Text>
        <Text style={styles.stockInfo}>In Stock: {product.UnitsInStock} units</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
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
      stockInfo: {
        fontSize: 14,
        color: '#888',
      },
})