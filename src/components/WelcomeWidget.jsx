import { Calendar, User, Activity } from 'lucide-react';
import Widget from './Widget';

const WelcomeWidget = ({ id, title, config }) => {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Widget id={id} title={title}>
      <div className="flex flex-col h-full">
        {/* Welcome Message */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <User className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}!
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ready to explore your dashboard?
              </p>
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{getCurrentDate()}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Activity className="h-4 w-4 mr-2" />
            <span className="text-sm">Current time: {getCurrentTime()}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-auto">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Quick Start
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              • Add new widgets using the + button in the header
              • Drag widgets to rearrange them
              • Resize widgets by dragging the corner
              • Switch themes with the moon/sun icon
            </p>
          </div>
        </div>
      </div>
    </Widget>
  );
};

export default WelcomeWidget;
