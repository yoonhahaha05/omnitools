#!/usr/bin/env python3
"""
OmniTools - IndexNow Automatic Search Engine Submission
Instantly submits all 108 URLs from sitemap.xml to Bing, Yandex, Seznam, and partner AI engines.
Protocol docs: https://www.indexnow.org/
"""

import sys
import re
import json
import urllib.request
import urllib.error

INDEXNOW_KEY = "e7d4a2b9f1c640e8a82d93e1b74c568a"
HOST = "getomnitools.com"
KEY_LOCATION = f"https://{HOST}/{INDEXNOW_KEY}.txt"
SITEMAP_PATH = "sitemap.xml"
API_ENDPOINT = "https://api.indexnow.org/indexnow"

def extract_urls_from_sitemap(sitemap_file):
    try:
        with open(sitemap_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading sitemap file '{sitemap_file}': {e}")
        sys.exit(1)
        
    urls = re.findall(r'<loc>(.*?)</loc>', content)
    return sorted(list(set(urls)))

def submit_indexnow(urls):
    print(f"Submitting {len(urls)} URLs to IndexNow ({API_ENDPOINT})...")
    payload = {
        "host": HOST,
        "key": INDEXNOW_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls
    }
    
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        API_ENDPOINT,
        data=data,
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "OmniTools-IndexNow-Submitter/1.0"
        },
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            status = resp.status
            print(f"✓ IndexNow API returned HTTP {status} (Success / Accepted for indexing)")
            return True
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='ignore')
        if e.code in (200, 202):
            print(f"✓ IndexNow API returned HTTP {e.code} (Success)")
            return True
        print(f"⚠ IndexNow API returned HTTP {e.code}: {body}")
        return False
    except Exception as e:
        print(f"⚠ Network error submitting to IndexNow: {e}")
        print("Note: The site must be live and the key file reachable at https://getomnitools.com/e7d4a2b9f1c640e8a82d93e1b74c568a.txt")
        return False

def main():
    print(f"=== OmniTools IndexNow Submitter ===")
    print(f"Host: {HOST}")
    print(f"Key Location: {KEY_LOCATION}")
    
    urls = extract_urls_from_sitemap(SITEMAP_PATH)
    print(f"Found {len(urls)} URLs in {SITEMAP_PATH}")
    
    submit_indexnow(urls)

if __name__ == "__main__":
    main()
