import Header from './Header';
import CourseAnalyticsDashboard from './CourseAnalyticsDashboard';

const Dashboard = () => {
  console.log('Dashboard component rendering');
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="w-full mx-auto p-4">
        <div className="text-2xl font-bold text-red-500 p-4 bg-yellow-200">
          TEST: Dashboard is loading
        </div>
        <CourseAnalyticsDashboard />
      </main>
    </div>
  );
};

export default Dashboard;
