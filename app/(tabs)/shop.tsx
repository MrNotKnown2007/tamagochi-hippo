import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function ShopScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">🛍️ Магазин</ThemedText>
      <ThemedText style={styles.subtitle}>Покупайте еду, игрушки и предметы для вашего бегемотика</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.8,
  },
});