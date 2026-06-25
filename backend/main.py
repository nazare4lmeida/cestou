from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import httpx
import os
import json

app = FastAPI(title="Lista de Compras API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"


class HouseholdProfile(BaseModel):
    pessoas: int
    refeicoes_dia: float
    consumo_preset: str  # "pouco", "medio", "muito", "custom"
    consumo_gramas: Optional[float] = None
    localizacao: Optional[str] = None


class Produto(BaseModel):
    id: str
    nome: str
    categoria: str
    quantidade_base: float
    unidade: str
    preco_estimado: Optional[float] = None
    marca: Optional[str] = None


class CalculoRequest(BaseModel):
    perfil: HouseholdProfile
    produtos: List[Produto]
    periodo_dias: int
    usar_ia: bool = False


class AIRequest(BaseModel):
    localizacao: str
    produtos: List[str]


async def call_gemini(prompt: str) -> str:
    if not GEMINI_API_KEY:
        return None
    
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f"{GEMINI_URL}?key={GEMINI_API_KEY}",
            json={
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"temperature": 0.3, "maxOutputTokens": 2048}
            }
        )
        if resp.status_code == 200:
            data = resp.json()
            return data["candidates"][0]["content"]["parts"][0]["text"]
    return None


CONSUMO_MULTIPICADOR = {
    "pouco": 0.7,
    "medio": 1.0,
    "muito": 1.4
}

GRAMAS_POR_REFEICAO_BASE = 300  # gramas por pessoa por refeição base


@app.post("/api/calcular")
async def calcular(req: CalculoRequest):
    multiplicador = CONSUMO_MULTIPICADOR.get(req.perfil.consumo_preset, 1.0)
    if req.perfil.consumo_preset == "custom" and req.perfil.consumo_gramas:
        multiplicador = req.perfil.consumo_gramas / GRAMAS_POR_REFEICAO_BASE

    resultados = []
    total = 0.0
    categorias = {}

    for produto in req.produtos:
        # Quantidade base é por pessoa por dia
        qtd_por_pessoa_dia = produto.quantidade_base
        qtd_total = qtd_por_pessoa_dia * req.perfil.pessoas * req.periodo_dias * multiplicador

        # Arredondar conforme unidade
        if produto.unidade in ["kg", "l"]:
            qtd_total = round(qtd_total, 2)
        elif produto.unidade in ["g", "ml"]:
            qtd_total = round(qtd_total)
        else:
            qtd_total = max(1, round(qtd_total))

        preco = produto.preco_estimado or 0
        custo = round(preco * qtd_total, 2)
        total += custo

        cat = produto.categoria
        categorias[cat] = categorias.get(cat, 0) + custo

        resultados.append({
            "id": produto.id,
            "nome": produto.nome,
            "categoria": produto.categoria,
            "quantidade_calculada": qtd_total,
            "unidade": produto.unidade,
            "preco_unitario": preco,
            "custo_total": custo,
            "marca": produto.marca
        })

    breakdown = [{"categoria": k, "total": round(v, 2)} for k, v in categorias.items()]
    breakdown.sort(key=lambda x: x["total"], reverse=True)

    return {
        "itens": resultados,
        "total_geral": round(total, 2),
        "breakdown_categorias": breakdown,
        "periodo_dias": req.periodo_dias,
        "custo_medio_diario": round(total / req.periodo_dias, 2) if req.periodo_dias > 0 else 0
    }


@app.post("/api/precos-ia")
async def precos_ia(req: AIRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=400, detail="Gemini API key não configurada")

    prompt = f"""Você é um especialista em preços de supermercado no Brasil.
Para a localização: {req.localizacao}

Forneça preços estimados REALISTAS e ATUAIS (2024-2025) para os seguintes produtos de supermercado.
Considere os preços médios praticados em supermercados locais.

Produtos: {', '.join(req.produtos)}

Responda APENAS com um JSON válido no formato:
{{"produtos": [{{"nome": "nome do produto", "preco": 0.00, "unidade": "kg/unidade/l", "supermercado_referencia": "nome do supermercado"}}]}}

Não inclua markdown, apenas JSON puro."""

    resultado = await call_gemini(prompt)
    if not resultado:
        raise HTTPException(status_code=500, detail="Erro ao consultar IA")

    try:
        # Limpar possível markdown
        resultado = resultado.strip()
        if resultado.startswith("```"):
            resultado = resultado.split("```")[1]
            if resultado.startswith("json"):
                resultado = resultado[4:]
        data = json.loads(resultado)
        return data
    except:
        raise HTTPException(status_code=500, detail="Erro ao processar resposta da IA")


@app.post("/api/sugestoes-ia")
async def sugestoes_ia(localizacao: str, produtos: List[str]):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=400, detail="Gemini API key não configurada")

    prompt = f"""Para a região: {localizacao}

Sugira alternativas mais econômicas para estes produtos: {', '.join(produtos[:10])}

Responda APENAS com JSON:
{{"sugestoes": [{{"produto_original": "nome", "alternativa": "nome alternativo", "economia_estimada_pct": 15, "motivo": "explicação curta"}}]}}"""

    resultado = await call_gemini(prompt)
    if not resultado:
        raise HTTPException(status_code=500, detail="Erro ao consultar IA")

    try:
        resultado = resultado.strip()
        if resultado.startswith("```"):
            resultado = resultado.split("```")[1]
            if resultado.startswith("json"):
                resultado = resultado[4:]
        return json.loads(resultado)
    except:
        raise HTTPException(status_code=500, detail="Erro ao processar resposta da IA")


@app.get("/api/health")
async def health():
    return {"status": "ok", "gemini_configurado": bool(GEMINI_API_KEY)}
