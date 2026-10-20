import { StyleSheet, Text, View, useColorScheme } from 'react-native';

import { getColors } from '../../constants/theme';

export default function DespesaSumario({ expenses, periodo }) {
  const colors = getColors(useColorScheme());

  const total = expenses.reduce((soma, expense) => soma + expense.amount, 0);
  const quantidade = expenses.length;

  return (
    <View style={[styles.container, { backgroundColor: colors.primarySoft }]}>
      <View>
        <Text style={[styles.periodo, { color: colors.primaryText }]}>
          {periodo}
        </Text>
        <Text style={[styles.quantidade, { color: colors.primaryText }]}>
          {quantidade} {quantidade === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={[styles.total, { color: colors.primaryText }]}>
        R$ {total.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 6,
    borderRadius: 6,
  },
  periodo: {
    fontSize: 13,
  },
  quantidade: {
    fontSize: 12,
    marginTop: 2,
    opacity: 0.8,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
