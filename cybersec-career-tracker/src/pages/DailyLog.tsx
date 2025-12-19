import { useState } from 'react';
import { Clock, Wrench, FileText, AlertCircle, Plus, Trash2, XCircle, CheckCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
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
  const [, setShowValidation] = useState(false);

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
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of day for consistency

      await addDoc(collection(db, 'dailyLogs'), {
        userId: currentUser.uid,
        date: serverTimestamp(), // Use Firestore Timestamp for proper querying
        dateString: today.toISOString().split('T')[0], // Store YYYY-MM-DD for easy filtering
        theoryHours,
        handsOnHours,
        labsCompleted: labs,
        toolsPracticed: tools,
        portfolioItems: [],
        createdAt: serverTimestamp()
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
    <div className="min-h-screen bg-[#0B0E11] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Daily Progress Log
          </h1>
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Evidence-based tracking • Hands-on enforcement • Real skill development
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Time Allocation - Glassmorphic Card */}
          <div className="relative group">
            {/* Neon border glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>

            <div className="relative bg-[#161B22]/60 backdrop-blur-xl border border-cyber-blue/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,163,255,0.1)]">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-cyber-blue" />
                </div>
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Time Allocation
                </h2>
              </div>

              {/* Input Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Theory Hours (Videos, Reading)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={theoryHours}
                    onChange={(e) => setTheoryHours(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-[#0D0D12] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-all"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Hands-On Hours (Labs, Tools, Projects)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={handsOnHours}
                    onChange={(e) => setHandsOnHours(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-[#0D0D12] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-all"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  />
                </div>
              </div>

              {/* Progress Bar */}
              {totalHours > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <span className="text-gray-400">Theory: {theoryPercent.toFixed(0)}%</span>
                    <span className="text-gray-400">Hands-On: {handsOnPercent.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#0D0D12] rounded-full overflow-hidden flex border border-gray-700">
                    <div
                      className={`h-full transition-all duration-500 ${theoryPercent > 40 ? 'bg-red-500' : 'bg-cyber-gold'}`}
                      style={{ width: `${theoryPercent}%` }}
                    />
                    <div
                      className="h-full bg-cyber-green transition-all duration-500"
                      style={{ width: `${handsOnPercent}%` }}
                    />
                  </div>
                  {theoryPercent > DAILY_LOG_RULES.maxTheoryPercentage && (
                    <div className="flex items-center gap-2 text-red-400 text-sm mt-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        ⚠️ Tutorial Hell Alert! Theory is {theoryPercent.toFixed(0)}% (max {DAILY_LOG_RULES.maxTheoryPercentage}%). Do more labs!
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Labs Completed - Glassmorphic Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>

            <div className="relative bg-[#161B22]/60 backdrop-blur-xl border border-cyber-blue/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,163,255,0.1)]">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Labs Completed
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={addLab}
                  className="flex items-center gap-2 px-4 py-2.5 bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue rounded-lg hover:bg-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300 font-medium shadow-[0_0_15px_rgba(0,163,255,0.2)] hover:shadow-[0_0_25px_rgba(0,163,255,0.4)]"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  <Plus className="w-4 h-4" />
                  Add Lab
                </button>
              </div>

              {labs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    No labs added yet. Click "Add Lab" to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {labs.map((lab) => (
                    <div key={lab.id} className="bg-[#0D0D12] border border-gray-700 rounded-lg p-4 space-y-3 hover:border-cyber-blue/50 transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <h3 className="text-white font-medium" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Lab Entry</h3>
                        <button
                          type="button"
                          onClick={() => removeLab(lab.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Lab Name *</label>
                          <input
                            type="text"
                            value={lab.name}
                            onChange={(e) => updateLab(lab.id, 'name', e.target.value)}
                            placeholder="e.g., Wireshark Packet Analysis"
                            className="w-full px-3 py-2 bg-[#161B22] border border-gray-700 rounded text-white focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-all"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Platform *</label>
                          <select
                            value={lab.platform}
                            onChange={(e) => updateLab(lab.id, 'platform', e.target.value)}
                            className="w-full px-3 py-2 bg-[#161B22] border border-gray-700 rounded text-white focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-all"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}
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
                        <label className="block text-xs text-gray-400 mb-1.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Screenshot URL * (Imgur, GitHub, etc.)</label>
                        <input
                          type="url"
                          value={lab.screenshotUrl}
                          onChange={(e) => updateLab(lab.id, 'screenshotUrl', e.target.value)}
                          placeholder="https://imgur.com/abc123.png"
                          className="w-full px-3 py-2 bg-[#161B22] border border-gray-700 rounded text-white focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-all"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          Writeup * (min {DAILY_LOG_RULES.evidenceRequired.labs.minWriteupWords} words)
                        </label>
                        <textarea
                          value={lab.writeup}
                          onChange={(e) => updateLab(lab.id, 'writeup', e.target.value)}
                          placeholder="Describe what you learned, challenges faced, tools used..."
                          rows={4}
                          className="w-full px-3 py-2 bg-[#161B22] border border-gray-700 rounded text-white focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-all resize-none"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {lab.writeup?.split(' ').filter(Boolean).length || 0} / {DAILY_LOG_RULES.evidenceRequired.labs.minWriteupWords} words
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tool Practice - Glassmorphic Card with Warning Badge */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-gold to-cyber-blue rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>

            <div className="relative bg-[#161B22]/60 backdrop-blur-xl border border-cyber-gold/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(255,184,0,0.1)]">
              {/* Header with Warning Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyber-gold/10 border border-cyber-gold/30 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-cyber-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Tool Practice
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 bg-cyber-gold/20 border border-cyber-gold/40 text-cyber-gold rounded-lg text-xs font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    ⚠ Warning
                  </span>
                  <button
                    type="button"
                    onClick={addTool}
                    className="flex items-center gap-2 px-4 py-2.5 bg-cyber-gold/10 border border-cyber-gold/30 text-cyber-gold rounded-lg hover:bg-cyber-gold/20 hover:border-cyber-gold/50 transition-all duration-300 font-medium shadow-[0_0_15px_rgba(255,184,0,0.2)] hover:shadow-[0_0_25px_rgba(255,184,0,0.4)]"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Tool
                  </button>
                </div>
              </div>

              {tools.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    No tools added yet. Click "Add Tool" to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tools.map((tool) => (
                    <div key={tool.id} className="bg-[#0D0D12] border border-gray-700 rounded-lg p-4 space-y-3 hover:border-cyber-gold/50 transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <h3 className="text-white font-medium" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Tool Practice Entry</h3>
                        <button
                          type="button"
                          onClick={() => removeTool(tool.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Tool Name *</label>
                          <select
                            value={tool.toolName}
                            onChange={(e) => updateTool(tool.id, 'toolName', e.target.value)}
                            className="w-full px-3 py-2 bg-[#161B22] border border-gray-700 rounded text-white focus:outline-none focus:border-cyber-gold focus:ring-1 focus:ring-cyber-gold transition-all"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}
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
                          <label className="block text-xs text-gray-400 mb-1.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Duration (hours) *</label>
                          <input
                            type="number"
                            step="0.5"
                            min="0.5"
                            value={tool.duration}
                            onChange={(e) => updateTool(tool.id, 'duration', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 bg-[#161B22] border border-gray-700 rounded text-white focus:outline-none focus:border-cyber-gold focus:ring-1 focus:ring-cyber-gold transition-all"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}
                            placeholder="1.5"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Activity *</label>
                        <input
                          type="text"
                          value={tool.activity}
                          onChange={(e) => updateTool(tool.id, 'activity', e.target.value)}
                          placeholder="e.g., Analyzed network traffic, Created SIEM queries"
                          className="w-full px-3 py-2 bg-[#161B22] border border-gray-700 rounded text-white focus:outline-none focus:border-cyber-gold focus:ring-1 focus:ring-cyber-gold transition-all"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Evidence URL * (Screenshot/File)</label>
                        <input
                          type="url"
                          value={tool.evidence as string}
                          onChange={(e) => updateTool(tool.id, 'evidence', e.target.value)}
                          placeholder="https://imgur.com/evidence.png"
                          className="w-full px-3 py-2 bg-[#161B22] border border-gray-700 rounded text-white focus:outline-none focus:border-cyber-gold focus:ring-1 focus:ring-cyber-gold transition-all"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          Description * (min {DAILY_LOG_RULES.evidenceRequired.tools.minDescriptionWords} words)
                        </label>
                        <textarea
                          value={tool.description}
                          onChange={(e) => updateTool(tool.id, 'description', e.target.value)}
                          placeholder="What did you do? What did you learn? What challenges did you face?"
                          rows={3}
                          className="w-full px-3 py-2 bg-[#161B22] border border-gray-700 rounded text-white focus:outline-none focus:border-cyber-gold focus:ring-1 focus:ring-cyber-gold transition-all resize-none"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {tool.description?.split(' ').filter(Boolean).length || 0} / {DAILY_LOG_RULES.evidenceRequired.tools.minDescriptionWords} words
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Validation Summary - Glassmorphic Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-purple to-cyber-blue rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>

            <div className="relative bg-[#161B22]/60 backdrop-blur-xl border border-cyber-purple/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(179,102,255,0.1)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-cyber-purple" />
                </div>
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Validation Status
                </h2>
              </div>

              {validation.errors.length > 0 && (
                <div className="space-y-3 mb-4">
                  <h3 className="text-red-400 font-medium flex items-center gap-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <XCircle className="w-5 h-5" />
                    Issues to Fix ({validation.errors.length})
                  </h3>
                  {validation.errors.map((error, idx) => (
                    <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-sm text-red-400">
                      <p style={{ fontFamily: 'JetBrains Mono, monospace' }}>{error.message}</p>
                      {error.field === 'theoryRatio' && (
                        <div className="mt-3 text-xs text-red-300/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          <strong>Why this matters:</strong> Spending too much time on theory without hands-on practice leads to "tutorial hell" -
                          you'll watch videos and read articles but won't build real skills. Aim for 60% hands-on labs and 40% theory maximum.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {validation.warnings.length > 0 && (
                <div className="space-y-3 mb-4">
                  <h3 className="text-cyber-gold font-medium flex items-center gap-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <AlertCircle className="w-5 h-5" />
                    Recommendations ({validation.warnings.length})
                  </h3>
                  {validation.warnings.map((warning, idx) => (
                    <div key={idx} className="bg-cyber-gold/10 border border-cyber-gold/30 rounded-lg p-4 text-sm text-cyber-gold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {warning.message}
                    </div>
                  ))}
                </div>
              )}

              {validation.valid && validation.errors.length === 0 && (
                <div className="bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-4 text-cyber-green flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Perfect! All validation checks passed. Ready to submit your daily log.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={!validation.canSubmit}
              className="relative group px-8 py-4 bg-cyber-blue/10 border-2 border-cyber-blue/30 text-cyber-blue rounded-lg hover:bg-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-[0_0_20px_rgba(0,163,255,0.2)] hover:shadow-[0_0_35px_rgba(0,163,255,0.4)] disabled:shadow-none"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <span className="relative z-10">Submit Daily Log</span>
              {validation.canSubmit && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/0 via-cyber-blue/20 to-cyber-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

