import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  // Replace this with your real backend URL later
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const startCaptioning = async (
  url: string, 
  language: string,
  onCaption: (caption: { id: string; text: string; timestamp: number }) => void,
  onError: (error: any) => void
) => {
  try {
    // First make the HTTP request to start the captioning process
    const response = await api.post('/api/captions/start', {
      url,
      language,
    });
    
    // Create WebSocket connection
    const ws = new WebSocket('ws://localhost:3000/ws/captions');
    
    ws.onmessage = (event) => {
      const caption = JSON.parse(event.data);
      onCaption(caption);
    };

    ws.onerror = (error) => {
      onError(error);
    };

    // Return the WebSocket instance so we can close it later
    return {
      data: response.data,
      websocket: ws
    };
  } catch (error) {
    console.error('Error starting captioning:', error);
    throw error;
  }
};

export default api;