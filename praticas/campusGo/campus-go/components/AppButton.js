import { Pressable, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../constants/colors';

export default function AppButton({ title, icon, onPress, variant = 'primary', disabled }) {
  const isOutline = variant === 'outline';
  const textColor = isOutline ? colors.primary : '#FFFFFF';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isOutline && styles.outline,
        (pressed || disabled) && styles.pressed,
      ]}
    >
      {icon && <Ionicons name={icon} size={18} color={textColor} />}
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.6,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
});
