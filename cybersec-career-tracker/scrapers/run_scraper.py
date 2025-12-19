#!/usr/bin/env python3
"""
Quick script to run the news scraper and populate Firebase with cybersecurity news
"""

import os
import sys
from datetime import datetime, timedelta
import random

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    import firebase_admin
    from firebase_admin import credentials, firestore
    print("✓ Firebase Admin SDK imported successfully")
except ImportError:
    print("✗ Error: firebase-admin not installed")
    print("  Run: pip install firebase-admin")
    sys.exit(1)

def initialize_firebase():
    """Initialize Firebase"""
    try:
        if not firebase_admin._apps:
            # Try to use default credentials or service account
            firebase_admin.initialize_app()
            print("✓ Firebase initialized with default credentials")
        
        db = firestore.client()
        print("✓ Firestore client initialized")
        return db
    except Exception as e:
        print(f"✗ Error initializing Firebase: {e}")
        print("\nTo fix this:")
        print("1. Download your Firebase service account key from Firebase Console")
        print("2. Save it as 'firebase-credentials.json' in the scrapers folder")
        print("3. Or set GOOGLE_APPLICATION_CREDENTIALS environment variable")
        sys.exit(1)

def add_sample_news(db):
    """Add sample cybersecurity news articles"""
    print("\n📰 Adding sample cybersecurity news articles...")
    
    sample_articles = [
        {
            'title': 'Critical Zero-Day Vulnerability Discovered in Apache Log4j',
            'url': 'https://www.bleepingcomputer.com/news/security/critical-log4j-vulnerability/',
            'sourceName': 'BleepingComputer',
            'sourceWebsite': 'https://www.bleepingcomputer.com',
            'sourceLogo': 'https://www.bleepingcomputer.com/images/bleeping-logo.png',
            'author': 'Lawrence Abrams',
            'publishedDate': datetime.now() - timedelta(hours=2),
            'summary': 'A critical zero-day vulnerability in Apache Log4j library is being actively exploited in the wild, affecting millions of Java applications worldwide.',
            'excerpt': 'A critical zero-day vulnerability in Apache Log4j library is being actively exploited...',
            'fullContent': 'Security researchers have discovered a critical remote code execution vulnerability in the widely-used Apache Log4j logging library. The vulnerability, tracked as CVE-2021-44228, allows attackers to execute arbitrary code on vulnerable systems.',
            'imageUrl': 'https://www.bleepstatic.com/content/hl-images/2021/12/10/Log4j.jpg',
            'tags': ['vulnerability', 'zero-day', 'apache', 'log4j'],
            'primaryCategory': 'Vulnerability',
            'severity': 'Critical',
            'cveIds': ['CVE-2021-44228'],
            'views': random.randint(100, 1000),
            'trending': True
        },
        {
            'title': 'Ransomware Gang Targets Healthcare Organizations',
            'url': 'https://www.bleepingcomputer.com/news/security/ransomware-healthcare/',
            'sourceName': 'BleepingComputer',
            'sourceWebsite': 'https://www.bleepingcomputer.com',
            'sourceLogo': 'https://www.bleepingcomputer.com/images/bleeping-logo.png',
            'author': 'Bill Toulas',
            'publishedDate': datetime.now() - timedelta(hours=5),
            'summary': 'A sophisticated ransomware group has been targeting healthcare organizations across North America, encrypting patient data and demanding millions in ransom.',
            'excerpt': 'A sophisticated ransomware group has been targeting healthcare organizations...',
            'fullContent': 'Cybersecurity researchers have identified a new ransomware campaign specifically targeting healthcare providers. The attackers are using advanced techniques to bypass security controls and encrypt critical patient data.',
            'imageUrl': 'https://www.bleepstatic.com/content/hl-images/2023/ransomware.jpg',
            'tags': ['ransomware', 'healthcare', 'malware'],
            'primaryCategory': 'Incident',
            'severity': 'High',
            'cveIds': [],
            'views': random.randint(50, 500),
            'trending': True
        },
        {
            'title': 'CISA Releases Emergency Directive for Federal Agencies',
            'url': 'https://www.cisa.gov/news/emergency-directive',
            'sourceName': 'CISA',
            'sourceWebsite': 'https://www.cisa.gov',
            'sourceLogo': 'https://www.cisa.gov/sites/default/files/cisa_logo.png',
            'author': 'CISA',
            'publishedDate': datetime.now() - timedelta(hours=8),
            'summary': 'CISA has issued an emergency directive requiring all federal agencies to patch critical vulnerabilities within 24 hours.',
            'excerpt': 'CISA has issued an emergency directive requiring all federal agencies...',
            'fullContent': 'The Cybersecurity and Infrastructure Security Agency (CISA) has released an emergency directive mandating immediate action from federal agencies to address critical vulnerabilities being actively exploited.',
            'imageUrl': 'https://www.cisa.gov/sites/default/files/emergency-directive.jpg',
            'tags': ['cisa', 'government', 'directive'],
            'primaryCategory': 'Alert',
            'severity': 'Critical',
            'cveIds': [],
            'views': random.randint(200, 800),
            'trending': False
        },
        {
            'title': 'New Phishing Campaign Targets Financial Institutions',
            'url': 'https://www.bleepingcomputer.com/news/security/phishing-campaign/',
            'sourceName': 'BleepingComputer',
            'sourceWebsite': 'https://www.bleepingcomputer.com',
            'sourceLogo': 'https://www.bleepingcomputer.com/images/bleeping-logo.png',
            'author': 'Sergiu Gatlan',
            'publishedDate': datetime.now() - timedelta(hours=12),
            'summary': 'Security researchers have uncovered a sophisticated phishing campaign targeting employees of major financial institutions worldwide.',
            'excerpt': 'Security researchers have uncovered a sophisticated phishing campaign...',
            'fullContent': 'A new phishing campaign is using advanced social engineering techniques to trick employees of financial institutions into revealing their credentials. The attackers are using convincing fake login pages and urgent messaging.',
            'imageUrl': 'https://www.bleepstatic.com/content/hl-images/2023/phishing.jpg',
            'tags': ['phishing', 'social-engineering', 'finance'],
            'primaryCategory': 'Threat',
            'severity': 'Medium',
            'cveIds': [],
            'views': random.randint(30, 300),
            'trending': False
        },
        {
            'title': 'Microsoft Patches 100+ Vulnerabilities in December Update',
            'url': 'https://www.bleepingcomputer.com/news/microsoft/patch-tuesday/',
            'sourceName': 'BleepingComputer',
            'sourceWebsite': 'https://www.bleepingcomputer.com',
            'sourceLogo': 'https://www.bleepingcomputer.com/images/bleeping-logo.png',
            'author': 'Lawrence Abrams',
            'publishedDate': datetime.now() - timedelta(days=1),
            'summary': 'Microsoft has released its December Patch Tuesday update, addressing over 100 vulnerabilities including several critical remote code execution flaws.',
            'excerpt': 'Microsoft has released its December Patch Tuesday update, addressing over 100...',
            'fullContent': 'Microsoft has released its monthly security update for December, patching 103 vulnerabilities across Windows, Office, and other products. Several of the vulnerabilities are rated as critical and are being actively exploited.',
            'imageUrl': 'https://www.bleepstatic.com/content/hl-images/2023/microsoft-patch.jpg',
            'tags': ['microsoft', 'patch-tuesday', 'windows'],
            'primaryCategory': 'Patch',
            'severity': 'High',
            'cveIds': ['CVE-2023-12345', 'CVE-2023-12346'],
            'views': random.randint(150, 600),
            'trending': False
        }
    ]
    
    saved_count = 0
    for article in sample_articles:
        try:
            # Check if article already exists
            existing = db.collection('newsArticles').where('url', '==', article['url']).limit(1).get()
            
            if len(list(existing)) > 0:
                print(f"  ⊘ Skipped (exists): {article['title'][:60]}...")
                continue
            
            # Add metadata
            article['scrapedAt'] = firestore.SERVER_TIMESTAMP
            
            # Save to Firestore
            db.collection('newsArticles').add(article)
            saved_count += 1
            print(f"  ✓ Saved: {article['title'][:60]}...")
            
        except Exception as e:
            print(f"  ✗ Error saving article: {e}")
            continue
    
    print(f"\n✓ Added {saved_count} sample articles to Firebase")

def main():
    print("=" * 80)
    print("CyberTrack News Scraper - Quick Setup")
    print("=" * 80)
    
    # Initialize Firebase
    db = initialize_firebase()
    
    # Add sample news
    add_sample_news(db)
    
    print("\n" + "=" * 80)
    print("✓ Setup complete! Your News page should now display articles.")
    print("=" * 80)
    print("\nNext steps:")
    print("1. Visit http://localhost:5173/app/news to see the articles")
    print("2. To scrape real news, run: python main.py")
    print("3. To automate scraping, set up a cron job or scheduled task")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nInterrupted by user")
        sys.exit(0)
    except Exception as e:
        print(f"\n✗ Fatal error: {e}")
        sys.exit(1)

