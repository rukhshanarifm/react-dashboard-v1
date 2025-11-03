import { useState, useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useDashboard } from '../contexts/DashboardContext';
import ChartWidget from './ChartWidget';
import StatsWidget from './StatsWidget';
import WelcomeWidget from './WelcomeWidget';
import Header from './Header';
import FunnelDiagram from './FunnelDiagram';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const { widgets, updateLayout } = useDashboard();

  // Convert widgets to layout format for react-grid-layout
  const layouts = useMemo(() => {
    const layout = widgets.map(widget => ({
      i: widget.i,
      x: widget.x,
      y: widget.y,
      w: widget.w,
      h: widget.h,
      minW: widget.type === 'stats' ? 2 : 3,
      minH: widget.type === 'stats' ? 2 : 3,
      maxH: widget.type === 'stats' ? 4 : 8
    }));

    return {
      lg: layout,
      md: layout,
      sm: layout.map(item => ({ ...item, w: Math.min(item.w, 6) })),
      xs: layout.map(item => ({ ...item, w: 4, x: 0 })),
      xxs: layout.map(item => ({ ...item, w: 2, x: 0 }))
    };
  }, [widgets]);

  // Handle layout changes (drag, resize)
  const handleLayoutChange = (layout, layouts) => {
    updateLayout(layout);
  };

  // Render individual widgets based on type
  const renderWidget = (widget) => {
    switch (widget.type) {
      case 'chart':
        return (
          <ChartWidget
            key={widget.i}
            id={widget.i}
            title={widget.title}
            config={widget.config}
          />
        );
      case 'stats':
        return (
          <StatsWidget
            key={widget.i}
            id={widget.i}
            title={widget.title}
            config={widget.config}
          />
        );
      case 'welcome':
        return (
          <WelcomeWidget
            key={widget.i}
            id={widget.i}
            title={widget.title}
            config={widget.config}
          />
        );
      case 'funnel':
        return (
          <FunnelDiagram
            key={widget.i}
            id={widget.i}
            title={widget.title}
            config={widget.config}
          />
        );
      default:
        return (
          <div key={widget.i} className="p-4 bg-red-100 border border-red-300 rounded">
            <p className="text-red-600">Unknown widget type: {widget.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {widgets.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Welcome to Your Dashboard
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Get started by adding your first widget to customize your dashboard experience.
              </p>
            </div>
          </div>
        ) : (
          // Grid layout with widgets
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            onLayoutChange={handleLayoutChange}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={60}
            margin={[16, 16]}
            containerPadding={[0, 0]}
            isDraggable={true}
            isResizable={true}
            useCSSTransforms={true}
            preventCollision={false}
            compactType="vertical"
          >
            {widgets.map(renderWidget)}
          </ResponsiveGridLayout>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
