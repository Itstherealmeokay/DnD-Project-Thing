import { useEffect, useState } from 'react';

const VitalsBox = ({ name, value, onValueChange, readOnly = false, color = 'default' }) => {
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

  const getColorClasses = () => {
    switch (color) {
      case 'red':
        return 'text-red-600 border-red-400 focus:ring-red-500';
      case 'green':
        return 'text-green-600 border-green-400 focus:ring-green-500';
      default:
        return 'text-gray-800 border-gray-300 focus:ring-gray-500';
    }
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
        className={`text-lg font-bold border rounded-md focus:outline-none focus:ring-2 ${getColorClasses()}`}
      />
    </div>
  );
};

export default VitalsBox;
