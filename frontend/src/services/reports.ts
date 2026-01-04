import api from "./api";

export const reportsService = {
  getAllReports: async () => {
    return [
      { id: 1, title: "Weekly Risk Evolution Report", date: "Jan 03, 2026", type: "Weekly" },
      { id: 2, title: "Monthly Preventive Summary", date: "Dec 31, 2025", type: "Monthly" },
      { id: 3, title: "Daily Health Report", date: "Jan 02, 2026", type: "Daily" },
    ];
    // return api.get("/reports");
  },

  downloadReport: async (reportId: number) => {
    // return api.get(`/reports/${reportId}/download`, { responseType: 'blob' });
    console.log(`Downloading report ${reportId}`);
  },
};
