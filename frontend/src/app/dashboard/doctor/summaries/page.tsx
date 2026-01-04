"use client";

import { FileText } from "lucide-react";

export default function DailySummariesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
          <FileText size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Daily Summaries</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">No daily summaries available yet.</p>
      </div>
    </div>
  );
}
