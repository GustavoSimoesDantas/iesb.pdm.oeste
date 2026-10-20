import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import IconButton from '../components/ui/IconButton';
import ModalCategoria from '../components/ui/ModalCategoria';
import { useExpenses } from '../store/expenses-context';
import { getColors } from '../constants/theme';
import { getFormattedDate, isFutureDate } from '../util/date';

const REGEX_VALOR = /^\d*\.?\d{0,2}$/;

function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }

  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  if (isFutureDate(values.date)) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  return errors;
}

function Campo({ rotulo, erro, colors, children }) {
  return (
    <View style={styles.campo}>
      <Text style={[styles.rotulo, { color: colors.primaryText }]}>{rotulo}</Text>
      {children}
      {erro && <Text style={[styles.textoErro, { color: colors.error }]}>{erro}</Text>}
    </View>
  );
}

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const colors = getColors(useColorScheme());

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const despesaAtual = expenses.find((expense) => expense.id === expenseId);

  const [form, setForm] = useState({
    description: despesaAtual?.description ?? '',
    amount: despesaAtual ? despesaAtual.amount.toFixed(2) : '',
    date: despesaAtual?.date ?? new Date(),
    category: despesaAtual?.category ?? '',
  });
  const [tentouSalvar, setTentouSalvar] = useState(false);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

  // Depois da primeira tentativa de salvar, os erros são recalculados a cada
  // alteração, então a mensagem some assim que o campo é corrigido
  const errors = tentouSalvar ? validate(form) : {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
    });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    setForm((atual) => ({ ...atual, [field]: value }));
  }

  function handleAmountChange(texto) {
    const normalizado = texto.replace(',', '.');
    if (REGEX_VALOR.test(normalizado)) {
      handleChange('amount', normalizado);
    }
  }

  function handleDateChange(event, dataSelecionada) {
    setMostrarCalendario(Platform.OS === 'ios');
    if (event.type === 'set' && dataSelecionada) {
      handleChange('date', dataSelecionada);
    }
  }

  function selecionarCategoria(categoria) {
    handleChange('category', categoria);
    setMostrarCategorias(false);
  }

  function salvar() {
    setTentouSalvar(true);
    if (Object.keys(validate(form)).length > 0) {
      return;
    }

    const expenseData = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  }

  function confirmarExclusao() {
    Alert.alert('Excluir despesa', 'Deseja realmente excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  function estiloInput(campo) {
    return [
      styles.input,
      {
        backgroundColor: colors.card,
        borderColor: errors[campo] ? colors.error : colors.border,
        color: colors.text,
      },
      errors[campo] && styles.inputInvalido,
    ];
  }

  return (
    <KeyboardAvoidingView
      style={[styles.tela, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <Campo rotulo="Descrição" erro={errors.description} colors={colors}>
          <TextInput
            style={estiloInput('description')}
            value={form.description}
            onChangeText={(texto) => handleChange('description', texto)}
            placeholder="Ex: Almoço"
            placeholderTextColor={colors.textMuted}
          />
        </Campo>

        <Campo rotulo="Valor (R$)" erro={errors.amount} colors={colors}>
          <TextInput
            style={estiloInput('amount')}
            value={form.amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor={colors.textMuted}
          />
        </Campo>

        <Campo rotulo="Data" erro={errors.date} colors={colors}>
          <Pressable
            style={({ pressed }) => [estiloInput('date'), pressed && styles.pressionado]}
            onPress={() => setMostrarCalendario((aberto) => !aberto)}
          >
            <Text style={[styles.textoCampo, { color: colors.text }]}>
              {getFormattedDate(form.date)}
            </Text>
            <Ionicons name="calendar-outline" size={20} color={colors.textMuted} />
          </Pressable>
          {mostrarCalendario && (
            <DateTimePicker
              value={form.date}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={handleDateChange}
            />
          )}
        </Campo>

        <Campo rotulo="Categoria" erro={errors.category} colors={colors}>
          <Pressable
            style={({ pressed }) => [
              estiloInput('category'),
              pressed && styles.pressionado,
            ]}
            onPress={() => setMostrarCategorias(true)}
          >
            <Text
              style={[
                styles.textoCampo,
                { color: form.category ? colors.text : colors.textMuted },
              ]}
            >
              {form.category || 'Selecione uma categoria'}
            </Text>
            <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
          </Pressable>
        </Campo>

        <View style={styles.botoes}>
          <Pressable
            style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.textoBotaoCancelar, { color: colors.primary }]}>
              Cancelar
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.botao,
              { backgroundColor: colors.primary },
              pressed && styles.pressionado,
            ]}
            onPress={salvar}
          >
            <Text style={[styles.textoBotao, { color: colors.onPrimary }]}>
              Salvar
            </Text>
          </Pressable>
        </View>

        {isEditing && (
          <View style={[styles.containerExcluir, { borderTopColor: colors.border }]}>
            <IconButton
              icon="trash"
              size={32}
              color={colors.error}
              onPress={confirmarExclusao}
            />
          </View>
        )}
      </ScrollView>

      <ModalCategoria
        visible={mostrarCategorias}
        selecionada={form.category}
        onSelecionar={selecionarCategoria}
        onFechar={() => setMostrarCategorias(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  conteudo: {
    padding: 16,
    paddingBottom: 32,
  },
  campo: {
    marginTop: 16,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputInvalido: {
    borderWidth: 2,
  },
  textoCampo: {
    fontSize: 16,
  },
  textoErro: {
    marginTop: 4,
    fontSize: 13,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
    gap: 12,
  },
  botao: {
    minWidth: 120,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBotao: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textoBotaoCancelar: {
    fontSize: 16,
  },
  pressionado: {
    opacity: 0.6,
  },
  containerExcluir: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    alignItems: 'center',
  },
});
