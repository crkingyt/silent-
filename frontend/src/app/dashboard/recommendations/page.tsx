"use client";

import HabitRemedyCard from "@/components/recommendations/HabitRemedyCard";
import { Heart, ShieldCheck } from "lucide-react";

export default function RecommendationsPage() {
  // Mock data - in real app, fetch based on user's habits
  const remedies = [
    {
      habit: "Smoking",
      riskIncrease: "40%",
      remedySteps: [
        "Set a quit date within the next 2 weeks.",
        "Identify your triggers (stress, social situations).",
        "Consider nicotine replacement therapy.",
        "Join a support group."
      ],
      sideEffects: ["Lung Cancer", "Heart Disease", "Stroke", "COPD"]
    },
    {
      habit: "Alcohol Consumption",
      riskIncrease: "25%",
      remedySteps: [
        "Set a limit on how much you will drink.",
        "Set specific alcohol-free days in your week.",
        "Drink water between alcoholic drinks.",
        "Avoid keeping alcohol in your house."
      ],
      sideEffects: ["Liver Disease", "High Blood Pressure", "Digestive Problems"]
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="text-teal-600" /> Personalized Recommendations
        </h1>
        <p className="text-slate-500 mt-2">Based on your health profile and habits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {remedies.map((remedy, index) => (
          <HabitRemedyCard key={index} {...remedy} />
        ))}
      </div>
    </div>
  );
}
