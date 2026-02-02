// User interface
export interface User {
  _id: string;
  name: string;
  email: string;
  authProvider: "local" | "google" | "both";
  googleId?: string;
  role: "admin" | "staff" | "customer";
  phone?: string;
  profilePicture?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth Context Type
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

// Auth Response from API
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// API Error Response
export interface APIError {
  error: string;
}
