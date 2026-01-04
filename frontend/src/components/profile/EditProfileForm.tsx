"use client";

import React, { useState } from 'react';
import { Save, User, Activity, Moon, Cigarette, Wine } from 'lucide-react';

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    age: 30,
    height: 175,
    weight: 70,
    smoking: 'no',
    drinking: 'occasional',
    sleepHours: 7,
    activityLevel: 'moderate'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call to update profile would go here
    console.log('Profile updated:', formData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/20 rounded-full text-blue-100">
          <User size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age */}
          <div className="space-y-2">
            <label className="text-blue-100 text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Height */}
          <div className="space-y-2">
            <label className="text-blue-100 text-sm font-medium">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <label className="text-blue-100 text-sm font-medium">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Sleep */}
          <div className="space-y-2">
            <label className="text-blue-100 text-sm font-medium flex items-center gap-2">
              <Moon size={16} /> Sleep (Hours/Day)
            </label>
            <input
              type="number"
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Activity size={20} /> Lifestyle Habits
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Smoking */}
            <div className="space-y-2">
              <label className="text-blue-100 text-sm font-medium flex items-center gap-2">
                <Cigarette size={16} /> Smoking
              </label>
              <select
                name="smoking"
                value={formData.smoking}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all [&>option]:text-gray-900"
              >
                <option value="no">No</option>
                <option value="occasional">Occasional</option>
                <option value="regular">Regular</option>
              </select>
            </div>

            {/* Drinking */}
            <div className="space-y-2">
              <label className="text-blue-100 text-sm font-medium flex items-center gap-2">
                <Wine size={16} /> Drinking
              </label>
              <select
                name="drinking"
                value={formData.drinking}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all [&>option]:text-gray-900"
              >
                <option value="no">No</option>
                <option value="occasional">Occasional</option>
                <option value="regular">Regular</option>
              </select>
            </div>

            {/* Activity Level */}
            <div className="space-y-2">
              <label className="text-blue-100 text-sm font-medium">Activity Level</label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all [&>option]:text-gray-900"
              >
                <option value="sedentary">Sedentary</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
                <option value="athletic">Athletic</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <Save size={20} /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
