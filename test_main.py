import pytest
from fastapi.testclient import TestClient
from main import app, format_to_scientific 

client = TestClient(app)

def test_add_numbers():
    num1, num2 = 1.5, 2.5
    expected_result = format_to_scientific(num1 + num2)
    
    response = client.post("/add/", data={"num1": num1, "num2": num2})
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["operation"] == "addition"
    assert json_response["num1"] == num1
    assert json_response["num2"] == num2
    assert json_response["result"] == expected_result

def test_subtract_numbers():
    num1, num2 = 5.5, 3.2
    expected_result = format_to_scientific(num1 - num2)
    
    response = client.post("/subtract/", data={"num1": num1, "num2": num2})
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["operation"] == "subtraction"
    assert json_response["num1"] == num1
    assert json_response["num2"] == num2
    assert json_response["result"] == expected_result

def test_large_numbers():
    num1, num2 = 123456789012.345, 987654321098.765
    expected_result = format_to_scientific(num1 + num2)
    
    response = client.post("/add/", data={"num1": num1, "num2": num2})
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["result"] == expected_result

def test_small_numbers():
    num1, num2 = 0.000000123, 0.000000456
    expected_result = format_to_scientific(num1 + num2)
    
    response = client.post("/add/", data={"num1": num1, "num2": num2})
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["result"] == expected_result