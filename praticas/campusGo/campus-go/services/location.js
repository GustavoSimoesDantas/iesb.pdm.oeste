import * as Location from 'expo-location';

function formatAddress(address) {
  const street = [address.street, address.streetNumber].filter(Boolean).join(', ');
  const city = [address.district, address.city || address.subregion]
    .filter(Boolean)
    .join(' - ');
  return [street, city].filter(Boolean).join(' · ');
}

// Devolve { latitude, longitude, label } ou null se a permissão for negada
export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  const { latitude, longitude } = position.coords;
  let label = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

  try {
    const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address && formatAddress(address)) {
      label = formatAddress(address);
    }
  } catch {
    // Sem endereço legível: fica com as coordenadas
  }

  return { latitude, longitude, label };
}
