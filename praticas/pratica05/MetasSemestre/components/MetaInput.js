import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { TEXTOS } from '../constants';

// Componente de entrada: só o TextInput + botão de adicionar.
// Não guarda estado próprio — recebe tudo por props:
//   value        -> texto atual do input (controlado pelo App)
//   onChangeText -> avisa o App quando o usuário digita
//   onAdd        -> dispara a inclusão da meta no App
export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder={TEXTOS.placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />
      <Pressable
        style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
        android_ripple={{ color: '#1e40af' }}
        onPress={onAdd}
      >
        <Text style={styles.botaoTexto}>{TEXTOS.botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#c7c7cc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  botao: {
    width: '27%',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // mantém o android_ripple dentro das bordas arredondadas
  },
  botaoPressionado: {
    backgroundColor: '#1d4ed8',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '600',
  },
});
