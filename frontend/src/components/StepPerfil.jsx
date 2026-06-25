import React, { useState } from "react";
import { CONSUMO_PRESETS } from "../data/produtos";
import { IconLocation, IconArrowRight } from "./Icons";

export default function StepPerfil({ perfil, setPerfil, onNext }) {
  const [locMode, setLocMode] = useState("texto");
  const [locLoading, setLocLoading] = useState(false);

  const update = (campo, valor) => setPerfil(p => ({ ...p, [campo]: valor }));

  const detectarLocalizacao = () => {
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const resp = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
          );
          const data = await resp.json();
          const cidade = data.address?.city || data.address?.town || data.address?.state || "";
          const estado = data.address?.state || "";
          update("localizacao", `${cidade}, ${estado}`);
        } catch {
          update("localizacao", `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        } finally {
          setLocLoading(false);
        }
      },
      () => {
        setLocLoading(false);
        setLocMode("texto");
      }
    );
  };

  const valido = perfil.pessoas >= 1 && perfil.refeicoes_dia >= 1;

  return (
    <div className="step-card">
      <div className="step-header">
        <span className="step-badge">1</span>
        <div>
          <h2>Perfil da sua casa</h2>
          <p>Essas informações definem as quantidades calculadas</p>
        </div>
      </div>

      <div className="form-grid">
        {/* Número de pessoas */}
        <div className="form-field">
          <label>Quantas pessoas moram na casa?</label>
          <div className="stepper">
            <button
              className="stepper-btn"
              onClick={() => update("pessoas", Math.max(1, perfil.pessoas - 1))}
              disabled={perfil.pessoas <= 1}
            >−</button>
            <span className="stepper-value">{perfil.pessoas}</span>
            <button
              className="stepper-btn"
              onClick={() => update("pessoas", Math.min(20, perfil.pessoas + 1))}
            >+</button>
          </div>
          <p className="field-hint">Incluindo você</p>
        </div>

        {/* Refeições por dia */}
        <div className="form-field">
          <label>Refeições por dia</label>
          <div className="stepper">
            <button
              className="stepper-btn"
              onClick={() => update("refeicoes_dia", Math.max(1, perfil.refeicoes_dia - 0.5))}
              disabled={perfil.refeicoes_dia <= 1}
            >−</button>
            <span className="stepper-value">{perfil.refeicoes_dia}</span>
            <button
              className="stepper-btn"
              onClick={() => update("refeicoes_dia", Math.min(6, perfil.refeicoes_dia + 0.5))}
            >+</button>
          </div>
          <p className="field-hint">Café da manhã, almoço, jantar…</p>
        </div>
      </div>

      {/* Consumo */}
      <div className="form-field">
        <label>Quanto cada pessoa come por refeição?</label>
        <div className="preset-grid">
          {CONSUMO_PRESETS.map(p => (
            <button
              key={p.key}
              className={`preset-btn ${perfil.consumo_preset === p.key ? "active" : ""}`}
              onClick={() => update("consumo_preset", p.key)}
            >
              <span className="preset-label">{p.label}</span>
              <span className="preset-desc">{p.desc}</span>
            </button>
          ))}
          <button
            className={`preset-btn ${perfil.consumo_preset === "custom" ? "active" : ""}`}
            onClick={() => update("consumo_preset", "custom")}
          >
            <span className="preset-label">Personalizado</span>
            <span className="preset-desc">Definir em gramas</span>
          </button>
        </div>

        {perfil.consumo_preset === "custom" && (
          <div className="custom-field">
            <input
              type="number"
              value={perfil.consumo_gramas || ""}
              onChange={e => update("consumo_gramas", Number(e.target.value))}
              placeholder="Ex: 350"
              min={50}
              max={1000}
            />
            <span className="input-suffix">g por pessoa por refeição</span>
          </div>
        )}
      </div>

      {/* Localização */}
      <div className="form-field">
        <label>Sua cidade <span className="optional-tag">opcional — para preços regionais</span></label>
        <div className="loc-row">
          <input
            type="text"
            value={perfil.localizacao}
            onChange={e => update("localizacao", e.target.value)}
            placeholder="Ex: São Paulo, SP"
            className="loc-input"
          />
          <button
            className="loc-detect-btn"
            onClick={detectarLocalizacao}
            disabled={locLoading}
            title="Detectar localização automaticamente"
          >
            {locLoading ? (
              <span className="spinner-sm" />
            ) : (
              <IconLocation size={15} />
            )}
            {locLoading ? "Detectando..." : "Detectar"}
          </button>
        </div>
      </div>

      <button
        className="btn-primary btn-full"
        onClick={onNext}
        disabled={!valido}
      >
        Escolher produtos <IconArrowRight size={15} />
      </button>
    </div>
  );
}
