"use client";

import Sidebar from "@/components/common/Sidebar";
import HabitRemedyCard from "@/components/recommendations/HabitRemedyCard";
import { Utensils, Moon, Activity, ArrowRight, CheckCircle, AlertCircle, Cigarette } from "lucide-react";

export default function RecommendationsPage() {
  const recommendations = [
    {
      id: 1,
      category: "Diet & Nutrition",
      icon: Utensils,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      title: "Reduce Sugar Intake",
      priority: "High",
      reason: "Elevated insulin resistance markers detected in recent logs.",
      actions: [
        "Replace soda with sparkling water or herbal tea.",
        "Aim for < 25g of added sugar daily.",
        "Increase fiber intake (oats, berries) to stabilize blood sugar."
      ]
    },
    {
      id: 2,
      category: "Sleep Hygiene",
      icon: Moon,
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/20",
      title: "Improve Sleep Consistency",
      priority: "Medium",
      reason: "Sleep duration has been variable (4-7 hours) over the last week.",
      actions: [
        "Set a consistent bedtime (e.g., 10:30 PM).",
        "Avoid screens 1 hour before bed.",
        "Keep bedroom temperature cool (around 65°F/18°C)."
      ]
    },
    {
      id: 3,
      category: "Physical Activity",
      icon: Activity,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      title: "Increase Daily Steps",
      priority: "Low",
      reason: "Sedentary time during work hours is high.",
      actions: [
        "Take a 5-minute walk every hour.",
        "Park further away from entrances.",
        "Aim for a 20-minute brisk walk after dinner."
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-teal-900 via-slate-900 to-black overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="bg-white/5 backdrop-blur-md border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <h1 className="text-3xl font-bold text-white">Health Recommendations</h1>
            <p className="text-teal-200 mt-1">Personalized insights to improve your well-being.</p>
          </div>
        </header>
        
        <main className="mx-auto max-w-7xl px-6 py-8 space-y-8">
          
          {/* Habit Remediation Section */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-400" /> Critical Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HabitRemedyCard 
                habit="Smoking"
                riskIncrease="45%"
                remedySteps={[
                  "Set a quit date within the next 2 weeks.",
                  "Identify triggers (stress, social situations).",
                  "Use nicotine replacement therapy if needed.",
                  "Practice deep breathing when cravings hit."
                ]}
                sideEffects={[
                  "Increased Heart Rate",
                  "Hypertension",
                  "Reduced Lung Capacity"
                ]}
              />
            </div>
          </section>

          {/* General Recommendations */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="text-teal-400" /> Daily Improvements
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {recommendations.map((rec) => (
                <div key={rec.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-all">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${rec.bgColor} ${rec.color}`}>
                        <rec.icon size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-white">{rec.title}</h3>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                            rec.priority === 'High' ? 'bg-red-500/20 border-red-500/50 text-red-300' :
                            rec.priority === 'Medium' ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' :
                            'bg-blue-500/20 border-blue-500/50 text-blue-300'
                          }`}>
                            {rec.priority} Priority
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{rec.reason}</p>
                        
                        <div className="space-y-2">
                          {rec.actions.map((action, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0"></div>
                              <span>{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <button className="shrink-0 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2 self-start md:self-center">
                      Mark as Done <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
