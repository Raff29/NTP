import React, { createContext, useState } from "react";

type LoginFunction = (email: string, password: string) => Promise<any>;
type RegisterFunction = (
  email: string,
  password: string,
  confirm_password: string
) => Promise<any>;

interface AuthContextInterface {
  isAuthenticated: boolean;
  register: RegisterFunction;
  login: LoginFunction;
  logout: () => void;
}

interface ErrorData {
  message: string;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const register = async (
    email: string,
    password: string,
    confirm_password: string
  ) => {
    if (password !== confirm_password) {
      throw new Error("Passwords do not match");
    }

    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirm_password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData: ErrorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const userData = await response.json();
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    return userData;
  };

  const login = async (email: string, password: string) => {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData: ErrorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const userData = await response.json();
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    return userData;
  };

  const logout = async () => {
    const response = await fetch("/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
