import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FlowNodeProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  status?: 'active' | 'completed' | 'pending' | 'decision';
  badge?: string;
  badgeColor?: 'blue' | 'gold' | 'green' | 'red' | 'purple' | 'orange';
  onClick?: () => void;
  className?: string;
}

export default function FlowNode({
  title,
  description,
  icon: Icon,
  status = 'pending',
  badge,
  badgeColor = 'blue',
  onClick,
  className = ''
}: FlowNodeProps) {
  const statusStyles = {
    active: 'border-cyber-blue bg-cyber-blue/10 shadow-neon-blue-sm',
    completed: 'border-cyber-green bg-cyber-green/10',
    pending: 'border-cyber-blue/30 bg-cyber-bg-surface/50',
    decision: 'border-cyber-gold bg-cyber-gold/10 shadow-neon-gold-sm'
  };

  const badgeColors = {
    blue: 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30',
    gold: 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold/30',
    green: 'bg-cyber-green/20 text-cyber-green border-cyber-green/30',
    red: 'bg-cyber-red/20 text-cyber-red border-cyber-red/30',
    purple: 'bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30',
    orange: 'bg-cyber-orange/20 text-cyber-orange border-cyber-orange/30'
  };

  const isDecision = status === 'decision';

  return (
    <div
      onClick={onClick}
      className={`
        relative p-4 backdrop-blur-sm border-2 transition-all duration-200 ease-out
        ${isDecision ? 'clip-diamond' : 'rounded-lg'}
        ${statusStyles[status]}
        ${onClick ? 'cursor-pointer hover:scale-105 hover:shadow-neon-blue' : ''}
        ${className}
      `}
      style={isDecision ? {
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        minWidth: '140px',
        minHeight: '140px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      } : {}}
    >
      <div className={isDecision ? 'text-center' : ''}>
        {Icon && (
          <div className={`${isDecision ? 'mx-auto' : ''} mb-2 inline-flex p-2 rounded-lg bg-cyber-blue/20`}>
            <Icon className="w-5 h-5 text-cyber-blue" />
          </div>
        )}
        
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-mono font-bold text-text-primary">
            {title}
          </h4>
          {badge && (
            <span className={`
              px-2 py-0.5 rounded text-xs font-mono font-medium border
              ${badgeColors[badgeColor]}
            `}>
              {badge}
            </span>
          )}
        </div>
        
        {description && (
          <p className="text-xs font-mono text-text-tertiary">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

