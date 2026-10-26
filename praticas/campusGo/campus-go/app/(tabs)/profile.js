import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { pickImage, takePhoto } from '../../services/media';
import AppButton from '../../components/AppButton';
import { colors } from '../../constants/colors';

const PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    async function loadPhoto() {
      try {
        const stored = await AsyncStorage.getItem(PHOTO_KEY);
        if (stored) {
          setPhotoUri(stored);
        }
      } catch {
        // Sem foto salva: mantém o avatar padrão
      }
    }

    loadPhoto();
  }, []);

  async function savePhoto(uri) {
    if (!uri) {
      return;
    }
    setPhotoUri(uri);
    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
    } catch {
      // A foto continua na tela mesmo se não salvar
    }
  }

  async function handlePickImage() {
    savePhoto(await pickImage());
  }

  async function handleTakePhoto() {
    savePhoto(await takePhoto());
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePickImage} style={styles.avatarWrapper}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Ionicons name="person" size={64} color={colors.muted} />
          </View>
        )}
        <View style={styles.badge}>
          <Ionicons name="images-outline" size={16} color="#FFFFFF" />
        </View>
      </Pressable>
      <Text style={styles.hint}>Toque no avatar para escolher da galeria</Text>

      <Text style={styles.name}>Gustavo Simões Dantas</Text>
      <Text style={styles.course}>Programação para Dispositivos Móveis · IESB</Text>

      <View style={styles.actions}>
        <AppButton
          title="Tirar foto"
          icon="camera-outline"
          variant="outline"
          onPress={handleTakePhoto}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    gap: 8,
  },
  avatarWrapper: {
    marginTop: 16,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  placeholder: {
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  hint: {
    fontSize: 13,
    color: colors.muted,
  },
  name: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  course: {
    fontSize: 14,
    color: colors.muted,
  },
  actions: {
    marginTop: 24,
    alignSelf: 'stretch',
  },
});
