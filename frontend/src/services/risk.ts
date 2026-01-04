import api from "./api";

export const riskService = {
  getRiskSummary: async () => {
    // Mock data
    return [
      {
        title: "Diabetes Risk",
        riskPercentage: 71,
        trend: "increasing",
        description: "Insulin resistance markers detected. Sugar intake high.",
      },
      {
        title: "Hypertension Risk",
        riskPercentage: 58,
        trend: "stable",
        description: "Blood pressure stable but elevated. Stress levels moderate.",
      },
      {
        title: "Mental Health Risk",
        riskPercentage: 76,
        trend: "increasing",
        description: "Sleep deprivation and high stress reported.",
      },
    ];
    // return api.get("/risk/summary");
  },

  submitDailyLog: async (logData: any) => {
    // return api.post("/risk/daily-log", logData);
    return { success: true };
  },
};
