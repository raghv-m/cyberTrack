import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Briefcase, Plus, Edit2, Trash2, ExternalLink, Calendar, DollarSign, MapPin, Building } from 'lucide-react';

interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  salary?: string;
  status: 'Applied' | 'Phone Screen' | 'Technical Interview' | 'Final Interview' | 'Offer' | 'Rejected' | 'Accepted';
  appliedDate: string;
  jobUrl?: string;
  notes?: string;
  contactPerson?: string;
  nextSteps?: string;
}

export default function JobApplications() {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);
  const [formData, setFormData] = useState<Partial<JobApplication>>({
    company: '',
    position: '',
    location: '',
    salary: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    jobUrl: '',
    notes: '',
    contactPerson: '',
    nextSteps: ''
  });

  useEffect(() => {
    if (currentUser) {
      loadApplications();
    }
  }, [currentUser]);

  const loadApplications = async () => {
    if (!currentUser) return;

    try {
      const q = query(
        collection(db, 'users', currentUser.uid, 'jobApplications'),
        orderBy('appliedDate', 'desc')
      );
      const snapshot = await getDocs(q);
      const apps = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JobApplication[];
      setApplications(apps);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      if (editingApp) {
        await updateDoc(
          doc(db, 'users', currentUser.uid, 'jobApplications', editingApp.id),
          formData
        );
      } else {
        await addDoc(
          collection(db, 'users', currentUser.uid, 'jobApplications'),
          formData
        );
      }

      setShowAddModal(false);
      setEditingApp(null);
      resetForm();
      loadApplications();
    } catch (error) {
      console.error('Error saving application:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!currentUser || !confirm('Delete this application?')) return;

    try {
      await deleteDoc(doc(db, 'users', currentUser.uid, 'jobApplications', id));
      loadApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const handleEdit = (app: JobApplication) => {
    setEditingApp(app);
    setFormData(app);
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      salary: '',
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      jobUrl: '',
      notes: '',
      contactPerson: '',
      nextSteps: ''
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Applied': 'bg-blue-500',
      'Phone Screen': 'bg-cyan-500',
      'Technical Interview': 'bg-purple-500',
      'Final Interview': 'bg-yellow-500',
      'Offer': 'bg-green-500',
      'Rejected': 'bg-red-500',
      'Accepted': 'bg-emerald-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusCount = (status: string) => {
    return applications.filter(app => app.status === status).length;
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Job Applications</h1>
            <p className="text-text-secondary">Track your job search progress</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setEditingApp(null);
              setShowAddModal(true);
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Application
          </button>
        </div>


        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {['Applied', 'Phone Screen', 'Technical Interview', 'Final Interview', 'Offer', 'Rejected', 'Accepted'].map(status => (
            <div key={status} className="glass rounded-lg p-4">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} mb-2`}></div>
              <p className="text-xs text-text-tertiary mb-1">{status}</p>
              <p className="text-2xl font-bold text-text-primary">{getStatusCount(status)}</p>
            </div>
          ))}
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="glass rounded-lg p-12 text-center">
            <Briefcase className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">No Applications Yet</h3>
            <p className="text-text-secondary mb-6">Start tracking your job applications to stay organized</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
            >
              Add Your First Application
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="glass rounded-lg p-6 hover:border-primary transition-smooth">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-text-primary">{app.position}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        {app.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {app.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Applied: {new Date(app.appliedDate).toLocaleDateString()}
                      </div>
                      {app.salary && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          {app.salary}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {app.jobUrl && (
                      <a
                        href={app.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-bg-secondary rounded-lg transition-smooth"
                        title="View Job Posting"
                      >
                        <ExternalLink className="w-5 h-5 text-primary" />
                      </a>
                    )}
                    <button
                      onClick={() => handleEdit(app)}
                      className="p-2 hover:bg-bg-secondary rounded-lg transition-smooth"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5 text-text-secondary" />
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="p-2 hover:bg-bg-secondary rounded-lg transition-smooth"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-danger" />
                    </button>
                  </div>
                </div>

                {(app.notes || app.contactPerson || app.nextSteps) && (
                  <div className="border-t border-border-color pt-4 mt-4 space-y-2">
                    {app.contactPerson && (
                      <p className="text-sm text-text-secondary">
                        <span className="font-semibold">Contact:</span> {app.contactPerson}
                      </p>
                    )}
                    {app.nextSteps && (
                      <p className="text-sm text-text-secondary">
                        <span className="font-semibold">Next Steps:</span> {app.nextSteps}
                      </p>
                    )}
                    {app.notes && (
                      <p className="text-sm text-text-secondary">
                        <span className="font-semibold">Notes:</span> {app.notes}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="glass rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                {editingApp ? 'Edit Application' : 'Add New Application'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="input-field w-full"
                      placeholder="e.g., Google"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Position *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="input-field w-full"
                      placeholder="e.g., SOC Analyst"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="input-field w-full"
                      placeholder="e.g., Remote, Toronto, ON"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Salary Range
                    </label>
                    <input
                      type="text"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      className="input-field w-full"
                      placeholder="e.g., $70k-$90k"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Status *
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="input-field w-full"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Phone Screen">Phone Screen</option>
                      <option value="Technical Interview">Technical Interview</option>
                      <option value="Final Interview">Final Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Accepted">Accepted</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Applied Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.appliedDate}
                      onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                      className="input-field w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Job URL
                  </label>
                  <input
                    type="url"
                    value={formData.jobUrl}
                    onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                    className="input-field w-full"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="input-field w-full"
                    placeholder="e.g., Jane Smith - Recruiter"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Next Steps
                  </label>
                  <input
                    type="text"
                    value={formData.nextSteps}
                    onChange={(e) => setFormData({ ...formData, nextSteps: e.target.value })}
                    className="input-field w-full"
                    placeholder="e.g., Technical interview scheduled for Friday"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="input-field w-full"
                    rows={4}
                    placeholder="Additional notes about the application..."
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingApp(null);
                      resetForm();
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingApp ? 'Update' : 'Add'} Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}