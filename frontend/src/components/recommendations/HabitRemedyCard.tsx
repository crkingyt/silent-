import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

interface HabitRemedyProps {
  habit: string;
  riskIncrease: string;
  remedySteps: string[];
  sideEffects: string[];
  onMarkDone?: () => void;
}

const HabitRemedyCard: React.FC<HabitRemedyProps> = ({ habit, riskIncrease, remedySteps, sideEffects, onMarkDone }) => {
  const [showPlan, setShowPlan] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const togglePlan = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPlan(prev => !prev);
  };

  const handleDone = () => {
    setIsDone(true);
    if (onMarkDone) onMarkDone();
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white capitalize">{habit} Remediation</h3>
          <p className="text-red-300 text-sm mt-1 flex items-center gap-1">
            <AlertTriangle size={14} /> Increases cardiac risk by {riskIncrease}
          </p>
        </div>
        <button
            onClick={handleDone}
            disabled={isDone}
            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                isDone 
                ? "bg-green-500/20 border-green-500 text-green-400" 
                : "bg-red-500/20 border-red-500 text-red-300 hover:bg-red-500/30"
            }`}
        >
            {isDone ? "RESOLVED" : "MARK RESOLVED"}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-blue-200 text-sm font-semibold mb-2">Side Effects</h4>
          <div className="flex flex-wrap gap-2">
            {(sideEffects || []).map((effect, index) => (
              <span key={index} className="px-3 py-1 bg-red-500/20 text-red-200 text-xs rounded-full border border-red-500/30">
                {effect}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-emerald-200 text-sm font-semibold mb-2">Steps to Quit</h4>
          <ul className="space-y-2">
            {(remedySteps || []).map((step, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                <CheckCircle size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {showPlan && (
          <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Calendar size={16} className="text-blue-400" /> 4-Week Progress Plan
            </h4>
            <div className="space-y-3">
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-xs text-blue-300 font-bold uppercase mb-1">Week 1: Awareness</div>
                <p className="text-sm text-gray-300">Track every trigger. Delay first use by 30 mins.</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-xs text-blue-300 font-bold uppercase mb-1">Week 2: Reduction</div>
                <p className="text-sm text-gray-300">Cut daily intake by 50%. Replace with gum/water.</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-xs text-blue-300 font-bold uppercase mb-1">Week 3: Quit Date</div>
                <p className="text-sm text-gray-300">Zero tolerance. Use NRT patches if prescribed.</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-xs text-blue-300 font-bold uppercase mb-1">Week 4: Maintenance</div>
                <p className="text-sm text-gray-300">Manage stress with exercise. Celebrate milestones.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <button 
        type="button"
        onClick={togglePlan}
        className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-blue-200 text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        {showPlan ? "Hide Progress Plan" : "View Progress Plan"} 
        {showPlan ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
    </div>
  );
};

export default HabitRemedyCard;
