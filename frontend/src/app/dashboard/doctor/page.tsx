"use client";

import { Users, Activity, AlertTriangle, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { doctorService } from "@/services/doctor";
import Link from "next/link";

interface Patient {
  id: number;
  name: string;
  age: number;
  risk: string;
  condition: string;
  lastVisit: string;
  trend: string;
}

export default function DoctorDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await doctorService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (!stats) return <div className="p-6">Failed to load dashboard data.</div>;

  const patients: Patient[] = stats.patients || [];

  return (
    <>
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
                  <dd className="text-3xl font-bold text-slate-900">{stats.total_patients}</dd>
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
                  <dd className="text-3xl font-bold text-slate-900">{stats.high_risk_alerts}</dd>
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
              <Link href={`/dashboard/doctor/patients/${patient.id}`} className="block px-6 py-5 sm:px-6">
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
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
