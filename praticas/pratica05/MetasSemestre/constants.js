// Chave usada no AsyncStorage. Centralizada aqui para não haver risco de
// digitar a string errada em algum lugar.
export const STORAGE_KEY = '@metas_semestre';

// Textos da interface reunidos em um só lugar (mesma ideia do labels.js da Prática 04).
export const TEXTOS = {
  titulo: 'Metas do Semestre',
  placeholder: 'Ex.: Estudar 2h de Cálculo por dia',
  botaoAdicionar: 'Adicionar',
  listaVazia: 'Nenhuma meta ainda. Que tal cadastrar a primeira?',
  erroCarregar: 'Não foi possível carregar suas metas salvas.',
  erroSalvar: 'Não foi possível salvar suas metas agora.',
  metaVaziaTitulo: 'Meta vazia',
  metaVaziaMensagem: 'Digite o texto da meta antes de adicionar.',
};
