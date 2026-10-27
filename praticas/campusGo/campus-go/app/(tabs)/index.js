import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import useNotices from '../../hooks/useNotices';
import { api } from '../../services/api';
import FadeIn from '../../components/FadeIn';
import AppButton from '../../components/AppButton';
import { colors } from '../../constants/colors';

export default function NoticesScreen() {
  const { notices, isLoading, error, reload } = useNotices();
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreateNotice() {
    setIsCreating(true);
    try {
      const created = await api.create('posts', {
        title: 'Aviso do CampusGo',
        body: 'Aviso criado pelo app.',
        userId: 1,
      });
      Alert.alert('Aviso criado', `O servidor devolveu o id ${created.id}.`);
    } catch (err) {
      Alert.alert('Erro ao criar aviso', err.message);
    } finally {
      setIsCreating(false);
    }
  }

  // Carregamento inicial: a lista ainda não tem nada para mostrar
  if (isLoading && notices.length === 0 && !error) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.muted}>Carregando avisos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={56} color={colors.danger} />
        <Text style={styles.errorTitle}>Não foi possível carregar o mural</Text>
        <Text style={styles.muted}>{error}</Text>
        <AppButton title="Tentar novamente" icon="refresh" onPress={reload} />
      </View>
    );
  }

  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      refreshing={isLoading}
      onRefresh={reload}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.heading}>Mural de avisos</Text>
          <AppButton
            title={isCreating ? 'Enviando...' : 'Criar aviso'}
            icon="add-circle-outline"
            variant="outline"
            onPress={handleCreateNotice}
            disabled={isCreating}
          />
        </View>
      }
      ListEmptyComponent={
        <Text style={[styles.muted, styles.empty]}>Nenhum aviso por enquanto.</Text>
      }
      renderItem={({ item, index }) => (
        <FadeIn delay={index * 80}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardBody}>{item.body}</Text>
          </View>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  header: {
    gap: 12,
    marginBottom: 4,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    textTransform: 'capitalize',
  },
  cardBody: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  muted: {
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
  },
  empty: {
    marginTop: 32,
  },
});
