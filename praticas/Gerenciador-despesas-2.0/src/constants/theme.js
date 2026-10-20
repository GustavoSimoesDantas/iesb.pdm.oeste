export const Colors = {
  light: {
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#222222',
    textMuted: '#666666',
    primary: '#4f46e5',
    onPrimary: '#ffffff',
    primaryText: '#3730a3',
    primarySoft: '#e0e7ff',
    border: '#c7d2fe',
    chip: '#e5e5e5',
    error: '#dc2626',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  dark: {
    background: '#0f172a',
    card: '#1e293b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    primary: '#818cf8',
    onPrimary: '#1e1b4b',
    primaryText: '#c7d2fe',
    primarySoft: '#312e81',
    border: '#334155',
    chip: '#334155',
    error: '#f87171',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
};

// Recebe o retorno de useColorScheme() e devolve a paleta correspondente
export function getColors(colorScheme) {
  return colorScheme === 'dark' ? Colors.dark : Colors.light;
}
