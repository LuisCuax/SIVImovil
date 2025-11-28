
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      router.push('/home');
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8fTTtmRSqOF_ckOMW9T2IAQ_OJvRQUSmGKd_R4CoJ6C929-zNuumO52dQX_0babgTVCkx-4zO9fNM8x_KfkPB0m7ktIQCFk6FmQTbdNGIVnwfyPn_fYsQvvvAFY8bkbZTjNHq0wuKDjlCi_VscNyc3YCvvNpAeFDdNLmddJoVvehl9oU6iZ0_FyaMLZzUf9xR8_iVv9FyEshgjh5aB-_W7lpc60ZjYS1pgf0-D_ipTpH87UHwSgfAmlxwXQ6u0MSuVOw-jrLJqdSt" }}
              />
            </View>
            <Text style={styles.title}>Bienvenido a SIVI</Text>
            <Text style={styles.subtitle}>Inicia sesión para comenzar tu ronda</Text>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu email"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  <MaterialIcons name="person" size={24} color="#9ca3af" style={styles.icon} />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contraseña</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu contraseña"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                  <MaterialIcons name="lock" size={24} color="#9ca3af" style={styles.icon} />
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Iniciando...' : 'Iniciar Sesión'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
            <MaterialIcons name="verified-user" size={16} color="#137cec" />
            <Text style={styles.footerText}>Conexión Segura: TLS Activo</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1923',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80, // Space for footer
  },
  innerContainer: {
    width: '100%',
    maxWidth: 448,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  logoContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  logo: {
    width: 96,
    height: 96,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#d1d5db',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    width: '100%',
    gap: 24,
  },
  inputGroup: {
    // Removed flex: 1 to prevent taking up too much space
  },
  label: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 8,
    backgroundColor: '#20354b',
    height: 56,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  icon: {
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingTop: 32,
    paddingBottom: 16,
  },
  button: {
    height: 56,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    backgroundColor: '#0f1923',
    paddingBottom: 24
  },
  footerText: {
    color: '#137cec',
    fontSize: 14,
    fontWeight: '500',
  },
});
