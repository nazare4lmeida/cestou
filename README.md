# 🛒 Cestou — Calculadora de Compras

Calculadora de lista de compras inteligente para o mercado brasileiro.

## Funcionalidades

- **Perfil da household**: número de pessoas, refeições/dia, consumo estimado
- **Cálculo automático**: quantidades exatas por produto × pessoas × período
- **60+ produtos pré-cadastrados** em 6 categorias (Alimentos Básicos, Carnes, Frutas & Vegetais, Laticínios, Limpeza, Snacks)
- **Autocomplete inteligente** para busca e adição de produtos
- **Período flexível**: 1 semana, 2 semanas, 1 mês, 2 meses ou personalizado
- **Resultados detalhados**: breakdown por categoria, custo diário/semanal/mensal
- **Exportação**: copiar lista como texto ou baixar CSV
- **Integração com IA** (opcional): preços regionais via Google Gemini
- **Funciona sem backend**: cálculo local no navegador

---

## Setup Rápido (Frontend apenas)

**Requisito:** Node.js 18+

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

---

## Setup Completo (com backend Python)

### Backend

**Requisito:** Python 3.11+

```bash
cd backend
pip install -r requirements.txt

# Opcional: configurar Gemini para preços por IA
echo "GEMINI_API_KEY=sua_chave_aqui" > .env

uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Integração com Google Gemini (Opcional)

Para ativar preços regionais e sugestões de economia:

1. Obtenha uma chave gratuita em https://aistudio.google.com/app/apikey
2. No backend: crie `backend/.env` com `GEMINI_API_KEY=sua_chave`
3. Reinicie o backend

---

## Estrutura do Projeto

```
lista-compras/
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Componente principal
│   │   ├── main.jsx             # Entry point
│   │   ├── index.css            # Design system completo
│   │   ├── components/
│   │   │   ├── StepPerfil.jsx   # Etapa 1: perfil
│   │   │   ├── StepProdutos.jsx # Etapa 2: produtos
│   │   │   └── StepResultado.jsx# Etapa 3: resultado
│   │   ├── hooks/
│   │   │   └── useStore.js      # Estado global + cálculo
│   │   └── data/
│   │       └── produtos.js      # Base de produtos (60+)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── main.py                  # FastAPI: /api/calcular, /api/precos-ia
    └── requirements.txt
```

---

## Como Funciona o Cálculo

```
Quantidade = quantidade_base × nº_pessoas × dias × multiplicador_consumo
```

- `quantidade_base`: consumo médio por pessoa por dia (ex: 0.1 kg de arroz)
- `multiplicador_consumo`: Pouco=0.7 / Médio=1.0 / Muito=1.4
- Preços são estimativas baseadas em médias nacionais 2024-2025

---

## Tecnologias

- **Frontend**: React 18 + Vite (sem dependências externas além do React)
- **Backend**: FastAPI + Python (opcional)
- **IA**: Google Gemini 1.5 Flash (free tier, opcional)
- **Geocoding**: Nominatim/OpenStreetMap (gratuito)
