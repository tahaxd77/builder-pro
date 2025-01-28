import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  LinearGradient,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../../lib/supabase';


export default function ShippingDetails() {
  const [user, setUser] = useState(null);        // fetched user object
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  // Fetch current user info (mocked or from Supabase)
  useEffect(() => {
    // Example with Supabase:
    (async () => {
      try{
        setLoading(true);
        const {data:userResponse,error} = await supabase.auth.getUser();
        if (error){
            console.error('Error fetching user:', error);
        };
        console.log(userResponse);
        const {data: profileData, error: profileError} = await supabase
            .from('customers')
            .select('email,address, city')
            .eq('email', userResponse?.user?.email)
            .maybeSingle();
        if (profileError) throw profileError;
        setUser(profileData);
        console.log(profileData);
        setAddress(profileData.address);
        setCity(profileData.city);
      }
      catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Save updates
  async function handleSave() {
    setLoading(true);
    try {
      // Example with Supabase:
      const updates = {
        address: address,
        city: city,
      };
      const { error } = await supabase.from('customers')
        .update(updates)
        .match({ email: user.email });
      if (error) throw error;

      // Update local user
      setUser(prev => ({
        ...prev,
        address: address,
        city: city,
      }));
      Alert.alert('Success', 'Address details updated.');
      setEditMode(false);
    } catch (error) {
      Alert.alert('Update Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E3B70" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shipping Details</Text>
      </View>

      {/* Read-only view */}
      {!editMode && (
        <View style={styles.editContainer}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{address || 'No Name'}</Text>

          <Text style={styles.label}>City</Text>
          <Text style={styles.value}>{city || 'No Email'}</Text>


          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditMode(true)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Edit mode view */}
      {editMode && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#1E3B70' }]}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.actionButtonText}>Save</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#999' }]}
              onPress={() => {
                // Revert changes
                setAddress(user.address);
                setCity(user.city);
                setEditMode(false);
              }}
              disabled={loading}
            >
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3B70',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  editContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  label: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: '#555',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#1E3B70',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});