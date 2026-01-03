import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface RiskCardProps {
  title: string;
  riskPercentage: number;
  trend: "increasing" | "decreasing" | "stable";
  description: string;
}

export default function RiskCard({ title, riskPercentage, trend, description }: RiskCardProps) {
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
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
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
    </div>
  );
}
