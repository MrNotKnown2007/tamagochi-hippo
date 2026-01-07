// components/HippoView.tsx
import { StyleSheet, View } from 'react-native';

interface HippoViewProps {
    mood?: 'happy' | 'sad' | 'hungry' | 'sleepy' | 'dirty';
    size?: 'small' | 'medium' | 'large';
}

export default function HippoView({
    mood = 'happy',
    size = 'medium'
}: HippoViewProps) {
    // Пустой компонент - ничего не рендерит
    return (
        <View style={styles.emptyContainer} />
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        // Можно задать размеры для сохранения места в лейауте
        width: 200, // или другой размер по умолчанию
        height: 200,
    },
});