
import { useState } from "react";
import { ExpenseCategory, EXPENSE_CATEGORIES } from "@/hooks/useExpenseTracker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ExpenseFormProps {
  onAddExpense: (expense: { amount: number; category: ExpenseCategory; description: string }) => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<ExpenseCategory>("Food");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    onAddExpense({
      amount: parseFloat(amount),
      category,
      description
    });

    // Reset form
    setAmount("");
    setCategory("Food");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          step="0.01"
          min="0"
          className="w-full px-4 py-3 rounded-md bg-background"
          required
        />
      </div>
      
      <div>
        <Select value={category} onValueChange={(value) => setCategory(value as ExpenseCategory)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {EXPENSE_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full px-4 py-3 rounded-md bg-background"
        />
      </div>
      
      <div>
        <Button 
          type="submit" 
          className="w-fit bg-expense-primary hover:bg-expense-primary/90"
        >
          Add Expense
        </Button>
      </div>
    </form>
  );
};
