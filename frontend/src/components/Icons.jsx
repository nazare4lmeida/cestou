// Ícones SVG inline — sem emojis, estilo limpo e consistente
// Inspirados em Phosphor Icons / Lucide com toque artesanal

export function IconGrain({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
      <path d="M12 6v6l4 2"/>
      <circle cx="9" cy="9" r="1.5" fill={color} stroke="none"/>
      <circle cx="15" cy="9" r="1.5" fill={color} stroke="none"/>
      <circle cx="9" cy="15" r="1.5" fill={color} stroke="none"/>
      <circle cx="15" cy="15" r="1.5" fill={color} stroke="none"/>
    </svg>
  );
}

export function IconMeat({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2c3.3 0 6 2.7 6 6 0 2.2-1.2 4.1-3 5.2L15 22H9l-2-8.8C5.2 12.1 4 10.2 4 8c0-3.3 2.7-6 6-6h4z"/>
      <path d="M9 2.5c0 2 1.5 3.5 3 3.5s3-1.5 3-3.5"/>
    </svg>
  );
}

export function IconVegetable({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12"/>
      <path d="M12 12C10 8 6 7 3 9c3 1 5 4 9 3z"/>
      <path d="M12 12c2-4 6-5 9-3-3 1-5 4-9 3z"/>
      <path d="M12 12c0-4-2-7-5-8 1 3 2 6 5 8z"/>
      <path d="M12 12c0-4 2-7 5-8-1 3-2 6-5 8z"/>
    </svg>
  );
}

export function IconMilk({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2h8l1 4H7L8 2z"/>
      <rect x="5" y="6" width="14" height="15" rx="2"/>
      <path d="M5 11h14"/>
      <path d="M9 15.5c0-1 1.5-1.5 3-1.5s3 .5 3 1.5-1.5 1.5-3 1.5-3-.5-3-1.5z" fill={color} stroke="none" opacity="0.3"/>
    </svg>
  );
}

export function IconClean({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6L6 3"/>
      <path d="M13 10L9 6 3 12l4 4 6-6z"/>
      <path d="M13 10l3 3"/>
      <path d="M16 13l2 2-4 4-2-2"/>
      <path d="M18 15l3 3"/>
      <path d="M14 19l1 2"/>
    </svg>
  );
}

export function IconSnack({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11h18v2c0 4.4-3.6 8-8 8h-2c-4.4 0-8-3.6-8-8v-2z"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      <path d="M8 11V8.5"/>
      <path d="M12 11V7"/>
      <path d="M16 11V8.5"/>
    </svg>
  );
}

export function IconOther({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2h12l4 6-10 14L2 8z"/>
      <path d="M2 8h20"/>
      <path d="M12 8v14"/>
    </svg>
  );
}

export function IconCart({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  );
}

export function IconSearch({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

export function IconCheck({ size = 12, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  );
}

export function IconX({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  );
}

export function IconLocation({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>
    </svg>
  );
}

export function IconSparkle({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"/>
    </svg>
  );
}

export function IconArrowRight({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

export function IconArrowLeft({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  );
}

export function IconDownload({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

export function IconCopy({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    </svg>
  );
}

// Ícones por produto específico
export function IconRice({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="14" rx="8" ry="5"/>
      <path d="M12 9c0-3-2-6-5-7 1 2 1 5 5 7z"/>
      <path d="M12 9c0-3 2-6 5-7-1 2-1 5-5 7z"/>
      <path d="M12 9c-3 0-6-1-7-4 2 1 5 1 7 4z"/>
      <path d="M12 9c3 0 6-1 7-4-2 1-5 1-7 4z"/>
    </svg>
  );
}

export function IconBottle({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6v2l2 3v12a1 1 0 01-1 1H8a1 1 0 01-1-1V8l2-3V3z"/>
      <path d="M7 10h10"/>
    </svg>
  );
}

// Mapa de ícone por categoria
export const CAT_ICON_MAP = {
  "Alimentos Básicos": IconGrain,
  "Carnes": IconMeat,
  "Frutas & Vegetais": IconVegetable,
  "Laticínios": IconMilk,
  "Produtos de Limpeza": IconClean,
  "Snacks & Biscoitos": IconSnack,
  "Outros": IconOther,
};

// Ícone pequeno por produto (SVG path inline por categoria)
export function ProdutoIcon({ categoria, size = 14 }) {
  const Comp = CAT_ICON_MAP[categoria] || IconOther;
  return <Comp size={size} color="currentColor" />;
}
