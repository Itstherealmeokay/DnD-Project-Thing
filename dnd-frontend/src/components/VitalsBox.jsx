import { useState } from 'react';

const VitalsBox = ({ name, value, onValueChange, readOnly = false }) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e) => {
    if (readOnly) return;

    const newValue = parseInt(e.target.value);
    setLocalValue(newValue);
    onValueChange?.(name, newValue);
  };

  const calculateHitDiebonus = ({ hitDie, level }) => {
    if (!hitDie || !level) return 0;
    return Math.floor((hitDie / 2) * level);
  }

  const calculateHitPoints = ({ hitDie, level, constitutionModifier }) => {
    if (!hitDie || !level || !constitutionModifier) return 0;
    const hitDieBonus = calculateHitDiebonus({ hitDie, level });
    return hitDieBonus + (constitutionModifier * level);
  }

  const calulateBaseArmorClass = (dexterityModifier) => {
    return 10 + dexterityModifier;
  }

  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500 font-semibold uppercase tracking-wide">
        {name}
      </span>
      <input
        type={readOnly ? 'text' : 'number'}
        value={localValue}
        onChange={handleChange}
        readOnly={readOnly}
        className="text-lg font-bold text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default VitalsBox;
