"use client";

import Link from "next/link";
import { Activity, User, Stethoscope, ArrowRight, HeartPulse } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 flex flex-col relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                HealthGuard AI
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10 py-12">
        <div className="max-w-5xl w-full space-y-12 text-center">
          
          {/* Hero Text */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium mb-4">
              <HeartPulse className="w-4 h-4 mr-2 text-pink-300" />
              <span>Advanced Early Detection System</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white sm:text-6xl md:text-7xl drop-shadow-sm">
              Your Health, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-200">
                Reimagined with AI
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-blue-50 sm:text-xl md:text-2xl font-light leading-relaxed">
              Experience the future of healthcare. Seamlessly connect with your medical data and healthcare providers in one secure, intelligent platform.
            </p>
          </div>

          {/* Login Portals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
            
            {/* Patient Portal Card */}
            <Link href="/login?role=patient" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-3xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex flex-col items-center p-10 bg-white rounded-3xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform group-hover:-translate-y-2 h-full border border-gray-100">
                <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300 shadow-inner">
                  <User className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Patient Portal</h2>
                <p className="text-gray-500 text-center mb-8 leading-relaxed">
                  Access your personal health dashboard, view reports, and track your wellness journey.
                </p>
                <div className="mt-auto flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Login as Patient <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Doctor Portal Card */}
            <Link href="/login?role=doctor" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-3xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex flex-col items-center p-10 bg-white rounded-3xl shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 transform group-hover:-translate-y-2 h-full border border-gray-100">
                <div className="h-24 w-24 bg-teal-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300 shadow-inner">
                  <Stethoscope className="h-10 w-10 text-teal-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Doctor Portal</h2>
                <p className="text-gray-500 text-center mb-8 leading-relaxed">
                  Manage patient records, review AI-generated insights, and provide expert care.
                </p>
                <div className="mt-auto flex items-center text-teal-600 font-semibold group-hover:text-teal-700">
                  Login as Doctor <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center">
        <p className="text-blue-100 text-sm font-medium">
          &copy; 2024 HealthGuard AI. Secure & HIPAA Compliant.
        </p>
      </footer>
    </div>
  );
}
