from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from routers.diagnose import router as diagnose_router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AEO Diagnostic Tool")
templates = Jinja2Templates(directory="templates")

app.include_router(diagnose_router)

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
