# AEO Diagnostics (AEO Diagnostic Tool)

Diagnose whether AI engines recommend a target brand for a shopper-style query.

This repo contains:
- A **FastAPI backend** that queries multiple LLMs via **OpenRouter** and returns per-engine ranking signals.
- A **Next.js frontend** (in `aeo-frontend/`) that calls the backend and renders a polished UI.
- A simple **server-rendered HTML page** (Jinja template) served by the backend at `/`.

---

## What it does

Given:
- a shopper-style query (example: `best magnesium supplement for seniors`)
- a target brand (example: `Nature Made`)

The backend asks three AI engines for “top 5 product recommendations” (formatted as a numbered list), then checks whether the target brand appears in the numbered items.

**Scoring logic (current implementation)**
- Each engine result is parsed line-by-line.
- If a line starts with a digit (e.g. `1.` / `2.`) it is treated as a ranked item.
- If the target brand appears in a ranked line (case-insensitive), the engine is considered **ranked**, and `position` is the rank counter.
- The overall score is `rankedCount` out of 3.

---

## Architecture

### Backend (FastAPI)
- Entry point: `main.py`
- Routes: `routers/diagnose.py`
- LLM clients: `services/llm_openai.py`, `services/llm_claude.py`, `services/llm_gemini.py`
- Parsing: `services/parser.py`

The backend uses the `openai` Python SDK configured with:
- `base_url="https://openrouter.ai/api/v1"`
- `api_key=$OPENROUTER_API_KEY`

Each engine is implemented as an OpenRouter model call:
- OpenAI: `openai/gpt-4.1`
- Claude: `anthropic/claude-haiku-4-5`
- Gemini: `google/gemini-2.0-flash-001`

### Frontend (Next.js)
- App directory: `aeo-frontend/src/app`
- The main page uses the `useDiagnose` hook to call `POST /diagnose`.
- `aeo-frontend/next.config.ts` sets up a rewrite so the frontend can call `/diagnose` without hard-coding the backend origin.

### Server-rendered HTML (optional)
- Template: `templates/index.html`
- Served by the backend at `GET /`

Note: the template UI currently renders engine cards for **GPT-4.1** and **Gemini**. The API returns **GPT-4.1, Claude, and Gemini**.

---

## API

### `GET /health`
Returns a basic health check.

Response:
```json
{ "status": "ok" }
```

### `POST /diagnose`
Runs the diagnostic across OpenAI, Claude, and Gemini.

Request body:
```json
{
  "query": "best magnesium supplement for seniors",
  "targetBrand": "Nature Made"
}
```

Response body (shape):
```json
{
  "query": "...",
  "targetBrand": "...",
  "overallScore": "2 of 3 AI engines ranked your brand",
  "rankedCount": 2,
  "results": {
    "gpt4": {
      "ranked": true,
      "position": 2,
      "mention": "2. Nature Made - ...",
      "fullResponse": "...",
      "error": false
    },
    "claude": {
      "ranked": false,
      "position": null,
      "mention": null,
      "fullResponse": "...",
      "error": false
    },
    "gemini": {
      "ranked": false,
      "position": null,
      "mention": null,
      "fullResponse": "...",
      "error": false
    }
  }
}
```

Errors:
- If an upstream engine call fails, that engine result is returned with:
  - `error: true`
  - `fullResponse: "Error: ..."`

OpenAPI docs:
- Swagger UI: `GET /docs`
- ReDoc: `GET /redoc`

---

## Environment variables

### Backend
- `OPENROUTER_API_KEY` (required)
  - See `.env.example`

Optional/Platform-provided:
- `PORT` (used by the Procfile command in many PaaS environments)

### Frontend
- `NEXT_PUBLIC_API_URL` (optional)
  - If set, the Next.js dev server rewrites `/diagnose` to `${NEXT_PUBLIC_API_URL}/diagnose`.
  - If not set, it defaults to `http://localhost:8000/diagnose`.

---

## Local development

### 1) Run the backend

From the repo root:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
# edit .env and set OPENROUTER_API_KEY
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Then open:
- API docs: `http://localhost:8000/docs`
- Template UI (optional): `http://localhost:8000/`

### 2) Run the Next.js frontend

In a second terminal:

```powershell
cd aeo-frontend
npm install
# optional: set NEXT_PUBLIC_API_URL in aeo-frontend/.env.local
npm run dev
```

Open:
- `http://localhost:3000`

The frontend calls `POST /diagnose` and proxies it to the backend via a Next.js rewrite.

---

## Deployment

### Backend
The repo includes a `Procfile` suitable for platforms like Heroku:

- `web: uvicorn main:app --host 0.0.0.0 --port $PORT`

Set environment variables:
- `OPENROUTER_API_KEY`

### Frontend
Deploy `aeo-frontend/` to your preferred Next.js host (e.g. Vercel).

If the frontend and backend are on different origins:
- Set `NEXT_PUBLIC_API_URL` to the backend base URL.
- Ensure the backend is reachable from the frontend environment.

---

## Troubleshooting

- **401/403 from OpenRouter**: verify `OPENROUTER_API_KEY` is set correctly.
- **429 / rate limiting**: reduce request volume or check OpenRouter limits on your account.
- **"Not ranked" when the brand is present**: parsing currently only detects the brand inside lines that begin with a digit (ranked list items).
- **Running frontend against remote backend**: set `NEXT_PUBLIC_API_URL` and restart `npm run dev`.

---

## Repo layout

```
.
├─ main.py
├─ routers/
│  └─ diagnose.py
├─ services/
│  ├─ llm_openai.py
│  ├─ llm_claude.py
│  ├─ llm_gemini.py
│  └─ parser.py
├─ templates/
│  └─ index.html
└─ aeo-frontend/
   ├─ next.config.ts
   └─ src/
      ├─ app/
      ├─ components/
      ├─ hooks/
      └─ types/
```
