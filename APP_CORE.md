# Application Core Summary

This document captures the essential structure and behavior of the multi-actor project management app so another AI can align with the project report.

## Big Picture
- Full-stack: React SPA (react-scripts) + Express 5 + MongoDB.
- Two auth realms: user (member/coordinator) via `token`; admin via `adminToken` (frontend check).
- API base: `http://localhost:5000/api/*` (Express is case-insensitive, but routes are mixed-case: `/Actions`, `/Documents`, `/Meetings`, `/Users`).
- Data stored in MongoDB; documents and meeting attachments are binary buffers in collections.

## Roles & Permissions
- **Admin**: manages users (CRUD), roles, basic system settings via admin dashboard; access gated by `adminToken` on the client.
- **Coordinator**: can create/update/delete actions, documents, meetings; sees everything.
- **Member**: sees assigned actions/meetings and shared documents; read-only on most resources.

## Backend (Express + Mongoose)
- Entry: `backend/index.js` → mounts `backend/auth.js` at `/api`, enables CORS for `http://localhost:3000`, JSON body parsing.
- Auth middleware: `backend/middleware/auth.js` (`authenticate` reads `Authorization: Bearer <JWT>`, `authorizeRole('coordinator')` for protected mutations).
- JWT payload: `{ id, role, email }`; secret from `JWT_SECRET` or default.
- Key routes (all under `/api`):
  - Auth: `POST /signup`, `POST /login` → returns JWT + user (password removed).
  - Users: `GET /Users`, `POST /Users`, `PATCH /Users/:id`, `DELETE /Users/:id` (admin UI consumes; server does not enforce admin role beyond middleware usage in codebase).
  - Actions: `GET /Actions`, `POST /Actions`, `PATCH /Actions/:id`, `DELETE /Actions/:id` (coordinator-only mutations).
  - Documents: `GET /Documents`, `POST /Documents` (multer `file` upload), `PATCH /Documents/:id`, `DELETE /Documents/:id`, `GET /Documents/:id` (download).
  - Meetings: `GET /Meetings`, `POST /Meetings`, `PUT /Meetings/:id`, `DELETE /Meetings/:id`, `GET /Meetings/:id/document` (download). Backend accepts multipart `.any()` with optional `document[file|name|type]`; frontend sends JSON only.
  - Stats: `GET /user-actions-stats` → `{ userId, fullName, actionCount }` per participant.
- Models:
  - `User`: email, name, phone, organisation, password (bcrypt), role `member|coordinator`.
  - `Action`: title, description, dueDate (string), priority `Haute|Moyenne|Basse`, status `À faire|En cours|Terminées`, participants [userId].
  - `Meeting`: title, description, date (string), type, agenda[], participants[], time, duration optional; collection `Meetings`.
  - `Document`: name, type, date, file (Buffer), fileType, fileName; collection `Documents`.

## Frontend (React)
- Routing `src/App.js`:
  - Public: `/signup`, `/login`.
  - Protected user: `/dashboard`, `/actions`, `/meetings`, `/documents`, `/user-actions-stats`, etc. guarded by `components/ProtectedRoute` (checks `localStorage.token`).
  - Admin: `/admin/login`, `/admin/*` guarded by `components/admin/ProtectedRoute` (checks `adminToken`).
- Auth helper: `src/authFetch.js` injects `Authorization: Bearer <token>`.
- Key screens:
  - Dashboard: role-aware stats, charts (`ActionsChart`, `DocumentsChart`), upcoming meetings, high-priority actions; members see filtered data, coordinators see global.
  - ActionsPage: CRUD with modal; coordinator can assign participants (IDs from `/api/Users`); status transitions; filter by status.
  - DocumentsPage: multer-compatible upload (`name`, `file`, `type`, `date` via FormData); download by blob; coordinator can delete.
  - MeetingsPage: list + modal create/edit; frontend sends JSON (agenda, participants IDs); members see only meetings where they are participants; coordinator can delete.
  - UserActionsStats: bar chart per user from `/api/user-actions-stats`.
  - AdminDashboard/UserManagement: search, add, edit, delete users; leaving password blank on edit keeps old password; role switch member/coordinator; logout clears `adminToken`.

## Data/Files
- Files stored directly in MongoDB buffers; downloads set `Content-Type` + `Content-Disposition` with original filename.
- Meeting documents use nested `document[file|name|type]` when sent as multipart; frontend currently doesn’t attach files for meetings.

## Environment & Run
- Env: `MONGO_URI` required; optional `JWT_SECRET`, `PORT` in `backend/.env`.
- Run backend: `cd backend; node index.js` (no nodemon script).
- Frontend: `npm install`; `npm start` (React dev server on 3000; CORS allowed by backend).
- Tests: `npm test`; Build: `npm run build`.

## Integration Notes
- Keep API casing to avoid breaking existing fetches (`/Documents`, `/Actions`, `/Meetings`).
- Preserve role rules: coordinator-only mutations for actions/documents/meetings; admin UI manages users via stored `adminToken` (frontend-enforced).
- For new features, reuse `authFetch` and `ProtectedRoute` patterns and expect JWT in `localStorage`.
- Charts consume simple shapes: actions need `priority`/`status`; documents need `type`; stats expect `{ fullName, actionCount }`.
