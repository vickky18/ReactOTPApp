import React, { useState, useRef, useEffect } from "react";

export const OtpScreen = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const otp = urlParams.get("otp");
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));

  useEffect(() => {
    const otp = otpDigits.join("");
    if (otp.length === 4) {
      // Perform validation or submission action here
      window.alert("OTP submitted successfully: " + otp); // Replace with your logic to submit OTP
    }
  }, [otpDigits]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value) || value.length > 1) return; // Only allow digits
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
    if (value !== "" && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
      window.location.pathname = "/home";
    }
  };

  return (
    <div>
      <p>OTP</p>
      <div>
        {otpDigits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            style={{ width: "30px", marginRight: "5px" }}
          />
        ))}
      </div>
    </div>
  );
};
