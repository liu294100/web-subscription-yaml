@echo off
echo Building and deploying Web Subscription Converter...

:: Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b
)

:: Pull latest changes (optional, if you want to pull from git)
:: git pull

:: Build and start containers
docker-compose up -d --build

echo.
echo Deployment complete!
echo App is running at http://localhost:3000
pause
