import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Dashboard() {
  const { currentUser } = useAuth();
  const studentProfile = currentUser?.studentProfile || {};

  // Mock data for application progress
  const [applications, setApplications] = useState([
    {
      id: 1,
      collegeName: 'Stanford University',
      deadline: '2023-01-01',
      status: 'in_progress',
      progress: 65,
      tasks: [
        { id: 1, name: 'Complete Common App', completed: true },
        { id: 2, name: 'Write Personal Statement', completed: true },
        { id: 3, name: 'Submit Supplemental Essays', completed: false },
        { id: 4, name: 'Request Recommendation Letters', completed: true },
        { id: 5, name: 'Submit Application Fee', completed: false },
      ]
    },
    {
      id: 2,
      collegeName: 'MIT',
      deadline: '2023-01-05',
      status: 'in_progress',
      progress: 40,
      tasks: [
        { id: 1, name: 'Complete Application Form', completed: true },
        { id: 2, name: 'Write Essays', completed: false },
        { id: 3, name: 'Submit Test Scores', completed: true },
        { id: 4, name: 'Request Recommendation Letters', completed: false },
        { id: 5, name: 'Submit Application Fee', completed: false },
      ]
    },
    {
      id: 3,
      collegeName: 'UC Berkeley',
      deadline: '2022-11-30',
      status: 'submitted',
      progress: 100,
      tasks: [
        { id: 1, name: 'Complete UC Application', completed: true },
        { id: 2, name: 'Write Personal Insight Questions', completed: true },
        { id: 3, name: 'Submit Test Scores', completed: true },
        { id: 4, name: 'Submit Application Fee', completed: true },
      ]
    }
  ]);

  // Mock data for college recommendations
  const recommendations = [
    {
      id: 1,
      name: 'Yale University',
      location: 'New Haven, CT',
      match: 92,
      fields: ['Computer Science', 'Mathematics'],
      deadline: '2023-01-02',
    },
    {
      id: 2,
      name: 'Duke University',
      location: 'Durham, NC',
      match: 88,
      fields: ['Engineering', 'Economics'],
      deadline: '2023-01-03',
    },
    {
      id: 3,
      name: 'University of Michigan',
      location: 'Ann Arbor, MI',
      match: 85,
      fields: ['Computer Science', 'Business'],
      deadline: '2023-01-15',
    },
  ];

  // Get upcoming tasks across all applications
  const upcomingTasks = applications
    .flatMap(app => app.tasks
      .filter(task => !task.completed)
      .map(task => ({
        ...task,
        collegeName: app.collegeName,
        deadline: app.deadline
      }))
    )
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col space-y-8">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {currentUser?.firstName || 'Student'}!
        </h1>
        <p className="mt-2 text-gray-600">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <div className="mt-4 bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
          <p className="text-sm font-medium text-blue-800">
            You have {upcomingTasks.length} pending tasks and {applications.filter(a => a.status !== 'submitted').length} applications in progress.
          </p>
        </div>
      </div>

      {/* Applications Progress Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Applications</h2>
          <Link to="/applications" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </Link>
        </div>

        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{app.collegeName}</h3>
                  <p className="text-sm text-gray-500">
                    Deadline: {formatDate(app.deadline)}
                  </p>
                </div>
                <span 
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    app.status === 'submitted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {app.status === 'submitted' ? 'Submitted' : 'In Progress'}
                </span>
              </div>

              <div className="mt-3">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${app.progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs font-medium text-gray-600">{app.progress}%</span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-1">
                {app.tasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={task.completed} 
                      readOnly
                      className="h-4 w-4 text-blue-600 rounded" 
                    />
                    <span className={`ml-2 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                      {task.name}
                    </span>
                  </div>
                ))}
                {app.tasks.length > 3 && (
                  <p className="text-xs text-gray-500 mt-1">
                    +{app.tasks.length - 3} more tasks
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Tasks Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Tasks</h2>
          <Link to="/applications" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </Link>
        </div>

        {upcomingTasks.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="py-3 flex items-start">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 mt-1 text-blue-600 rounded" 
                  readOnly
                />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-800">{task.name}</p>
                  <p className="text-xs text-gray-500">{task.collegeName}</p>
                </div>
                <span className="text-xs font-medium text-gray-500">
                  Due {formatDate(task.deadline)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No upcoming tasks. Great job!</p>
        )}
      </div>

      {/* College Recommendations Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recommended For You</h2>
          <Link to="/colleges" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Colleges
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((college) => (
            <div key={college.id} className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-800">{college.name}</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {college.match}% Match
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{college.location}</p>
              <div className="mt-2 flex flex-wrap">
                {college.fields.map((field, index) => (
                  <span 
                    key={index}
                    className="mr-1 mb-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {field}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500">
                  Deadline: {formatDate(college.deadline)}
                </span>
                <button className="px-2 py-1 text-xs text-blue-600 font-medium hover:text-blue-800">
                  Add to List
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Counselor Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">AI Counselor</h2>
          <Link to="/ai-counselor" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Open Counselor
          </Link>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-800 font-medium">Have questions about your applications?</p>
            <p className="text-xs text-gray-500">Ask your AI counselor for personalized guidance and answers.</p>
          </div>
          <Link 
            to="/ai-counselor"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Ask Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;