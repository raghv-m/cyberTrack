@echo off
echo ========================================
echo   CyberTrack - Starting Python Scraper
echo ========================================
echo.

REM Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed!
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

cd scrapers

echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo Starting News Scraper...
echo This will populate the news database with cybersecurity articles.
echo.

python populate_news.py

