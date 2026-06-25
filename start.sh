#!/bin/bash
# Cestou — Script de inicialização

echo "🛒 Cestou — Iniciando..."
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale em https://nodejs.org"
    exit 1
fi

NODE_VER=$(node -v | cut -d. -f1 | tr -d 'v')
if [ "$NODE_VER" -lt 18 ]; then
    echo "❌ Node.js 18+ necessário. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v)"

# Instalar dependências do frontend
cd frontend
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install --silent
fi

echo ""
echo "✅ Tudo pronto!"
echo ""
echo "🌐 Abrindo em: http://localhost:5173"
echo "   (pressione Ctrl+C para parar)"
echo ""

npm run dev
