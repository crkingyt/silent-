"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope, User, MapPin, Award, Clock, ArrowRight, Phone } from "lucide-react";
import { doctorService } from "@/services/doctor";

export default function DoctorOnboarding() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    specialist: "",
    experience: "",
    hospital: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await doctorService.createDoctor(formData);
      // Redirect to the doctor dashboard after successful submission
      router.push("/dashboard/doctor");
    } catch (error) {
      console.error("Failed to create doctor profile:", error);
      alert("Failed to create profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl z-10">
        <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50">
          <div className="text-center mb-10">
            <div className="mx-auto h-20 w-20 rounded-full bg-teal-100 flex items-center justify-center mb-6 shadow-lg">
              <Stethoscope className="h-10 w-10 text-teal-600" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Complete Your Profile
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please provide your professional details to continue to your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-bold text-gray-700">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-11 rounded-xl border-gray-200 bg-gray-50 border-2 py-3.5 text-gray-900 focus:ring-0 focus:border-teal-500 focus:bg-white transition-all sm:text-sm font-medium"
                    placeholder="Dr. John Doe"
                  />
                </div>
              </div>

              {/* Specialist / Qualification */}
              <div className="space-y-2">
                <label htmlFor="specialist" className="block text-sm font-bold text-gray-700">
                  Specialist (Qualification)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Award className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  </div>
                  <input
                    id="specialist"
                    name="specialist"
                    type="text"
                    required
                    value={formData.specialist}
                    onChange={handleChange}
                    className="block w-full pl-11 rounded-xl border-gray-200 bg-gray-50 border-2 py-3.5 text-gray-900 focus:ring-0 focus:border-teal-500 focus:bg-white transition-all sm:text-sm font-medium"
                    placeholder="Cardiologist, MBBS, MD"
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label htmlFor="experience" className="block text-sm font-bold text-gray-700">
                  Experience (Years)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  </div>
                  <input
                    id="experience"
                    name="experience"
                    type="text"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="block w-full pl-11 rounded-xl border-gray-200 bg-gray-50 border-2 py-3.5 text-gray-900 focus:ring-0 focus:border-teal-500 focus:bg-white transition-all sm:text-sm font-medium"
                    placeholder="e.g. 10 years"
                  />
                </div>
              </div>

              {/* Hospital / Location */}
              <div className="space-y-2">
                <label htmlFor="hospital" className="block text-sm font-bold text-gray-700">
                  Working Hospital (Location)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  </div>
                  <input
                    id="hospital"
                    name="hospital"
                    type="text"
                    required
                    value={formData.hospital}
                    onChange={handleChange}
                    className="block w-full pl-11 rounded-xl border-gray-200 bg-gray-50 border-2 py-3.5 text-gray-900 focus:ring-0 focus:border-teal-500 focus:bg-white transition-all sm:text-sm font-medium"
                    placeholder="City Hospital, New York"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-11 rounded-xl border-gray-200 bg-gray-50 border-2 py-3.5 text-gray-900 focus:ring-0 focus:border-teal-500 focus:bg-white transition-all sm:text-sm font-medium"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all transform hover:scale-[1.02]"
              >
                Continue to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
