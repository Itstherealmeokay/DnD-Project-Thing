const AbilityScoreBox = ({ abilityName, score }) => {
  // Calculate modifier from score
  const calculateModifier = (score) => {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };

  const modifier = calculateModifier(score);

  return (
    <div className="border-2 border-gray-700 rounded-lg p-4 bg-white shadow-md flex flex-col items-center w-full">
      <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
        {abilityName}
      </h3>
      <div className="text-4xl font-bold text-gray-900 mb-1">
        {modifier}
      </div>
      <div className="text-sm text-gray-500">
        Score: {score}
      </div>
    </div>
  );
};

export default AbilityScoreBox;
