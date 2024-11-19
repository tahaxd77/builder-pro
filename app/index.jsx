import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ImageBackground,
    StatusBar 
  } from 'react-native';
  import { router } from 'expo-router';
  
  export default function GettingStarted() {
    return (
      <ImageBackground
        source={require('../assets/images/bg-image.jpg')}
        style={styles.backgroundImage}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Welcome to Builders Pro</Text>
            <Text style={styles.subtitle}>
              Trusted Name in the Precast Dealership
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/categories')}
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
    backgroundImage:{
      flex: 1,
      resizeMode: 'cover',
      height: '100%',
      width: '100%',

    },
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      paddingBottom: 40,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
      justifyContent: 'center',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: '#fff',
      marginBottom: 30,
      justifyContent: 'center',
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#E74C3C',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  