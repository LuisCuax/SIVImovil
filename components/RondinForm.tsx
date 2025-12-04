import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRondin } from '../contexts/RondinContext';

export default function RondinForm() {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [futureLocation, setFutureLocation] = useState('');
  const { createRound } = useRondin();

  const handleCreateRound = () => {
    if (name.trim() && duration.trim() && futureLocation.trim()) {
      createRound(name, parseInt(duration), futureLocation);
      setName('');
      setDuration('');
      setFutureLocation('');
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Rondín</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Rondín"
        placeholderTextColor="#9ca3af"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Duración (minutos)"
        placeholderTextColor="#9ca3af"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Ubicación Futura"
        placeholderTextColor="#9ca3af"
        value={futureLocation}
        onChangeText={setFutureLocation}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateRound}>
        <Text style={styles.buttonText}>Crear Rondín</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#101922',
    color: '#ffffff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#137cec',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
