import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // State to hold the current user, initially loaded from localStorage
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Login function that makes an API call and updates the user state
  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs);
    setCurrentUser(res.data);
  };

  // Logout function that clears the user state
  const logout = async () => {
    // In a real app, you might also call a backend logout endpoint
    setCurrentUser(null);
  };

  // Use useEffect to save the user object to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
