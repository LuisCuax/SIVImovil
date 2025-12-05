import { View, StyleSheet, Alert, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { useRondin } from '../../contexts/RondinContext';
import { useFocusEffect } from '@react-navigation/native';
import HomeHeader from '../../components/HomeHeader';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [userName, setUserName] = useState('Guardia');
  const { activeRound, history, loading } = useRondin();
  const [pendingAlertsCount, setPendingAlertsCount] = useState(0);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);

  useEffect(() => {
    async function fetchUserName() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from('guards').select('full_name').eq('id', user.id).single();
        if (error) Alert.alert('Error fetching user data', error.message);
        else if (data) setUserName(data.full_name);
      }
    }
    fetchUserName();
  }, []);

  const fetchPendingAlertsCount = async () => {
    setLoadingAlerts(true);
    const { count, error } = await supabase.from('reports').select('id', { count: 'exact' }).eq('status', 'En espera');
    if (error) console.error('Error fetching pending alerts count:', error);
    else setPendingAlertsCount(count);
    setLoadingAlerts(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPendingAlertsCount();
    }, [])
  );

  useEffect(() => {
    if (activeRound && activeRound.start_time && activeRound.duration_minutes) {
      const interval = setInterval(() => {
        const startTime = new Date(activeRound.start_time);
        const endTime = new Date(startTime.getTime() + activeRound.duration_minutes * 60000);
        const now = new Date();
        const diff = endTime.getTime() - now.getTime();

        if (diff <= 0) {
          setRemainingTime('00:00:00');
          clearInterval(interval);
          return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setRemainingTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setRemainingTime('');
    }
  }, [activeRound]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Nombre: {item.name}</Text>
      <Text style={styles.itemText}>ID: {item.id.substring(0, 8)}</Text>
      <Text style={styles.itemText}>Inicio: {new Date(item.start_time).toLocaleString()}</Text>
      {item.end_time && <Text style={styles.itemText}>Fin: {new Date(item.end_time).toLocaleString()}</Text>}
      <Text style={styles.itemText}>Estado: {item.status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={isHistoryExpanded ? history : []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <HomeHeader
              userName={userName}
              activeRound={activeRound}
              remainingTime={remainingTime}
              pendingAlertsCount={pendingAlertsCount}
              loadingAlerts={loadingAlerts}
            />
            <View style={styles.historyContainer}>
              <TouchableOpacity style={styles.titleContainer} onPress={() => setIsHistoryExpanded(!isHistoryExpanded)}>
                <Text style={styles.title}>Historial de Rondines</Text>
                <MaterialIcons name={isHistoryExpanded ? 'expand-less' : 'expand-more'} size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </>
        }
        ListEmptyComponent={
          isHistoryExpanded ? (
            loading ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : (
              <Text style={styles.emptyText}>No hay historial de rondines.</Text>
            )
          ) : null
        }
        contentContainerStyle={styles.scrollContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101922',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  itemContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#233548',
    gap: 4,
    paddingHorizontal: 16,
  },
  itemText: {
    color: '#92acc9',
    fontSize: 14,
  },
  emptyText: {
    color: '#92acc9',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  historyContainer: {
    backgroundColor: '#192633',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
