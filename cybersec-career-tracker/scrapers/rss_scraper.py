#!/usr/bin/env python3
"""
CyberTrack RSS News Scraper
Fetches real cybersecurity news from multiple RSS feeds and populates Firebase
"""

import feedparser
import requests
import json
from datetime import datetime, timedelta
import time
import re
import hashlib
from urllib.parse import urlparse

# Firebase configuration
FIREBASE_CONFIG = {
    'apiKey': 'AIzaSyCgKcJgyfQwvNDQ9umPsmWwfdGwfnf00Dc',
    'projectId': 'cybersecurity-85e86',
}

FIRESTORE_URL = f"https://firestore.googleapis.com/v1/projects/{FIREBASE_CONFIG['projectId']}/databases/(default)/documents"

# RSS Feed Sources
RSS_FEEDS = [
    {'name': 'The Hacker News', 'url': 'https://feeds.feedburner.com/TheHackersNews', 'category': 'News', 'severity': 'High'},
    {'name': 'Dark Reading', 'url': 'https://www.darkreading.com/rss.xml', 'category': 'Threat Intelligence', 'severity': 'High'},
    {'name': 'Krebs on Security', 'url': 'https://krebsonsecurity.com/feed/', 'category': 'Incident Report', 'severity': 'High'},
    {'name': 'GBHackers', 'url': 'https://gbhackers.com/feed/', 'category': 'News', 'severity': 'Medium'},
    {'name': 'CSO Online', 'url': 'https://www.csoonline.com/feed/', 'category': 'News', 'severity': 'Medium'},
    {'name': 'Threatpost', 'url': 'https://threatpost.com/feed/', 'category': 'Malware Analysis', 'severity': 'High'},
    {'name': 'HackRead', 'url': 'https://hackread.com/feed/', 'category': 'News', 'severity': 'Medium'},
    {'name': 'Graham Cluley', 'url': 'https://grahamcluley.com/feed/', 'category': 'News', 'severity': 'Low'},
    {'name': 'The Cyber Post', 'url': 'https://thecyberpost.com/feed/', 'category': 'Incident Report', 'severity': 'High'},
]

# Industry keywords
INDUSTRY_KEYWORDS = {
    'Healthcare': ['hospital', 'health', 'medical', 'patient', 'healthcare'],
    'Finance': ['bank', 'financial', 'payment', 'credit', 'fintech', 'crypto'],
    'Government': ['government', 'federal', 'military', 'defense', 'agency'],
    'Education': ['university', 'school', 'education', 'student', 'college'],
    'Retail': ['retail', 'store', 'shopping', 'ecommerce'],
    'Technology': ['software', 'tech', 'cloud', 'saas', 'microsoft', 'google']
}

def detect_industry(text):
    """Detect industry from article text"""
    text_lower = text.lower()
    for industry, keywords in INDUSTRY_KEYWORDS.items():
        if any(keyword in text_lower for keyword in keywords):
            return industry
    return 'Technology'

def extract_cve(text):
    """Extract CVE IDs from text"""
    cve_pattern = r'CVE-\d{4}-\d{4,7}'
    cves = re.findall(cve_pattern, text, re.IGNORECASE)
    return list(set(cves))[:3]  # Max 3 CVEs

def generate_article_id(url):
    """Generate unique ID from URL"""
    return hashlib.md5(url.encode()).hexdigest()[:20]

def convert_to_firestore_format(data):
    """Convert Python dict to Firestore REST API format"""
    def convert_value(value):
        if isinstance(value, str):
            return {'stringValue': value}
        elif isinstance(value, int):
            return {'integerValue': str(value)}
        elif isinstance(value, bool):
            return {'booleanValue': value}
        elif isinstance(value, list):
            return {'arrayValue': {'values': [convert_value(v) for v in value]}}
        elif isinstance(value, dict):
            return {'mapValue': {'fields': {k: convert_value(v) for k, v in value.items()}}}
        else:
            return {'stringValue': str(value)}

    return {'fields': {k: convert_value(v) for k, v in data.items()}}

def fetch_rss_feed(feed_info):
    """Fetch and parse RSS feed"""
    print(f"📡 Fetching {feed_info['name']}...")
    try:
        feed = feedparser.parse(feed_info['url'])
        articles = []

        for entry in feed.entries[:5]:  # Get latest 5 articles per feed
            # Parse published date
            pub_date = datetime.now()
            if hasattr(entry, 'published_parsed') and entry.published_parsed:
                pub_date = datetime(*entry.published_parsed[:6])

            # Extract content
            summary = entry.get('summary', entry.get('description', ''))[:500]
            title = entry.get('title', 'No Title')
            link = entry.get('link', '')

            # Detect industry and CVEs
            full_text = f"{title} {summary}"
            industry = detect_industry(full_text)
            cves = extract_cve(full_text)

            article = {
                'title': title,
                'url': link,
                'sourceName': feed_info['name'],
                'sourceWebsite': feed_info['url'],
                'publishedDate': pub_date.isoformat(),
                'summary': summary,
                'excerpt': summary[:200] + '...' if len(summary) > 200 else summary,
                'primaryCategory': feed_info['category'],
                'severity': feed_info['severity'],
                'industry': industry,
                'cveIds': cves,
                'tags': [feed_info['category'].lower(), industry.lower()],
                'views': 0,
                'trending': feed_info['severity'] in ['Critical', 'High'],
                'createdAt': datetime.now().isoformat(),
                'articleId': generate_article_id(link)
            }

            articles.append(article)

        print(f"  ✅ Found {len(articles)} articles")
        return articles

    except Exception as e:
        print(f"  ❌ Error: {e}")
        return []

def upload_to_firebase(articles):
    """Upload articles to Firebase using REST API"""
    print(f"\n📤 Uploading {len(articles)} articles to Firebase...")

    uploaded = 0
    for article in articles:
        try:
            doc_id = article['articleId']
            url = f"{FIRESTORE_URL}/newsArticles/{doc_id}?key={FIREBASE_CONFIG['apiKey']}"

            firestore_data = convert_to_firestore_format(article)

            response = requests.patch(url, json=firestore_data)

            if response.status_code in [200, 201]:
                uploaded += 1
                print(f"  ✅ {article['title'][:60]}...")
            else:
                print(f"  ❌ Failed: {response.status_code}")

        except Exception as e:
            print(f"  ❌ Error uploading: {e}")

    return uploaded


def main():
    """Main function to scrape and upload news"""
    print("=" * 60)
    print("  CyberTrack RSS News Scraper")
    print("=" * 60)
    print(f"📰 Scraping from {len(RSS_FEEDS)} sources...\n")

    all_articles = []

    for feed in RSS_FEEDS:
        articles = fetch_rss_feed(feed)
        all_articles.extend(articles)
        time.sleep(1)  # Be nice to servers

    print(f"\n📊 Total articles collected: {len(all_articles)}")

    if all_articles:
        uploaded = upload_to_firebase(all_articles)
        print(f"\n✅ Successfully uploaded {uploaded}/{len(all_articles)} articles!")
        print(f"🔥 Firebase Project: {FIREBASE_CONFIG['projectId']}")
        print(f"🌐 View at: http://localhost:5173/app/news")
    else:
        print("\n❌ No articles collected")

    print("\n" + "=" * 60)

if __name__ == '__main__':
    main()

