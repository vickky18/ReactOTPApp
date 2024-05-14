import React, { useState } from "react";

const generateRandomNumber = () => {
  // Generate a random number between 1000 and 9999
  return Math.floor(1000 + Math.random() * 9000);
};

export const LoginScreen = () => {
  const [creds, setCreds] = useState({ username: "", password: "" });

  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());

  const handleGenerate = () => {
    // Generate a new random number
    const newRandomNumber = generateRandomNumber();
    setRandomNumber(newRandomNumber);
  };

  const loginUser = () => {
    if (!creds.username || !creds.password) {
      window.alert("Username and password must be present");
      return;
    }
  
    const newRandomNumber = generateRandomNumber(); // Generate a new random number
    setRandomNumber(newRandomNumber); // Update the state with the new random number
  
    const queryParams = new URLSearchParams({
      authorization:
        "pgvSX2dBWO16U9DinYcNqoTPzLkE08CQtVmw54jaAfRHZlJ3rMWnglOS5qkwDi6Z8oH0aRxJuhsYvUPX",
      route: "otp",
      variables_values: newRandomNumber.toString(), // Pass the new random number
      flash: "0",
      numbers: "8248771151",
    }).toString();
  
    const url = `https://www.fast2sms.com/dev/bulkV2?${queryParams}`;
  
    // Make API call to send OTP
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to send OTP");
        }
      })
      .then((data) => {
        console.log(data); // Handle success response
        window.location.pathname = `/otp`; // Navigate to OTP screen with OTP value
      })
      .catch((error) => {
        console.error(error); // Handle error
        window.alert("Failed to send OTP. Please try again later.");
      });
  };
  

  const insertSpaces = (str: any) => {
    return str
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim(); // Insert space after every 4 characters
  };

  const handleUsernameChange = (e: any) => {
    const value = insertSpaces(e.target.value).slice(0, 14); // Allow only numbers and limit to 12 digits
    setCreds({ ...creds, username: value });
  };

  const handlePasswordChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Allow only numbers and limit to 10 digits
    setCreds({ ...creds, password: value });
  };

  return (
    <div>
      <p>Aadhar Number</p>
      <input
        placeholder="Aadhar Number"
        value={creds.username}
        onChange={handleUsernameChange}
        type="tel" // Use type="tel" for number pad
        pattern="[0-9]*" // Allow only numbers
        maxLength={14} // Limit to 12 digits with spaces
      />

      <p>Phone Number</p>
      <input
        placeholder="Phone Number"
        value={creds.password}
        onChange={handlePasswordChange}
        type="tel" // Use type="tel" for number pad
        pattern="[0-9]*" // Allow only numbers
        maxLength={10} // Limit to 10 digits
      />

      <br />
      <button style={{ marginTop: "20px" }} onClick={loginUser}>
        Register
      </button>
    </div>
  );
};
