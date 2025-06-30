import React from "react";
import { Link } from "react-router-dom";

const bottles = [
  {
    id: 1,
    user: "Amina B.",
    type: "Plastic",
    region: "Algiers",
    count: 120,
    points: 240,
    date: "2024-06-01",
  },
  {
    id: 2,
    user: "Yacine K.",
    type: "Glass",
    region: "Oran",
    count: 60,
    points: 180,
    date: "2024-06-02",
  },
  {
    id: 3,
    user: "Sara M.",
    type: "Metal",
    region: "Constantine",
    count: 30,
    points: 90,
    date: "2024-06-03",
  },
  {
    id: 4,
    user: "Omar T.",
    type: "Plastic",
    region: "Algiers",
    count: 80,
    points: 160,
    date: "2024-06-04",
  },
];

export default function Bottles() {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold mb-4 text-green-800">
        Bottle & Recycling Data
      </h1>
      <div className="bg-white rounded-lg shadow p-3 md:p-4 overflow-x-auto">
        <table className="min-w-full text-xs md:text-sm divide-y divide-green-100">
          <thead>
            <tr className="bg-green-50">
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                User
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                Type
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                Region
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                Count
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                Points
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                Date
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-50">
            {bottles.map((bottle) => (
              <tr key={bottle.id} className="hover:bg-green-50">
                <td className="px-2 py-2 md:px-3 md:py-2 text-green-900 whitespace-nowrap">
                  {bottle.user}
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2 text-green-700 whitespace-nowrap">
                  {bottle.type}
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2 text-green-700 whitespace-nowrap">
                  {bottle.region}
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2 text-green-700">
                  {bottle.count}
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2 text-green-700">
                  {bottle.points}
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2 text-green-700 whitespace-nowrap">
                  {bottle.date}
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2 text-right">
                  <Link
                    to={`/bottles/${bottle.id}`}
                    className="text-green-700 hover:underline font-semibold"
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
