"use client";

import Sidebar from "@/components/common/Sidebar";
import VoiceRecorder from "@/components/voice-recorder/VoiceRecorder";
import TextDailyInput from "@/components/voice/TextDailyInput";
import { Mic, FileText, Activity, Brain, Moon, Keyboard, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function DailyLogPage() {
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    sentiment: string;
    keywords: string[];
    healthMetrics: { sleep: string; stress: string; symptoms: string[] };
    prediction: { risk: string; level: string };
    recommendation: string;
  }>(null);

  const handleAnalysisComplete = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        sentiment: "Anxious",
        keywords: ["tired", "headache", "work deadline", "no sleep"],
        healthMetrics: {
          sleep: "Low (4 hours)",
          stress: "High",
          symptoms: ["Headache", "Fatigue"],
        },
        prediction: {
          risk: "Migraine Episode",
          level: "High"
        },
        recommendation: "Hydrate immediately and try to rest in a dark, quiet room for 20 minutes. Avoid caffeine."
      });
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-black overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="bg-white/5 backdrop-blur-md border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <h1 className="text-3xl font-bold text-white">Daily Health Log</h1>
            <p className="text-blue-200 mt-1">Record your daily symptoms, meals, and feelings.</p>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Mode Switcher */}
              <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl inline-flex">
                <button
                  onClick={() => setInputMode('voice')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${inputMode === 'voice'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-blue-200 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Mic size={18} /> Voice
                </button>
                <button
                  onClick={() => setInputMode('text')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${inputMode === 'text'
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-blue-200 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Keyboard size={18} /> Text
                </button>
              </div>

              {inputMode === 'voice' ? (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-full text-blue-300">
                      <Mic size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white">Voice Recorder</h3>
                  </div>
                  <VoiceRecorder onRecordingComplete={handleAnalysisComplete} />
                </div>
              ) : (
                <TextDailyInput />
              )}
            </div>

            {/* Analysis Section */}
            <div className="space-y-6">
              {isAnalyzing ? (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 flex flex-col items-center justify-center text-center animate-pulse">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <h3 className="text-xl font-bold text-white">Analyzing your input...</h3>
                  <p className="text-blue-200 mt-2">Extracting health metrics and sentiment</p>
                </div>
              ) : analysisResult ? (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl animate-fade-in-up">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Activity className="text-emerald-400" /> Analysis Result
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-blue-200 text-sm mb-1 flex items-center gap-2">
                        <Brain size={14} /> Sentiment
                      </div>
                      <div className="text-white font-semibold text-lg">{analysisResult.sentiment}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-blue-200 text-sm mb-1 flex items-center gap-2">
                        <Moon size={14} /> Sleep Quality
                      </div>
                      <div className="text-white font-semibold text-lg">{analysisResult.healthMetrics.sleep}</div>
                    </div>
                  </div>

                  {/* Prediction & Recommendation */}
                  <div className="mb-6 space-y-4">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-red-200 font-semibold flex items-center gap-2">
                          <AlertTriangle size={16} /> Risk Prediction
                        </h4>
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-200 text-xs rounded border border-red-500/30">
                          {analysisResult.prediction.level} Risk
                        </span>
                      </div>
                      <p className="text-white font-medium">{analysisResult.prediction.risk}</p>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                      <h4 className="text-emerald-200 font-semibold flex items-center gap-2 mb-2">
                        <CheckCircle size={16} /> Immediate Recommendation
                      </h4>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        {analysisResult.recommendation}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-blue-200 text-sm font-semibold mb-3">Detected Symptoms</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.healthMetrics.symptoms.map((symptom, i) => (
                        <span key={i} className="px-3 py-1 bg-red-500/20 text-red-200 rounded-full text-sm border border-red-500/30">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-blue-200 text-sm font-semibold mb-3">Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.keywords.map((keyword, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm border border-blue-500/30">
                          #{keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center text-blue-200/50">
                  <FileText size={48} className="mb-4 opacity-50" />
                  <p className="text-lg">Record or type your daily log to see AI analysis here.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
