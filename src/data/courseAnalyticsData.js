// Comprehensive course analytics data

export const courses = [
  { id: 1, name: 'Web Development 101', category: 'Reading Literacy', price: 300 },
  { id: 2, name: 'Data Science Basics', category: 'Digital Literacy', price: 400 },
  { id: 3, name: 'Mobile App Dev', category: 'Reading Literacy', price: 350 },
  { id: 4, name: 'Cloud Computing', category: 'Technical Skills', price: 400 },
  { id: 5, name: 'AI & Machine Learning', category: 'Advanced Tech', price: 600 }
];

export const cohorts = [
  { id: 1, name: 'Jan 2025', startDate: '2025-01-15' },
  { id: 2, name: 'Feb 2025', startDate: '2025-02-01' },
  { id: 3, name: 'Mar 2025', startDate: '2025-03-01' },
  { id: 4, name: 'Apr 2025', startDate: '2025-04-01' }
];

export const schools = [
  { id: 1, name: 'Central High School', city: 'Karachi' },
  { id: 2, name: 'Green Valley Academy', city: 'Lahore' },
  { id: 3, name: 'Sunrise International', city: 'Islamabad' },
  { id: 4, name: 'Community Learning Center', city: 'Karachi' },
  { id: 5, name: 'Independent Learners', city: 'Various' }
];

export const signupMethods = [
  { id: 1, name: 'WhatsApp' },
  { id: 2, name: 'Website' },
  { id: 3, name: 'Mobile App' },
  { id: 4, name: 'Teacher Referral' },
  { id: 5, name: 'School Partnership' }
];

// Instructors data
export const instructors = [
  { id: 1, name: 'Dr. Sarah Ahmed', specialization: 'Web Development' },
  { id: 2, name: 'Prof. Muhammad Ali', specialization: 'Data Science' },
  { id: 3, name: 'Ms. Fatima Sheikh', specialization: 'Mobile Development' },
  { id: 4, name: 'Mr. Hassan Malik', specialization: 'Cloud Computing' },
  { id: 5, name: 'Dr. Aisha Khan', specialization: 'Artificial Intelligence' }
];

// Lessons data with instructor information
export const lessons = [
  // Web Development 101 Lessons
  { id: 1, courseId: 1, lessonNumber: 1, title: 'HTML Basics', instructorId: 1, weekNumber: 1 },
  { id: 2, courseId: 1, lessonNumber: 2, title: 'CSS Fundamentals', instructorId: 1, weekNumber: 1 },
  { id: 3, courseId: 1, lessonNumber: 3, title: 'JavaScript Introduction', instructorId: 1, weekNumber: 2 },
  { id: 4, courseId: 1, lessonNumber: 4, title: 'DOM Manipulation', instructorId: 1, weekNumber: 2 },
  { id: 5, courseId: 1, lessonNumber: 5, title: 'Responsive Design', instructorId: 1, weekNumber: 3 },
  
  // Data Science Basics Lessons
  { id: 6, courseId: 2, lessonNumber: 1, title: 'Python Basics', instructorId: 2, weekNumber: 1 },
  { id: 7, courseId: 2, lessonNumber: 2, title: 'Data Analysis with Pandas', instructorId: 2, weekNumber: 2 },
  { id: 8, courseId: 2, lessonNumber: 3, title: 'Visualization with Matplotlib', instructorId: 2, weekNumber: 3 },
  
  // Mobile App Dev Lessons
  { id: 9, courseId: 3, lessonNumber: 1, title: 'React Native Setup', instructorId: 3, weekNumber: 1 },
  { id: 10, courseId: 3, lessonNumber: 2, title: 'Components & Navigation', instructorId: 3, weekNumber: 2 },
  
  // Cloud Computing Lessons
  { id: 11, courseId: 4, lessonNumber: 1, title: 'AWS Fundamentals', instructorId: 4, weekNumber: 1 },
  { id: 12, courseId: 4, lessonNumber: 2, title: 'Docker Containers', instructorId: 4, weekNumber: 2 },
  
  // AI & ML Lessons
  { id: 13, courseId: 5, lessonNumber: 1, title: 'Machine Learning Introduction', instructorId: 5, weekNumber: 1 },
  { id: 14, courseId: 5, lessonNumber: 2, title: 'Neural Networks', instructorId: 5, weekNumber: 2 }
];

// Registration data with all dimensions and mobile numbers
export const registrations = [
  // Course 1 - Web Dev 101
  { userId: 'U001', courseId: 1, cohortId: 1, schoolId: 1, signupMethodId: 1, registeredDate: '2025-01-15', name: 'Ahmed Khan', status: 'Active', mobile: '+92-300-1234567' },
  { userId: 'U002', courseId: 1, cohortId: 1, schoolId: 2, signupMethodId: 2, registeredDate: '2025-01-16', name: 'Fatima Ali', status: 'Active', mobile: '+92-321-9876543' },
  { userId: 'U003', courseId: 1, cohortId: 1, schoolId: 1, signupMethodId: 1, registeredDate: '2025-01-17', name: 'Hassan Sheikh', status: 'Completed', mobile: '+92-333-1111222' },
  { userId: 'U004', courseId: 1, cohortId: 2, schoolId: 3, signupMethodId: 3, registeredDate: '2025-02-02', name: 'Aisha Ahmed', status: 'At Risk', mobile: '+92-345-5555666' },
  { userId: 'U005', courseId: 1, cohortId: 2, schoolId: 1, signupMethodId: 1, registeredDate: '2025-02-03', name: 'Omar Malik', status: 'Active', mobile: '+92-303-7777888' },
  
  // Course 2 - Data Science
  { userId: 'U006', courseId: 2, cohortId: 1, schoolId: 2, signupMethodId: 4, registeredDate: '2025-01-18', name: 'Sara Hussain', status: 'Active', mobile: '+92-312-4444555' },
  { userId: 'U007', courseId: 2, cohortId: 1, schoolId: 3, signupMethodId: 2, registeredDate: '2025-01-19', name: 'Ali Raza', status: 'Completed', mobile: '+92-334-2222333' },
  { userId: 'U008', courseId: 2, cohortId: 2, schoolId: 4, signupMethodId: 5, registeredDate: '2025-02-05', name: 'Zainab Khan', status: 'Inactive', mobile: '+92-301-8888999' },
  { userId: 'U009', courseId: 2, cohortId: 2, schoolId: 2, signupMethodId: 1, registeredDate: '2025-02-06', name: 'Bilal Ahmed', status: 'Active', mobile: '+92-322-6666777' },
  
  // Course 3 - Mobile App Dev
  { userId: 'U010', courseId: 3, cohortId: 1, schoolId: 1, signupMethodId: 1, registeredDate: '2025-01-20', name: 'Maryam Hassan', status: 'Active', mobile: '+92-315-1010101' },
  { userId: 'U011', courseId: 3, cohortId: 2, schoolId: 3, signupMethodId: 3, registeredDate: '2025-02-08', name: 'Usman Ali', status: 'At Risk', mobile: '+92-336-2020202' },
  { userId: 'U012', courseId: 3, cohortId: 2, schoolId: 4, signupMethodId: 5, registeredDate: '2025-02-09', name: 'Nida Fatima', status: 'Active', mobile: '+92-300-3030303' },
  
  // Course 4 - Cloud Computing
  { userId: 'U013', courseId: 4, cohortId: 1, schoolId: 2, signupMethodId: 2, registeredDate: '2025-01-22', name: 'Kamran Sheikh', status: 'Completed', mobile: '+92-323-4040404' },
  { userId: 'U014', courseId: 4, cohortId: 2, schoolId: 3, signupMethodId: 4, registeredDate: '2025-02-10', name: 'Hina Malik', status: 'Active', mobile: '+92-344-5050505' },
  
  // Course 5 - AI & ML
  { userId: 'U015', courseId: 5, cohortId: 3, schoolId: 5, signupMethodId: 2, registeredDate: '2025-03-01', name: 'Faisal Ahmed', status: 'Active', mobile: '+92-302-6060606' },
  { userId: 'U016', courseId: 5, cohortId: 3, schoolId: 5, signupMethodId: 3, registeredDate: '2025-03-02', name: 'Ayesha Khan', status: 'Active', mobile: '+92-317-7070707' }
];

// User activity logs with timestamps
export const userActivities = [
  // Recent activities (last 3 days) - using correct lesson IDs from lessons array
  { userId: 'U001', courseId: 1, activityType: 'lesson_completed', timestamp: '2025-11-18T14:30:00', lessonId: 5, weekNumber: 3 },
  { userId: 'U002', courseId: 1, activityType: 'quiz_submitted', timestamp: '2025-11-18T10:15:00', lessonId: 3, weekNumber: 2 },
  { userId: 'U005', courseId: 1, activityType: 'lesson_started', timestamp: '2025-11-19T09:00:00', lessonId: 2, weekNumber: 2 },
  { userId: 'U006', courseId: 2, activityType: 'lesson_completed', timestamp: '2025-11-17T16:45:00', lessonId: 8, weekNumber: 4 },
  { userId: 'U009', courseId: 2, activityType: 'assignment_submitted', timestamp: '2025-11-19T11:30:00', lessonId: 7, weekNumber: 3 },
  { userId: 'U010', courseId: 3, activityType: 'lesson_completed', timestamp: '2025-11-18T13:20:00', lessonId: 10, weekNumber: 2 },
  { userId: 'U012', courseId: 3, activityType: 'quiz_submitted', timestamp: '2025-11-19T08:45:00', lessonId: 9, weekNumber: 3 },
  { userId: 'U014', courseId: 4, activityType: 'lesson_completed', timestamp: '2025-11-17T15:00:00', lessonId: 12, weekNumber: 4 },
  { userId: 'U015', courseId: 5, activityType: 'lesson_started', timestamp: '2025-11-19T10:00:00', lessonId: 13, weekNumber: 1 },
  { userId: 'U016', courseId: 5, activityType: 'lesson_completed', timestamp: '2025-11-18T12:00:00', lessonId: 14, weekNumber: 1 },
  
  // 4-7 days ago
  { userId: 'U003', courseId: 1, activityType: 'course_completed', timestamp: '2025-11-13T18:00:00', lessonId: 5, weekNumber: 6 },
  { userId: 'U007', courseId: 2, activityType: 'course_completed', timestamp: '2025-11-14T17:30:00', lessonId: 8, weekNumber: 6 },
  { userId: 'U013', courseId: 4, activityType: 'course_completed', timestamp: '2025-11-12T16:00:00', lessonId: 12, weekNumber: 6 },
  
  // 8-14 days ago
  { userId: 'U004', courseId: 1, activityType: 'lesson_completed', timestamp: '2025-11-08T14:00:00', lessonId: 4, weekNumber: 3 },
  { userId: 'U011', courseId: 3, activityType: 'lesson_started', timestamp: '2025-11-09T10:30:00', lessonId: 9, weekNumber: 2 },
  
  // 15-30 days ago (at risk)
  { userId: 'U008', courseId: 2, activityType: 'lesson_completed', timestamp: '2025-10-25T11:00:00', lessonId: 6, weekNumber: 2 }
];

// Course progression funnel data
export const courseFunnelStages = [
  { stage: 'Registered', description: 'Users who signed up' },
  { stage: 'Started', description: 'Users who began first lesson' },
  { stage: 'Active', description: 'Users with activity in last 7 days' },
  { stage: 'Completed', description: 'Users who finished course' }
];

// Payment/revenue data
export const payments = [
  { userId: 'U001', courseId: 1, amount: 300, paymentDate: '2025-01-15', status: 'Paid' },
  { userId: 'U002', courseId: 1, amount: 300, paymentDate: '2025-01-16', status: 'Paid' },
  { userId: 'U003', courseId: 1, amount: 300, paymentDate: '2025-01-17', status: 'Paid' },
  { userId: 'U004', courseId: 1, amount: 300, paymentDate: '2025-02-02', status: 'Paid' },
  { userId: 'U005', courseId: 1, amount: 300, paymentDate: '2025-02-03', status: 'Paid' },
  { userId: 'U006', courseId: 2, amount: 400, paymentDate: '2025-01-18', status: 'Paid' },
  { userId: 'U007', courseId: 2, amount: 400, paymentDate: '2025-01-19', status: 'Paid' },
  { userId: 'U008', courseId: 2, amount: 400, paymentDate: '2025-02-05', status: 'Paid' },
  { userId: 'U009', courseId: 2, amount: 400, paymentDate: '2025-02-06', status: 'Paid' },
  { userId: 'U010', courseId: 3, amount: 350, paymentDate: '2025-01-20', status: 'Paid' },
  { userId: 'U011', courseId: 3, amount: 350, paymentDate: '2025-02-08', status: 'Pending' },
  { userId: 'U012', courseId: 3, amount: 350, paymentDate: '2025-02-09', status: 'Paid' },
  { userId: 'U013', courseId: 4, amount: 400, paymentDate: '2025-01-22', status: 'Paid' },
  { userId: 'U014', courseId: 4, amount: 400, paymentDate: '2025-02-10', status: 'Paid' },
  { userId: 'U015', courseId: 5, amount: 600, paymentDate: '2025-03-01', status: 'Paid' },
  { userId: 'U016', courseId: 5, amount: 600, paymentDate: '2025-03-02', status: 'Paid' }
];

// Daily active users for attrition calculation
export const dailyActiveUsers = [
  { date: '2025-11-13', courseId: 1, activeUsers: 4 },
  { date: '2025-11-14', courseId: 1, activeUsers: 4 },
  { date: '2025-11-15', courseId: 1, activeUsers: 3 },
  { date: '2025-11-16', courseId: 1, activeUsers: 3 },
  { date: '2025-11-17', courseId: 1, activeUsers: 3 },
  { date: '2025-11-18', courseId: 1, activeUsers: 4 },
  { date: '2025-11-19', courseId: 1, activeUsers: 3 },
  
  { date: '2025-11-13', courseId: 2, activeUsers: 3 },
  { date: '2025-11-14', courseId: 2, activeUsers: 3 },
  { date: '2025-11-15', courseId: 2, activeUsers: 2 },
  { date: '2025-11-16', courseId: 2, activeUsers: 2 },
  { date: '2025-11-17', courseId: 2, activeUsers: 2 },
  { date: '2025-11-18', courseId: 2, activeUsers: 2 },
  { date: '2025-11-19', courseId: 2, activeUsers: 2 }
];

// Helper functions for analytics
export const getActivityLabel = (activityType) => {
  const labels = {
    'lesson_started': 'Started Lesson',
    'lesson_completed': 'Completed Lesson',
    'quiz_submitted': 'Submitted Quiz',
    'assignment_submitted': 'Submitted Assignment',
    'course_completed': 'Completed Course'
  };
  return labels[activityType] || activityType;
};

export const getDaysSinceActivity = (lastActivityTimestamp) => {
  const now = new Date('2025-11-19T12:00:00'); // Current time for consistency
  const lastActivity = new Date(lastActivityTimestamp);
  const diffTime = Math.abs(now - lastActivity);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getUserStatus = (daysSinceActivity) => {
  if (daysSinceActivity <= 3) return 'Active';
  if (daysSinceActivity <= 7) return 'Recently Active';
  if (daysSinceActivity <= 14) return 'At Risk';
  return 'Inactive';
};

// Get last lesson taught by course
export const getLastLessonByCourse = (courseId) => {
  const courseActivities = userActivities
    .filter(activity => activity.courseId === courseId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  if (courseActivities.length === 0) return null;
  
  const lastActivity = courseActivities[0];
  const lesson = lessons.find(l => l.id === lastActivity.lessonId);
  const instructor = lesson ? instructors.find(i => i.id === lesson.instructorId) : null;
  
  return {
    lessonId: lastActivity.lessonId,
    lessonTitle: lesson?.title || 'Unknown Lesson',
    instructorName: instructor?.name || 'Unknown Instructor',
    timestamp: lastActivity.timestamp,
    lessonNumber: lesson?.lessonNumber || 0
  };
};

// Get students by funnel stage for tooltip
export const getStudentsByFunnelStage = (stage, filteredRegistrations) => {
  const students = [];
  
  switch (stage.toLowerCase()) {
    case 'registered':
      return filteredRegistrations.map(reg => ({
        userId: reg.userId,
        name: reg.name,
        mobile: reg.mobile,
        status: reg.status,
        registeredDate: reg.registeredDate
      }));
      
    case 'started':
      const startedUserIds = new Set(
        userActivities
          .filter(activity => {
            const reg = filteredRegistrations.find(r => r.userId === activity.userId);
            return reg;
          })
          .map(activity => activity.userId)
      );
      
      return filteredRegistrations
        .filter(reg => startedUserIds.has(reg.userId))
        .map(reg => ({
          userId: reg.userId,
          name: reg.name,
          mobile: reg.mobile,
          status: reg.status,
          registeredDate: reg.registeredDate
        }));
        
    case 'active (7d)':
    case 'active':
      const now = new Date('2025-11-19T12:00:00');
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const activeUserIds = new Set(
        userActivities
          .filter(activity => {
            const reg = filteredRegistrations.find(r => r.userId === activity.userId);
            return reg && new Date(activity.timestamp) >= sevenDaysAgo;
          })
          .map(activity => activity.userId)
      );
      
      return filteredRegistrations
        .filter(reg => activeUserIds.has(reg.userId))
        .map(reg => ({
          userId: reg.userId,
          name: reg.name,
          mobile: reg.mobile,
          status: reg.status,
          registeredDate: reg.registeredDate
        }));
        
    case 'completed':
      const completedUserIds = new Set(
        userActivities
          .filter(activity => {
            const reg = filteredRegistrations.find(r => r.userId === activity.userId);
            return reg && activity.activityType === 'course_completed';
          })
          .map(activity => activity.userId)
      );
      
      return filteredRegistrations
        .filter(reg => completedUserIds.has(reg.userId))
        .map(reg => ({
          userId: reg.userId,
          name: reg.name,
          mobile: reg.mobile,
          status: reg.status,
          registeredDate: reg.registeredDate
        }));
        
    default:
      return [];
  }
};

// Get lesson progress distribution for all users
export const getLessonProgressData = (courseId, filteredRegistrations) => {
  // Filter lessons for the specific course
  const courseLessons = lessons.filter(lesson => lesson.courseId === courseId)
    .sort((a, b) => a.lessonNumber - b.lessonNumber);
  
  if (courseLessons.length === 0) return [];
  
  // Get the latest lesson each user has accessed
  const userProgress = {};
  
  filteredRegistrations.forEach(reg => {
    if (reg.courseId === courseId) {
      // Find the user's latest activity for this course
      const userActivities_filtered = userActivities
        .filter(activity => activity.userId === reg.userId && activity.courseId === courseId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      if (userActivities_filtered.length > 0) {
        const latestActivity = userActivities_filtered[0];
        const lesson = courseLessons.find(l => l.id === latestActivity.lessonId);
        
        if (lesson) {
          userProgress[reg.userId] = {
            lessonId: lesson.id,
            lessonNumber: lesson.lessonNumber,
            lessonTitle: lesson.title,
            userName: reg.name,
            activityType: latestActivity.activityType
          };
        }
      } else {
        // User is registered but hasn't started any lessons
        userProgress[reg.userId] = {
          lessonId: null,
          lessonNumber: 0,
          lessonTitle: 'Not Started',
          userName: reg.name,
          activityType: 'registered'
        };
      }
    }
  });
  
  // Create lesson distribution data
  const lessonDistribution = {};
  
  // Add "Not Started" category
  lessonDistribution['Not Started'] = {
    lessonNumber: 0,
    lessonTitle: 'Not Started',
    count: 0,
    students: []
  };
  
  // Initialize all lessons with 0 count
  courseLessons.forEach(lesson => {
    const key = `Lesson ${lesson.lessonNumber}: ${lesson.title}`;
    lessonDistribution[key] = {
      lessonNumber: lesson.lessonNumber,
      lessonTitle: lesson.title,
      count: 0,
      students: []
    };
  });
  
  // Count users at each lesson
  Object.values(userProgress).forEach(progress => {
    if (progress.lessonNumber === 0) {
      lessonDistribution['Not Started'].count++;
      lessonDistribution['Not Started'].students.push({
        name: progress.userName,
        activityType: progress.activityType
      });
    } else {
      const key = `Lesson ${progress.lessonNumber}: ${progress.lessonTitle}`;
      if (lessonDistribution[key]) {
        lessonDistribution[key].count++;
        lessonDistribution[key].students.push({
          name: progress.userName,
          activityType: progress.activityType
        });
      }
    }
  });
  
  // Convert to array format for charting
  return Object.entries(lessonDistribution)
    .map(([key, data]) => ({
      name: key,
      lessonNumber: data.lessonNumber,
      count: data.count,
      students: data.students
    }))
    .sort((a, b) => a.lessonNumber - b.lessonNumber);
};
