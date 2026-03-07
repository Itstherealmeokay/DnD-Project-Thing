const InfoBox = ({ title, value }) => {
  const displayValue =
    value && typeof value === 'object'
      ? value.name || value.title || value.label || 'N/A'
      : value;

  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500 font-semibold uppercase tracking-wide">
        {title}
      </span>
      <span className="text-lg font-bold text-gray-800">
        {displayValue || 'N/A'}
      </span>
    </div>
  );
};

export default InfoBox;
