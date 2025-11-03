import { X } from 'lucide-react';
import { useDashboard } from '../contexts/DashboardContext';

const Widget = ({ id, title, children, className = '' }) => {
  const { removeWidget } = useDashboard();

  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      removeWidget(id);
    }
  };

  return (
    <div className={`
      bg-white dark:bg-gray-800 
      rounded-lg shadow-sm border border-gray-200 dark:border-gray-700
      p-4 h-full flex flex-col
      transition-colors duration-200
      ${className}
    `}>
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {title}
        </h3>
        <button
          onClick={handleRemove}
          className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          title="Remove widget"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Widget Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Widget;
