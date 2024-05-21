import React, { createContext, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Create a context with default values
export const Context = createContext({
  isAuthorized: false,
  user: {},
  token: "",
  setIsAuthorized: () => {},
  setUser: () => {},
  setToken: () => {},
  
});

// Create a component to wrap the entire app with the context provider
export const AppWrapper = () => {
  // State variables for authorization, user data, and token
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  // Function to update the token
  const handleSetToken = (newToken) => {
    setToken(newToken);
  };

  return (
    // Provide the context values to the entire app
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
        token,
        setToken: handleSetToken,
      }}
    >
      {/* Render the main app component */}
      <App />
    </Context.Provider>
  );
};

// Use ReactDOM.createRoot instead of ReactDOM.render
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap the app with the AppWrapper component */}
    <AppWrapper />
  </React.StrictMode>
);