from fastapi import FastAPI  # Import FastAPI class
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from routes import analyze  # Import analyze module from routes package

app = FastAPI()  # Create FastAPI application instance
app.include_router(analyze.router)  # Include router from analyze module

@app.get("/")  # Define GET endpoint at root URL
def root():
    return {"message": "Are you Overthinking?"}  # Return JSON response