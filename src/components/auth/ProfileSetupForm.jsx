import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

function ProfileSetupForm() {
  const navigate = useNavigate();
  const { currentUser, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // Track multi-step form progress
  
  const [formData, setFormData] = useState({
    // Academic Information
    gradeLevel: 'high_school_senior',
    gpa: '',
    weightedGpa: '',
    currentSchool: '',
    graduationYear: new Date().getFullYear() + 1,
    
    // Test Scores
    satScore: '',
    actScore: '',
    tofelScore: '',
    ieltsScore: '',
    
    // Academic Preferences
    majorInterest: '',
    secondMajorInterest: '',
    preferredSchoolSize: '',
    preferredLocations: [],
    
    // Personal Background
    isFirstGen: currentUser?.isFirstGen || false,
    isInternational: currentUser?.isInternational || false,
    countryOfOrigin: '',
    primaryLanguage: 'English',
    extracurriculars: ['', '', ''],
    achievements: ['', ''],
    
    // Financial Considerations
    needsFinancialAid: false,
    scholarshipInterest: true,
    budgetRange: '',
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleMultiChange = (index, field, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [field]: updatedArray
    });
  };
  
  const handleLocationChange = (location) => {
    const updatedLocations = [...formData.preferredLocations];
    
    if (updatedLocations.includes(location)) {
      // Remove if already selected
      const index = updatedLocations.indexOf(location);
      updatedLocations.splice(index, 1);
    } else {
      // Add if not already selected
      updatedLocations.push(location);
    }
    
    setFormData({
      ...formData,
      preferredLocations: updatedLocations
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If not on the final step, move to the next step
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Update user profile with the new data
      await updateProfile({
        studentProfile: formData
      });
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to update profile. Please try again.');
      console.error('Profile update error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function for navigation between steps
  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Complete Your Profile
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <span>{error}</span>
        </div>
      )}
      
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`h-3 w-1/3 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'} rounded-l-full`}></div>
          <div className={`h-3 w-1/3 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`h-3 w-1/3 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'} rounded-r-full`}></div>
        </div>
        <div className="flex justify-between mt-2 text-sm font-medium">
          <div className={`${step === 1 ? 'text-blue-600' : 'text-gray-500'}`}>Academic Info</div>
          <div className={`${step === 2 ? 'text-blue-600' : 'text-gray-500'}`}>Preferences</div>
          <div className={`${step === 3 ? 'text-blue-600' : 'text-gray-500'}`}>Background</div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Academic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 mb-1">
                Current Grade Level
              </label>
              <select
                id="gradeLevel"
                name="gradeLevel"
                value={formData.gradeLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Grade Level</option>
                <option value="high_school_sophomore">High School Sophomore</option>
                <option value="high_school_junior">High School Junior</option>
                <option value="high_school_senior">High School Senior</option>
                <option value="gap_year">Gap Year</option>
                <option value="transfer">Transfer Student</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-1">
                  Unweighted GPA (4.0 scale)
                </label>
                <input
                  type="number"
                  id="gpa"
                  name="gpa"
                  min="0"
                  max="4.0"
                  step="0.01"
                  value={formData.gpa}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 3.75"
                />
              </div>
              <div>
                <label htmlFor="weightedGpa" className="block text-sm font-medium text-gray-700 mb-1">
                  Weighted GPA (if applicable)
                </label>
                <input
                  type="number"
                  id="weightedGpa"
                  name="weightedGpa"
                  min="0"
                  max="5.0"
                  step="0.01"
                  value={formData.weightedGpa}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 4.2"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="currentSchool" className="block text-sm font-medium text-gray-700 mb-1">
                Current School
              </label>
              <input
                type="text"
                id="currentSchool"
                name="currentSchool"
                value={formData.currentSchool}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your current school"
              />
            </div>
            
            <div>
              <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                Expected Graduation Year
              </label>
              <select
                id="graduationYear"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {[0, 1, 2, 3, 4].map((offset) => {
                  const year = new Date().getFullYear() + offset;
                  return (
                    <option key={year} value={year}>{year}</option>
                  );
                })}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="satScore" className="block text-sm font-medium text-gray-700 mb-1">
                  SAT Score (if available)
                </label>
                <input
                  type="number"
                  id="satScore"
                  name="satScore"
                  min="400"
                  max="1600"
                  step="10"
                  value={formData.satScore}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 1400"
                />
              </div>
              <div>
                <label htmlFor="actScore" className="block text-sm font-medium text-gray-700 mb-1">
                  ACT Score (if available)
                </label>
                <input
                  type="number"
                  id="actScore"
                  name="actScore"
                  min="1"
                  max="36"
                  step="1"
                  value={formData.actScore}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 30"
                />
              </div>
            </div>
            
            {/* Show TOEFL/IELTS fields if student is international */}
            {formData.isInternational && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tofelScore" className="block text-sm font-medium text-gray-700 mb-1">
                    TOEFL Score (if available)
                  </label>
                  <input
                    type="number"
                    id="tofelScore"
                    name="tofelScore"
                    min="0"
                    max="120"
                    step="1"
                    value={formData.tofelScore}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 100"
                  />
                </div>
                <div>
                  <label htmlFor="ieltsScore" className="block text-sm font-medium text-gray-700 mb-1">
                    IELTS Score (if available)
                  </label>
                  <input
                    type="number"
                    id="ieltsScore"
                    name="ieltsScore"
                    min="0"
                    max="9"
                    step="0.5"
                    value={formData.ieltsScore}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 7.5"
                  />
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Step 2: Preferences and Interests */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="majorInterest" className="block text-sm font-medium text-gray-700 mb-1">
                Primary Field of Interest
              </label>
              <select
                id="majorInterest"
                name="majorInterest"
                value={formData.majorInterest}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Primary Interest</option>
                <option value="arts_humanities">Arts & Humanities</option>
                <option value="business">Business & Management</option>
                <option value="engineering">Engineering</option>
                <option value="computer_science">Computer Science</option>
                <option value="health_medicine">Health & Medicine</option>
                <option value="life_sciences">Life Sciences</option>
                <option value="physical_sciences">Physical Sciences</option>
                <option value="social_sciences">Social Sciences</option>
                <option value="undecided">Undecided</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="secondMajorInterest" className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Field of Interest (Optional)
              </label>
              <select
                id="secondMajorInterest"
                name="secondMajorInterest"
                value={formData.secondMajorInterest}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Secondary Interest</option>
                <option value="arts_humanities">Arts & Humanities</option>
                <option value="business">Business & Management</option>
                <option value="engineering">Engineering</option>
                <option value="computer_science">Computer Science</option>
                <option value="health_medicine">Health & Medicine</option>
                <option value="life_sciences">Life Sciences</option>
                <option value="physical_sciences">Physical Sciences</option>
                <option value="social_sciences">Social Sciences</option>
                <option value="undecided">Undecided</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Locations
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Northeast', 'Midwest', 'South', 'West', 'Urban', 'Suburban', 'Rural'
                ].map((location) => (
                  <div key={location} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`location-${location}`}
                      checked={formData.preferredLocations.includes(location)}
                      onChange={() => handleLocationChange(location)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`location-${location}`} className="ml-2 block text-sm text-gray-700">
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="preferredSchoolSize" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred School Size
              </label>
              <select
                id="preferredSchoolSize"
                name="preferredSchoolSize"
                value={formData.preferredSchoolSize}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">No Preference</option>
                <option value="small">Small (< 5,000 students)</option>
                <option value="medium">Medium (5,000 - 15,000 students)</option>
                <option value="large">Large (> 15,000 students)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Financial Considerations
              </label>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="needsFinancialAid"
                  name="needsFinancialAid"
                  checked={formData.needsFinancialAid}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="needsFinancialAid" className="ml-2 block text-sm text-gray-700">
                  I will need financial aid to attend college
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="scholarshipInterest"
                  name="scholarshipInterest"
                  checked={formData.scholarshipInterest}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="scholarshipInterest" className="ml-2 block text-sm text-gray-700">
                  I'm interested in scholarship opportunities
                </label>
              </div>
            </div>
            
            {formData.needsFinancialAid && (
              <div>
                <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Budget Range (USD)
                </label>
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Budget Range</option>
                  <option value="under_10k">Under $10,000 per year</option>
                  <option value="10k_20k">$10,000 - $20,000 per year</option>
                  <option value="20k_35k">$20,000 - $35,000 per year</option>
                  <option value="35k_50k">$35,000 - $50,000 per year</option>
                  <option value="over_50k">Over $50,000 per year</option>
                </select>
              </div>
            )}
          </div>
        )}
        
        {/* Step 3: Personal Background */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Information
              </label>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFirstGen"
                  name="isFirstGen"
                  checked={formData.isFirstGen}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isFirstGen" className="ml-2 block text-sm text-gray-700">
                  I'm a first-generation college student
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isInternational"
                  name="isInternational"
                  checked={formData.isInternational}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isInternational" className="ml-2 block text-sm text-gray-700">
                  I'm an international student
                </label>
              </div>
            </div>
            
            {formData.isInternational && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="countryOfOrigin" className="block text-sm font-medium text-gray-700 mb-1">
                    Country of Origin
                  </label>
                  <input
                    type="text"
                    id="countryOfOrigin"
                    name="countryOfOrigin"
                    value={formData.countryOfOrigin}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your country of origin"
                  />
                </div>
                <div>
                  <label htmlFor="primaryLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Language
                  </label>
                  <input
                    type="text"
                    id="primaryLanguage"
                    name="primaryLanguage"
                    value={formData.primaryLanguage}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your primary language"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Top Extracurricular Activities
              </label>
              
              {formData.extracurriculars.map((activity, index) => (
                <div key={`activity-${index}`} className="mb-2">
                  <input
                    type="text"
                    value={activity}
                    onChange={(e) => handleMultiChange(index, 'extracurriculars', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Extracurricular activity ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Achievements/Awards
              </label>
              
              {formData.achievements.map((achievement, index) => (
                <div key={`achievement-${index}`} className="mb-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => handleMultiChange(index, 'achievements', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Achievement ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <Button 
              type="button" 
              onClick={goToPreviousStep}
              className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
            >
              Previous
            </Button>
          ) : (
            <div></div> // Empty div for spacing
          )}
          
          <Button
            type="submit"
            isLoading={isLoading}
          >
            {step < 3 ? 'Continue' : 'Complete Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileSetupForm;