// Hard-code the API base URL for production
const isProduction = window.location.hostname !== 'localhost';
const API_BASE_URL = isProduction
  ? 'https://real-time-chat-application-chatterbox.onrender.com/api'
  : '/api'; // Fallback to relative path for development

console.log("API Base URL:", API_BASE_URL);
console.log("Is production environment:", isProduction);

// Function to make API requests
export const makeRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Include credentials for cross-origin requests
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const requestOptions = { ...defaultOptions, ...options };
  
  console.log(`Making ${requestOptions.method || 'GET'} request to: ${url}`);
  
  try {
    const response = await fetch(url, requestOptions);
    console.log(`Response status: ${response.status}`);
    return response;
  } catch (error) {
    console.error(`API request error for ${url}:`, error);
    throw error;
  }
};