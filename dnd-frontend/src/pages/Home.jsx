import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
          D&D Character Creator
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create and manage your D&D characters with ease
        </p>
        <Link 
          to="/create" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition duration-200"
        >
          Create New Character
        </Link>
      </div>
    </div>
  );
};

export default Home;