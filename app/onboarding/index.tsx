// app/onboarding/index.tsx - ОБНОВЛЕННАЯ ВЕРСИЯ
import { storage } from '@/utils/storage';
import { useRouter } from 'expo-router';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/onboarding/name');
  };

  const handleSkip = async () => {
    try {
      await storage.setItem('hippoName', 'Бегемотик');
      await storage.setItem('hippoGender', 'male');
      await storage.setItem('hasCreatedHippo', 'true');
      router.push('/(tabs)');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить данные');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать! 🦛</Text>
      <Text style={styles.subtitle}>
        Ваше путешествие с виртуальным бегемотиком начинается!
      </Text>
      <Text style={styles.description}>
        Создайте своего уникального бегемотика, выберите имя и пол.
        Кормите, мойте, играйте и ухаживайте за ним, чтобы он был счастлив и здоров.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Начать →"
          onPress={handleGetStarted}
          color="#4A90E2"
        />
      </View>
      <Button
        title="Пропустить"
        onPress={handleSkip}
        color="#666"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#E6F4FE',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1D3D47',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    color: '#4A5568',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#718096',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 15,
  },
});