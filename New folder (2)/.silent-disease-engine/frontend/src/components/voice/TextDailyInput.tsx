import React, { useState } from 'react';
import { Send, Type } from 'lucide-react';

const TextDailyInput = () => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    console.log('Submitted text log:', text);
    // API call to submit text log
    setText('');
    alert('Daily log submitted successfully!');
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
          disabled={!text.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Send size={18} /> Submit Log
        </button>
      </form>
    </div>
  );
};

export default TextDailyInput;
