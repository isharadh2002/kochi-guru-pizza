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
            duration: 3000,
            style: {
              background: "#10b981",
              color: "#fff"
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#10b981"
            }
          },
          error: {
            duration: 4000,
            style: {
              background: "#ef4444",
              color: "#fff"
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#ef4444"
            }
          }
        }}
      />
    </AuthProvider>
  );
};
