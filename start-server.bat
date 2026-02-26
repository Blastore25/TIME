@echo off
echo.
echo  TIME - Local server
echo  ==================
echo  Binding to 127.0.0.1 (IPv4)
echo.
echo  Open in your browser:  http://127.0.0.1:8080
echo  Press Ctrl+C to stop.
echo.
cd /d "%~dp0"
python -m http.server 8080 --bind 127.0.0.1
pause
