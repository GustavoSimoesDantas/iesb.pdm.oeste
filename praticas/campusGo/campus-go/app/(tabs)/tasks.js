import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import AppButton from '../../components/AppButton';
import DoneIcon from '../../components/DoneIcon';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';
import { colors } from '../../constants/colors';

const TASKS = [
  { id: '42', title: 'Lista de exercícios de PDM' },
  { id: '7', title: 'Ler o capítulo de Expo Router' },
  { id: '15', title: 'Revisar para a prova' },
];

export default function TasksScreen() {
  const [place, setPlace] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [doneCount, setDoneCount] = useState(0);

  async function handleCheckIn() {
    setIsLocating(true);
    try {
      const currentPlace = await getCurrentPlace();
      if (!currentPlace) {
        Alert.alert(
          'Sem permissão de localização',
          'Permita o acesso à localização para registrar onde você estudou.'
        );
        return;
      }
      setPlace(currentPlace);
    } catch {
      Alert.alert(
        'Localização indisponível',
        'Não foi possível obter sua posição. Verifique se o GPS está ligado.'
      );
    } finally {
      setIsLocating(false);
    }
  }

  async function handleReminder() {
    try {
      const id = await scheduleReminder('CampusGo: hora de estudar!', 10);
      if (!id) {
        Alert.alert(
          'Sem permissão',
          'Permita as notificações para receber o lembrete.'
        );
        return;
      }
      Alert.alert('Lembrete agendado', 'Você será lembrado em 10 segundos.');
    } catch {
      Alert.alert('Erro', 'Não foi possível agendar o lembrete.');
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      // Sem vibração (ex.: emulador): segue normalmente
    }
    setDoneCount((count) => count + 1);
    Alert.alert('Tarefa concluída');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minhas tarefas</Text>
        {TASKS.map((task) => (
          <Link key={task.id} href={`/task/${task.id}`} style={styles.taskLink}>
            <Text style={styles.taskText}>
              #{task.id} · {task.title}
            </Text>
          </Link>
        ))}
        <AppButton
          title="Nova tarefa"
          icon="add"
          onPress={() => router.push('/new-task')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Check-in de estudo</Text>
        <AppButton
          title={isLocating ? 'Localizando...' : 'Estudei aqui'}
          icon="location-outline"
          variant="outline"
          onPress={handleCheckIn}
          disabled={isLocating}
        />
        {place && (
          <View style={styles.placeBox}>
            <Ionicons name="pin" size={18} color={colors.primary} />
            <Text style={styles.placeText}>{place.label}</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lembrete e conclusão</Text>
        <AppButton
          title="Lembrar em 10 s"
          icon="alarm-outline"
          variant="outline"
          onPress={handleReminder}
        />
        <View style={styles.doneRow}>
          <DoneIcon pulse={doneCount} />
          <View style={styles.doneButton}>
            <AppButton title="Concluir" icon="checkmark" onPress={handleComplete} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  taskLink: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
  },
  taskText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
  },
  placeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primaryLight,
    padding: 12,
    borderRadius: 8,
  },
  placeText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  doneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  doneButton: {
    flex: 1,
  },
});
