// utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// Вместо проверки typeof window, используем Platform или другую проверку
const isWeb = typeof window !== 'undefined' && typeof document !== 'undefined';

export const storage = {
    async getItem(key: string): Promise<string | null> {
        try {
            if (isWeb && typeof localStorage !== 'undefined') {
                return localStorage.getItem(key);
            }
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error('Failed to get item from storage:', error);
            return null;
        }
    },

    async setItem(key: string, value: string): Promise<void> {
        try {
            if (isWeb && typeof localStorage !== 'undefined') {
                localStorage.setItem(key, value);
                return;
            }
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Failed to set item in storage:', error);
        }
    },

    async removeItem(key: string): Promise<void> {
        try {
            if (isWeb && typeof localStorage !== 'undefined') {
                localStorage.removeItem(key);
                return;
            }
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Failed to remove item from storage:', error);
        }
    },

    async clear(): Promise<void> {
        try {
            if (isWeb && typeof localStorage !== 'undefined') {
                localStorage.clear();
                return;
            }
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Failed to clear storage:', error);
        }
    },

    async getAllKeys(): Promise<string[]> {
        try {
            if (isWeb && typeof localStorage !== 'undefined') {
                return Object.keys(localStorage);
            }
            const keys = await AsyncStorage.getAllKeys();
            return [...keys];
        } catch (error) {
            console.error('Failed to get all keys from storage:', error);
            return [];
        }
    },

    async multiGet(keys: string[]): Promise<[string, string | null][]> {
        try {
            if (isWeb && typeof localStorage !== 'undefined') {
                return keys.map(key => [key, localStorage.getItem(key)]);
            }
            const result = await AsyncStorage.multiGet(keys);
            return result.map(([key, value]) => [key, value]);
        } catch (error) {
            console.error('Failed to multi get from storage:', error);
            return [];
        }
    },

    async multiSet(keyValuePairs: [string, string][]): Promise<void> {
        try {
            if (isWeb && typeof localStorage !== 'undefined') {
                keyValuePairs.forEach(([key, value]) => localStorage.setItem(key, value));
                return;
            }
            await AsyncStorage.multiSet(keyValuePairs);
        } catch (error) {
            console.error('Failed to multi set in storage:', error);
        }
    },
};