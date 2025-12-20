import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';
import CyberButton from './CyberButton';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  icon?: LucideIcon;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  badge?: string;
  badgeColor?: 'blue' | 'gold' | 'green' | 'red' | 'purple';
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  icon: Icon,
  primaryAction,
  secondaryAction,
  badge,
  badgeColor = 'blue'
}: PageHeaderProps) {
  const badgeColors = {
    blue: 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30',
    gold: 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold/30',
    green: 'bg-cyber-green/20 text-cyber-green border-cyber-green/30',
    red: 'bg-cyber-red/20 text-cyber-red border-cyber-red/30',
    purple: 'bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30'
  };

  return (
    <div className="mb-8 responsive-padding">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 mb-4 text-sm font-mono flex-wrap">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="w-4 h-4 text-text-muted" />}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="text-text-tertiary hover:text-cyber-blue transition-colors duration-200"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-text-secondary">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Header Content */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {Icon && (
            <div className="p-3 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 shadow-neon-blue-sm self-start">
              <Icon className="w-8 h-8 text-cyber-blue" />
            </div>
          )}
          
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
                {title}
              </h1>
              {badge && (
                <span className={`
                  px-3 py-1 rounded-md text-sm font-mono font-medium border self-start sm:self-center
                  ${badgeColors[badgeColor]}
                `}>
                  {badge}
                </span>
              )}
            </div>
            
            {subtitle && (
              <p className="text-text-tertiary text-sm font-mono max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            {secondaryAction && (
              <CyberButton
                variant="ghost"
                onClick={secondaryAction.onClick}
                icon={secondaryAction.icon}
                className="action-btn-responsive"
              >
                {secondaryAction.label}
              </CyberButton>
            )}
            {primaryAction && (
              <CyberButton
                variant="primary"
                onClick={primaryAction.onClick}
                icon={primaryAction.icon}
                className="action-btn-responsive"
              >
                {primaryAction.label}
              </CyberButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

