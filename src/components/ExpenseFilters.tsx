
import { EXPENSE_CATEGORIES } from "@/hooks/useExpenseTracker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ExpenseFiltersProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

export const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="w-full mb-4">
      <Select value={filter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Categories</SelectItem>
          {EXPENSE_CATEGORIES.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
