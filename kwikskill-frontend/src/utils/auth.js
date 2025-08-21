import { auth } from '../firebase';

export const getAuthHeader = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No authenticated user');
  }

  const token = await user.getIdToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const fetchWithAuth = async (url, options = {}) => {
  const headers = await getAuthHeader();
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};