import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { User } from '@/types/user';
import * as authService from '@/services/auth.service';
import axiosInstance from '@/services/axios';

interface AuthContextValue {
  user: User | null;
  login: (sid: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthReady: boolean;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ────────────────────────────────────────────────────────────────────────── */

const LOCAL_STORAGE_KEY = 'volunteerhub_token';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  /* ----------------------- util ----------------------- */
  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_KEY, token);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  };

  /* ----------------------- actions ----------------------- */
  const login = useCallback(async (sid: string, password: string) => {
    const { accessToken, user } = await authService.login(sid, password);
    setToken(accessToken);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const setUserProfile = useCallback((user: User) => {
    setUser(user);
  }, []);

  /* ----------------------- bootstrap ----------------------- */
  useEffect(() => {
    const bootstrap = async () => {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (!saved) {
        setIsAuthReady(true);
        return;
      }

      try {
        setToken(saved);
        const user = await authService.me(); // ตรวจสอบ token, ดึง profile
        setUser(user);
      } catch (err) {
        
        setToken(null);
        setUser(null);
      } finally {
        setIsAuthReady(true);
      }
    };
    bootstrap();
  }, []);

  /* ----------------------- interceptor refresh token ----------------------- */
  useEffect(() => {
    const id = axiosInstance.interceptors.response.use(
      (res) => res,
      async (error) => {
        const original = error.config;
        
        if (
          error.response?.status === 401 &&
          !original._retry &&
          localStorage.getItem(LOCAL_STORAGE_KEY)
        ) {
          original._retry = true;
          try {
            const { accessToken } = await authService.refresh();
            setToken(accessToken);
            return axiosInstance(original); // retry
          } catch (_) {
            logout();
          }
        }
        return Promise.reject(error);
      },
    );
    return () => axiosInstance.interceptors.response.eject(id);
  }, [logout]);

  const value = useMemo<AuthContextValue>(
    () => ({ 
      user, 
      login, 
      logout, 
      isAuthReady,
      setUser: setUserProfile 
    }),
    [user, login, logout, isAuthReady, setUserProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* ----------------------- custom hook ----------------------- */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider />');
  return ctx;
};
