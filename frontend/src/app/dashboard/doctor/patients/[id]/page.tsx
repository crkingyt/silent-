"use client";

import { ArrowLeft, Activity, Calendar, FileText, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Mock data function - in a real app, this would fetch from an API
const getPatientDetails = (id: string) => {
  // This is just mock data for demonstration
  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      gender: "Male",
      condition: "Diabetes Type 2",
      risk: "High",
      lastVisit: "2 days ago",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      history: [
        { date: "2023-10-01", type: "Checkup", notes: "Blood sugar levels elevated." },
        { date: "2023-09-15", type: "Lab Test", notes: "HbA1c test results pending." },
      ],
      vitals: {
        heartRate: "78 bpm",
        bloodPressure: "140/90 mmHg",
        weight: "85 kg",
      }
    },
    {
      id: 2,
      name: "Sarah Smith",
      age: 32,
      gender: "Female",
      condition: "Hypertension",
      risk: "Medium",
      lastVisit: "1 week ago",
      phone: "+1 (555) 987-6543",
      email: "sarah.smith@example.com",
      history: [
        { date: "2023-09-25", type: "Follow-up", notes: "BP medication adjusted." },
      ],
      vitals: {
        heartRate: "72 bpm",
        bloodPressure: "130/85 mmHg",
        weight: "65 kg",
      }
    },
    // Add more mock patients as needed or a fallback for unknown IDs
  ];

  const patient = patients.find(p => p.id === Number(id));
  
  if (!patient) {
    // Return a generic patient if ID not found in mock list
    return {
      id: Number(id),
      name: "Unknown Patient",
      age: 0,
      gender: "N/A",
      condition: "Unknown",
      risk: "Low",
      lastVisit: "N/A",
      phone: "N/A",
      email: "N/A",
      history: [],
      vitals: { heartRate: "-", bloodPressure: "-", weight: "-" }
    };
  }
  
  return patient;
};

export default function PatientDetailsPage() {
  const params = useParams();
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    if (params.id) {
      const data = getPatientDetails(params.id as string);
      setPatient(data);
    }
  }, [params.id]);

  if (!patient) {
    return <div className="p-6">Loading patient details...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/dashboard/doctor" 
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{patient.name}</h1>
            <p className="text-sm text-slate-500">Patient ID: #{patient.id}</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
          patient.risk === "High" ? "bg-red-100 text-red-800" :
          patient.risk === "Medium" ? "bg-yellow-100 text-yellow-800" :
          "bg-green-100 text-green-800"
        }`}>
          {patient.risk} Risk
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Patient Info & Vitals */}
        <div className="space-y-6 lg:col-span-1">
          {/* Personal Info */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Personal Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Age</span>
                <span className="font-medium text-slate-900">{patient.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Gender</span>
                <span className="font-medium text-slate-900">{patient.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone</span>
                <span className="font-medium text-slate-900">{patient.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email</span>
                <span className="font-medium text-slate-900 truncate max-w-[150px]">{patient.email}</span>
              </div>
            </div>
          </div>

          {/* Vitals */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Latest Vitals</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-2 mb-1">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600">Heart Rate</span>
                </div>
                <p className="text-lg font-bold text-slate-900">{patient.vitals.heartRate}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <div className="flex items-center space-x-2 mb-1">
                  <Activity className="h-4 w-4 text-purple-600" />
                  <span className="text-xs font-medium text-purple-600">BP</span>
                </div>
                <p className="text-lg font-bold text-slate-900">{patient.vitals.bloodPressure}</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl col-span-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Activity className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-600">Weight</span>
                </div>
                <p className="text-lg font-bold text-slate-900">{patient.vitals.weight}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: History & Reports */}
        <div className="space-y-6 lg:col-span-2">
          {/* Condition Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Primary Condition</h2>
            <p className="text-slate-600">{patient.condition}</p>
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-800">Recent Alert</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Patient reported symptoms consistent with their condition {patient.lastVisit}.
                </p>
              </div>
            </div>
          </div>

          {/* History Timeline */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Medical History</h2>
            <div className="space-y-6">
              {patient.history.map((item: any, index: number) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-blue-400 ring-4 ring-blue-50"></div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-bold text-slate-900">{item.type}</p>
                      <span className="text-xs text-slate-400">•</span>
                      <p className="text-xs text-slate-500">{item.date}</p>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{item.notes}</p>
                  </div>
                </div>
              ))}
              {patient.history.length === 0 && (
                <p className="text-sm text-slate-500 italic">No recent history available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
