
import { loginRequest, logoutRequest } from "@/lib/api/auth";
import { setAuthToken } from "@/lib/api/client";
import type { AuthSession, User } from "@/lib/types/auth";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
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
    const [isReady, setIsReady] = useState(false);
    const [[storedUserLoading, storedUser], setStoredUser] = useStorageState(
        USER_STORAGE_KEY,
    );
    const [[storedAuthLoading, storedAuth], setStoredAuth] = useStorageState(
        AUTH_STORAGE_KEY,
    );
    const [[, token], setToken] = useStorageState(
        TOKEN_STORAGE_KEY, true
    );
    const [[, storedRefreshToken], setStoredRefreshToken] = useStorageState(
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

    const refresh = useCallback(async () => {
        console.log("[AUTH] refresh() called", { token });

        if (!token) {
            console.log("[AUTH] no token → logging out");
            setIsLoggedIn(false);
            return;
        }

        try {
            console.log("[AUTH] attempting refresh...");
            // your API logic here
        } catch (err) {
            console.warn("[AUTH] refresh failed", err);
            setToken(null);
            setIsLoggedIn(false);
        }
    }, [token, setToken]);

    const logout = useCallback(async () => {
        console.log("[AUTH] logout() called", { storedRefreshToken });

        try {
            await logoutRequest(storedRefreshToken);
            console.log("[AUTH] logout API success");

            setStoredUser(null);
            setStoredAuth(null);
            setUser(null);
            setIsLoggedIn(false);
        } catch (err) {
            console.warn("[AUTH] logout error", err);
        }
    }, [setStoredAuth, setStoredUser, storedRefreshToken]);

    useEffect(() => {
        console.log("[AUTH] hydration effect triggered", {
            storedUserLoading,
            storedAuthLoading,
            storedUser,
            storedAuth,
        });

        if (storedUserLoading || storedAuthLoading) return;

        try {
            if (storedUser) {
                console.log("[AUTH] restoring user");
                setUser(JSON.parse(storedUser));
            }

            if (storedAuth) {
                console.log("[AUTH] restoring auth");
                const parsedAuth = JSON.parse(storedAuth);
                setIsLoggedIn(Boolean(parsedAuth?.isLoggedIn));
            }
        } catch (error) {
            console.error("[AUTH] hydration failed", error);
            setStoredUser(null);
            setStoredAuth(null);
        } finally {
            console.log("[AUTH] hydration complete → ready");
            setIsReady(true);
        }
    }, [storedUserLoading, storedAuthLoading, storedUser, storedAuth, setStoredAuth, setStoredUser]);

    useEffect(() => {
        console.log("[AUTH] isReady changed", isReady);

        if (isReady) {
            console.log("[AUTH] hiding splash screen");
            SplashScreen.hideAsync();
        }
    }, [isReady]);
    
    const value = useMemo(
        () => ({ user, isLoggedIn, isReady, login, refresh, logout }),
        [user, isLoggedIn, isReady, login, refresh, logout],
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

