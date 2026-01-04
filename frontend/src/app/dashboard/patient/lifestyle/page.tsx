"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Moon, Coffee, Brain, Save } from "lucide-react";

export default function LifestylePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    activityLevel: "medium",
    sleepHours: "7",
    workHours: "8",
    smoking: "no",
    alcohol: "occasional",
    dietType: "balanced",
    stressLevel: "3",
    moodFrequency: "medium",
    socialInteraction: "medium",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save lifestyle data
    router.push("/dashboard/patient");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Lifestyle & Habits</h1>
          <p className="mt-2 text-gray-600">
            Your daily habits significantly impact your long-term health.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Daily Routine */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Activity className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Daily Routine</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Physical Activity</label>
                <select
                  name="activityLevel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                >
                  <option value="low">Low (Sedentary)</option>
                  <option value="medium">Medium (Light Exercise)</option>
                  <option value="high">High (Active/Athlete)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Avg. Sleep (Hours)</label>
                <input
                  type="number"
                  name="sleepHours"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                  value={formData.sleepHours}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Work Hours (Daily)</label>
                <input
                  type="number"
                  name="workHours"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                  value={formData.workHours}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Habits */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Coffee className="h-6 w-6 text-brown-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Habits</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Smoking</label>
                <select
                  name="smoking"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                  value={formData.smoking}
                  onChange={handleInputChange}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                  <option value="occasional">Occasional</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alcohol Consumption</label>
                <select
                  name="alcohol"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                  value={formData.alcohol}
                  onChange={handleInputChange}
                >
                  <option value="none">None</option>
                  <option value="occasional">Occasional</option>
                  <option value="regular">Regular</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Diet Type</label>
                <select
                  name="dietType"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                  value={formData.dietType}
                  onChange={handleInputChange}
                >
                  <option value="balanced">Balanced</option>
                  <option value="high_sugar">High Sugar</option>
                  <option value="high_fat">High Fat</option>
                  <option value="vegetarian">Vegetarian/Vegan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mental Health */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Brain className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Mental Wellbeing</h2>
            </div>
            <div className="mb-4 bg-purple-50 p-3 rounded-md border border-purple-100">
              <p className="text-sm text-purple-800">
                ⚠️ Note: These indicators are for screening purposes only and do not constitute a medical diagnosis.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stress Level (1-5)
                </label>
                <input
                  type="range"
                  name="stressLevel"
                  min="1"
                  max="5"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  value={formData.stressLevel}
                  onChange={handleInputChange}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low Stress</span>
                  <span>High Stress</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mood Frequency</label>
                <select
                  name="moodFrequency"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                  value={formData.moodFrequency}
                  onChange={handleInputChange}
                >
                  <option value="low">Low (Often feeling down)</option>
                  <option value="medium">Medium (Balanced)</option>
                  <option value="high">High (Generally happy)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="mr-2 h-5 w-5" />
              Complete Setup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
