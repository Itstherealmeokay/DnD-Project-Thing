import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';

const CreateCharacter = () => {
  const navigate = useNavigate();
  const [availableClasses, setAvailableClasses] = useState([]);
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

  // Fetch available classes on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/api/classes');
        setAvailableClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setMessage({ text: 'Error loading classes', type: 'error' });
      }
    };
    fetchClasses();
  }, []);

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
          {/* Basic Information */}
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Race *
              </label>
              <input
                type="text"
                name="race"
                value={newCharacter.race}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Human, Elf, Dwarf"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class *
              </label>
              <select
                name="class"
                value={newCharacter.class}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select a class</option>
                {availableClasses.map((classOption) => (
                  <option key={classOption._id} value={classOption._id}>
                    {classOption.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level *
              </label>
              <input
                type="number"
                name="level"
                value={newCharacter.level}
                onChange={handleChange}
                min="1"
                max="20"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background
              </label>
              <input
                type="text"
                name="background"
                value={newCharacter.background}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Soldier, Noble"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alignment
              </label>
              <input
                type="text"
                name="alignment"
                value={newCharacter.alignment}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Lawful Good, Chaotic Neutral"
              />
            </div>
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
            <SubmitButton type="submit">
              Create Character
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCharacter;