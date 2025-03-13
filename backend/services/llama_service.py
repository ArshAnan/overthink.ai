from transformers import pipeline
import torch

llama_pipe = pipeline("text-generation", model="meta-llama/Llama-2-7b-chat-hf", device = 0 if torch.cuda.is_available() else -1)

def classify_thought(user_thought: str):
    prompt = f"""
Determine if the following thought indicates overthinking. Respond with \"Yes\" or \"No\" and provide a brief explanation.

Thought: \"{user_thought}\"

Answer:
"""
    
    response = llama_pipe(prompt, max_new_tokens=100, do_sample=True)
    result = response[0]['generated_text'].replace(prompt, "").strip()

    lines = result.split("\n")
    return {
        "thought": user_thought,
        "classification": lines[0],
        "explanation": "\n".join(lines[1:]).strip()
    }