import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

function HomePage() {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Navigate Your Path to US Colleges with AI Guidance
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Personalized support for first-generation and international students 
              to find, apply, and succeed at the right US colleges.
            </p>
            <div className="flex flex-wrap gap-4">
              {currentUser ? (
                <Link to="/dashboard">
                  <Button className="text-lg px-8 py-3">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button className="text-lg px-8 py-3">Get Started</Button>
                  </Link>
                  <Link to="/login">
                    <Button className="text-lg px-8 py-3 bg-white text-blue-800 hover:bg-gray-100 hover:text-blue-900">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How CollegePathAI Helps You</h2>
            <p className="mt-4 text-xl text-gray-600">
              We guide you through every step of the college application process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI College Matching */}
            <div className="bg-blue-50 rounded-lg p-8 shadow-sm">
              <div className="text-blue-600 mb-4">
                <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">AI College Matching</h3>
              <p className="text-gray-600">
                Our advanced algorithm analyzes your profile to recommend colleges that best match your academic strengths, preferences, and background.
              </p>
            </div>

            {/* Essay Assistance */}
            <div className="bg-blue-50 rounded-lg p-8 shadow-sm">
              <div className="text-blue-600 mb-4">
                <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Essay Assistance</h3>
              <p className="text-gray-600">
                Get personalized feedback on your essays from our AI, designed to help you tell your unique story while maintaining your authentic voice.
              </p>
            </div>

            {/* Application Tracker */}
            <div className="bg-blue-50 rounded-lg p-8 shadow-sm">
              <div className="text-blue-600 mb-4">
                <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Application Tracker</h3>
              <p className="text-gray-600">
                Stay organized with a comprehensive dashboard that tracks your progress, deadlines, and requirements for each college application.
              </p>
            </div>

            {/* Virtual Counselor */}
            <div className="bg-blue-50 rounded-lg p-8 shadow-sm">
              <div className="text-blue-600 mb-4">
                <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Virtual Counselor</h3>
              <p className="text-gray-600">
                Get 24/7 answers to your questions about applications, financial aid, visas, and more from our AI college counselor.
              </p>
            </div>

            {/* Financial Aid Guidance */}
            <div className="bg-blue-50 rounded-lg p-8 shadow-sm">
              <div className="text-blue-600 mb-4">
                <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Financial Aid Guidance</h3>
              <p className="text-gray-600">
                Discover scholarships, grants, and financial aid opportunities specifically matched to your profile and needs.
              </p>
            </div>

            {/* Timeline & Planning */}
            <div className="bg-blue-50 rounded-lg p-8 shadow-sm">
              <div className="text-blue-600 mb-4">
                <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Timeline & Planning</h3>
              <p className="text-gray-600">
                Get a customized application timeline and step-by-step guidance tailored to your college goals and deadlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Student Success Stories</h2>
            <p className="mt-4 text-xl text-gray-600">
              See how CollegePathAI has helped students like you achieve their dreams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl mr-4">
                  MA
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Maria A.</h3>
                  <p className="text-gray-600">First-gen student, Miami, FL</p>
                </div>
              </div>
              <p className="text-gray-700">
                "As the first in my family to apply to college, I had no idea where to start. CollegePathAI guided me through every step, and I got accepted to my dream school with a scholarship!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl mr-4">
                  JT
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Jin T.</h3>
                  <p className="text-gray-600">International student, Seoul</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The essay feedback helped me tell my story clearly while maintaining my voice. The AI counselor answered all my visa and financial aid questions instantly."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl mr-4">
                  DR
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">David R.</h3>
                  <p className="text-gray-600">Rural student, Montana</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Without a college counselor at my small school, I was lost in the application process. CollegePathAI recommended schools I hadn't even considered but were perfect for me."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your College Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students who have found their path to the right college with our AI-powered guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {currentUser ? (
              <Link to="/dashboard">
                <Button className="text-lg px-8 py-3 bg-white text-blue-800 hover:bg-gray-100">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button className="text-lg px-8 py-3 bg-white text-blue-800 hover:bg-gray-100">
                  Get Started for Free
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;