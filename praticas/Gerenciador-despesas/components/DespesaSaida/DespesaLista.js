import { FlatList } from 'react-native';

import DespesaItem from './DespesaItem';

function renderDespesaItem({ item }) {
  return <DespesaItem {...item} />;
}

export default function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      renderItem={renderDespesaItem}
      keyExtractor={(item) => item.id}
    />
  );
}
