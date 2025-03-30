
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeToggle = ({ darkMode, toggleDarkMode }: ThemeToggleProps) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleDarkMode} 
      className="w-fit h-10 px-3"
    >
      {darkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="ml-2">Toggle {darkMode ? 'Light' : 'Dark'} Mode</span>
    </Button>
  );
};
