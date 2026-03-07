import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoBox from '../components/InfoBox';
import AbilityScoreBox from '../components/AbilityScoreBox';
import VitalsBox from '../components/VitalsBox';

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

  const handleScoreChange = async (abilityName, newScore) => {
    try {
      const response = await fetch(`http://localhost:5000/api/characters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [abilityName]: newScore,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update character');
      }

      const updatedCharacter = await response.json();
      setCharacter(updatedCharacter);
    } catch (err) {
      console.error('Error updating character:', err);
      alert('Failed to update ability score');
    }
  };

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

  const classDisplayName =
    typeof character.class === 'object' && character.class !== null
      ? character.class.name
      : character.class;

  const classHitDie =
    typeof character.class === 'object' && character.class !== null
      ? Number(character.class.hitDie ?? character.class.hitdie ?? 0)
      : 0;
  const level = Number(character.level ?? 0);

  const constitutionModifier = Math.floor((Number(character.constitution ?? 10) - 10) / 2);
  const dexterityModifier = Math.floor((Number(character.dexterity ?? 10) - 10) / 2);

  const hitDieBonus = Math.floor(((classHitDie / 2)+1) * (level - 1));
  const hitPoints = classHitDie + hitDieBonus + (constitutionModifier * level);
  const armorClass = 10 + dexterityModifier;
  const hitDieAmt = `${level}`;
  const hitDiceDisplay = classHitDie > 0 ? `${hitDieAmt}d${classHitDie}` : `${level}/-`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto">
        {/* Character Info Box */}
        <div className="bg-white border-2 border-gray-700 rounded-lg p-6 shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            {character.name}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <InfoBox title="Class" value={classDisplayName} />
            <InfoBox title="Level" value={character.level} />
            <InfoBox title="Race" value={character.race} />
            <InfoBox title="Background" value={character.background} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Ability Scores Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Ability Scores
            </h2>
            <div className="flex flex-row gap-4 flex-wrap">
              {abilityScores.map((ability) => (
                <AbilityScoreBox
                  key={ability.name}
                  abilityName={ability.name}
                  score={ability.score}
                  onScoreChange={handleScoreChange}
                />
              ))}
            </div>
          </div>

          {/* Vitals Section */}
          <div className="bg-gray-50 rounded-lg p-6 min-w-64 w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vitals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <VitalsBox name="Armor Class" value={armorClass} onValueChange={() => {}} />
              <VitalsBox name="Max Hit Points" value={hitPoints} readOnly />
              <VitalsBox name="Current Hit Points" value={hitPoints} onValueChange={() => {}} />
              <div className="sm:col-span-2 lg:col-span-3">
                <VitalsBox name="Hit Die" value={hitDiceDisplay} readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
