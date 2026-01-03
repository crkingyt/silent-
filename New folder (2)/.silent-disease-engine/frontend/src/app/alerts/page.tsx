"use client";

import Sidebar from "@/components/common/Sidebar";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function AlertsPage() {
  const alerts = [
    {
      id: 1,
      title: "Sleep Deficit Detected",
      severity: "high",
      message: "Your average sleep duration has dropped below 5 hours for the last 3 days. This significantly increases stress markers.",
      time: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      title: "Elevated Sugar Intake",
      severity: "medium",
      message: "Voice logs indicate high sugar consumption (soda, cake) yesterday.",
      time: "Yesterday",
      status: "active"
    },
    {
      id: 3,
      title: "Missed Medication",
      severity: "low",
      message: "You didn't log your vitamin intake yesterday.",
      time: "2 days ago",
      status: "resolved"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Health Alerts
            </h1>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`bg-white shadow rounded-lg p-6 border-l-4 ${
                  alert.severity === 'high' ? 'border-red-500' : 
                  alert.severity === 'medium' ? 'border-yellow-500' : 
                  'border-blue-500'
                } ${alert.status === 'resolved' ? 'opacity-75' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {alert.status === 'resolved' ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <AlertTriangle className={`h-6 w-6 ${
                          alert.severity === 'high' ? 'text-red-500' : 
                          alert.severity === 'medium' ? 'text-yellow-500' : 
                          'text-blue-500'
                        }`} />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        {alert.title}
                        {alert.status === 'resolved' && (
                          <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Resolved
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">{alert.message}</p>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <Clock className="mr-1 h-3 w-3" />
                        {alert.time}
                      </div>
                    </div>
                  </div>
                  {alert.status !== 'resolved' && (
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
