"use client";

import { Activity } from "lucide-react";

export default function RiskTrendsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-full text-purple-600">
          <Activity size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Risk Trends</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">No risk trend data available yet.</p>
      </div>
    </div>
  );
}
