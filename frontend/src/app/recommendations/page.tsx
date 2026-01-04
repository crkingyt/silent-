"use client";

import Sidebar from "@/components/common/Sidebar";
import HabitRemedyCard from "@/components/recommendations/HabitRemedyCard";
import { Utensils, Moon, Activity, ArrowRight, CheckCircle, AlertCircle, Cigarette, Loader2, Flame, Apple } from "lucide-react";
import { useState, useEffect } from "react";

export default function RecommendationsPage() {
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [criticalActions, setCriticalActions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/recommendations/");
        if (response.ok) {
          const data = await response.json();
          setRecommendations(data.daily_improvements || []);
          setCriticalActions(data.critical_actions || []);
        }
      } catch (error) {
        console.error("Failed to fetch recommendations", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleMarkAsDone = async (id: number, type?: string) => {
    setLoadingId(id);
    
    // If it's a specific type (smoking, stress), call the feedback endpoint
    if (type) {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/recommendations/complete/${type.toLowerCase()}`, {
          method: "POST"
        });
        if (response.ok) {
          const data = await response.json();
          console.log("AI Risk Model Updated:", data);
          // Refresh the list to show updated risks
          const refresh = await fetch("http://localhost:8000/api/v1/recommendations/");
          if (refresh.ok) {
            const newData = await refresh.json();
            setRecommendations(newData.daily_improvements || []);
            setCriticalActions(newData.critical_actions || []);
          }
        }
      } catch (e) {
        console.error("Failed to update AI model", e);
      }
    }

    setCompletedIds(prev => [...prev, id]);
    setLoadingId(null);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Utensils": return Utensils;
      case "Moon": return Moon;
      case "Activity": return Activity;
      default: return Activity;
    }
  };

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
          
          {isLoading ? (
             <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-teal-400 animate-spin" />
             </div>
          ) : (
            <>
              {/* Habit Remediation Section */}
              {criticalActions.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="text-red-400" /> Critical Actions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {criticalActions.map((action, idx) => (
                      <HabitRemedyCard 
                        key={idx}
                        habit={action.habit}
                        riskIncrease={action.riskIncrease}
                        remedySteps={action.remedySteps}
                        sideEffects={action.sideEffects}
                        onMarkDone={() => handleMarkAsDone(idx, action.habit.toLowerCase().includes("smoking") ? "smoking" : undefined)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* General Recommendations */}
              <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="text-teal-400" /> Daily Improvements
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {recommendations.map((rec) => {
                    const Icon = getIcon(rec.icon);
                    return (
                      <div key={rec.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-all">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${rec.bgColor} ${rec.color}`}>
                              <Icon size={24} />
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
                              
                              {rec.calories_burned && (
                                <div className="mb-2 text-sm text-orange-300 flex items-center gap-2 bg-orange-500/10 p-2 rounded-lg border border-orange-500/20">
                                    <Flame size={14} className="text-orange-400" /> 
                                    <span><span className="font-semibold">Burn:</span> {rec.calories_burned}</span>
                                </div>
                              )}
                              
                              {rec.dietary_suggestions && (
                                <div className="mb-2 text-sm text-green-300 flex items-center gap-2 bg-green-500/10 p-2 rounded-lg border border-green-500/20">
                                    <Apple size={14} className="text-green-400" /> 
                                    <span><span className="font-semibold">Eat:</span> {rec.dietary_suggestions}</span>
                                </div>
                              )}

                              <div className="space-y-2">
                                {rec.actions.map((action: string, i: number) => (
                                  <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0"></div>
                                    <span>{action}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => handleMarkAsDone(rec.id, rec.category === "Mental Wellness" ? "stress" : rec.category === "Sleep Hygiene" ? "sleep" : undefined)}
                            disabled={completedIds.includes(rec.id) || loadingId === rec.id}
                            className={`shrink-0 px-4 py-2 border rounded-lg text-sm font-medium transition-all flex items-center gap-2 self-start md:self-center ${
                              completedIds.includes(rec.id)
                                ? "bg-green-500/20 border-green-500/50 text-green-400 cursor-default"
                                : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                            }`}
                          >
                            {loadingId === rec.id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : completedIds.includes(rec.id) ? (
                              <CheckCircle size={16} />
                            ) : (
                              <ArrowRight size={16} />
                            )}
                            {loadingId === rec.id ? "Updating..." : completedIds.includes(rec.id) ? "Done" : "Mark as Done"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}

        </main>
      </div>
    </div>
  );
}
