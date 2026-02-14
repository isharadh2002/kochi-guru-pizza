"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@contexts/AuthContext";
import {
  Menu,
  X,
  User,
  ShoppingBag,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Monitor
} from "lucide-react";
import { useTheme } from "@contexts/ThemeContext";

const Header: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isThemeExpanded, setIsThemeExpanded] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/75 dark:bg-gray-900/75 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.svg"
                  alt="Kochi Guru Pizza"
                  fill
                  className="object-contain dark:hidden"
                />
                <Image
                  src="/logo.svg"
                  alt="Kochi Guru Pizza"
                  fill
                  className="object-contain hidden dark:block"
                />
              </div>
              <span className="text-xl font-bold text-orange-600">
                Kochi Guru Pizza
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 transition"
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 transition"
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 transition"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 transition"
              >
                Contact
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="hidden md:flex items-center gap-4">
              {!loading ? (
                user ? (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 hover:opacity-80 transition"
                    >
                      {user.profilePicture ? (
                        <Image
                          src={user.profilePicture}
                          alt={user.name}
                          width={36}
                          height={36}
                          className="w-9 h-9 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <span className="text-gray-700 font-medium">
                        {user.name}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                        <Link
                          href="/orders"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          My Orders
                        </Link>
                        {(user.role === "admin" || user.role === "staff") && (
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                        )}
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="px-4 py-2 text-gray-700 hover:text-orange-600 transition"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                    >
                      Sign Up
                    </Link>
                  </>
                )
              ) : (
                <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-gray-700 animate-pulse" />
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg md:hidden z-40"
            >
              <nav className="px-4 py-4 space-y-2">
                <Link
                  href="/"
                  className="block py-2 text-gray-700 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/menu"
                  className="block py-2 text-gray-700 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium"
                >
                  Menu
                </Link>
                <Link
                  href="/about"
                  className="block py-2 text-gray-700 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block py-2 text-gray-700 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium"
                >
                  Contact
                </Link>

                {!loading ? (
                  user ? (
                    <>
                      <Link
                        href="/orders"
                        className="block py-2 text-gray-700 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium"
                      >
                        My Orders
                      </Link>
                      {(user.role === "admin" || user.role === "staff") && (
                        <Link
                          href="/dashboard"
                          className="block py-2 text-gray-700 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium"
                        >
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="block w-full text-left py-2 text-red-600 font-medium"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left py-2 text-gray-700 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left py-2 text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Sign Up
                      </Link>
                    </>
                  )
                ) : (
                  <div className="py-2 text-gray-500">Loading...</div>
                )}

                {/* Mobile Theme Toggle Button */}
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => setIsThemeExpanded(!isThemeExpanded)}
                    className="w-full flex items-center justify-between px-1 py-3 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                        {theme === "dark" ? (
                          <Moon className="w-5 h-5" />
                        ) : theme === "light" ? (
                          <Sun className="w-5 h-5" />
                        ) : (
                          <Monitor className="w-5 h-5" />
                        )}
                      </div>
                      <span className="font-medium">Appearance</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${isThemeExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Expanded Theme Options */}
                  <AnimatePresence>
                    {isThemeExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="space-y-1 overflow-hidden mt-2"
                      >
                        <button
                          onClick={() => setTheme("light")}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                            theme === "light"
                              ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          }`}
                        >
                          <Sun className="w-4 h-4" />
                          Light
                        </button>
                        <button
                          onClick={() => setTheme("dark")}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                            theme === "dark"
                              ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          }`}
                        >
                          <Moon className="w-4 h-4" />
                          Dark
                        </button>
                        <button
                          onClick={() => setTheme("system")}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                            theme === "system"
                              ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          }`}
                        >
                          <Monitor className="w-4 h-4" />
                          System
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
