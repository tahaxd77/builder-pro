import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      const {data: customerId, error: customerError} = await supabase
          .from('customers')
          .select('customerid')
          .eq('email', userData?.user?.email)
          .single();

      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('orderid, status')
        .eq('customerid', customerId.customerid);

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.log('Error fetching orders:', error.message);
    }
  }

  function toggleSelection(orderId) {
    
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(prev => prev.filter(id => id !== orderId));
    } else {
      setSelectedOrders(prev => [...prev, orderId]);
    }
    console.log(selectedOrders)
  }

  async function cancelSelectedOrders() {
    if (selectedOrders.length === 0) {
      Alert.alert('No Orders Selected', 'Please select at least one order to cancel.');
      return;
    }
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'CANCELED' })
        .in('orderid', selectedOrders);

      if (error) throw error;
      Alert.alert('Success', 'Selected orders have been canceled.');
      setSelectedOrders([]);
      fetchOrders();
    } catch (error) {
      Alert.alert('Cancel Error', error.message);
      console.log('Error canceling orders:', error.message);
    }
  }

  function renderOrder({ item }) {
    const isSelected = selectedOrders.includes(item.orderid);
    return (
      <TouchableOpacity
        style={[styles.orderItem, isSelected && { backgroundColor: 'rgba(0, 0, 255, 0.1)' }]}
        onPress={() => toggleSelection(item.orderid)}
      >
        <Text style={styles.orderTitle}>Order #{item.orderid}</Text>
        <Text style={styles.orderStatus}>Status: {item.status}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderid}
        renderItem={renderOrder}
      />
      <TouchableOpacity style={styles.cancelButton} onPress={cancelSelectedOrders}>
        <Text style={styles.cancelButtonText}>Cancel Selected Orders</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F6FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3B70',
    marginBottom: 16,
  },
  orderItem: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  orderStatus: {
    fontSize: 14,
    color: '#777',
  },
  cancelButton: {
    backgroundColor: '#FF4B4B',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});