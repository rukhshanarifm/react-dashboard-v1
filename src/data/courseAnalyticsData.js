// Comprehensive course analytics data

export const courses = [
  { id: 1, name: 'Grade 1 - Kids - July', category: 'Elementary', price: 300 },
  { id: 2, name: 'Grade 2 - Kids - July', category: 'Elementary', price: 350 },
  { id: 3, name: 'Grade 3 - Kids - July', category: 'Elementary', price: 400 }
];

export const cohorts = [
  { id: 1, name: 'Jan 2025', startDate: '2025-01-15' },
  { id: 2, name: 'Feb 2025', startDate: '2025-02-01' },
  { id: 3, name: 'Mar 2025', startDate: '2025-03-01' },
  { id: 4, name: 'Apr 2025', startDate: '2025-04-01' }
];

export const schools = [
  { id: 1, name: 'Pehli Kiran', city: 'Karachi' },
  { id: 2, name: 'DIL School', city: 'Lahore' },
  { id: 3, name: 'Grammar School Rawalpindi', city: 'Rawalpindi' },
  { id: 4, name: 'Oxford Grammar School', city: 'Islamabad' }
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
  { id: 1, name: 'Ms. Sarah Ahmed', specialization: 'Grade 1 Teacher' },
  { id: 2, name: 'Ms. Fatima Ali', specialization: 'Grade 2 Teacher' },
  { id: 3, name: 'Mr. Hassan Khan', specialization: 'Grade 3 Teacher' }
];

// Lessons data with instructor information
export const lessons = [
  // Grade 1 - Kids - July Lessons
  { id: 1, courseId: 1, lessonNumber: 1, title: 'Read: Introduction to Letters', instructorId: 1, weekNumber: 1 },
  { id: 2, courseId: 1, lessonNumber: 2, title: 'Listen and Speak: Greetings', instructorId: 1, weekNumber: 1 },
  { id: 3, courseId: 1, lessonNumber: 3, title: 'MCQs: Letter Recognition', instructorId: 1, weekNumber: 2 },
  { id: 4, courseId: 1, lessonNumber: 4, title: 'Watch and Speak: Story Time', instructorId: 1, weekNumber: 2 },
  { id: 5, courseId: 1, lessonNumber: 5, title: 'Read: Simple Words', instructorId: 1, weekNumber: 3 },
  
  // Grade 2 - Kids - July Lessons
  { id: 6, courseId: 2, lessonNumber: 1, title: 'Read: Short Stories', instructorId: 2, weekNumber: 1 },
  { id: 7, courseId: 2, lessonNumber: 2, title: 'Listen and Speak: Daily Conversations', instructorId: 2, weekNumber: 2 },
  { id: 8, courseId: 2, lessonNumber: 3, title: 'MCQs: Reading Comprehension', instructorId: 2, weekNumber: 3 },
  { id: 9, courseId: 2, lessonNumber: 4, title: 'Watch and Speak: Educational Videos', instructorId: 2, weekNumber: 4 },
  
  // Grade 3 - Kids - July Lessons
  { id: 10, courseId: 3, lessonNumber: 1, title: 'Read: Chapter Books', instructorId: 3, weekNumber: 1 },
  { id: 11, courseId: 3, lessonNumber: 2, title: 'Listen and Speak: Presentations', instructorId: 3, weekNumber: 2 },
  { id: 12, courseId: 3, lessonNumber: 3, title: 'MCQs: Vocabulary Quiz', instructorId: 3, weekNumber: 3 },
  { id: 13, courseId: 3, lessonNumber: 4, title: 'Watch and Speak: Video Discussion', instructorId: 3, weekNumber: 4 }
];

// Registration data with all dimensions and mobile numbers
export const registrations = [
  // Grade 1 - Kids - July
  { userId: 'U001', courseId: 1, cohortId: 1, schoolId: 1, signupMethodId: 1, registeredDate: '2025-01-15', name: 'Ahmed Khan', status: 'Active', mobile: '+92-300-1234567' },
  { userId: 'U002', courseId: 1, cohortId: 1, schoolId: 2, signupMethodId: 2, registeredDate: '2025-01-16', name: 'Fatima Ali', status: 'Active', mobile: '+92-321-9876543' },
  { userId: 'U003', courseId: 1, cohortId: 1, schoolId: 1, signupMethodId: 1, registeredDate: '2025-01-17', name: 'Hassan Sheikh', status: 'Completed', mobile: '+92-333-1111222' },
  { userId: 'U004', courseId: 1, cohortId: 2, schoolId: 3, signupMethodId: 3, registeredDate: '2025-02-02', name: 'Aisha Ahmed', status: 'At Risk', mobile: '+92-345-5555666' },
  { userId: 'U005', courseId: 1, cohortId: 2, schoolId: 1, signupMethodId: 1, registeredDate: '2025-02-03', name: 'Omar Malik', status: 'Active', mobile: '+92-303-7777888' },
  
  // Grade 2 - Kids - July
  { userId: 'U006', courseId: 2, cohortId: 1, schoolId: 2, signupMethodId: 4, registeredDate: '2025-01-18', name: 'Sara Hussain', status: 'Active', mobile: '+92-312-4444555' },
  { userId: 'U007', courseId: 2, cohortId: 1, schoolId: 3, signupMethodId: 2, registeredDate: '2025-01-19', name: 'Ali Raza', status: 'Completed', mobile: '+92-334-2222333' },
  { userId: 'U008', courseId: 2, cohortId: 2, schoolId: 4, signupMethodId: 5, registeredDate: '2025-02-05', name: 'Zainab Khan', status: 'Inactive', mobile: '+92-301-8888999' },
  { userId: 'U009', courseId: 2, cohortId: 2, schoolId: 2, signupMethodId: 1, registeredDate: '2025-02-06', name: 'Bilal Ahmed', status: 'Active', mobile: '+92-322-6666777' },
  
  // Grade 3 - Kids - July
  { userId: 'U010', courseId: 3, cohortId: 1, schoolId: 1, signupMethodId: 1, registeredDate: '2025-01-20', name: 'Maryam Hassan', status: 'Active', mobile: '+92-315-1010101' },
  { userId: 'U011', courseId: 3, cohortId: 2, schoolId: 3, signupMethodId: 3, registeredDate: '2025-02-08', name: 'Usman Ali', status: 'At Risk', mobile: '+92-336-2020202' },
  { userId: 'U012', courseId: 3, cohortId: 2, schoolId: 4, signupMethodId: 5, registeredDate: '2025-02-09', name: 'Nida Fatima', status: 'Active', mobile: '+92-300-3030303' }
];

// User activity logs with timestamps
export const userActivities = [
  // Recent activities (last 3 days) - using correct lesson IDs from lessons array
  { userId: 'U001', courseId: 1, activityType: 'lesson_completed', timestamp: '2025-12-15T14:30:00', lessonId: 5, weekNumber: 3 },
  { userId: 'U002', courseId: 1, activityType: 'quiz_submitted', timestamp: '2025-12-15T10:15:00', lessonId: 3, weekNumber: 2 },
  { userId: 'U005', courseId: 1, activityType: 'lesson_started', timestamp: '2025-12-16T09:00:00', lessonId: 2, weekNumber: 2 },
  { userId: 'U006', courseId: 2, activityType: 'lesson_completed', timestamp: '2025-12-14T16:45:00', lessonId: 8, weekNumber: 4 },
  { userId: 'U009', courseId: 2, activityType: 'assignment_submitted', timestamp: '2025-12-16T11:30:00', lessonId: 7, weekNumber: 3 },
  { userId: 'U010', courseId: 3, activityType: 'lesson_completed', timestamp: '2025-12-15T13:20:00', lessonId: 10, weekNumber: 2 },
  { userId: 'U012', courseId: 3, activityType: 'quiz_submitted', timestamp: '2025-12-16T08:45:00', lessonId: 11, weekNumber: 3 },
  
  // 4-7 days ago
  { userId: 'U003', courseId: 1, activityType: 'course_completed', timestamp: '2025-12-10T18:00:00', lessonId: 5, weekNumber: 6 },
  { userId: 'U007', courseId: 2, activityType: 'course_completed', timestamp: '2025-12-11T17:30:00', lessonId: 9, weekNumber: 6 },
  
  // 8-14 days ago
  { userId: 'U004', courseId: 1, activityType: 'lesson_completed', timestamp: '2025-12-05T14:00:00', lessonId: 4, weekNumber: 3 },
  { userId: 'U011', courseId: 3, activityType: 'lesson_started', timestamp: '2025-12-06T10:30:00', lessonId: 10, weekNumber: 2 },
  
  // 15-30 days ago (at risk)
  { userId: 'U008', courseId: 2, activityType: 'lesson_completed', timestamp: '2025-11-22T11:00:00', lessonId: 6, weekNumber: 2 }
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
  { userId: 'U006', courseId: 2, amount: 350, paymentDate: '2025-01-18', status: 'Paid' },
  { userId: 'U007', courseId: 2, amount: 350, paymentDate: '2025-01-19', status: 'Paid' },
  { userId: 'U008', courseId: 2, amount: 350, paymentDate: '2025-02-05', status: 'Paid' },
  { userId: 'U009', courseId: 2, amount: 350, paymentDate: '2025-02-06', status: 'Paid' },
  { userId: 'U010', courseId: 3, amount: 400, paymentDate: '2025-01-20', status: 'Paid' },
  { userId: 'U011', courseId: 3, amount: 400, paymentDate: '2025-02-08', status: 'Pending' },
  { userId: 'U012', courseId: 3, amount: 400, paymentDate: '2025-02-09', status: 'Paid' }
];

// Daily active users for attrition calculation
export const dailyActiveUsers = [
  { date: '2025-12-10', courseId: 1, activeUsers: 4 },
  { date: '2025-12-11', courseId: 1, activeUsers: 4 },
  { date: '2025-12-12', courseId: 1, activeUsers: 3 },
  { date: '2025-12-13', courseId: 1, activeUsers: 3 },
  { date: '2025-12-14', courseId: 1, activeUsers: 3 },
  { date: '2025-12-15', courseId: 1, activeUsers: 4 },
  { date: '2025-12-16', courseId: 1, activeUsers: 3 },
  
  { date: '2025-12-10', courseId: 2, activeUsers: 3 },
  { date: '2025-12-11', courseId: 2, activeUsers: 3 },
  { date: '2025-12-12', courseId: 2, activeUsers: 2 },
  { date: '2025-12-13', courseId: 2, activeUsers: 2 },
  { date: '2025-12-14', courseId: 2, activeUsers: 2 },
  { date: '2025-12-15', courseId: 2, activeUsers: 2 },
  { date: '2025-12-16', courseId: 2, activeUsers: 2 },
  
  { date: '2025-12-10', courseId: 3, activeUsers: 2 },
  { date: '2025-12-11', courseId: 3, activeUsers: 2 },
  { date: '2025-12-12', courseId: 3, activeUsers: 2 },
  { date: '2025-12-13', courseId: 3, activeUsers: 2 },
  { date: '2025-12-14', courseId: 3, activeUsers: 1 },
  { date: '2025-12-15', courseId: 3, activeUsers: 2 },
  { date: '2025-12-16', courseId: 3, activeUsers: 2 }
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
  const now = new Date('2025-12-17T12:00:00'); // Current time for consistency
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
      const now = new Date('2025-12-17T12:00:00');
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
