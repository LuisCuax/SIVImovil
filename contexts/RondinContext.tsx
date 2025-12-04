import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';
import * as Location from 'expo-location';

const RondinContext = createContext();

export const RondinProvider = ({ children }) => {
  const [rounds, setRounds] = useState([]);
  const [activeRound, setActiveRound] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRounds();
    fetchHistory();
  }, []);

  const fetchRounds = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('guard_rounds').select('*');
    if (error) {
      console.error('Error fetching rounds:', error);
    } else {
      setRounds(data);
      const active = data.find(round => round.status === 'active');
      setActiveRound(active);
    }
    setLoading(false);
  };

  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from('guard_rounds')
      .select('*')
      .neq('status', 'active')
      .order('start_time', { ascending: false });

    if (error) {
      console.error('Error fetching history:', error);
    } else {
      setHistory(data);
    }
  };

  const createRound = async (name, duration, futureLocation) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
    }
    let location = await Location.getCurrentPositionAsync({});

    const newRound = {
      name: name,
      duration_minutes: duration,
      start_location_lat: location.coords.latitude,
      start_location_lon: location.coords.longitude,
      future_location_text: futureLocation,
      status: 'active', // New rounds are active by default
    };

    const { data, error } = await supabase.from('guard_rounds').insert([newRound]).select();
    if (error) {
      console.error('Error creating round:', error);
    } else {
      setRounds([...rounds, ...data]);
      setActiveRound(data[0]);
    }
  };

  const toggleRoundStatus = async (roundId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'completed' : 'active';
    const { error } = await supabase.from('guard_rounds').update({ status: newStatus }).eq('id', roundId);
    if (error) {
      console.error('Error updating round status:', error);
    } else {
      fetchRounds();
      fetchHistory();
    }
  };

  return (
    <RondinContext.Provider
      value={{
        rounds,
        activeRound,
        history,
        loading,
        createRound,
        toggleRoundStatus,
      }}
    >
      {children}
    </RondinContext.Provider>
  );
};

export const useRondin = () => {
  return useContext(RondinContext);
};
