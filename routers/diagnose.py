import asyncio
from fastapi import APIRouter
from pydantic import BaseModel, Field, validator
from services.llm_openai import call_openai
from services.llm_claude import call_claude
from services.llm_gemini import call_gemini
from services.parser import parse_response

router = APIRouter()

class DiagnoseRequest(BaseModel):
    """Request payload for checking a brand's visibility across AI engines."""

    query: str = Field(
        ...,
        description="The shopper-style search query to ask each AI engine.",
        example="best magnesium supplement for seniors",
        min_length=10,
    )
    targetBrand: str = Field(
        ...,
        description="The brand name to look for in each AI engine response.",
        example="Nature Made",
        min_length=2,
    )

    @validator("query")
    def query_min_length(cls, v):
        if len(v.strip()) < 10:
            raise ValueError("Query must be at least 10 characters")
        return v.strip()

    @validator("targetBrand")
    def brand_min_length(cls, v):
        if len(v.strip()) < 2:
            raise ValueError("Brand name must be at least 2 characters")
        return v.strip()

@router.post(
    "/diagnose",
    summary="Diagnose brand visibility across AI engines",
    description=(
        "Runs the same search query against OpenAI, Claude, and Gemini, then "
        "checks whether the target brand is mentioned or ranked in each response. "
        "The API returns per-engine results, the extracted mention, full model "
        "responses, and an overall visibility score."
    ),
)
async def diagnose(body: DiagnoseRequest):
    """Run a brand visibility diagnostic across OpenAI, Claude, and Gemini."""

    query = body.query
    brand = body.targetBrand

    raw_results = await asyncio.gather(
        call_openai(query),
        call_claude(query),
        call_gemini(query),
        return_exceptions=True
    )

    gpt_raw, claude_raw, gemini_raw = raw_results

    def safe_parse(raw):
        if isinstance(raw, Exception):
            return {
                "ranked": False,
                "position": None,
                "mention": None,
                "fullResponse": f"Error: {str(raw)}",
                "error": True
            }
        return parse_response(raw, brand)

    gpt_result = safe_parse(gpt_raw)
    claude_result = safe_parse(claude_raw)
    gemini_result = safe_parse(gemini_raw)

    ranked_count = sum([
        gpt_result["ranked"],
        claude_result["ranked"],
        gemini_result["ranked"]
    ])

    return {
        "query": query,
        "targetBrand": brand,
        "overallScore": f"{ranked_count} of 3 AI engines ranked your brand",
        "rankedCount": ranked_count,
        "results": {
            "gpt4": gpt_result,
            "claude": claude_result,
            "gemini": gemini_result
        }
    }
