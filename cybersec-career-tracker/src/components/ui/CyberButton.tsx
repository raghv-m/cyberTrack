import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function CyberButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  className = '',
  type = 'button'
}: CyberButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-mono font-medium transition-all duration-200 ease-out rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyber-bg-deep disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-cyber-blue text-white hover:bg-cyber-blue-light hover:shadow-neon-blue active:scale-95 focus:ring-cyber-blue',
    secondary: 'bg-cyber-gold text-cyber-bg-deep hover:bg-cyber-gold-light hover:shadow-neon-gold active:scale-95 focus:ring-cyber-gold',
    ghost: 'bg-transparent border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue hover:shadow-neon-blue-sm active:scale-95 focus:ring-cyber-blue',
    danger: 'bg-cyber-red text-white hover:bg-cyber-red/80 hover:shadow-[0_0_20px_rgba(255,51,102,0.5)] active:scale-95 focus:ring-cyber-red'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

