import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import DespesaSaida from '../components/DespesaSaida/DespesaSaida';
import FiltroCategoria from '../components/FiltroCategoria';
import { DespesasContext } from '../store/despesas-context';
import { TODAS_CATEGORIAS, filtrarPorCategoria } from '../util/filtro';

export default function TodasDespesas() {
  const { despesas } = useContext(DespesasContext);
  const [categoriaFiltro, setCategoriaFiltro] = useState(TODAS_CATEGORIAS);

  const despesasFiltradas = filtrarPorCategoria(despesas, categoriaFiltro);

  return (
    <View style={styles.container}>
      <FiltroCategoria
        selecionada={categoriaFiltro}
        onSelecionar={setCategoriaFiltro}
      />
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={
          categoriaFiltro === TODAS_CATEGORIAS
            ? 'Total'
            : `Total em ${categoriaFiltro}`
        }
        textoVazio="Nenhuma despesa encontrada para esta categoria."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
