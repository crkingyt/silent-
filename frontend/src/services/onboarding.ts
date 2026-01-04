import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const onboardingService = {
  createReport: async (data: any) => {
    const response = await axios.post(`${API_URL}/onboarding/`, data);
    return response.data;
  },

  getReport: async (userId: number) => {
    const response = await axios.get(`${API_URL}/onboarding/${userId}`);
    return response.data;
  }
};
