from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081", "http://127.0.0.1:4040"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

def format_to_scientific(num: float) -> str:
    """
    Formats a float number to a string, and converts to scientific notation 
    if needed (if length of the result > 13).

    For numbers with up to 10 decimal places, remove unnecessary trailing zeros.
    For longer numbers, use scientific notation with 2 decimal places.

    :param num: The number to format
    :return: The formatted string
    """
    num_str = f"{num:.10f}".rstrip("0").rstrip(".")
    if abs(num) < 1e-6 or abs(num) > 1e6:  
        return "{:.2e}".format(num)
    return num_str 

@app.post("/add/")
async def add_numbers(num1: float = Form(...), num2: float = Form(...)):
    """
    Adds two numbers and returns the result in a JSON format to the frontend.

    :param num1: The first number
    :param num2: The second number
    :return: A JSON object with the operation name, the two numbers, and their sum.
    """
    result = format_to_scientific(num1 + num2)
    return {"operation": "addition", "num1": num1, "num2": num2, "result": result}

@app.post("/subtract/")
async def subtract_numbers(num1: float = Form(...), num2: float = Form(...)):
    """
    Subtracts the second number from the first and returns the result in a JSON format to the frontend.

    :param num1: The first number
    :param num2: The second number
    :return: A JSON object with the operation name, the two numbers, and their difference.
    """
    result = format_to_scientific(num1 - num2)
    return {"operation": "subtraction", "num1": num1, "num2": num2, "result": result}