import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get('/api/characters');
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Your Characters
        </h1>
        
        {characters.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">No characters created yet.</p>
            <Link 
              to="/create" 
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
            >
              Create Your First Character
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((char) => (
              <div key={char._id} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-2">{char.name}</h2>
                <p className="text-gray-600">Level {char.level} {char.race} {char.class}</p>
                <p className="text-gray-600">Background: {char.background}</p>
                <p className="text-gray-600">Alignment: {char.alignment}</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                  <div>STR: {char.strength}</div>
                  <div>DEX: {char.dexterity}</div>
                  <div>CON: {char.constitution}</div>
                  <div>INT: {char.intelligence}</div>
                  <div>WIS: {char.wisdom}</div>
                  <div>CHA: {char.charisma}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterList;