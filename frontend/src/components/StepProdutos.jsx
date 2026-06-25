import React, { useState, useRef, useEffect } from "react";
import { PRODUTOS_SUGERIDOS, CATEGORIAS, TODOS_PRODUTOS } from "../data/produtos";
import { CAT_ICON_MAP, ProdutoIcon, IconSearch, IconX, IconArrowLeft, IconArrowRight, IconSparkle } from "./Icons";

function ProdutoCard({ produto, onRemover, onAtualizar }) {
  return (
    <div className="produto-card">
      <div className="produto-card-top">
        <span className="produto-icone">
          <ProdutoIcon categoria={produto.categoria} size={18} />
        </span>
        <div className="produto-info">
          <input
            className="produto-nome-input"
            value={produto.nome}
            onChange={e => onAtualizar("nome", e.target.value)}
          />
          <span className="produto-cat-tag">{produto.categoria}</span>
        </div>
        <button className="remove-btn" onClick={onRemover} title="Remover">
          <IconX size={13} />
        </button>
      </div>

      <div className="produto-fields">
        <div className="field-group">
          <label>Qtd base/pessoa/dia</label>
          <div className="input-row">
            <input
              type="number"
              className="field-input"
              value={produto.quantidade_base}
              onChange={e => onAtualizar("quantidade_base", parseFloat(e.target.value) || 0)}
              step={0.01}
              min={0}
            />
            <select
              className="field-select"
              value={produto.unidade}
              onChange={e => onAtualizar("unidade", e.target.value)}
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="l">l</option>
              <option value="ml">ml</option>
              <option value="un">un</option>
            </select>
          </div>
        </div>

        <div className="field-group">
          <label>Preço estimado (R$)</label>
          <div className="input-row">
            <span className="input-prefix">R$</span>
            <input
              type="number"
              className="field-input"
              value={produto.preco_estimado || ""}
              onChange={e => onAtualizar("preco_estimado", parseFloat(e.target.value) || 0)}
              step={0.01}
              min={0}
              placeholder="0,00"
            />
            <span className="input-suffix-small">/{produto.unidade}</span>
          </div>
        </div>
      </div>

      <div className="field-group field-group-full">
        <label>Marca <span className="optional-tag">opcional</span></label>
        <input
          type="text"
          className="marca-input"
          value={produto.marca || ""}
          onChange={e => onAtualizar("marca", e.target.value)}
          placeholder="Ex: Camil, Sadia, Tio João…"
        />
      </div>
    </div>
  );
}

export default function StepProdutos({
  produtosSelecionados,
  adicionarProduto,
  removerProduto,
  atualizarProduto,
  adicionarProdutoCustom,
  periodoDias, setPeriodoDias,
  periodoCustom, setPeriodoCustom,
  onVoltar, onCalcular, carregando,
  buscarPrecosIA,
}) {
  const [busca, setBusca] = useState("");
  const [catAtiva, setCatAtiva] = useState("Alimentos Básicos");
  const [autoSugestoes, setAutoSugestoes] = useState([]);
  const [mostrarAuto, setMostrarAuto] = useState(false);
  const inputRef = useRef();

  const PERIODOS_FIXOS = [
    { label: "1 semana", dias: 7 },
    { label: "2 semanas", dias: 14 },
    { label: "1 mês", dias: 30 },
    { label: "2 meses", dias: 60 },
  ];

  useEffect(() => {
    if (busca.length < 2) { setAutoSugestoes([]); return; }
    const termo = busca.toLowerCase();
    const sugs = TODOS_PRODUTOS.filter(p =>
      p.nome.toLowerCase().includes(termo) &&
      !produtosSelecionados.find(s => s.id === p.id)
    ).slice(0, 7);
    setAutoSugestoes(sugs);
    setMostrarAuto(true);
  }, [busca, produtosSelecionados]);

  const handleSelectSugestao = (p) => {
    adicionarProduto({ ...p });
    setBusca("");
    setMostrarAuto(false);
    inputRef.current?.focus();
  };

  const handleAddCustom = () => {
    if (busca.trim()) {
      adicionarProdutoCustom(busca.trim(), catAtiva === "Outros" ? "Outros" : catAtiva);
      setBusca("");
      setMostrarAuto(false);
    }
  };

  const produtosDaCat = (PRODUTOS_SUGERIDOS[catAtiva] || []).filter(
    p => !produtosSelecionados.find(s => s.id === p.id)
  );

  const CatIcon = CAT_ICON_MAP[catAtiva] || (() => null);

  // Labels curtos para as abas
  const CAT_LABELS = {
    "Alimentos Básicos": "Alimentos",
    "Carnes": "Carnes",
    "Frutas & Vegetais": "Frutas",
    "Laticínios": "Laticínios",
    "Produtos de Limpeza": "Limpeza",
    "Snacks & Biscoitos": "Snacks",
    "Outros": "Outros",
  };

  return (
    <div className="step-produtos">
      {/* Busca */}
      <div className="step-card">
        <div className="step-header">
          <span className="step-badge">2</span>
          <div>
            <h2>Selecione os produtos</h2>
            <p>Adicione por categoria ou busque pelo nome</p>
          </div>
        </div>

        <div className="search-wrapper">
          <span className="search-icon"><IconSearch size={15} /></span>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            onFocus={() => busca.length >= 2 && setMostrarAuto(true)}
            onBlur={() => setTimeout(() => setMostrarAuto(false), 150)}
            placeholder="Buscar produto… (ex: arroz, frango, sabão)"
          />
          {busca && (
            <button className="search-clear" onClick={() => { setBusca(""); setMostrarAuto(false); }}>
              <IconX size={12} />
            </button>
          )}

          {mostrarAuto && (
            <div className="autocomplete-drop">
              {autoSugestoes.map(p => {
                const Icon = CAT_ICON_MAP[p.categoria] || (() => null);
                return (
                  <button key={p.id} className="auto-item" onMouseDown={() => handleSelectSugestao(p)}>
                    <span className="auto-item-icon"><Icon size={13} /></span>
                    <span>{p.nome}</span>
                    <span className="auto-cat">{p.categoria}</span>
                  </button>
                );
              })}
              {busca.trim() && (
                <button className="auto-item auto-custom" onMouseDown={handleAddCustom}>
                  + Adicionar "<strong>{busca}</strong>" como novo produto
                </button>
              )}
              {autoSugestoes.length === 0 && !busca.trim() && (
                <p className="auto-empty">Nenhum produto encontrado</p>
              )}
            </div>
          )}
        </div>

        {/* Abas de categoria — wrap, não scroll */}
        <div className="cat-tabs">
          {CATEGORIAS.map(cat => {
            const Icon = CAT_ICON_MAP[cat] || (() => null);
            return (
              <button
                key={cat}
                className={`cat-tab ${catAtiva === cat ? "active" : ""}`}
                onClick={() => setCatAtiva(cat)}
              >
                <span className="cat-tab-icon"><Icon size={13} /></span>
                <span>{CAT_LABELS[cat]}</span>
              </button>
            );
          })}
        </div>

        {/* Grid de chips */}
        <div className="cat-produtos-grid">
          {produtosDaCat.map(p => (
            <button
              key={p.id}
              className="sugestao-chip"
              onClick={() => adicionarProduto({ ...p, categoria: catAtiva })}
            >
              <span className="chip-icon"><ProdutoIcon categoria={catAtiva} size={12} /></span>
              <span>{p.nome}</span>
            </button>
          ))}

          {/* Botão "adicionar personalizado" sempre visível em Outros */}
          {catAtiva === "Outros" && (
            <button
              className="sugestao-chip chip-add-custom"
              onClick={() => {
                const nome = prompt("Nome do produto:");
                if (nome?.trim()) adicionarProdutoCustom(nome.trim(), "Outros");
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700 }}>+</span>
              <span>Adicionar produto</span>
            </button>
          )}

          {produtosDaCat.length === 0 && catAtiva !== "Outros" && (
            <p className="all-added">Todos os itens desta categoria foram adicionados</p>
          )}
        </div>
      </div>

      {/* Lista selecionada */}
      {produtosSelecionados.length > 0 && (
        <div className="step-card">
          <div className="section-title-row">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h3 className="section-title">Lista de compras</h3>
                <span className="count-badge">{produtosSelecionados.length}</span>
              </div>
              <p className="section-hint">Edite quantidades e preços conforme necessário</p>
            </div>
            <button
              className="btn-ia"
              onClick={buscarPrecosIA}
              disabled={carregando}
              title="Preencher preços com IA"
            >
              {carregando
                ? <><span className="spinner-sm" /> Buscando…</>
                : <><IconSparkle size={13} /> Preços via IA</>
              }
            </button>
          </div>

          <div className="produtos-lista">
            {produtosSelecionados.map(p => (
              <ProdutoCard
                key={p.id}
                produto={p}
                onRemover={() => removerProduto(p.id)}
                onAtualizar={(campo, val) => atualizarProduto(p.id, campo, val)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Período */}
      <div className="step-card">
        <div className="step-header">
          <span className="step-badge">3</span>
          <div>
            <h2>Período de compras</h2>
            <p>Para quantos dias deseja calcular?</p>
          </div>
        </div>

        <div className="periodo-chips">
          {PERIODOS_FIXOS.map(p => (
            <button
              key={p.dias}
              className={`periodo-chip ${!periodoCustom && periodoDias === p.dias ? "active" : ""}`}
              onClick={() => { setPeriodoDias(p.dias); setPeriodoCustom(false); }}
            >
              {p.label}
            </button>
          ))}
          <button
            className={`periodo-chip ${periodoCustom ? "active" : ""}`}
            onClick={() => setPeriodoCustom(true)}
          >
            Personalizado
          </button>
        </div>

        {periodoCustom && (
          <div className="custom-periodo">
            <input
              type="number"
              value={periodoDias}
              onChange={e => setPeriodoDias(Math.max(1, parseInt(e.target.value) || 1))}
              min={1} max={365}
            />
            <span>dias</span>
          </div>
        )}
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={onVoltar}>
          <IconArrowLeft size={14} /> Perfil
        </button>
        <button
          className="btn-primary"
          onClick={onCalcular}
          disabled={produtosSelecionados.length === 0 || carregando}
        >
          {carregando
            ? <><span className="spinner-sm" /> Calculando…</>
            : <>Calcular lista <IconArrowRight size={14} /></>
          }
        </button>
      </div>
    </div>
  );
}
