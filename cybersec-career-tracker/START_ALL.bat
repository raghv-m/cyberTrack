@echo off
echo ========================================
echo   CyberTrack - Starting All Services
echo =================================== a button =====
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed!
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo [1/4] Installing Frontend Dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo [3/4] Installing Python Dependencies...
cd scrapers
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [WARNING] Some Python packages may have failed to install
    echo This is usually okay - the app will still work
)
cd ..

echo.
echo [4/4] Starting All Services...
echo.
echo Opening 3 terminal windows:
echo   - Terminal 1: Frontend (Vite Dev Server)
echo   - Terminal 2: Backend (Express Server)
echo   - Terminal 3: Python Scraper
echo.

REM Start Frontend in new window
start "CyberTrack Frontend" cmd /k "npm run dev"

REM Wait 2 seconds
timeout /t 2 /nobreak >nul

REM Start Backend in new window
start "CyberTrack Backend" cmd /k "cd backend && node server.js"

REM Wait 2 seconds
timeout /t 2 /nobreak >nul

REM Start Python Scraper in new window
start "CyberTrack Scraper" cmd /k "cd scrapers && python populate_news.py"

echo.
echo ========================================
echo   All Services Started Successfully!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3001
echo.
echo Press any key to close this window...
pause >nul

