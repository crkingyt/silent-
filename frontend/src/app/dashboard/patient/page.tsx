"use client";

import Sidebar from "@/components/common/Sidebar";
import RiskCard from "@/components/risk-cards/RiskCard";
import { Activity, AlertTriangle, CheckCircle, ArrowRight, Bell } from "lucide-react";
import Link from "next/link";

export default function PatientDashboard() {
  // Mock data - in a real app, this would come from an API
  const risks = [
    {
      title: "Diabetes Risk",
      riskPercentage: 71,
      trend: "increasing" as const,
      description: "Insulin resistance markers detected. Sugar intake high.",
      mitigation: "Reduce sugar intake, increase fiber consumption, and engage in regular aerobic exercise to improve insulin sensitivity."
    },
    {
      title: "Hypertension Risk",
      riskPercentage: 58,
      trend: "stable" as const,
      description: "Blood pressure stable but elevated. Stress levels moderate.",
      mitigation: "Practice stress management techniques like meditation, reduce sodium intake, and maintain a regular sleep schedule."
    },
    {
      title: "Cardiac Risk",
      riskPercentage: 42,
      trend: "stable" as const,
      description: "Cholesterol levels slightly elevated. Activity level needs improvement.",
      mitigation: "Adopt a heart-healthy diet low in saturated fats and aim for at least 150 minutes of moderate-intensity exercise per week."
    },
    {
      title: "Liver Disorder Risk",
      riskPercentage: 25,
      trend: "decreasing" as const,
      description: "Liver enzymes within normal range. Good hydration.",
      mitigation: "Maintain current healthy habits, limit alcohol consumption, and continue staying well-hydrated."
    },
    {
      title: "Mental Health Stress",
      riskPercentage: 76,
      trend: "increasing" as const,
      description: "Sleep deprivation and high stress reported.",
      mitigation: "Prioritize sleep hygiene, consider cognitive behavioral therapy (CBT) techniques, and schedule regular relaxation breaks."
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Health Dashboard
            </h1>
            <div className="flex items-center space-x-6">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 border border-emerald-200">
                <CheckCircle className="mr-1.5 h-4 w-4 text-emerald-600" />
                System Active
              </span>
              <button className="relative p-2 text-slate-400 hover:text-slate-500 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              <Link href="/profile" className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all">
                JD
              </Link>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-10 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold mb-4">Good Morning, John!</h2>
              <p className="text-blue-100 max-w-2xl text-lg leading-relaxed">
                Your daily health summary is ready. We've noticed a slight increase in your stress levels. 
                Let's work on bringing that down today.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  href="/voice-log"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-blue-700 bg-white hover:bg-blue-50 shadow-lg transition-all transform hover:-translate-y-1"
                >
                  <Activity className="mr-2 h-5 w-5" />
                  Log Daily Health
                </Link>
                <Link
                  href="/reports"
                  className="inline-flex items-center px-6 py-3 border border-white/30 bg-white/10 backdrop-blur-sm text-base font-bold rounded-xl text-white hover:bg-white/20 transition-all"
                >
                  View Detailed Report
                </Link>
              </div>
            </div>
            {/* Decorative background elements */}
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/10 to-transparent transform skew-x-12 translate-x-20"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
          </div>

          {/* Risk Cards Grid */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Current Health Risks
            </h3>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
              Re-check Risks <Activity className="ml-2 h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
            {risks.map((risk, index) => (
              <RiskCard key={index} {...risk} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
