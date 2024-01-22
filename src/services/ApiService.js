import axios from 'axios';

export default {
  async getToken(clientId, clientSecret) {
    try {
      const response = await axios.post('/api/v1/auth-token', {
        clientId,
        clientSecret,
      });
      return response.data;
    } catch (error) {
      console.error('Error getting token:', error);
      throw error;
    }
  },
  async executeCode(data) {
    try {
      const response = await axios.post('/api/v1/execute', data);
      return response.data;
    } catch (error) {
      console.error('Error executing code:', error);
      throw error;
    }
  }
};