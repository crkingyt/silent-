import { ArrowUp, ArrowDown, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface RiskCardProps {
  title: string;
  riskPercentage: number;
  trend: "increasing" | "decreasing" | "stable";
  description: string;
  mitigation?: string;
}

export default function RiskCard({ title, riskPercentage, trend, description, mitigation }: RiskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  let trendColor = "text-gray-500";
  let TrendIcon = Minus;

  if (trend === "increasing") {
    trendColor = "text-red-500";
    TrendIcon = ArrowUp;
  } else if (trend === "decreasing") {
    trendColor = "text-green-500";
    TrendIcon = ArrowDown;
  }

  const getRiskColor = (percentage: number) => {
    if (percentage < 30) return "bg-green-100 text-green-800";
    if (percentage < 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div 
      className={`rounded-lg bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 cursor-pointer hover:shadow-md ${isExpanded ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRiskColor(
            riskPercentage
          )}`}
        >
          {riskPercentage}% Risk
        </span>
      </div>
      <div className="mt-4">
        <div className="flex items-center">
          <TrendIcon className={`h-5 w-5 ${trendColor} mr-2`} />
          <span className={`text-sm font-medium ${trendColor}`}>
            {trend.charAt(0).toUpperCase() + trend.slice(1)} Trend
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${
            riskPercentage < 30 ? "bg-green-500" : riskPercentage < 70 ? "bg-yellow-500" : "bg-red-500"
          }`}
          style={{ width: `${riskPercentage}%` }}
        ></div>
      </div>
      
      {mitigation && (
        <div className={`mt-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-1 flex items-center">
              How to overcome
            </h4>
            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
              {mitigation}
            </p>
          </div>
        </div>
      )}
      
      {mitigation && (
        <div className="mt-2 flex justify-center">
            {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
        </div>
      )}
    </div>
  );
}
