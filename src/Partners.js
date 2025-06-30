import React from "react";
import { Link } from "react-router-dom";

const partners = [
  { id: 1, name: "GreenCycle", rewards: 5, popular: true },
  { id: 2, name: "EcoRewards", rewards: 3, popular: false },
  { id: 3, name: "RecyclePlus", rewards: 4, popular: true },
];

export default function Partners() {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold mb-4 text-green-800">
        Supplier & Partner Management
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-lg shadow p-3 flex flex-col justify-between border-l-4 border-green-500"
          >
            <div>
              <h2 className="text-base font-semibold text-green-700 mb-1 flex items-center">
                {partner.name}
                {partner.popular && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                    Popular
                  </span>
                )}
              </h2>
              <div className="text-xs text-gray-500 mb-2">
                Rewards: {partner.rewards}
              </div>
            </div>
            <div className="flex space-x-2 mt-2">
              <Link
                to={`/partners/${partner.id}`}
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
          Add Partner
        </button>
      </div>
    </div>
  );
}
