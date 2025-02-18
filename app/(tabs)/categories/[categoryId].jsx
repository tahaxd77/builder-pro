import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import ProductCard from "../../../components/ProductCard";
import { supabase } from "../../../lib/supabase";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function Products() {
  const { categoryId, categoryName } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const headerHeight = 100;
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", categoryId); // Filter by category_id

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
      setLoading(false);
      Animated.spring(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    };

    fetchProducts();
  }, [categoryId]);

  const renderProduct = ({ item, index }) => (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
          marginLeft: index % 2 === 0 ? 0 : 16,
        },
      ]}
    >
      <ProductCard
        product={item}
        onPress={() => {
          try {
            console.log("Navigating to product:", item.productid); // Debug log
            router.push({
              pathname: `categories/productDetails/${item.productid}`,
              params: {
                productId: item.productid,
                productName: item.product_name,
                price: item.unit_price,
                stock: item.units_in_stock,
              },
            });
          } catch (error) {
            console.error("Navigation error:", error);
          }
        }}
      />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            transform: [{ translateY: headerTranslateY }],
            zIndex: 1,
            opacity: headerOpacity,
          },
        ]}
      >
        <LinearGradient colors={["#1E3B70", "#29539B"]} style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{categoryName}</Text>
        </LinearGradient>
      </Animated.View>

      {/* Loading state */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E3B70" />
        </View>
      ) : (
        <Animated.FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.productid.toString()}
          numColumns={2}
          contentContainerStyle={[
            styles.listContainer,
            { paddingTop: headerHeight + 10 },
          ]}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 100,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  header: {
    padding: 17,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
});
