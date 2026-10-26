import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppButton from '../components/AppButton';
import { colors } from '../constants/colors';

export default function NewTaskModal() {
  return (
    <View style={styles.container}>
      <Ionicons name="create-outline" size={56} color={colors.primary} />
      <Text style={styles.title}>Nova tarefa</Text>
      <Text style={styles.subtitle}>
        Esta tela abre como modal pela rota /new-task.
      </Text>
      <AppButton title="Fechar" icon="close" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
  },
});
