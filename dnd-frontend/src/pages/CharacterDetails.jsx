import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoBox from '../components/InfoBox';
import AbilityScoreBox from '../components/AbilityScoreBox';

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/characters/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch character');
        }
        const data = await response.json();
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading character...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Character not found</div>
      </div>
    );
  }

  const abilityScores = [
    { name: 'Strength', score: character.strength },
    { name: 'Dexterity', score: character.dexterity },
    { name: 'Constitution', score: character.constitution },
    { name: 'Intelligence', score: character.intelligence },
    { name: 'Wisdom', score: character.wisdom },
    { name: 'Charisma', score: character.charisma },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Character Info Box */}
        <div className="bg-white border-2 border-gray-700 rounded-lg p-6 shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            {character.name}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <InfoBox title="Class" value={character.class} />
            <InfoBox title="Level" value={character.level} />
            <InfoBox title="Race" value={character.race} />
            <InfoBox title="Background" value={character.background} />
          </div>
        </div>

        {/* Ability Scores Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Ability Scores
          </h2>
          <div className="flex flex-col gap-4 max-w-xs mx-auto">
            {abilityScores.map((ability) => (
              <AbilityScoreBox
                key={ability.name}
                abilityName={ability.name}
                score={ability.score}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
