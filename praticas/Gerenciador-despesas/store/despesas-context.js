import { createContext, useState } from 'react';

const hoje = new Date();
const diasAtras = (dias) =>
  new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - dias);

const DESPESAS_INICIAIS = [
  { id: 'd1', descricao: 'Almoço no restaurante', valor: 45.9, data: diasAtras(1), categoria: 'Alimentação' },
  { id: 'd2', descricao: 'Uber para a faculdade', valor: 23.5, data: diasAtras(2), categoria: 'Transporte' },
  { id: 'd3', descricao: 'Cinema', valor: 38.0, data: diasAtras(4), categoria: 'Lazer' },
  { id: 'd4', descricao: 'Conta de luz', valor: 182.37, data: diasAtras(10), categoria: 'Contas' },
  { id: 'd5', descricao: 'Supermercado', valor: 156.8, data: diasAtras(12), categoria: 'Alimentação' },
  { id: 'd6', descricao: 'Recarga do cartão de ônibus', valor: 50.0, data: diasAtras(15), categoria: 'Transporte' },
  { id: 'd7', descricao: 'Internet', valor: 99.9, data: diasAtras(20), categoria: 'Contas' },
  { id: 'd8', descricao: 'Show', valor: 120.0, data: diasAtras(30), categoria: 'Lazer' },
];

export const DespesasContext = createContext({
  despesas: [],
  adicionarDespesa: (despesa) => {},
  atualizarDespesa: (id, despesa) => {},
  removerDespesa: (id) => {},
});

export default function DespesasContextProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesa(despesa) {
    const id = Date.now().toString();
    setDespesas((atuais) => [{ ...despesa, id }, ...atuais]);
  }

  function atualizarDespesa(id, despesa) {
    setDespesas((atuais) =>
      atuais.map((item) => (item.id === id ? { ...item, ...despesa } : item))
    );
  }

  function removerDespesa(id) {
    setDespesas((atuais) => atuais.filter((item) => item.id !== id));
  }

  return (
    <DespesasContext.Provider
      value={{ despesas, adicionarDespesa, atualizarDespesa, removerDespesa }}
    >
      {children}
    </DespesasContext.Provider>
  );
}
