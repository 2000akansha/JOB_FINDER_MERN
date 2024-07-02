import React, { createContext, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Create a context with default values
export const Context = createContext({
  isAuthorized: false,
  user: {},
  token: "",
  role: "",
  setIsAuthorized: () => {},
  setUser: () => {},
  setToken: () => {},
  setRole: () => {},
});

export const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  const handleSetToken = (newToken) => {
    setToken(newToken);
  };

  const handleSetUser = (userData) => {
    console.log("Setting user data:", userData); // Log user data
    setUser(userData);
    if (userData.role) {
      setRole(userData.role);
    } else {
      console.log("Role is missing in user data");
    }
  };

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser: handleSetUser,
        token,
        setToken: handleSetToken,
        role,
        setRole,
      }}
    >
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
