# Gerenciador de Despesas

Expansão do app de controle de despesas da aula, com **categorização** e **filtro dinâmico por categoria**.

## Funcionalidades

- Cadastro, edição e exclusão de despesas (`GerenciarDespesa.js`)
  - Valor limitado a duas casas decimais via Regex `/^\d*\.?\d{0,2}$/` (`keyboardType="decimal-pad"`)
  - Seleção de data com `@react-native-community/datetimepicker` (no navegador, campo DD/MM/AAAA)
  - Seleção de categoria com `Pressable` lado a lado (Alimentação, Transporte, Lazer, Contas)
  - Validação de descrição, valor e categoria antes de salvar
- Listagem com `FlatList` + `keyExtractor` (`DespesaLista.js`)
- Item exibe descrição, categoria (tag), data formatada e valor (`DespesaItem.js`)
- Somatório com `.reduce()` e `R$ ... .toFixed(2)` (`DespesaSumario.js`)
  - **Bônus:** total fica vermelho quando ultrapassa R$ 200,00
- Filtro por categoria com `.filter()` nas abas Recentes e Todas (`util/filtro.js`)

## Estrutura

```
App.js
components/
  DespesaSaida/
    DespesaSaida.js
    DespesaLista.js
    DespesaItem.js
    DespesaSumario.js
  FiltroCategoria.js
  SeletorCategoria.js
  IconButton.js
constants/categorias.js
screens/
  DespesasRecentes.js
  TodasDespesas.js
  GerenciarDespesa.js
store/despesas-context.js
util/
  data.js
  filtro.js
```

## Executar

```bash
npm install
npx expo start
```
