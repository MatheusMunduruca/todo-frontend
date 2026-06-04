# Taverna do Gregor

Aplicação web de gerenciamento de tarefas com temática medieval imersiva. As tarefas são missões dadas por **Gregor**, o anão atendente de uma taverna, que recompensa o usuário com ouro a cada missão cumprida.

Construída em **React 18 + Vite**, consumindo a [Todo API](https://github.com/MatheusMunduruca/todo-api) (.NET 8) com autenticação JWT.

---

## 🌌 Universo compartilhado

A Taverna do Gregor faz parte de um ecossistema com o **[Empório do Rudolf](https://github.com/MatheusMunduruca/alchemist-frontend)** (loja de alquimia):

- **Login único:** uma conta criada aqui funciona no Empório e vice-versa (mesma chave JWT, mesma tabela de usuários).
- **Economia compartilhada:** o saldo de **Gold Coins** é persistido no backend e dividido entre os dois sites. O ouro ganho cumprindo missões com o Gregor é gasto comprando itens com o Rudolf.
- A tela de login tem um atalho: *"Quer verificar o mercado local? Visite o Empório do Rudolf"*.

---

## Conceito

Em vez de uma to-do list tradicional, o usuário entra em uma taverna onde Gregor o recebe e oferece missões:

> *"Bem... e que missão você procura aqui hoje?"*

Cada missão criada vira uma tarefa no banco. Ao concluí-la, Gregor parabeniza o viajante e entrega uma recompensa em ouro (**75–250**), persistida no backend e compartilhada com o Empório do Rudolf.

---

## Funcionalidades

### Gerenciamento de missões
- Cadastro e login com autenticação **JWT**
- CRUD completo de missões (criar com título e descrição, listar, atualizar status, excluir)
- Filtro por status: **A Iniciar**, **Em Curso**, **Cumpridas**
- Rotas protegidas — redireciona para login se não autenticado

### Sistema de recompensas
- Ouro aleatório (**75–250**) ao concluir cada missão
- Saldo **persistido no backend** (`todo_db.Users.GoldBalance`) e **compartilhado com o Empório do Rudolf**
- Saldo exibido no cabeçalho, sincronizado a cada acesso
- Formatação dinâmica: `999` → `1K` → `1M` → `1B` → `1T` → `999T+`

### Experiência imersiva
- Personagem **Gregor** com diálogos contextuais:
  - Saudação ao entrar na taverna
  - Confirmação ao criar missão
  - Parabenização ao concluir, com valor de ouro ganho
- Diálogo dura **15 segundos** ou some imediatamente ao clicar
- Trilha sonora medieval (YouTube IFrame API) com controle de volume
- Sons ambientes da taverna (conversas e risadas em intervalos aleatórios de 35–95s)
- Efeito sonoro de moedas ao receber ouro
- Som de passos na transição de login → taverna
- **Controle de volume global** com slider — afeta todos os sons simultaneamente
- Transição suave entre telas (fade in/out de 1.6s)
- Todos os sons param completamente ao fazer logout

---

## Stack técnica

| Camada | Tecnologia |
|---|---|
| Framework | React 18 |
| Roteamento | React Router DOM 6 |
| HTTP Client | Axios |
| Build | Vite 5 |
| Estilização | CSS Modules |
| Testes | Vitest + React Testing Library |
| Tipografia | Google Fonts (MedievalSharp, Cinzel, Crimson Text) |
| Áudio | HTML5 Audio + YouTube IFrame API |
| Persistência local | localStorage (token JWT, ouro por usuário, volume) |

---

## Testes

38 testes automatizados cobrindo utilitários e componentes principais.

```bash
npm test          # executa uma vez
npm run test:watch  # modo watch
```

| Arquivo | Testes | Cobertura |
|---|---|---|
| `formatGold.test.js` | 12 | Toda a lógica de formatação (0, K, M, B, T, 999T+) |
| `GoldCounter.test.jsx` | 5 | Renderização com diferentes valores |
| `TaskCard.test.jsx` | 10 | Título, descrição, badges, ciclo de status, delete |
| `DialogBox.test.jsx` | 3 | Renderização de mensagem e children |
| `Login.test.jsx` | 5 | Login, erro, loading, campos, link |

---

## Estrutura

```
src/
├── components/
│   ├── GregorScene.jsx      # Cena da taverna (background + personagem em camadas)
│   ├── DialogBox.jsx        # Balão de fala com clique para dispensar
│   ├── GoldCounter.jsx      # Contador com animação e formatação
│   ├── MusicPlayer.jsx      # Controle de volume + toggle play/pause
│   ├── AmbientSounds.jsx    # Sons aleatórios responsivos ao volume global
│   └── TaskCard.jsx         # Card de missão com ciclo de status
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Tasks.jsx
├── services/
│   └── api.js               # Axios + interceptor JWT
└── utils/
    ├── formatGold.js        # Formatação K/M/B/T
    └── useVolume.js         # Hook de volume global com persistência
```

---

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Todo API](https://github.com/MatheusMunduruca/todo-api) rodando em `http://localhost:5000`

### Instalação

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`

### Arquivos de áudio

Os efeitos sonoros não estão versionados. Para a experiência completa, baixe arquivos `.mp3` gratuitos (Pixabay, Mixkit) e coloque em `public/sounds/`:

| Arquivo | Descrição |
|---|---|
| `tavern-ambience.mp3` | Conversa baixa de fundo (loop) |
| `chatter.mp3` | Conversa pontual aleatória |
| `laugh.mp3` | Risada coletiva aleatória |
| `gold.mp3` | Efeito de moedas ao receber recompensa |
| `footsteps.mp3` | Passos na transição de login |

Sem os arquivos, a aplicação funciona normalmente em silêncio.

### Imagens

Duas imagens são esperadas em `public/`:

| Arquivo | Descrição |
|---|---|
| `tavern-bg.png` | Cenário da taverna sem o personagem |
| `gregor-only.png` | Gregor isolado com fundo transparente |

---

## Decisões técnicas

- **CSS Modules** para controle fino da temática visual sem dependências extras.
- **Camadas separadas de imagem** (background + personagem) permitem posicionamento independente do Gregor via CSS, simulando que ele está atrás do balcão.
- **YouTube IFrame API** para a trilha sonora com controle programático de volume.
- **Sons em camadas** (loop ambiente + eventos aleatórios + pontuais) com volumes proporcionais para evitar fadiga auditiva.
- **Hook `useVolume`** com eventos customizados garante que o slider afete todos os sons em tempo real, incluindo os que já estão tocando.
- **Ouro persistido no backend** (`todo_db.Users.GoldBalance`), compartilhado com o Empório do Rudolf via login único — o localStorage funciona apenas como cache para exibição imediata.
- **Sistema de diálogo baseado em estado** (`idle` / `happy`) controla expressões e duração do balão de fala.
