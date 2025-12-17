#!/usr/bin/env python3
"""Article deduplication system"""

import hashlib
from typing import Dict
from datetime import datetime, timedelta

class ArticleDeduplicator:
    def __init__(self, db):
        self.db = db
        self.cache = {}  # In-memory cache for current session
    
    def generate_article_id(self, url: str) -> str:
        """Generate unique ID from URL"""
        return hashlib.md5(url.encode()).hexdigest()
    
    def is_duplicate(self, article: Dict) -> bool:
        """Check if article already exists in database"""
        article_id = self.generate_article_id(article['url'])
        
        # Check cache first
        if article_id in self.cache:
            return True
        
        # Check Firestore
        doc_ref = self.db.collection('newsArticles').document(article_id)
        doc = doc_ref.get()
        
        if doc.exists:
            self.cache[article_id] = True
            return True
        
        # Check for similar titles (fuzzy matching)
        if self._has_similar_title(article['title']):
            return True
        
        return False
    
    def _has_similar_title(self, title: str) -> bool:
        """Check for articles with very similar titles"""
        # Query recent articles (last 7 days)
        cutoff_date = datetime.now() - timedelta(days=7)
        
        articles_ref = self.db.collection('newsArticles')
        query = articles_ref.where('scrapedDate', '>=', cutoff_date).limit(100)
        
        try:
            docs = query.get()
            for doc in docs:
                existing_title = doc.to_dict().get('title', '')
                if self._similarity_score(title, existing_title) > 0.85:
                    return True
        except Exception as e:
            print(f"Error checking similar titles: {e}")
        
        return False
    
    def _similarity_score(self, str1: str, str2: str) -> float:
        """Calculate similarity between two strings (simple Jaccard similarity)"""
        set1 = set(str1.lower().split())
        set2 = set(str2.lower().split())
        
        if not set1 or not set2:
            return 0.0
        
        intersection = set1.intersection(set2)
        union = set1.union(set2)
        
        return len(intersection) / len(union)

