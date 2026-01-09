export default function Button({ children, variant = 'primary', onClick, className = '', type = 'button' }) {
  const variants = {
    primary: 'bg-primary hover:bg-orange-600 text-white',
    secondary: 'bg-secondary hover:bg-blue-800 text-white',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
