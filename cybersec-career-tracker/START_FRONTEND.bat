@echo off
echo ========================================
echo   CyberTrack - Starting Frontend Only
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Installing dependencies...
call npm install

echo.
echo Starting Vite Dev Server...
echo Frontend will be available at: http://localhost:5173
echo.

npm run dev

