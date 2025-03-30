
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

interface BudgetDialogProps {
  currentBudget: number;
  onUpdateBudget: (budget: number) => void;
}

export const BudgetDialog: React.FC<BudgetDialogProps> = ({ 
  currentBudget,
  onUpdateBudget
}) => {
  const [budget, setBudget] = useState<string>(currentBudget.toString());
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBudget = parseFloat(budget);
    if (newBudget > 0) {
      onUpdateBudget(newBudget);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit">
          Set Budget
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set your monthly budget (in INR)</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter your budget in INR"
              step="0.01"
              min="0"
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Budget: {formatCurrency(parseFloat(budget) || 0)}
            </p>
          </div>
          <Button type="submit" className="w-full">Save Budget</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
