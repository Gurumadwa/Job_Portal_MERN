import React from "react";

const NotFound = () => {
  return (
    <div class="h-screen flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold text-center mb-4">404 - Page Not Found!!</h1>
      <p class="text-xl text-gray-600 text-center mb-8">
        Looks like the page you're looking for does not exist.
      </p>
      <a
        href="/"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Go Back to Home
      </a>
    </div>
  );
};

export default NotFound;
