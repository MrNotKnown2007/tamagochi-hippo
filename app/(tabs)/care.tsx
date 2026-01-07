// app/(tabs)/care.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHippo } from '@/context/HippoContext';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CareScreen() {
  const { hippo, feed, clean, play, sleep } = useHippo();

  const handleFeed = () => {
    feed();
    Alert.alert('🍖 Накормлено!', 'Бегемотик доволен!');
  };

  const handleClean = () => {
    clean();
    Alert.alert('🛁 Помыто!', 'Бегемотик чистый и свежий!');
  };

  const handlePlay = () => {
    if ((hippo?.stats.energy || 0) < 20) {
      Alert.alert('😴 Устал', 'Бегемотику нужно спать!');
      return;
    }
    play();
    Alert.alert('🎮 Поиграли!', 'Бегемотик весело играл!');
  };

  const handleSleep = () => {
    sleep();
    Alert.alert('😴 Спит!', 'Бегемотик отдыхает и набирает энергию!');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Уход за бегемотиком</ThemedText>
      <ThemedText style={styles.subtitle}>
        Помогите {hippo?.name || 'бегемотику'} быть счастливым
      </ThemedText>

      <View style={styles.statsPreview}>
        <ThemedText style={styles.statsTitle}>Текущие показатели:</ThemedText>
        {hippo && (
          <View style={styles.statsRow}>
            <ThemedText>🍖 Сытость: {Math.round(hippo.stats.satiety)}%</ThemedText>
            <ThemedText>⚡ Энергия: {Math.round(hippo.stats.energy)}%</ThemedText>
            <ThemedText>✨ Чистота: {Math.round(hippo.stats.cleanliness)}%</ThemedText>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <ActionButtonWithIcon
          title="Кормить"
          icon={require('@/assets/images/eat_button.png')}
          onPress={handleFeed}
        />
        <ActionButtonWithIcon
          title="Мыть"
          icon={require('@/assets/images/bath_button.png')}
          onPress={handleClean}
        />
        <ActionButtonWithIcon
          title="Играть"
          icon={require('@/assets/images/talk_button.png')}
          onPress={handlePlay}
          disabled={(hippo?.stats.energy || 0) < 20}
        />
        <ActionButtonWithIcon
          title="Спать"
          icon={require('@/assets/images/sleep_button.png')}
          onPress={handleSleep}
        />
      </View>

      <View style={styles.tips}>
        <ThemedText style={styles.tipTitle}>💡 Советы:</ThemedText>
        <ThemedText style={styles.tip}>• Кормите, когда сытость ниже 50%</ThemedText>
        <ThemedText style={styles.tip}>• Мойте, когда чистота ниже 40%</ThemedText>
        <ThemedText style={styles.tip}>• Играйте, когда энергия выше 20%</ThemedText>
        <ThemedText style={styles.tip}>• Укладывайте спать, когда энергия ниже 30%</ThemedText>
      </View>
    </ThemedView>
  );
}

function ActionButtonWithIcon({ title, icon, onPress, disabled = false }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled]}
    >
      <Image source={icon} style={styles.buttonIcon} />
      <ThemedText style={styles.buttonText}>{title}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.8,
  },
  statsPreview: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  statsTitle: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 13,
  },
  statsRow: {
    gap: 8,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    width: '48%',
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonIcon: {
    width: 40,
    height: 40,
    marginBottom: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  tips: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  tipTitle: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 14,
  },
  tip: {
    marginLeft: 8,
    marginBottom: 3,
    fontSize: 13,
  },
});