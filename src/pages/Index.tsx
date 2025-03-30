
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { ExpenseFilters } from "@/components/ExpenseFilters";
import { BudgetProgress } from "@/components/BudgetProgress";
import { ExpenseChart } from "@/components/ExpenseChart";
import { BudgetDialog } from "@/components/BudgetDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useExpenseTracker } from "@/hooks/useExpenseTracker";

const Index = () => {
  const {
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
  } = useExpenseTracker();

  const budgetInfo = calculateBudgetInfo();
  const chartData = getExpenseChartData();

  return (
    <div className={`min-h-screen bg-background ${darkMode ? 'dark' : ''}`}>
      <div className="container px-4 py-8 mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <BudgetDialog currentBudget={budget} onUpdateBudget={updateBudget} />
        </div>
        
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-expense-primary to-expense-accent bg-clip-text text-transparent">
            Expense Tracker
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
              <ExpenseForm onAddExpense={addExpense} />
            </div>
            
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
              <BudgetProgress budgetInfo={budgetInfo} />
            </div>
          </div>
          
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Expenses</h2>
            </div>
            <ExpenseFilters filter={filter} onFilterChange={setFilter} />
            <ExpenseList expenses={filteredExpenses} onRemoveExpense={removeExpense} />
          </div>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Expense Breakdown</h2>
          <ExpenseChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Index;
