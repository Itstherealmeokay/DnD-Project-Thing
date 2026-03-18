import { useEffect, useState } from 'react';

const SavingThrowSection = ({
  ability,
  abilityScore,
  proficiencyBonus,
  isProficient,
  adjustment,
  onToggleProficiency,
  onAdjustmentChange,
}) => {
  const [editAdjustment, setEditAdjustment] = useState(Number(adjustment ?? 0));

  useEffect(() => {
    setEditAdjustment(Number(adjustment ?? 0));
  }, [adjustment]);

  const abilityModifier = Math.floor((Number(abilityScore ?? 10) - 10) / 2);
  const safeAdjustment = Number(adjustment ?? 0);
  const totalBonus = abilityModifier + (isProficient ? Number(proficiencyBonus ?? 0) : 0) + safeAdjustment;
  const totalDisplay = totalBonus >= 0 ? `+${totalBonus}` : `${totalBonus}`;

  const handleAdjustmentCommit = () => {
    const parsed = Number.parseInt(editAdjustment, 10);
    const safeValue = Number.isNaN(parsed) ? 0 : parsed;
    setEditAdjustment(safeValue);
    onAdjustmentChange(ability.toLowerCase(), safeValue);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 border border-gray-300 rounded p-3 bg-white">
      <div className="flex items-center gap-2 min-w-40">
        <span className="font-semibold text-gray-700">{ability}</span>
        <span className="font-bold text-gray-900">{totalDisplay}</span>
      </div>

      <div className="text-xs text-gray-500 flex-1">
        Base {abilityModifier >= 0 ? '+' : ''}{abilityModifier}
        {' + Prof '}
        {isProficient ? Number(proficiencyBonus ?? 0) : 0}
        {' + Adj '}
        {safeAdjustment >= 0 ? '+' : ''}{safeAdjustment}
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={isProficient}
          onChange={() => onToggleProficiency(ability.toLowerCase())}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        Proficient
      </label>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        Adjustment
        <input
          type="number"
          value={editAdjustment}
          onChange={(e) => setEditAdjustment(e.target.value)}
          onBlur={handleAdjustmentCommit}
          onKeyDown={(e) => e.key === 'Enter' && handleAdjustmentCommit()}
          step="1"
          className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
      </label>
    </div>
  );
};

export default SavingThrowSection;
