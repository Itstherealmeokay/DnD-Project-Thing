import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            D&D Creator
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-purple-500 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/create" className="text-gray-700 hover:text-purple-500 px-3 py-2 rounded-md">
              Create Character
            </Link>
            <Link to="/characters" className="text-gray-700 hover:text-purple-500 px-3 py-2 rounded-md">
              View Characters
            </Link>
            <Link to="/classes" className="text-gray-700 hover:text-purple-500 px-3 py-2 rounded-md">
              View Classes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;