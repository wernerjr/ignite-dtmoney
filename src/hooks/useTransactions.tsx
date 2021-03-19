import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions));
  }, [])

  async function createTransaction(transactionInput: TransactionInput){
    const response = await api.post('transactions', transactionInput);
    const { transaction } = response.data;
    setTransactions(history => [...history, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      { children }
    </TransactionsContext.Provider>
    
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}

