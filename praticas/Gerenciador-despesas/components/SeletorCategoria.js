import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function SeletorCategoria({ opcoes, selecionada, onSelecionar }) {
  return (
    <View style={styles.container}>
      {opcoes.map((opcao) => {
        const ativa = opcao === selecionada;
        return (
          <Pressable
            key={opcao}
            onPress={() => onSelecionar(opcao)}
            style={({ pressed }) => [
              styles.opcao,
              ativa && styles.opcaoAtiva,
              pressed && styles.pressionado,
            ]}
          >
            <Text style={[styles.texto, ativa && styles.textoAtivo]}>
              {opcao}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  opcao: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c7d2fe',
    backgroundColor: '#ffffff',
  },
  opcaoAtiva: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  pressionado: {
    opacity: 0.6,
  },
  texto: {
    fontSize: 13,
    color: '#3730a3',
  },
  textoAtivo: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
