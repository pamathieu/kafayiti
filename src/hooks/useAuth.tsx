import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => void;
}

const SESSION_KEY = "kafa_admin_session";
const EDIT_MODE_KEY = "kafa_edit_mode";
const HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH as string;

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try { return localStorage.getItem(SESSION_KEY) === "1"; } catch { return false; }
  });

  const signIn = async (_username: string, password: string): Promise<{ error: Error | null }> => {
    try {
      const hash = await sha256(password);
      if (hash === HASH) {
        localStorage.setItem(SESSION_KEY, "1");
        setIsAdmin(true);
        console.log("[Auth] Admin signed in.");
        return { error: null };
      }
      console.warn("[Auth] Invalid credentials.");
      return { error: new Error("invalid_credentials") };
    } catch (err) {
      console.error("[Auth] Sign-in error:", err);
      return { error: err instanceof Error ? err : new Error("unknown") };
    }
  };

  const signOut = () => {
    try {
      localStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(EDIT_MODE_KEY);
    } catch { /* ignore */ }
    setIsAdmin(false);
    console.log("[Auth] Admin signed out.");
  };

  return (
    <AuthContext.Provider value={{ user: null, isAdmin, loading: false, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
