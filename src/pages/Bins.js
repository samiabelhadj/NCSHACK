import {
  FiDownload,
  FiPlus,
  FiTrash,
  FiEdit,
  FiMapPin,
  FiChevronDown,
} from "react-icons/fi";
import { useState } from "react";
import GoogleMap from "../components/GoogleMap";

const binsData = [
  {
    id: "BIN001",
    name: "Downtown Center Bin",
    location: "123 Main Street, Downtown",
    coordinates: { lat: 40.7128, lng: -74.006 },
    capacity: 1000,
    currentLevel: 75,
    status: "Active",
    lastEmptied: "2024-01-15",
    type: "General Waste",
  },
  {
    id: "BIN002",
    name: "Mall Plaza Bin",
    location: "456 Shopping Ave, Mall Plaza",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    capacity: 800,
    currentLevel: 45,
    status: "Active",
    lastEmptied: "2024-01-14",
    type: "Recycling",
  },
  {
    id: "BIN003",
    name: "University Campus Bin",
    location: "789 College Blvd, University Campus",
    coordinates: { lat: 40.7505, lng: -73.9934 },
    capacity: 1200,
    currentLevel: 90,
    status: "Full",
    lastEmptied: "2024-01-10",
    type: "General Waste",
  },
  {
    id: "BIN004",
    name: "Office Complex Bin",
    location: "321 Business Park, Office Complex",
    coordinates: { lat: 40.7614, lng: -73.9776 },
    capacity: 600,
    currentLevel: 30,
    status: "Active",
    lastEmptied: "2024-01-16",
    type: "Recycling",
  },
  {
    id: "BIN005",
    name: "Shopping Center Bin",
    location: "654 Retail Road, Shopping Center",
    coordinates: { lat: 40.7484, lng: -73.9857 },
    capacity: 900,
    currentLevel: 85,
    status: "Active",
    lastEmptied: "2024-01-12",
    type: "General Waste",
  },
];

const Bins = () => {
  const [binsList, setBinsList] = useState(binsData);
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedBin, setSelectedBin] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    latitude: "",
    longitude: "",
    capacity: "",
    currentLevel: "",
    status: "Active",
    lastEmptied: "",
    type: "General Waste",
  });
  const [search, setSearch] = useState("");
  const [editBinId, setEditBinId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editBinId !== null) {
      // Edit mode
      setBinsList((prevList) =>
        prevList.map((bin) =>
          bin.id === editBinId
            ? {
                ...bin,
                name: form.name,
                location: form.location,
                coordinates: {
                  lat: Number(form.latitude),
                  lng: Number(form.longitude),
                },
                capacity: Number(form.capacity),
                currentLevel: Number(form.currentLevel),
                status: form.status,
                lastEmptied: form.lastEmptied,
                type: form.type,
              }
            : bin
        )
      );
    } else {
      // Add mode
      const newBin = {
        id: `BIN${String(binsList.length + 1).padStart(3, "0")}`,
        name: form.name,
        location: form.location,
        coordinates: {
          lat: Number(form.latitude),
          lng: Number(form.longitude),
        },
        capacity: Number(form.capacity),
        currentLevel: Number(form.currentLevel),
        status: form.status,
        lastEmptied: form.lastEmptied,
        type: form.type,
      };
      setBinsList([...binsList, newBin]);
    }
    handleModalClose();
  };

  const handleEditClick = (bin) => {
    setForm({
      name: bin.name,
      location: bin.location,
      latitude: bin.coordinates.lat.toString(),
      longitude: bin.coordinates.lng.toString(),
      capacity: bin.capacity.toString(),
      currentLevel: bin.currentLevel.toString(),
      status: bin.status,
      lastEmptied: bin.lastEmptied,
      type: bin.type,
    });
    setEditBinId(bin.id);
    setShowModal(true);
  };

  const handleDeleteClick = (binId) => {
    if (window.confirm("Are you sure you want to delete this bin?")) {
      setBinsList((prevList) => prevList.filter((bin) => bin.id !== binId));
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setForm({
      name: "",
      location: "",
      latitude: "",
      longitude: "",
      capacity: "",
      currentLevel: "",
      status: "Active",
      lastEmptied: "",
      type: "General Waste",
    });
    setEditBinId(null);
  };

  const handleMapClick = (bin) => {
    setSelectedBin(bin);
    setShowMap(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Full":
        return "bg-red-100 text-red-700";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-700";
      case "Inactive":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getLevelColor = (level) => {
    if (level >= 80) return "bg-red-500";
    if (level >= 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  const filteredBins = binsList.filter(
    (bin) =>
      bin.name.toLowerCase().includes(search.toLowerCase()) ||
      bin.location.toLowerCase().includes(search.toLowerCase()) ||
      bin.id.toLowerCase().includes(search.toLowerCase()) ||
      bin.status.toLowerCase().includes(search.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = [
      "Bin ID",
      "Name",
      "Location",
      "Latitude",
      "Longitude",
      "Type",
      "Capacity (L)",
      "Current Level (%)",
      "Status",
      "Last Emptied",
    ];

    const csvContent = [
      headers.join(","),
      ...binsList.map((bin) =>
        [
          bin.id,
          `"${bin.name}"`,
          `"${bin.location}"`,
          bin.coordinates.lat,
          bin.coordinates.lng,
          bin.type,
          bin.capacity,
          bin.currentLevel,
          bin.status,
          bin.lastEmptied,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `bins_data_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    // Create Excel-like format using HTML table
    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Bin ID</th>
          <th>Name</th>
          <th>Location</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Type</th>
          <th>Capacity (L)</th>
          <th>Current Level (%)</th>
          <th>Status</th>
          <th>Last Emptied</th>
        </tr>
      </thead>
      <tbody>
        ${binsList
          .map(
            (bin) => `
          <tr>
            <td>${bin.id}</td>
            <td>${bin.name}</td>
            <td>${bin.location}</td>
            <td>${bin.coordinates.lat}</td>
            <td>${bin.coordinates.lng}</td>
            <td>${bin.type}</td>
            <td>${bin.capacity}</td>
            <td>${bin.currentLevel}</td>
            <td>${bin.status}</td>
            <td>${bin.lastEmptied}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    `;

    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Bins Data Export</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h2>Smart Bin Location Data</h2>
          <p>Exported on: ${new Date().toLocaleString()}</p>
          ${table.outerHTML}
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "application/vnd.ms-excel" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `bins_data_${new Date().toISOString().split("T")[0]}.xls`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(binsList, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `bins_data_${new Date().toISOString().split("T")[0]}.json`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = (format) => {
    setShowExportMenu(false);
    switch (format) {
      case "csv":
        exportToCSV();
        break;
      case "excel":
        exportToExcel();
        break;
      case "json":
        exportToJSON();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Smart Bin Location Management
        </h1>
        <div className="flex space-x-2">
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <FiPlus className="mr-2" /> Add Bin
          </button>
          <button
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            onClick={() => setShowMap(true)}
          >
            <FiMapPin className="mr-2" /> View Map
          </button>
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <FiDownload className="mr-2" /> Export Data
              <FiChevronDown className="ml-2" />
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                <div className="py-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleExport("csv")}
                  >
                    Export as CSV
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleExport("excel")}
                  >
                    Export as Excel
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleExport("json")}
                  >
                    Export as JSON
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close export menu */}
      {showExportMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowExportMenu(false)}
        ></div>
      )}

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full md:w-1/3 border rounded px-3 py-2"
          placeholder="Search by bin ID, name, location, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Bins</h3>
          <p className="text-2xl font-bold text-blue-600">{binsList.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Active Bins</h3>
          <p className="text-2xl font-bold text-green-600">
            {binsList.filter((bin) => bin.status === "Active").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Full Bins</h3>
          <p className="text-2xl font-bold text-red-600">
            {binsList.filter((bin) => bin.status === "Full").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Avg. Capacity</h3>
          <p className="text-2xl font-bold text-purple-600">
            {Math.round(
              binsList.reduce((sum, bin) => sum + bin.currentLevel, 0) /
                binsList.length
            )}
            %
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editBinId ? "Edit Bin" : "Add New Bin"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                name="name"
                placeholder="Bin Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                name="location"
                placeholder="Address/Location"
                value={form.location}
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="w-full border rounded px-3 py-2"
                  type="number"
                  name="latitude"
                  placeholder="Latitude"
                  step="any"
                  value={form.latitude}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  type="number"
                  name="longitude"
                  placeholder="Longitude"
                  step="any"
                  value={form.longitude}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="w-full border rounded px-3 py-2"
                  type="number"
                  name="capacity"
                  placeholder="Capacity (L)"
                  value={form.capacity}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  type="number"
                  name="currentLevel"
                  placeholder="Current Level (%)"
                  min="0"
                  max="100"
                  value={form.currentLevel}
                  onChange={handleChange}
                  required
                />
              </div>
              <select
                className="w-full border rounded px-3 py-2"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="General Waste">General Waste</option>
                <option value="Recycling">Recycling</option>
                <option value="Organic">Organic</option>
                <option value="Hazardous">Hazardous</option>
              </select>
              <select
                className="w-full border rounded px-3 py-2"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Full">Full</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Inactive">Inactive</option>
              </select>
              <input
                className="w-full border rounded px-3 py-2"
                type="date"
                name="lastEmptied"
                value={form.lastEmptied}
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
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editBinId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl h-5/6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Bin Locations Map</h2>
              <button
                onClick={() => {
                  setShowMap(false);
                  setSelectedBin(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="h-full">
              <GoogleMap
                bins={binsList}
                selectedBin={selectedBin}
                onBinClick={(bin) => setSelectedBin(bin)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">Name</th>
              <th className="py-2 px-4 text-left text-gray-600">Location</th>
              <th className="py-2 px-4 text-left text-gray-600">Type</th>
              <th className="py-2 px-4 text-left text-gray-600">Capacity</th>
              <th className="py-2 px-4 text-left text-gray-600">Level</th>
              <th className="py-2 px-4 text-left text-gray-600">Status</th>
              <th className="py-2 px-4 text-left text-gray-600">
                Last Emptied
              </th>
              <th className="py-2 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBins.map((bin) => (
              <tr key={bin.id} className="border-t">
                <td className="py-3 px-4 font-semibold">{bin.name}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <FiMapPin className="text-gray-400 mr-1" />
                    {bin.location}
                  </div>
                </td>
                <td className="py-3 px-4">{bin.type}</td>
                <td className="py-3 px-4">{bin.capacity}L</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className={`h-2 rounded-full ${getLevelColor(
                          bin.currentLevel
                        )}`}
                        style={{ width: `${bin.currentLevel}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{bin.currentLevel}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${getStatusColor(
                      bin.status
                    )}`}
                  >
                    {bin.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">{bin.lastEmptied}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-blue-600"
                      onClick={() => handleMapClick(bin)}
                      title="View on Map"
                    >
                      <FiMapPin />
                    </button>
                    <button
                      className="text-gray-500 hover:text-blue-600"
                      onClick={() => handleEditClick(bin)}
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-gray-500 hover:text-red-600"
                      onClick={() => handleDeleteClick(bin.id)}
                      title="Delete"
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

export default Bins;
