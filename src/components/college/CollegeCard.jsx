import React, { useState } from 'react';

function CollegeCard({ college, onSave }) {
  const [isSaved, setIsSaved] = useState(college.saved || false);
  
  const handleSaveToggle = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    if (onSave) {
      onSave(college.id, newSavedState);
    }
  };

  // Format acceptance rate as percentage
  const formatAcceptanceRate = (rate) => {
    if (rate === null || rate === undefined) return 'N/A';
    return `${(rate * 100).toFixed(1)}%`;
  };

  // Convert tuition to formatted currency
  const formatTuition = (amount) => {
    if (amount === null || amount === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* College Header with Image */}
      <div className="h-40 bg-gray-200 relative overflow-hidden">
        {college.imageUrl ? (
          <img 
            src={college.imageUrl} 
            alt={`${college.name} campus`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-100">
            <span className="text-blue-800 font-semibold text-lg">{college.name.substring(0, 2).toUpperCase()}</span>
          </div>
        )}
        
        <button 
          onClick={handleSaveToggle}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ${isSaved ? 'text-blue-600' : 'text-gray-400'}`} 
            fill={isSaved ? 'currentColor' : 'none'} 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
            />
          </svg>
        </button>
      </div>
      
      {/* College Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{college.name}</h3>
          {college.matchScore && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {college.matchScore}% Match
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-600 mt-1">
          {college.city}, {college.state} {college.country !== 'USA' && college.country}
        </p>
        
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <span className="text-gray-500">Type:</span>
            <span className="ml-1 font-medium text-gray-800">{college.type || 'N/A'}</span>
          </div>
          
          <div>
            <span className="text-gray-500">Size:</span>
            <span className="ml-1 font-medium text-gray-800">
              {college.studentCount ? `${(college.studentCount/1000).toFixed(1)}K` : 'N/A'}
            </span>
          </div>
          
          <div>
            <span className="text-gray-500">Acceptance:</span>
            <span className="ml-1 font-medium text-gray-800">
              {formatAcceptanceRate(college.acceptanceRate)}
            </span>
          </div>
          
          <div>
            <span className="text-gray-500">Tuition:</span>
            <span className="ml-1 font-medium text-gray-800">
              {formatTuition(college.tuition)}
            </span>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap">
          {college.topPrograms && college.topPrograms.slice(0, 3).map((program, index) => (
            <span 
              key={index}
              className="mr-1 mb-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {program}
            </span>
          ))}
          {college.topPrograms && college.topPrograms.length > 3 && (
            <span className="text-xs text-gray-500 self-center">+{college.topPrograms.length - 3} more</span>
          )}
        </div>
        
        <div className="mt-4 flex justify-between">
          <span className="text-xs text-gray-500">
            {college.applicationDeadline ? `Deadline: ${new Date(college.applicationDeadline).toLocaleDateString()}` : ''}
          </span>
          <a 
            href={college.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
}

export default CollegeCard;