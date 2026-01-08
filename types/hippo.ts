// types/hippo.ts
export type RootStackParamList = {
    onboarding: undefined;
    main: undefined;
    hippoDetail: { hippoId: string };
    settings: undefined;
    feeding: undefined;
    cleaning: undefined;
    playing: undefined;
    watering: undefined; // НОВЫЙ ЭКРАН
};

export type HippoStats = {
    health: number;
    satiety: number;
    happiness: number;
    cleanliness: number;
    energy: number;
    thirst: number; // НОВЫЙ ПАРАМЕТР
};

export interface Hippo {
    id: string;
    name: string;
    age: number; // в днях
    stats: HippoStats;
    createdAt: Date;
    lastFed?: Date;
    lastCleaned?: Date;
    lastPlayed?: Date;
    lastWatered?: Date; // НОВОЕ ПОЛЕ
}

export type HippoMood = 'happy' | 'sad' | 'hungry' | 'sleepy' | 'dirty' | 'thirsty';

// Типы для контекста
export interface HippoContextType {
    hippo: Hippo | null;
    setHippo: (hippo: Hippo) => void;
    updateStats: (stats: Partial<HippoStats>) => void;
    feed: () => void;
    clean: () => void;
    play: () => void;
    sleep: () => void;
    giveWater: () => void; // НОВАЯ ФУНКЦИЯ
    resetHippo: () => void;
    hasCompletedOnboarding: boolean;
    completeOnboarding: (name: string) => void;
}