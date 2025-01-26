// context/UserContext.tsx
"use client";
import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
interface IUserInfo {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  courses: any[];
}
interface MainContextType {
  user: IUserInfo | null;
  setUser: React.Dispatch<React.SetStateAction<IUserInfo | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: boolean;
  logoutUser: () => void;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setUser(data.user);          
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [token]);

  const isLoggedIn = useMemo(() => {
    return !!user;
  }, [user]);

  const logoutUser = () => {
    logout().then(() => {
      router.push("/");
      setUser(null);
    });
  };
  return (
    <MainContext.Provider
      value={{ user, setUser, token, setToken, isLoggedIn, logoutUser }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = (): MainContextType => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
