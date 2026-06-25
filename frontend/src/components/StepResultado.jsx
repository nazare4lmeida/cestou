import React, { useState } from "react";
import { ProdutoIcon, IconCopy, IconDownload, IconArrowLeft, IconCheck } from "./Icons";

const CAT_COLORS = {
  "Alimentos Básicos": "#A8956E",
  "Carnes": "#C17F6B",
  "Frutas & Vegetais": "#7FA882",
  "Laticínios": "#7B9CB5",
  "Produtos de Limpeza": "#8E8BA8",
  "Snacks & Biscoitos": "#B8986A",
  "Outros": "#9A9A9A",
};

function fmt(n) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function fmtQtd(qtd, unidade) {
  if (unidade === "kg" || unidade === "l") {
    if (qtd >= 1) return `${qtd.toFixed(1)} ${unidade}`;
    return `${(qtd * 1000).toFixed(0)} ${unidade === "kg" ? "g" : "ml"}`;
  }
  return `${qtd} ${unidade}`;
}

function BarraCategoria({ nome, total, max }) {
  const pct = max > 0 ? (total / max) * 100 : 0;
  const cor = CAT_COLORS[nome] || "#9A9A9A";
  return (
    <div className="bar-row">
      <div className="bar-label">
        <span>{nome}</span>
        <span className="bar-value">{fmt(total)}</span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${pct}%`, backgroundColor: cor }} />
      </div>
    </div>
  );
}

export default function StepResultado({ resultado, perfil, periodoDias, onReiniciar, onVoltar }) {
  const [viewMode, setViewMode] = useState("lista"); // "lista" | "categoria"
  const [catFiltro, setCatFiltro] = useState(null);
  const [copiado, setCopiado] = useState(false);

  if (!resultado) return null;

  const { itens, total_geral, breakdown_categorias, custo_medio_diario } = resultado;
  const maxCat = Math.max(...breakdown_categorias.map(c => c.total));

  const itensFiltrados = catFiltro
    ? itens.filter(i => i.categoria === catFiltro)
    : itens;

  const cats = [...new Set(itens.map(i => i.categoria))];

  const exportarTexto = () => {
    const linhas = [
      `LISTA DE COMPRAS — ${new Date().toLocaleDateString("pt-BR")}`,
      `Período: ${periodoDias} dias | ${perfil.pessoas} pessoa(s)`,
      ``,
      ...itens.map(i =>
        `${i.emoji || "•"} ${i.nome}${i.marca ? ` (${i.marca})` : ""}: ${fmtQtd(i.quantidade_calculada, i.unidade)} — ${fmt(i.custo_total)}`
      ),
      ``,
      `TOTAL: ${fmt(total_geral)}`,
      `Média diária: ${fmt(custo_medio_diario)}`,
    ];
    const texto = linhas.join("\n");
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const exportarCSV = () => {
    const header = "Produto,Categoria,Marca,Quantidade,Unidade,Preço Unit.,Total";
    const rows = itens.map(i =>
      `"${i.nome}","${i.categoria}","${i.marca || ""}","${i.quantidade_calculada}","${i.unidade}","${i.preco_unitario}","${i.custo_total}"`
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lista-compras-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="step-resultado">
      {/* Header summary */}
      <div className="resultado-hero">
        <div className="hero-main">
          <p className="hero-label">Total estimado para {periodoDias} dias</p>
          <h1 className="hero-total">{fmt(total_geral)}</h1>
          <p className="hero-sub">{fmt(custo_medio_diario)}/dia · {perfil.pessoas} pessoa(s)</p>
        </div>
        <div className="hero-actions">
          <button className="btn-outline" onClick={exportarTexto}>
            <IconCopy size={13} /> {copiado ? "Copiado!" : "Copiar lista"}
          </button>
          <button className="btn-outline" onClick={exportarCSV}>
            <IconDownload size={13} /> Exportar CSV
          </button>
        </div>
      </div>

      {/* Breakdown por categoria */}
      <div className="step-card">
        <h3 className="section-title">Distribuição por categoria</h3>
        <div className="barras">
          {breakdown_categorias.map(cat => (
            <button
              key={cat.categoria}
              className={`bar-row-btn ${catFiltro === cat.categoria ? "selected" : ""}`}
              onClick={() => setCatFiltro(catFiltro === cat.categoria ? null : cat.categoria)}
            >
              <BarraCategoria nome={cat.categoria} total={cat.total} max={maxCat} />
            </button>
          ))}
        </div>
        {catFiltro && (
          <p className="filter-hint">Filtrando: <strong>{catFiltro}</strong> — <button onClick={() => setCatFiltro(null)}>ver todos</button></p>
        )}
      </div>

      {/* Lista de itens */}
      <div className="step-card">
        <div className="section-title-row">
          <h3 className="section-title">Itens da lista</h3>
          <span className="count-badge">{itensFiltrados.length}</span>
        </div>

        <div className="itens-table">
          <div className="itens-header">
            <span>Produto</span>
            <span>Quantidade</span>
            <span>Preço unit.</span>
            <span>Total</span>
          </div>
          {itensFiltrados.map(item => (
            <div key={item.id} className="item-row">
              <div className="item-nome-col">
                <span className="item-icone"><ProdutoIcon categoria={item.categoria} size={14} /></span>
                <div>
                  <span className="item-nome">{item.nome}</span>
                  {item.marca && <span className="item-marca"> · {item.marca}</span>}
                  <div className="item-cat-tag">{item.categoria}</div>
                </div>
              </div>
              <span className="item-qtd">{fmtQtd(item.quantidade_calculada, item.unidade)}</span>
              <span className="item-preco">
                {item.preco_unitario > 0 ? `${fmt(item.preco_unitario)}/${item.unidade}` : "—"}
              </span>
              <span className={`item-total ${item.custo_total > 0 ? "has-price" : ""}`}>
                {item.custo_total > 0 ? fmt(item.custo_total) : "—"}
              </span>
            </div>
          ))}
        </div>

        {/* Footer total */}
        <div className="itens-footer">
          <span>Total {catFiltro ? `(${catFiltro})` : "geral"}</span>
          <span className="footer-total">
            {catFiltro
              ? fmt(itensFiltrados.reduce((s, i) => s + i.custo_total, 0))
              : fmt(total_geral)
            }
          </span>
        </div>
      </div>

      {/* Info adicional */}
      <div className="stats-row">
        <div className="stat-card">
          <p className="stat-label">Itens na lista</p>
          <p className="stat-value">{itens.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Custo semanal</p>
          <p className="stat-value">{fmt(custo_medio_diario * 7)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Por pessoa/mês</p>
          <p className="stat-value">{fmt((custo_medio_diario * 30) / perfil.pessoas)}</p>
        </div>
      </div>

      {/* Ações finais */}
      <div className="step-actions">
        <button className="btn-secondary" onClick={onVoltar}><IconArrowLeft size={14} /> Editar lista</button>
        <button className="btn-primary" onClick={onReiniciar}>Nova lista</button>
      </div>
    </div>
  );
}
