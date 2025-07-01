import { FiDownload, FiPlus, FiTrash, FiEdit } from "react-icons/fi";
import { useState } from "react";

const bottlesData = [
  {
    id: 1,
    bottleType: "Plastic PET",
    quantity: 150,
    weight: 45.5,
    location: "Downtown Center",
    dateCollected: "2024-01-15",
    status: "Processed",
    recycledBy: "John Doe",
  },
  {
    id: 2,
    bottleType: "Glass",
    quantity: 75,
    weight: 120.0,
    location: "Mall Plaza",
    dateCollected: "2024-01-14",
    status: "In Transit",
    recycledBy: "Jane Smith",
  },
  {
    id: 3,
    bottleType: "Aluminum",
    quantity: 200,
    weight: 8.5,
    location: "University Campus",
    dateCollected: "2024-01-13",
    status: "Collected",
    recycledBy: "Sam Wilson",
  },
  {
    id: 4,
    bottleType: "Plastic HDPE",
    quantity: 90,
    weight: 27.3,
    location: "Shopping Center",
    dateCollected: "2024-01-12",
    status: "Processed",
    recycledBy: "Alice Johnson",
  },
  {
    id: 5,
    bottleType: "Glass",
    quantity: 120,
    weight: 180.0,
    location: "Office Complex",
    dateCollected: "2024-01-11",
    status: "In Transit",
    recycledBy: "Mike Brown",
  },
];

const Bottles = () => {
  const [bottlesList, setBottlesList] = useState(bottlesData);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    bottleType: "",
    quantity: "",
    weight: "",
    location: "",
    dateCollected: "",
    status: "Collected",
    recycledBy: "",
  });
  const [search, setSearch] = useState("");
  const [editBottleId, setEditBottleId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editBottleId !== null) {
      // Edit mode
      setBottlesList((prevList) =>
        prevList.map((bottle) =>
          bottle.id === editBottleId
            ? {
                ...bottle,
                bottleType: form.bottleType,
                quantity: Number(form.quantity),
                weight: Number(form.weight),
                location: form.location,
                dateCollected: form.dateCollected,
                status: form.status,
                recycledBy: form.recycledBy,
              }
            : bottle
        )
      );
    } else {
      // Add mode
      const newBottle = {
        id: bottlesList.length + 1,
        bottleType: form.bottleType,
        quantity: Number(form.quantity),
        weight: Number(form.weight),
        location: form.location,
        dateCollected: form.dateCollected,
        status: form.status,
        recycledBy: form.recycledBy,
      };
      setBottlesList([...bottlesList, newBottle]);
    }
    handleModalClose();
  };

  const handleEditClick = (bottle) => {
    setForm({
      bottleType: bottle.bottleType,
      quantity: bottle.quantity,
      weight: bottle.weight,
      location: bottle.location,
      dateCollected: bottle.dateCollected,
      status: bottle.status,
      recycledBy: bottle.recycledBy,
    });
    setEditBottleId(bottle.id);
    setShowModal(true);
  };

  const handleDeleteClick = (bottleId) => {
    if (window.confirm("Are you sure you want to delete this bottle record?")) {
      setBottlesList((prevList) =>
        prevList.filter((bottle) => bottle.id !== bottleId)
      );
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setForm({
      bottleType: "",
      quantity: "",
      weight: "",
      location: "",
      dateCollected: "",
      status: "Collected",
      recycledBy: "",
    });
    setEditBottleId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processed":
        return "bg-green-100 text-green-700";
      case "In Transit":
        return "bg-yellow-100 text-yellow-700";
      case "Collected":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredBottles = bottlesList.filter(
    (bottle) =>
      bottle.bottleType.toLowerCase().includes(search.toLowerCase()) ||
      bottle.location.toLowerCase().includes(search.toLowerCase()) ||
      bottle.recycledBy.toLowerCase().includes(search.toLowerCase()) ||
      bottle.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Bottle & Recycling Data
        </h1>
        <div className="flex space-x-2">
          <button
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <FiPlus className="mr-2" /> Add Bottle Record
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <FiDownload className="mr-2" /> Export Data
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full md:w-1/3 border rounded px-3 py-2"
          placeholder="Search by type, location, recycler, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editBottleId ? "Edit Bottle Record" : "Add New Bottle Record"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                className="w-full border rounded px-3 py-2"
                name="bottleType"
                value={form.bottleType}
                onChange={handleChange}
                required
              >
                <option value="">Select Bottle Type</option>
                <option value="Plastic PET">Plastic PET</option>
                <option value="Plastic HDPE">Plastic HDPE</option>
                <option value="Glass">Glass</option>
                <option value="Aluminum">Aluminum</option>
                <option value="Steel">Steel</option>
              </select>
              <input
                className="w-full border rounded px-3 py-2"
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                step="0.1"
                value={form.weight}
                onChange={handleChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                name="location"
                placeholder="Collection Location"
                value={form.location}
                onChange={handleChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="date"
                name="dateCollected"
                value={form.dateCollected}
                onChange={handleChange}
                required
              />
              <select
                className="w-full border rounded px-3 py-2"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Collected">Collected</option>
                <option value="In Transit">In Transit</option>
                <option value="Processed">Processed</option>
              </select>
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                name="recycledBy"
                placeholder="Recycled By"
                value={form.recycledBy}
                onChange={handleChange}
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  {editBottleId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Bottles</h3>
          <p className="text-2xl font-bold text-blue-600">
            {bottlesList.reduce((sum, bottle) => sum + bottle.quantity, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Weight</h3>
          <p className="text-2xl font-bold text-green-600">
            {bottlesList
              .reduce((sum, bottle) => sum + bottle.weight, 0)
              .toFixed(1)}{" "}
            kg
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Processed</h3>
          <p className="text-2xl font-bold text-purple-600">
            {
              bottlesList.filter((bottle) => bottle.status === "Processed")
                .length
            }
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">In Transit</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {
              bottlesList.filter((bottle) => bottle.status === "In Transit")
                .length
            }
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 text-left text-gray-600">Bottle Type</th>
              <th className="py-2 text-left text-gray-600">Quantity</th>
              <th className="py-2 text-left text-gray-600">Weight (kg)</th>
              <th className="py-2 text-left text-gray-600">Location</th>
              <th className="py-2 text-left text-gray-600">Date Collected</th>
              <th className="py-2 text-left text-gray-600">Status</th>
              <th className="py-2 text-left text-gray-600">Recycled By</th>
              <th className="py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBottles.map((bottle) => (
              <tr key={bottle.id} className="border-t">
                <td className="py-3 font-semibold">{bottle.bottleType}</td>
                <td className="py-3">{bottle.quantity}</td>
                <td className="py-3">{bottle.weight}</td>
                <td className="py-3">{bottle.location}</td>
                <td className="py-3">{bottle.dateCollected}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${getStatusColor(
                      bottle.status
                    )}`}
                  >
                    {bottle.status}
                  </span>
                </td>
                <td className="py-3">{bottle.recycledBy}</td>
                <td className="py-3">
                  <div className="flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-blue-600"
                      onClick={() => handleEditClick(bottle)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-gray-500 hover:text-red-600"
                      onClick={() => handleDeleteClick(bottle.id)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bottles;
