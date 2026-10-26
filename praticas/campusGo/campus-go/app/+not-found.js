import { StyleSheet, Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import { colors } from '../constants/colors';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Página não encontrada' }} />
      <Text style={styles.title}>Esta tela não existe.</Text>
      <Link href="/" style={styles.link}>
        Voltar para o início
      </Link>
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
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  link: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
});
