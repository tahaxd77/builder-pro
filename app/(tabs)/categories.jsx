import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Dimensions,
  } from "react-native";
  import { router } from "expo-router";
  
  const { width } = Dimensions.get("window");
  const cardWidth = (width - 48) / 2;
  
  const categories = [
    {
      id: "1",
      name: "Concrete Girders",
      image: require("../../assets/images/Slab.png"),
      count: "24 items",
    },
    {
      id: "2",
      name: "Concrete Slabs",
      image: require("../../assets/images/Girder.png"),
      count: "18 items",
    },
    {
      id: "3",
      name: "Boundary Wall Columns",
      image: require("../../assets/images/bw-column.jpg"),
      count: "12 items",
    },
    {
      id: "4",
      name: "Boundary Wall",
      image: require("../../assets/images/boundary-wall.jpg"),
      count: "15 items",
    },
  ];
  
  export default function Home() {
    const renderCategory = ({ item, index }) => (
      <TouchableOpacity
        style={[styles.categoryCard, { marginLeft: index % 2 === 0 ? 0 : 16 }]}
        onPress={() =>
          router.push({
            pathname: "/products",
            params: { categoryName: item.name, categoryId: item.id },
          })
        }
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
    console.log("Home");
  
    return (
      <SafeAreaView style={styles.container}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
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
        </View>
  
        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
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
      backgroundColor: "#F5F6FA",
    },
    heroCard: {
      margin: 16,
      padding: 20, // Reduced padding
      backgroundColor: "#2C3E50",
      borderRadius: 16,
      height: 220, // Increased height
    },
    heroContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start", // Changed to flex-start
      height: 120, // Fixed height for content
    },
    heroTextContainer: {
      flex: 1,
    },
    heroTitle: {
      fontSize: 26, // Slightly reduced
      fontWeight: "bold",
      color: "#fff",
      lineHeight: 32,
    },
    heroTitleHighlight: {
      fontSize: 30, // Slightly reduced
      fontWeight: "bold",
      color: "#3498db",
      lineHeight: 36,
    },
    heroSubtitle: {
      fontSize: 14,
      color: "#E0E0E0",
      marginTop: 4, // Reduced margin
    },
    heroSubtitleBold: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "600",
    },
    decorativeElement: {
      alignItems: "center",
      marginRight: 10,
      height: 120, // Fixed height
      justifyContent: "center",
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
      height: 40,
      backgroundColor: "#3498db",
      marginVertical: 4,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: 12,
      padding: 12,
      marginTop: 16, // Added margin to separate from content
      height: 60, // Fixed height
    },
    statItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    statDivider: {
      width: 1,
      height: 30,
      backgroundColor: "rgba(255,255,255,0.2)",
      marginHorizontal: 15,
    },
    statNumber: {
      fontSize: 18, // Slightly reduced
      fontWeight: "bold",
      color: "#fff",
    },
    statLabel: {
      fontSize: 12,
      color: "#E0E0E0",
      marginTop: 2, // Reduced margin
    },
    categoriesSection: {
      flex: 1,
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#2C3E50",
      marginBottom: 16,
    },
    listContainer: {
      paddingBottom: 80,
    },
    categoryCard: {
      width: cardWidth,
      backgroundColor: "#fff",
      borderRadius: 12,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 3,
      overflow: "hidden",
    },
    cardContent: {
      flexDirection: "column",
    },
    imageContainer: {
      width: "100%",
      height: 120,
      backgroundColor: "#F8F9FA",
    },
    categoryImage: {
      width: "100%",
      height: "100%",
    },
    textContent: {
      padding: 12,
    },
    categoryName: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#2C3E50",
      marginBottom: 4,
    },
    count: {
      fontSize: 12,
      color: "#95A5A6",
    },
    bottomNav: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60, // Adjusted height for a slimmer navbar
        backgroundColor: "#ffffff", // Clean white background
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0", // Subtle top border
        // Removed paddingBottom to maintain consistent height
      },
      navItem: {
        alignItems: "center",
        justifyContent: "center",
        // Removed unnecessary padding and backgrounds
      },
      navText: {
        fontSize: 12, // Comfortable font size
        color: "#2C3E50", // Active color
        marginTop: 4, // Space between icon and text
        fontWeight: "600", // Semi-bold for better readability
        // Removed backgroundColor, padding, borderRadius, shadow, and elevation for simplicity
      },
      navTextInactive: {
        fontSize: 12, // Consistent font size
        color: "#95A5A6", // Inactive color
        marginTop: 4,
        fontWeight: "600",
        // Removed backgroundColor, padding, borderRadius, shadow, and elevation for simplicity
      },
  });
  