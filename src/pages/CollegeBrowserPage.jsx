import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import CollegeList from '../components/college/CollegeList';
import { useAuth } from '../context/AuthContext';

function CollegeBrowserPage() {
  const { currentUser } = useAuth();
  const [filters, setFilters] = useState({
    searchQuery: '',
    type: [],
    size: [],
    location: [],
    acceptanceRate: [0, 100],
    tuitionRange: [0, 75000],
    sortBy: 'match'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Mock college data
  const [colleges] = useState([
    {
      id: 1,
      name: "Harvard University",
      type: "Private",
      city: "Cambridge",
      state: "MA",
      country: "USA",
      region: "Northeast",
      studentCount: 20000,
      acceptanceRate: 0.05,
      tuition: 51925,
      website: "https://www.harvard.edu",
      matchScore: 87,
      topPrograms: ["Economics", "Computer Science", "Political Science", "Biology"],
      applicationDeadline: "2023-01-01",
      imageUrl: "https://www.harvard.edu/wp-content/uploads/2021/02/091520_Campus_Aerials_0105_1500x1000.jpg"
    },
    {
      id: 2,
      name: "Stanford University",
      type: "Private",
      city: "Stanford",
      state: "CA",
      country: "USA",
      region: "West",
      studentCount: 17000,
      acceptanceRate: 0.04,
      tuition: 56169,
      website: "https://www.stanford.edu",
      matchScore: 92,
      topPrograms: ["Computer Science", "Engineering", "Business", "Psychology"],
      applicationDeadline: "2023-01-05",
      imageUrl: "https://www.stanford.edu/wp-content/uploads/2022/04/Campus-drive.jpg"
    },
    {
      id: 3,
      name: "MIT",
      type: "Private",
      city: "Cambridge",
      state: "MA",
      country: "USA",
      region: "Northeast",
      studentCount: 11500,
      acceptanceRate: 0.07,
      tuition: 53790,
      website: "https://www.mit.edu",
      matchScore: 89,
      topPrograms: ["Engineering", "Computer Science", "Physics", "Mathematics"],
      applicationDeadline: "2023-01-05",
      imageUrl: "https://news.mit.edu/sites/default/files/images/202012/MIT-Dome-Sunset-001.jpg"
    },
    {
      id: 4,
      name: "UC Berkeley",
      type: "Public",
      city: "Berkeley",
      state: "CA",
      country: "USA",
      region: "West",
      studentCount: 42000,
      acceptanceRate: 0.16,
      tuition: 14226,
      website: "https://www.berkeley.edu",
      matchScore: 78,
      topPrograms: ["Computer Science", "Engineering", "Business", "Social Sciences"],
      applicationDeadline: "2022-11-30",
      imageUrl: "https://www.berkeley.edu/sites/default/files/2022-05/campanile-groves-680.jpg"
    },
    {
      id: 5,
      name: "University of Michigan",
      type: "Public",
      city: "Ann Arbor",
      state: "MI",
      country: "USA",
      region: "Midwest",
      studentCount: 47000,
      acceptanceRate: 0.23,
      tuition: 15948,
      website: "https://umich.edu",
      matchScore: 85,
      topPrograms: ["Business", "Psychology", "Engineering", "Computer Science"],
      applicationDeadline: "2023-02-01",
      imageUrl: "https://smartmediaservices.edu/wp-content/uploads/sites/23/2022/08/MichiganUni-scaled.jpg"
    },
    {
      id: 6,
      name: "New York University",
      type: "Private",
      city: "New York",
      state: "NY",
      country: "USA",
      region: "Northeast",
      studentCount: 51000,
      acceptanceRate: 0.21,
      tuition: 53308,
      website: "https://www.nyu.edu",
      matchScore: 81,
      topPrograms: ["Business", "Communications", "Social Sciences", "Arts"],
      applicationDeadline: "2023-01-05",
      imageUrl: "https://www.nyu.edu/content/dam/nyu/globalHome/image/marquees/16-366_WS_D_lores.jpg"
    }
  ]);
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      searchQuery: e.target.value
    });
  };
  
  const handleFilterToggle = (filterType, value) => {
    setFilters(prevFilters => {
      const currentFilters = [...prevFilters[filterType]];
      const valueIndex = currentFilters.indexOf(value);
      
      if (valueIndex === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(valueIndex, 1);
      }
      
      return {
        ...prevFilters,
        [filterType]: currentFilters
      };
    });
  };
  
  const handleSortChange = (e) => {
    setFilters({
      ...filters,
      sortBy: e.target.value
    });
  };
  
  const handleRangeChange = (filterType, values) => {
    setFilters({
      ...filters,
      [filterType]: values
    });
  };
  
  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      type: [],
      size: [],
      location: [],
      acceptanceRate: [0, 100],
      tuitionRange: [0, 75000],
      sortBy: 'match'
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your College Match</h1>
          <p className="mt-2 text-lg text-gray-600">
            Explore colleges tailored to your profile and preferences
          </p>
        </div>
        
        {/* Search and Filter Panel */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by college name or location"
                value={filters.searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Sort Dropdown */}
              <div>
                <select
                  value={filters.sortBy}
                  onChange={handleSortChange}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="match">Sort by Match</option>
                  <option value="name">Sort by Name</option>
                  <option value="acceptance">Sort by Acceptance Rate</option>
                  <option value="deadline">Sort by Deadline</option>
                </select>
              </div>
              
              {/* Filter Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                <span className="ml-1.5 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {filters.type.length + filters.size.length + filters.location.length}
                </span>
              </button>
              
              {/* Clear Filters Button */}
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>
          </div>
          
          {/* Filter Panel (expandable) */}
          {isFilterOpen && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Institution Type */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Institution Type</h3>
                <div className="space-y-2">
                  {['Public', 'Private', 'Community', 'Liberal Arts'].map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        id={`filter-type-${type}`}
                        name="type[]"
                        value={type}
                        type="checkbox"
                        checked={filters.type.includes(type)}
                        onChange={() => handleFilterToggle('type', type)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`filter-type-${type}`} className="ml-2 text-sm text-gray-600">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* School Size */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">School Size</h3>
                <div className="space-y-2">
                  {[
                    { id: 'small', label: 'Small (< 5,000)' },
                    { id: 'medium', label: 'Medium (5,000 - 15,000)' },
                    { id: 'large', label: 'Large (> 15,000)' },
                  ].map((size) => (
                    <div key={size.id} className="flex items-center">
                      <input
                        id={`filter-size-${size.id}`}
                        name="size[]"
                        value={size.id}
                        type="checkbox"
                        checked={filters.size.includes(size.id)}
                        onChange={() => handleFilterToggle('size', size.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`filter-size-${size.id}`} className="ml-2 text-sm text-gray-600">
                        {size.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Location */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Location</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Northeast', 'Midwest', 'South', 'West'].map((region) => (
                    <div key={region} className="flex items-center">
                      <input
                        id={`filter-location-${region}`}
                        name="location[]"
                        value={region}
                        type="checkbox"
                        checked={filters.location.includes(region)}
                        onChange={() => handleFilterToggle('location', region)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`filter-location-${region}`} className="ml-2 text-sm text-gray-600">
                        {region}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* College Results */}
        <CollegeList initialColleges={colleges} filters={filters} />
      </div>
    </div>
  );
}

export default CollegeBrowserPage;