"use client";

import { useState, useEffect } from "react";
import { profileService } from "@/services/profile";
import { User, Phone, MapPin, Activity, Save } from "lucide-react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    address: "",
    height: "",
    weight: "",
    smoking_habit: "",
    alcohol_habit: "",
  });
  const [loading, setLoading] = useState(true);
  const USER_ID = 1; // Mock user ID

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile(USER_ID);
        setFormData({
          full_name: data.full_name || "",
          phone_number: data.phone_number || "",
          address: data.address || "",
          height: data.height?.toString() || "",
          weight: data.weight?.toString() || "",
          smoking_habit: data.smoking_habit || "None",
          alcohol_habit: data.alcohol_habit || "None",
        });
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await profileService.updateProfile(USER_ID, {
        ...formData,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">My Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
        
        {/* Personal Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            <User className="w-5 h-5" /> Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Health Stats */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            <Activity className="w-5 h-5" /> Health Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Habits */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-700">Lifestyle Habits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Smoking</label>
              <select
                name="smoking_habit"
                value={formData.smoking_habit}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="None">None</option>
                <option value="Occasional">Occasional</option>
                <option value="Regular">Regular</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Alcohol</label>
              <select
                name="alcohol_habit"
                value={formData.alcohol_habit}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="None">None</option>
                <option value="Social">Social</option>
                <option value="Regular">Regular</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
