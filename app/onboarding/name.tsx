// app/onboarding/name.tsx
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function NameHippoScreen() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Дайте имя вашему бегемотику!');
      return;
    }

    if (name.length > 20) {
      Alert.alert('Ошибка', 'Имя слишком длинное! Максимум 20 символов.');
      return;
    }

    // Сохраняем имя и флаг создания гиппопотама
    if (typeof window !== 'undefined') {
      localStorage.setItem('hippoName', name.trim());
      localStorage.setItem('hasCreatedHippo', 'true');
    }

    // Переходим на главную
    router.push('/(tabs)');
  };

  const handleBack = () => {
    router.back(); // Возврат на предыдущий экран
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Назовите бегемотика 🦛</Text>
      <Text style={styles.subtitle}>
        Дайте вашему бегемотику особенное имя
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Введите имя"
        value={name}
        onChangeText={setName}
        maxLength={20}
        autoFocus
      />

      <Text style={styles.hint}>
        Примеры: Пузик, Мото, Река, Счастливчик
      </Text>

      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <Button
            title="Назад"
            onPress={handleBack}
            color="#666"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Продолжить"
            onPress={handleContinue}
            disabled={!name.trim()}
            color="#4A90E2"
          />
        </View>
      </View>

      <Link href="/(tabs)" style={styles.skipLink}>
        <Text style={styles.skipText}>Пропустить →</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F7FAFC',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1D3D47',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#4A5568',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  hint: {
    width: '100%',
    textAlign: 'left',
    fontSize: 14,
    color: '#718096',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flex: 1,
  },
  skipLink: {
    marginTop: 20,
  },
  skipText: {
    color: '#4A5568',
    fontSize: 16,
    fontWeight: '500',
  },
});