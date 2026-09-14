import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { CATEGORIAS } from '../labels';

// Componente "burro": não guarda estado próprio, só recebe props do App
// (texto digitado, categoria escolhida e callbacks) e desenha a UI.
export default function CompromissoInput({
  value,
  onChangeText,
  categoria,
  onChangeCategoria,
  onAdd,
  labels,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.linhaForm}>
        <TextInput
          style={styles.input}
          placeholder={labels.placeholder}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="done"
          onSubmitEditing={onAdd}
        />
        <Pressable
          style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
          android_ripple={{ color: '#1e3a8a' }}
          onPress={onAdd}
        >
          <Text style={styles.botaoTexto}>{labels.botaoAdicionar}</Text>
        </Pressable>
      </View>

      <View style={styles.linhaCategorias}>
        {CATEGORIAS.map((item) => {
          const selecionada = item.chave === categoria;
          return (
            <Pressable
              key={item.chave}
              style={({ pressed }) => [
                styles.chip,
                selecionada && styles.chipSelecionado,
                pressed && styles.chipPressionado,
              ]}
              android_ripple={{ color: '#93c5fd' }}
              onPress={() => onChangeCategoria(item.chave)}
            >
              <Text style={[styles.chipTexto, selecionada && styles.chipTextoSelecionado]}>
                {item.rotulo}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  linhaForm: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  botao: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linhaCategorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 6,
    backgroundColor: '#fff',
  },
  chipSelecionado: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  chipPressionado: {
    opacity: 0.7,
  },
  chipTexto: {
    fontSize: 13,
    color: '#374151',
  },
  chipTextoSelecionado: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
