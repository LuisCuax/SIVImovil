import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#137cec',
        tabBarInactiveTintColor: '#92acc9',
        tabBarStyle: styles.tabBar,
        headerShown: false, // Hide default header, each screen will manage its own
        tabBarShowLabel: false, // Hide labels, use custom labels in Tab.Screen
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} label="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="novedades"
        options={{
          title: 'Novedades',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="article" color={color} label="Novedades" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="alertas"
        options={{
          title: 'Alertas',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="notifications-active" color={color} label="Alertas" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="camaras"
        options={{
          title: 'Cámaras',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="videocam" color={color} label="Cámaras" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ name, color, label, focused }) {
  return (
    <View style={styles.tabIconContainer}>
      <MaterialIcons name={name} size={25} color={color} />
      <Text style={[styles.tabIconLabel, { color: color, fontWeight: focused ? 'bold' : 'normal' }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#192633',
    borderTopWidth: 0,
    borderTopColor: '#233548',
    paddingVertical: 50,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconLabel: {
    fontSize: 12,
    marginTop: 1,
  },
});
