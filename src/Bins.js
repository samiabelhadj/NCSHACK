import React from "react";
import { Link } from "react-router-dom";

const bins = [
  {
    id: 1,
    location: "Algiers - Center",
    status: "Full",
    lastUpdate: "2024-06-05",
  },
  { id: 2, location: "Oran - West", status: "Empty", lastUpdate: "2024-06-04" },
  {
    id: 3,
    location: "Constantine - North",
    status: "Full",
    lastUpdate: "2024-06-03",
  },
];

export default function Bins() {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold mb-4 text-green-800">
        Smart Bin Location Management
      </h1>
      <div className="bg-white rounded-lg shadow p-3 md:p-4 mb-4">
        <div className="h-32 md:h-40 w-full bg-green-50 rounded flex items-center justify-center text-green-400 text-sm md:text-base">
          [Map View Coming Soon]
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-3 md:p-4">
        <table className="min-w-full text-xs md:text-sm divide-y divide-green-100">
          <thead>
            <tr className="bg-green-50">
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                Location
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                Status
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                Last Update
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-50">
            {bins.map((bin) => (
              <tr key={bin.id} className="hover:bg-green-50">
                <td className="px-2 py-2 md:px-3 md:py-2 text-green-900 whitespace-nowrap">
                  {bin.location}
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      bin.status === "Full"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {bin.status}
                  </span>
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2 text-green-700 whitespace-nowrap">
                  {bin.lastUpdate}
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2 text-right">
                  <Link
                    to={`/bins/${bin.id}`}
                    className="text-green-700 hover:underline font-semibold text-xs"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
