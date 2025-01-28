import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../../../lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import { supabase } from '../lib/supabse'; // Uncomment if using Supabase

export default function PersonalDetails() {
  const [user, setUser] = useState(null);        // fetched user object
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
        console.log(userResponse.user.email);
        if (error){
            console.error('Error fetching user:', error);
        };
        const {data: profileData, error: profileError} = await supabase
            .from('customers')
            .select('customername, email, phonenumber')
            .eq('email', userResponse?.user?.email)
            .maybeSingle();
        if (profileError) throw profileError;
        console.log(profileData);
        setUser(profileData);
        console.log(user);
        setFullName(profileData.customername);
        setEmail(profileData.email);
        setPhoneNumber(profileData.phonenumber);
      }
      catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    })();

    // // Mock data for demonstration:
    // const mockData = {
    //   full_name: 'John Doe',
    //   phone: '1234567890',
    // };
    // setUser(mockData);
    // setFullName(mockData.full_name);
    // setPhoneNumber(mockData.phone);
    // setLoading(false);
  }, []);

  // Save updates
  async function handleSave() {
    setLoading(true);
    try {
      // Example with Supabase:
      const updates = {
        customername: fullName,
        phonenumber: phoneNumber,
        email: email,
      };
      const { error } = await supabase.from('customers')
        .update(updates)
        .match({ email: user.email });
      if (error) throw error;

      // Update local user
      setUser(prev => ({
        ...prev,
        customername: fullName,
        email: email,
        phone: phoneNumber,
      }));
      Alert.alert('Success', 'Personal details updated.');
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
        <Text style={styles.headerTitle}>Personal Details</Text>
      </View>

      {/* Read-only view */}
      {!editMode && (
        <View style={styles.editContainer}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{fullName || 'No Name'}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email || 'No Email'}</Text>

          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{phoneNumber || 'No Email'}</Text>




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
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
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
                setFullName(user.full_name);
                setPhoneNumber(user.phone);
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
  container: {
    flex: 1,
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

  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1E3B70',
  },
  editContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  label: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
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