"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@contexts/AuthContext";
import { authService } from "@services/authService";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.name === "ApiError" && error.details) {
        const serverErrors: Record<string, string> = {};
        error.details.forEach((detail: any) => {
          if (!serverErrors[detail.field]) {
            serverErrors[detail.field] = detail.message;
          }
        });
        setErrors(serverErrors);
      } else {
        setErrors({ form: error.message || "Login failed" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    authService.loginWithGoogle();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-orange-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-orange-600">
              Kochi Guru Pizza
            </h1>
          </Link>
          <p className="text-gray-600 mt-2">
            Welcome back! Please login to your account.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>

          {errors.form && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <Image
              src="/assets/logos/google-icon.svg"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-orange-600 hover:text-orange-700 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
