
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ExpenseCategory } from "@/hooks/useExpenseTracker"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Food: '#6366f1', // Indigo
    Transportation: '#3b82f6', // Blue
    Housing: '#8b5cf6', // Violet
    Utilities: '#10b981', // Emerald
    Entertainment: '#f59e0b', // Amber
    Healthcare: '#ef4444', // Red
    Shopping: '#ec4899', // Pink
    Personal: '#14b8a6', // Teal
    Education: '#6366f1', // Indigo
    Other: '#64748b', // Slate
  };

  return colors[category as ExpenseCategory] || '#64748b';
}

// USD to INR conversion rate
export const USD_TO_INR_RATE = 83.5;

export function formatCurrency(amount: number): string {
  // Convert USD to INR and format as Indian Rupees
  const inrAmount = amount * USD_TO_INR_RATE;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // No decimal places for INR
  }).format(inrAmount);
}
