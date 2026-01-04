"use client";

import DoctorSidebar from "@/components/common/DoctorSidebar";
import { Search, Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchTerm, setSearchTerm] = useState("");

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
              <Link href="/dashboard/doctor/profile">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-teal-500 transition-all">
                  DR
                </div>
              </Link>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
        </main>
      </div>
    </div>
  );
}
