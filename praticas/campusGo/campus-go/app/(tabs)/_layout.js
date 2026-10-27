import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../constants/colors';

function tabIcon(name) {
  return ({ color, size }) => <Ionicons name={name} size={size} color={color} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Início', tabBarIcon: tabIcon('megaphone-outline') }}
      />
      <Tabs.Screen
        name="tasks"
        options={{ title: 'Tarefas', tabBarIcon: tabIcon('checkbox-outline') }}
      />
      <Tabs.Screen
        name="wallet"
        options={{ title: 'Bolso', tabBarIcon: tabIcon('wallet-outline') }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Perfil', tabBarIcon: tabIcon('person-circle-outline') }}
      />
    </Tabs>
  );
}
