import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

export const ExpensesContext = createContext(null);

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.data }
          : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return [...action.payload];
    default:
      return state;
  }
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          // JSON guarda a data como string: converte de volta para Date
          const parsed = JSON.parse(stored).map((expense) => ({
            ...expense,
            date: new Date(expense.date),
          }));
          dispatch({ type: 'SET', payload: parsed });
        }
      } catch (error) {
        console.error('Erro ao carregar as despesas salvas:', error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadExpenses();
  }, []);

  useEffect(() => {
    // Evita sobrescrever os dados salvos com a lista vazia inicial
    if (!isLoaded) {
      return;
    }

    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.error('Erro ao salvar as despesas:', error);
      }
    }

    saveExpenses();
  }, [expenses, isLoaded]);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: { ...expenseData, id: generateId() } });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function clearExpenses() {
    dispatch({ type: 'SET', payload: [] });
  }

  const value = {
    expenses,
    isLoaded,
    addExpense,
    updateExpense,
    deleteExpense,
    clearExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error(
      'useExpenses deve ser usado dentro de um ExpensesContextProvider.'
    );
  }
  return context;
}
