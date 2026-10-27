import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../constants/colors';

// Pulsa toda vez que pulse muda (contador de conclusões)
export default function DoneIcon({ pulse, size = 40 }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (pulse > 0) {
      scale.value = withSequence(withSpring(1.5), withSpring(1));
    }
  }, [pulse, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons
        name={pulse > 0 ? 'checkmark-circle' : 'checkmark-circle-outline'}
        size={size}
        color={pulse > 0 ? colors.success : colors.muted}
      />
    </Animated.View>
  );
}
