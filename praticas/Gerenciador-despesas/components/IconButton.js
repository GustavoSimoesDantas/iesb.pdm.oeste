import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    padding: 6,
    marginHorizontal: 8,
    borderRadius: 20,
  },
  pressionado: {
    opacity: 0.5,
  },
});
