export default function Card({ children, className = '', hover = true, ...props }) {
  const baseStyles = 'bg-white rounded-2xl p-6 transition-all duration-300';
  const hoverStyles = hover ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer' : '';

  return (
    <div 
      className={`${baseStyles} ${hoverStyles} ${className}`}
      style={{ 
        border: '1px solid var(--gray-dark)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
      }}
      {...props}
    >
      {children}
    </div>
  );
}