"use client";

import DoctorSidebar from "@/components/common/DoctorSidebar";
import { Users, Activity, AlertTriangle, Search, FileText, ArrowUpRight, Bell } from "lucide-react";
import { useState } from "react";

export default function DoctorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const patients = [
    { id: 1, name: "John Doe", age: 45, risk: "High", condition: "Diabetes Type 2", lastVisit: "2 days ago", trend: "worsening" },
    { id: 2, name: "Sarah Smith", age: 32, risk: "Medium", condition: "Hypertension", lastVisit: "1 week ago", trend: "stable" },
    { id: 3, name: "Michael Brown", age: 58, risk: "Low", condition: "Routine Checkup", lastVisit: "3 weeks ago", trend: "improving" },
    { id: 4, name: "Emily Davis", age: 29, risk: "High", condition: "Anxiety Disorder", lastVisit: "Yesterday", trend: "worsening" },
    { id: 5, name: "David Wilson", age: 52, risk: "Medium", condition: "Liver Function", lastVisit: "5 days ago", trend: "stable" },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <DoctorSidebar />
      <div className="flex-1 overflow-auto">
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Doctor Dashboard
            </h1>
            <div className="flex items-center space-x-6">
              <div className="relative w-64 hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 rounded-xl border-slate-200 bg-slate-50 border py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="relative p-2 text-slate-400 hover:text-slate-500 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                DR
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            <div className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow rounded-2xl border border-slate-100">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-50 rounded-xl p-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-slate-500 truncate">Total Patients</dt>
                      <dd className="text-3xl font-bold text-slate-900">124</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow rounded-2xl border border-slate-100">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-50 rounded-xl p-3">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-slate-500 truncate">High Risk Alerts</dt>
                      <dd className="text-3xl font-bold text-slate-900">12</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow rounded-2xl border border-slate-100">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-emerald-50 rounded-xl p-3">
                    <Activity className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-slate-500 truncate">Active Monitoring</dt>
                      <dd className="text-3xl font-bold text-slate-900">45</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow rounded-2xl border border-slate-100">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-50 rounded-xl p-3">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-slate-500 truncate">New Reports</dt>
                      <dd className="text-3xl font-bold text-slate-900">8</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Patient List */}
          <div className="bg-white shadow-sm rounded-2xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">Recent Patient Activity</h3>
              <button className="text-sm font-semibold text-teal-600 hover:text-teal-700">View All</button>
            </div>
            <ul role="list" className="divide-y divide-slate-100">
              {patients.map((patient) => (
                <li key={patient.id} className="hover:bg-slate-50 transition-colors">
                  <div className="px-6 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center min-w-0 gap-x-4">
                        <div className="h-12 w-12 flex-none rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg">
                          {patient.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-bold text-slate-900 truncate">{patient.name}</p>
                          <p className="mt-1 flex text-xs text-slate-500">
                            <span className="truncate">Age: {patient.age}</span>
                            <span className="mx-1.5">&middot;</span>
                            <span className="truncate">{patient.condition}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-y-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            patient.risk === "High"
                              ? "bg-red-100 text-red-800"
                              : patient.risk === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {patient.risk} Risk
                        </span>
                        <p className="text-xs text-slate-400">Visited {patient.lastVisit}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
