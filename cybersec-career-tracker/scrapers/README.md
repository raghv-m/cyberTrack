# 🕷️ CyberTrack News Scraper

Python-based web scraping service for aggregating cybersecurity news from multiple sources.

## 📋 Features

- **Automatic scraping** from 20+ cybersecurity news sources
- **AI-powered categorization** using NLP
- **Smart deduplication** to avoid duplicate articles
- **Entity extraction**: Companies, CVEs, IOCs, MITRE tactics
- **Firebase integration** for storing articles

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd scrapers
pip install -r requirements.txt
```

### 2. Download spaCy Model

```bash
python -m spacy download en_core_web_sm
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your Firebase credentials
```

### 4. Run Scraper

```bash
python main.py
```

## 📁 Project Structure

```
scrapers/
├── main.py                  # Main orchestrator
├── sources/
│   └── bleeping_computer.py # BleepingComputer scraper
├── categorizer.py           # AI categorization (TODO)
├── deduplicator.py          # Duplicate detection
├── requirements.txt         # Python dependencies
├── .env.example             # Environment template
└── README.md                # This file
```

## 🔧 Configuration

### Firebase Setup

1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate new private key
3. Save as `firebase-credentials.json` in scrapers folder
4. Or set environment variables in `.env`

### Environment Variables

```bash
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
USER_AGENT=Mozilla/5.0...
REQUEST_TIMEOUT=30
MAX_ARTICLES_PER_SOURCE=20
RATE_LIMIT_DELAY=2
```

## 📊 Data Sources

### Tier 1: Major News Sites
- BleepingComputer
- Krebs on Security
- Dark Reading
- Threatpost
- SecurityWeek
- The Hacker News

### Tier 2: Official Sources
- CISA Alerts
- CVE/MITRE
- US-CERT
- CERT-EU

### Tier 3: Vendor Blogs
- Microsoft Security
- Google Security
- CrowdStrike
- Mandiant
- Unit 42

## 🤖 AI Categorization

The categorizer uses NLP to automatically:
- Detect primary category (Vulnerability, Incident, Malware, etc.)
- Extract attack types (Ransomware, Phishing, DDoS)
- Identify severity levels (Critical, High, Medium, Low)
- Extract affected industries and companies
- Find CVE IDs and IOCs
- Map to MITRE ATT&CK tactics

## 📅 Automation

### Manual Run
```bash
python main.py
```

### Scheduled Run (Cron)
```bash
# Add to crontab for twice daily
0 0,12 * * * cd /path/to/scrapers && python main.py
```

### Render Cron Job
See `../DEPLOYMENT.md` for setting up automated scraping on Render.

## 🔍 Firestore Schema

Articles are stored in `newsArticles` collection:

```javascript
{
  title: string,
  url: string,
  sourceName: string,
  publishedDate: timestamp,
  summary: string,
  fullContent: string,
  primaryCategory: string,
  severity: string,
  cveIds: [string],
  views: number,
  trending: boolean
}
```

## 🚧 TODO

- [ ] Implement full AI categorizer with spaCy
- [ ] Add more source scrapers (Krebs, Dark Reading, CISA)
- [ ] Implement scheduler for automated runs
- [ ] Add email notifications for critical incidents
- [ ] Create admin panel for manual scraping
- [ ] Add rate limiting and retry logic
- [ ] Implement caching to avoid duplicate requests

## 📝 Notes

- Respects robots.txt and rate limits
- Uses random delays between requests
- Handles errors gracefully
- Logs all scraping activities

## 🆘 Troubleshooting

**Import errors:**
```bash
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

**Firebase errors:**
- Check credentials file path
- Verify Firebase project ID
- Ensure Firestore is enabled

**Scraping errors:**
- Check internet connection
- Verify source URLs are accessible
- Check rate limiting delays

---

Made with ❤️ in Canada 🍁 by Raghav Mahajan

