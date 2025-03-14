from fastapi import APIRouter  # Import APIRouter class
from models.schemas import ThoughtPrompt  # Import ThoughtPrompt model
from services.llama_service import classify_thought  # Import classify_thought function

router = APIRouter()  # Create APIRouter instance

@router.post("/analyze")  # Define POST endpoint at /analyze URL
async def analyze_thought(prompt: ThoughtPrompt):
    return classify_thought(prompt.thought)  # Return classification result