import React, { useState } from 'react';
import Button from '../common/Button';

function EssayFeedback({ feedback = null, isLoading = false, onClose }) {
  const [activeTab, setActiveTab] = useState('overall');

  // If feedback is not provided or still loading, show a loading state
  if (!feedback && isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">AI Feedback</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6 flex flex-col items-center justify-center py-12">
          <svg className="animate-spin h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500">Analyzing your essay and generating feedback...</p>
        </div>
      </div>
    );
  }

  // If feedback is not available and not loading, show a placeholder
  if (!feedback && !isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">AI Feedback</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6 text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Feedback Available</h3>
          <p className="mt-1 text-sm text-gray-500">
            Click "Get AI Feedback" on your essay to receive personalized recommendations.
          </p>
        </div>
      </div>
    );
  }

  // Helper function to render stars based on score
  const renderStars = (score) => {
    const maxStars = 5;
    const filledStars = Math.round(score * maxStars / 100);
    
    return (
      <div className="flex items-center">
        {[...Array(maxStars)].map((_, i) => (
          <svg 
            key={i}
            className={`h-5 w-5 ${i < filledStars ? 'text-yellow-400' : 'text-gray-300'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">{score}/100</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Feedback Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">AI Feedback</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Score Summary */}
      <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <span className="text-2xl font-bold">{feedback.overallScore}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Overall Score</p>
                <p className="text-xs text-gray-500">Based on multiple factors</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <p className="text-xs font-medium text-gray-500">Clarity</p>
                {renderStars(feedback.clarityScore)}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Structure</p>
                {renderStars(feedback.structureScore)}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Impact</p>
                {renderStars(feedback.impactScore)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feedback Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          {[
            { id: 'overall', name: 'Overall' },
            { id: 'clarity', name: 'Clarity & Style' },
            { id: 'structure', name: 'Structure' },
            { id: 'impact', name: 'Impact' },
            { id: 'suggestions', name: 'Suggestions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Feedback Content */}
      <div className="p-6">
        {activeTab === 'overall' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Overall Assessment</h3>
              <p className="mt-2 text-gray-600">{feedback.overallFeedback}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900">Key Strengths</h3>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-600">{strength}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900">Areas for Improvement</h3>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {feedback.improvements.map((improvement, index) => (
                  <li key={index} className="text-sm text-gray-600">{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'clarity' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Clarity & Style Analysis</h3>
            <p className="text-gray-600">{feedback.clarityFeedback}</p>
            
            {feedback.highlightedSentences?.clarity?.map((item, index) => (
              <div key={index} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-gray-800">"{item.sentence}"</p>
                <p className="mt-1 text-xs text-gray-600">{item.feedback}</p>
              </div>
            ))}
            
            <div className="p-4 bg-gray-50 rounded border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900">Style Recommendations</h4>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {feedback.styleRecommendations?.map((recommendation, index) => (
                  <li key={index} className="text-sm text-gray-600">{recommendation}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'structure' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Structure Analysis</h3>
            <p className="text-gray-600">{feedback.structureFeedback}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded border border-blue-100">
                <h4 className="text-sm font-medium text-gray-900">Introduction</h4>
                <p className="mt-2 text-sm text-gray-600">{feedback.introductionFeedback}</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded border border-blue-100">
                <h4 className="text-sm font-medium text-gray-900">Body</h4>
                <p className="mt-2 text-sm text-gray-600">{feedback.bodyFeedback}</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded border border-blue-100">
                <h4 className="text-sm font-medium text-gray-900">Conclusion</h4>
                <p className="mt-2 text-sm text-gray-600">{feedback.conclusionFeedback}</p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900">Flow & Coherence</h4>
              <p className="mt-2 text-sm text-gray-600">{feedback.flowFeedback}</p>
            </div>
          </div>
        )}
        
        {activeTab === 'impact' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Impact Analysis</h3>
            <p className="text-gray-600">{feedback.impactFeedback}</p>
            
            <div className="p-4 bg-green-50 rounded border border-green-100">
              <h4 className="text-sm font-medium text-gray-900">Personal Voice</h4>
              <p className="mt-2 text-sm text-gray-600">{feedback.personalVoiceFeedback}</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded border border-green-100">
              <h4 className="text-sm font-medium text-gray-900">Memorability</h4>
              <p className="mt-2 text-sm text-gray-600">{feedback.memorabilityFeedback}</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded border border-green-100">
              <h4 className="text-sm font-medium text-gray-900">Authenticity</h4>
              <p className="mt-2 text-sm text-gray-600">{feedback.authenticityFeedback}</p>
            </div>
          </div>
        )}
        
        {activeTab === 'suggestions' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Improvement Suggestions</h3>
            <p className="text-gray-600">{feedback.improvementIntro}</p>
            
            {feedback.specificSuggestions?.map((suggestion, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded border border-blue-100">
                <h4 className="text-sm font-medium text-gray-900">{suggestion.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{suggestion.description}</p>
                {suggestion.example && (
                  <div className="mt-2 p-2 bg-white rounded">
                    <p className="text-sm italic text-gray-600">Example: {suggestion.example}</p>
                  </div>
                )}
              </div>
            ))}
            
            <div className="mt-6">
              <Button>
                Apply Suggestions to Essay
              </Button>
              <p className="mt-2 text-xs text-gray-500">
                This will create a new version of your essay with these improvements applied.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EssayFeedback;