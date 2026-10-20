import { Pressable, ScrollView, StyleSheet, Text, useColorScheme } from 'react-native';

import { ALL_CATEGORIES, CATEGORIES } from '../../constants/categories';
import { getColors } from '../../constants/theme';

const OPCOES = [ALL_CATEGORIES, ...CATEGORIES];

export default function FiltroCategoria({ selecionada, onSelecionar }) {
  const colors = getColors(useColorScheme());

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >
      {OPCOES.map((opcao) => {
        const ativa = opcao === selecionada;
        return (
          <Pressable
            key={opcao}
            onPress={() => onSelecionar(opcao)}
            style={({ pressed }) => [
              styles.chip,
              { borderColor: colors.border, backgroundColor: colors.card },
              ativa && {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              },
              pressed && styles.pressionado,
            ]}
          >
            <Text
              style={[
                styles.texto,
                { color: ativa ? colors.onPrimary : colors.primaryText },
                ativa && styles.textoAtivo,
              ]}
            >
              {opcao}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Sem isso a ScrollView horizontal estica e ocupa a altura da tela
  scroll: {
    flexGrow: 0,
  },
  container: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  pressionado: {
    opacity: 0.6,
  },
  texto: {
    fontSize: 13,
  },
  textoAtivo: {
    fontWeight: 'bold',
  },
});
