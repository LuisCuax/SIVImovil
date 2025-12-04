import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRondin } from '../contexts/RondinContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function RondinHistory() {
  const { history, loading } = useRondin();
  const [isExpanded, setIsExpanded] = useState(true);

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
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer} onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.title}>Historial de Rondines</Text>
        <MaterialIcons name={isExpanded ? 'expand-less' : 'expand-more'} size={24} color="#ffffff" />
      </TouchableOpacity>
      {isExpanded && (
        loading ? (
          <Text style={styles.loadingText}>Cargando...</Text>
        ) : (
          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text style={styles.emptyText}>No hay historial de rondines.</Text>}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#192633',
    borderRadius: 16,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  itemContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#233548',
    gap: 4,
  },
  itemText: {
    color: '#92acc9',
    fontSize: 14,
  },
  loadingText: {
    color: '#92acc9',
    textAlign: 'center',
  },
  emptyText: {
    color: '#92acc9',
    textAlign: 'center',
  },
});
