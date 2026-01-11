export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = 'px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2';
  
  const getVariantStyles = () => {
    switch(variant) {
      case 'primary':
        return {
          className: 'text-white shadow-md hover:shadow-lg',
          style: { background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }
        };
      case 'secondary':
        return {
          className: 'text-white shadow-md hover:shadow-lg',
          style: { background: 'linear-gradient(135deg, var(--accent), #ff6b4a)' }
        };
      case 'outline':
        return {
          className: 'bg-white border-2 hover:bg-gray-50',
          style: { color: 'var(--dark)', borderColor: 'var(--gray-dark)' }
        };
      default:
        return {
          className: 'text-white shadow-md hover:shadow-lg',
          style: { background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <button 
      className={`${baseStyles} ${variantStyles.className} ${className}`}
      style={variantStyles.style}
      {...props}
    >
      {children}
    </button>
  );
}