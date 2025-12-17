import { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Calendar, Tag, AlertTriangle, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs, where, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

interface NewsArticle {
  id: string;
  title: string;
  url: string;
  sourceName: string;
  sourceLogo: string;
  author: string;
  publishedDate: Timestamp;
  summary: string;
  excerpt: string;
  imageUrl: string;
  primaryCategory: string;
  secondaryCategories: string[];
  attackType: string;
  severity: string;
  affectedIndustries: string[];
  cveIds: string[];
  views: number;
  readingTime: number;
  trending: boolean;
}

export default function News() {
  const { currentUser } = useAuth();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [dateRange, setDateRange] = useState('7days');
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [articles, searchTerm, selectedCategory, selectedSeverity, selectedIndustry, dateRange, sortBy]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const articlesRef = collection(db, 'newsArticles');
      const q = query(articlesRef, orderBy('publishedDate', 'desc'), limit(100));
      const snapshot = await getDocs(q);
      
      const articlesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsArticle[];
      
      setArticles(articlesData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading articles:', error);
      setLoading(false);
      // Load sample data for demo
      loadSampleData();
    }
  };

  const loadSampleData = () => {
    const sampleArticles: NewsArticle[] = [
      {
        id: '1',
        title: 'Critical Zero-Day Vulnerability Discovered in Popular VPN Software',
        url: 'https://example.com/article1',
        sourceName: 'BleepingComputer',
        sourceLogo: '',
        author: 'Security Team',
        publishedDate: Timestamp.now(),
        summary: 'A critical zero-day vulnerability has been discovered affecting millions of VPN users worldwide.',
        excerpt: 'A critical zero-day vulnerability has been discovered...',
        imageUrl: '',
        primaryCategory: 'Vulnerability',
        secondaryCategories: ['Zero-Day', 'VPN'],
        attackType: 'Vulnerability',
        severity: 'Critical',
        affectedIndustries: ['Technology', 'Enterprise'],
        cveIds: ['CVE-2024-1234'],
        views: 1523,
        readingTime: 5,
        trending: true
      },
      {
        id: '2',
        title: 'Major Healthcare Provider Suffers Ransomware Attack',
        url: 'https://example.com/article2',
        sourceName: 'Krebs on Security',
        sourceLogo: '',
        author: 'Brian Krebs',
        publishedDate: Timestamp.now(),
        summary: 'A major healthcare provider has been hit by a sophisticated ransomware attack affecting patient data.',
        excerpt: 'A major healthcare provider has been hit...',
        imageUrl: '',
        primaryCategory: 'Incident Report',
        secondaryCategories: ['Ransomware', 'Data Breach'],
        attackType: 'Ransomware',
        severity: 'High',
        affectedIndustries: ['Healthcare'],
        cveIds: [],
        views: 2341,
        readingTime: 7,
        trending: true
      },
      {
        id: '3',
        title: 'New Phishing Campaign Targets Financial Institutions',
        url: 'https://example.com/article3',
        sourceName: 'Dark Reading',
        sourceLogo: '',
        author: 'Security Analyst',
        publishedDate: Timestamp.now(),
        summary: 'Cybersecurity researchers have identified a sophisticated phishing campaign targeting major banks.',
        excerpt: 'Cybersecurity researchers have identified...',
        imageUrl: '',
        primaryCategory: 'Threat Intelligence',
        secondaryCategories: ['Phishing', 'Social Engineering'],
        attackType: 'Phishing',
        severity: 'Medium',
        affectedIndustries: ['Finance'],
        cveIds: [],
        views: 892,
        readingTime: 4,
        trending: false
      }
    ];
    setArticles(sampleArticles);
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...articles];

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(search) ||
        article.summary.toLowerCase().includes(search) ||
        article.cveIds.some(cve => cve.toLowerCase().includes(search))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(a => a.primaryCategory === selectedCategory);
    }

    // Severity filter
    if (selectedSeverity !== 'All') {
      filtered = filtered.filter(a => a.severity === selectedSeverity);
    }

    // Industry filter
    if (selectedIndustry !== 'All') {
      filtered = filtered.filter(a => a.affectedIndustries.includes(selectedIndustry));
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'latest') {
        return b.publishedDate.toMillis() - a.publishedDate.toMillis();
      } else if (sortBy === 'popular') {
        return b.views - a.views;
      } else if (sortBy === 'trending') {
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      }
      return 0;
    });

    setFilteredArticles(filtered);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-danger text-white';
      case 'High': return 'bg-warning text-gray-900';
      case 'Medium': return 'bg-yellow-500 text-gray-900';
      case 'Low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-primary p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-2">🗞️ Cybersecurity News</h1>
        <p className="text-text-secondary">Latest incidents, vulnerabilities, and threat intelligence</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-danger" />
            <span className="text-text-secondary text-sm">Critical Alerts</span>
          </div>
          <div className="text-2xl font-bold text-text-primary">
            {articles.filter(a => a.severity === 'Critical').length}
          </div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-text-secondary text-sm">Trending</span>
          </div>
          <div className="text-2xl font-bold text-text-primary">
            {articles.filter(a => a.trending).length}
          </div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-success" />
            <span className="text-text-secondary text-sm">This Week</span>
          </div>
          <div className="text-2xl font-bold text-text-primary">{articles.length}</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-5 h-5 text-secondary" />
            <span className="text-text-secondary text-sm">Total Articles</span>
          </div>
          <div className="text-2xl font-bold text-text-primary">{articles.length}</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search articles, CVEs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
          >
            <option value="All">All Categories</option>
            <option value="Vulnerability">Vulnerability</option>
            <option value="Incident Report">Incident Report</option>
            <option value="Threat Intelligence">Threat Intelligence</option>
            <option value="Malware Analysis">Malware Analysis</option>
            <option value="News">News</option>
          </select>

          {/* Severity Filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Industry Filter */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
          >
            <option value="All">All Industries</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Technology">Technology</option>
            <option value="Government">Government</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-secondary border border-tertiary rounded-lg text-text-primary focus:outline-none focus:border-primary"
          >
            <option value="latest">Latest First</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-text-secondary mt-4">Loading articles...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary">No articles found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} getSeverityColor={getSeverityColor} />
          ))}
        </div>
      )}
    </div>
  );
}

function ArticleCard({ article, getSeverityColor }: { article: NewsArticle; getSeverityColor: (severity: string) => string }) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="glass rounded-lg p-6 hover:border-primary border border-transparent transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">{article.sourceName}</span>
          {article.trending && (
            <span className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded">
              <TrendingUp className="w-3 h-3" />
              Trending
            </span>
          )}
        </div>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className="text-text-secondary hover:text-primary transition-colors"
        >
          {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
        </button>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-text-primary mb-3 hover:text-primary cursor-pointer">
        {article.title}
      </h3>

      {/* Summary */}
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">{article.summary}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(article.severity)}`}>
          {article.severity}
        </span>
        <span className="text-xs px-2 py-1 rounded bg-secondary text-text-primary border border-tertiary">
          {article.primaryCategory}
        </span>
        {article.cveIds.length > 0 && (
          <span className="text-xs px-2 py-1 rounded bg-danger/20 text-danger">
            {article.cveIds[0]}
          </span>
        )}
        {article.affectedIndustries.slice(0, 2).map(industry => (
          <span key={industry} className="text-xs px-2 py-1 rounded bg-tertiary text-text-primary">
            {industry}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <div className="flex items-center gap-4">
          <span>{article.readingTime} min read</span>
          <span>{article.views} views</span>
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          Read More
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

