import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { UserCheck, AlertCircle } from 'lucide-react';
import { learnerStates } from '../data/sampleData';

const LearnerStatesWidget = () => {
  const totalLearners = learnerStates.reduce((sum, item) => sum + item.count, 0);

  // Custom label for pie chart
  const renderLabel = (entry) => {
    const percent = ((entry.count / totalLearners) * 100).toFixed(1);
    return `${percent}%`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <UserCheck className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Learner States</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">By Activity Status</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalLearners}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Learners</p>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={learnerStates}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderLabel}
              outerRadius="70%"
              fill="#8884d8"
              dataKey="count"
            >
              {learnerStates.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value, name, props) => [value, props.payload.state]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend with counts */}
      <div className="space-y-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        {learnerStates.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.state}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {item.count}
              </span>
              {item.state.includes('At Risk') && (
                <AlertCircle className="w-4 h-4 text-orange-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnerStatesWidget;
