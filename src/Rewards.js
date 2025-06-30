import React from "react";
import { Link } from "react-router-dom";

const rewards = [
  { id: 1, name: "Eco Bottle", cost: 100, redeemed: 25 },
  { id: 2, name: "Green T-shirt", cost: 300, redeemed: 10 },
  { id: 3, name: "Reusable Bag", cost: 50, redeemed: 40 },
];

export default function Rewards() {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold mb-4 text-green-800">
        Reward Catalog
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white rounded-lg shadow p-3 flex flex-col justify-between border-l-4 border-green-500"
          >
            <div>
              <h2 className="text-base font-semibold text-green-700 mb-1">
                {reward.name}
              </h2>
              <div className="text-xs text-gray-500 mb-2">
                Cost:{" "}
                <span className="font-semibold text-green-700">
                  {reward.cost}
                </span>{" "}
                pts
              </div>
              <div className="text-xs text-green-600">
                Redeemed: {reward.redeemed}
              </div>
            </div>
            <div className="flex space-x-2 mt-2">
              <Link
                to={`/rewards/${reward.id}`}
                className="text-green-700 hover:underline text-xs font-semibold"
              >
                View
              </Link>
              <button className="text-yellow-600 hover:underline text-xs font-semibold">
                Edit
              </button>
              <button className="text-red-600 hover:underline text-xs font-semibold">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-semibold">
          Add Reward
        </button>
      </div>
    </div>
  );
}
