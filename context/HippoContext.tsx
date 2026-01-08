// context/HippoContext.tsx - ИСПРАВЛЕННАЯ ВЕРСИЯ
import { Hippo, HippoContextType, HippoGender, HippoStats } from '@/types/hippo';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const HippoContext = createContext<HippoContextType | undefined>(undefined);

const initialStats: HippoStats = {
    health: 100,
    satiety: 50,
    happiness: 70,
    cleanliness: 60,
    energy: 80,
    thirst: 30,
};

const initialHippo: Hippo = {
    id: '1',
    name: 'Бегемотик',
    gender: 'male',
    age: 1,
    stats: initialStats,
    createdAt: new Date(),
    lastFed: new Date(),
    lastCleaned: new Date(),
    lastPlayed: new Date(),
    lastWatered: new Date(),
};

export function HippoProvider({ children }: { children: React.ReactNode }) {
    const [hippo, setHippo] = useState<Hippo | null>(() => {
        // Пытаемся загрузить из localStorage при инициализации
        if (typeof window !== 'undefined') {
            const savedName = localStorage.getItem('hippoName');
            const savedGender = localStorage.getItem('hippoGender') as HippoGender | null;
            const savedStats = localStorage.getItem('hippoStats');

            if (savedName) {
                const baseHippo = {
                    ...initialHippo,
                    name: savedName,
                    gender: savedGender || 'male',
                    lastWatered: new Date()
                };
                if (savedStats) {
                    try {
                        const parsedStats = JSON.parse(savedStats);
                        return {
                            ...baseHippo,
                            stats: { ...initialStats, ...parsedStats }
                        };
                    } catch (e) {
                        console.error('Failed to parse saved stats:', e);
                    }
                }
                return baseHippo;
            }
        }
        return initialHippo;
    });

    // Синхронизация с localStorage при изменениях
    useEffect(() => {
        const handleStorageChange = () => {
            if (typeof window !== 'undefined') {
                const savedName = localStorage.getItem('hippoName');
                const savedGender = localStorage.getItem('hippoGender') as HippoGender | null;

                setHippo(prev => {
                    if (!prev) return prev;

                    let updated = false;
                    const updates: Partial<Hippo> = {};

                    if (savedName && prev.name !== savedName) {
                        updates.name = savedName;
                        updated = true;
                    }

                    if (savedGender && prev.gender !== savedGender) {
                        updates.gender = savedGender;
                        updated = true;
                    }

                    return updated ? { ...prev, ...updates } : prev;
                });
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('storage', handleStorageChange);

            const interval = setInterval(handleStorageChange, 1000);

            return () => {
                window.removeEventListener('storage', handleStorageChange);
                clearInterval(interval);
            };
        }
    }, []);

    // Функция обновления статистики
    const updateStats = useCallback((newStats: Partial<HippoStats>) => {
        setHippo(prev => {
            if (!prev) return prev;
            const updatedStats = {
                health: Math.max(0, Math.min(100, newStats.health ?? prev.stats.health)),
                satiety: Math.max(0, Math.min(100, newStats.satiety ?? prev.stats.satiety)),
                happiness: Math.max(0, Math.min(100, newStats.happiness ?? prev.stats.happiness)),
                cleanliness: Math.max(0, Math.min(100, newStats.cleanliness ?? prev.stats.cleanliness)),
                energy: Math.max(0, Math.min(100, newStats.energy ?? prev.stats.energy)),
                thirst: Math.max(0, Math.min(100, newStats.thirst ?? prev.stats.thirst)),
            };
            const updatedHippo = {
                ...prev,
                stats: updatedStats,
                lastFed: newStats.satiety !== undefined ? new Date() : prev.lastFed,
                lastCleaned: newStats.cleanliness !== undefined ? new Date() : prev.lastCleaned,
                lastPlayed: newStats.happiness !== undefined ? new Date() : prev.lastPlayed,
                lastWatered: newStats.thirst !== undefined ? new Date() : prev.lastWatered,
            };
            if (typeof window !== 'undefined') {
                localStorage.setItem('hippoStats', JSON.stringify(updatedStats));
            }
            return updatedHippo;
        });
    }, []);

    // Функции действий
    const feed = useCallback(() => {
        updateStats({
            satiety: Math.min(100, (hippo?.stats.satiety || 0) + 30),
            happiness: Math.min(100, (hippo?.stats.happiness || 0) + 10),
            energy: Math.min(100, (hippo?.stats.energy || 0) + 5),
            thirst: Math.max(0, (hippo?.stats.thirst || 0) + 5),
        });
    }, [hippo?.stats, updateStats]);

    const clean = useCallback(() => {
        updateStats({
            cleanliness: Math.min(100, (hippo?.stats.cleanliness || 0) + 40),
            happiness: Math.min(100, (hippo?.stats.happiness || 0) + 5),
            energy: Math.max(0, (hippo?.stats.energy || 0) - 10),
        });
    }, [hippo?.stats, updateStats]);

    const play = useCallback(() => {
        updateStats({
            happiness: Math.min(100, (hippo?.stats.happiness || 0) + 20),
            energy: Math.max(0, (hippo?.stats.energy || 0) - 25),
            satiety: Math.max(0, (hippo?.stats.satiety || 0) - 10),
            thirst: Math.max(0, (hippo?.stats.thirst || 0) + 15),
        });
    }, [hippo?.stats, updateStats]);

    const sleep = useCallback(() => {
        updateStats({
            energy: Math.min(100, (hippo?.stats.energy || 0) + 50),
            health: Math.min(100, (hippo?.stats.health || 0) + 5),
            satiety: Math.max(0, (hippo?.stats.satiety || 0) - 5),
            thirst: Math.max(0, (hippo?.stats.thirst || 0) + 10),
        });
    }, [hippo?.stats, updateStats]);

    const giveWater = useCallback(() => {
        updateStats({
            thirst: Math.max(0, (hippo?.stats.thirst || 0) - 40),
            health: Math.min(100, (hippo?.stats.health || 0) + 10),
            happiness: Math.min(100, (hippo?.stats.happiness || 0) + 15),
        });
    }, [hippo?.stats, updateStats]);

    // Автоматическое ухудшение статистики
    useEffect(() => {
        const interval = setInterval(() => {
            setHippo(prev => {
                if (!prev) return prev;
                const updatedStats = {
                    health: Math.max(0, prev.stats.health - 0.1),
                    satiety: Math.max(0, prev.stats.satiety - 0.2),
                    happiness: Math.max(0, prev.stats.happiness - 0.1),
                    cleanliness: Math.max(0, prev.stats.cleanliness - 0.15),
                    energy: Math.min(100, prev.stats.energy + 0.1),
                    thirst: Math.min(100, prev.stats.thirst + 0.25),
                };
                if (updatedStats.thirst > 80) {
                    updatedStats.health = Math.max(0, updatedStats.health - 0.3);
                    updatedStats.happiness = Math.max(0, updatedStats.happiness - 0.2);
                }
                if (typeof window !== 'undefined') {
                    localStorage.setItem('hippoStats', JSON.stringify(updatedStats));
                }
                return {
                    ...prev,
                    stats: updatedStats,
                };
            });
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    // Функция завершения онбординга
    const completeOnboarding = useCallback((name: string, gender: HippoGender) => {
        setHippo(prev => {
            const updatedHippo = prev ? {
                ...prev,
                name,
                gender
            } : {
                ...initialHippo,
                name,
                gender
            };

            if (typeof window !== 'undefined') {
                localStorage.setItem('hippoName', name);
                localStorage.setItem('hippoGender', gender);
                localStorage.setItem('hasCreatedHippo', 'true');
            }

            return updatedHippo;
        });
    }, []);

    // Вычисляем hasCompletedOnboarding как boolean значение
    const hasCompletedOnboarding = (() => {
        if (typeof window !== 'undefined') {
            const hasCreated = localStorage.getItem('hasCreatedHippo') === 'true';
            const hasName = !!localStorage.getItem('hippoName');
            return hasCreated && hasName;
        }
        return false;
    })();

    const value: HippoContextType = {
        hippo,
        setHippo: (newHippo: Hippo) => {
            setHippo(newHippo);
            if (typeof window !== 'undefined') {
                localStorage.setItem('hippoName', newHippo.name);
                localStorage.setItem('hippoGender', newHippo.gender);
                localStorage.setItem('hippoStats', JSON.stringify(newHippo.stats));
            }
        },
        updateStats,
        feed,
        clean,
        play,
        sleep,
        giveWater,
        resetHippo: () => {
            setHippo(initialHippo);
            if (typeof window !== 'undefined') {
                localStorage.removeItem('hippoStats');
                localStorage.removeItem('hippoName');
                localStorage.removeItem('hippoGender');
                localStorage.removeItem('hasCreatedHippo');
            }
        },
        hasCompletedOnboarding, // теперь это boolean, а не функция
        completeOnboarding,
    };

    return (
        <HippoContext.Provider value={value}>
            {children}
        </HippoContext.Provider>
    );
}

export function useHippo() {
    const context = useContext(HippoContext);
    if (context === undefined) {
        throw new Error('useHippo must be used within a HippoProvider');
    }
    return context;
}