import string
import random
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:1900",
    "http://localhost:1900/api",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def hello_world():
    return { "ping" : "pong" }

@app.post('/generate')
def generate_password(
    use_digit: bool = True,
    use_punctuation: bool = True,
    length: int = 8
):
    characters = string.ascii_letters

    if use_digit:
        characters += string.digits

    if use_punctuation:
        characters += string.punctuation

    if length > 32:
        length = 32
    
    if length < 8:
        length = 8

    password = ''.join(random.choice(characters) for _ in range(length))

    return { 'password' : password }

if __name__ == '__main__':
    uvicorn.run("main:app", host='0.0.0.0', port=8900, reload=True)