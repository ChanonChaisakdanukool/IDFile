@echo off
setlocal
cd /d "%~dp0"
if errorlevel 1 goto failed
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 22+ is required. Install Node.js, then open this file again.
  goto failed
)
node scripts/ids.mjs generate
if errorlevel 1 goto failed
node scripts/ids.mjs check
if errorlevel 1 goto failed
echo Done. Review and commit element-ids.json, generated/ and dist/ together.
pause
exit /b 0
:failed
echo Generation failed. Check the error above.
pause
exit /b 1
