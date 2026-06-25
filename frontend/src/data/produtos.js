// Produtos pré-definidos com quantidade base por pessoa por dia
// sem emojis — ícones SVG via componente ProdutoIcon

export const PRODUTOS_SUGERIDOS = {
  "Alimentos Básicos": [
    { id: "arroz", nome: "Arroz", quantidade_base: 0.1, unidade: "kg", preco_estimado: 6.5 },
    { id: "feijao", nome: "Feijão", quantidade_base: 0.05, unidade: "kg", preco_estimado: 8.9 },
    { id: "farinha-trigo", nome: "Farinha de Trigo", quantidade_base: 0.03, unidade: "kg", preco_estimado: 4.5 },
    { id: "acucar", nome: "Açúcar", quantidade_base: 0.02, unidade: "kg", preco_estimado: 4.2 },
    { id: "sal", nome: "Sal", quantidade_base: 0.005, unidade: "kg", preco_estimado: 2.5 },
    { id: "oleo", nome: "Óleo de Soja", quantidade_base: 0.015, unidade: "l", preco_estimado: 7.9 },
    { id: "cafe", nome: "Café em Pó", quantidade_base: 0.01, unidade: "kg", preco_estimado: 22.0 },
    { id: "macarrao", nome: "Macarrão", quantidade_base: 0.04, unidade: "kg", preco_estimado: 4.8 },
    { id: "fuba", nome: "Fubá", quantidade_base: 0.02, unidade: "kg", preco_estimado: 3.5 },
    { id: "aveia", nome: "Aveia", quantidade_base: 0.02, unidade: "kg", preco_estimado: 9.9 },
    { id: "extrato-tomate", nome: "Extrato de Tomate", quantidade_base: 0.01, unidade: "kg", preco_estimado: 3.2 },
    { id: "caldo-legumes", nome: "Caldo de Legumes", quantidade_base: 0.005, unidade: "kg", preco_estimado: 5.5 },
    { id: "vinagre", nome: "Vinagre", quantidade_base: 0.005, unidade: "l", preco_estimado: 3.9 },
    { id: "azeite", nome: "Azeite", quantidade_base: 0.008, unidade: "l", preco_estimado: 28.9 },
  ],
  "Carnes": [
    { id: "frango", nome: "Frango (peito)", quantidade_base: 0.12, unidade: "kg", preco_estimado: 18.9 },
    { id: "carne-moida", nome: "Carne Moída", quantidade_base: 0.08, unidade: "kg", preco_estimado: 32.9 },
    { id: "file-boi", nome: "Filé de Boi", quantidade_base: 0.08, unidade: "kg", preco_estimado: 55.9 },
    { id: "linguica", nome: "Linguiça", quantidade_base: 0.04, unidade: "kg", preco_estimado: 19.9 },
    { id: "ovo", nome: "Ovos", quantidade_base: 0.3, unidade: "un", preco_estimado: 0.85 },
    { id: "atum-lata", nome: "Atum em Lata", quantidade_base: 0.02, unidade: "kg", preco_estimado: 8.9 },
    { id: "sardinha", nome: "Sardinha em Lata", quantidade_base: 0.02, unidade: "kg", preco_estimado: 5.9 },
    { id: "peito-peru", nome: "Peito de Peru", quantidade_base: 0.03, unidade: "kg", preco_estimado: 42.9 },
    { id: "costelinha", nome: "Costelinha Suína", quantidade_base: 0.08, unidade: "kg", preco_estimado: 24.9 },
  ],
  "Frutas & Vegetais": [
    { id: "tomate", nome: "Tomate", quantidade_base: 0.05, unidade: "kg", preco_estimado: 6.9 },
    { id: "batata", nome: "Batata", quantidade_base: 0.08, unidade: "kg", preco_estimado: 5.9 },
    { id: "cebola", nome: "Cebola", quantidade_base: 0.03, unidade: "kg", preco_estimado: 4.5 },
    { id: "alho", nome: "Alho", quantidade_base: 0.005, unidade: "kg", preco_estimado: 35.0 },
    { id: "banana", nome: "Banana", quantidade_base: 0.1, unidade: "kg", preco_estimado: 4.9 },
    { id: "maca", nome: "Maçã", quantidade_base: 0.08, unidade: "kg", preco_estimado: 8.9 },
    { id: "laranja", nome: "Laranja", quantidade_base: 0.1, unidade: "kg", preco_estimado: 4.5 },
    { id: "alface", nome: "Alface", quantidade_base: 0.02, unidade: "kg", preco_estimado: 3.9 },
    { id: "cenoura", nome: "Cenoura", quantidade_base: 0.04, unidade: "kg", preco_estimado: 4.5 },
    { id: "limao", nome: "Limão", quantidade_base: 0.02, unidade: "kg", preco_estimado: 6.9 },
    { id: "mamao", nome: "Mamão", quantidade_base: 0.1, unidade: "kg", preco_estimado: 4.5 },
    { id: "brocolis", nome: "Brócolis", quantidade_base: 0.03, unidade: "kg", preco_estimado: 8.9 },
    { id: "batata-doce", nome: "Batata-Doce", quantidade_base: 0.05, unidade: "kg", preco_estimado: 6.9 },
    { id: "abacate", nome: "Abacate", quantidade_base: 0.04, unidade: "kg", preco_estimado: 9.9 },
  ],
  "Laticínios": [
    { id: "leite", nome: "Leite Integral", quantidade_base: 0.25, unidade: "l", preco_estimado: 4.9 },
    { id: "manteiga", nome: "Manteiga", quantidade_base: 0.01, unidade: "kg", preco_estimado: 32.9 },
    { id: "queijo-mussarela", nome: "Queijo Mussarela", quantidade_base: 0.02, unidade: "kg", preco_estimado: 45.9 },
    { id: "iogurte", nome: "Iogurte Natural", quantidade_base: 0.08, unidade: "kg", preco_estimado: 8.5 },
    { id: "requeijao", nome: "Requeijão", quantidade_base: 0.015, unidade: "kg", preco_estimado: 14.9 },
    { id: "creme-leite", nome: "Creme de Leite", quantidade_base: 0.01, unidade: "l", preco_estimado: 5.9 },
    { id: "queijo-prato", nome: "Queijo Prato", quantidade_base: 0.015, unidade: "kg", preco_estimado: 55.9 },
  ],
  "Produtos de Limpeza": [
    { id: "detergente", nome: "Detergente", quantidade_base: 0.005, unidade: "l", preco_estimado: 3.9 },
    { id: "sabao-po", nome: "Sabão em Pó", quantidade_base: 0.01, unidade: "kg", preco_estimado: 18.9 },
    { id: "desinfetante", nome: "Desinfetante", quantidade_base: 0.008, unidade: "l", preco_estimado: 6.9 },
    { id: "esponja", nome: "Esponja de Cozinha", quantidade_base: 0.005, unidade: "un", preco_estimado: 2.5 },
    { id: "papel-higienico", nome: "Papel Higiênico", quantidade_base: 0.07, unidade: "un", preco_estimado: 1.2 },
    { id: "sabonete", nome: "Sabonete", quantidade_base: 0.015, unidade: "un", preco_estimado: 3.5 },
    { id: "shampoo", nome: "Shampoo", quantidade_base: 0.005, unidade: "l", preco_estimado: 18.9 },
    { id: "amaciante", nome: "Amaciante", quantidade_base: 0.005, unidade: "l", preco_estimado: 9.9 },
    { id: "agua-sanitaria", nome: "Água Sanitária", quantidade_base: 0.005, unidade: "l", preco_estimado: 4.9 },
    { id: "papel-toalha", nome: "Papel Toalha", quantidade_base: 0.02, unidade: "un", preco_estimado: 2.9 },
  ],
  "Snacks & Biscoitos": [
    { id: "biscoito-agua", nome: "Biscoito Água e Sal", quantidade_base: 0.02, unidade: "kg", preco_estimado: 5.9 },
    { id: "bolacha-recheada", nome: "Bolacha Recheada", quantidade_base: 0.015, unidade: "kg", preco_estimado: 7.9 },
    { id: "salgadinho", nome: "Salgadinho", quantidade_base: 0.015, unidade: "kg", preco_estimado: 9.9 },
    { id: "amendoim", nome: "Amendoim", quantidade_base: 0.01, unidade: "kg", preco_estimado: 12.9 },
    { id: "pipoca", nome: "Pipoca", quantidade_base: 0.01, unidade: "kg", preco_estimado: 8.9 },
    { id: "chocolate", nome: "Chocolate", quantidade_base: 0.008, unidade: "kg", preco_estimado: 35.9 },
    { id: "barra-cereal", nome: "Barra de Cereal", quantidade_base: 0.01, unidade: "un", preco_estimado: 3.5 },
    { id: "granola", nome: "Granola", quantidade_base: 0.015, unidade: "kg", preco_estimado: 19.9 },
  ],
  "Outros": [],
};

export const CATEGORIAS = Object.keys(PRODUTOS_SUGERIDOS);

export const TODOS_PRODUTOS = Object.entries(PRODUTOS_SUGERIDOS).flatMap(([cat, produtos]) =>
  produtos.map(p => ({ ...p, categoria: cat }))
);

export const PERIODOS = [
  { label: "1 Semana", dias: 7 },
  { label: "2 Semanas", dias: 14 },
  { label: "1 Mês", dias: 30 },
  { label: "2 Meses", dias: 60 },
];

export const CONSUMO_PRESETS = [
  { key: "pouco", label: "Pouco", desc: "~210g/refeição", multiplier: 0.7 },
  { key: "medio", label: "Médio", desc: "~300g/refeição", multiplier: 1.0 },
  { key: "muito", label: "Muito", desc: "~420g/refeição", multiplier: 1.4 },
];
