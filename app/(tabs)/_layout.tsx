import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="care"
        options={{
          title: 'Уход',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'heart' : 'heart'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Магазин',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'shopping-bag' : 'shopping-bag'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Статистика',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bar-chart' : 'bar-chart'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}