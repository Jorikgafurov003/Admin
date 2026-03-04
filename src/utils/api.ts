// API configuration
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return '';

  // If we are in a Capacitor environment (mobile app)
  if (window.location.protocol === 'capacitor:') {
    // Dynamically use the current origin if possible, or fallback to the known dev URL
    // For Capacitor, we usually need the full URL of the server
    return 'https://ais-dev-fpkzzoygfydt47qtlfkkzk-492895835997.asia-southeast1.run.app';
  }
  
  // For web, relative paths are most reliable and avoid CORS/origin issues
  return '';
};

export const API_BASE_URL = getApiBaseUrl();
console.log('API_BASE_URL initialized as:', API_BASE_URL || '(relative)');

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  console.log(`[apiFetch] Requesting: ${url}`);
  
  try {
    const response = await fetch(url, options);
    console.log(`[apiFetch] Response from ${url}: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error(`[apiFetch] Error fetching ${url}:`, error);
    throw error;
  }
};
