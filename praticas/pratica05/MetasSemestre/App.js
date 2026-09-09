import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';
import { STORAGE_KEY, TEXTOS } from './constants';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  // Enquanto a carga inicial não termina, não salvamos nada: assim o
  // useEffect de salvamento não sobrescreve o storage com [] na montagem.
  const [carregou, setCarregou] = useState(false);

  // useEffect de CARGA — array de deps vazio => roda só uma vez, na montagem.
  useEffect(() => {
    async function carregarMetas() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json != null) {
          setMetas(JSON.parse(json));
        }
      } catch (erro) {
        Alert.alert('Ops', TEXTOS.erroCarregar);
      } finally {
        setCarregou(true);
      }
    }
    carregarMetas();
  }, []);

  // useEffect de SALVAMENTO — roda sempre que "metas" muda (add, delete, toggle).
  useEffect(() => {
    if (!carregou) return;
    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        Alert.alert('Ops', TEXTOS.erroSalvar);
      }
    }
    salvarMetas();
  }, [metas, carregou]);

  const adicionarMeta = () => {
    const limpo = texto.trim();
    if (!limpo) {
      Alert.alert(TEXTOS.metaVaziaTitulo, TEXTOS.metaVaziaMensagem);
      return;
    }
    const nova = {
      id: Date.now().toString(),
      texto: limpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };
    // cria um novo array (nunca push/splice) para o setState detectar a mudança
    setMetas((atuais) => [nova, ...atuais]);
    setTexto('');
  };

  const removerMeta = (id) => {
    setMetas((atuais) => atuais.filter((meta) => meta.id !== id));
  };

  const alternarConcluida = (id) => {
    setMetas((atuais) =>
      atuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta,
      ),
    );
  };

  const pendentes = metas.filter((meta) => !meta.concluida).length;
  const concluidas = metas.length - pendentes;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('./assets/icon.png')} style={styles.logo} />
            <View style={styles.headerTextos}>
              <Text style={styles.titulo}>{TEXTOS.titulo}</Text>
              <Text style={styles.contador}>
                {pendentes} pendentes / {concluidas} concluídas
              </Text>
            </View>
          </View>

          <MetaInput value={texto} onChangeText={setTexto} onAdd={adicionarMeta} />

          <MetaList
            metas={metas}
            onDelete={removerMeta}
            onToggle={alternarConcluida}
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
  headerTextos: {
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  contador: {
    marginTop: 2,
    fontSize: 13,
    color: '#6b7280',
  },
});
