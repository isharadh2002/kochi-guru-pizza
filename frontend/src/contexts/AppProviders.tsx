"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./AuthContext";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff"
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff"
            }
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff"
            }
          }
        }}
      />
    </AuthProvider>
  );
};
