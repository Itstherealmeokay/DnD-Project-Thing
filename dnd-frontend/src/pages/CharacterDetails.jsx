import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoBox from '../components/InfoBox';
import AbilityScoreBox from '../components/AbilityScoreBox';
import VitalsBox from '../components/VitalsBox';
import SkillSection from '../components/SkillSection';
import SavingThrowSection from '../components/SavingThrowSection';

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skillProficiencies, setSkillProficiencies] = useState([]);
  const [skillExpertise, setSkillExpertise] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/characters/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch character');
        }
        const data = await response.json();
        setCharacter(data);
        // Load skill proficiencies and expertise from database
        setSkillProficiencies(data.skillProficiencies || []);
        setSkillExpertise(data.expertise || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  // Auto-calculate max HP when override is off and relevant stats change
  useEffect(() => {
    if (!character || character.overrideHitPoints) return;

    const classHitDie =
      typeof character.class === 'object' && character.class !== null
        ? Number(character.class.hitDie ?? character.class.hitdie ?? 8)
        : 8;
    const level = Number(character.level ?? 0);
    const constitutionModifier = Math.floor((Number(character.constitution ?? 10) - 10) / 2);
    const hitDieBonus = Math.floor(((classHitDie / 2) + 1) * (level - 1));
    const calculatedHP = classHitDie + hitDieBonus + (constitutionModifier * level);

    if (character.maxHitPoints !== calculatedHP) {
      handleVitalChange('maxHitPoints', calculatedHP);
    }
  }, [character?.class, character?.level, character?.constitution, character?.overrideHitPoints]);

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

  const handleVitalChange = async (fieldName, newValue) => {
    if (!Number.isFinite(newValue)) return;

    try {
      const response = await fetch(`http://localhost:5000/api/characters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [fieldName]: newValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update character');
      }

      const updatedCharacter = await response.json();
      setCharacter(updatedCharacter);
    } catch (err) {
      console.error('Error updating vitals:', err);
      alert('Failed to update vitals');
    }
  };

  const handleOverrideToggle = async () => {
    const newOverride = !character.overrideHitPoints;
    
    try {
      const response = await fetch(`http://localhost:5000/api/characters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          overrideHitPoints: newOverride,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update character');
      }

      const updatedCharacter = await response.json();
      setCharacter(updatedCharacter);
    } catch (err) {
      console.error('Error updating override:', err);
      alert('Failed to update override setting');
    }
  };

  const handleToggleProficiency = async (skillId) => {
    const newProficiencies = skillProficiencies.includes(skillId)
      ? skillProficiencies.filter(id => id !== skillId)
      : [...skillProficiencies, skillId];
    
    // If removing proficiency, also remove expertise
    const newExpertise = skillProficiencies.includes(skillId)
      ? skillExpertise.filter(id => id !== skillId)
      : skillExpertise;

    try {
      const response = await fetch(`http://localhost:5000/api/characters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skillProficiencies: newProficiencies,
          expertise: newExpertise,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update character');
      }

      const updatedCharacter = await response.json();
      setCharacter(updatedCharacter);
      setSkillProficiencies(newProficiencies);
      setSkillExpertise(newExpertise);
    } catch (err) {
      console.error('Error updating proficiency:', err);
      alert('Failed to update skill proficiency');
    }
  };

  const handleToggleExpertise = async (skillId) => {
    const newExpertise = skillExpertise.includes(skillId)
      ? skillExpertise.filter(id => id !== skillId)
      : [...skillExpertise, skillId];

    try {
      const response = await fetch(`http://localhost:5000/api/characters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expertise: newExpertise,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update character');
      }

      const updatedCharacter = await response.json();
      setCharacter(updatedCharacter);
      setSkillExpertise(newExpertise);
    } catch (err) {
      console.error('Error updating expertise:', err);
      alert('Failed to update skill expertise');
    }
  };

  const handleLevelChange = async (newLevel) => {
    const numLevel = Number(newLevel);
    if (!Number.isFinite(numLevel) || numLevel < 1) {
      alert('Level must be a positive number');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/characters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          level: numLevel,
          safeHitDieAmount: numLevel,
          hitDieAmount: numLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update character');
      }

      const updatedCharacter = await response.json();
      setCharacter(updatedCharacter);
    } catch (err) {
      console.error('Error updating level:', err);
      alert('Failed to update level');
    }
  };

  const handleToggleSavingThrow = async (abilityKey) => {
    const currentProficiencies = character.savingThrowProficiencies || [];
    const normalizedAbility = abilityKey.toLowerCase();
    const newProficiencies = currentProficiencies.includes(normalizedAbility)
      ? currentProficiencies.filter((name) => name !== normalizedAbility)
      : [...currentProficiencies, normalizedAbility];

    try {
      const response = await fetch(`http://localhost:5000/api/characters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          savingThrowProficiencies: newProficiencies,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update character');
      }

      const updatedCharacter = await response.json();
      setCharacter(updatedCharacter);
    } catch (err) {
      console.error('Error updating saving throw proficiency:', err);
      alert('Failed to update saving throw proficiency');
    }
  };

  const handleSavingThrowAdjustmentChange = async (abilityKey, adjustment) => {
    const normalizedAbility = abilityKey.toLowerCase();
    const currentAdjustments = character.savingThrowAdjustments || {};
    const nextAdjustments = {
      ...currentAdjustments,
      [normalizedAbility]: adjustment,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/characters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          savingThrowAdjustments: nextAdjustments,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update character');
      }

      const updatedCharacter = await response.json();
      setCharacter(updatedCharacter);
    } catch (err) {
      console.error('Error updating saving throw adjustment:', err);
      alert('Failed to update saving throw adjustment');
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

  const savingThrows = [
    { name: 'Strength', key: 'strength' },
    { name: 'Dexterity', key: 'dexterity' },
    { name: 'Constitution', key: 'constitution' },
    { name: 'Intelligence', key: 'intelligence' },
    { name: 'Wisdom', key: 'wisdom' },
    { name: 'Charisma', key: 'charisma' },
  ];

  const Skills = [
    { id: 'acrobatics', name: 'Acrobatics', ability: 'Dexterity' },
    { id: 'animalHandling', name: 'Animal Handling', ability: 'Wisdom' },
    { id: 'arcana', name: 'Arcana', ability: 'Intelligence' },
    { id: 'athletics', name: 'Athletics', ability: 'Strength' },
    { id: 'deception', name: 'Deception', ability: 'Charisma' },
    { id: 'history', name: 'History', ability: 'Intelligence' },
    { id: 'insight', name: 'Insight', ability: 'Wisdom' },
    { id: 'intimidation', name: 'Intimidation', ability: 'Charisma' },
    { id: 'investigation', name: 'Investigation', ability: 'Intelligence' },
    { id: 'medicine', name: 'Medicine', ability: 'Wisdom' },
    { id: 'nature', name: 'Nature', ability: 'Intelligence' },
    { id: 'perception', name: 'Perception', ability: 'Wisdom' },
    { id: 'performance', name: 'Performance', ability: 'Charisma' },
    { id: 'persuasion', name: 'Persuasion', ability: 'Charisma' },
    { id: 'religion', name: 'Religion', ability: 'Intelligence' },
    { id: 'sleightOfHand', name: 'Sleight of Hand', ability: 'Dexterity' },
    { id: 'stealth', name: 'Stealth', ability: 'Dexterity' },
    { id: 'survival', name: 'Survival', ability: 'Wisdom' },
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
  
  // Calculate proficiency bonus based on level
  const calculateProficiencyBonus = (lvl) => {
    if (lvl >= 17) return 6;
    if (lvl >= 13) return 5;
    if (lvl >= 9) return 4;
    if (lvl >= 5) return 3;
    return 2;
  };
  
  const proficiencyBonus = calculateProficiencyBonus(level);
  const expertiseBonus = proficiencyBonus * 2;  

  // Use class hit die for HP calculation
  const hitDieBonus = Math.floor(((classHitDie / 2) + 1) * (level - 1));
  const calculatedHitPoints = classHitDie + hitDieBonus + (constitutionModifier * level);
  
  const isOverride = character.overrideHitPoints ?? false;
  const maxHitPoints = Number(character.maxHitPoints ?? calculatedHitPoints);
  const currentHitPoints = Number(character.currentHitPoints ?? maxHitPoints);
  const armorClass = 10 + dexterityModifier;
  const hitDieAmt = Number(character.hitDieAmount ?? level);
  const safeHitDieAmt = Number(character.safeHitDieAmount ?? level);
  const hitDiceDisplay = classHitDie > 0 ? `${hitDieAmt}d${classHitDie}` : `${hitDieAmt}/-`;

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
            <div className="bg-white border-2 border-gray-600 rounded-lg p-4 text-center flex flex-col justify-center items-center">
              <label className="text-sm font-semibold text-gray-600 block mb-2">Level</label>
              <input
                type="number"
                min="1"
                max="20"
                value={character.level}
                onChange={(e) => handleLevelChange(e.target.value)}
                className="w-16 text-center text-2xl font-bold text-gray-900 border border-gray-400 rounded px-2 py-1"
              />
            </div>
            <InfoBox title="Race" value={character.race} />
            <InfoBox title="Background" value={character.background} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Column: Ability Scores and Skills */}
          <div className="bg-gray-200 rounded-lg p-6">
            {/* Ability Scores Section */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Ability Scores
            </h2>
            <div className="flex flex-row gap-4 flex-wrap mb-8">
              {abilityScores.map((ability) => (
                <AbilityScoreBox
                  key={ability.name}
                  abilityName={ability.name}
                  score={ability.score}
                  onScoreChange={handleScoreChange}
                />
              ))}
            </div>

            {/* Saving Throws Section */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Saving Throws</h2>
            <div className="space-y-2">
              {savingThrows.map((save) => (
                <SavingThrowSection
                  key={save.key}
                  ability={save.name}
                  abilityScore={character[save.key]}
                  proficiencyBonus={proficiencyBonus}
                  isProficient={character.savingThrowProficiencies?.includes(save.key)}
                  adjustment={character.savingThrowAdjustments?.[save.key] ?? 0}
                  onToggleProficiency={handleToggleSavingThrow}
                  onAdjustmentChange={handleSavingThrowAdjustmentChange}
                />
              ))}
            </div>


            {/* Skills Section */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
            <div className="space-y-2">
              {['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'].map((ability) => {
                const abilityKey = ability.toLowerCase();
                return (
                  <SkillSection
                    key={ability}
                    skills={Skills}
                    ability={ability}
                    proficiencyBonus={proficiencyBonus}
                    expertiseBonus={expertiseBonus}
                    skillProficiencies={skillProficiencies}
                    skillExpertise={skillExpertise}
                    onToggleProficiency={handleToggleProficiency}
                    onToggleExpertise={handleToggleExpertise}
                    abilityScore={character[abilityKey]}
                  />
                );
              })}
            </div>
          </div>

          {/* Vitals Section */}
          <div className="bg-gray-50 rounded-lg p-6 min-w-64 w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vitals</h2>
            
            {/* Override HP Calculation Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="overrideHP"
                checked={isOverride}
                onChange={handleOverrideToggle}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="overrideHP" className="ml-2 text-sm text-gray-700 font-medium">
                Override HP Calculation (Allow Manual Entry)
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <VitalsBox name="Armor Class" value={armorClass} readOnly />
              <VitalsBox
                name="Max Hit Points"
                value={isOverride ? maxHitPoints : calculatedHitPoints}
                readOnly={!isOverride}
                onValueChange={(newValue) => handleVitalChange('maxHitPoints', newValue)}
              />
              <VitalsBox
                name="Current Hit Points"
                value={currentHitPoints}
                color={
                  currentHitPoints < maxHitPoints ? 'red' : currentHitPoints === maxHitPoints ? 'default' : currentHitPoints > maxHitPoints ? 'green' : 'default' 
                }
                onValueChange={(newValue) => handleVitalChange('currentHitPoints', newValue)}
              />
              <VitalsBox
                name="Hit Die Amount"
                value={safeHitDieAmt}
                onValueChange={(newValue) => handleVitalChange('safeHitDieAmount', newValue)}
              />
              <div className="sm:col-span-2">
                <VitalsBox name="Hit Dice" value={hitDiceDisplay} readOnly />
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => {
                  handleVitalChange('safeHitDieAmount', level);
                  handleVitalChange('maxHitPoints', calculatedHitPoints);
                  handleVitalChange('currentHitPoints', calculatedHitPoints);
                  if (isOverride) {
                    handleOverrideToggle();
                  }
                }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Reset Vitals to Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
