// context/HippoContext.tsx - ОБНОВЛЕННАЯ ВЕРСИЯ
import { Hippo, HippoContextType, HippoStats } from '@/types/hippo';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const HippoContext = createContext<HippoContextType | undefined>(undefined);

const initialStats: HippoStats = {
    health: 100,
    satiety: 50,
    happiness: 70,
    cleanliness: 60,
    energy: 80,
    thirst: 30, // НОВЫЙ ПАРАМЕТР - жажда
};

const initialHippo: Hippo = {
    id: '1',
    name: 'Hippo',
    age: 1,
    stats: initialStats,
    createdAt: new Date(),
    lastFed: new Date(),
    lastCleaned: new Date(),
    lastPlayed: new Date(),
    lastWatered: new Date(), // НОВОЕ ПОЛЕ - время последнего питья
};

export function HippoProvider({ children }: { children: React.ReactNode }) {
    const [hippo, setHippo] = useState<Hippo | null>(() => {
        // Пытаемся загрузить из localStorage при инициализации
        if (typeof window !== 'undefined') {
            const savedName = localStorage.getItem('hippoName');
            const savedStats = localStorage.getItem('hippoStats');
            if (savedName) {
                const baseHippo = {
                    ...initialHippo,
                    name: savedName,
                    lastWatered: new Date() // Инициализируем для восстановленных данных
                };
                if (savedStats) {
                    try {
                        const parsedStats = JSON.parse(savedStats);
                        return {
                            ...baseHippo,
                            stats: { ...initialStats, ...parsedStats } // Сохраняем все параметры
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
            // Сохраняем в localStorage
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
            thirst: Math.max(0, (hippo?.stats.thirst || 0) + 5), // Еда увеличивает жажду
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
            thirst: Math.max(0, (hippo?.stats.thirst || 0) + 15), // Игра увеличивает жажду
        });
    }, [hippo?.stats, updateStats]);

    const sleep = useCallback(() => {
        updateStats({
            energy: Math.min(100, (hippo?.stats.energy || 0) + 50),
            health: Math.min(100, (hippo?.stats.health || 0) + 5),
            satiety: Math.max(0, (hippo?.stats.satiety || 0) - 5),
            thirst: Math.max(0, (hippo?.stats.thirst || 0) + 10), // Сон увеличивает жажду
        });
    }, [hippo?.stats, updateStats]);

    // НОВАЯ ФУНКЦИЯ: дать воду
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
                    thirst: Math.min(100, prev.stats.thirst + 0.25), // Жажда увеличивается со временем
                };
                // Если жажда слишком высокая - ухудшается здоровье
                if (updatedStats.thirst > 80) {
                    updatedStats.health = Math.max(0, updatedStats.health - 0.3);
                    updatedStats.happiness = Math.max(0, updatedStats.happiness - 0.2);
                }
                // Сохраняем в localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('hippoStats', JSON.stringify(updatedStats));
                }
                return {
                    ...prev,
                    stats: updatedStats,
                };
            });
        }, 30000); // Каждые 30 секунд
        return () => clearInterval(interval);
    }, []);

    const value: HippoContextType = {
        hippo,
        setHippo,
        updateStats,
        feed,
        clean,
        play,
        sleep,
        giveWater, // ДОБАВЛЯЕМ новую функцию в контекст
        resetHippo: () => {
            setHippo(initialHippo);
            if (typeof window !== 'undefined') {
                localStorage.removeItem('hippoStats');
            }
        },
        hasCompletedOnboarding: !!hippo?.name && hippo.name !== 'Hippo',
        completeOnboarding: (name: string) => {
            setHippo(prev => prev ? { ...prev, name } : prev);
        },
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