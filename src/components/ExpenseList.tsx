
import { Expense } from "@/hooks/useExpenseTracker";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { getCategoryColor } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ExpenseListProps {
  expenses: Expense[];
  onRemoveExpense: (id: string) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onRemoveExpense }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No expenses found. Add some expenses to get started.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border">
      <div className="p-4 space-y-2">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 rounded-md border bg-card animate-fade-in"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-12 rounded-sm" 
                style={{ backgroundColor: getCategoryColor(expense.category) }}
              />
              <div>
                <p className="font-medium">${expense.amount.toFixed(2)}</p>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">{expense.category}</span>
                  {expense.description && (
                    <span className="text-xs text-muted-foreground ml-2">
                      - {expense.description}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveExpense(expense.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
