import { StyleSheet, Text, View } from 'react-native';

const LIMITE_ALERTA = 200;

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce(
    (acumulador, item) => acumulador + item.valor,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text
        style={[
          styles.soma,
          somaDespesas > LIMITE_ALERTA && styles.somaAcimaDoLimite,
        ]}
      >
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e0e7ff',
    borderRadius: 6,
  },
  periodo: {
    fontSize: 13,
    color: '#3730a3',
  },
  soma: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3730a3',
  },
  somaAcimaDoLimite: {
    color: '#dc2626',
  },
});
