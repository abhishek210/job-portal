import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("myKey");
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);

  const login = (userToken) => {
    console.log("AuthContext token", userToken);
    setToken(userToken);
  };
  const logout = () => {
    setToken(null);
  };
  console.log("AuthContext token outside", token);

  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
