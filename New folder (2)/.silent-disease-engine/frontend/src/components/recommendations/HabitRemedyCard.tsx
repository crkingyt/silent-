import React from 'react';
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

interface HabitRemedyProps {
  habit: string;
  riskIncrease: string;
  remedySteps: string[];
  sideEffects: string[];
}

const HabitRemedyCard: React.FC<HabitRemedyProps> = ({ habit, riskIncrease, remedySteps, sideEffects }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white capitalize">{habit} Remediation</h3>
          <p className="text-red-300 text-sm mt-1 flex items-center gap-1">
            <AlertTriangle size={14} /> Increases cardiac risk by {riskIncrease}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-blue-200 text-sm font-semibold mb-2">Side Effects</h4>
          <div className="flex flex-wrap gap-2">
            {sideEffects.map((effect, index) => (
              <span key={index} className="px-3 py-1 bg-red-500/20 text-red-200 text-xs rounded-full border border-red-500/30">
                {effect}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-emerald-200 text-sm font-semibold mb-2">Steps to Quit</h4>
          <ul className="space-y-2">
            {remedySteps.map((step, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                <CheckCircle size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-blue-200 text-sm font-medium transition-colors flex items-center justify-center gap-2">
        View Progress Plan <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default HabitRemedyCard;
