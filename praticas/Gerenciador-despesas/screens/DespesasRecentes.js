import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import DespesaSaida from '../components/DespesaSaida/DespesaSaida';
import FiltroCategoria from '../components/FiltroCategoria';
import { DespesasContext } from '../store/despesas-context';
import { getDataMenosDias } from '../util/data';
import { TODAS_CATEGORIAS, filtrarPorCategoria } from '../util/filtro';

export default function DespesasRecentes() {
  const { despesas } = useContext(DespesasContext);
  const [categoriaFiltro, setCategoriaFiltro] = useState(TODAS_CATEGORIAS);

  const seteDiasAtras = getDataMenosDias(new Date(), 7);
  const despesasRecentes = despesas.filter(
    (despesa) => despesa.data >= seteDiasAtras
  );
  const despesasFiltradas = filtrarPorCategoria(
    despesasRecentes,
    categoriaFiltro
  );

  return (
    <View style={styles.container}>
      <FiltroCategoria
        selecionada={categoriaFiltro}
        onSelecionar={setCategoriaFiltro}
      />
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo="Últimos 7 dias"
        textoVazio="Nenhuma despesa registrada nos últimos 7 dias."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
