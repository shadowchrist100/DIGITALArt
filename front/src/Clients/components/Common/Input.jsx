export default function Input({ 
  label, 
  error, 
  icon: Icon, 
  type = 'text',
  className = '', 
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label 
          className="block mb-2 text-sm font-bold" 
          style={{ color: 'var(--dark)' }}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div 
            className="absolute -translate-y-1/2 left-4 top-1/2"
            style={{ color: 'var(--primary-light)' }}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          type={type}
          className={`w-full h-12 px-4 ${Icon ? 'pl-12' : ''} rounded-xl border-2 transition-all focus:outline-none focus:ring-2 ${className}`}
          style={{
            backgroundColor: error ? 'rgba(255, 126, 95, 0.05)' : 'var(--gray)',
            borderColor: error ? 'var(--accent)' : 'var(--gray-dark)',
            color: 'var(--dark)',
          }}
          {...props}
        />
      </div>
      
      {error && (
        <p 
          className="mt-2 text-sm font-semibold" 
          style={{ color: 'var(--accent)' }}
        >
          {error}
        </p>
      )}
    </div>
  );
}