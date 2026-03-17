import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useReducer } from "react";
import { Platform } from "react-native";

type LoadingState<T> = [boolean, T | null];
type UseStorageHook<T> = [LoadingState<T>, (value: T | null) => void];

function useAsyncState<T>(
  initialValue: LoadingState<T> = [true, null],
): UseStorageHook<T> {
  return useReducer(
    (state: LoadingState<T>, action: T | null = null): LoadingState<T> => [
      false,
      action,
    ],
    initialValue,
  ) as UseStorageHook<T>;
}

export async function setStorageItemAsync(
  key: string,
  value: string | null,
  secure: boolean = true,
) {
  try {
    if (Platform.OS === "web") {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } else if (!secure) {
      // UNSECURE MODE
      if (value === null) {
        await AsyncStorage.removeItem(key);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    } else {
      // SECURE MODE
      if (value === null) {
        await SecureStore.deleteItemAsync(key);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    }
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export function useStorageState(
  key: string,
  secure: boolean = true,
): UseStorageHook<string> {
  const [state, setState] = useAsyncState<string>();

  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        const value = localStorage.getItem(key);
        setState(value);
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else if (!secure) {
      AsyncStorage.getItem(key)
        .then((value) => setState(value))
        .catch((e) => console.error("AsyncStorage read error:", e));
    } else {
      SecureStore.getItemAsync(key)
        .then((value) => setState(value))
        .catch((e) => console.error("SecureStore read error:", e));
    }
  }, [key, secure, setState]);

  const setValue = useCallback(
    (value: string | null, optimistic = true) => {
      if (optimistic) setState(value);
      setStorageItemAsync(key, value, secure)
        .then(() => {
          if (!optimistic) setState(value);
        })
        .catch((e) => console.error("Failed to persist storage value:", e));
    },
    [key, secure, setState],
  );

  return [state, setValue];
}
