import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';

const CreateClass = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    name: '',
    hitDie: '',
    armorProficiencies: '',
    weaponProficiencies: '',
    savingThrows: '',
    skills: '',
    classFeatures: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const toArray = (value) =>
    value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    const parsedHitDie = Number(formData.hitDie);
    if (!Number.isInteger(parsedHitDie) || parsedHitDie <= 0) {
      setMessage({ text: 'Hit Die must be a positive whole number.', type: 'error' });
      return;
    }

    const payload = {
      name: formData.name,
      hitDie: parsedHitDie,
      armorProficiencies: toArray(formData.armorProficiencies),
      weaponProficiencies: toArray(formData.weaponProficiencies),
      savingThrows: toArray(formData.savingThrows),
      skills: toArray(formData.skills),
      classFeatures: toArray(formData.classFeatures)
    };

    try {
      const response = await axios.post('/api/classes', payload);
      if (response.status === 201) {
        navigate('/classes');
      }
    } catch (error) {
      console.error('Error creating class:', error);
      setMessage({ text: 'Unable to create class. Check your values and try again.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
          Create Class
        </h1>

        {message.text && (
          <div className="mb-6 p-4 rounded-lg border border-red-300 bg-red-100 text-red-800">
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Fighter"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hit Die *</label>
              <input
                type="number"
                name="hitDie"
                value={formData.hitDie}
                onChange={handleChange}
                required
                min="1"
                step="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., 10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Armor Proficiencies *</label>
              <input
                name="armorProficiencies"
                value={formData.armorProficiencies}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Comma-separated values"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weapon Proficiencies *</label>
              <input
                name="weaponProficiencies"
                value={formData.weaponProficiencies}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Comma-separated values"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Saving Throws *</label>
              <input
                name="savingThrows"
                value={formData.savingThrows}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Comma-separated values"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills *</label>
              <input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Comma-separated values"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class Features *</label>
            <textarea
              name="classFeatures"
              value={formData.classFeatures}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Comma-separated values"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <SubmitButton type="submit">Save Class</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
