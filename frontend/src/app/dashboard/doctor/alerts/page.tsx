"use client";

import { Bell } from "lucide-react";

export default function AlertsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-100 rounded-full text-red-600">
          <Bell size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Alerts</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">No active alerts.</p>
      </div>
    </div>
  );
}
