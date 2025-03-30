import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

export type ExpenseCategory = 
  | 'Food'
  | 'Transportation'
  | 'Housing'
  | 'Utilities'
  | 'Entertainment'
  | 'Healthcare'
  | 'Shopping'
  | 'Personal'
  | 'Education'
  | 'Other';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
}

export interface BudgetInfo {
  total: number;
  spent: number;
  remaining: number;
  percentage: number;
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Food',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Personal',
  'Education',
  'Other',
];

export const useExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<number>(1000); // Default budget
  const [filter, setFilter] = useState<string>('All');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      const storedExpenses = localStorage.getItem('expenses');
      if (storedExpenses) setExpenses(JSON.parse(storedExpenses).map((expense: any) => ({
        ...expense,
        date: new Date(expense.date)
      })));
      
      const storedBudget = localStorage.getItem('budget');
      if (storedBudget) setBudget(parseFloat(storedBudget));
      
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const storedDarkMode = localStorage.getItem('darkMode');
      setDarkMode(storedDarkMode ? storedDarkMode === 'true' : prefersDarkMode);
      
      if (storedDarkMode === 'true' || prefersDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      toast({
        title: "Error",
        description: "Failed to load your expense data",
        variant: "destructive"
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('budget', budget.toString());
  }, [budget]);
  
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      date: new Date()
    };
    
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    toast({
      title: "Expense Added",
      description: `$${expense.amount.toFixed(2)} for ${expense.category}`,
    });
  };

  const removeExpense = (id: string) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    toast({
      title: "Expense Removed",
      description: "The expense has been deleted",
    });
  };

  const updateBudget = (newBudget: number) => {
    setBudget(newBudget);
    toast({
      title: "Budget Updated",
      description: `New budget: $${newBudget.toFixed(2)}`,
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const filteredExpenses = filter === 'All' 
    ? expenses 
    : expenses.filter(expense => expense.category === filter);

  const calculateBudgetInfo = (): BudgetInfo => {
    const spent = expenses.reduce((total, expense) => total + expense.amount, 0);
    const remaining = budget - spent;
    const percentage = budget > 0 ? (spent / budget) * 100 : 0;
    
    return {
      total: budget,
      spent,
      remaining,
      percentage: Math.min(percentage, 100) // Cap at 100%
    };
  };

  const getExpenseChartData = () => {
    const categoryTotals: Record<string, number> = {};
    
    expenses.forEach(expense => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });
    
    return Object.entries(categoryTotals).map(([category, value]) => ({
      name: category,
      value,
    }));
  };

  return {
    expenses,
    filteredExpenses,
    budget,
    filter,
    darkMode,
    addExpense,
    removeExpense,
    updateBudget,
    setFilter,
    toggleDarkMode,
    calculateBudgetInfo,
    getExpenseChartData,
  };
};
