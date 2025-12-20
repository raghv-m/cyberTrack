
import { LucideIcon } from 'lucide-react';

interface CyberInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel';
  icon?: LucideIcon;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function CyberInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  icon: Icon,
  error,
  helperText,
  required = false,
  disabled = false,
  className = ''
}: CyberInputProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-mono font-medium text-text-secondary mb-2">
          {label}
          {required && <span className="text-cyber-red ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            <Icon className="w-4 h-4" />
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5 ${Icon ? 'pl-10' : ''}
            bg-cyber-bg-surface/50 backdrop-blur-sm
            border ${error ? 'border-cyber-red' : 'border-cyber-blue/20'}
            rounded-lg
            text-text-primary font-mono text-sm
            placeholder:text-text-muted
            focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/30
            hover:border-cyber-blue/40
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 ease-out
          `}
        />
      </div>
      
      {error && (
        <p className="mt-1.5 text-xs font-mono text-cyber-red">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1.5 text-xs font-mono text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
}

