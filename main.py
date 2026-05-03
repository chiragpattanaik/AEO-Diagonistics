from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from routers.diagnose import router as diagnose_router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="AEO Diagnostic Tool",
    description="Diagnose whether AI engines recommend a target brand for a shopper-style query.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)
templates = Jinja2Templates(directory="templates")

app.include_router(diagnose_router)

@app.get("/health")
async def health_check():
    """Return a simple health check for deployment monitoring."""

    return {"status": "ok"}

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
