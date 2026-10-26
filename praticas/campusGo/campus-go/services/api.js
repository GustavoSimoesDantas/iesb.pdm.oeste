const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

async function request(path, options) {
  if (!BASE_URL) {
    throw new Error('EXPO_PUBLIC_API_URL não foi definida no arquivo .env.');
  }

  const response = await fetch(`${BASE_URL}/${path}`, options);

  if (!response.ok) {
    throw new Error(`O servidor respondeu com erro ${response.status}.`);
  }

  return response.json();
}

export const api = {
  get(path) {
    return request(path);
  },
  create(path, data) {
    return request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
};
