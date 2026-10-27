# CampusGo

Atividade prática da Aula 10 de Programação para Dispositivos Móveis (IESB): Expo Router, recursos nativos do celular e consumo de API.

## Como rodar

```bash
cp .env.example .env
npm install
npx expo start
```

Abra no Expo Go. Se mudar o `.env`, reinicie o Expo (`npx expo start -c`).

## O que tem no app

| Aba / rota | Conteúdo |
| --- | --- |
| Início (`app/(tabs)/index.js`) | Mural com 10 avisos do JSONPlaceholder: carregando, erro com "Tentar novamente", lista com FadeIn e puxar para atualizar. Botão "Criar aviso" (bônus). |
| Tarefas (`app/(tabs)/tasks.js`) | Links para `/task/[id]`, modal `/new-task`, check-in "Estudei aqui", "Lembrar em 10 s" e "Concluir" com Haptics e DoneIcon (bônus). |
| Bolso (`app/(tabs)/wallet.js`) | Despesas do `ExpensesContext` da Aula 09, total com `reduce` e "Compartilhar resumo". |
| Perfil (`app/(tabs)/profile.js`) | Avatar da galeria salvo em `@profile-photo` e botão "Tirar foto" com permissão da câmera. |

## Estrutura

```
app/
├── _layout.js          # Stack + ExpensesContextProvider
├── new-task.js         # modal
├── task/[id].js
└── (tabs)/
    ├── _layout.js
    ├── index.js        # mural
    ├── tasks.js
    ├── wallet.js       # Bolso
    └── profile.js
components/  AppButton.js, DoneIcon.js, FadeIn.js
constants/   colors.js
hooks/       useNotices.js
services/    api.js, location.js, media.js, notifications.js
store/       expenses-context.js
.env.example
```
