import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRondin } from '../contexts/RondinContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function RondinList() {
  const { rounds, toggleRoundStatus, loading } = useRondin();
  const [isExpanded, setIsExpanded] = useState(true);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={item.status === 'active' ? styles.active : styles.inactive}>
          {item.status === 'active' ? 'Activo' : 'No activo'}
        </Text>
      </View>
      <TouchableOpacity onPress={() => toggleRoundStatus(item.id, item.status)}>
        <MaterialIcons
          name={item.status === 'active' ? 'toggle-on' : 'toggle-off'}
          size={40}
          color={item.status === 'active' ? '#4CAF50' : '#92acc9'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer} onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.title}>Mis Rondines</Text>
        <MaterialIcons name={isExpanded ? 'expand-less' : 'expand-more'} size={24} color="#ffffff" />
      </TouchableOpacity>
      {isExpanded && (
        loading ? (
          <Text style={styles.loadingText}>Cargando...</Text>
        ) : (
          <FlatList
            data={rounds}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text style={styles.emptyText}>No hay rondines creados.</Text>}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#233548',
  },
  itemDetails: {
    gap: 4,
  },
  itemText: {
    color: '#ffffff',
    fontSize: 16,
  },
  active: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  inactive: {
    color: '#92acc9',
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
