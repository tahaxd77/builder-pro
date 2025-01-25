import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useCartStore from '../stores/useCartStore';
import { supabase } from '../lib/supabase';

export default function Checkout() {
  const router = useRouter();
  const cartItems = useCartStore(state => state.items);
  console.log(cartItems);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    shipaddress: '',
    shipcity: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = 100;
  const total = subtotal + deliveryFee;

  const [deliveryDate, setDeliveryDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toDateString(); // or use toISOString() if preferred
  });

  const handleOrder = async () => {
    
    const {data: userResponse, error} = await supabase.auth.getUser();
    const {data:customerId } = await supabase
    .from('customers')
    .select('customerid')
    .eq('email', userResponse?.user?.email)
    .single();
    const {error: insertError} = await supabase
      .from('orders')
      .insert([
        {
          customerid: customerId.customerid,
          orderdate: new Date(),
          shipdate: deliveryDate,
          totalprice: total,
          commission: (total*15)/100,
          carriageid: 1,
          status: 'PENDING',
          ...formData,
        },
      ]);
    if (insertError) {
      console.error('Error inserting order:', insertError.message);
      return;
    }
    else{
      console.log('Order placed successfully');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1E3B70', '#29539B']}
        style={styles.header}
      >
        <TouchableOpacity 
          onPress={() => router.push("/cart")}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.card}>
            {cartItems.map((item, index) => (
              <View key={index} style={styles.orderItem}>
                <Text style={styles.itemName}>{item.product.productName}</Text>
                <Text style={styles.itemPrice}>Rs.{(item.product.price * item.quantity)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Delivery Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => setFormData({...formData, phone: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Delivery Address"
              multiline
              value={formData.address}
              onChangeText={(text) => setFormData({...formData, shipaddress: text})}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="City"
                value={formData.city}
                onChangeText={(text) => setFormData({...formData, shipcity: text})}
              />
            </View>
          </View>
        </View>

        {/* Delivery Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Date</Text>
          <View style={styles.card}>
            <View style={styles.deliveryDateContainer}>
              <Text style={styles.deliveryDateValue}>{deliveryDate}</Text>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.paymentOption}
              onPress={() => setPaymentMethod('cod')}
            >
              <View style={styles.radioButton}>
                {paymentMethod === 'cod' && <View style={styles.radioButtonInner} />}
              </View>
              <Feather name="dollar-sign" size={20} color="#2C3E50" />
              <Text style={styles.paymentText}>Cash on Delivery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Price Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.card}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal</Text>
              <Text style={styles.priceValue}>Rs.{subtotal}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Delivery Fee</Text>
              <Text style={styles.priceValue}>Rs.{deliveryFee}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>Rs.{total}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <TouchableOpacity 
        style={styles.checkoutButton}
        onPress={()=>{
          handleOrder();
          router.push("/cart");
        }}
      >
        <LinearGradient
          colors={['#1E3B70', '#29539B']}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Place Order</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  deliveryDateContainer: {
    padding: 10,
    borderRadius: 8,
  },
  deliveryDateLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  deliveryDateValue: {
    fontSize: 18,
    color: '#555',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    height: 70,
    paddingTop: 9,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    color: '#2C3E50',
    width: '70%',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E74C3C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1E3B70',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E3B70',
  },
  paymentText: {
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 8,
    width:"100%"
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
    width: '72%',
  },
  priceValue: {
    fontSize: 16,
    color: '#E74C3C',
    width: '72%',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    width: '72%',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3B70',
    width: '72%',
  },
  checkoutButton: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});