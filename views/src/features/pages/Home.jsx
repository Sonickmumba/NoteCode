import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">📤 Welcome To NoteCode </h1>
      <p className="text-lg mb-6 text-gray-700 text-center max-w-xl">
        Share Code. Collaborate. Learn.
      </p>

      <div className="flex gap-4">
        <Link
          to="/signup"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-lg"
        >
          🚀 Signup
        </Link>
        <Link
          to="/login"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-xl shadow-lg"
        >
          🔐 Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
