import { useState, useCallback } from "react";
import { TODOS_PRODUTOS } from "../data/produtos";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export function useStore() {
  const [step, setStep] = useState(1); // 1=perfil, 2=produtos, 3=resultado

  // Perfil
  const [perfil, setPerfil] = useState({
    pessoas: 2,
    refeicoes_dia: 3,
    consumo_preset: "medio",
    consumo_gramas: null,
    localizacao: "",
  });

  // Produtos selecionados
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);

  // Período
  const [periodoDias, setPeriodoDias] = useState(30);
  const [periodoCustom, setPeriodoCustom] = useState(false);

  // Resultado
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  // IA
  const [usarIA, setUsarIA] = useState(false);
  const [geminiKey, setGeminiKey] = useState("");
  const [sugestoesIA, setSugestoesIA] = useState(null);

  const adicionarProduto = useCallback((produto) => {
    setProdutosSelecionados(prev => {
      if (prev.find(p => p.id === produto.id)) return prev;
      return [...prev, { ...produto, preco_estimado: produto.preco_estimado || 0 }];
    });
  }, []);

  const removerProduto = useCallback((id) => {
    setProdutosSelecionados(prev => prev.filter(p => p.id !== id));
  }, []);

  const atualizarProduto = useCallback((id, campo, valor) => {
    setProdutosSelecionados(prev =>
      prev.map(p => p.id === id ? { ...p, [campo]: valor } : p)
    );
  }, []);

  const adicionarProdutoCustom = useCallback((nome, categoria) => {
    const id = `custom-${Date.now()}`;
    setProdutosSelecionados(prev => [
      ...prev,
      {
        id,
        nome,
        categoria: categoria || "Outros",
        quantidade_base: 0.05,
        unidade: "kg",
        preco_estimado: 0,
        emoji: "📦",
      }
    ]);
    return id;
  }, []);

  const calcular = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      // Tenta via backend
      const resp = await fetch(`${API_BASE}/api/calcular`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(geminiKey ? { "X-Gemini-Key": geminiKey } : {})
        },
        body: JSON.stringify({
          perfil,
          produtos: produtosSelecionados,
          periodo_dias: periodoDias,
          usar_ia: usarIA,
        }),
      });
      if (!resp.ok) throw new Error("Erro no servidor");
      const data = await resp.json();
      setResultado(data);
      setStep(3);
    } catch (e) {
      // Fallback: cálculo local
      const resultadoLocal = calcularLocal(perfil, produtosSelecionados, periodoDias);
      setResultado(resultadoLocal);
      setStep(3);
    } finally {
      setCarregando(false);
    }
  }, [perfil, produtosSelecionados, periodoDias, usarIA, geminiKey]);

  const buscarPrecosIA = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const nomes = produtosSelecionados.map(p => p.nome);
      const localStr = perfil.localizacao ? ` na região de ${perfil.localizacao}` : " no Brasil";

      const prompt = `Você é um especialista em preços de supermercado no Brasil${localStr}.

Forneça preços estimados REALISTAS para ${new Date().getFullYear()} dos seguintes produtos.
Retorne APENAS um JSON válido, sem markdown, sem explicações:

{"produtos": [${nomes.map(n => `{"nome":"${n}","preco":0.00,"unidade":"kg"}`).join(",")}]}

Preencha cada "preco" com o valor médio real em R$ praticado em supermercados${localStr}.
A "unidade" deve ser a unidade do preço (kg, l, un, etc).
Produtos: ${nomes.join(", ")}`;

      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!resp.ok) throw new Error("Erro na API");
      const data = await resp.json();
      const texto = data.content?.[0]?.text || "";

      // Extrai JSON da resposta
      const match = texto.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        if (parsed.produtos) {
          parsed.produtos.forEach(item => {
            const prod = produtosSelecionados.find(p =>
              p.nome.toLowerCase().includes(item.nome.toLowerCase()) ||
              item.nome.toLowerCase().includes(p.nome.toLowerCase())
            );
            if (prod && item.preco > 0) {
              atualizarProduto(prod.id, "preco_estimado", item.preco);
            }
          });
        }
      }
    } catch (e) {
      console.warn("IA não disponível:", e);
      setErro("Não foi possível buscar preços. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }, [perfil.localizacao, produtosSelecionados, atualizarProduto]);

  return {
    step, setStep,
    perfil, setPerfil,
    produtosSelecionados,
    adicionarProduto, removerProduto, atualizarProduto, adicionarProdutoCustom,
    periodoDias, setPeriodoDias,
    periodoCustom, setPeriodoCustom,
    resultado,
    carregando, erro,
    usarIA, setUsarIA,
    geminiKey, setGeminiKey,
    calcular,
    buscarPrecosIA,
    sugestoesIA,
  };
}

// Cálculo puramente local (sem backend)
function calcularLocal(perfil, produtos, periodoDias) {
  const MULT = { pouco: 0.7, medio: 1.0, muito: 1.4 };
  const multiplicador = perfil.consumo_preset === "custom"
    ? (perfil.consumo_gramas || 300) / 300
    : (MULT[perfil.consumo_preset] || 1.0);

  let total = 0;
  const categorias = {};
  const itens = produtos.map(produto => {
    const qtdRaw = produto.quantidade_base * perfil.pessoas * periodoDias * multiplicador;
    let qtd;
    if (produto.unidade === "un") {
      qtd = Math.max(1, Math.round(qtdRaw));
    } else if (["kg", "l"].includes(produto.unidade)) {
      qtd = Math.round(qtdRaw * 100) / 100;
    } else {
      qtd = Math.round(qtdRaw);
    }

    const preco = produto.preco_estimado || 0;
    const custo = Math.round(preco * qtd * 100) / 100;
    total += custo;
    categorias[produto.categoria] = (categorias[produto.categoria] || 0) + custo;

    return {
      id: produto.id,
      nome: produto.nome,
      categoria: produto.categoria,
      quantidade_calculada: qtd,
      unidade: produto.unidade,
      preco_unitario: preco,
      custo_total: custo,
      marca: produto.marca,
      emoji: produto.emoji,
    };
  });

  const breakdown = Object.entries(categorias)
    .map(([categoria, t]) => ({ categoria, total: Math.round(t * 100) / 100 }))
    .sort((a, b) => b.total - a.total);

  return {
    itens,
    total_geral: Math.round(total * 100) / 100,
    breakdown_categorias: breakdown,
    periodo_dias: periodoDias,
    custo_medio_diario: periodoDias > 0 ? Math.round(total / periodoDias * 100) / 100 : 0,
  };
}
