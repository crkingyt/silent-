import api from "./api";

export interface DoctorData {
  name: string;
  specialist: string;
  experience: string;
  hospital: string;
  phone?: string;
}

export const doctorService = {
  createDoctor: async (data: DoctorData) => {
    const response = await api.post("/doctors/", data);
    return response.data;
  },

  getDoctor: async (id: number) => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get("/doctors/dashboard-stats");
    return response.data;
  },

  updateDoctor: async (id: number, data: DoctorData) => {
    // Note: The backend currently doesn't have a PUT/PATCH endpoint for doctors, 
    // but we'll add this function for future use or we can add the endpoint to backend.
    // For now, we might just use create or assume an update endpoint exists.
    // Let's assume we will add a PUT endpoint to the backend.
    const response = await api.put(`/doctors/${id}`, data);
    return response.data;
  }
};
