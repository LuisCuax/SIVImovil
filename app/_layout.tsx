import { Stack } from 'expo-router';
import { RondinProvider } from '../contexts/RondinContext';

export default function RootLayout() {
  return (
    <RondinProvider>
              <Stack>
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
              </Stack>    </RondinProvider>
  );
}
