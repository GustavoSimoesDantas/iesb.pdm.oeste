import { Platform, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getColors } from '../../constants/theme';
import { getFormattedDate } from '../../util/date';

export default function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  const colors = getColors(useColorScheme());

  function abrirDespesa() {
    navigation.navigate('GerenciarDespesa', { expenseId: id });
  }

  return (
    <Pressable
      onPress={abrirDespesa}
      style={({ pressed }) => pressed && styles.pressionado}
    >
      <View style={[styles.item, { backgroundColor: colors.card }]}>
        <View style={styles.info}>
          <Text style={[styles.descricao, { color: colors.text }]}>
            {description}
          </Text>
          <View style={styles.linhaDetalhes}>
            <View style={[styles.tagCategoria, { backgroundColor: colors.chip }]}>
              <Text style={[styles.textoCategoria, { color: colors.text }]}>
                {category}
              </Text>
            </View>
            <Text style={[styles.data, { color: colors.textMuted }]}>
              {getFormattedDate(date)}
            </Text>
          </View>
        </View>
        <View
          style={[styles.containerValor, { backgroundColor: colors.primarySoft }]}
        >
          <Text style={[styles.valor, { color: colors.primaryText }]}>
            R$ {amount.toFixed(2)}
          </Text>
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
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      default: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  linhaDetalhes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagCategoria: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 8,
  },
  textoCategoria: {
    fontSize: 12,
    fontWeight: '600',
  },
  data: {
    fontSize: 12,
  },
  containerValor: {
    minWidth: 90,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  valor: {
    fontWeight: 'bold',
  },
});
