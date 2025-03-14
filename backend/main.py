from fastapi import FastAPI  # Import FastAPI class
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from routes import analyze  # Import analyze module from routes package
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()  # Create FastAPI application instance
app.include_router(analyze.router)  # Include router from analyze module


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific domains for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")  # Define GET endpoint at root URL
def root():
    return {"message": "Are you Overthinking?"}  # Return JSON response