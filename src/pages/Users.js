import { FiDownload, FiPlus, FiTrash, FiEdit } from "react-icons/fi";
import { useState } from "react";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    bottles: 120,
    points: 1200,
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    bottles: 85,
    points: 850,
    status: "Active",
  },
  {
    id: 3,
    name: "Sam Wilson",
    email: "sam.wilson@example.com",
    bottles: 200,
    points: 2000,
    status: "Banned",
  },
  {
    id: 4,
    name: "Alice Johnson",
    email: "alice.j@example.com",
    bottles: 50,
    points: 500,
    status: "Active",
  },
];

const Users = () => {
  const [userList, setUserList] = useState(users);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    bottles: "",
    points: "",
    status: "Active",
  });
  const [search, setSearch] = useState("");
  const [editUserId, setEditUserId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (editUserId !== null) {
      setUserList((prevList) =>
        prevList.map((user) =>
          user.id === editUserId
            ? {
                ...user,
                name: form.name,
                email: form.email,
                bottles: Number(form.bottles),
                points: Number(form.points),
                status: form.status,
              }
            : user
        )
      );
    } else {
      const newUser = {
        id: userList.length + 1,
        name: form.name,
        email: form.email,
        bottles: Number(form.bottles),
        points: Number(form.points),
        status: form.status,
      };
      setUserList([...userList, newUser]);
    }
    setShowModal(false);
    setForm({ name: "", email: "", bottles: "", points: "", status: "Active" });
    setEditUserId(null);
  };

  const handleEditClick = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      bottles: user.bottles,
      points: user.points,
      status: user.status,
    });
    setEditUserId(user.id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setForm({ name: "", email: "", bottles: "", points: "", status: "Active" });
    setEditUserId(null);
  };

  const handleDeleteClick = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUserList((prevList) => prevList.filter((user) => user.id !== userId));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <div className="flex space-x-2">
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <FiPlus className="mr-2" /> Add User
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full md:w-1/3 border rounded px-3 py-2"
          placeholder="Search users by name or email..."
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editUserId ? "Edit User" : "Add New User"}
            </h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="number"
                name="bottles"
                placeholder="Bottles"
                value={form.bottles}
                onChange={handleChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="number"
                name="points"
                placeholder="Points"
                value={form.points}
                onChange={handleChange}
                required
              />
              <select
                className="w-full border rounded px-3 py-2"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Banned">Banned</option>
              </select>
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
                  {editUserId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 text-left text-gray-600">Name</th>
              <th className="py-2 text-left text-gray-600">Bottles</th>
              <th className="py-2 text-left text-gray-600">Points</th>
              <th className="py-2 text-left text-gray-600">Status</th>
              <th className="py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList
              .filter(
                (user) =>
                  user.name.toLowerCase().includes(search.toLowerCase()) ||
                  user.email.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="py-3">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="py-3">{user.bottles}</td>
                  <td className="py-3">{user.points}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button
                        className="text-gray-500 hover:text-blue-600"
                        onClick={() => handleEditClick(user)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-600"
                        onClick={() => handleDeleteClick(user.id)}
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

export default Users;
