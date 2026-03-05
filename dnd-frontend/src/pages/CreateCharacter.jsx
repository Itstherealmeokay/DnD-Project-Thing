import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCharacter = () => {
  const navigate = useNavigate();
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    class: '',
    level: 1,
    background: '',
    race: '',
    alignment: '',
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    proficiencyBonus: 2
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCharacter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    try {
      const response = await axios.post('/api/characters', newCharacter);
      
      if (response.status === 201) {
        setMessage({ text: 'Character created successfully!', type: 'success' });
        // Optionally navigate to character list after 2 seconds
        setTimeout(() => navigate('/characters'), 2000);
        
        // Reset form
        setNewCharacter({
          name: '',
          class: '',
          level: 1,
          background: '',
          race: '',
          alignment: '',
          strength: 10,
          dexterity: 10,
          constitution: 10,
          intelligence: 10,
          wisdom: 10,
          charisma: 10,
          proficiencyBonus: 2
        });
      }
    } catch (error) {
      setMessage({ text: 'Error connecting to server', type: 'error' });
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-8 px-4">
      <div className="sticky top-4 z-10 flex items-center justify-center mb-8">
        <h1 className="px-8 py-4 text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg text-white">
          Create Character
        </h1>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your existing form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Character Name *
              </label>
              <input
                type="text"
                name="name"
                value={newCharacter.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter character name"
              />
            </div>
            
            {/* ... rest of your form fields ... */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class *
              </label>
              <input
                type="text"
                name="class"
                value={newCharacter.class}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Wizard, Fighter"
              />
            </div>
            
            {/* Add all your other form fields here */}
          </div>

          {/* Ability Scores */}
          <div className="pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ability Scores (1-30)</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((stat) => (
                <div key={stat}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {stat} *
                  </label>
                  <input
                    type="number"
                    name={stat}
                    value={newCharacter[stat]}
                    onChange={handleChange}
                    min="1"
                    max="30"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Proficiency Bonus */}
          <div className="pt-6">
            <div className="max-w-xs">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proficiency Bonus *
              </label>
              <input
                type="number"
                name="proficiencyBonus"
                value={newCharacter.proficiencyBonus}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Typically +2 at level 1, increases at higher levels</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
            >
              Create Character
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCharacter;