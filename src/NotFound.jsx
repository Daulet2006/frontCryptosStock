// Import necessary modules and components from React and React Router
import React from 'react';
import { Link } from 'react-router-dom';

// NotFoundPage Component: Renders a styled 404 error page with a "Go Home" button
const NotFoundPage = () => {
  return (
    // Main container with flex layout, centering, and full-screen height
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      {/* Inner container with rounded corners, shadow, and centered content */}
      <div className="text-center p-8 rounded-[30px] bg-black shadow-lg border w-96 h-96 items-center justify-center pt-[100px]">
        {/* Error code display */}
        <h1 className="text-6xl font-bold mb-4">404</h1>
        {/* Error message */}
        <p className="text-xl mb-6">Oops! Page Not Found</p>
        {/* Navigation link to redirect to the home page */}
        <Link
          to="/"
          className="inline-block px-6 py-3 text-lg font-semibold text-black bg-white hover:bg-gray-300 rounded-[30px] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

// Export the NotFoundPage component as the default export
export default NotFoundPage;
