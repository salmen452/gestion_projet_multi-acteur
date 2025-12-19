# Copilot Instructions

## Project snapshot
- Stack: React (react-scripts) frontend in `src/`; Express 5 + Mongoose backend in `backend/`.
- API entrypoint `backend/index.js` mounts `backend/auth.js` router at `/api`; CORS currently allows `http://localhost:3000`.
- Env: set `MONGO_URI` (MongoDB connection) and optionally `JWT_SECRET`/`PORT` in `backend/.env`.

## Backend patterns
- Data models: `User` (email, name, phone, organisation, role member|coordinator), `Action` (title, desc, dueDate, priority, status, participants[] of user ids), `Meeting` (title, description, date, time, type, agenda[], participants[]), `Document` (name, type, date, file buffer + metadata).
- Auth middleware in `backend/middleware/auth.js`: `authenticate` reads `Authorization: Bearer <JWT>`; `authorizeRole('coordinator')` gates coordinator-only routes.
- Key routes in `backend/auth.js` (all prefixed with `/api`): signup/login -> JWT `{id, role, email}`; documents CRUD with file upload `file` via multer memory storage, download at `GET /documents/:id`; actions CRUD; meetings CRUD (multipart `.any()`, optional embedded `document` parsed from `document[name|type|file]`, download at `GET /Meetings/:id/document`); users list/CRUD; stats `GET /user-actions-stats` returns `{userId, fullName, actionCount}`.
- API path casing is mixed (`/Documents`, `/Actions`, `/Meetings`); Express is case-insensitive by default—keep current casing to match callers.
- Files are stored in MongoDB as buffers; downloads set `Content-Type`/`Content-Disposition` for the original name.

## Frontend patterns
- Routing in `src/App.js`: user flow `/signup` → `/login` → `/dashboard` guarded by `components/ProtectedRoute` (checks `localStorage.token`); admin flow uses `adminToken` and `components/admin/ProtectedRoute` for `/admin/*`.
- `src/authFetch.js` wraps `fetch` and injects `Authorization: Bearer ${localStorage.token}`; use it for protected API calls.
- Feature pages: `ActionsPage`, `DocumentsPage`, `MeetingsPage`, `UserActionsStats`. They hit `http://localhost:5000/api/*`, rely on user role (coordinator can create/update/delete; members see filtered data). Participant lists come from `/api/Users` and store user ids.
- Documents upload uses `FormData` with fields `name`, `file`, `type`, `date`; download uses `GET /api/documents/:id` blob handling. Meetings use JSON bodies (not multipart) from the UI even though backend accepts multipart.
- Admin `UserManagement` uses `/api/Users` for CRUD; leaving password blank on edit sends no password change client-side.

## Developer workflow
- Install and run frontend: `npm install`; `npm start` (port 3000).
- Run backend separately: `cd backend; node index.js` (no nodemon script; ensure `.env` is present).
- Tests: `npm test`; build: `npm run build`.
- When adding endpoints, mount under `/api` to stay behind existing proxy expectations; continue returning JSON `{message: ...}` on errors.

## Tips for agents
- Preserve role rules: coordinator-only for actions/documents/meetings mutations; current admin panel only manages users via stored `adminToken` (backend does not distinguish admin role beyond `role` field).
- Reuse `authFetch` and `ProtectedRoute` components for new protected flows; keep JWT in `localStorage` as the rest of the app does.
- For new uploads, keep multer field names (`file` for documents, `document[file]` when sending meeting documents) and expect MongoDB-stored buffers.
- If adding dashboards, note charts draw from `/api/Actions`, `/api/Documents`, `/api/Meetings`, and `/api/user-actions-stats`; maintain compatible shapes used in `ActionsChart`, `DocumentsChart`, and `UserActionsStats` (e.g., `priority`, `type`, `actionCount`).
