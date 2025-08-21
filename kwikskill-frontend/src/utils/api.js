import { auth } from '../firebase';

const BASE_URL = 'http://127.0.0.1:8000';

/**
 * Format error response from API
 * @param {object} error - Error response from API
 * @returns {string} Formatted error message
 */
const formatErrorMessage = (error) => {
  if (Array.isArray(error.detail)) {
    return error.detail
      .map(err => `${err.loc[1]}: ${err.msg}`)
      .join('\n');
  }
  if (typeof error.detail === 'object') {
    return Object.entries(error.detail)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }
  return error.detail || 'An unexpected error occurred';
};

/**
 * Makes an authenticated request to the API
 * @param {string} endpoint - API endpoint (e.g., '/users/profile')
 * @param {object} options - Fetch options
 */
export const fetchWithAuth = async (endpoint, options = {}) => {
  try {
    const token = await auth.currentUser?.getIdToken(true);
    
    if (!token) {
      throw new Error('No authentication token available');
    }

    const cleanEndpoint = endpoint.replace(/^https?:\/\/[^/]+/, '');
    const normalizedEndpoint = cleanEndpoint.startsWith('/') ? cleanEndpoint : `/${cleanEndpoint}`;
    const url = new URL(normalizedEndpoint, BASE_URL).toString();

    console.log('Making request to:', url);

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(formatErrorMessage(data));
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Login user to backend
 * @returns {Promise<object>} User data
 */
export const loginUser = async () => {
  return fetchWithAuth('/auth/login', {
    method: 'POST'
  });
};

/**
 * Get user profile
 * @returns {Promise<object>} User profile data
 */
export const fetchProfile = async () => {
  return fetchWithAuth('/users/profile');
};

/**
 * Check user profile status
 * @returns {Promise<object>} Profile status
 */
export const checkUserProfile = async () => {
  return fetchWithAuth('/users/check-profile', {
    method: 'GET'
  });
};

/**
 * Update user profile
 * @param {object} profileData - Profile data to update
 * @returns {Promise<object>} Updated profile
 */
export const updateProfile = async (profileData) => {
  return fetchWithAuth('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });
};

export const fetchServices = async () => {
  return fetchWithAuth('/services', {
    method: 'GET'
  });
};

export const fetchProviderServices = async () => {
  return fetchWithAuth('/services/provider');
};

export const createService = async (serviceData) => {
  const transformedData = {
    title: serviceData.title?.trim(),
    description: serviceData.service_description?.trim(),
    price: parseFloat(serviceData.hourly_rate) || 0,
    category: serviceData.category?.trim(),
    skills: serviceData.skills?.trim(),
    availability: serviceData.availability?.trim()
  };

  // Validate data
  if (!transformedData.title || transformedData.title.length < 3) {
    throw new Error('Title must be at least 3 characters long');
  }
  if (!transformedData.description || transformedData.description.length < 10) {
    throw new Error('Description must be at least 10 characters long');
  }
  if (transformedData.price <= 0) {
    throw new Error('Price must be greater than 0');
  }
  if (!transformedData.category) {
    throw new Error('Category is required');
  }
  if (!transformedData.skills) {
    throw new Error('Skills are required');
  }

  return fetchWithAuth('/services/', {
    method: 'POST',
    body: JSON.stringify(transformedData)
  });
};

export const updateService = async (serviceId, serviceData) => {
  return fetchWithAuth(`/services/${serviceId}`, {
    method: 'PUT',
    body: JSON.stringify(serviceData)
  });
};

export const deleteService = async (serviceId) => {
  return fetchWithAuth(`/services/${serviceId}`, {
    method: 'DELETE'
  });
};

export const checkProviderStatus = async () => {
  return fetchWithAuth('/users/check-provider-status');
};