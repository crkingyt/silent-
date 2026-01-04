import React, { useState } from 'react';
import { Send, Type } from 'lucide-react';
import { dailyLogService } from '@/services/dailyLog';

const TextDailyInput = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      await dailyLogService.createLog({
        log_date: new Date().toISOString(),
        mood: "Neutral", // Default or extract from text
        stress_level: 5, // Default
        sleep_quality: 7, // Default
        notes: text
      });
      setText('');
      alert('Daily log submitted successfully!');
    } catch (error) {
      console.error("Failed to submit log", error);
      alert("Failed to submit log.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-500/20 rounded-full text-indigo-300">
          <Type size={20} />
        </div>
        <h3 className="text-lg font-bold text-white">Type Your Day</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How are you feeling today? Describe your meals, sleep, and any symptoms..."
          className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all resize-none"
        />
        
        <button
          type="submit"
          disabled={!text.trim() || loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {loading ? "Submitting..." : <><Send size={18} /> Submit Log</>}
        </button>
      </form>
    </div>
  );
};

export default TextDailyInput;
