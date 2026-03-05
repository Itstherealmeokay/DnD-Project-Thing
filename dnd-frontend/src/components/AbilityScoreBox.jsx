import { useState } from 'react';

const AbilityScoreBox = ({ abilityName, score, onScoreChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(score);

  const calculateModifier = (score) => {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };

  const modifier = calculateModifier(score);

  const handleEditSubmit = () => {
    let newScore = parseInt(editValue);
    if (isNaN(newScore)) {
      newScore = score;
    } else {
      newScore = Math.min(Math.max(newScore, 1), 30);
    }
    onScoreChange(abilityName.toLowerCase(), newScore);
    setIsEditing(false);
  };

  return (
    <div className="border-2 border-gray-700 rounded-lg p-4 bg-white shadow-md flex flex-col items-center hover:shadow-lg transition-shadow min-w-32">
      <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
        {abilityName}
      </h3>
      
      <div className="text-4xl font-bold text-gray-900 mb-1">
        {modifier}
      </div>
      
      {/* Score with click-to-edit */}
      <div className="flex items-center justify-center mb-2">
        {isEditing ? (
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
            min="1"
            max="30"
            className="w-16 text-center px-1 py-1 border-2 border-purple-500 rounded-lg text-sm"
            autoFocus
          />
        ) : (
          <div 
            onClick={() => {
              setEditValue(score);
              setIsEditing(true);
            }}
            className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors"
          >
            {score}
          </div>
        )}
      </div>

      {/* Helper text */}
      <div className="text-xs text-gray-400">
        Click score to edit
      </div>
    </div>
  );
};

export default AbilityScoreBox;