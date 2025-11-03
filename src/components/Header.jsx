import { Moon, Sun, RotateCcw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useDashboard } from '../contexts/DashboardContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { resetDashboard } = useDashboard();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the dashboard? This will remove all customizations.')) {
      resetDashboard();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">
              Dashboard
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Reset Dashboard */}
            <button
              onClick={handleReset}
              className="btn btn-secondary"
              title="Reset Dashboard"
            >
              <RotateCcw size={16} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-secondary"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon size={16} />
              ) : (
                <Sun size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
