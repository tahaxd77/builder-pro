import { Stack } from 'expo-router';
import { CartProvider } from '../context/CartContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <CartProvider>
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2C3E50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
    </CartProvider>
  );
}