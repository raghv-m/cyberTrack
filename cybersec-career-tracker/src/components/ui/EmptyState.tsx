
import { LucideIcon } from 'lucide-react';
import CyberButton from './CyberButton';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="p-6 rounded-2xl bg-cyber-bg-surface/50 border border-cyber-blue/20 mb-6">
        <Icon className="w-16 h-16 text-cyber-blue/50" />
      </div>
      
      <h3 className="text-xl font-mono font-bold text-text-primary mb-2">
        {title}
      </h3>
      
      <p className="text-text-tertiary font-mono text-sm text-center max-w-md mb-6">
        {description}
      </p>
      
      {action && (
        <CyberButton
          variant="primary"
          onClick={action.onClick}
          icon={action.icon}
        >
          {action.label}
        </CyberButton>
      )}
    </div>
  );
}

