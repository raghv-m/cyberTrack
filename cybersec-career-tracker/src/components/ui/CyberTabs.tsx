import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon?: LucideIcon;
  count?: number;
}

interface CyberTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'pill' | 'underline';
  className?: string;
}

export default function CyberTabs({
  tabs,
  activeTab,
  onChange,
  variant = 'pill',
  className = ''
}: CyberTabsProps) {
  if (variant === 'underline') {
    return (
      <div className={`border-b border-cyber-blue/20 ${className}`}>
        <div className="flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`
                  relative pb-3 px-1 font-mono text-sm font-medium
                  transition-all duration-200 ease-out
                  ${isActive 
                    ? 'text-cyber-blue' 
                    : 'text-text-tertiary hover:text-text-secondary'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="w-4 h-4" />}
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`
                      px-1.5 py-0.5 rounded text-xs
                      ${isActive 
                        ? 'bg-cyber-blue/20 text-cyber-blue' 
                        : 'bg-cyber-bg-elevated text-text-muted'
                      }
                    `}>
                      {tab.count}
                    </span>
                  )}
                </div>
                
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-blue shadow-neon-blue-sm animate-fade-in" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Pill variant
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              px-4 py-2 rounded-lg font-mono text-sm font-medium
              transition-all duration-200 ease-out
              ${isActive 
                ? 'bg-cyber-blue text-white shadow-neon-blue-sm' 
                : 'bg-cyber-bg-surface/50 text-text-tertiary border border-cyber-blue/20 hover:bg-cyber-blue/10 hover:text-cyber-blue hover:border-cyber-blue/40'
              }
            `}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4" />}
              {tab.label}
              {tab.count !== undefined && (
                <span className={`
                  px-1.5 py-0.5 rounded text-xs
                  ${isActive 
                    ? 'bg-white/20' 
                    : 'bg-cyber-bg-elevated'
                  }
                `}>
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

