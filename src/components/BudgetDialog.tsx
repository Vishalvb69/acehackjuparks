
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
          <DialogTitle>Set your monthly budget</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <Input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your budget"
            step="0.01"
            min="0"
            className="w-full"
          />
          <Button type="submit" className="w-full">Save Budget</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
