# Taverna do Gregor

Aplicação web de gerenciamento de tarefas com uma temática medieval imersiva. As "tarefas" são missões dadas por **Gregor**, o anão atendente de uma taverna, que recompensa o usuário com ouro a cada missão cumprida.

Construída em **React 18 + Vite**, consumindo a [Todo API](https://github.com/MatheusMunduruca/todo-api) (.NET 8) com autenticação JWT.

---

## Conceito

Em vez de uma to-do list tradicional, o usuário entra em uma taverna onde Gregor o recebe e oferece missões:

> *"Bem... e que missão você procura aqui hoje?"*

Cada missão criada vira uma tarefa no banco. Ao concluí-la, Gregor parabeniza o viajante e entrega uma recompensa em ouro (10 a 100), acumulada em um contador persistente.

---

## Funcionalidades

### Funcionais
- Cadastro e login de usuários com autenticação **JWT**
- CRUD completo de missões (criar, listar, atualizar status, excluir)
- Filtro de missões por status: **A Iniciar**, **Em Curso**, **Cumpridas**
- Sistema de recompensa em ouro com persistência local
- Formatação dinâmica do contador: `999` → `1K` → `1M` → `1B` → `1T` → `999T+`
- Rotas protegidas (redireciona para login se não autenticado)

### Experiência
- Personagem interativo com sistema de diálogos contextuais
- Trilha sonora medieval de fundo (YouTube IFrame API)
- Sons ambientes da taverna (conversas e risadas em intervalos aleatórios)
- Efeito sonoro de recompensa ao receber ouro
- Som de passos durante a transição de login para a taverna
- Controle de volume global com slider e persistência de preferência
- Transições suaves entre telas (fade in/out)
- Iluminação dinâmica de vela tremulando

---

## Stack técnica

| Camada | Tecnologia |
|---|---|
| Framework | React 18 |
| Roteamento | React Router DOM 6 |
| HTTP Client | Axios |
| Build | Vite 5 |
| Estilização | CSS Modules |
| Tipografia | Google Fonts (MedievalSharp, Cinzel, Crimson Text) |
| Áudio | HTML5 Audio + YouTube IFrame API |
| Persistência local | localStorage (token JWT, ouro, volume) |

---

## Estrutura

```
src/
├── components/
│   ├── GregorScene.jsx      # Cena da taverna (background + personagem)
│   ├── DialogBox.jsx        # Balão de fala em estilo pergaminho
│   ├── GoldCounter.jsx      # Contador de ouro com animação
│   ├── MusicPlayer.jsx      # Player com volume + toggle
│   ├── AmbientSounds.jsx    # Sons aleatórios da taverna
│   └── TaskCard.jsx         # Card de missão
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Tasks.jsx            # Página principal (taverna)
├── services/
│   └── api.js               # Axios + interceptor JWT
└── utils/
    ├── formatGold.js        # Formatação K/M/B/T
    └── useVolume.js         # Hook de volume global
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
| `chatter.mp3` | Conversa pontual |
| `laugh.mp3` | Risada coletiva |
| `gold.mp3` | Efeito de moedas (recompensa) |
| `footsteps.mp3` | Passos em piso de madeira |

Se os arquivos não estiverem presentes, a aplicação funciona normalmente em silêncio.

### Imagens

Duas imagens são esperadas em `public/`:
- `tavern-bg.png` — cenário da taverna sem o personagem
- `gregor-only.png` — Gregor isolado com fundo transparente

---

## Decisões técnicas

- **CSS Modules** ao invés de framework (Tailwind, styled-components) para manter controle fino sobre a temática visual sem dependências extras.
- **YouTube IFrame API** para a trilha sonora — permite controle programático de volume mantendo a fonte original.
- **Sons em camadas separadas** (loop ambiente + sons aleatórios + eventos pontuais) com volumes proporcionais para evitar fadiga auditiva.
- **Persistência via localStorage** mantém o estado de ouro e preferências entre sessões sem necessidade de tabela extra no backend.
- **Sistema de diálogo baseado em estado** (`idle` / `happy`) controla expressões do personagem e animações do balão.
