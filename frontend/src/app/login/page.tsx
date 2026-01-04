"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Lock, Mail, User, Stethoscope, ArrowLeft } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const [role, setRole] = useState(roleParam === "doctor" ? "doctor" : "patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "doctor") {
      router.push("/doctor-onboarding");
    } else {
      router.push("/dashboard/patient");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors font-medium">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50">
          <div className="text-center">
            <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-6 shadow-lg transition-all duration-300 transform ${role === 'doctor' ? 'bg-teal-100 rotate-12' : 'bg-blue-100 -rotate-12'}`}>
              {role === 'doctor' ? (
                 <Stethoscope className="h-10 w-10 text-teal-600" />
              ) : (
                 <User className="h-10 w-10 text-blue-600" />
              )}
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your <span className={`font-bold ${role === 'doctor' ? 'text-teal-600' : 'text-blue-600'}`}>{role.charAt(0).toUpperCase() + role.slice(1)}</span> portal
            </p>
          </div>

          <div className="mt-8">
            {/* Role Switcher */}
            <div className="flex justify-center p-1.5 bg-gray-100 rounded-2xl mb-8">
              <button
                onClick={() => setRole("patient")}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  role === "patient"
                    ? "bg-white text-blue-600 shadow-md transform scale-105"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Patient
              </button>
              <button
                onClick={() => setRole("doctor")}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  role === "doctor"
                    ? "bg-white text-teal-600 shadow-md transform scale-105"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Doctor
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="email-address" className="block text-sm font-bold text-gray-700 mb-2">
                    Email address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full pl-11 rounded-xl border-gray-200 bg-gray-50 border-2 py-3.5 text-gray-900 focus:ring-0 focus:border-blue-500 focus:bg-white transition-all sm:text-sm font-medium"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="block w-full pl-11 pr-12 rounded-xl border-gray-200 bg-gray-50 border-2 py-3.5 text-gray-900 focus:ring-0 focus:border-blue-500 focus:bg-white transition-all sm:text-sm font-medium"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm text-gray-500 hover:text-gray-700 font-medium"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className={`h-5 w-5 rounded border-gray-300 focus:ring-offset-0 ${role === 'doctor' ? 'text-teal-600 focus:ring-teal-500' : 'text-blue-600 focus:ring-blue-500'}`}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 font-medium">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className={`font-bold hover:underline ${role === 'doctor' ? 'text-teal-600' : 'text-blue-600'}`}>
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`group relative flex w-full justify-center rounded-xl px-4 py-4 text-base font-bold text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 ${role === 'doctor' ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 focus:ring-teal-500 shadow-teal-500/30' : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-blue-500 shadow-blue-500/30'}`}
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600 font-medium">
                Don't have an account?{" "}
                <Link href="/signup" className={`font-bold hover:underline ${role === 'doctor' ? 'text-teal-600' : 'text-blue-600'}`}>
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
