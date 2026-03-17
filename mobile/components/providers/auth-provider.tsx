
import { loginRequest, logoutRequest, refreshTokenRequest } from "@/lib/api/auth";
import { configureAuthHandlers, setAuthToken } from "@/lib/api/client";
import type { AuthSession, User } from "@/lib/types/auth";
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AUTH_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY, TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "@/lib/constants/storage-keys";
import { useStorageState } from "@/lib/hooks/use-storage";
import { LoginSchema } from "@/lib/validators/auth";
import { SplashScreen } from "expo-router";


SplashScreen.preventAutoHideAsync();

type AuthContextValue = {
    user: User | null;
    isLoggedIn: boolean;
    isReady: boolean;
    login: (payload: LoginSchema) => Promise<AuthSession>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
};


type StoredAuth = {
    isLoggedIn: boolean;
};
export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const clearingAuthRef = useRef(false);
    const [isReady, setIsReady] = useState(false);
    const [[storedUserLoading, storedUser], setStoredUser] = useStorageState(
        USER_STORAGE_KEY,
    );
    const [[storedAuthLoading, storedAuth], setStoredAuth] = useStorageState(
        AUTH_STORAGE_KEY,
    );
    const [[storedTokenLoading, token], setToken] = useStorageState(
        TOKEN_STORAGE_KEY, true
    );
    const [[storedRefreshLoading, storedRefreshToken], setStoredRefreshToken] = useStorageState(
        REFRESH_TOKEN_STORAGE_KEY, true
    );
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useCallback(async (payload: LoginSchema) => {
        console.log("[AUTH] login() called", payload);

        try {
            const data = await loginRequest(payload);
            console.log("[AUTH] login success response", data);

            const nextAuth: StoredAuth = {
                isLoggedIn: true,
            };

            const token = data.access;
            const refreshToken = data.refresh ?? null;

            const user: User = {
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                user_type: data.user_type,
                country: data.country ?? null,
                phone_number: data.phone_number ?? null,
                church: data.church ?? null,
                zone: data.zone ?? null,
            };

            console.log("[AUTH] setting state + storage");

            setStoredAuth(JSON.stringify(nextAuth));
            setUser(user);
            setStoredUser(JSON.stringify(user));
            setIsLoggedIn(true);
            setToken(token);
            setAuthToken(token);

            if (refreshToken) {
                console.log("[AUTH] storing refresh token");
                setStoredRefreshToken(refreshToken);
            }

            return data;
        } catch (error) {
            console.error("[AUTH] login error:", error);
            throw error;
        }
    }, [setStoredAuth, setStoredUser, setToken, setStoredRefreshToken]);

    const clearAuthState = useCallback(() => {
        if (clearingAuthRef.current) return;
        clearingAuthRef.current = true;

        setStoredUser(null);
        setStoredAuth(null);
        setToken(null);
        setStoredRefreshToken(null);
        setUser(null);
        setIsLoggedIn(false);
        setAuthToken(null);

        queueMicrotask(() => {
            clearingAuthRef.current = false;
        });
    }, [setStoredAuth, setStoredRefreshToken, setStoredUser, setToken]);

    const refresh = useCallback(async () => {
        if (!storedRefreshToken) {
            clearAuthState();
            return;
        }

        try {
            const data = await refreshTokenRequest(storedRefreshToken);
            setToken(data.access);
            setAuthToken(data.access);
            setIsLoggedIn(true);
        } catch (err) {
            console.warn("[AUTH] refresh failed", err);
            clearAuthState();
            throw err;
        }
    }, [clearAuthState, setToken, storedRefreshToken]);

    const logout = useCallback(async () => {
        console.log("[AUTH] logout() called", { storedRefreshToken });

        try {
            await logoutRequest(storedRefreshToken);
            console.log("[AUTH] logout API success");

            setStoredUser(null);
            setStoredAuth(null);
            setToken(null);
            setStoredRefreshToken(null);
            setUser(null);
            setIsLoggedIn(false);
            setAuthToken(null);
        } catch (err) {
            console.warn("[AUTH] logout error", err);
        }
    }, [setStoredAuth, setStoredUser, setStoredRefreshToken, setToken, storedRefreshToken]);

    useEffect(() => {
        if (isReady) return;
        if (storedUserLoading || storedAuthLoading || storedTokenLoading || storedRefreshLoading) return;

        try {
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }

            if (storedAuth) {
                const parsedAuth = JSON.parse(storedAuth);
                setIsLoggedIn(Boolean(parsedAuth?.isLoggedIn));
            }

            if (token) {
                setAuthToken(token);
            }
        } catch (error) {
            console.error("[AUTH] hydration failed", error);
            clearAuthState();
        } finally {
            setIsReady((prev) => (prev ? prev : true));
        }
    }, [
        clearAuthState,
        isReady,
        storedUserLoading,
        storedAuthLoading,
        storedTokenLoading,
        storedRefreshLoading,
        storedUser,
        storedAuth,
        token,
    ]);

    useEffect(() => {
        configureAuthHandlers({
            onRefreshAccessToken: async () => {
                if (!storedRefreshToken) return null;

                try {
                    const data = await refreshTokenRequest(storedRefreshToken);
                    setToken(data.access);
                    setAuthToken(data.access);
                    setIsLoggedIn(true);
                    return data.access;
                } catch {
                    return null;
                }
            },
            onAuthFailure: clearAuthState,
        });
    }, [clearAuthState, setToken, storedRefreshToken]);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);
    
    const value = useMemo(
        () => ({ user, isLoggedIn, isReady, login, refresh, logout }),
        [user, isLoggedIn, isReady, login, refresh, logout],
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}
