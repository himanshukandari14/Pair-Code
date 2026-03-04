# Talent Hunt (peer-code)

A real-time collaborative coding and video interview platform. Host or join coding sessions with live video calls, shared code editor, and in-session chat.

---

## Features

### Core
- **Video calls** – HD video/audio via Stream Video SDK (mute, camera toggle, screen share, reactions, recording)
- **Collaborative code editor** – Real-time sync with Liveblocks + Yjs, Monaco editor, syntax highlighting
- **Code execution** – Run code in JavaScript, Python, or Java via Judge0 API
- **Session chat** – In-call messaging via Stream Chat
- **Join/leave sounds** – Audio feedback when participants join or leave

### Sessions
- **Create room** – Host starts a session; gets unique invite link
- **Join room** – Share link; second participant joins (1 host + 1 participant per room)
- **End room** – Host can end; call and chat are cleaned up
- **Active sessions** – List of live rooms to join
- **Recent sessions** – History of completed sessions

### Auth & users
- **Clerk** – Sign in/sign up
- **User sync** – Inngest syncs Clerk users to MongoDB and Stream
- **Protected routes** – JWT auth for API and session access

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI |
| TypeScript | Type safety |
| Vite | Build tooling |
| Tailwind CSS + DaisyUI | Styling |
| React Router 7 | Routing |
| TanStack Query | Server state |
| Clerk | Auth |
| Stream Video SDK | Video calls |
| Stream Chat React | Chat |
| Liveblocks + Yjs | Real-time code sync |
| Monaco Editor | Code editor |
| Judge0 | Code execution |
| Axios | HTTP client |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express 5 | API server |
| TypeScript | Type safety |
| MongoDB + Mongoose | Database |
| Clerk Express | Auth middleware |
| Stream Node SDK | Video + chat backend |
| Inngest | Background jobs (user sync) |
| CORS | Cross-origin config |

---

## Project Structure

```
Talent-hunt/
├── backend/
│   ├── src/
│   │   ├── controllers/     # sessionController, chatController
│   │   ├── lib/             # db, env, stream, inngest
│   │   ├── middleware/      # protectRoute
│   │   ├── models/          # Session, User
│   │   ├── routes/          # sessionRoutes, chatRoutes
│   │   ├── types/
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/             # sessions API
│   │   ├── components/      # UI components
│   │   ├── data/            # languages config
│   │   ├── hooks/           # useSessions, useStreamClient
│   │   ├── lib/             # axios, judge0, stream
│   │   ├── pages/           # HomePage, DashboardPage, SessionPage
│   │   └── ...
│   └── package.json
└── README.md
```

---

## API Endpoints

### Session
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/session` | Yes | Create session |
| GET | `/api/session/active` | Yes | List active sessions |
| GET | `/api/session/my-recent` | Yes | List user's recent sessions |
| GET | `/api/session/:id` | Yes | Get session by ID |
| POST | `/api/session/:id/join` | Yes | Join session |
| POST | `/api/session/:id` | Yes | End session (host only) |

### Chat
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/chat/token` | Yes | Get Stream token for video/chat |

---

## Environment Variables

### Backend (`.env` in `backend/`)

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 3000) |
| `DB_URL` | Yes | MongoDB connection string |
| `CLIENT_URL` | Yes | Frontend URL (e.g. `http://localhost:5173`) |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key |
| `STREAM_API_KEY` | Yes | Stream API key |
| `STREAM_API_SECRET` | Yes | Stream API secret |
| `INNGEST_EVENT_KEY` | No | Inngest event key |
| `INNGEST_SIGNING_KEY` | No | Inngest signing key |

### Frontend (`.env` in `frontend/`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key |
| `VITE_API_URL` | Yes | Backend API URL (e.g. `http://localhost:3000`) |
| `VITE_STREAM_API_KEY` | Yes | Stream API key |
| `VITE_LIVEBLOCKS_PUBLIC_KEY` | Yes | Liveblocks public key |

---

## Setup

### Prerequisites
- Node.js 18+
- MongoDB
- Accounts: [Clerk](https://clerk.com), [Stream](https://getstream.io), [Liveblocks](https://liveblocks.io), [Judge0](https://judge0.com) (free tier)

### Backend

```bash
cd backend
npm install
cp .env.example .env   # create and fill .env
npm run dev            # tsx watch src/server.ts
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # create and fill .env
npm run dev            # Vite dev server
```

### Clerk webhooks (optional)
For user sync (Clerk → MongoDB + Stream), configure Inngest and Clerk webhooks:

1. Inngest dashboard: get `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY`
2. Clerk webhooks: add `clerk/user.created` and `clerk/user.deleted` pointing to `https://your-api/api/inngest`

---

## Supported Languages

| Language | Judge0 ID |
|----------|-----------|
| JavaScript (Node.js 18) | 93 |
| Python 3.11 | 92 |
| Java (JDK 17) | 91 |

---

## License

Private / Unlicensed
