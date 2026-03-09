import { useMemo, useState } from 'react';

const MultiSelectDropdown = ({
  options = [],
  selectedValues = [],
  onChange,
  placeholder = 'Select entries',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const normalizedOptions = useMemo(() => options.map((item) => item.trim()).filter(Boolean), [options]);

  const availableOptions = useMemo(
    () => normalizedOptions.filter((option) => !selectedValues.includes(option)),
    [normalizedOptions, selectedValues]
  );

  const addValue = (value) => {
    if (!selectedValues.includes(value)) {
      onChange([...selectedValues, value]);
    }
    setIsOpen(false);
  };

  const removeValue = (value) => {
    onChange(selectedValues.filter((item) => item !== value));
  };

  return (
    <div className={`relative ${className}`.trim()}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        {availableOptions.length > 0 ? placeholder : 'All entries selected'}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full max-h-52 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {availableOptions.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">No more entries available</p>
          ) : (
            availableOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => addValue(option)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                {option}
              </button>
            ))
          )}
        </div>
      )}

      {selectedValues.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedValues.map((value) => (
            <span
              key={value}
              className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800"
            >
              {value}
              <button
                type="button"
                onClick={() => removeValue(value)}
                className="text-purple-700 hover:text-purple-900"
                aria-label={`Remove ${value}`}
              >
                x
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
