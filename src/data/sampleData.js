// Sample data for different chart types and widgets
export const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400, users: 240 },
  { name: 'Feb', sales: 3000, revenue: 1398, users: 221 },
  { name: 'Mar', sales: 2000, revenue: 9800, users: 229 },
  { name: 'Apr', sales: 2780, revenue: 3908, users: 200 },
  { name: 'May', sales: 1890, revenue: 4800, users: 278 },
  { name: 'Jun', sales: 2390, revenue: 3800, users: 189 },
  { name: 'Jul', sales: 3490, revenue: 4300, users: 349 }
];

export const userGrowthData = [
  { name: 'Week 1', users: 1200 },
  { name: 'Week 2', users: 1350 },
  { name: 'Week 3', users: 1100 },
  { name: 'Week 4', users: 1650 }
];

export const pieChartData = [
  { name: 'Desktop', value: 400, fill: '#3b82f6' },
  { name: 'Mobile', value: 300, fill: '#10b981' },
  { name: 'Tablet', value: 200, fill: '#f59e0b' },
  { name: 'Other', value: 100, fill: '#ef4444' }
];

export const barChartData = [
  { name: 'Product A', sales: 4000 },
  { name: 'Product B', sales: 3000 },
  { name: 'Product C', sales: 2000 },
  { name: 'Product D', sales: 2780 },
  { name: 'Product E', sales: 1890 }
];

export const areaChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 }
];

// Funnel data for conversion tracking
export const funnelData = [
  { stage: 'Website Visitors', value: 10000, fill: '#3b82f6' },
  { stage: 'Sign Ups', value: 4500, fill: '#8b5cf6' },
  { stage: 'Active Users', value: 2800, fill: '#ec4899' },
  { stage: 'Paying Customers', value: 1200, fill: '#10b981' },
];

// Utility function to get data by chart type
export const getChartData = (chartType) => {
  switch (chartType) {
    case 'line':
      return salesData;
    case 'bar':
      return barChartData;
    case 'area':
      return areaChartData;
    case 'pie':
      return pieChartData;
    default:
      return salesData;
  }
};

// Generate random data for real-time updates
export const generateRandomData = (length = 7) => {
  return Array.from({ length }, (_, i) => ({
    name: `Point ${i + 1}`,
    value: Math.floor(Math.random() * 5000) + 1000
  }));
};
