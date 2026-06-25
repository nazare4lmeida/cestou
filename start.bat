@echo off
echo 🛒 Lista Certa — Iniciando...
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js nao encontrado. Instale em https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js encontrado

cd frontend

if not exist "node_modules" (
    echo 📦 Instalando dependencias...
    npm install --silent
)

echo.
echo ✅ Tudo pronto!
echo.
echo 🌐 Abrindo em: http://localhost:5173
echo    (feche esta janela para parar)
echo.

npm run dev
