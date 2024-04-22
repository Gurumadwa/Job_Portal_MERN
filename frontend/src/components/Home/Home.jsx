import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {Context} from '../../main'

const Home = () => {

  const {user} = useContext(Context)

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Job Portal</h1>
      <p className="text-lg mb-8">Find your dream job or post your job vacancy now!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/job/getall" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-center font-semibold transition duration-300">
          Browse Jobs
        </Link>
        {
          user && user.role==='Employer' ? (<Link to="/job/post" className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-center font-semibold transition duration-300">
          Post a Job
        </Link>):(null)
        }
      </div>
    </div>
  );
};

export default Home;
