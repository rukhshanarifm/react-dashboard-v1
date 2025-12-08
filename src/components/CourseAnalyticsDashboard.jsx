import { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Users, BookOpen, AlertTriangle, DollarSign, Filter, Download, ChevronRight } from 'lucide-react';
import {
  courses,
  cohorts,
  schools,
  signupMethods,
  registrations,
  userActivities,
  payments,
  dailyActiveUsers,
  instructors,
  lessons,
  getActivityLabel,
  getDaysSinceActivity,
  getUserStatus,
  getLastLessonByCourse,
  getStudentsByFunnelStage,
  getLessonProgressData
} from '../data/courseAnalyticsData';

const CourseAnalyticsDashboard = () => {
  // Filter states
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedCohort, setSelectedCohort] = useState('all');
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [selectedSignupMethod, setSelectedSignupMethod] = useState('all');
  const [selectedActivityDays, setSelectedActivityDays] = useState(7);
  
  // UI states for funnel tooltip
  const [hoveredFunnelStage, setHoveredFunnelStage] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Filtered data based on selections
  const filteredRegistrations = useMemo(() => {
    return registrations.filter(reg => {
      if (selectedCourse !== 'all' && reg.courseId !== parseInt(selectedCourse)) return false;
      if (selectedCohort !== 'all' && reg.cohortId !== parseInt(selectedCohort)) return false;
      if (selectedSchool !== 'all' && reg.schoolId !== parseInt(selectedSchool)) return false;
      if (selectedSignupMethod !== 'all' && reg.signupMethodId !== parseInt(selectedSignupMethod)) return false;
      return true;
    });
  }, [selectedCourse, selectedCohort, selectedSchool, selectedSignupMethod]);

  // Last lesson information
  const lastLessonInfo = useMemo(() => {
    if (selectedCourse === 'all') return null;
    return getLastLessonByCourse(parseInt(selectedCourse));
  }, [selectedCourse]);

  // 1. Registration Breakdown
  const registrationBreakdown = useMemo(() => {
    const breakdown = {};
    filteredRegistrations.forEach(reg => {
      const course = courses.find(c => c.id === reg.courseId);
      const cohort = cohorts.find(c => c.id === reg.cohortId);
      const school = schools.find(s => s.id === reg.schoolId);
      const method = signupMethods.find(m => m.id === reg.signupMethodId);
      
      const key = `${course?.name} - ${cohort?.name}`;
      if (!breakdown[key]) {
        breakdown[key] = { 
          name: key, 
          course: course?.name,
          cohort: cohort?.name,
          count: 0,
          bySchool: {},
          byMethod: {}
        };
      }
      breakdown[key].count++;
      breakdown[key].bySchool[school?.name] = (breakdown[key].bySchool[school?.name] || 0) + 1;
      breakdown[key].byMethod[method?.name] = (breakdown[key].byMethod[method?.name] || 0) + 1;
    });
    return Object.values(breakdown);
  }, [filteredRegistrations]);

  // 2. Active Users by Time Period
  const activeUsersByPeriod = useMemo(() => {
    const now = new Date('2025-11-19T12:00:00');
    const periods = [3, 7, 14, 21, 30];
    
    return periods.map(days => {
      const cutoffDate = new Date(now);
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      const activeUsers = new Set();
      userActivities.forEach(activity => {
        const activityDate = new Date(activity.timestamp);
        if (activityDate >= cutoffDate) {
          const reg = filteredRegistrations.find(r => r.userId === activity.userId);
          if (reg) activeUsers.add(activity.userId);
        }
      });
      
      return {
        period: `${days} days`,
        count: activeUsers.size,
        label: `Last ${days} Days`
      };
    });
  }, [filteredRegistrations]);

  // 3. Current States (Learner Activity States)
  const learnerStates = useMemo(() => {
    const now = new Date('2025-11-19T12:00:00');
    const states = {
      'Active (0-3 days)': { count: 0, users: [], color: '#10b981' },
      'Recently Active (4-7 days)': { count: 0, users: [], color: '#3b82f6' },
      'At Risk (8-14 days)': { count: 0, users: [], color: '#f59e0b' },
      'Inactive (15+ days)': { count: 0, users: [], color: '#ef4444' }
    };

    const userLastActivity = {};
    userActivities.forEach(activity => {
      const reg = filteredRegistrations.find(r => r.userId === activity.userId);
      if (!reg) return;
      
      if (!userLastActivity[activity.userId] || new Date(activity.timestamp) > new Date(userLastActivity[activity.userId].timestamp)) {
        userLastActivity[activity.userId] = {
          ...activity,
          userName: reg.name,
          courseName: courses.find(c => c.id === reg.courseId)?.name
        };
      }
    });

    Object.entries(userLastActivity).forEach(([userId, activity]) => {
      const days = getDaysSinceActivity(activity.timestamp);
      const userInfo = {
        userId,
        name: activity.userName,
        course: activity.courseName,
        lastActivity: getActivityLabel(activity.activityType),
        daysSince: days,
        timestamp: activity.timestamp
      };

      if (days <= 3) {
        states['Active (0-3 days)'].count++;
        states['Active (0-3 days)'].users.push(userInfo);
      } else if (days <= 7) {
        states['Recently Active (4-7 days)'].count++;
        states['Recently Active (4-7 days)'].users.push(userInfo);
      } else if (days <= 14) {
        states['At Risk (8-14 days)'].count++;
        states['At Risk (8-14 days)'].users.push(userInfo);
      } else {
        states['Inactive (15+ days)'].count++;
        states['Inactive (15+ days)'].users.push(userInfo);
      }
    });

    return Object.entries(states).map(([name, data]) => ({
      name,
      count: data.count,
      users: data.users,
      color: data.color
    }));
  }, [filteredRegistrations]);

  // 4. Funnel Data
  const funnelData = useMemo(() => {
    const registered = filteredRegistrations.length;
    
    const startedUsers = new Set();
    const activeUsers = new Set();
    const completedUsers = new Set();
    
    const now = new Date('2025-11-19T12:00:00');
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    userActivities.forEach(activity => {
      const reg = filteredRegistrations.find(r => r.userId === activity.userId);
      if (!reg) return;

      startedUsers.add(activity.userId);
      
      if (new Date(activity.timestamp) >= sevenDaysAgo) {
        activeUsers.add(activity.userId);
      }
      
      if (activity.activityType === 'course_completed') {
        completedUsers.add(activity.userId);
      }
    });

    return [
      { stage: 'Registered', value: registered, color: '#3b82f6', percentage: 100 },
      { stage: 'Started', value: startedUsers.size, color: '#8b5cf6', percentage: registered ? Math.round((startedUsers.size / registered) * 100) : 0 },
      { stage: 'Active (7d)', value: activeUsers.size, color: '#ec4899', percentage: registered ? Math.round((activeUsers.size / registered) * 100) : 0 },
      { stage: 'Completed', value: completedUsers.size, color: '#10b981', percentage: registered ? Math.round((completedUsers.size / registered) * 100) : 0 }
    ];
  }, [filteredRegistrations]);

  // 5. Daily Attrition Rate
  const attritionData = useMemo(() => {
    const courseId = selectedCourse !== 'all' ? parseInt(selectedCourse) : null;
    let data = dailyActiveUsers;
    
    if (courseId) {
      data = data.filter(d => d.courseId === courseId);
    }
    
    const grouped = {};
    data.forEach(d => {
      if (!grouped[d.date]) grouped[d.date] = 0;
      grouped[d.date] += d.activeUsers;
    });

    const sorted = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
    
    return sorted.map(([date, activeUsers], index) => {
      const prevActive = index > 0 ? sorted[index - 1][1] : activeUsers;
      const attritionRate = prevActive > 0 ? ((prevActive - activeUsers) / prevActive) * 100 : 0;
      
      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        activeUsers,
        attritionRate: parseFloat(attritionRate.toFixed(2)),
        prevActive
      };
    });
  }, [selectedCourse]);

  // 6. Completion Rate
  const completionRate = useMemo(() => {
    const started = new Set();
    const completed = new Set();

    userActivities.forEach(activity => {
      const reg = filteredRegistrations.find(r => r.userId === activity.userId);
      if (!reg) return;

      started.add(activity.userId);
      if (activity.activityType === 'course_completed') {
        completed.add(activity.userId);
      }
    });

    const rate = started.size > 0 ? (completed.size / started.size) * 100 : 0;
    
    return {
      started: started.size,
      completed: completed.size,
      rate: parseFloat(rate.toFixed(2))
    };
  }, [filteredRegistrations]);

  // 7. At-Risk & Drop-Off Detection
  const atRiskLearners = useMemo(() => {
    const now = new Date('2025-11-19T12:00:00');
    const userLastActivity = {};

    userActivities.forEach(activity => {
      const reg = filteredRegistrations.find(r => r.userId === activity.userId);
      if (!reg) return;
      
      if (!userLastActivity[activity.userId] || new Date(activity.timestamp) > new Date(userLastActivity[activity.userId].timestamp)) {
        userLastActivity[activity.userId] = {
          ...activity,
          userName: reg.name,
          courseName: courses.find(c => c.id === reg.courseId)?.name,
          cohort: cohorts.find(c => c.id === reg.cohortId)?.name
        };
      }
    });

    const atRisk = [];
    Object.entries(userLastActivity).forEach(([userId, activity]) => {
      const days = getDaysSinceActivity(activity.timestamp);
      if (days >= 8) { // At risk threshold
        atRisk.push({
          userId,
          name: activity.userName,
          course: activity.courseName,
          cohort: activity.cohort,
          daysSinceActivity: days,
          lastActivity: getActivityLabel(activity.activityType),
          status: days >= 15 ? 'Dropped Off' : 'At Risk',
          riskLevel: days >= 15 ? 'high' : 'medium'
        });
      }
    });

    return atRisk.sort((a, b) => b.daysSinceActivity - a.daysSinceActivity);
  }, [filteredRegistrations]);

  // 8. Revenue Analytics
  const revenueData = useMemo(() => {
    const filteredPayments = payments.filter(payment => {
      const reg = filteredRegistrations.find(r => r.userId === payment.userId);
      return reg !== undefined;
    });

    const totalRevenue = filteredPayments.reduce((sum, p) => sum + (p.status === 'Paid' ? p.amount : 0), 0);
    const paidCount = filteredPayments.filter(p => p.status === 'Paid').length;
    const avgPerLearner = paidCount > 0 ? totalRevenue / paidCount : 0;

    const byCourse = {};
    filteredPayments.forEach(payment => {
      const reg = registrations.find(r => r.userId === payment.userId);
      const course = courses.find(c => c.id === reg?.courseId);
      if (!course) return;

      if (!byCourse[course.name]) {
        byCourse[course.name] = { name: course.name, revenue: 0, learners: 0 };
      }
      if (payment.status === 'Paid') {
        byCourse[course.name].revenue += payment.amount;
        byCourse[course.name].learners++;
      }
    });

    return {
      total: totalRevenue,
      avgPerLearner: parseFloat(avgPerLearner.toFixed(2)),
      paidCount,
      byCourse: Object.values(byCourse).map(c => ({
        ...c,
        avgPerLearner: c.learners > 0 ? parseFloat((c.revenue / c.learners).toFixed(2)) : 0
      }))
    };
  }, [filteredRegistrations]);

  // 9. Lesson Progress Distribution
  const lessonProgressData = useMemo(() => {
    if (selectedCourse === 'all') return [];
    return getLessonProgressData(parseInt(selectedCourse), filteredRegistrations);
  }, [selectedCourse, filteredRegistrations]);

  // 10. School Performance Breakdown
  const schoolBreakdownData = useMemo(() => {
    const schoolStats = {};
    
    // Initialize school stats
    schools.forEach(school => {
      schoolStats[school.name] = {
        name: school.name,
        city: school.city,
        studentCount: 0,
        revenue: 0,
        completedStudents: 0,
        atRiskStudents: 0,
        students: []
      };
    });
    
    // Count students by school
    filteredRegistrations.forEach(reg => {
      const school = schools.find(s => s.id === reg.schoolId);
      if (school) {
        schoolStats[school.name].studentCount++;
        schoolStats[school.name].students.push({
          name: reg.name,
          mobile: reg.mobile,
          status: reg.status
        });
      }
    });
    
    // Calculate revenue by school
    payments.forEach(payment => {
      if (payment.status === 'Paid') {
        const reg = filteredRegistrations.find(r => r.userId === payment.userId);
        if (reg) {
          const school = schools.find(s => s.id === reg.schoolId);
          if (school) {
            schoolStats[school.name].revenue += payment.amount;
          }
        }
      }
    });
    
    // Calculate completion and at-risk stats
    const completedUserIds = new Set(
      userActivities
        .filter(activity => activity.activityType === 'course_completed')
        .map(activity => activity.userId)
    );
    
    const now = new Date('2025-11-19T12:00:00');
    const userLastActivity = {};
    userActivities.forEach(activity => {
      const reg = filteredRegistrations.find(r => r.userId === activity.userId);
      if (reg && (!userLastActivity[activity.userId] || new Date(activity.timestamp) > new Date(userLastActivity[activity.userId].timestamp))) {
        userLastActivity[activity.userId] = activity;
      }
    });
    
    Object.entries(userLastActivity).forEach(([userId, activity]) => {
      const reg = filteredRegistrations.find(r => r.userId === userId);
      if (reg) {
        const school = schools.find(s => s.id === reg.schoolId);
        const days = getDaysSinceActivity(activity.timestamp);
        
        if (school) {
          if (completedUserIds.has(userId)) {
            schoolStats[school.name].completedStudents++;
          }
          if (days >= 8) {
            schoolStats[school.name].atRiskStudents++;
          }
        }
      }
    });
    
    // Convert to array and calculate additional metrics
    return Object.values(schoolStats)
      .filter(school => school.studentCount > 0)
      .map(school => ({
        ...school,
        avgRevenuePerStudent: school.studentCount > 0 ? parseFloat((school.revenue / school.studentCount).toFixed(2)) : 0,
        completionRate: school.studentCount > 0 ? parseFloat(((school.completedStudents / school.studentCount) * 100).toFixed(1)) : 0,
        atRiskRate: school.studentCount > 0 ? parseFloat(((school.atRiskStudents / school.studentCount) * 100).toFixed(1)) : 0
      }))
      .sort((a, b) => b.studentCount - a.studentCount);
  }, [filteredRegistrations]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['User ID', 'Name', 'Course', 'Cohort', 'School', 'Signup Method', 'Status', 'Days Since Activity', 'Last Activity'];
    const rows = filteredRegistrations.map(reg => {
      const course = courses.find(c => c.id === reg.courseId);
      const cohort = cohorts.find(c => c.id === reg.cohortId);
      const school = schools.find(s => s.id === reg.schoolId);
      const method = signupMethods.find(m => m.id === reg.signupMethodId);
      
      const lastActivity = userActivities
        .filter(a => a.userId === reg.userId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
      
      const daysSince = lastActivity ? getDaysSinceActivity(lastActivity.timestamp) : 'N/A';
      const activityLabel = lastActivity ? getActivityLabel(lastActivity.activityType) : 'No Activity';
      
      return [
        reg.userId,
        reg.name,
        course?.name,
        cohort?.name,
        school?.name,
        method?.name,
        reg.status,
        daysSince,
        activityLabel
      ].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `course-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const [expandedState, setExpandedState] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Course Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Comprehensive insights into course performance and learner engagement</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Courses</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cohort</label>
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Cohorts</option>
              {cohorts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">School</label>
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Schools</option>
              {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Signup Method</label>
            <select
              value={selectedSignupMethod}
              onChange={(e) => setSelectedSignupMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Methods</option>
              {signupMethods.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
        </div>
        <button
          onClick={exportToCSV}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-90">Total</span>
          </div>
          <p className="text-3xl font-bold mb-1">{filteredRegistrations.length}</p>
          <p className="text-sm opacity-90">Registered Learners</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-90">Rate</span>
          </div>
          <p className="text-3xl font-bold mb-1">{completionRate.rate}%</p>
          <p className="text-sm opacity-90">{completionRate.completed}/{completionRate.started} Completed</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-90">Risk</span>
          </div>
          <p className="text-3xl font-bold mb-1">{atRiskLearners.length}</p>
          <p className="text-sm opacity-90">At-Risk Learners</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-90">Revenue</span>
          </div>
          <p className="text-3xl font-bold mb-1">${revenueData.total.toLocaleString()}</p>
          <p className="text-sm opacity-90">${revenueData.avgPerLearner}/learner avg</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Registration Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Registration Breakdown</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={registrationBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} angle={-45} textAnchor="end" height={100} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.95)', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Users by Period */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Users by Time Period</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={activeUsersByPeriod}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="label" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[0, 'dataMax + 2']} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.95)', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Course Progression Funnel</h3>
            {lastLessonInfo && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Last Lesson:</span> {lastLessonInfo.lessonTitle}
                <br />
                <span className="font-medium">Taught by:</span> {lastLessonInfo.instructorName}
              </div>
            )}
          </div>
          <div className="space-y-3">
            {funnelData.map((stage, index) => (
              <div 
                key={stage.stage}
                onMouseEnter={(e) => {
                  const students = getStudentsByFunnelStage(stage.stage, filteredRegistrations);
                  setHoveredFunnelStage({ ...stage, students });
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top - 10 });
                }}
                onMouseLeave={() => setHoveredFunnelStage(null)}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stage.stage}</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{stage.value} ({stage.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
                  <div
                    className="h-full flex items-center justify-center text-white text-sm font-medium transition-all duration-500"
                    style={{
                      width: `${stage.percentage}%`,
                      backgroundColor: stage.color
                    }}
                  >
                    {stage.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Tooltip for students */}
          {hoveredFunnelStage && (
            <div 
              className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl p-4 max-w-md max-h-64 overflow-y-auto"
              style={{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y}px`,
                transform: 'translateX(-50%) translateY(-100%)',
                pointerEvents: 'none'
              }}
            >
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {hoveredFunnelStage.stage} Students ({hoveredFunnelStage.students.length})
              </h4>
              <div className="space-y-1 text-sm">
                {hoveredFunnelStage.students.length > 0 ? (
                  hoveredFunnelStage.students.slice(0, 10).map((student) => (
                    <div key={student.userId} className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <span className="text-gray-700 dark:text-gray-300">{student.name}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-mono text-xs">{student.mobile}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No students in this stage</p>
                )}
                {hoveredFunnelStage.students.length > 10 && (
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                    ... and {hoveredFunnelStage.students.length - 10} more students
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Daily Attrition */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Attrition Rate</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={attritionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.95)', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
                <Legend />
                <Line type="monotone" dataKey="attritionRate" stroke="#ef4444" strokeWidth={2} name="Attrition %" />
                <Line type="monotone" dataKey="activeUsers" stroke="#3b82f6" strokeWidth={2} name="Active Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lesson Progress Chart - only show when a specific course is selected */}
      {selectedCourse !== 'all' && (
        <div className="mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Student Progress by Lesson - {courses.find(c => c.id === parseInt(selectedCourse))?.name}
            </h3>
            {lessonProgressData.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <p>No lesson progress data available for this course.</p>
              </div>
            ) : (
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <BarChart data={lessonProgressData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#9ca3af', fontSize: 10 }} 
                      angle={-45} 
                      textAnchor="end" 
                      height={100}
                      interval={0}
                    />
                    <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                        border: '1px solid #374151', 
                        borderRadius: '8px', 
                        color: '#fff',
                        maxWidth: '300px'
                      }}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="p-3">
                              <p className="font-semibold text-white mb-2">{label}</p>
                              <p className="text-blue-300">Students: {data.count}</p>
                              {data.students.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-gray-300 text-xs mb-1">Students at this lesson:</p>
                                  <div className="max-h-32 overflow-y-auto">
                                    {data.students.slice(0, 8).map((student, idx) => (
                                      <p key={idx} className="text-xs text-gray-400">
                                        • {student.name}
                                      </p>
                                    ))}
                                    {data.students.length > 8 && (
                                      <p className="text-xs text-gray-500">
                                        ... and {data.students.length - 8} more
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">💡 Insight:</span> This chart shows how many students are currently at each lesson. 
                Use this to identify where students tend to drop off or get stuck, and where you might need additional support.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* School Performance Breakdown */}
      <div className="mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            School Performance Breakdown
          </h3>
          {schoolBreakdownData.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <p>No school data available based on current filters.</p>
            </div>
          ) : (
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <BarChart data={schoolBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#9ca3af', fontSize: 10 }} 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    interval={0}
                  />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                      border: '1px solid #374151', 
                      borderRadius: '8px', 
                      color: '#fff',
                      maxWidth: '350px'
                    }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="p-4">
                            <p className="font-semibold text-white mb-2">{label}</p>
                            <div className="space-y-1">
                              <p className="text-blue-300">
                                <span className="font-medium">Students:</span> {data.studentCount}
                              </p>
                              <p className="text-green-300">
                                <span className="font-medium">Revenue:</span> ${data.revenue.toLocaleString()}
                              </p>
                              <p className="text-yellow-300">
                                <span className="font-medium">Avg/Student:</span> ${data.avgRevenuePerStudent}
                              </p>
                              <p className="text-purple-300">
                                <span className="font-medium">Completion Rate:</span> {data.completionRate}%
                              </p>
                              <p className="text-orange-300">
                                <span className="font-medium">At Risk:</span> {data.atRiskStudents} ({data.atRiskRate}%)
                              </p>
                              <p className="text-gray-300 text-xs">
                                <span className="font-medium">Location:</span> {data.city}
                              </p>
                            </div>
                            
                            {data.students && data.students.length > 0 && (
                              <div className="mt-3 pt-2 border-t border-gray-600">
                                <p className="text-gray-300 text-xs mb-1 font-medium">Students ({data.students.length}):</p>
                                <div className="max-h-32 overflow-y-auto">
                                  {data.students.slice(0, 6).map((student, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-0.5">
                                      <span className="text-xs text-gray-400">{student.name}</span>
                                      <span className="text-xs text-blue-400 font-mono">{student.mobile}</span>
                                    </div>
                                  ))}
                                  {data.students.length > 6 && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      ... and {data.students.length - 6} more students
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="studentCount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">📊 School Insights:</span> This chart shows student enrollment by school. 
              Hover over each bar to see detailed metrics including revenue contribution, completion rates, and at-risk students.
            </p>
          </div>
        </div>
      </div>

      {/* Learner States & Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Learner States */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Learner Activity States</h3>
          <div className="space-y-3">
            {learnerStates.map((state) => (
              <div key={state.name}>
                <button
                  onClick={() => setExpandedState(expandedState === state.name ? null : state.name)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: state.color }}></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{state.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{state.count}</span>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedState === state.name ? 'rotate-90' : ''}`} />
                  </div>
                </button>
                {expandedState === state.name && state.users.length > 0 && (
                  <div className="mt-2 ml-7 space-y-2 max-h-60 overflow-y-auto">
                    {state.users.map((user) => (
                      <div key={user.userId} className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm">
                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{user.course} • {user.lastActivity}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{user.daysSince} days ago</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Course */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue by Course</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={revenueData.byCourse}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.95)', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* At-Risk Learners Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">At-Risk & Dropped Off Learners</h3>
        {atRiskLearners.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">No at-risk learners found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Course</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Cohort</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Days Since Activity</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Last Activity</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {atRiskLearners.map((learner) => (
                  <tr key={learner.userId} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white font-medium">{learner.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{learner.course}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{learner.cohort}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white font-semibold">{learner.daysSinceActivity}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{learner.lastActivity}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        learner.status === 'Dropped Off'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                      }`}>
                        {learner.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseAnalyticsDashboard;
