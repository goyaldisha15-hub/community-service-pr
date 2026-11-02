# NGO Connect Frontend

Mobile-friendly event registration and QR attendance frontend for NGOs.

## Run locally

```powershell
npm install
npm run dev
```

## Current roles

- `volunteer` — finds events, registers, scans a live event QR, and views attendance.
- `ngo_admin` — creates and manages events, assigns NGO Members, generates QR codes, reviews registrations, attendance, and reports.
- `ngo_member` — displays QR codes and views volunteers only for assigned events.

## Frontend data mode

Until a backend is connected, the app stores demo accounts, events, registrations, QR tokens, and attendance in browser `localStorage`.

This is only for frontend development. Passwords and attendance data must move to the backend before production use.

## Backend handoff

Set this environment variable after your Express API is running:

```text
VITE_API_URL=http://localhost:5000/api
```

The frontend API contract is in `src/services/api.js`.

| Feature | Endpoint |
| --- | --- |
| Login | `POST /auth/login` |
| Sign up | `POST /auth/register` |
| Logout | `POST /auth/logout` |
| Events | `GET /events`, `POST /events` |
| Edit event | `PATCH /events/:eventId` |
| Generate event QR | `POST /events/:eventId/qr` |
| Event registrations | `GET /events/:eventId/registrations` |
| QR check-in | `POST /events/:eventId/attendance` |

## Important folders

```text
src/
├── pages/       # Screens grouped by user role
├── components/  # Reusable route guards and UI pieces
├── context/     # Temporary frontend state and localStorage demo data
├── services/    # Future Express API calls
├── layouts/     # Public and signed-in page layouts
├── routes/      # Role-protected application routes
└── utils/       # Shared roles and event status constants
```
