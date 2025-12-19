import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CyberCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeColor?: 'blue' | 'gold' | 'green' | 'red' | 'purple';
  variant?: 'default' | 'blue' | 'gold' | 'purple';
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function CyberCard({
  children,
  title,
  subtitle,
  icon: Icon,
  badge,
  badgeColor = 'blue',
  variant = 'default',
  className = '',
  onClick,
  hoverable = false
}: CyberCardProps) {
  const variants = {
    default: 'glass',
    blue: 'card-neon-blue',
    gold: 'card-gold',
    purple: 'bg-cyber-bg-surface/70 backdrop-blur-xl border border-cyber-purple/30 hover:border-cyber-purple/60 hover:shadow-purple-glow'
  };

  const badgeColors = {
    blue: 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30',
    gold: 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold/30',
    green: 'bg-cyber-green/20 text-cyber-green border-cyber-green/30',
    red: 'bg-cyber-red/20 text-cyber-red border-cyber-red/30',
    purple: 'bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30'
  };

  return (
    <div
      onClick={onClick}
      className={`
        ${variants[variant]}
        ${hoverable || onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {(title || Icon || badge) && (
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30">
                <Icon className="w-5 h-5 text-cyber-blue" />
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-mono font-bold text-text-primary">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm font-mono text-text-tertiary mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          {badge && (
            <span className={`
              px-2.5 py-1 rounded-md text-xs font-mono font-medium
              border ${badgeColors[badgeColor]}
            `}>
              {badge}
            </span>
          )}
        </div>
      )}
      
      {children}
    </div>
  );
}

