"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authService } from "@services/authService";
import { getAccessToken } from "@lib/httpClient";
import { User } from "@typings/user";
import { AuthContextType } from "@typings/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();

      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          setUser(null);
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      toast.success("Login successful!");
      // Don't redirect - let the modal handle closing
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await authService.register(name, email, password);
      setUser(response.user);
      toast.success("Registration successful!");
      // Don't redirect - let the modal handle closing
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      throw error;
    }
  };

  const loginWithGoogle = () => {
    authService.loginWithGoogle();
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error: any) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
