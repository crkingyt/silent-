"use client";

import { useState, useEffect } from "react";
import { User, MapPin, Award, Clock, Phone, Save } from "lucide-react";
import { doctorService } from "@/services/doctor";

export default function DoctorProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    specialist: "",
    experience: "",
    hospital: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  // Mock ID for now - in a real app this would come from auth context
  const DOCTOR_ID = 1;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await doctorService.getDoctor(DOCTOR_ID);
        setFormData({
          name: data.name,
          specialist: data.specialist,
          experience: data.experience,
          hospital: data.hospital,
          phone: data.phone || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        // Fallback to default/empty if not found (e.g. first time)
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await doctorService.updateDoctor(DOCTOR_ID, formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-teal-100 rounded-full text-teal-600">
          <User size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl">
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
                />
              </div>
            </div>

            {/* Specialist */}
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
                />
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <label htmlFor="experience" className="block text-sm font-bold text-gray-700">
                Experience
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
                />
              </div>
            </div>

            {/* Hospital */}
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
                />
              </div>
            </div>

          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="flex items-center justify-center w-full md:w-auto px-8 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-md"
            >
              <Save className="mr-2 h-5 w-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
