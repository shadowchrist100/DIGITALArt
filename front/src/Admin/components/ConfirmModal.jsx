import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirmer', 
  cancelText = 'Annuler',
  type = 'warning', // 'warning', 'danger', 'info'
  loading = false
}) {
  if (!isOpen) return null;

  const getTypeStyle = () => {
    switch (type) {
      case 'danger':
        return {
          iconColor: '#ef4444',
          iconBg: 'rgba(239, 68, 68, 0.1)',
          confirmBg: 'linear-gradient(135deg, #ef4444, #dc2626)',
        };
      case 'warning':
        return {
          iconColor: '#f59e0b',
          iconBg: 'rgba(245, 158, 11, 0.1)',
          confirmBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
        };
      case 'info':
        return {
          iconColor: '#3b82f6',
          iconBg: 'rgba(59, 130, 246, 0.1)',
          confirmBg: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        };
      default:
        return {
          iconColor: '#f59e0b',
          iconBg: 'rgba(245, 158, 11, 0.1)',
          confirmBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
        };
    }
  };

  const typeStyle = getTypeStyle();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md overflow-hidden shadow-xl rounded-xl"
        style={{ backgroundColor: 'white' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute p-1 transition-colors rounded-lg top-4 right-4 hover:bg-gray-100"
            disabled={loading}
          >
            <X className="w-5 h-5" style={{ color: '#6c757d' }} />
          </button>

          <div className="flex items-start gap-4">
            <div 
              className="flex-shrink-0 p-3 rounded-lg"
              style={{ backgroundColor: typeStyle.iconBg }}
            >
              <AlertTriangle className="w-6 h-6" style={{ color: typeStyle.iconColor }} />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-bold" style={{ color: '#2b2d42' }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6c757d' }}>
                {message}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div 
          className="flex gap-3 px-6 py-4"
          style={{ backgroundColor: '#f8f9fa' }}
        >
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
            style={{ 
              backgroundColor: 'white',
              color: '#6c757d',
              border: '1px solid #e9ecef'
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm text-white transition-all hover:shadow-md disabled:opacity-50"
            style={{ 
              background: typeStyle.confirmBg
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                Chargement...
              </div>
            ) : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}