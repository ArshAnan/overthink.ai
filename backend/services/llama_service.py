from transformers import pipeline
import torch

llama_pipe = pipeline("text-generation", model="microsoft/phi-2", device=0 if torch.cuda.is_available() else -1, torch_dtype=torch.float16)  # Quantization
llama_pipe.model.half()

# Initialize an empty list to store the conversation history
conversation_history = []

def classify_thought(user_thought: str):
    # Append the user's thought to the conversation history
    conversation_history.append(f"User: {user_thought}")
    
    # Create the prompt with the conversation history
    formatted_history = "\n".join(conversation_history)
    prompt = f"""
You are an intelligent assistant. Your job is to both chat naturally and identify overthinking depending on the user's prompt.

1. If the user prompt appears to be normal conversation, respond casually and engage in the conversation.
2. If the user expresses a thought that might indicate overthinking, respond with positive affirmation and provide a brief explanation to help the user manage their thoughts.

Here are some examples of how to respond:

Example 1:
Thought: "I think I left the stove on. What if my house burns down?"
Answer: "It sounds like you're worried about leaving the stove on. It's always good to double-check, but try not to let this thought consume you. If you're really concerned, you can go back and check to ease your mind."

Example 2:
Thought: "I'm not sure if I did well on my exam. What if I fail?"
Answer: "It's natural to feel anxious about exams. Remember that one exam doesn't define your worth. Focus on what you can learn from the experience and how you can improve in the future."

Example 3:
Thought: "How are you today?"
Answer: "I'm doing well, thank you! How can I assist you today?"

Now, let's continue our conversation:

{formatted_history}

Assistant:
"""
    
    response = llama_pipe(prompt, max_new_tokens=200, do_sample=True, temperature=0.5)
    result = response[0]['generated_text'].replace(prompt, "").strip()
    
    # Extract the assistant's response by splitting the result and taking the last part
    assistant_response = result.split("Assistant:")[-1].strip()
    
    # Append the assistant's response to the conversation history
    conversation_history.append(f"Assistant: {assistant_response}")

    return {
        "thought": user_thought,
        "response": assistant_response
    }