# Gerenciador de Despesas 2.0

Atividade prática da Aula 09 (Estado Global, Formulários e UX) — evolução do Gerenciador de Despesas com estado global, persistência, formulário validado e recursos de UX.

## Funcionalidades

- **Estado global** com Context API + `useReducer` (`src/store/expenses-context.js`)
  - Ações `ADD`, `UPDATE`, `DELETE` e `SET`, sempre retornando um novo array
  - Hook `useExpenses()` que lança erro se usado fora do Provider
  - Persistência com AsyncStorage (chave `@expenses`), protegida por `isLoaded`
- **Uma tela para criar e editar** (`src/screens/GerenciarDespesa.js`)
  - Parâmetro `expenseId` via `route.params`, título dinâmico com `navigation.setOptions`
  - Exclusão com `Alert.alert` de confirmação e retorno com `navigation.goBack()`
- **Formulário validado**
  - Estado único `form` + `handleChange(field, value)`
  - `validate(values)`: descrição ≥ 3 caracteres, valor > 0, data não futura, categoria obrigatória
  - Mensagem abaixo de cada campo e borda vermelha; somem ao corrigir
  - Categoria escolhida em `Modal` (`transparent`, `animationType="slide"`)
  - `KeyboardAvoidingView` + `ScrollView` para o teclado não cobrir o botão Salvar
- **Listas e busca**
  - `ListEmptyComponent` com ícone e orientação; `ListHeaderComponent` com quantidade e total
  - Busca por descrição sem diferenciar maiúsculas, com `useDebounce` e `useMemo`
- **Tema e plataforma**
  - Cores claro/escuro em `src/constants/theme.js`, aplicadas com `useColorScheme`
  - Sombra dos cards com `Platform.select` (iOS `shadow*`, Android `elevation`)
- **Bônus**
  - Filtro por categoria em chips, combinável com a busca
  - Botão "Limpar tudo" com confirmação (dispara `SET` com lista vazia)
  - Lista em 2 colunas com `useWindowDimensions` quando a largura é maior que 600

## Estrutura

```
App.js
src/
├── components/
│   ├── despesa/
│   │   ├── DespesaItem.js
│   │   ├── DespesaLista.js
│   │   ├── DespesaSaida.js
│   │   └── DespesaSumario.js
│   └── ui/
│       ├── FiltroCategoria.js
│       ├── IconButton.js
│       └── ModalCategoria.js
├── constants/
│   ├── categories.js
│   └── theme.js
├── hooks/
│   └── useDebounce.js
├── store/
│   └── expenses-context.js
├── screens/
│   ├── TodasDespesas.js
│   ├── DespesasRecentes.js
│   └── GerenciarDespesa.js
└── util/
    └── date.js
```

## Executar

```bash
npm install
npx expo start
```
