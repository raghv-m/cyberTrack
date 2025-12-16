import { Lock, Unlock, CheckCircle, AlertCircle } from 'lucide-react';

interface GateRequirement {
  name: string;
  current: number;
  target: number;
  met: boolean;
}

interface Gate {
  name: string;
  description: string;
  unlocked: boolean;
  requirements: GateRequirement[];
}

interface ProgressGatesProps {
  gates: Gate[];
}

export default function ProgressGates({ gates }: ProgressGatesProps) {
  return (
    <div className="space-y-6">
      {gates.map((gate, idx) => (
        <div key={idx} className="glass rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {gate.unlocked ? (
                <Unlock className="w-6 h-6 text-success" />
              ) : (
                <Lock className="w-6 h-6 text-text-tertiary" />
              )}
              <div>
                <h3 className="text-xl font-bold text-text-primary">{gate.name}</h3>
                <p className="text-sm text-text-secondary">{gate.description}</p>
              </div>
            </div>
            {gate.unlocked && (
              <div className="px-4 py-2 bg-success bg-opacity-20 text-success rounded-lg font-semibold">
                UNLOCKED
              </div>
            )}
          </div>

          <div className="space-y-3">
            {gate.requirements.map((req, reqIdx) => {
              const progress = (req.current / req.target) * 100;
              return (
                <div key={reqIdx} className="bg-bg-secondary rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {req.met ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-warning" />
                      )}
                      <span className="text-text-primary font-medium">{req.name}</span>
                    </div>
                    <span className="text-sm text-text-secondary">
                      {req.current} / {req.target}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        req.met ? 'bg-success' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
