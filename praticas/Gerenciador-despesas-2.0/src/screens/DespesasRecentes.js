import { useMemo } from 'react';

import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();

  const despesasRecentes = useMemo(() => {
    const seteDiasAtras = getDateMinusDays(new Date(), 7);
    return expenses.filter((expense) => expense.date >= seteDiasAtras);
  }, [expenses]);

  return (
    <DespesaSaida
      expenses={despesasRecentes}
      periodo="Últimos 7 dias"
      textoVazio="Nenhuma despesa nos últimos 7 dias. Toque em + para adicionar."
    />
  );
}
