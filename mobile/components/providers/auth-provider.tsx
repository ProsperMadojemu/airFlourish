
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

    const login = useCallback(
        async (payload: LoginSchema) => {
            try {
                const data = await loginRequest(payload);

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
                }

                setStoredAuth(JSON.stringify(nextAuth));
                setUser(user);
                setStoredUser(JSON.stringify(user));
                setIsLoggedIn(true);
                setToken(token);
                setAuthToken(token);
                if (refreshToken) {
                    setStoredRefreshToken(refreshToken);
                }
                return data;
            } catch (error) {
                console.error("Login error:", error);
                throw error;
            }
        },
        [
            setStoredAuth,
            setStoredUser,
            setToken,
            setStoredRefreshToken
        ]
    );

    const refresh = useCallback(async () => {
        if (!token) {
            setIsLoggedIn(false);
            return;
        }
        try {
            // const res = await backApi.get("/me", {
            //     headers: { Authorization: `Bearer ${token}` },
            // });
            // setUser(res.data);
            // setIsLoggedIn(true);
            // setStoredAuth(JSON.stringify({ isLoggedIn: true }));
        } catch (err) {
            console.warn("Re-login failed. Token may be invalid or expired.", err);
            setToken(null);
            setIsLoggedIn(false);
        }
    }, [setToken, token]);

    const logout = useCallback(async () => {
        try {
            await logoutRequest(storedRefreshToken);
            setStoredUser(null);
            setStoredAuth(null);
            setUser(null);
            setIsLoggedIn(false);
        } catch {

        }
    }, [setStoredAuth, setStoredUser, storedRefreshToken]);

    useEffect(() => {
        if (storedUserLoading || storedAuthLoading) return;

        try {
            if (storedUser) {
                setUser(JSON.parse(storedUser) as User);
            }
            if (storedAuth) {
                const parsedAuth = JSON.parse(storedAuth) as StoredAuth;
                setIsLoggedIn(Boolean(parsedAuth?.isLoggedIn));
            }
        } catch (error) {
            console.error("Failed to hydrate auth state:", error);
            setStoredUser(null);
            setStoredAuth(null);
        } finally {
            setIsReady(true);
        }
    }, [
        storedUserLoading,
        storedAuthLoading,
        storedUser,
        storedAuth,
        setStoredAuth,
        setStoredUser,
    ]);

    useEffect(() => {
        if (isReady) SplashScreen.hideAsync();
    }, [isReady]);
    const value = useMemo(
        () => ({ user, isLoggedIn, isReady, login, refresh, logout }),
        [user, isLoggedIn, isReady, login, refresh, logout],
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

