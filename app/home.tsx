
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('Guardia');

  useEffect(() => {
    async function fetchUserName() {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Assuming the 'guards' table has a 'full_name' column and its 'id' matches 'auth.users.id'
        const { data, error } = await supabase
          .from('guards')
          .select('full_name')
          .eq('id', user.id)
          .single();

        if (error) {
          Alert.alert('Error fetching user data', error.message);
        } else if (data) {
          setUserName(data.full_name);
        }
      }
    }

    fetchUserName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profilePicContainer}>
            <Image
              style={styles.profilePic}
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEv_Kqaz6dr9QDmDlD1FxqRBsg8Q6Kd_2zVkvF7u-x0bvlYYymYjziEc5VZjaDVAscWZeXhrxfT_mc226IcqIjk31JGbwNKdVH4kXuLODEZde9asLkSoaK6IelCxVIYHP0xxbqw6cpKdPy1n3h7GOhQ-UPqXN79aQiJtakKCxsPwvyXvNSTGuPe5ytQIMfmBO955lSFDHTcSrqgI4oNJJW_aBO2W76u4iR8s_U1_8LDnx28DOqQLQDI-DZP9PE3ZvoKYtfGVoLPHmp" }}
            />
          </View>
          <Text style={styles.headerTitle}>Bienvenido, {userName}</Text>
        </View>

        {/* Status Banner */}
        <View style={styles.statusBanner}>
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle}>En Ronda Activa</Text>
            <Text style={styles.statusSubtitle}>Ronda Perimetral Norte</Text>
          </View>
          <View style={[styles.statusIconContainer, { backgroundColor: 'rgba(19, 124, 236, 0.2)' }]}>
            <MaterialIcons name="route" size={40} color="#137cec" />
          </View>
        </View>

        {/* Metric Cards */}
        <View style={styles.metricsGrid}>
            {/* Time Remaining Card */}
            <View style={styles.metricCard}>
                <View>
                    <Text style={styles.metricLabel}>Tiempo Restante de Ronda</Text>
                    <Text style={styles.metricValue}>01:25:40</Text>
                </View>
                <View style={styles.metricIconWrapper}>
                    <View style={[styles.metricIconContainer, { backgroundColor: 'rgba(19, 124, 236, 0.2)'}]}>
                        <MaterialIcons name="hourglass-top" size={28} color="#137cec" />
                    </View>
                </View>
            </View>

            {/* Pending Alerts Card */}
            <View style={styles.metricCard}>
                <View>
                    <Text style={styles.metricLabel}>Alertas Pendientes</Text>
                    <Text style={[styles.metricValue, { color: '#ffc107' }]}>3</Text>
                </View>
                <View style={styles.metricIconWrapper}>
                    <View style={[styles.metricIconContainer, { backgroundColor: 'rgba(255, 193, 7, 0.2)'}]}>
                        <MaterialIcons name="warning" size={28} color="#ffc107" />
                    </View>
                </View>
            </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
            <View style={{...styles.navIconContainer, height: 32}}>
                <MaterialIcons name="home" size={24} color="#137cec" />
            </View>
          <Text style={[styles.navText, { color: '#137cec' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/novedades')}>
            <View style={{...styles.navIconContainer, height: 32}}>
                <MaterialIcons name="article" size={24} color="#92acc9" />
            </View>
          <Text style={styles.navText}>Novedades</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/alertas')}>
            <View style={{...styles.navIconContainer, height: 32}}>
                <MaterialIcons name="notifications-active" size={24} color="#92acc9" />
            </View>
          <Text style={styles.navText}>Alertas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101922',
  },
  scrollContent: {
    paddingBottom: 90, // Space for bottom nav
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profilePicContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBanner: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(19, 124, 236, 0.2)',
    borderRadius: 8,
    padding: 16,
  },
  statusTextContainer: {
    flex: 1,
    gap: 4,
  },
  statusTitle: {
    color: '#137cec',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusSubtitle: {
    color: '#92acc9',
    fontSize: 16,
  },
  statusIconContainer: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: 16,
  },
  metricsGrid: {
    marginTop: 8,
    padding: 16,
    gap: 16,
  },
  metricCard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#192633',
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  metricLabel: {
    color: '#92acc9',
    fontSize: 14,
    marginBottom: 4,
  },
  metricValue: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  metricIconWrapper: {
    alignItems: 'flex-end',
  },
  metricIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#192633',
    borderTopWidth: 1,
    borderTopColor: '#233548',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24, // For safe area
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  navIconContainer: {
      justifyContent: 'center',
      alignItems: 'center'
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#92acc9',
  },
});
