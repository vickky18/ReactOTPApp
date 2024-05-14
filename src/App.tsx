import React, { useState } from "react";
import { LoginScreen } from "./pages/LoginScreen";
import { OtpScreen } from "./pages/OtpScreen";
import { HomeScreen } from "./pages/HomeScreen";
import { NotFoundScreen } from "./pages/NotFoundScreen";

import "./styles.css";

const Router = () => {
  const [route, setRoute] = useState(window.location.pathname);

  if (route === "/") {
    return <LoginScreen />;
  }

  if (route === "/otp") {
    return <OtpScreen />;
  }

  if (route === "/home") {
    return <HomeScreen />;
  }

  return <NotFoundScreen />;
};

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Router />
    </div>
  );
}
