// types/hippo.ts
export type RootStackParamList = {
    onboarding: undefined;
    main: undefined;
    hippoDetail: { hippoId: string };
    settings: undefined;
    feeding: undefined;
    cleaning: undefined;
    playing: undefined;
    watering: undefined;
};

export type HippoStats = {
    health: number;
    satiety: number;
    happiness: number;
    cleanliness: number;
    energy: number;
    thirst: number;
};

// ДОБАВЛЯЕМ ТИП ПОЛА
export type HippoGender = 'male' | 'female';

export interface Hippo {
    id: string;
    name: string;
    gender: HippoGender; // НОВОЕ ПОЛЕ
    age: number; // в днях
    stats: HippoStats;
    createdAt: Date;
    lastFed?: Date;
    lastCleaned?: Date;
    lastPlayed?: Date;
    lastWatered?: Date;
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
    giveWater: () => void;
    resetHippo: () => void;
    hasCompletedOnboarding: boolean;
    completeOnboarding: (name: string, gender: HippoGender) => void; // ОБНОВЛЯЕМ ФУНКЦИЮ
}