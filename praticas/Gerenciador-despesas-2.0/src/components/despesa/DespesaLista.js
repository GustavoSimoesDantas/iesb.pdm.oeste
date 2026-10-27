import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DespesaItem from './DespesaItem';
import { getColors } from '../../constants/theme';

const LARGURA_DUAS_COLUNAS = 600;

export default function DespesaLista({ expenses, header, textoVazio }) {
  const colors = getColors(useColorScheme());
  const { width } = useWindowDimensions();
  const numColumns = width > LARGURA_DUAS_COLUNAS ? 2 : 1;

  function renderDespesaItem({ item }) {
    return (
      <View style={numColumns > 1 && styles.coluna}>
        <DespesaItem {...item} />
      </View>
    );
  }

  return (
    <FlatList
      // FlatList não aceita mudar numColumns sem remontar
      key={numColumns}
      data={expenses}
      renderItem={renderDespesaItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? styles.linha : undefined}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <View style={styles.vazio}>
          <Ionicons name="receipt-outline" size={56} color={colors.textMuted} />
          <Text style={[styles.textoVazio, { color: colors.textMuted }]}>
            {textoVazio}
          </Text>
        </View>
      }
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  linha: {
    gap: 12,
  },
  coluna: {
    flex: 0.5,
  },
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  textoVazio: {
    marginTop: 12,
    fontSize: 15,
    textAlign: 'center',
  },
});
