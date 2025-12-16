import { useState } from 'react';
import { Clock, Wrench, FileText, AlertCircle, Plus, Trash2, XCircle, CheckCircle } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import {
  validateDailyLog,
  DAILY_LOG_RULES,
  type DailyLogData,
  type LabEntry,
  type ToolEntry
} from '../utils/dailyLogValidation';

export default function DailyLog() {
  const { currentUser } = useAuth();
  const [theoryHours, setTheoryHours] = useState(0);
  const [handsOnHours, setHandsOnHours] = useState(0);
  const [labs, setLabs] = useState<LabEntry[]>([]);
  const [tools, setTools] = useState<ToolEntry[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  const totalHours = theoryHours + handsOnHours;
  const theoryPercent = totalHours > 0 ? (theoryHours / totalHours) * 100 : 0;
  const handsOnPercent = totalHours > 0 ? (handsOnHours / totalHours) * 100 : 0;

  const addLab = () => {
    setLabs([...labs, {
      id: Date.now().toString(),
      name: '',
      platform: '',
      screenshotUrl: '',
      writeup: '',
      difficulty: 'medium'
    }]);
  };

  const updateLab = (id: string, field: keyof LabEntry, value: string) => {
    setLabs(labs.map(lab => lab.id === id ? { ...lab, [field]: value } : lab));
  };

  const removeLab = (id: string) => {
    setLabs(labs.filter(lab => lab.id !== id));
  };

  const addTool = () => {
    setTools([...tools, {
      id: Date.now().toString(),
      toolName: '',
      activity: '',
      duration: 0,
      evidence: '',
      description: ''
    }]);
  };

  const updateTool = (id: string, field: keyof ToolEntry, value: string | number) => {
    setTools(tools.map(tool => tool.id === id ? { ...tool, [field]: value } : tool));
  };

  const removeTool = (id: string) => {
    setTools(tools.filter(tool => tool.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);

    const logData: DailyLogData = {
      theoryHours,
      handsOnHours,
      labsCompleted: labs,
      toolsPracticed: tools,
      portfolioItems: []
    };

    const validation = validateDailyLog(logData);

    if (!validation.canSubmit) {
      return;
    }

    try {
      if (!currentUser) {
        alert('You must be logged in to submit a log');
        return;
      }

      // Save to Firestore
      await addDoc(collection(db, 'dailyLogs'), {
        userId: currentUser.uid,
        date: new Date().toISOString(),
        theoryHours,
        handsOnHours,
        labsCompleted: labs,
        toolsPracticed: tools,
        portfolioItems: [],
        createdAt: new Date()
      });

      alert('✅ Daily log submitted successfully!');

      // Reset form
      setTheoryHours(0);
      setHandsOnHours(0);
      setLabs([]);
      setTools([]);
      setShowValidation(false);
    } catch (error) {
      console.error('Error saving daily log:', error);
      alert('❌ Failed to save daily log. Please try again.');
    }
  };

  const logData: DailyLogData = {
    theoryHours,
    handsOnHours,
    labsCompleted: labs,
    toolsPracticed: tools,
    portfolioItems: []
  };

  const validation = validateDailyLog(logData);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Daily Progress Log</h1>
        <p className="text-text-secondary">Evidence-based tracking • Hands-on enforcement • Real skill development</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Theory vs Practice Balance */}
        <div className="glass rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-text-primary">Time Allocation</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Theory Hours (Videos, Reading)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={theoryHours}
                onChange={(e) => setTheoryHours(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Hands-On Hours (Labs, Tools, Projects)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={handsOnHours}
                onChange={(e) => setHandsOnHours(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {totalHours > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Theory: {theoryPercent.toFixed(0)}%</span>
                <span className="text-text-secondary">Hands-On: {handsOnPercent.toFixed(0)}%</span>
              </div>
              <div className="w-full h-4 bg-bg-secondary rounded-full overflow-hidden flex">
                <div
                  className={`h-full ${theoryPercent > 40 ? 'bg-danger' : 'bg-warning'}`}
                  style={{ width: `${theoryPercent}%` }}
                />
                <div
                  className="h-full bg-success"
                  style={{ width: `${handsOnPercent}%` }}
                />
              </div>
              {theoryPercent > DAILY_LOG_RULES.maxTheoryPercentage && (
                <div className="flex items-center gap-2 text-danger text-sm mt-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>⚠️ Tutorial Hell Alert! Theory is {theoryPercent.toFixed(0)}% (max {DAILY_LOG_RULES.maxTheoryPercentage}%). Do more labs!</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Labs Completed */}
        <div className="glass rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-text-primary">Labs Completed</h2>
            </div>
            <button
              type="button"
              onClick={addLab}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-bg-primary rounded-lg hover:bg-opacity-90 transition-smooth"
            >
              <Plus className="w-4 h-4" />
              Add Lab
            </button>
          </div>

          {labs.length === 0 ? (
            <p className="text-text-tertiary text-center py-8">No labs added yet. Click "Add Lab" to get started.</p>
          ) : (
            <div className="space-y-4">
              {labs.map((lab) => (
                <div key={lab.id} className="bg-bg-secondary rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-text-primary font-medium">Lab Entry</h3>
                    <button
                      type="button"
                      onClick={() => removeLab(lab.id)}
                      className="text-danger hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-text-secondary mb-1">Lab Name *</label>
                      <input
                        type="text"
                        value={lab.name}
                        onChange={(e) => updateLab(lab.id, 'name', e.target.value)}
                        placeholder="e.g., Wireshark Packet Analysis"
                        className="w-full px-3 py-2 bg-bg-tertiary border border-border-color rounded text-text-primary focus:outline-none focus:border-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-text-secondary mb-1">Platform *</label>
                      <select
                        value={lab.platform}
                        onChange={(e) => updateLab(lab.id, 'platform', e.target.value)}
                        className="w-full px-3 py-2 bg-bg-tertiary border border-border-color rounded text-text-primary focus:outline-none focus:border-primary"
                        required
                      >
                        <option value="">Select platform</option>
                        <option value="TryHackMe">TryHackMe</option>
                        <option value="HackTheBox">HackTheBox</option>
                        <option value="CyberDefenders">CyberDefenders</option>
                        <option value="LetsDefend">LetsDefend</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Screenshot URL * (Imgur, GitHub, etc.)</label>
                    <input
                      type="url"
                      value={lab.screenshotUrl}
                      onChange={(e) => updateLab(lab.id, 'screenshotUrl', e.target.value)}
                      placeholder="https://imgur.com/abc123.png"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-color rounded text-text-primary focus:outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-text-secondary mb-1">
                      Writeup * (min {DAILY_LOG_RULES.evidenceRequired.labs.minWriteupWords} words)
                    </label>
                    <textarea
                      value={lab.writeup}
                      onChange={(e) => updateLab(lab.id, 'writeup', e.target.value)}
                      placeholder="Describe what you learned, challenges faced, tools used..."
                      rows={4}
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-color rounded text-text-primary focus:outline-none focus:border-primary"
                      required
                    />
                    <p className="text-xs text-text-tertiary mt-1">
                      {lab.writeup?.split(' ').filter(Boolean).length || 0} / {DAILY_LOG_RULES.evidenceRequired.labs.minWriteupWords} words
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


        {/* Tool Practice */}
        <div className="glass rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-text-primary">Tool Practice</h2>
            </div>
            <button
              type="button"
              onClick={addTool}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-bg-primary rounded-lg hover:bg-opacity-90 transition-smooth"
            >
              <Plus className="w-4 h-4" />
              Add Tool
            </button>
          </div>

          {tools.length === 0 ? (
            <p className="text-text-tertiary text-center py-8">No tools added yet. Click "Add Tool" to get started.</p>
          ) : (
            <div className="space-y-4">
              {tools.map((tool) => (
                <div key={tool.id} className="bg-bg-secondary rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-text-primary font-medium">Tool Practice Entry</h3>
                    <button
                      type="button"
                      onClick={() => removeTool(tool.id)}
                      className="text-danger hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-text-secondary mb-1">Tool Name *</label>
                      <select
                        value={tool.toolName}
                        onChange={(e) => updateTool(tool.id, 'toolName', e.target.value)}
                        className="w-full px-3 py-2 bg-bg-tertiary border border-border-color rounded text-text-primary focus:outline-none focus:border-primary"
                        required
                      >
                        <option value="">Select tool</option>
                        <option value="Wireshark">Wireshark</option>
                        <option value="Splunk">Splunk</option>
                        <option value="Nmap">Nmap</option>
                        <option value="Metasploit">Metasploit</option>
                        <option value="Burp Suite">Burp Suite</option>
                        <option value="Python">Python</option>
                        <option value="PowerShell">PowerShell</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-text-secondary mb-1">Duration (hours) *</label>
                      <input
                        type="number"
                        step="0.5"
                        min="0.5"
                        value={tool.duration}
                        onChange={(e) => updateTool(tool.id, 'duration', parseFloat(e.target.value) || 0)}
                        placeholder="1.5"
                        className="w-full px-3 py-2 bg-bg-tertiary border border-border-color rounded text-text-primary focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Activity *</label>
                    <input
                      type="text"
                      value={tool.activity}
                      onChange={(e) => updateTool(tool.id, 'activity', e.target.value)}
                      placeholder="e.g., Analyzed network traffic, Created SIEM queries"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-color rounded text-text-primary focus:outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Evidence URL * (Screenshot/File)</label>
                    <input
                      type="url"
                      value={tool.evidence as string}
                      onChange={(e) => updateTool(tool.id, 'evidence', e.target.value)}
                      placeholder="https://imgur.com/evidence.png"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-color rounded text-text-primary focus:outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-text-secondary mb-1">
                      Description * (min {DAILY_LOG_RULES.evidenceRequired.tools.minDescriptionWords} words)
                    </label>
                    <textarea
                      value={tool.description}
                      onChange={(e) => updateTool(tool.id, 'description', e.target.value)}
                      placeholder="What did you do? What did you learn? What challenges did you face?"
                      rows={3}
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-color rounded text-text-primary focus:outline-none focus:border-primary"
                      required
                    />
                    <p className="text-xs text-text-tertiary mt-1">
                      {tool.description?.split(' ').filter(Boolean).length || 0} / {DAILY_LOG_RULES.evidenceRequired.tools.minDescriptionWords} words
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Validation Summary - Always Visible */}
        <div className="glass rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Validation Status</h2>

          {validation.errors.length > 0 && (
            <div className="space-y-2 mb-4">
              <h3 className="text-danger font-medium flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Issues to Fix ({validation.errors.length})
              </h3>
              {validation.errors.map((error, idx) => (
                <div key={idx} className="bg-danger bg-opacity-10 border border-danger rounded p-3 text-sm text-danger">
                  {error.message}
                  {error.field === 'theoryRatio' && (
                    <div className="mt-2 text-xs">
                      <strong>Why this matters:</strong> Spending too much time on theory without hands-on practice leads to "tutorial hell" -
                      you'll watch videos and read articles but won't build real skills. Aim for 60% hands-on labs and 40% theory maximum.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {validation.warnings.length > 0 && (
            <div className="space-y-2 mb-4">
              <h3 className="text-warning font-medium flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Recommendations ({validation.warnings.length})
              </h3>
              {validation.warnings.map((warning, idx) => (
                <div key={idx} className="bg-warning bg-opacity-10 border border-warning rounded p-3 text-sm text-warning">
                  {warning.message}
                </div>
              ))}
            </div>
          )}

          {validation.valid && validation.errors.length === 0 && (
            <div className="bg-success bg-opacity-10 border border-success rounded p-3 text-success flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Perfect! All validation checks passed. Ready to submit your daily log.</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            disabled={!validation.canSubmit}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Submit Daily Log
          </button>
        </div>
      </form>
    </div>
  );
}

