import React from "react";
import { useParams, Link } from "react-router-dom";

// Mock user data (in real app, fetch by ID)
const users = [
  {
    id: 1,
    name: "Amina B.",
    email: "amina@email.com",
    bottles: 320,
    points: 1200,
    status: "Active",
    joined: "2023-01-15",
  },
  {
    id: 2,
    name: "Yacine K.",
    email: "yacine@email.com",
    bottles: 210,
    points: 900,
    status: "Active",
    joined: "2023-03-22",
  },
  {
    id: 3,
    name: "Sara M.",
    email: "sara@email.com",
    bottles: 150,
    points: 600,
    status: "Banned",
    joined: "2022-11-10",
  },
  {
    id: 4,
    name: "Omar T.",
    email: "omar@email.com",
    bottles: 400,
    points: 1500,
    status: "Active",
    joined: "2022-09-05",
  },
];

export default function UserDetail() {
  const { id } = useParams();
  const user = users.find((u) => u.id === Number(id));

  if (!user) return <div className="text-red-600">User not found.</div>;

  return (
    <div>
      <Link
        to="/users"
        className="inline-block mb-4 text-green-700 hover:underline"
      >
        &larr; Back to Users
      </Link>
      <div className="bg-white rounded-xl shadow p-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-green-800 mb-2">{user.name}</h2>
        <div className="mb-4 text-gray-500">{user.email}</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 rounded p-4 text-center">
            <div className="text-lg font-semibold text-green-700">
              {user.bottles}
            </div>
            <div className="text-xs text-green-800">Bottles Recycled</div>
          </div>
          <div className="bg-green-50 rounded p-4 text-center">
            <div className="text-lg font-semibold text-green-700">
              {user.points}
            </div>
            <div className="text-xs text-green-800">Points</div>
          </div>
        </div>
        <div className="mb-2">
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              user.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user.status}
          </span>
        </div>
        <div className="text-sm text-gray-400">Joined: {user.joined}</div>
      </div>
    </div>
  );
}
