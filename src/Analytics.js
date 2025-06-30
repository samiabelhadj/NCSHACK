import React from "react";

const stats = [
  { label: "User Growth", value: "+120 this month" },
  { label: "Bottles Recycled", value: "5,200 this week" },
  { label: "Points Distributed", value: "18,000 this week" },
  { label: "Most Active City", value: "Algiers" },
];

export default function Analytics() {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold mb-4 text-green-800">
        Analytics
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow p-3 flex flex-col items-center border-l-4 border-green-500"
          >
            <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
            <div className="text-base font-bold text-green-700">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-3 flex flex-col items-center">
        <h2 className="text-base font-semibold mb-2 text-green-700">
          Activity Chart
        </h2>
        <div className="h-32 w-full flex items-center justify-center text-gray-400">
          {/* Chart placeholder - replace with chart library later */}
          <svg width="140" height="50" viewBox="0 0 140 50" fill="none">
            <rect x="0" y="0" width="140" height="50" rx="8" fill="#f0fdf4" />
            <polyline
              points="10,40 30,30 50,35 70,15 90,10 110,20 130,10"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <circle cx="130" cy="10" r="3" fill="#22c55e" />
          </svg>
          <span className="ml-2 text-xs">(Chart coming soon)</span>
        </div>
      </div>
    </div>
  );
}
