#!/usr/bin/env python3
"""
CyberTrack News Scraper - Main Orchestrator
Aggregates cybersecurity news from multiple sources and stores in Firebase
"""

import os
import sys
import time
import logging
from datetime import datetime
from typing import List, Dict
import firebase_admin
from firebase_admin import credentials, firestore
from sources.bleeping_computer import BleepingComputerScraper
from deduplicator import Deduplicator

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('scraper.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

class NewsScraperOrchestrator:
    """Main orchestrator for news scraping"""
    
    def __init__(self):
        self.db = None
        self.deduplicator = Deduplicator()
        self.scrapers = []
        self.initialize_firebase()
        self.initialize_scrapers()
    
    def initialize_firebase(self):
        """Initialize Firebase Admin SDK"""
        try:
            # Check if already initialized
            if not firebase_admin._apps:
                cred_path = os.getenv('FIREBASE_CREDENTIALS_PATH', './firebase-credentials.json')
                
                if os.path.exists(cred_path):
                    cred = credentials.Certificate(cred_path)
                    firebase_admin.initialize_app(cred)
                    logger.info("Firebase initialized with credentials file")
                else:
                    # Try to initialize with environment variables
                    firebase_admin.initialize_app()
                    logger.info("Firebase initialized with default credentials")
            
            self.db = firestore.client()
            logger.info("Firestore client initialized")
        except Exception as e:
            logger.error(f"Failed to initialize Firebase: {e}")
            raise
    
    def initialize_scrapers(self):
        """Initialize all news source scrapers"""
        self.scrapers = [
            BleepingComputerScraper()
        ]
        logger.info(f"Initialized {len(self.scrapers)} scrapers")
    
    def scrape_all_sources(self) -> List[Dict]:
        """Scrape all configured news sources"""
        all_articles = []
        
        for scraper in self.scrapers:
            try:
                logger.info(f"Scraping {scraper.source_name}...")
                articles = scraper.scrape()
                logger.info(f"Found {len(articles)} articles from {scraper.source_name}")
                all_articles.extend(articles)
                
                # Rate limiting between sources
                time.sleep(2)
            except Exception as e:
                logger.error(f"Error scraping {scraper.source_name}: {e}")
                continue
        
        return all_articles
    
    def deduplicate_articles(self, articles: List[Dict]) -> List[Dict]:
        """Remove duplicate articles"""
        logger.info(f"Deduplicating {len(articles)} articles...")
        unique_articles = self.deduplicator.deduplicate(articles)
        logger.info(f"After deduplication: {len(unique_articles)} unique articles")
        return unique_articles
    
    def save_to_firestore(self, articles: List[Dict]):
        """Save articles to Firestore"""
        saved_count = 0
        skipped_count = 0
        
        for article in articles:
            try:
                # Check if article already exists
                existing = self.db.collection('newsArticles').where('url', '==', article['url']).limit(1).get()
                
                if len(list(existing)) > 0:
                    logger.debug(f"Article already exists: {article['title']}")
                    skipped_count += 1
                    continue
                
                # Add metadata
                article['scrapedAt'] = firestore.SERVER_TIMESTAMP
                article['views'] = 0
                article['trending'] = False
                
                # Save to Firestore
                self.db.collection('newsArticles').add(article)
                saved_count += 1
                logger.info(f"Saved: {article['title']}")
                
            except Exception as e:
                logger.error(f"Error saving article '{article.get('title', 'Unknown')}': {e}")
                continue
        
        logger.info(f"Saved {saved_count} new articles, skipped {skipped_count} duplicates")
        return saved_count, skipped_count
    
    def run(self):
        """Main execution method"""
        start_time = time.time()
        logger.info("=" * 80)
        logger.info("Starting CyberTrack News Scraper")
        logger.info("=" * 80)
        
        try:
            # Step 1: Scrape all sources
            articles = self.scrape_all_sources()
            
            if not articles:
                logger.warning("No articles found from any source")
                return
            
            # Step 2: Deduplicate
            unique_articles = self.deduplicate_articles(articles)
            
            # Step 3: Save to Firestore
            saved, skipped = self.save_to_firestore(unique_articles)
            
            # Summary
            elapsed_time = time.time() - start_time
            logger.info("=" * 80)
            logger.info("Scraping Complete!")
            logger.info(f"Total articles scraped: {len(articles)}")
            logger.info(f"Unique articles: {len(unique_articles)}")
            logger.info(f"Saved to database: {saved}")
            logger.info(f"Skipped (already exists): {skipped}")
            logger.info(f"Time elapsed: {elapsed_time:.2f} seconds")
            logger.info("=" * 80)
            
        except Exception as e:
            logger.error(f"Fatal error during scraping: {e}", exc_info=True)
            raise

if __name__ == "__main__":
    try:
        orchestrator = NewsScraperOrchestrator()
        orchestrator.run()
    except KeyboardInterrupt:
        logger.info("Scraping interrupted by user")
        sys.exit(0)
    except Exception as e:
        logger.error(f"Fatal error: {e}", exc_info=True)
        sys.exit(1)

