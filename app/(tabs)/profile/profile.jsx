import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../../../lib/supabase";
import { navigate } from "expo-router/build/global-state/routing";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  async function fetchUserInfo() {
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
      setUser(profileData);
      setFullName(profileData.customername);
      
    }
    catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error fetching user:', error);
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
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../../assets/images/avatar.png")}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editButton}>
            <Feather name="edit-2" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>
          {fullName|| "No Name"}
        </Text>
        <Text style={styles.email}>{user?.email || "No email available"}</Text>
      </View>

      {/* Info Cards */}
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.infoCard} onPress={() => router.push("profile/orders")}>
          <Feather name="shopping-bag" size={24} color="#4A4A4A" />
          <Text style={styles.infoTitle}>My Orders</Text>
        </TouchableOpacity>
        <View style={styles.infoCard}>
          <Feather name="heart" size={24} color="#4A4A4A" />
          <Text style={styles.infoTitle}>Wishlist</Text>
        </View>
      </View>

      {/* Settings List */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem} onPress={() => router.push("profile/personalDetails")}>
          <Feather name="user" size={24} color="#4A4A4A" />
          <Text style={styles.settingText}>Personal Details</Text>
          <Feather name="chevron-right" size={24} color="#4A4A4A" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push("profile/shippingDetails")}>
          <Feather name="map-pin" size={24} color="#4A4A4A" />
          <Text style={styles.settingText}>Shipping Address</Text>
          <Feather name="chevron-right" size={24} color="#4A4A4A" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Feather name="bell" size={24} color="#4A4A4A" />
          <Text style={styles.settingText}>Notifications</Text>
          <Feather name="chevron-right" size={24} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.push("/login")}
      >
        <Feather name="log-out" size={24} color="#FF4B4B" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#FFF",
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D2D2D",
  },
  email: {
    fontSize: 16,
    color: "#6B6B6B",
    marginTop: 5,
    width: "50%",
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  infoCard: {
    backgroundColor: "#FFF",
    paddingTop: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "45%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 16,
    color: "#6B6B6B",
    margin: 15,
    width: "70%",
    textAlign: "center",
  },
  infoValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D2D2D",
    marginTop: 5,
    textAlign: "center",
  },
  settingsContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: "#4A4A4A",
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginVertical: 30,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    color: "#FF4B4B",
    marginLeft: 10,
    fontWeight: "600",
  },
});
