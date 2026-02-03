"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@contexts/AuthContext";
import {
  Menu,
  X,
  User,
  ShoppingBag,
  LayoutDashboard,
  LogOut,
  ChevronDown
} from "lucide-react";

const Header: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/75 backdrop-blur-md border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Kochi Guru Pizza"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold text-orange-600">
                Kochi Guru Pizza
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-orange-600 transition"
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="text-gray-700 hover:text-orange-600 transition"
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-orange-600 transition"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-orange-600 transition"
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
                        <img
                          src={user.profilePicture}
                          alt={user.name}
                          className="w-9 h-9 rounded-full object-cover"
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
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                        <Link
                          href="/orders"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          My Orders
                        </Link>
                        {(user.role === "admin" || user.role === "staff") && (
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                        )}
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-50"
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
                <div className="w-9 h-9 rounded-full bg-orange-100 animate-pulse" />
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="px-4 py-4 space-y-2">
              <Link
                href="/"
                className="block py-2 text-gray-700 hover:text-orange-600"
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="block py-2 text-gray-700 hover:text-orange-600"
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="block py-2 text-gray-700 hover:text-orange-600"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-gray-700 hover:text-orange-600"
              >
                Contact
              </Link>

              {!loading ? (
                user ? (
                  <>
                    <Link
                      href="/orders"
                      className="block py-2 text-gray-700 hover:text-orange-600"
                    >
                      My Orders
                    </Link>
                    {(user.role === "admin" || user.role === "staff") && (
                      <Link
                        href="/dashboard"
                        className="block py-2 text-gray-700 hover:text-orange-600"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full text-left py-2 text-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left py-2 text-gray-700"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left py-2 text-orange-600 font-medium"
                    >
                      Sign Up
                    </Link>
                  </>
                )
              ) : (
                <div className="py-4 space-y-4">
                  <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
                  <div className="h-4 w-32 bg-gray-100 animate-pulse rounded" />
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
