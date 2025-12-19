import { useState, useEffect, useRef } from 'react';
import { Shield, Plus, Clock, CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface IncidentReport {
  id: string;
  incidentTitle: string;
  incidentType: string;
  severity: string;
  status: string;
  submittedAt: any;
  summary: string;
}

export default function IncidentReports() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState<IncidentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Digital Rain Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(11, 14, 17, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 255, 136, 0.05)';
      ctx.font = fontSize + 'px monospace';

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadReports();
  }, [currentUser]);

  const loadReports = async () => {
    if (!currentUser) return;

    try {
      const q = query(
        collection(db, 'incidentReports'),
        where('userId', '==', currentUser.uid),
        orderBy('submittedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const reportsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as IncidentReport[];

      setReports(reportsData);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-danger" />;
      case 'revision_needed':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      default:
        return <FileText className="w-5 h-5 text-text-secondary" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500';
      case 'approved':
        return 'bg-success/20 text-success border-success';
      case 'rejected':
        return 'bg-danger/20 text-danger border-danger';
      case 'revision_needed':
        return 'bg-warning/20 text-warning border-warning';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-danger text-white';
      case 'High':
        return 'bg-warning text-white';
      case 'Medium':
        return 'bg-yellow-500 text-white';
      case 'Low':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    return report.status === filter;
  });

  const stats = {
    total: reports.length,
    submitted: reports.filter(r => r.status === 'submitted').length,
    approved: reports.filter(r => r.status === 'approved').length,
    rejected: reports.filter(r => r.status === 'rejected').length,
    revision: reports.filter(r => r.status === 'revision_needed').length
  };

  return (
    <div className="min-h-screen bg-[#0B0E11] p-6 lg:p-8 relative overflow-hidden">
      {/* Digital Rain Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.05 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Forensic Dossier Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-cyber-blue/10 border-2 border-cyber-blue/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,163,255,0.3)]">
              <Shield className="w-8 h-8 text-cyber-blue drop-shadow-[0_0_8px_rgba(0,163,255,0.8)]" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                INCIDENT REPORTS // FORENSIC DOSSIER
              </h1>
              <p className="text-gray-400 mt-2 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Document and track your security investigations • Terminal logs enabled
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/app/incident-report-form')}
            className="flex items-center gap-2 px-6 py-3 bg-cyber-blue/10 border-2 border-cyber-blue/40 text-cyber-blue rounded-lg hover:bg-cyber-blue/20 hover:border-cyber-blue/60 transition-all duration-300 font-bold shadow-[0_0_15px_rgba(0,163,255,0.2)]"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            <Plus className="w-5 h-5" />
            New Report
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="glass p-4 rounded-lg">
            <div className="text-2xl font-bold text-text-primary">{stats.total}</div>
            <div className="text-sm text-text-secondary">Total Reports</div>
          </div>
          <div className="glass p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-500">{stats.submitted}</div>
            <div className="text-sm text-text-secondary">Submitted</div>
          </div>
          <div className="glass p-4 rounded-lg">
            <div className="text-2xl font-bold text-success">{stats.approved}</div>
            <div className="text-sm text-text-secondary">Approved</div>
          </div>
          <div className="glass p-4 rounded-lg">
            <div className="text-2xl font-bold text-warning">{stats.revision}</div>
            <div className="text-sm text-text-secondary">Needs Revision</div>
          </div>
          <div className="glass p-4 rounded-lg">
            <div className="text-2xl font-bold text-danger">{stats.rejected}</div>
            <div className="text-sm text-text-secondary">Rejected</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['all', 'submitted', 'approved', 'revision_needed', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-text-secondary hover:bg-tertiary'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Reports List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-text-secondary mt-4">Loading reports...</p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="glass rounded-lg p-12 text-center">
            <Shield className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">No reports found</h3>
            <p className="text-text-secondary mb-6">
              {filter === 'all' 
                ? 'Start documenting your security investigations by creating your first incident report.'
                : `No reports with status "${filter.replace('_', ' ')}".`
              }
            </p>
            <button
              onClick={() => navigate('/app/incident-report-form')}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Create First Report
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="relative group"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl opacity-10 group-hover:opacity-20 blur transition duration-300"></div>

                {/* Forensic Dossier Card */}
                <div
                  className="relative bg-[#161B22]/60 backdrop-blur-xl border border-cyber-blue/30 rounded-2xl p-6 hover:border-cyber-blue/60 transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(0,163,255,0.1)]"
                  onClick={() => navigate(`/app/incident-report/${report.id}`)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Terminal-style Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-black text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {report.incidentTitle.toUpperCase()}
                        </h3>
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getSeverityColor(report.severity)}`} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {report.severity.toUpperCase()}
                        </span>
                      </div>

                      {/* Monospace Summary */}
                      <p className="text-gray-400 mb-4 line-clamp-2 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {report.summary}
                      </p>

                      {/* Terminal Metadata */}
                      <div className="flex items-center gap-4 text-xs text-gray-500" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          TYPE: {report.incidentType.toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          DATE: {report.submittedAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(report.status)}`} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {getStatusIcon(report.status)}
                      <span className="font-semibold capitalize">{report.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

