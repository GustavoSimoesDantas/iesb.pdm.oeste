import { ActivityIndicator, StyleSheet, View, useColorScheme } from 'react-native';

import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';
import { useExpenses } from '../../store/expenses-context';
import { getColors } from '../../constants/theme';

export default function DespesaSaida({ expenses, periodo, textoVazio, children }) {
  const { isLoaded } = useExpenses();
  const colors = getColors(useColorScheme());

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {children}
      {isLoaded ? (
        <DespesaLista
          expenses={expenses}
          textoVazio={textoVazio}
          header={<DespesaSumario expenses={expenses} periodo={periodo} />}
        />
      ) : (
        <ActivityIndicator style={styles.carregando} color={colors.primary} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  carregando: {
    marginTop: 32,
  },
});
