import { useContext, useLayoutEffect, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import SeletorCategoria from '../components/SeletorCategoria';
import IconButton from '../components/IconButton';
import { CATEGORIAS } from '../constants/categorias';
import { DespesasContext } from '../store/despesas-context';
import { getDataFormatada } from '../util/data';

const REGEX_VALOR = /^\d*\.?\d{0,2}$/;
const REGEX_DATA_WEB = /^(\d{2})\/(\d{2})\/(\d{4})$/;

export default function GerenciarDespesa({ route, navigation }) {
  const { despesas, adicionarDespesa, atualizarDespesa, removerDespesa } =
    useContext(DespesasContext);

  const despesaId = route.params?.despesaId;
  const editando = !!despesaId;
  const despesaAtual = despesas.find((despesa) => despesa.id === despesaId);

  const [descricao, setDescricao] = useState(despesaAtual?.descricao ?? '');
  const [valor, setValor] = useState(
    despesaAtual ? despesaAtual.valor.toFixed(2) : ''
  );
  const [data, setData] = useState(despesaAtual?.data ?? new Date());
  const [categoria, setCategoria] = useState(despesaAtual?.categoria ?? '');
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [dataWeb, setDataWeb] = useState(getDataFormatada(data));
  const [erros, setErros] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editando ? 'Editar Despesa' : 'Nova Despesa',
    });
  }, [navigation, editando]);

  function tratarValor(texto) {
    const normalizado = texto.replace(',', '.');
    if (REGEX_VALOR.test(normalizado)) {
      setValor(normalizado);
    }
  }

  function tratarMudancaData(evento, dataSelecionada) {
    setMostrarCalendario(Platform.OS === 'ios');
    if (evento.type === 'set' && dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function tratarDataWeb(texto) {
    setDataWeb(texto);
    const partes = texto.match(REGEX_DATA_WEB);
    if (partes) {
      const [, dia, mes, ano] = partes;
      setData(new Date(Number(ano), Number(mes) - 1, Number(dia)));
    }
  }

  function validar() {
    const novosErros = [];
    const valorNumerico = parseFloat(valor);

    if (descricao.trim().length === 0) {
      novosErros.push('Informe a descrição.');
    }
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      novosErros.push('Informe um valor maior que zero.');
    }
    if (categoria === '') {
      novosErros.push('Selecione uma categoria.');
    }
    if (Platform.OS === 'web' && !REGEX_DATA_WEB.test(dataWeb)) {
      novosErros.push('Informe a data no formato DD/MM/AAAA.');
    }

    setErros(novosErros);
    return novosErros.length === 0;
  }

  function confirmar() {
    if (!validar()) {
      return;
    }

    const despesa = {
      descricao: descricao.trim(),
      valor: parseFloat(valor),
      data,
      categoria,
    };

    if (editando) {
      atualizarDespesa(despesaId, despesa);
    } else {
      adicionarDespesa(despesa);
    }
    navigation.goBack();
  }

  function excluir() {
    removerDespesa(despesaId);
    navigation.goBack();
  }

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.rotulo}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Almoço"
      />

      <Text style={styles.rotulo}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={tratarValor}
        keyboardType="decimal-pad"
        placeholder="0.00"
      />

      <Text style={styles.rotulo}>Data</Text>
      {Platform.OS === 'web' ? (
        <TextInput
          style={styles.input}
          value={dataWeb}
          onChangeText={tratarDataWeb}
          placeholder="DD/MM/AAAA"
        />
      ) : (
        <Pressable
          style={({ pressed }) => [styles.input, pressed && styles.pressionado]}
          onPress={() => setMostrarCalendario(true)}
        >
          <Text style={styles.textoData}>{getDataFormatada(data)}</Text>
        </Pressable>
      )}
      {mostrarCalendario && (
        <DateTimePicker
          value={data}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          maximumDate={new Date()}
          onChange={tratarMudancaData}
        />
      )}

      <Text style={styles.rotulo}>Categoria</Text>
      <SeletorCategoria
        opcoes={CATEGORIAS}
        selecionada={categoria}
        onSelecionar={setCategoria}
      />

      {erros.length > 0 && (
        <View style={styles.caixaErros}>
          {erros.map((erro) => (
            <Text key={erro} style={styles.textoErro}>
              • {erro}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.botoes}>
        <Pressable
          style={({ pressed }) => [
            styles.botao,
            styles.botaoCancelar,
            pressed && styles.pressionado,
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
          onPress={confirmar}
        >
          <Text style={styles.textoBotao}>
            {editando ? 'Atualizar' : 'Adicionar'}
          </Text>
        </Pressable>
      </View>

      {editando && (
        <View style={styles.containerExcluir}>
          <IconButton icon="trash" size={32} color="#dc2626" onPress={excluir} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  conteudo: {
    padding: 16,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3730a3',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c7d2fe',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  textoData: {
    fontSize: 16,
    color: '#222',
  },
  caixaErros: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#fee2e2',
    borderRadius: 6,
  },
  textoErro: {
    color: '#b91c1c',
    fontSize: 14,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 12,
  },
  botao: {
    minWidth: 120,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: 'transparent',
  },
  textoBotao: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  textoBotaoCancelar: {
    color: '#4f46e5',
  },
  pressionado: {
    opacity: 0.6,
  },
  containerExcluir: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#c7d2fe',
    alignItems: 'center',
  },
});
