import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import 'regenerator-runtime/runtime';

/**
 * This app component provides a simple calculator interface allowing users to add or subtract two numbers.
 * 
 * This manages the following states:
 * - num1, num2: input values for the calculation 
 * - result: stores the result of the calculation, which is retrieved via backend
 * - operationDone: indicates if a calculation has been completed successfully
 * - errorMessage: stores any validation error messages
 * 
 * This includes the following functionalities:
 * - clearAll: resets all inputs and states to their initial values for a clean slate
 * - validateInputs: checks if the provided inputs are valid numbers or entirely blank to use the default 0 value
 * - handleAddition: performs an addition operation by sending num1 and num2 to the backend and updates the result
 * - handleSubtraction: performs a subtraction operation by sending num1 and num2 to the backend and updates the result
 * 
 * This component renders input fields for numbers, buttons for performing operations, and displays result or error messages.
 */
const HomeScreen = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(0);
  const [operationDone, setOperationDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Resets all inputs and states to their initial values for a clean slate.
   */
  const clearAll = () => {
    setNum1("");
    setNum2("");
    setResult(0);
    setOperationDone(false);
    setErrorMessage("");
  };

/**
 * Converts a given input to a number. If the input is a valid number or fraction, 
 * it returns the corresponding float value. If the input is invalid or the fraction 
 * has a denominator of zero, it returns NaN. If the input is empty, it returns 0.
 * 
 * @param {string} num - The input string to be verified and converted.
 * @returns {number} - The numeric value of the input or NaN if invalid.
 */
  const verifyFraction = (num) => {
    if (!num) return 0; // default value of 0
    if (!isNaN(num)) return parseFloat(num); 

    const fractionMatch = num.match(/^(\d+)\/(\d+)$/); 
    if (fractionMatch) {
      const numerator = parseFloat(fractionMatch[1]);
      const denominator = parseFloat(fractionMatch[2]);
      if (denominator == 0) {
        return NaN; // valid fraction checking
      }
      return numerator / denominator; 
    }
    return NaN; 
  }

/**
 * Validates the current input values (num1 and num2) to ensure they are valid numbers or fractions.
 * 
 * If either input is invalid, it sets an error message to prompt the user to correct the input.
 * If the inputs are valid, it clears any existing error messages.
 * 
 * @returns {boolean} - Returns true if both inputs are valid, otherwise returns false.
 */
    const validateInputs = () => {
    if (
      (num1 !== "" && isNaN(verifyFraction(num1)) ||
      (num2 !== "" && isNaN(verifyFraction(num2))))
    ) {
      setOperationDone(false);
      setErrorMessage("Please enter valid numbers or fractions.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

/**
 * Sends the two input values (num1 & num2) to the backend to perform an addition operation,
 * and updates the result state with the returned value.
 * 
 * If the inputs are invalid, it will not perform the operation and will set an error message for clarity for the user.
 * If the backend returns an error, it will log the error and set an error message for easy debugging.
 */
  const handleAddition = async () => {
    if (!validateInputs()) return;

    try {
      const formData = new URLSearchParams();
      formData.append("num1", verifyFraction(num1));
      formData.append("num2", verifyFraction(num2));
  
      const response = await fetch("http://127.0.0.1:8000/add/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();
      setResult(data.result);
      setOperationDone(true);
    } catch (error) {
      console.error(`Error in handleAddition: ${error}`);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };
  
  /**
   * Sends the two input values (num1 & num2) to the backend to perform a subtraction operation,
   * and updates the result state with the returned value.
   * 
   * If the inputs are invalid, it will not perform the operation and will set an error message for clarity for the user.
   * If the backend returns an error, it will log the error and set an error message for easy debugging.
   */
  const handleSubtraction = async () => {
    if (!validateInputs()) return;
    
    try {
      const num1Value = num1;
      const num2Value = num2;
  
      const formData = new URLSearchParams();
      formData.append("num1", verifyFraction(num1));
      formData.append("num2", verifyFraction(num2));
  
      const response = await fetch("http://127.0.0.1:8000/subtract/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();
      setResult(data.result);
      setOperationDone(true);
    } catch (error) {
      console.error(`Error in handleSubtraction: ${error}`);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/icon.png")} style={styles.icon} />
      
      <Text style={styles.heading}>
        Insert the numbers you'd like to add or subtract, then click 'Add' or 'Subtract' to get the answer!
      </Text>

      <SafeAreaView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First number"
          placeholderTextColor="grey"
          keyboardType="numeric"
          value={num1}
          onChangeText={setNum1}
        />
        <TextInput
          style={styles.input}
          placeholder="Second number"
          placeholderTextColor="grey"
          keyboardType="numeric"
          value={num2}
          onChangeText={setNum2}
        />
      </SafeAreaView>
      
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      {operationDone && <Text style={styles.result}>= {result}</Text>}

      <SafeAreaView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleAddition()}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleSubtraction()}>
          <Text style={styles.buttonText}>Subtract</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
    bottom: -17,
  },
  gif: {
    width: 180,
    height: 55,
    top: 15,
    left: 20,
  },
  heading: {
    fontSize: 25,
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 50,
    top: 15,
  },
  icon: {
    width: 180,
    height: 180,
    marginTop: Platform.OS === 'web' ? 130 : 35,
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row", 
    top: 30, 
    alignItems: "center",
    alignSelf: "center",
  },
  input: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginHorizontal: 10,
    fontSize: 18,
    textAlign: "center",
  },
  result: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    top: 45,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "column",
    alignSelf: "center",
    top: 45,
  },
  button: {
    backgroundColor: "#55c4de",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;