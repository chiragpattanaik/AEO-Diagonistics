import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

client = AsyncOpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

PROMPT = """A shopper is searching for: '{query}'.
As an AI shopping assistant, give your top 5 product recommendations.
For each product include: brand name, product name, and one sentence explaining why.
Format your response as a numbered list like:
1. Brand Name - Product Name - Reason"""

async def call_claude(query: str) -> str:
    response = await client.chat.completions.create(
        model="anthropic/claude-haiku-4-5",
        messages=[{"role": "user", "content": PROMPT.format(query=query)}],
        max_tokens=1000,
        timeout=30
    )
    return response.choices[0].message.content
