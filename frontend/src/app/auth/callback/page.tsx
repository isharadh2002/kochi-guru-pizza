"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setTokens } from "@lib/httpClient";
import { useAuth } from "@contexts/AuthContext";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const processAuth = async () => {
      const startTime = Date.now();
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      const error = searchParams.get("error");

      if (error) {
        // Ensure loading shows for at least 2 seconds
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, 2000 - elapsed);

        setTimeout(() => {
          setStatus("error");
          toast.error("Authentication failed");
          setTimeout(() => router.push("/login"), 2000);
        }, delay);
        return;
      }

      if (accessToken && refreshToken) {
        // Store tokens
        setTokens(accessToken, refreshToken);

        // Sync user state
        await refreshUser();

        // Ensure loading shows for at least 2 seconds
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, 2000 - elapsed);

        setTimeout(() => {
          setStatus("success");

          // Show success message for 3 seconds then redirect
          setTimeout(() => {
            toast.success("Login successful!");
            router.push("/");
          }, 3000);
        }, delay);
      } else {
        // Ensure loading shows for at least 2 seconds
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, 2000 - elapsed);

        setTimeout(() => {
          setStatus("error");
          toast.error("Authentication failed - missing tokens");
          setTimeout(() => router.push("/login"), 2000);
        }, delay);
      }
    };

    processAuth();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Authenticating
            </h2>
            <p className="text-gray-600">Please wait...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-pulse" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Authentication Success
            </h2>
            <p className="text-gray-600">Redirecting you to the homepage...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">❌</span>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-600">Redirecting you back...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Loading...
            </h2>
            <p className="text-gray-600">Please wait</p>
          </div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
