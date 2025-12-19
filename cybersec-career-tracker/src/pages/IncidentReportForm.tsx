import { useState } from 'react';
import { Shield, Plus, X, Save } from 'lucide-react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TimelineEvent {
  timestamp: string;
  event: string;
  details: string;
}

export default function IncidentReportForm() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    incidentTitle: '',
    incidentDate: '',
    discoveryDate: '',
    incidentType: '',
    severity: '',
    summary: '',
    detailedDescription: '',
    impactAssessment: '',
    rootCause: '',
    affectedSystems: '',
    attackVector: '',
    toolsUsed: '',
    iocIps: '',
    iocDomains: '',
    iocHashes: '',
    containmentActions: '',
    eradicationSteps: '',
    recoverySteps: '',
    lessonsLearned: '',
    recommendations: '',
    githubUrl: '',
    isPublic: false
  });

  const [timeline, setTimeline] = useState<TimelineEvent[]>([
    { timestamp: '', event: '', details: '' }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('You must be logged in to submit an incident report');
      return;
    }

    setSubmitting(true);

    try {
      const reportData = {
        userId: currentUser.uid,
        submittedBy: {
          name: currentUser.displayName || 'Anonymous',
          email: currentUser.email || '',
          role: 'student'
        },
        incidentTitle: formData.incidentTitle,
        incidentDate: formData.incidentDate ? Timestamp.fromDate(new Date(formData.incidentDate)) : null,
        discoveryDate: formData.discoveryDate ? Timestamp.fromDate(new Date(formData.discoveryDate)) : null,
        incidentType: formData.incidentType,
        severity: formData.severity,
        summary: formData.summary,
        detailedDescription: formData.detailedDescription,
        impactAssessment: formData.impactAssessment,
        rootCause: formData.rootCause,
        affectedSystems: formData.affectedSystems.split(',').map(s => s.trim()).filter(Boolean),
        attackVector: formData.attackVector,
        toolsUsed: formData.toolsUsed.split(',').map(s => s.trim()).filter(Boolean),
        iocs: {
          ips: formData.iocIps.split(',').map(s => s.trim()).filter(Boolean),
          domains: formData.iocDomains.split(',').map(s => s.trim()).filter(Boolean),
          hashes: formData.iocHashes.split(',').map(s => s.trim()).filter(Boolean),
          emails: []
        },
        timeline: timeline.filter(t => t.event && t.details),
        containmentActions: formData.containmentActions.split('\n').filter(Boolean),
        eradicationSteps: formData.eradicationSteps.split('\n').filter(Boolean),
        recoverySteps: formData.recoverySteps.split('\n').filter(Boolean),
        lessonsLearned: formData.lessonsLearned,
        recommendations: formData.recommendations,
        githubUrl: formData.githubUrl,
        isPublic: formData.isPublic,
        status: 'submitted',
        submittedAt: Timestamp.now(),
        lastUpdated: Timestamp.now()
      };

      await addDoc(collection(db, 'incidentReports'), reportData);
      
      alert('✅ Incident report submitted successfully!');
      navigate(`/app/incident-reports`);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('❌ Error submitting report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const addTimelineEvent = () => {
    setTimeline([...timeline, { timestamp: '', event: '', details: '' }]);
  };

  const removeTimelineEvent = (index: number) => {
    setTimeline(timeline.filter((_, i) => i !== index));
  };

  const updateTimelineEvent = (index: number, field: keyof TimelineEvent, value: string) => {
    const newTimeline = [...timeline];
    newTimeline[index][field] = value;
    setTimeline(newTimeline);
  };

  

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Shield className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-text-primary">Submit Incident Report</h1>
            <p className="text-text-secondary mt-2">Document your security investigation for review and portfolio</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-text-primary font-semibold mb-2">Incident Title *</label>
                <input
                  type="text"
                  value={formData.incidentTitle}
                  onChange={(e) => setFormData({...formData, incidentTitle: e.target.value})}
                  placeholder="e.g., Phishing Campaign Targeting HR Department"
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-primary font-semibold mb-2">Incident Date *</label>
                  <input
                    type="datetime-local"
                    value={formData.incidentDate}
                    onChange={(e) => setFormData({...formData, incidentDate: e.target.value})}
                    className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">Discovery Date *</label>
                  <input
                    type="datetime-local"
                    value={formData.discoveryDate}
                    onChange={(e) => setFormData({...formData, discoveryDate: e.target.value})}
                    className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-primary font-semibold mb-2">Incident Type *</label>
                  <select
                    value={formData.incidentType}
                    onChange={(e) => setFormData({...formData, incidentType: e.target.value})}
                    className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    required
                  >
                    <option value="">Select type...</option>
                    <option value="Phishing">Phishing</option>
                    <option value="Malware">Malware</option>
                    <option value="Data Breach">Data Breach</option>
                    <option value="Unauthorized Access">Unauthorized Access</option>
                    <option value="DDoS">DDoS Attack</option>
                    <option value="Ransomware">Ransomware</option>
                    <option value="Insider Threat">Insider Threat</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">Severity *</label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({...formData, severity: e.target.value})}
                    className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    required
                  >
                    <option value="">Select severity...</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Description</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-text-primary font-semibold mb-2">Summary * (Max 500 characters)</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                  maxLength={500}
                  rows={3}
                  placeholder="Brief description of the incident..."
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  required
                />
                <span className="text-sm text-text-secondary">{formData.summary.length}/500</span>
              </div>

              <div>
                <label className="block text-text-primary font-semibold mb-2">Detailed Description *</label>
                <textarea
                  value={formData.detailedDescription}
                  onChange={(e) => setFormData({...formData, detailedDescription: e.target.value})}
                  rows={8}
                  placeholder="Provide a comprehensive narrative of the incident..."
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-text-primary font-semibold mb-2">Impact Assessment *</label>
                <textarea
                  value={formData.impactAssessment}
                  onChange={(e) => setFormData({...formData, impactAssessment: e.target.value})}
                  rows={4}
                  placeholder="Describe the impact on confidentiality, integrity, and availability..."
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-text-primary font-semibold mb-2">Root Cause *</label>
                <textarea
                  value={formData.rootCause}
                  onChange={(e) => setFormData({...formData, rootCause: e.target.value})}
                  rows={4}
                  placeholder="Explain the underlying cause of the incident..."
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Technical Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-text-primary font-semibold mb-2">Affected Systems (comma-separated)</label>
                <input
                  type="text"
                  value={formData.affectedSystems}
                  onChange={(e) => setFormData({...formData, affectedSystems: e.target.value})}
                  placeholder="e.g., Web Server, Database, Email Server"
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-text-primary font-semibold mb-2">Attack Vector</label>
                <input
                  type="text"
                  value={formData.attackVector}
                  onChange={(e) => setFormData({...formData, attackVector: e.target.value})}
                  placeholder="e.g., Email, Web Application, Network"
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-text-primary font-semibold mb-2">Tools Used in Investigation (comma-separated)</label>
                <input
                  type="text"
                  value={formData.toolsUsed}
                  onChange={(e) => setFormData({...formData, toolsUsed: e.target.value})}
                  placeholder="e.g., Wireshark, Splunk, Volatility"
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div className="bg-tertiary p-4 rounded-lg space-y-3">
                <h3 className="text-lg font-semibold text-text-primary">Indicators of Compromise (IOCs)</h3>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">IP Addresses (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.iocIps}
                    onChange={(e) => setFormData({...formData, iocIps: e.target.value})}
                    placeholder="e.g., 192.168.1.1, 10.0.0.5"
                    className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">Domains (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.iocDomains}
                    onChange={(e) => setFormData({...formData, iocDomains: e.target.value})}
                    placeholder="e.g., malicious-site.com, phishing-domain.net"
                    className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">File Hashes (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.iocHashes}
                    onChange={(e) => setFormData({...formData, iocHashes: e.target.value})}
                    placeholder="e.g., MD5, SHA256 hashes"
                    className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-primary">Timeline</h2>
              <button
                type="button"
                onClick={addTimelineEvent}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Add Event
              </button>
            </div>

            <div className="space-y-4">
              {timeline.map((event, index) => (
                <div key={index} className="bg-tertiary p-4 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="datetime-local"
                          value={event.timestamp}
                          onChange={(e) => updateTimelineEvent(index, 'timestamp', e.target.value)}
                          className="px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                        />
                        <input
                          type="text"
                          value={event.event}
                          onChange={(e) => updateTimelineEvent(index, 'event', e.target.value)}
                          placeholder="Event name"
                          className="px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                        />
                      </div>
                      <textarea
                        value={event.details}
                        onChange={(e) => updateTimelineEvent(index, 'details', e.target.value)}
                        placeholder="Event details..."
                        rows={2}
                        className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                    {timeline.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTimelineEvent(index)}
                        className="p-2 text-danger hover:bg-danger/20 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response & Remediation */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Response & Remediation</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-text-primary font-semibold mb-2">Containment Actions (one per line)</label>
                <textarea
                  value={formData.containmentActions}
                  onChange={(e) => setFormData({...formData, containmentActions: e.target.value})}
                  rows={4}
                  placeholder="List actions taken to contain the incident..."
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-text-primary font-semibold mb-2">Eradication Steps (one per line)</label>
                <textarea
                  value={formData.eradicationSteps}
                  onChange={(e) => setFormData({...formData, eradicationSteps: e.target.value})}
                  rows={4}
                  placeholder="List steps taken to remove the threat..."
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-text-primary font-semibold mb-2">Recovery Steps (one per line)</label>
                <textarea
                  value={formData.recoverySteps}
                  onChange={(e) => setFormData({...formData, recoverySteps: e.target.value})}
                  rows={4}
                  placeholder="List steps taken to restore normal operations..."
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-text-primary font-semibold mb-2">Lessons Learned</label>
                <textarea
                  value={formData.lessonsLearned}
                  onChange={(e) => setFormData({...formData, lessonsLearned: e.target.value})}
                  rows={4}
                  placeholder="What did you learn from this incident?"
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-text-primary font-semibold mb-2">Recommendations</label>
                <textarea
                  value={formData.recommendations}
                  onChange={(e) => setFormData({...formData, recommendations: e.target.value})}
                  rows={4}
                  placeholder="Recommendations to prevent similar incidents..."
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Additional Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-text-primary font-semibold mb-2">GitHub Repository URL (optional)</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                  placeholder="https://github.com/username/incident-report"
                  className="w-full px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                  className="w-5 h-5 text-primary bg-secondary border-tertiary rounded focus:ring-primary"
                />
                <label htmlFor="isPublic" className="text-text-primary">
                  Make this report public (can be shared in portfolio after approval)
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/app/incident-reports')}
              className="px-6 py-3 bg-secondary text-text-primary rounded-lg hover:bg-tertiary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {submitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


