#!/usr/bin/env python3
"""
Populate Firebase with sample cybersecurity news articles
Uses Firebase REST API (no Admin SDK required)
"""

import requests
import json
from datetime import datetime, timedelta
import random
import sys

# Firebase configuration (from .env file)
FIREBASE_CONFIG = {
    'apiKey': 'AIzaSyCgKcJgyfQwvNDQ9umPsmWwfdGwfnf00Dc',
    'projectId': 'cybersecurity-85e86',
    'databaseURL': 'https://cybersecurity-85e86.firebaseio.com'
}

FIRESTORE_URL = f"https://firestore.googleapis.com/v1/projects/{FIREBASE_CONFIG['projectId']}/databases/(default)/documents"

def create_sample_articles():
    """Create sample cybersecurity news articles"""
    now = datetime.now()
    
    articles = [
        {
            'title': 'Critical Zero-Day Vulnerability Discovered in Apache Log4j',
            'url': 'https://www.bleepingcomputer.com/news/security/critical-log4j-vulnerability/',
            'sourceName': 'BleepingComputer',
            'sourceWebsite': 'https://www.bleepingcomputer.com',
            'sourceLogo': 'https://www.bleepingcomputer.com/images/bleeping-logo.png',
            'author': 'Lawrence Abrams',
            'publishedDate': (now - timedelta(hours=2)).isoformat(),
            'summary': 'A critical zero-day vulnerability in Apache Log4j library is being actively exploited in the wild, affecting millions of Java applications worldwide.',
            'excerpt': 'A critical zero-day vulnerability in Apache Log4j library is being actively exploited...',
            'fullContent': 'Security researchers have discovered a critical remote code execution vulnerability in the widely-used Apache Log4j logging library.',
            'imageUrl': 'https://www.bleepstatic.com/content/hl-images/2021/12/10/Log4j.jpg',
            'tags': ['vulnerability', 'zero-day', 'apache', 'log4j'],
            'primaryCategory': 'Vulnerability',
            'severity': 'Critical',
            'cveIds': ['CVE-2021-44228'],
            'affectedIndustries': ['Technology', 'Finance', 'Healthcare'],
            'views': random.randint(500, 2000),
            'readingTime': 5,
            'trending': True
        },
        {
            'title': 'Ransomware Gang Targets Healthcare Organizations',
            'url': 'https://www.bleepingcomputer.com/news/security/ransomware-healthcare/',
            'sourceName': 'BleepingComputer',
            'sourceWebsite': 'https://www.bleepingcomputer.com',
            'sourceLogo': 'https://www.bleepingcomputer.com/images/bleeping-logo.png',
            'author': 'Bill Toulas',
            'publishedDate': (now - timedelta(hours=5)).isoformat(),
            'summary': 'A sophisticated ransomware group has been targeting healthcare organizations across North America, encrypting patient data.',
            'excerpt': 'A sophisticated ransomware group has been targeting healthcare organizations...',
            'fullContent': 'Cybersecurity researchers have identified a new ransomware campaign specifically targeting healthcare providers.',
            'imageUrl': 'https://www.bleepstatic.com/content/hl-images/2023/ransomware.jpg',
            'tags': ['ransomware', 'healthcare', 'malware'],
            'primaryCategory': 'Incident Report',
            'severity': 'High',
            'cveIds': [],
            'affectedIndustries': ['Healthcare'],
            'views': random.randint(300, 1500),
            'readingTime': 7,
            'trending': True
        },
        {
            'title': 'CISA Releases Emergency Directive for Federal Agencies',
            'url': 'https://www.cisa.gov/news/emergency-directive',
            'sourceName': 'CISA',
            'sourceWebsite': 'https://www.cisa.gov',
            'sourceLogo': 'https://www.cisa.gov/sites/default/files/cisa_logo.png',
            'author': 'CISA',
            'publishedDate': (now - timedelta(hours=8)).isoformat(),
            'summary': 'CISA has issued an emergency directive requiring all federal agencies to patch critical vulnerabilities within 24 hours.',
            'excerpt': 'CISA has issued an emergency directive requiring all federal agencies...',
            'fullContent': 'The Cybersecurity and Infrastructure Security Agency (CISA) has released an emergency directive.',
            'imageUrl': 'https://www.cisa.gov/sites/default/files/emergency-directive.jpg',
            'tags': ['cisa', 'government', 'directive'],
            'primaryCategory': 'Threat Intelligence',
            'severity': 'Critical',
            'cveIds': [],
            'affectedIndustries': ['Government'],
            'views': random.randint(800, 2500),
            'readingTime': 4,
            'trending': False
        },
        {
            'title': 'New Phishing Campaign Targets Financial Institutions',
            'url': 'https://www.bleepingcomputer.com/news/security/phishing-campaign/',
            'sourceName': 'BleepingComputer',
            'sourceWebsite': 'https://www.bleepingcomputer.com',
            'sourceLogo': 'https://www.bleepingcomputer.com/images/bleeping-logo.png',
            'author': 'Sergiu Gatlan',
            'publishedDate': (now - timedelta(hours=12)).isoformat(),
            'summary': 'Security researchers have uncovered a sophisticated phishing campaign targeting employees of major financial institutions.',
            'excerpt': 'Security researchers have uncovered a sophisticated phishing campaign...',
            'fullContent': 'A new phishing campaign is using advanced social engineering techniques.',
            'imageUrl': 'https://www.bleepstatic.com/content/hl-images/2023/phishing.jpg',
            'tags': ['phishing', 'social-engineering', 'finance'],
            'primaryCategory': 'Threat Intelligence',
            'severity': 'Medium',
            'cveIds': [],
            'affectedIndustries': ['Finance'],
            'views': random.randint(200, 800),
            'readingTime': 6,
            'trending': False
        },
        {
            'title': 'Microsoft Patches 100+ Vulnerabilities in December Update',
            'url': 'https://www.bleepingcomputer.com/news/microsoft/patch-tuesday/',
            'sourceName': 'BleepingComputer',
            'sourceWebsite': 'https://www.bleepingcomputer.com',
            'sourceLogo': 'https://www.bleepingcomputer.com/images/bleeping-logo.png',
            'author': 'Lawrence Abrams',
            'publishedDate': (now - timedelta(days=1)).isoformat(),
            'summary': 'Microsoft has released its December Patch Tuesday update, addressing over 100 vulnerabilities.',
            'excerpt': 'Microsoft has released its December Patch Tuesday update...',
            'fullContent': 'Microsoft has released its monthly security update for December.',
            'imageUrl': 'https://www.bleepstatic.com/content/hl-images/2023/microsoft-patch.jpg',
            'tags': ['microsoft', 'patch-tuesday', 'windows'],
            'primaryCategory': 'News',
            'severity': 'High',
            'cveIds': ['CVE-2023-12345', 'CVE-2023-12346'],
            'affectedIndustries': ['Technology'],
            'views': random.randint(400, 1200),
            'readingTime': 8,
            'trending': False
        }
    ]
    
    return articles

print("=" * 80)
print("CyberTrack News Populator")
print("=" * 80)
print("\nThis script will add sample cybersecurity news to your Firebase database.")
print("Note: This uses the Firebase REST API (no Admin SDK required)\n")

articles = create_sample_articles()
print(f"Created {len(articles)} sample articles\n")
print("✓ Sample data created successfully!")
print("\nTo add these to Firebase, you'll need to:")
print("1. Run the frontend app (npm run dev)")
print("2. The News page will load sample data automatically")
print("3. Or manually add via Firebase Console")

