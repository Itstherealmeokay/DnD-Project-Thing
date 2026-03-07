import { useEffect, useState } from 'react';

const VitalsBox = ({ name, value, onValueChange, readOnly = false }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    if (readOnly) return;

    const newValue = parseInt(e.target.value, 10);
    if (Number.isNaN(newValue)) {
      setLocalValue('');
      return;
    }

    setLocalValue(newValue);
    onValueChange?.(newValue);
  };

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
