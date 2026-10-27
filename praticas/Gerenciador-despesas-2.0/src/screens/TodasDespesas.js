import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategoria from '../components/ui/FiltroCategoria';
import useDebounce from '../hooks/useDebounce';
import { useExpenses } from '../store/expenses-context';
import { ALL_CATEGORIES } from '../constants/categories';
import { getColors } from '../constants/theme';

export default function TodasDespesas() {
  const { expenses, clearExpenses } = useExpenses();
  const colors = getColors(useColorScheme());

  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState(ALL_CATEGORIES);
  const buscaDebounced = useDebounce(busca, 400);

  const despesasFiltradas = useMemo(() => {
    const termo = buscaDebounced.trim().toLowerCase();
    return expenses.filter(
      (expense) =>
        (categoria === ALL_CATEGORIES || expense.category === categoria) &&
        expense.description.toLowerCase().includes(termo)
    );
  }, [expenses, buscaDebounced, categoria]);

  const filtroAtivo = buscaDebounced.trim() !== '' || categoria !== ALL_CATEGORIES;

  function confirmarLimparTudo() {
    Alert.alert(
      'Limpar tudo',
      'Deseja excluir todas as despesas? Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir tudo', style: 'destructive', onPress: clearExpenses },
      ]
    );
  }

  return (
    <DespesaSaida
      expenses={despesasFiltradas}
      periodo={filtroAtivo ? 'Total filtrado' : 'Total'}
      textoVazio={
        expenses.length === 0
          ? 'Nenhuma despesa. Toque em + para adicionar.'
          : 'Nenhuma despesa encontrada. Tente outra busca ou categoria.'
      }
    >
      <View
        style={[
          styles.busca,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          style={[styles.inputBusca, { color: colors.text }]}
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar por descrição"
          placeholderTextColor={colors.textMuted}
          autoCorrect={false}
          returnKeyType="search"
        />
        {busca !== '' && (
          <Pressable onPress={() => setBusca('')} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </Pressable>
        )}
      </View>

      <FiltroCategoria selecionada={categoria} onSelecionar={setCategoria} />

      {expenses.length > 0 && (
        <Pressable
          onPress={confirmarLimparTudo}
          style={({ pressed }) => [styles.limpar, pressed && styles.pressionado]}
        >
          <Ionicons name="trash-outline" size={16} color={colors.error} />
          <Text style={[styles.textoLimpar, { color: colors.error }]}>
            Limpar tudo
          </Text>
        </Pressable>
      )}
    </DespesaSaida>
  );
}

const styles = StyleSheet.create({
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  inputBusca: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
  },
  limpar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 4,
    paddingVertical: 8,
  },
  textoLimpar: {
    fontSize: 13,
    fontWeight: '600',
  },
  pressionado: {
    opacity: 0.6,
  },
});
