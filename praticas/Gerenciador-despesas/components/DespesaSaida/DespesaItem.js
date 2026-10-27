import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getDataFormatada } from '../../util/data';

export default function DespesaItem({ id, descricao, valor, data, categoria }) {
  const navigation = useNavigation();

  function abrirDespesa() {
    navigation.navigate('GerenciarDespesa', { despesaId: id });
  }

  return (
    <Pressable
      onPress={abrirDespesa}
      style={({ pressed }) => pressed && styles.pressionado}
    >
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{descricao}</Text>
          <View style={styles.linhaDetalhes}>
            <View style={styles.tagCategoria}>
              <Text style={styles.textoCategoria}>{categoria}</Text>
            </View>
            <Text style={styles.data}>{getDataFormatada(data)}</Text>
          </View>
        </View>
        <View style={styles.containerValor}>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressionado: {
    opacity: 0.6,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  linhaDetalhes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagCategoria: {
    backgroundColor: '#e5e5e5',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 8,
  },
  textoCategoria: {
    fontSize: 12,
    color: '#444',
    fontWeight: '600',
  },
  data: {
    fontSize: 12,
    color: '#666',
  },
  containerValor: {
    minWidth: 90,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#eef2ff',
    borderRadius: 6,
    alignItems: 'center',
  },
  valor: {
    fontWeight: 'bold',
    color: '#3730a3',
  },
});
