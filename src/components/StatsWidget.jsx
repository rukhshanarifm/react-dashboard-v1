import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import Widget from './Widget';

const StatsWidget = ({ id, title, config }) => {
  const { value, change, trend = 'neutral', subtitle, icon: IconComponent } = config;

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <ArrowRight className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getTrendBgColor = () => {
    switch (trend) {
      case 'up':
        return 'bg-green-100 dark:bg-green-900/20';
      case 'down':
        return 'bg-red-100 dark:bg-red-900/20';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <Widget id={id} title={title}>
      <div className="flex flex-col h-full justify-center">
        {/* Icon */}
        {IconComponent && (
          <div className="mb-4">
            <div className="inline-flex items-center justify-center p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <IconComponent className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        )}

        {/* Main Value */}
        <div className="mb-2">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {subtitle}
          </p>
        )}

        {/* Change Indicator */}
        {change && (
          <div className="flex items-center">
            <div className={`
              inline-flex items-center px-2 py-1 rounded-full text-sm font-medium
              ${getTrendColor()} ${getTrendBgColor()}
            `}>
              {getTrendIcon()}
              <span className="ml-1">{change}</span>
            </div>
          </div>
        )}
      </div>
    </Widget>
  );
};

export default StatsWidget;
