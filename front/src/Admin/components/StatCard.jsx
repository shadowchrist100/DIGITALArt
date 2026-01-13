import { TrendingUp } from 'lucide-react';

export default function StatCard({ 
  icon, 
  title, 
  value, 
  color = '#4a6fa5', 
  bgColor = 'rgba(74, 111, 165, 0.1)', 
  trend,
  trendValue 
}) {
  const Icon = icon;
  return (
    <div 
      className="p-6 transition-all shadow-md rounded-xl hover:shadow-lg"
      style={{ 
        backgroundColor: 'white',
        border: '1px solid #e9ecef'
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="mb-1 text-sm font-medium" style={{ color: '#6c757d' }}>
            {title}
          </p>
          <h3 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h3>
          {trend && trendValue && (
            <div className="flex items-center gap-1">
              <TrendingUp 
                className="w-4 h-4" 
                style={{ color: trend === 'up' ? '#22c55e' : '#ef4444' }} 
              />
              <span 
                className="text-xs font-medium"
                style={{ color: trend === 'up' ? '#22c55e' : '#ef4444' }}
              >
                {trend === 'up' ? '+' : '-'}{trendValue}%
              </span>
              <span className="text-xs" style={{ color: '#6c757d' }}>
                ce mois
              </span>
            </div>
          )}
        </div>
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </div>
  );
}