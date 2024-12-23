import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "../../../lib/supabase"; // Adjust the path as needed

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from Supabase
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*");
      // console.log(data);
      if (error) throw error;

      // Fetch product counts for each category
      const categoriesWithCounts = await Promise.all(
        data.map(async (category) => {
          const { count, error } = await supabase
            .from("products")
            .select("*", { count: "exact" })
            .eq("category_id", category.categoryid); // Match categoryid with products table

          if (error) {
            console.error("Error fetching product count:", error.message);
            category.count = 0; // Set count to 0 if error occurs
          } else {
            category.count = count;
          }
          return category;
        })
      );
      setCategories(categoriesWithCounts); // Update the state with category counts
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderCategory = ({ item, index }) => {
    let imageSource;

    // List of locally available images with their static imports
    const localImages = {
      "Slab.png": require("../../../assets/images/Slab.png"),
      "Girder.png": require("../../../assets/images/Girder.png"),
      "bw-column.png": require("../../../assets/images/bw-column.png"),
      "boundary-wall.png": require("../../../assets/images/boundary-wall.png"),
    };

    // Extract the image file name from the dynamic path
    const imageName = item.image.split("/").pop(); // Get the file name from the path

    // Check if the image name exists in the localImages mapping
    imageSource = localImages[imageName] || null;

    if (!imageSource) {
      console.warn("Image not found for:", item.image); // Log a warning if image not found
    }

    return (
      <TouchableOpacity
        style={[styles.categoryCard, { marginLeft: index % 2 === 0 ? 0 : 16 }]}
        onPress={() =>
          router.push({
            pathname: `categories/${item.categoryid}`,
            params: { categoryName: item.categoryname },
          })
        }
        activeOpacity={0.8}
      >
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            {imageSource ? (
              <Image
                source={imageSource}
                style={styles.categoryImage}
                resizeMode="cover"
              />
            ) : (
              <Text>Image not available</Text>
            )}
          </View>
          <View style={styles.textContent}>
            <Text style={styles.categoryName}>{item.categoryname}</Text>
            <Text style={styles.count}>
              {item.count + " Items" || "No items listed"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Card */}
      <Animated.View style={styles.heroCard}>
        <View style={styles.heroContent}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Building</Text>
            <Text style={styles.heroTitleHighlight}>Excellence</Text>
            <Text style={styles.heroSubtitle}>Transforming Spaces with</Text>
            <Text style={styles.heroSubtitleBold}>Premium Materials</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15+ Years</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+ Projects</Text>
          </View>
        </View>
      </Animated.View>

      {/* Categories Section */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Our Categories</Text>
        {loading ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>Loading...</Text>
        ) : (
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.categoryid.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F7",
  },
  heroCard: {
    margin: 16,
    padding: 20,
    backgroundColor: "#2C3E50",
    borderRadius: 20,
    height: 280,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.27,
    elevation: 10,
  },
  heroContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 140,
  },
  heroTextContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 34,
  },
  heroTitleHighlight: {
    fontSize: 32,
    fontWeight: "700",
    color: "#3498db",
    lineHeight: 38,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
  },
  heroSubtitleBold: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 12,
    paddingVertical: 17,
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statDivider: {
    width: 2,
    height: 30,
    backgroundColor: "rgb(52, 152, 219)",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3498db",
  },
  categoriesSection: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2C3E50",
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  categoryCard: {
    width: cardWidth,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10.65,
    elevation: 8,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "column",
  },
  imageContainer: {
    width: "100%",
    height: 140,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryImage: {
    width: "100%",
    height: "120%",
  },
  textContent: {
    padding: 16,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 8,
    textAlign: "center",
  },
  count: {
    fontSize: 14,
    color: "#3498db",
    textAlign: "center",
  },
});
