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
import { supabase } from '../lib/supabase';
// import { supabase } from '../lib/supabse'; // Uncomment if using Supabase

export default function PersonalDetails() {
  const [user, setUser] = useState(null);        // fetched user object
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

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
      <Text style={styles.title}>Personal Details</Text>

      {/* Read-only view */}
      {!editMode && (
        <>
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
        </>
      )}

      {/* Edit mode view */}
      {editMode && (
        <>
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
        </>
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
    padding: 20,
    backgroundColor: '#F5F6FA',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1E3B70',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    color: '#333',
  },
  value: {
    fontSize: 18,
    color: '#555',
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: '#1E3B70',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 18,
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