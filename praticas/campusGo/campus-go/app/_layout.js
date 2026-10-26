import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ExpensesContextProvider from '../store/expenses-context';
import { colors } from '../constants/colors';

export default function RootLayout() {
  return (
    <ExpensesContextProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerTintColor: colors.primary,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="task/[id]" options={{ title: 'Tarefa' }} />
        <Stack.Screen
          name="new-task"
          options={{ title: 'Nova tarefa', presentation: 'modal' }}
        />
      </Stack>
    </ExpensesContextProvider>
  );
}
