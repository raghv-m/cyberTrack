#!/usr/bin/env python3
"""BleepingComputer RSS Scraper"""

import feedparser
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)

class BleepingComputerScraper:
    def __init__(self):
        self.source_name = "BleepingComputer"
        self.rss_url = "https://www.bleepingcomputer.com/feed/"
        self.base_url = "https://www.bleepingcomputer.com"
        self.logo_url = "https://www.bleepingcomputer.com/images/bleeping-logo.png"
    
    def scrape(self) -> List[Dict]:
        """Scrape articles from BleepingComputer"""
        articles = []
        
        try:
            # Parse RSS feed
            feed = feedparser.parse(self.rss_url)
            
            for entry in feed.entries[:20]:  # Limit to 20 most recent
                try:
                    article = self._parse_entry(entry)
                    if article:
                        articles.append(article)
                except Exception as e:
                    logger.error(f"Error parsing entry: {e}")
            
        except Exception as e:
            logger.error(f"Error scraping BleepingComputer: {e}")
        
        return articles
    
    def _parse_entry(self, entry) -> Dict:
        """Parse individual RSS entry"""
        # Get full article content
        full_content, image_url = self._scrape_full_article(entry.link)
        
        article = {
            'title': entry.title,
            'url': entry.link,
            'sourceWebsite': self.base_url,
            'sourceName': self.source_name,
            'sourceLogo': self.logo_url,
            'author': entry.get('author', 'BleepingComputer Staff'),
            'publishedDate': self._parse_date(entry.published),
            'summary': entry.summary,
            'excerpt': entry.summary[:200] + '...' if len(entry.summary) > 200 else entry.summary,
            'fullContent': full_content,
            'imageUrl': image_url,
            'tags': [tag.term for tag in entry.get('tags', [])],
        }
        
        return article
    
    def _scrape_full_article(self, url: str) -> tuple:
        """Scrape full article content from article page"""
        try:
            response = requests.get(url, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find article content
            article_body = soup.find('div', class_='articleBody')
            content = article_body.get_text(strip=True) if article_body else ''
            
            # Find featured image
            image = soup.find('meta', property='og:image')
            image_url = image['content'] if image else ''
            
            return content, image_url
            
        except Exception as e:
            logger.error(f"Error scraping full article {url}: {e}")
            return '', ''
    
    def _parse_date(self, date_string: str) -> datetime:
        """Parse date string to datetime"""
        try:
            return datetime.strptime(date_string, '%a, %d %b %Y %H:%M:%S %z')
        except:
            return datetime.now()

