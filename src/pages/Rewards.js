import {
  FiDownload,
  FiPlus,
  FiTrash,
  FiEdit,
  FiGift,
  FiStar,
  FiTag,
} from "react-icons/fi";
import { useState } from "react";

const rewardsData = [
  {
    id: "REW001",
    name: "Eco-Friendly Water Bottle",
    description: "Reusable stainless steel water bottle with custom design",
    category: "Eco Products",
    points: 500,
    value: 25.0,
    discount: 0,
    status: "Available",
    image: "https://via.placeholder.com/150x150/4ade80/ffffff?text=Bottle",
    expiryDate: "2024-12-31",
    featured: true,
  },
  {
    id: "REW002",
    name: "Grocery Store Gift Card",
    description: "$50 gift card for local organic grocery store",
    category: "Gift Cards",
    points: 1000,
    value: 50.0,
    discount: 10,
    status: "Available",
    image: "https://via.placeholder.com/150x150/3b82f6/ffffff?text=Gift+Card",
    expiryDate: "2024-12-31",
    featured: false,
  },
  {
    id: "REW003",
    name: "Plant a Tree Certificate",
    description: "Certificate for planting a tree in your name",
    category: "Environmental",
    points: 750,
    value: 15.0,
    discount: 0,
    status: "Available",
    image: "https://via.placeholder.com/150x150/10b981/ffffff?text=Tree",
    expiryDate: "2024-12-31",
    featured: true,
  },
  {
    id: "REW004",
    name: "Movie Theater Tickets",
    description: "2 tickets to any movie at local theater",
    category: "Entertainment",
    points: 800,
    value: 30.0,
    discount: 15,
    status: "Available",
    image: "https://via.placeholder.com/150x150/8b5cf6/ffffff?text=Movie",
    expiryDate: "2024-06-30",
    featured: false,
  },
  {
    id: "REW005",
    name: "Coffee Shop Voucher",
    description: "$20 voucher for local coffee shop",
    category: "Food & Beverage",
    points: 400,
    value: 20.0,
    discount: 20,
    status: "Available",
    image: "https://via.placeholder.com/150x150/f59e0b/ffffff?text=Coffee",
    expiryDate: "2024-12-31",
    featured: false,
  },
  {
    id: "REW006",
    name: "Eco-Friendly Tote Bag",
    description: "Reusable canvas tote bag with recycling logo",
    category: "Eco Products",
    points: 300,
    value: 12.0,
    discount: 0,
    status: "Available",
    image: "https://via.placeholder.com/150x150/06b6d4/ffffff?text=Bag",
    expiryDate: "2024-12-31",
    featured: false,
  },
  {
    id: "REW007",
    name: "Restaurant Discount",
    description: "25% off at participating eco-friendly restaurants",
    category: "Food & Beverage",
    points: 600,
    value: 25.0,
    discount: 25,
    status: "Available",
    image: "https://via.placeholder.com/150x150/ef4444/ffffff?text=Restaurant",
    expiryDate: "2024-12-31",
    featured: true,
  },
  {
    id: "REW008",
    name: "Public Transport Pass",
    description: "Monthly pass for public transportation",
    category: "Transportation",
    points: 1200,
    value: 60.0,
    discount: 5,
    status: "Available",
    image: "https://via.placeholder.com/150x150/6b7280/ffffff?text=Transport",
    expiryDate: "2024-12-31",
    featured: false,
  },
];

const Rewards = () => {
  const [rewardsList, setRewardsList] = useState(rewardsData);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Eco Products",
    points: "",
    value: "",
    discount: "",
    status: "Available",
    image: "",
    expiryDate: "",
    featured: false,
  });
  const [search, setSearch] = useState("");
  const [editRewardId, setEditRewardId] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editRewardId !== null) {
      // Edit mode
      setRewardsList((prevList) =>
        prevList.map((reward) =>
          reward.id === editRewardId
            ? {
                ...reward,
                name: form.name,
                description: form.description,
                category: form.category,
                points: Number(form.points),
                value: Number(form.value),
                discount: Number(form.discount),
                status: form.status,
                image: form.image,
                expiryDate: form.expiryDate,
                featured: form.featured,
              }
            : reward
        )
      );
    } else {
      // Add mode
      const newReward = {
        id: `REW${String(rewardsList.length + 1).padStart(3, "0")}`,
        name: form.name,
        description: form.description,
        category: form.category,
        points: Number(form.points),
        value: Number(form.value),
        discount: Number(form.discount),
        status: form.status,
        image: form.image,
        expiryDate: form.expiryDate,
        featured: form.featured,
      };
      setRewardsList([...rewardsList, newReward]);
    }
    handleModalClose();
  };

  const handleEditClick = (reward) => {
    setForm({
      name: reward.name,
      description: reward.description,
      category: reward.category,
      points: reward.points.toString(),
      value: reward.value.toString(),
      discount: reward.discount.toString(),
      status: reward.status,
      image: reward.image,
      expiryDate: reward.expiryDate,
      featured: reward.featured,
    });
    setEditRewardId(reward.id);
    setShowModal(true);
  };

  const handleDeleteClick = (rewardId) => {
    if (window.confirm("Are you sure you want to delete this reward?")) {
      setRewardsList((prevList) =>
        prevList.filter((reward) => reward.id !== rewardId)
      );
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setForm({
      name: "",
      description: "",
      category: "Eco Products",
      points: "",
      value: "",
      discount: "",
      status: "Available",
      image: "",
      expiryDate: "",
      featured: false,
    });
    setEditRewardId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";
      case "Discontinued":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Eco Products":
        return "bg-green-100 text-green-700";
      case "Gift Cards":
        return "bg-blue-100 text-blue-700";
      case "Environmental":
        return "bg-teal-100 text-teal-700";
      case "Entertainment":
        return "bg-purple-100 text-purple-700";
      case "Food & Beverage":
        return "bg-orange-100 text-orange-700";
      case "Transportation":
        return "bg-indigo-100 text-indigo-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDiscountColor = (discount) => {
    if (discount === 0) return "text-gray-500";
    if (discount >= 20) return "text-red-600";
    if (discount >= 10) return "text-orange-600";
    return "text-green-600";
  };

  const filteredRewards = rewardsList.filter(
    (reward) =>
      (selectedCategory === "All" || reward.category === selectedCategory) &&
      (reward.name.toLowerCase().includes(search.toLowerCase()) ||
        reward.description.toLowerCase().includes(search.toLowerCase()) ||
        reward.id.toLowerCase().includes(search.toLowerCase()) ||
        reward.category.toLowerCase().includes(search.toLowerCase()))
  );

  const categories = [
    "All",
    ...new Set(rewardsList.map((reward) => reward.category)),
  ];

  const exportToCSV = () => {
    const headers = [
      "Reward ID",
      "Name",
      "Description",
      "Category",
      "Points",
      "Value ($)",
      "Discount (%)",
      "Status",
      "Expiry Date",
      "Featured",
    ];

    const csvContent = [
      headers.join(","),
      ...rewardsList.map((reward) =>
        [
          reward.id,
          `"${reward.name}"`,
          `"${reward.description}"`,
          reward.category,
          reward.points,
          reward.value,
          reward.discount,
          reward.status,
          reward.expiryDate,
          reward.featured ? "Yes" : "No",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `rewards_data_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = (format) => {
    setShowExportMenu(false);
    if (format === "csv") {
      exportToCSV();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reward Catalog</h1>
        <div className="flex space-x-2">
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <FiPlus className="mr-2" /> Add Reward
          </button>
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <FiDownload className="mr-2" /> Export Data
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

      {/* Search and Filter */}
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2"
          placeholder="Search rewards by name, description, or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Featured Rewards */}
      {rewardsList.filter((reward) => reward.featured).length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FiStar className="mr-2 text-yellow-500" />
            Featured Rewards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewardsList
              .filter((reward) => reward.featured)
              .map((reward) => (
                <div
                  key={reward.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold text-lg">{reward.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {reward.description}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(
                          reward.category
                        )}`}
                      >
                        {reward.category}
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {reward.points} pts
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        ${reward.value}
                      </span>
                      <span
                        className={`text-sm font-semibold ${getDiscountColor(
                          reward.discount
                        )}`}
                      >
                        {reward.discount > 0
                          ? `${reward.discount}% OFF`
                          : "No discount"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editRewardId ? "Edit Reward" : "Add New Reward"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="w-full border rounded px-3 py-2"
                  type="text"
                  name="name"
                  placeholder="Reward Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <select
                  className="w-full border rounded px-3 py-2"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="Eco Products">Eco Products</option>
                  <option value="Gift Cards">Gift Cards</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Transportation">Transportation</option>
                </select>
              </div>
              <textarea
                className="w-full border rounded px-3 py-2"
                name="description"
                placeholder="Reward Description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  className="w-full border rounded px-3 py-2"
                  type="number"
                  name="points"
                  placeholder="Points Required"
                  value={form.points}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  type="number"
                  name="value"
                  placeholder="Value ($)"
                  step="0.01"
                  value={form.value}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  type="number"
                  name="discount"
                  placeholder="Discount (%)"
                  min="0"
                  max="100"
                  value={form.discount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  className="w-full border rounded px-3 py-2"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Available">Available</option>
                  <option value="Discontinued">Discontinued</option>
                </select>
                <input
                  className="w-full border rounded px-3 py-2"
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                className="w-full border rounded px-3 py-2"
                type="url"
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                required
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Featured Reward</label>
              </div>
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
                  {editRewardId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={reward.image}
                alt={reward.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{reward.name}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                    reward.status
                  )}`}
                >
                  {reward.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {reward.description}
              </p>
              <div className="flex justify-between items-center mb-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(
                    reward.category
                  )}`}
                >
                  {reward.category}
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {reward.points} pts
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">${reward.value}</span>
                <span
                  className={`text-sm font-semibold ${getDiscountColor(
                    reward.discount
                  )}`}
                >
                  {reward.discount > 0
                    ? `${reward.discount}% OFF`
                    : "No discount"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Expires: {reward.expiryDate}
                </span>
                <div className="flex space-x-2">
                  <button
                    className="text-gray-500 hover:text-blue-600"
                    onClick={() => handleEditClick(reward)}
                    title="Edit"
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-600"
                    onClick={() => handleDeleteClick(reward.id)}
                    title="Delete"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
