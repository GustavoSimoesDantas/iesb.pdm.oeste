# Prática 06 — Atividade Integradora "RotinaIESB"

Esta pasta recebeu a **Atividade Integradora** (aulas 02 a 06), que substitui
o exercício simples de refatoração originalmente previsto para a Prática 06.
Em vez de só extrair um componente de um app já existente, o entregável aqui
é um app novo e completo: **RotinaIESB**.

Veja o app em [`RotinaIESB/`](RotinaIESB/) e a documentação completa (comando
de criação, estrutura, mapa dos `useEffect` e prints) em
[`RotinaIESB/README.md`](RotinaIESB/README.md).

## Fluxo Git desta entrega

```bash
git checkout -b feature/atividade03
```

Trabalho feito em `praticas/pratica06/RotinaIESB`.

## Resumo do que foi entregue

- Projeto Expo (`blank` template) com `@react-native-async-storage/async-storage`
  e `react-native-safe-area-context`.
- `labels.js` com rótulos exportados nomeadamente.
- Layout em Flexbox: cabeçalho (`row`) + formulário (`row`, input com
  `width: '68%'` + botão `flex: 1`) + lista (`flex: 1`).
- Componentização em `components/`: `CompromissoInput` e `CompromissoList`,
  ambos recebendo tudo via props.
- `useState` para texto, categoria e lista de compromissos; `id` único via
  `Date.now().toString()`; adicionar com validação e remover com `.filter`.
- Persistência via `AsyncStorage` + dois `useEffect` (carga e salvamento),
  com `try/catch` e `Alert.alert` em caso de erro.
- Desafios opcionais: **O1** (categoria + filtro) e **O4** (`FlatList` +
  `ListEmptyComponent`).

Prints da execução (vazia / com itens / após reabrir) estão em
[`prints/`](prints/).
