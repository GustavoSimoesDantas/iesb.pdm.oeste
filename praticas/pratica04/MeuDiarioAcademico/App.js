import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  ADD_BUTTON_TEXT,
  APP_TITLE,
  FILTER_SWITCH_LABEL,
  INPUT_PLACEHOLDER,
  LIST_TITLE,
} from './labels';

const disciplinasIniciais = [
  { id: '1', nome: 'Programação para Dispositivos Móveis', obrigatoria: true },
  { id: '2', nome: 'Engenharia de Software', obrigatoria: true },
  { id: '3', nome: 'Banco de Dados II', obrigatoria: false },
  { id: '4', nome: 'Redes de Computadores', obrigatoria: false },
];

export default function App() {
  const [disciplinas, setDisciplinas] = useState(disciplinasIniciais);
  const [nomeDisciplina, setNomeDisciplina] = useState('');
  const [apenasObrigatorias, setApenasObrigatorias] = useState(false);

  const handleAdd = () => {
    const nome = nomeDisciplina.trim();
    if (!nome) return;

    setDisciplinas([...disciplinas, { id: Date.now().toString(), nome, obrigatoria: true }]);
    setNomeDisciplina('');
  };

  const disciplinasExibidas = apenasObrigatorias
    ? disciplinas.filter((disciplina) => disciplina.obrigatoria)
    : disciplinas;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.header}>{APP_TITLE}</Text>

          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder={INPUT_PLACEHOLDER}
              value={nomeDisciplina}
              onChangeText={setNomeDisciplina}
            />
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={handleAdd}
            >
              <Text style={styles.buttonText}>{ADD_BUTTON_TEXT}</Text>
            </Pressable>
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>{FILTER_SWITCH_LABEL}</Text>
            <Switch value={apenasObrigatorias} onValueChange={setApenasObrigatorias} />
          </View>

          <Text style={styles.listTitle}>{LIST_TITLE}</Text>
          {disciplinasExibidas.map((disciplina) => (
            <View key={disciplina.id} style={styles.item}>
              <Text style={styles.itemText}>{disciplina.nome}</Text>
            </View>
          ))}
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
    flex: 1, // preenche todo o espaço vertical restante dentro da SafeAreaView
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', // input e botão têm alturas diferentes; centraliza os dois no eixo vertical
    justifyContent: 'space-between', // empurra input e botão para as bordas, deixando o espaço entre eles
    marginBottom: 12,
  },
  input: {
    width: '68%', // ~70% da largura da linha
    borderWidth: 1,
    borderColor: '#c7c7cc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  button: {
    width: '28%', // ~25-30% da largura da linha
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#3478f6',
    alignItems: 'center', // centraliza o texto do botão na horizontal
    justifyContent: 'center', // centraliza o texto do botão na vertical
  },
  buttonPressed: {
    backgroundColor: '#255bb5',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // label à esquerda, switch à direita, sem sobreposição
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    color: '#3c3c43',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  item: {
    margin: 4,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#e5e5ea',
  },
  itemText: {
    fontSize: 15,
  },
});
