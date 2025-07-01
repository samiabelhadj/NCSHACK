import { Plus, Trash, Edit, Loader } from "lucide-react";
import { useState, useEffect } from "react";

const API_BASE_URL = "https://ncs-rv1s.onrender.com";

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "admin",
    points: "",
    status: "Active",
  });
  const [search, setSearch] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // You'll need to replace this with your actual auth token
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJkc2xrTnhsY2tzbmR4bHZrbnNmQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MTM2MDgwMSwiZXhwIjoxNzUxNDQ3MjAxfQ.icW5oe6WXImYodjoMt9_ByN87LVRrMikkLuRSwxi3Gk";

  // Fetch users from backend (you'll need to implement this endpoint)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Note: You'll need to implement a GET endpoint to fetch users
      // const response = await fetch(`${API_BASE_URL}/users`, {
      //   headers: {
      //     'Authorization': `Bearer ${authToken}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();
      // setUserList(data);

      // For now, using mock data until you implement the GET endpoint
      setUserList([
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          points: 1200,
          status: "Active",
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
          points: 850,
          status: "Active",
        },
      ]);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const createUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          role: userData.role,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const response = await fetch(`user/${userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (err) {
      console.error("Error updating user:", err);
      throw err;
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editUserId !== null) {
        // Update user
        await updateUser(editUserId, form);
        setUserList((prevList) =>
          prevList.map((user) =>
            user.id === editUserId
              ? {
                  ...user,
                  email: form.email,
                  points: Number(form.points),
                  status: form.status,
                }
              : user
          )
        );
      } else {
        // Create new user
        await createUser(form);
        // Add to local state (in a real app, you'd refetch from server)
        const newUser = {
          id: Date.now(), // temporary ID
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          points: Number(form.points) || 0,
          status: form.status,
        };
        setUserList([...userList, newUser]);
      }

      setShowModal(false);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "admin",
        points: "",
        status: "Active",
      });
      setEditUserId(null);
    } catch (err) {
      setError(editUserId ? "Failed to update user" : "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "", // Don't populate password for security
      role: "admin",
      points: user.points,
      status: user.status,
    });
    setEditUserId(user.id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "admin",
      points: "",
      status: "Active",
    });
    setEditUserId(null);
    setError("");
  };

  const handleDeleteClick = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUserList((prevList) => prevList.filter((user) => user.id !== userId));
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <div className="flex space-x-2">
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            onClick={() => setShowModal(true)}
            disabled={loading}
          >
            <Plus className="mr-2" size={18} /> Add User
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
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                {error}
              </div>
            )}
            <div className="space-y-4">
              {!editUserId && (
                <>
                  <input
                    className="w-full border rounded px-3 py-2"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full border rounded px-3 py-2"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full border rounded px-3 py-2"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <select
                    className="w-full border rounded px-3 py-2"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </>
              )}
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
                name="points"
                placeholder="Points"
                value={form.points}
                onChange={handleChange}
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
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                  onClick={handleModalClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center"
                  onClick={handleAddUser}
                  disabled={loading}
                >
                  {loading && (
                    <Loader className="mr-2 animate-spin" size={16} />
                  )}
                  {editUserId ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        {loading && userList.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <Loader className="animate-spin mr-2" size={24} />
            <span>Loading users...</span>
          </div>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 text-left text-gray-600">Name</th>
                <th className="py-2 text-left text-gray-600">Points</th>
                <th className="py-2 text-left text-gray-600">Status</th>
                <th className="py-2 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList
                .filter(
                  (user) =>
                    `${user.firstName} ${user.lastName}`
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase())
                )
                .map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="py-3">
                      <div className="font-semibold">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="py-3">{user.points || 0}</td>
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
                          className="text-gray-500 hover:text-blue-600 disabled:opacity-50"
                          onClick={() => handleEditClick(user)}
                          disabled={loading}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="text-gray-500 hover:text-red-600 disabled:opacity-50"
                          onClick={() => handleDeleteClick(user.id)}
                          disabled={loading}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
