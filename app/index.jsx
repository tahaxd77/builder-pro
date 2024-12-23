import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import { supabase } from "../lib/supabase"; // Import Supabase client

const { width, height } = Dimensions.get("window");

export default function GettingStarted() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Check session using Supabase or AsyncStorage
      const { data: session } = await supabase.auth.getSession();
      if (session?.user) {
        router.replace("/categories");
      }
    };

    checkLoginStatus();

    // Parallel animations for initial load
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/bg-image.jpg")}
      style={styles.backgroundImage}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <View style={styles.logoCircle}>
              <Feather name="home" size={40} color="#fff" />
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.contentContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.glassCard}>
              <Animatable.Text animation="fadeInDown" style={styles.title}>
                Builders Pro
              </Animatable.Text>
              <Animatable.Text
                animation="fadeInUp"
                delay={300}
                style={styles.subtitle}
              >
                Premium Quality Precast Solutions
              </Animatable.Text>

              <View style={styles.featuresContainer}>
                {[
                  { icon: "check-circle", text: "Premium Materials" },
                  { icon: "truck", text: "Fast Delivery" },
                  { icon: "shield", text: "Quality Assured" },
                ].map((feature, index) => (
                  <Animatable.View
                    key={index}
                    animation="fadeInRight"
                    delay={600 + index * 200}
                    style={styles.featureItem}
                  >
                    <View style={styles.iconCircle}>
                      <Feather name={feature.icon} size={24} color="#F5F6FA" />
                    </View>
                    <Text style={styles.featureText}>{feature.text}</Text>
                  </Animatable.View>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => router.push("/login")}
            >
              <LinearGradient
                colors={["#1E3B70", "#29539B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Get Started</Text>
                <View style={styles.arrowContainer}>
                  <Feather name="arrow-right" size={20} color="#fff" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 20,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1E3B70",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 32,
    padding: 30,
    backdropFilter: "blur(10px)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 13.16,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 30,
  },
  featuresContainer: {
    marginTop: 13,
    gap: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 12,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.23)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 30,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 12,
  },
  arrowContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    gap: 8,
  },
});
