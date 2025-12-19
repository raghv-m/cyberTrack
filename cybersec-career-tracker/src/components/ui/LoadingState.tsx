import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function LoadingState({
  message = 'Loading...',
  fullScreen = false,
  className = ''
}: LoadingStateProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-cyber-blue/20 border-t-cyber-blue animate-spin" />
        <Loader2 className="w-8 h-8 text-cyber-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <p className="text-text-tertiary font-mono text-sm animate-pulse">
        {message}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-cyber-bg-deep flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className={`py-16 ${className}`}>
      {content}
    </div>
  );
}

