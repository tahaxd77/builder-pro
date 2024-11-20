import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import { router } from "expo-router";

export default function GettingStarted() {
  return (
    <ImageBackground
      source={require("../assets/images/bg-image.jpg")}
      style={styles.backgroundImage}
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />

      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Welcome to Builders Pro</Text>
          <Text style={styles.subtitle}>
            Trusted Name in the Precast Dealership
          </Text>
        </View>

        {/* Wrap the button in a View and position it separately */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 30,
    justifyContent: "center",
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "flex-end", // Pushes the button to the bottom
    alignItems: "center", // Centers the button horizontally
    paddingBottom: 30, // Adds spacing from the bottom
    width: "100%", // Ensures the container spans the full width
  },
  button: {
    backgroundColor: "#E74C3C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "90%", // Makes the button span 90% of the screen width
    alignSelf: "center", // Centers the button within the container
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
