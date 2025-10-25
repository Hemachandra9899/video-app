# Video App Starter 

A minimal full‑stack starter with:
- **Backend**: Node.js (ESM), Express, Socket.io, Multer, MongoDB (Mongoose)
- **Frontend**: Vite + React (JSX)
- **Video**: Upload + fake processing with live progress + HTTP Range streaming

## Quickstart

### Backend
```bash
cd backend
cp .env.example .env
npm i
npm run dev
```

### Frontend
```bash
cd frontend
echo 'VITE_API_URL="http://localhost:8080"' > .env
npm i
npm run dev
```

Open: http://localhost:5173

> Notes:
> - Replace the fake processing loop in `backend/src/services/processing.service.js` with FFmpeg + your analysis.
> - Streaming is via HTTP Range in `backend/src/utils/range.js`.
> - Auth is JWT. You'll likely want to add HTTPS, refresh tokens, and RBAC UI.
