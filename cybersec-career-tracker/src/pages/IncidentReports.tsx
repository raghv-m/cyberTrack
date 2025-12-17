import { useState, useEffect } from 'react';
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
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Shield className="w-12 h-12 text-primary" />
            <div>
              <h1 className="text-4xl font-bold text-text-primary">Incident Reports</h1>
              <p className="text-text-secondary mt-2">Document and track your security investigations</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/app/incident-report-form')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
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
                className="glass rounded-lg p-6 hover:border-primary transition-colors cursor-pointer"
                onClick={() => navigate(`/app/incident-report/${report.id}`)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-text-primary">{report.incidentTitle}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(report.severity)}`}>
                        {report.severity}
                      </span>
                    </div>
                    <p className="text-text-secondary mb-3 line-clamp-2">{report.summary}</p>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {report.incidentType}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {report.submittedAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(report.status)}`}>
                    {getStatusIcon(report.status)}
                    <span className="font-semibold capitalize">{report.status.replace('_', ' ')}</span>
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

