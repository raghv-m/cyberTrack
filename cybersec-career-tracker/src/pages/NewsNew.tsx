import { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Tag, AlertTriangle, ExternalLink, Bookmark, RefreshCw, X, Clock, Eye, Sparkles } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
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

export default function NewsNew() {
  const { } = useAuth();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [articles, searchTerm, selectedCategory, selectedSeverity, selectedIndustry]);

  const loadArticles = async () => {
    try {
      setLoading(true);

      // Try to load real scraped news data first
      try {
        const response = await fetch('/cyber_news.json');
        if (response.ok) {
          const realNews = await response.json();

          // Convert to our format
          const convertedArticles: NewsArticle[] = realNews.map((item: any, index: number) => ({
            id: `real-${index}`,
            title: item.title,
            url: item.link,
            sourceName: item.source,
            sourceLogo: '',
            author: item.source,
            publishedDate: Timestamp.fromDate(new Date(item.published)),
            summary: item.summary,
            excerpt: item.summary.substring(0, 200) + '...',
            imageUrl: '',
            primaryCategory: detectCategory(item.title + ' ' + item.summary),
            secondaryCategories: [],
            attackType: detectAttackType(item.title + ' ' + item.summary),
            severity: detectSeverity(item.title + ' ' + item.summary),
            affectedIndustries: [detectIndustry(item.title + ' ' + item.summary)],
            cveIds: extractCVEs(item.title + ' ' + item.summary),
            views: Math.floor(Math.random() * 5000),
            readingTime: Math.floor(Math.random() * 10) + 3,
            trending: Math.random() > 0.7
          }));

          setArticles(convertedArticles);
          setLoading(false);
          console.log(`✅ Loaded ${convertedArticles.length} real news articles!`);
          return;
        }
      } catch (err) {
        console.log('Real news not available, loading sample data');
      }

      // Fallback to sample data
      loadSampleData();
      setLoading(false);

    } catch (error) {
      console.error('Error loading articles:', error);
      loadSampleData();
      setLoading(false);
    }
  };

  const refreshNews = async () => {
    setRefreshing(true);

    // Trigger Python scraper
    try {
      const response = await fetch('http://localhost:3001/api/refresh-news', {
        method: 'POST',
      });

      if (response.ok) {
        console.log('✅ News refresh triggered!');
        // Wait a bit for scraper to complete
        setTimeout(() => {
          loadArticles();
          setRefreshing(false);
        }, 3000);
      } else {
        // Fallback: just reload current data
        await loadArticles();
        setRefreshing(false);
      }
    } catch (error) {
      console.error('Error refreshing news:', error);
      // Fallback: just reload current data
      await loadArticles();
      setRefreshing(false);
    }
  };

  // Helper functions for classification
  const detectCategory = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('vulnerability') || lower.includes('cve')) return 'Vulnerability';
    if (lower.includes('breach') || lower.includes('incident')) return 'Incident Report';
    if (lower.includes('malware') || lower.includes('ransomware')) return 'Malware Analysis';
    if (lower.includes('threat') || lower.includes('attack')) return 'Threat Intelligence';
    return 'News';
  };

  const detectSeverity = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('critical') || lower.includes('zero-day')) return 'Critical';
    if (lower.includes('high') || lower.includes('severe') || lower.includes('actively exploited')) return 'High';
    if (lower.includes('medium') || lower.includes('moderate')) return 'Medium';
    return 'Low';
  };



  const detectAttackType = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('ransomware')) return 'Ransomware';
    if (lower.includes('phishing')) return 'Phishing';
    if (lower.includes('ddos')) return 'DDoS';
    if (lower.includes('malware')) return 'Malware';
    if (lower.includes('rce') || lower.includes('remote code execution')) return 'Remote Code Execution';
    return 'Unknown';
  };

  const detectIndustry = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('healthcare') || lower.includes('hospital')) return 'Healthcare';
    if (lower.includes('finance') || lower.includes('bank')) return 'Finance';
    if (lower.includes('government') || lower.includes('federal')) return 'Government';
    if (lower.includes('education') || lower.includes('university')) return 'Education';
    if (lower.includes('retail') || lower.includes('store')) return 'Retail';
    return 'Technology';
  };

  const extractCVEs = (text: string): string[] => {
    const cvePattern = /CVE-\d{4}-\d{4,7}/gi;
    const matches = text.match(cvePattern);
    return matches ? Array.from(new Set(matches)).slice(0, 3) : [];
  };

  const loadSampleData = () => {
    const now = new Date();
    const sampleArticles: NewsArticle[] = [
      {
        id: '1',
        title: 'Critical Zero-Day Vulnerability Discovered in Apache Log4j Library',
        url: 'https://www.bleepingcomputer.com/news/security/critical-log4j-vulnerability/',
        sourceName: 'BleepingComputer',
        sourceLogo: '',
        author: 'Lawrence Abrams',
        publishedDate: Timestamp.fromDate(new Date(now.getTime() - 2 * 60 * 60 * 1000)),
        summary: 'A critical zero-day vulnerability in Apache Log4j library is being actively exploited in the wild, affecting millions of Java applications worldwide. Immediate patching is recommended.',
        excerpt: 'A critical zero-day vulnerability in Apache Log4j library is being actively exploited...',
        imageUrl: '',
        primaryCategory: 'Vulnerability',
        secondaryCategories: ['Zero-Day', 'Apache'],
        attackType: 'Remote Code Execution',
        severity: 'Critical',
        affectedIndustries: ['Technology', 'Finance', 'Healthcare'],
        cveIds: ['CVE-2021-44228'],
        views: 3542,
        readingTime: 5,
        trending: true
      },
      // Add more sample articles as needed
    ];
    setArticles(sampleArticles);
  };

  const applyFilters = () => {
    let filtered = [...articles];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.primaryCategory === selectedCategory);
    }

    // Severity filter
    if (selectedSeverity !== 'All') {
      filtered = filtered.filter(article => article.severity === selectedSeverity);
    }

    // Industry filter
    if (selectedIndustry !== 'All') {
      filtered = filtered.filter(article => article.affectedIndustries.includes(selectedIndustry));
    }

    setFilteredArticles(filtered);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'from-red-600 to-red-500';
      case 'High': return 'from-orange-600 to-orange-500';
      case 'Medium': return 'from-yellow-600 to-yellow-500';
      case 'Low': return 'from-blue-600 to-blue-500';
      default: return 'from-gray-600 to-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Vulnerability': return <AlertTriangle className="w-4 h-4" />;
      case 'Incident Report': return <TrendingUp className="w-4 h-4" />;
      case 'Malware Analysis': return <Tag className="w-4 h-4" />;
      case 'Threat Intelligence': return <Sparkles className="w-4 h-4" />;
      default: return <Tag className="w-4 h-4" />;
    }
  };

  const categories = ['All', 'Vulnerability', 'Incident Report', 'Malware Analysis', 'Threat Intelligence', 'News'];
  const severities = ['All', 'Critical', 'High', 'Medium', 'Low'];
  const industries = ['All', 'Technology', 'Healthcare', 'Finance', 'Government', 'Education', 'Retail'];


  return (
    <div className="min-h-screen bg-[#0B0E11] p-6 animate-fade-in relative">
      {/* Scrolling CVE Ticker at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-red-900/20 border-t border-red-500/30 overflow-hidden z-50 backdrop-blur-sm">
        <div className="animate-marquee whitespace-nowrap py-2 flex gap-8" style={{ fontFamily: 'JetBrains Mono, monospace', animation: 'marquee 30s linear infinite' }}>
          {['CVE-2024-1234', 'CVE-2024-5678', 'CVE-2024-9012', 'CVE-2024-3456', 'CVE-2024-7890', 'CVE-2024-2345', 'CVE-2024-6789', 'CVE-2024-0123'].map((cve, idx) => (
            <span key={idx} className="inline-block text-red-400 font-bold text-sm">
              🔴 {cve}
            </span>
          ))}
          {['CVE-2024-1234', 'CVE-2024-5678', 'CVE-2024-9012', 'CVE-2024-3456', 'CVE-2024-7890', 'CVE-2024-2345', 'CVE-2024-6789', 'CVE-2024-0123'].map((cve, idx) => (
            <span key={`dup-${idx}`} className="inline-block text-red-400 font-bold text-sm">
              🔴 {cve}
            </span>
          ))}
        </div>
      </div>

      {/* Intelligence Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight flex items-center gap-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <Sparkles className="w-10 h-10 text-cyber-blue drop-shadow-[0_0_10px_rgba(0,163,255,0.8)] animate-pulse" />
              CYBER NEWS // INTELLIGENCE TICKER
            </h1>
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Real-time threat intelligence and security updates • Live CVE monitoring
            </p>
          </div>

          {/* Refresh Button */}
          <button
            onClick={refreshNews}
            disabled={refreshing}
            className="btn-refresh group"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'refreshing' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            {refreshing ? 'Refreshing...' : 'Refresh News'}
          </button>
        </div>

        {/* Search and Filters */}
        <div className="glass p-6 cosmic-glow">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-cosmic-purple hover:text-cosmic-blue transition-colors mb-4"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-down">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Severity Filter */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Severity</label>
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="input-field"
                >
                  {severities.map(sev => (
                    <option key={sev} value={sev}>{sev}</option>
                  ))}
                </select>
              </div>

              {/* Industry Filter */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Industry</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="input-field"
                >
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Total Articles</p>
                <p className="text-3xl font-bold text-text-primary mt-1">{filteredArticles.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Critical Alerts</p>
                <p className="text-3xl font-bold text-text-primary mt-1">
                  {filteredArticles.filter(a => a.severity === 'Critical').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center animate-pulse-glow">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Trending</p>
                <p className="text-3xl font-bold text-text-primary mt-1">
                  {filteredArticles.filter(a => a.trending).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-cosmic-cyan to-cosmic-blue rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* News Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="glass p-6 shimmer h-64"></div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="glass p-12 text-center">
            <Sparkles className="w-16 h-16 text-cosmic-purple mx-auto mb-4 opacity-50" />
            <p className="text-text-secondary text-lg">No articles found matching your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <div
                key={article.id}
                className="news-card animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedArticle(article)}
              >
                {/* TOP SECRET / URGENT Tag for Critical Severity */}
                {article.severity === 'Critical' && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-900 to-red-700 px-4 py-2 rounded-lg flex items-center gap-2 border-2 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse">
                    <AlertTriangle className="w-4 h-4 text-red-200" />
                    <span className="text-xs font-black text-red-100 uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      🔴 TOP SECRET
                    </span>
                  </div>
                )}

                {/* Trending Badge */}
                {article.trending && !article.severity.includes('Critical') && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-cosmic-pink to-cosmic-orange px-3 py-1 rounded-full flex items-center gap-1 animate-pulse-glow">
                    <TrendingUp className="w-3 h-3 text-white" />
                    <span className="text-xs font-semibold text-white">Trending</span>
                  </div>
                )}

                {/* Severity Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r ${getSeverityColor(article.severity)} text-white text-sm font-semibold mb-3`}>
                  <AlertTriangle className="w-4 h-4" />
                  {article.severity}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 hover:text-cosmic-purple transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readingTime} min read
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {article.views.toLocaleString()} views
                  </div>
                </div>

                {/* Category & CVEs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-dark-600 rounded-lg text-xs text-cosmic-purple">
                    {getCategoryIcon(article.primaryCategory)}
                    {article.primaryCategory}
                  </span>
                  {article.cveIds.slice(0, 2).map(cve => (
                    <span key={cve} className="px-2 py-1 bg-dark-600 rounded-lg text-xs text-cosmic-cyan font-mono">
                      {cve}
                    </span>
                  ))}
                </div>

                {/* Source */}
                <div className="flex items-center justify-between pt-4 border-t border-dark-500">
                  <span className="text-sm text-text-muted">{article.sourceName}</span>
                  <ExternalLink className="w-4 h-4 text-cosmic-purple" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="modal-backdrop" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-dark-700 border-b border-cosmic-purple/30 p-6 flex items-start justify-between z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getSeverityColor(selectedArticle.severity)} text-white text-sm font-semibold`}>
                    {selectedArticle.severity}
                  </div>
                  {selectedArticle.trending && (
                    <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-cosmic-pink to-cosmic-orange text-white text-sm font-semibold flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Trending
                    </div>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-text-primary mb-2">{selectedArticle.title}</h2>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span>{selectedArticle.sourceName}</span>
                  <span>•</span>
                  <span>{selectedArticle.readingTime} min read</span>
                  <span>•</span>
                  <span>{selectedArticle.views.toLocaleString()} views</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="ml-4 p-2 hover:bg-dark-600 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-text-secondary" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-primary mb-3">Summary</h3>
                <p className="text-text-secondary leading-relaxed">{selectedArticle.summary}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Category */}
                <div className="glass p-4">
                  <h4 className="text-sm font-semibold text-text-muted mb-2">Category</h4>
                  <div className="flex items-center gap-2 text-cosmic-purple">
                    {getCategoryIcon(selectedArticle.primaryCategory)}
                    <span className="font-medium">{selectedArticle.primaryCategory}</span>
                  </div>
                </div>

                {/* Attack Type */}
                <div className="glass p-4">
                  <h4 className="text-sm font-semibold text-text-muted mb-2">Attack Type</h4>
                  <span className="font-medium text-text-primary">{selectedArticle.attackType}</span>
                </div>

                {/* Industries */}
                <div className="glass p-4">
                  <h4 className="text-sm font-semibold text-text-muted mb-2">Affected Industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.affectedIndustries.map(industry => (
                      <span key={industry} className="px-2 py-1 bg-dark-600 rounded-lg text-sm text-text-primary">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CVEs */}
                {selectedArticle.cveIds.length > 0 && (
                  <div className="glass p-4">
                    <h4 className="text-sm font-semibold text-text-muted mb-2">CVE IDs</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.cveIds.map(cve => (
                        <span key={cve} className="px-2 py-1 bg-dark-600 rounded-lg text-sm text-cosmic-cyan font-mono">
                          {cve}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <a
                  href={selectedArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 text-center"
                >
                  <ExternalLink className="w-5 h-5 inline mr-2" />
                  Read Full Article
                </a>
                <button className="btn-secondary">
                  <Bookmark className="w-5 h-5 inline mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
