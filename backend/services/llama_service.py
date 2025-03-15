from transformers import pipeline
import torch

llama_pipe = pipeline("text-generation", model="microsoft/phi-2", device = 0 if torch.cuda.is_available() else -1, torch_dtype=torch.float16) # Quantization)

def classify_thought(user_thought: str):
    prompt = f"""
You are an intelligent assistant. Your job is to both chat naturally and identify overthinking.

1. If the user is chatting normally, respond casually and helpfully.
2. If the user expresses a thought that might indicate overthinking, respond with "Yes" or "No" and provide a brief explanation.

Thought: \"{user_thought}\"

Answer:
"""
    
    response = llama_pipe(prompt, max_new_tokens=200, do_sample=True,temperature=0.5)
    result = response[0]['generated_text'].replace(prompt,  "").strip()

    lines = result.split("\n")
    return {
        "thought": user_thought,
        "classification": lines[0],
        "explanation": "\n".join(lines[1:]).strip()
    }