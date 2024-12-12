import React from "react";
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
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const categories = [
  {
    id: "1",
    name: "Concrete Girders",
    image: require("../../../assets/images/Slab.png"),
    count: "24 items",
    icon: "ios-construction",
  },
  {
    id: "2",
    name: "Concrete Slabs",
    image: require("../../../assets/images/Girder.png"),
    count: "18 items",
    icon: "ios-home",
  },
  {
    id: "3",
    name: "Boundary Wall Columns",
    image: require("../../../assets/images/bw-column.jpg"),
    count: "12 items",
    icon: "ios-barbell",
  },
  {
    id: "4",
    name: "Boundary Wall",
    image: require("../../../assets/images/boundary-wall.jpg"),
    count: "15 items",
    icon: "ios-build",
  },
];

export default function Home() {
  const renderCategory = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        { marginLeft: index % 2 === 0 ? 0 : 16 },
      ]}
      onPress={() =>
        router.push({
          pathname: `categories/${item.id}`,
           params: {categoryName: item.name },
        })
      }
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <Image
            source={
              typeof item.image === "string" ? { uri: item.image } : item.image
            }
            style={styles.categoryImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.textContent}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.count}>{item.count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
          <View style={styles.decorativeElement}>
            <View style={styles.circle} />
            <View style={styles.line} />
            <View style={[styles.circle, styles.circleSmall]} />
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15+</Text>
            <Text style={styles.statLabel}>Years</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
        </View>
      </Animated.View>

      {/* Categories Section */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Our Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
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
    color: "#BDC3C7",
    marginTop: 8,
  },
  heroSubtitleBold: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  decorativeElement: {
    alignItems: "center",
    marginRight: 10,
    height: 140,
    justifyContent: "center",
    position: "relative",
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#3498db",
    marginBottom: 8,
  },
  circleSmall: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  line: {
    width: 2,
    height: 50,
    backgroundColor: "#3498db",
    marginVertical: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 14,
    color: "#DDE1E6",
    marginTop: 4,
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
    width: "80%",
    height: "80%",
  },
  categoryIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 6,
    borderRadius: 12,
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
    color: "#95A5A6",
    textAlign: "center",
  },
});