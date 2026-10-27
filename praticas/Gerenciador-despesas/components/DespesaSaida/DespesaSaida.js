import { StyleSheet, Text, View } from 'react-native';

import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

export default function DespesaSaida({ despesas, periodo, textoVazio }) {
  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      {despesas.length > 0 ? (
        <DespesaLista despesas={despesas} />
      ) : (
        <Text style={styles.textoVazio}>{textoVazio}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#f5f5f5',
  },
  textoVazio: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 15,
    color: '#666',
  },
});
