import React, { useState, useEffect } from 'react';
import CollegeCard from './CollegeCard';

function CollegeList({ initialColleges = [], filters = {}, onSaveCollege }) {
  const [colleges, setColleges] = useState(initialColleges);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Apply filters when filters object changes
  useEffect(() => {
    setLoading(true);
    
    // Filter colleges based on the filters
    // This is a simple implementation, in a real app this might be done server-side
    let result = [...colleges];
    
    // Filter by name
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(college => 
        college.name.toLowerCase().includes(query) ||
        college.city?.toLowerCase().includes(query) ||
        college.state?.toLowerCase().includes(query)
      );
    }
    
    // Filter by type (public, private, etc)
    if (filters.type && filters.type.length > 0) {
      result = result.filter(college => filters.type.includes(college.type));
    }
    
    // Filter by size
    if (filters.size && filters.size.length > 0) {
      result = result.filter(college => {
        const studentCount = college.studentCount || 0;
        return (
          (filters.size.includes('small') && studentCount < 5000) ||
          (filters.size.includes('medium') && studentCount >= 5000 && studentCount < 15000) ||
          (filters.size.includes('large') && studentCount >= 15000)
        );
      });
    }
    
    // Filter by acceptance rate
    if (filters.acceptanceRate) {
      const minAcceptance = filters.acceptanceRate[0] / 100;
      const maxAcceptance = filters.acceptanceRate[1] / 100;
      result = result.filter(college => 
        college.acceptanceRate >= minAcceptance && 
        college.acceptanceRate <= maxAcceptance
      );
    }
    
    // Filter by tuition range
    if (filters.tuitionRange) {
      const [minTuition, maxTuition] = filters.tuitionRange;
      result = result.filter(college => 
        college.tuition >= minTuition && 
        college.tuition <= maxTuition
      );
    }
    
    // Filter by location
    if (filters.location && filters.location.length > 0) {
      result = result.filter(college => filters.location.includes(college.region));
    }
    
    // Sort colleges if sortBy is provided
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'match':
          result.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
          break;
        case 'name':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'acceptance':
          result.sort((a, b) => (a.acceptanceRate || 1) - (b.acceptanceRate || 1));
          break;
        case 'deadline':
          result.sort((a, b) => {
            if (!a.applicationDeadline) return 1;
            if (!b.applicationDeadline) return -1;
            return new Date(a.applicationDeadline) - new Date(b.applicationDeadline);
          });
          break;
        default:
          break;
      }
    }
    
    setFilteredColleges(result);
    setLoading(false);
  }, [colleges, filters]);
  
  // Handle saving/unsaving a college
  const handleSaveCollege = (collegeId, isSaved) => {
    // Update the local state
    setColleges(prevColleges => 
      prevColleges.map(college => 
        college.id === collegeId ? { ...college, saved: isSaved } : college
      )
    );
    
    // Call the parent handler if provided
    if (onSaveCollege) {
      onSaveCollege(collegeId, isSaved);
    }
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
  
  // Show empty state
  if (filteredColleges.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No colleges found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }
  
  // Render the college grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredColleges.map(college => (
        <CollegeCard 
          key={college.id} 
          college={college} 
          onSave={handleSaveCollege} 
        />
      ))}
    </div>
  );
}

export default CollegeList;