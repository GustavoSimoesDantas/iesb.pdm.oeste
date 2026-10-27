import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PICKER_OPTIONS = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.7,
};

// Devolve a URI da imagem escolhida ou null se o usuário cancelar
export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS);
  if (result.canceled) {
    return null;
  }
  return result.assets[0].uri;
}

export async function takePhoto() {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();

  if (!granted) {
    Alert.alert(
      'Câmera bloqueada',
      'Permita o acesso à câmera nos ajustes do aparelho para tirar sua foto.',
      [
        { text: 'Agora não', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]
    );
    return null;
  }

  const result = await ImagePicker.launchCameraAsync(PICKER_OPTIONS);
  if (result.canceled) {
    return null;
  }
  return result.assets[0].uri;
}
