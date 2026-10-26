import { useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useExpenses } from '../../store/expenses-context';
import AppButton from '../../components/AppButton';
import { colors } from '../../constants/colors';

export default function WalletScreen() {
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const totalText = `R$ ${total.toFixed(2)}`;

  function handleAdd() {
    const value = parseFloat(amount.replace(',', '.'));
    if (!description.trim() || isNaN(value) || value <= 0) {
      Alert.alert('Dados inválidos', 'Informe a descrição e um valor maior que zero.');
      return;
    }
    addExpense({
      description: description.trim(),
      amount: value,
      date: new Date(),
      category: 'Contas',
    });
    setDescription('');
    setAmount('');
  }

  async function handleShare() {
    try {
      await Share.share({ message: `Gastei ${totalText} neste semestre.` });
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir o compartilhamento.');
    }
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={styles.header}>
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total gasto no semestre</Text>
            <Text style={styles.totalValue}>{totalText}</Text>
          </View>
          <AppButton
            title="Compartilhar resumo"
            icon="share-social-outline"
            onPress={handleShare}
          />

          <View style={styles.form}>
            <TextInput
              style={[styles.input, styles.inputDescription]}
              placeholder="Descrição"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={[styles.input, styles.inputAmount]}
              placeholder="Valor"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
            <Pressable style={styles.addButton} onPress={handleAdd}>
              <Ionicons name="add" size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>Nenhuma despesa registrada.</Text>
      }
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{item.description}</Text>
            <Text style={styles.itemDate}>
              {new Date(item.date).toLocaleDateString('pt-BR')}
            </Text>
          </View>
          <Text style={styles.itemAmount}>R$ {Number(item.amount).toFixed(2)}</Text>
          <Pressable onPress={() => deleteExpense(item.id)} hitSlop={8}>
            <Ionicons name="trash-outline" size={20} color={colors.danger} />
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
  },
  header: {
    gap: 12,
    marginBottom: 6,
  },
  totalCard: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 20,
    gap: 4,
  },
  totalLabel: {
    color: '#DCE7FA',
    fontSize: 14,
  },
  totalValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
  },
  form: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
  },
  inputDescription: {
    flex: 2,
  },
  inputAmount: {
    flex: 1,
  },
  addButton: {
    width: 46,
    borderRadius: 10,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    textAlign: 'center',
    color: colors.muted,
    marginTop: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  itemDate: {
    fontSize: 12,
    color: colors.muted,
  },
  itemAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
});
