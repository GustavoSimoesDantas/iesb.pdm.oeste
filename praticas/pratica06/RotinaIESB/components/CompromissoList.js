import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { botaoRemover, CATEGORIAS, filtroTodos } from '../labels';

function rotuloCategoria(chave) {
  const categoria = CATEGORIAS.find((item) => item.chave === chave);
  return categoria ? categoria.rotulo : chave;
}

// Também é um componente "burro": recebe a lista já pronta (props) e só
// desenha os filtros + o FlatList. Toda a lógica de estado mora no App.
export default function CompromissoList({
  itens,
  onDelete,
  tituloLista,
  listaVazia,
  filtroAtivo,
  onChangeFiltro,
}) {
  const opcoesFiltro = [{ chave: 'todos', rotulo: filtroTodos }, ...CATEGORIAS];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <View style={styles.linhaFiltros}>
        {opcoesFiltro.map((opcao) => {
          const selecionado = opcao.chave === filtroAtivo;
          return (
            <Pressable
              key={opcao.chave}
              style={({ pressed }) => [
                styles.filtro,
                selecionado && styles.filtroSelecionado,
                pressed && styles.filtroPressionado,
              ]}
              android_ripple={{ color: '#93c5fd' }}
              onPress={() => onChangeFiltro(opcao.chave)}
            >
              <Text style={[styles.filtroTexto, selecionado && styles.filtroTextoSelecionado]}>
                {opcao.rotulo}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        style={styles.lista}
        data={itens}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.listaVazia}>{listaVazia}</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemTextos}>
              <Text style={styles.itemCategoria}>{rotuloCategoria(item.categoria)}</Text>
              <Text style={styles.itemTexto}>{item.texto}</Text>
            </View>
            <Pressable
              style={({ pressed }) => [styles.botaoRemover, pressed && styles.botaoPressionado]}
              android_ripple={{ color: '#fecaca' }}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.botaoRemoverTexto}>{botaoRemover}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  linhaFiltros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  filtro: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 6,
    backgroundColor: '#fff',
  },
  filtroSelecionado: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  filtroPressionado: {
    opacity: 0.7,
  },
  filtroTexto: {
    fontSize: 12,
    color: '#374151',
  },
  filtroTextoSelecionado: {
    color: '#fff',
    fontWeight: 'bold',
  },
  lista: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  itemTextos: {
    flex: 1,
    marginRight: 10,
  },
  itemCategoria: {
    fontSize: 11,
    color: '#2563eb',
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  itemTexto: {
    fontSize: 15,
    color: '#111827',
  },
  botaoRemover: {
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  botaoPressionado: {
    opacity: 0.7,
  },
  botaoRemoverTexto: {
    color: '#b91c1c',
    fontWeight: 'bold',
    fontSize: 12,
  },
  listaVazia: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 24,
    fontSize: 14,
  },
});
