import React from "react";

const stats = [
  {
    label: "Total Users",
    value: 1240,
    icon: (
      <svg
        className="w-5 h-5 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75"
        />
      </svg>
    ),
  },
  {
    label: "Bottles Recycled",
    value: 58230,
    icon: (
      <svg
        className="w-5 h-5 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v-6a3 3 0 016 0v6m-6 0a3 3 0 006 0m-6 0H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4"
        />
      </svg>
    ),
  },
  {
    label: "Points Distributed",
    value: 194500,
    icon: (
      <svg
        className="w-5 h-5 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4zm6-4c0-3.31-2.69-6-6-6s-6 2.69-6 6"
        />
      </svg>
    ),
  },
  {
    label: "Active Bins",
    value: 37,
    icon: (
      <svg
        className="w-5 h-5 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v-6a3 3 0 016 0v6m-6 0a3 3 0 006 0m-6 0H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4"
        />
      </svg>
    ),
  },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold mb-4 text-green-800">
        Dashboard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow p-3 flex items-center space-x-2 border-l-4 border-green-500"
          >
            <div>{stat.icon}</div>
            <div>
              <div className="text-base font-bold text-green-700">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-3">
        <h2 className="text-base font-semibold mb-2 text-green-700">
          Monthly Recycling Growth
        </h2>
        <div className="h-40 flex items-center justify-center text-gray-400">
          {/* Chart placeholder - replace with chart library later */}
          <svg width="180" height="80" viewBox="0 0 180 80" fill="none">
            <rect x="0" y="0" width="180" height="80" rx="10" fill="#f0fdf4" />
            <polyline
              points="10,70 40,50 70,60 100,30 130,20 160,40 170,30"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
            />
            <circle cx="170" cy="30" r="4" fill="#22c55e" />
          </svg>
          <span className="ml-2 text-sm">(Chart coming soon)</span>
        </div>
      </div>
    </div>
  );
}
