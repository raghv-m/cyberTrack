import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import FlowNode from './FlowNode';

interface FlowStep {
  id: string;
  title: string;
  description?: string;
  icon?: any;
  status?: 'active' | 'completed' | 'pending' | 'decision';
  badge?: string;
  badgeColor?: 'blue' | 'gold' | 'green' | 'red' | 'purple' | 'orange';
}

interface FlowDiagramProps {
  steps: FlowStep[];
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export default function FlowDiagram({
  steps,
  direction = 'horizontal',
  className = ''
}: FlowDiagramProps) {
  const Arrow = direction === 'horizontal' ? ArrowRight : ArrowDown;

  return (
    <div className={`
      flex ${direction === 'horizontal' ? 'flex-row items-center' : 'flex-col items-start'}
      gap-4 ${className}
    `}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <FlowNode
            title={step.title}
            description={step.description}
            icon={step.icon}
            status={step.status}
            badge={step.badge}
            badgeColor={step.badgeColor}
          />
          
          {index < steps.length - 1 && (
            <div className="flex-shrink-0">
              <Arrow className="w-6 h-6 text-cyber-blue/50" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

