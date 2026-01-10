// app/onboarding/name.tsx - ОБНОВЛЕННАЯ ВЕРСИЯ С ВЫБОРОМ ПОЛА
import { storage } from '@/utils/storage';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Gender = 'male' | 'female' | '';

export default function NameHippoScreen() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('');
  const router = useRouter();

  const handleContinue = async () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Дайте имя вашему бегемотика!');
      return;
    }
    if (name.length > 20) {
      Alert.alert('Ошибка', 'Имя слишком длинное! Максимум 20 символов.');
      return;
    }
    if (!gender) {
      Alert.alert('Ошибка', 'Выберите пол вашего бегемотика!');
      return;
    }

    try {
      await storage.setItem('hippoName', name.trim());
      await storage.setItem('hippoGender', gender);
      await storage.setItem('hasCreatedHippo', 'true');

      // Перенаправляем на главную
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить данные');
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender);
  };

  const canContinue = name.trim() && gender;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Создайте своего бегемотика 🦛</Text>
      <Text style={styles.subtitle}>
        Дайте имя и выберите пол вашего питомца
      </Text>
      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>Имя бегемотика:</Text>
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
      </View>
      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>Пол бегемотика:</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'male' && styles.genderButtonSelected,
            ]}
            onPress={() => handleGenderSelect('male')}
          >
            <Text style={styles.genderEmoji}>♂️</Text>
            <Text style={[
              styles.genderText,
              gender === 'male' && styles.genderTextSelected
            ]}>
              Мальчик
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'female' && styles.genderButtonSelected,
            ]}
            onPress={() => handleGenderSelect('female')}
          >
            <Text style={styles.genderEmoji}>♀️</Text>
            <Text style={[
              styles.genderText,
              gender === 'female' && styles.genderTextSelected
            ]}>
              Девочка
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
            disabled={!canContinue}
            color="#4A90E2"
          />
        </View>
      </View>
      <Link href="/(tabs)" style={styles.skipLink}>
        <Text style={styles.skipText}>Пропустить создание →</Text>
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
  formSection: {
    width: '100%',
    marginBottom: 25,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2D3748',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: 'white',
  },
  hint: {
    width: '100%',
    textAlign: 'left',
    fontSize: 14,
    color: '#718096',
    marginTop: 8,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderButtonSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#EBF4FF',
  },
  genderEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  genderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
  },
  genderTextSelected: {
    color: '#4A90E2',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    marginBottom: 15,
    marginTop: 10,
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