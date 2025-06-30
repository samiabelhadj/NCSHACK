import React from "react";
import { Link } from "react-router-dom";

const users = [
  {
    id: 1,
    name: "Amina B.",
    email: "amina@email.com",
    bottles: 320,
    points: 1200,
    status: "Active",
  },
  {
    id: 2,
    name: "Yacine K.",
    email: "yacine@email.com",
    bottles: 210,
    points: 900,
    status: "Active",
  },
  {
    id: 3,
    name: "Sara M.",
    email: "sara@email.com",
    bottles: 150,
    points: 600,
    status: "Banned",
  },
  {
    id: 4,
    name: "Omar T.",
    email: "omar@email.com",
    bottles: 400,
    points: 1500,
    status: "Active",
  },
];

export default function Users() {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold mb-4 text-green-800">
        User Management
      </h1>
      <div className="bg-white rounded-lg shadow p-3 md:p-4 overflow-x-auto">
        <table className="min-w-full text-xs md:text-sm divide-y divide-green-100">
          <thead>
            <tr className="bg-green-50">
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                Name
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                Email
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                Bottles
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                Points
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2 text-left font-semibold text-green-700 uppercase">
                Status
              </th>
              <th className="px-2 py-2 md:px-3 md:py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-green-50">
                <td className="px-2 py-2 md:px-3 md:py-2 font-medium text-green-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2 text-green-700 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2 text-green-700">
                  {user.bottles}
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2 text-green-700">
                  {user.points}
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-2 py-2 md:px-3 md:py-2 text-right whitespace-nowrap">
                  <Link
                    to={`/users/${user.id}`}
                    className="text-green-700 hover:underline font-semibold mr-2"
                  >
                    View
                  </Link>
                  <button className="text-yellow-600 hover:underline font-semibold mr-1">
                    Deactivate
                  </button>
                  <button className="text-red-600 hover:underline font-semibold">
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
