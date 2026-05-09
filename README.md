# 🌐 CP2 — Consumo de API no React Native

**FIAP | Checkpoint 2 | React Native + TypeScript**

---

## 📱 Sobre o projeto

Aplicação React Native para consumo da API [JSONPlaceholder](https://jsonplaceholder.typicode.com), demonstrando boas práticas de arquitetura mobile com:

- Fetch API nativa
- Axios com Service Layer e Interceptors
- TanStack Query (cache, loading, error state)
- React Navigation (stack tipado)
- AsyncStorage (Offline First)
- TypeScript estrito (sem `any`)

---

## 🚀 Como rodar

### Pré-requisitos

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Emulador Android/iOS **ou** app Expo Go no celular

### Instalação

```bash
# 1. Clone o repositório
git clone <url-do-repo>
cd cp2-api-consumer

# 2. Instale as dependências
npm install

# 3. Inicie o projeto
npx expo start
```

### Executar no dispositivo

- **Android:** pressione `a` no terminal ou escaneie o QR code com o Expo Go
- **iOS:** pressione `i` no terminal ou escaneie o QR code com a câmera

---

## 📁 Estrutura do projeto

```
src/
├── services/
│   ├── api.ts            # Instância Axios + interceptors (Ex. 3 e 5)
│   ├── userService.ts    # Chamadas HTTP de usuários + cache AsyncStorage
│   └── postService.ts    # Chamadas HTTP de posts + cache AsyncStorage
│
├── hooks/
│   ├── useUsers.ts       # Custom hooks para usuários (TanStack Query)
│   └── usePosts.ts       # Custom hooks para posts (TanStack Query)
│
├── screens/
│   ├── HomeScreen.tsx         # Menu de navegação
│   ├── UsersFetchScreen.tsx   # Ex. 1 — Fetch API
│   ├── UsersScreen.tsx        # Ex. 6 — Axios + Hook
│   ├── UserDetailsScreen.tsx  # Ex. 6 — GET /users/:id
│   ├── UserPostsScreen.tsx    # Ex. 6 — GET /posts?userId=
│   ├── PostsScreen.tsx        # Ex. 6 — Top 20 posts
│   ├── CreatePostScreen.tsx   # Ex. 2 e 6 — POST
│   └── ErrorTestScreen.tsx    # Ex. 4 — Rota inexistente
│
├── components/
│   ├── Loading.tsx       # Spinner reutilizável
│   ├── ErrorMessage.tsx  # Erro com retry
│   ├── EmptyState.tsx    # Estado vazio
│   ├── UserCard.tsx      # Card de usuário
│   └── PostCard.tsx      # Card de post
│
├── navigation/
│   ├── AppNavigator.tsx  # Stack Navigator tipado
│   └── types.ts          # RootStackParamList
│
└── types/
    ├── user.ts           # Interface User, Address, Company
    └── post.ts           # Interface Post, CreatePostPayload
```

---

## 🧪 Exercícios implementados

| # | Tela | Tecnologia | Status |
|---|------|-----------|--------|
| 1 | `UsersFetchScreen` | Fetch API | ✅ |
| 2 | `CreatePostScreen` | Axios POST + validação | ✅ |
| 3 | `services/` + `hooks/` | Service Layer | ✅ |
| 4 | `ErrorTestScreen` | Tratamento de erro + retry | ✅ |
| 5 | `services/api.ts` | Axios Interceptors | ✅ |
| 6 | Telas principais | TanStack Query + Offline First | ✅ |

---

## ⚙️ Tecnologias

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React Native | 0.74 | Base |
| Expo | ~51 | Build e SDK |
| TypeScript | ^5.3 | Tipagem estrita |
| Axios | ^1.7 | HTTP requests + interceptors |
| TanStack Query | ^5.51 | Cache, loading, error states |
| React Navigation | ^6 | Navegação tipada |
| AsyncStorage | 1.23 | Cache offline |

---

## 🔍 Interceptors (Exercício 5)

Todo request feito pelo Axios inclui automaticamente:

```
Header: X-App-Name: ReactNativeClass
```

E loga no console:

```
Request: GET /users
Response: 200
```

---

## 📦 Entrega

- **Grupo:** 5 integrantes - rm557724 guilherme cezarino simoes / rm557813 fabrini araujo
- **Repositório:** link do GitHub https://github.com/GuilhermeCezarinoSimoes/Cp2mobile_api#
- **Enviar para:** Anderson da Silva Nascimento (Teams)
