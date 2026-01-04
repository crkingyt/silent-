"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onboardingService } from '@/services/onboarding';
import { Activity, Heart, Brain, ArrowRight, CheckCircle, Upload, FileText, Download, AlertTriangle, Clock, Moon, Zap } from 'lucide-react';

export default function OnboardingReportPage() {
  const router = useRouter();
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    sleepPattern: '6-8 hours',
    workTime: '',
    stressLevel: 'moderate',
    smoking: 'no',
    drinking: 'no',
    existingConditions: '',
    medicalReport: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, medicalReport: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Map form data to API schema
      const apiData = {
        age: parseInt(formData.age) || 0,
        gender: formData.gender,
        height: parseFloat(formData.height) || 0,
        weight: parseFloat(formData.weight) || 0,
        activity_level: "Moderate", // Default or add field
        smoking_habit: formData.smoking === 'yes' ? 'Regular' : 'None',
        alcohol_habit: formData.drinking === 'yes' ? 'Regular' : 'None',
        diet_type: "Balanced", // Default
        sleep_hours: 7.0, // Default or parse from sleepPattern
        existing_conditions: formData.existingConditions ? [formData.existingConditions] : []
      };

      await onboardingService.createReport(apiData);
      
      setTimeout(() => {
        setLoading(false);
        setShowResult(true);
      }, 1000);
    } catch (error) {
      console.error("Failed to submit onboarding", error);
      alert("Failed to submit onboarding report.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-slate-900 to-black flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-2xl font-bold text-white animate-pulse">Analyzing Health Profile...</h2>
        <p className="text-teal-200 mt-2">Processing your daily routines and medical data</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-slate-900 to-black p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mb-4">
              <CheckCircle size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white">Baseline Report Ready</h1>
            <p className="text-teal-100 mt-2">Here is your initial health assessment based on the provided details.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* The Report Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="text-blue-400" /> Health Profile Summary
                </h2>
                <button className="p-2 hover:bg-white/10 rounded-lg text-blue-200 transition-colors" title="Download PDF">
                  <Download size={20} />
                </button>
              </div>
              
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>BMI Category</span>
                  <span className="text-white font-medium">Overweight (26.4)</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Metabolic Age</span>
                  <span className="text-white font-medium">34 Years</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Stress Level</span>
                  <span className={`font-medium ${formData.stressLevel === 'high' || formData.stressLevel === 'severe' ? 'text-red-400' : 'text-white'}`}>
                    {formData.stressLevel.charAt(0).toUpperCase() + formData.stressLevel.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Sleep Quality</span>
                  <span className="text-white font-medium">{formData.sleepPattern}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>Risk Factors Identified</span>
                  <span className="text-amber-400 font-medium">
                    {[
                      formData.smoking === 'yes' ? 'Smoking' : null,
                      formData.drinking === 'yes' ? 'Alcohol' : null,
                      (formData.stressLevel === 'high' || formData.stressLevel === 'severe') ? 'High Stress' : null
                    ].filter(Boolean).length || 'None'}
                  </span>
                </div>
              </div>
            </div>

            {/* Initial Recommendations */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                <Activity className="text-emerald-400" /> Recommended Actions
              </h2>
              
              <div className="space-y-4">
                {formData.smoking === 'yes' && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <h3 className="text-red-200 font-semibold flex items-center gap-2 mb-1">
                      <AlertTriangle size={16} /> Cardiac Health
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Due to smoking history, we recommend a baseline ECG within the next 30 days.
                    </p>
                  </div>
                )}

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <h3 className="text-blue-200 font-semibold mb-1">
                    Lifestyle Adjustment
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Start with 20 mins of moderate cardio 3x a week to improve metabolic age.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link 
              href="/dashboard/patient" 
              className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2"
            >
              Go to Dashboard <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-slate-900 to-black flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl my-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/20 text-teal-300 mb-4">
            <Activity size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white">Initial Health Baseline</h1>
          <p className="text-teal-100 mt-2">Complete your profile with daily routines and medical history.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-teal-100 text-sm font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                  placeholder="Years"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-teal-100 text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all [&>option]:text-gray-900"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-teal-100 text-sm font-medium">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                  placeholder="cm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-teal-100 text-sm font-medium">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                  placeholder="kg"
                  required
                />
              </div>
            </div>
          </div>

          {/* Daily Routines */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2 flex items-center gap-2">
              <Clock size={20} className="text-teal-400" /> Daily Routines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-teal-100 text-sm font-medium">Sleep Pattern</label>
                <div className="relative">
                  <Moon className="absolute left-3 top-3.5 text-teal-500/50" size={18} />
                  <select
                    name="sleepPattern"
                    value={formData.sleepPattern}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all [&>option]:text-gray-900"
                  >
                    <option value="< 6 hours">Less than 6 hours</option>
                    <option value="6-8 hours">6-8 hours (Recommended)</option>
                    <option value="> 8 hours">More than 8 hours</option>
                    <option value="irregular">Irregular / Insomnia</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-teal-100 text-sm font-medium">Work Schedule</label>
                <input
                  type="text"
                  name="workTime"
                  value={formData.workTime}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                  placeholder="e.g. 9 AM - 5 PM, Night Shift"
                />
              </div>

              <div className="space-y-2">
                <label className="text-teal-100 text-sm font-medium">Stress Level</label>
                <div className="relative">
                  <Zap className="absolute left-3 top-3.5 text-teal-500/50" size={18} />
                  <select
                    name="stressLevel"
                    value={formData.stressLevel}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all [&>option]:text-gray-900"
                  >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-teal-100 text-sm font-medium">Smoking</label>
                  <select
                    name="smoking"
                    value={formData.smoking}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all [&>option]:text-gray-900"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                    <option value="occasional">Occasional</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-teal-100 text-sm font-medium">Drinking</label>
                  <select
                    name="drinking"
                    value={formData.drinking}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all [&>option]:text-gray-900"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                    <option value="occasional">Occasional</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Medical History & Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Medical History</h3>
            
            <div className="space-y-2">
              <label className="text-teal-100 text-sm font-medium">Existing Conditions / Family History</label>
              <textarea
                name="existingConditions"
                value={formData.existingConditions}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all h-24 resize-none"
                placeholder="e.g. Diabetes, Hypertension in family..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-teal-100 text-sm font-medium">Upload Medical Report (Optional)</label>
              <div className="relative group">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  accept=".pdf,.jpg,.png,.doc,.docx"
                />
                <div className="w-full bg-white/5 border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center group-hover:border-teal-400/50 transition-all">
                  <div className="p-3 bg-teal-500/10 rounded-full text-teal-400 mb-3 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <p className="text-white font-medium">
                    {formData.medicalReport ? formData.medicalReport.name : "Click or Drag to Upload Report"}
                  </p>
                  <p className="text-teal-200/60 text-sm mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Generate Baseline Report <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
