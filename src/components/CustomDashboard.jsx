import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import StatsWidget from './StatsWidget';
import { useDashboard } from '../contexts/DashboardContext';

const ResponsiveGridLayout = WidthProvider(Responsive);

const CustomDashboard = () => {
  const { csvData } = useDashboard();
  const [widgets, setWidgets] = useState([]);
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('sum');

  // Load widgets from localStorage on mount
  useEffect(() => {
    const savedWidgets = localStorage.getItem('custom_stats_widgets');
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }
  }, []);

  // Save widgets to localStorage whenever they change
  useEffect(() => {
    if (widgets.length > 0) {
      localStorage.setItem('custom_stats_widgets', JSON.stringify(widgets));
    }
  }, [widgets]);

  const getAvailableDataSources = () => {
    if (!csvData || csvData.length === 0) return [];
    return Object.keys(csvData);
  };

  const getFieldsForDataSource = (dataSource) => {
    if (!csvData || !csvData[dataSource] || csvData[dataSource].length === 0) return [];
    const firstRow = csvData[dataSource][0];
    return Object.keys(firstRow);
  };

  const calculateStatistic = (dataSource, field, operation) => {
    if (!csvData || !csvData[dataSource] || !field) return 0;

    const data = csvData[dataSource];
    const values = data
      .map(row => parseFloat(row[field]))
      .filter(val => !isNaN(val));

    if (values.length === 0) return 0;

    switch (operation) {
      case 'sum':
        return values.reduce((acc, val) => acc + val, 0);
      case 'avg':
        return values.reduce((acc, val) => acc + val, 0) / values.length;
      case 'min':
        return Math.min(...values);
      case 'max':
        return Math.max(...values);
      case 'count':
        return values.length;
      default:
        return 0;
    }
  };

  const addStatWidget = () => {
    if (!selectedDataSource || !selectedField || !selectedOperation) {
      alert('Please select a data source, field, and operation');
      return;
    }

    const value = calculateStatistic(selectedDataSource, selectedField, selectedOperation);
    
    const newWidget = {
      i: `stat-${Date.now()}`,
      x: (widgets.length * 3) % 12,
      y: Math.floor(widgets.length / 4) * 4,
      w: 3,
      h: 4,
      type: 'stats',
      title: `${selectedOperation.toUpperCase()}: ${selectedField}`,
      dataSource: selectedDataSource,
      field: selectedField,
      operation: selectedOperation,
      value: value,
      subtitle: `From ${selectedDataSource}`
    };

    setWidgets([...widgets, newWidget]);
    setShowCalculator(false);
    
    // Reset selections
    setSelectedDataSource('');
    setSelectedField('');
    setSelectedOperation('sum');
  };

  const removeWidget = (widgetId) => {
    const updatedWidgets = widgets.filter(w => w.i !== widgetId);
    setWidgets(updatedWidgets);
    localStorage.setItem('custom_stats_widgets', JSON.stringify(updatedWidgets));
  };

  const onLayoutChange = (layout) => {
    const updatedWidgets = widgets.map(widget => {
      const layoutItem = layout.find(l => l.i === widget.i);
      if (layoutItem) {
        return {
          ...widget,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h
        };
      }
      return widget;
    });
    setWidgets(updatedWidgets);
  };

  const addTemplateWidgets = () => {
    const templateWidgets = [
      {
        i: `stat-template-1-${Date.now()}`,
        x: 0, y: 0, w: 3, h: 4,
        type: 'stats',
        title: 'TOTAL: Sample Count',
        dataSource: 'sample',
        field: 'value',
        operation: 'count',
        value: csvData?.sample ? csvData.sample.length : 0,
        subtitle: 'From sample data'
      },
      {
        i: `stat-template-2-${Date.now()}`,
        x: 3, y: 0, w: 3, h: 4,
        type: 'stats',
        title: 'AVG: Sample Value',
        dataSource: 'sample',
        field: 'value',
        operation: 'avg',
        value: 0,
        subtitle: 'From sample data'
      }
    ];

    setWidgets([...widgets, ...templateWidgets]);
  };

  const dataSources = getAvailableDataSources();
  const fields = selectedDataSource ? getFieldsForDataSource(selectedDataSource) : [];

  return (
    <div className="h-full flex">
      {/* Stats Calculator Sidebar */}
      <div className={`${showCalculator ? 'w-80' : 'w-12'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}>
        {!showCalculator ? (
          <button
            onClick={() => setShowCalculator(true)}
            className="h-12 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            title="Open Calculator"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>
        ) : (
          <div className="flex-1 flex flex-col p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Summary Stats</h3>
              <button
                onClick={() => setShowCalculator(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 flex-1">
              {/* Data Source Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data Source
                </label>
                <select
                  value={selectedDataSource}
                  onChange={(e) => {
                    setSelectedDataSource(e.target.value);
                    setSelectedField('');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select data source...</option>
                  {dataSources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>

              {/* Field Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Field
                </label>
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  disabled={!selectedDataSource}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                >
                  <option value="">Select field...</option>
                  {fields.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>

              {/* Operation Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Operation
                </label>
                <select
                  value={selectedOperation}
                  onChange={(e) => setSelectedOperation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="sum">Sum</option>
                  <option value="avg">Average</option>
                  <option value="min">Minimum</option>
                  <option value="max">Maximum</option>
                  <option value="count">Count</option>
                </select>
              </div>

              {/* Add Button */}
              <button
                onClick={addStatWidget}
                disabled={!selectedDataSource || !selectedField}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
              >
                Add Stat Card
              </button>

              {/* Template Button */}
              {dataSources.length > 0 && (
                <button
                  onClick={addTemplateWidgets}
                  className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                >
                  Add Template Cards
                </button>
              )}
            </div>

            {/* Help Text */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Select a data source, field, and operation to create custom summary statistics.
                Cards can be dragged and resized on the canvas.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        {widgets.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No Stats Cards Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Use the calculator to create custom summary statistics
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: widgets }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
            rowHeight={60}
            onLayoutChange={onLayoutChange}
            isDraggable={true}
            isResizable={true}
            margin={[8, 8]}
            containerPadding={[0, 0]}
          >
            {widgets.map((widget) => (
              <div key={widget.i} className="grid-item">
                <StatsWidget
                  title={widget.title}
                  value={widget.value}
                  subtitle={widget.subtitle}
                  onRemove={() => removeWidget(widget.i)}
                />
              </div>
            ))}
          </ResponsiveGridLayout>
        )}
      </div>
    </div>
  );
};

export default CustomDashboard;
