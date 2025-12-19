#!/usr/bin/env python3
import feedparser
import json
import time
from datetime import datetime

# List of RSS feeds focused on cybersecurity incidents
rss_feeds = [
    "https://feeds.feedburner.com/TheHackersNews",
    "https://www.darkreading.com/rss.xml",
    "https://krebsonsecurity.com/feed/",
    "https://gbhackers.com/feed/",
    "https://www.csoonline.com/feed/",
    "https://threatpost.com/feed/",
    "https://www.cisa.gov/uscert/ncas/alerts.xml",
    "https://www.bankinfosecurity.com/rss-feeds",
    "https://www.cyberdefensemagazine.com/feed/",
    "https://www.itsecurityguru.org/feed/",
    "https://searchsecurity.techtarget.com/rss/Security-Wire-Daily-News.xml",
    "https://hackread.com/feed/",
    "https://grahamcluley.com/feed/",
    "https://thecyberpost.com/feed/",
    "https://www.cshub.com/rss"
]

# Keywords to filter for incidents/reports
incident_keywords = ["incident", "breach", "attack", "vulnerability", "exploit", "ransomware", "malware", "cyberattack", "data leak"]

def fetch_news():
    all_news = []
    print("=" * 60)
    print("  Fetching Real Cybersecurity News")
    print("=" * 60)
    
    for feed_url in rss_feeds:
        try:
            print(f"\n📡 Fetching: {feed_url}")
            feed = feedparser.parse(feed_url)
            count = 0
            
            for entry in feed.entries:
                title = entry.get("title", "No Title")
                summary = entry.get("summary", "No Summary")
                link = entry.get("link", "No Link")
                pub_date = entry.get("published", datetime.now().isoformat())
                
                # Filter for relevant content
                if any(keyword.lower() in title.lower() or keyword.lower() in summary.lower() for keyword in incident_keywords):
                    all_news.append({
                        "title": title,
                        "summary": summary,
                        "link": link,
                        "published": pub_date,
                        "source": feed.feed.get("title", feed_url)
                    })
                    count += 1
            
            print(f"  ✅ Found {count} relevant articles")
            time.sleep(2)  # Delay to avoid rate limiting
            
        except Exception as e:
            print(f"  ❌ Error: {e}")
    
    # Sort by date (newest first)
    all_news.sort(key=lambda x: x["published"], reverse=True)
    
    # Save to JSON for React app
    output_file = "../public/cyber_news.json"
    with open(output_file, "w", encoding='utf-8') as f:
        json.dump(all_news, f, indent=4, ensure_ascii=False)
    
    print("\n" + "=" * 60)
    print(f"✅ Fetched {len(all_news)} news items!")
    print(f"📁 Saved to: {output_file}")
    print("=" * 60)
    
    return all_news

# Run the function
if __name__ == "__main__":
    news = fetch_news()
    
    # Print first 5 articles as preview
    print("\n📰 Preview of Latest Articles:\n")
    for i, article in enumerate(news[:5], 1):
        print(f"{i}. {article['title']}")
        print(f"   Source: {article['source']}")
        print(f"   Link: {article['link']}\n")

