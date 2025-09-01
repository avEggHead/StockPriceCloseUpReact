/* eslint react-refresh/only-export-components: "off" */

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, logout } from "../api/accountApi";

type User = { username: string } | null;

type UserContextType = {
  user: User;
  setUser: (u: User) => void;
  logoutUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  // check logged-in user on load
  useEffect(() => {
    async function fetchUser() {
      try {
        const u = await getCurrentUser();
        setUser(u);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  async function logoutUser() {
    await logout();
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
