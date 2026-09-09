import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { TEXTOS } from '../constants';

function formatarData(iso) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR');
  } catch {
    return '';
  }
}

// Lista das metas. Também não guarda estado próprio:
//   metas    -> array de { id, texto, criadaEm, concluida }
//   onDelete -> recebe o id da meta a remover
//   onToggle -> recebe o id da meta para marcar/desmarcar como concluída
export default function MetaList({ metas, onDelete, onToggle }) {
  return (
    <FlatList
      style={styles.lista}
      data={metas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={metas.length === 0 && styles.vaziaWrapper}
      ListEmptyComponent={<Text style={styles.vazia}>{TEXTOS.listaVazia}</Text>}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Pressable
            style={styles.conteudo}
            android_ripple={{ color: '#d1d5db' }}
            onPress={() => onToggle(item.id)}
          >
            <Text style={[styles.texto, item.concluida && styles.textoConcluido]}>
              {item.texto}
            </Text>
            <Text style={styles.data}>Criada em {formatarData(item.criadaEm)}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.remover, pressed && styles.removerPressionado]}
            android_ripple={{ color: '#b91c1c' }}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.removerTexto}>Remover</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
  },
  vaziaWrapper: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vazia: {
    color: '#6b7280',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  texto: {
    fontSize: 16,
    color: '#111827',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  data: {
    marginTop: 4,
    fontSize: 12,
    color: '#9ca3af',
  },
  remover: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fee2e2',
  },
  removerPressionado: {
    backgroundColor: '#fecaca',
  },
  removerTexto: {
    color: '#b91c1c',
    fontWeight: '600',
  },
});
