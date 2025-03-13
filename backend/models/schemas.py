from pydantic import BaseModel

class ThoughtPrompt(BaseModel):
    thought: str  # Define thought field as string