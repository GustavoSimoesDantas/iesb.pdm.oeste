import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { CATEGORIES } from '../../constants/categories';
import { getColors } from '../../constants/theme';

export default function ModalCategoria({
  visible,
  selecionada,
  onSelecionar,
  onFechar,
}) {
  const colors = getColors(useColorScheme());

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onFechar}
    >
      <Pressable
        style={[styles.fundo, { backgroundColor: colors.overlay }]}
        onPress={onFechar}
      >
        {/* Pressable interno impede que o toque no painel feche o Modal */}
        <Pressable style={[styles.painel, { backgroundColor: colors.card }]}>
          <Text style={[styles.titulo, { color: colors.text }]}>
            Escolha a categoria
          </Text>
          {CATEGORIES.map((categoria) => {
            const ativa = categoria === selecionada;
            return (
              <Pressable
                key={categoria}
                onPress={() => onSelecionar(categoria)}
                style={({ pressed }) => [
                  styles.opcao,
                  { borderBottomColor: colors.border },
                  pressed && styles.pressionado,
                ]}
              >
                <Text
                  style={[
                    styles.textoOpcao,
                    { color: ativa ? colors.primary : colors.text },
                    ativa && styles.textoAtivo,
                  ]}
                >
                  {categoria}
                </Text>
                {ativa && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </Pressable>
            );
          })}
          <Pressable
            onPress={onFechar}
            style={({ pressed }) => [styles.fechar, pressed && styles.pressionado]}
          >
            <Text style={[styles.textoFechar, { color: colors.primary }]}>
              Cancelar
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  painel: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  opcao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textoOpcao: {
    fontSize: 16,
  },
  textoAtivo: {
    fontWeight: 'bold',
  },
  fechar: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 8,
  },
  textoFechar: {
    fontSize: 16,
    fontWeight: '600',
  },
  pressionado: {
    opacity: 0.6,
  },
});
