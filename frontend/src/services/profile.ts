import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const profileService = {
  getProfile: async (userId: number) => {
    const response = await axios.get(`${API_URL}/profile/${userId}`);
    return response.data;
  },

  updateProfile: async (userId: number, data: any) => {
    const response = await axios.put(`${API_URL}/profile/${userId}`, data);
    return response.data;
  }
};
