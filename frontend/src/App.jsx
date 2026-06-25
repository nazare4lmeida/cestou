import React from "react";
import { useStore } from "./hooks/useStore";
import StepPerfil from "./components/StepPerfil";
import StepProdutos from "./components/StepProdutos";
import StepResultado from "./components/StepResultado";
import { IconCart, IconCheck } from "./components/Icons";

function ProgressBar({ step }) {
  return (
    <div className="progress-bar">
      {[
        { n: 1, label: "Perfil" },
        { n: 2, label: "Produtos" },
        { n: 3, label: "Resultado" },
      ].map(({ n, label }) => (
        <React.Fragment key={n}>
          <div
            className={`prog-step ${step >= n ? "done" : ""} ${step === n ? "current" : ""}`}
          >
            <div className="prog-dot">
              {step > n ? <IconCheck size={11} color="currentColor" /> : n}
            </div>
            <span className="prog-label">{label}</span>
          </div>
          {n < 3 && <div className={`prog-line ${step > n ? "done" : ""}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function App() {
  const store = useStore();

  const handleReiniciar = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">
              <IconCart size={26} color="#7C6A52" />
            </span>
            <div>
              <h1>Cestou</h1>
              <p>Calculadora de compras inteligente</p>
            </div>
          </div>
          <ProgressBar step={store.step} />
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        <div className="app-container">
          {store.step === 1 && (
            <StepPerfil
              perfil={store.perfil}
              setPerfil={store.setPerfil}
              onNext={() => store.setStep(2)}
            />
          )}

          {store.step === 2 && (
            <StepProdutos
              produtosSelecionados={store.produtosSelecionados}
              adicionarProduto={store.adicionarProduto}
              removerProduto={store.removerProduto}
              atualizarProduto={store.atualizarProduto}
              adicionarProdutoCustom={store.adicionarProdutoCustom}
              periodoDias={store.periodoDias}
              setPeriodoDias={store.setPeriodoDias}
              periodoCustom={store.periodoCustom}
              setPeriodoCustom={store.setPeriodoCustom}
              onVoltar={() => store.setStep(1)}
              onCalcular={store.calcular}
              carregando={store.carregando}
              buscarPrecosIA={store.buscarPrecosIA}
              localizacao={store.perfil.localizacao}
            />
          )}

          {store.step === 3 && (
            <StepResultado
              resultado={store.resultado}
              perfil={store.perfil}
              periodoDias={store.periodoDias}
              onReiniciar={handleReiniciar}
              onVoltar={() => store.setStep(2)}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>
          Os preços são estimativas e podem variar por região e supermercado.
        </p>
      </footer>
    </div>
  );
}
