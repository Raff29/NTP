import React, { createContext, useState, useEffect, useMemo, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type LoginFunction = (email: string, password: string) => Promise<void>;
type RegisterFunction = (
  email: string,
  password: string,
  confirm_password: string
) => Promise<void>;

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(() => {
    const authData = localStorage.getItem("isAuthenticated");
    const expireAt = localStorage.getItem("expireAt");
    return authData && expireAt && new Date().getTime() < parseInt(expireAt);
  }));
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const expireAt = localStorage.getItem("expireAt");
      const authData = localStorage.getItem("isAuthenticated");
      if (authData && expireAt && new Date().getTime() < parseInt(expireAt)) {
        setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("expireAt");
      }
    };
    checkAuth();
  }, []); 

  const setAuthState = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    const expireAt = new Date().getTime() + 2 * 60 * 60 * 1000; 
    localStorage.setItem("expireAt", expireAt.toString());

  };


  const register = useCallback(async (
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

    setAuthState();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
  
      if (!response.ok) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("expireAt");
        const errorData: ErrorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      setAuthState();
  }, []);

  const logout = useCallback(async () => {
    const response = await fetch("/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("expireAt");
    navigate("/login");
  },[navigate]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      register,
      login,
      logout,
    }),
    [isAuthenticated, login, logout, register]
  )

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)
};

export default AuthContext;
