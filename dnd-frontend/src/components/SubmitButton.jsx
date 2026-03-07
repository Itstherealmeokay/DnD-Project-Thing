const SubmitButton = ({
  children,
  type = 'submit',
  onClick,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${className}`.trim()}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
