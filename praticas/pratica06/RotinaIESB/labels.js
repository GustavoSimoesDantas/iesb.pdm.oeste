// Rótulos e textos da interface, reunidos em um só lugar (Aula 03 —
// import/export nomeado). Qualquer texto exibido ao usuário deve vir daqui,
// nunca de uma string solta no meio do JSX.

export const STORAGE_KEY = '@rotina_iesb_compromissos';

export const tituloApp = 'RotinaIESB';

export const placeholderCompromisso = 'Ex.: Estudar Cálculo às 19h';

export const botaoAdicionar = 'Adicionar';

export const tituloLista = 'Compromissos do dia';

export const listaVazia = 'Nenhum compromisso ainda. Que tal cadastrar o primeiro?';

export const compromissoVazioTitulo = 'Compromisso vazio';
export const compromissoVazioMensagem = 'Digite o texto do compromisso antes de adicionar.';

export const erroCarregar = 'Não foi possível carregar seus compromissos salvos.';
export const erroSalvar = 'Não foi possível salvar seus compromissos agora.';

export const botaoRemover = 'Remover';

// Categorias disponíveis para um compromisso (desafio O1 — filtro por categoria).
export const CATEGORIAS = [
  { chave: 'aula', rotulo: 'Aula' },
  { chave: 'estudo', rotulo: 'Estudo' },
  { chave: 'trabalho', rotulo: 'Trabalho' },
  { chave: 'lazer', rotulo: 'Lazer' },
];

export const filtroTodos = 'Todos';
