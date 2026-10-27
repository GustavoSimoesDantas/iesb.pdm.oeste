import { StyleSheet, View } from 'react-native';

import SeletorCategoria from './SeletorCategoria';
import { CATEGORIAS } from '../constants/categorias';
import { TODAS_CATEGORIAS } from '../util/filtro';

const OPCOES_FILTRO = [TODAS_CATEGORIAS, ...CATEGORIAS];

export default function FiltroCategoria({ selecionada, onSelecionar }) {
  return (
    <View style={styles.container}>
      <SeletorCategoria
        opcoes={OPCOES_FILTRO}
        selecionada={selecionada}
        onSelecionar={onSelecionar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#f5f5f5',
  },
});
