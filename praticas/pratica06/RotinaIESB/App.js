import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import {
  botaoAdicionar,
  compromissoVazioMensagem,
  compromissoVazioTitulo,
  erroCarregar,
  erroSalvar,
  listaVazia,
  placeholderCompromisso,
  STORAGE_KEY,
  tituloApp,
  tituloLista,
} from './labels';

export default function App() {
  const [texto, setTexto] = useState('');
  const [categoria, setCategoria] = useState('aula');
  const [compromissos, setCompromissos] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  // Só passa a salvar depois que a carga inicial terminar, senão o
  // useEffect de salvamento sobrescreveria o storage com [] na montagem.
  const [carregou, setCarregou] = useState(false);

  // useEffect de CARGA — deps [] => roda uma única vez, na montagem do app.
  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json != null) {
          setCompromissos(JSON.parse(json));
        }
      } catch (erro) {
        Alert.alert('Ops', erroCarregar);
      } finally {
        setCarregou(true);
      }
    }
    carregarCompromissos();
  }, []);

  // useEffect de SALVAMENTO — roda toda vez que a lista de compromissos muda.
  useEffect(() => {
    if (!carregou) return;
    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert('Ops', erroSalvar);
      }
    }
    salvarCompromissos();
  }, [compromissos, carregou]);

  const adicionarCompromisso = () => {
    const limpo = texto.trim();
    if (!limpo) {
      Alert.alert(compromissoVazioTitulo, compromissoVazioMensagem);
      return;
    }
    const novo = {
      id: Date.now().toString(),
      texto: limpo,
      categoria,
      criadoEm: new Date().toISOString(),
    };
    // sempre um array novo (nunca push/splice), para o setState detectar a mudança
    setCompromissos((atuais) => [novo, ...atuais]);
    setTexto('');
  };

  const removerCompromisso = (id) => {
    setCompromissos((atuais) => atuais.filter((item) => item.id !== id));
  };

  const itensFiltrados =
    filtroAtivo === 'todos'
      ? compromissos
      : compromissos.filter((item) => item.categoria === filtroAtivo);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <Text style={styles.titulo}>{tituloApp}</Text>
          </View>

          <CompromissoInput
            value={texto}
            onChangeText={setTexto}
            categoria={categoria}
            onChangeCategoria={setCategoria}
            onAdd={adicionarCompromisso}
            labels={{ placeholder: placeholderCompromisso, botaoAdicionar }}
          />

          <CompromissoList
            itens={itensFiltrados}
            onDelete={removerCompromisso}
            tituloLista={tituloLista}
            listaVazia={listaVazia}
            filtroAtivo={filtroAtivo}
            onChangeFiltro={setFiltroAtivo}
          />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
});
