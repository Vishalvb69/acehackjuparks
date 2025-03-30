
import { Progress } from "@/components/ui/progress";
import { BudgetInfo } from "@/hooks/useExpenseTracker";

interface BudgetProgressProps {
  budgetInfo: BudgetInfo;
}

export const BudgetProgress: React.FC<BudgetProgressProps> = ({ budgetInfo }) => {
  const { total, spent, remaining, percentage } = budgetInfo;
  
  // Determine color based on percentage
  const getProgressColor = (percentage: number): string => {
    if (percentage >= 90) return 'bg-expense-danger';
    if (percentage >= 75) return 'bg-expense-warning';
    return 'bg-expense-success';
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-2">Budget Progress</h2>
      <div className="flex justify-between text-sm mb-1">
        <span>
          Spent: <span className="font-medium">${spent.toFixed(2)}</span>
        </span>
        <span>
          Remaining: <span className={`font-medium ${remaining < 0 ? 'text-expense-danger' : ''}`}>
            ${remaining.toFixed(2)}
          </span>
        </span>
      </div>
      <Progress 
        value={percentage} 
        className={`h-2 ${getProgressColor(percentage)}`} 
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0%</span>
        <span>{percentage.toFixed(1)}% of ${total.toFixed(2)}</span>
        <span>100%</span>
      </div>
    </div>
  );
};
