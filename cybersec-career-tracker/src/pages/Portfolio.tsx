import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { Github, Linkedin, ExternalLink, CheckCircle, XCircle, Plus, FileText } from 'lucide-react';
import { verifyPortfolioItems, calculatePortfolioQualityScore } from '../utils/portfolioVerification';

interface PortfolioItem {
  id: string;
  title: string;
  githubUrl: string;
  linkedinUrl?: string;
  description: string;
  readme?: string;
  skills: string[];
  verified: boolean;
  qualityScore: number;
  createdAt: Date;
  issues?: string[];
}

export default function Portfolio() {
  const { currentUser } = useAuth();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    githubUrl: '',
    linkedinUrl: '',
    description: '',
    skills: [] as string[]
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadPortfolio();
    }
  }, [currentUser]);

  const loadPortfolio = async () => {
    if (!currentUser) return;

    try {
      const itemsQuery = query(
        collection(db, 'portfolioItems'),
        where('userId', '==', currentUser.uid)
      );
      const itemsSnapshot = await getDocs(itemsQuery);
      const portfolioItems = itemsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as PortfolioItem[];

      for (const item of portfolioItems) {
        if (item.githubUrl) {
          await fetchGitHubReadme(item);
        }
      }

      setItems(portfolioItems);
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGitHubReadme = async (item: PortfolioItem) => {
    try {
      const match = item.githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) return;

      const [, owner, repo] = match;
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);

      if (response.ok) {
        const data = await response.json();
        const readmeContent = atob(data.content);
        item.readme = readmeContent;
      }
    } catch (error) {
      console.error('Error fetching README:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setSubmitting(true);

    try {
      const verification = await verifyPortfolioItems([{
        githubUrl: newItem.githubUrl,
        description: newItem.description,
        skills: newItem.skills
      }]);

      const qualityScore = calculatePortfolioQualityScore({
        githubUrl: newItem.githubUrl,
        description: newItem.description,
        skills: newItem.skills,
        readme: ''
      });

      await addDoc(collection(db, 'portfolioItems'), {
        userId: currentUser.uid,
        title: newItem.title,
        githubUrl: newItem.githubUrl,
        linkedinUrl: newItem.linkedinUrl,
        description: newItem.description,
        skills: newItem.skills,
        verified: verification.allValid,
        qualityScore: qualityScore.totalScore,
        issues: verification.items[0]?.issues || [],
        createdAt: new Date()
      });

      setNewItem({ title: '', githubUrl: '', linkedinUrl: '', description: '', skills: [] });
      setShowAddForm(false);
      await loadPortfolio();
    } catch (error) {
      console.error('Error adding portfolio item:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-primary';
    if (score >= 40) return 'text-warning';
    return 'text-danger';
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Portfolio</h1>
            <p className="text-text-secondary">Showcase your cybersecurity projects</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-smooth flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-lg p-6">
            <h3 className="text-text-secondary mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-primary">{items.length}</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h3 className="text-text-secondary mb-2">Verified</h3>
            <p className="text-3xl font-bold text-success">{items.filter(i => i.verified).length}</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h3 className="text-text-secondary mb-2">Avg Quality Score</h3>
            <p className="text-3xl font-bold text-warning">
              {items.length > 0 ? (items.reduce((sum, i) => sum + i.qualityScore, 0) / items.length).toFixed(0) : 0}
            </p>
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="glass rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-text-primary mb-4">Add New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-text-secondary mb-2">Project Title</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-text-secondary mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={newItem.githubUrl}
                  onChange={(e) => setNewItem({ ...newItem, githubUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
                  placeholder="https://github.com/username/repo"
                  required
                />
              </div>
              <div>
                <label className="block text-text-secondary mb-2">LinkedIn Post URL (Optional)</label>
                <input
                  type="url"
                  value={newItem.linkedinUrl}
                  onChange={(e) => setNewItem({ ...newItem, linkedinUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
                  placeholder="https://linkedin.com/posts/..."
                />
              </div>
              <div>
                <label className="block text-text-secondary mb-2">Description (300+ words)</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary h-32"
                  required
                />
                <p className="text-xs text-text-tertiary mt-1">
                  {newItem.description.split(/\s+/).length} words
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-smooth disabled:opacity-50"
                >
                  {submitting ? 'Adding...' : 'Add Project'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-bg-tertiary text-text-secondary rounded-lg hover:bg-bg-secondary transition-smooth"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Portfolio Items */}
        <div className="space-y-6">
          {items.map(item => (
            <div key={item.id} className="glass rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                  <div className="flex items-center gap-4">
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    {item.linkedinUrl && (
                      <a
                        href={item.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    {item.verified ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <XCircle className="w-5 h-5 text-danger" />
                    )}
                    <span className={item.verified ? 'text-success' : 'text-danger'}>
                      {item.verified ? 'Verified' : 'Failed'}
                    </span>
                  </div>
                  <p className={`text-2xl font-bold ${getQualityColor(item.qualityScore)}`}>
                    {item.qualityScore}/100
                  </p>
                </div>
              </div>

              <p className="text-text-secondary mb-4">{item.description.substring(0, 200)}...</p>

              {item.readme && (
                <div className="bg-bg-secondary rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-text-tertiary" />
                    <span className="text-sm font-semibold text-text-secondary">README.md Preview</span>
                  </div>
                  <pre className="text-xs text-text-tertiary overflow-x-auto">
                    {item.readme.substring(0, 300)}...
                  </pre>
                </div>
              )}

              {item.issues && item.issues.length > 0 && (
                <div className="bg-danger bg-opacity-10 border border-danger rounded-lg p-4">
                  <h4 className="font-semibold text-danger mb-2">Issues:</h4>
                  <ul className="space-y-1">
                    {item.issues.map((issue, idx) => (
                      <li key={idx} className="text-sm text-text-secondary">• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

