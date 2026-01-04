import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const dailyLogService = {
  createLog: async (data: any) => {
    const response = await axios.post(`${API_URL}/daily-log/`, data);
    return response.data;
  },

  getLogs: async (userId: number) => {
    const response = await axios.get(`${API_URL}/daily-log/${userId}`);
    return response.data;
  }
};
