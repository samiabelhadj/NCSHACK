import { Plus, Trash, Edit, Loader } from "lucide-react";
import { useState } from "react";

// Static mode: no backend API

const Users = () => {
  // Initial static users
  const [userList, setUserList] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      pointBalance: 100,
      role: "user",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      pointBalance: 200,
      role: "user",
    },
    {
      id: 3,
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      pointBalance: 0,
      role: "admin",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user", // Changed default to "user"Q
  });
  const [search, setSearch] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // No auth token needed in static mode

  // Helper function to get points value from user object
  const getUserPoints = (user) => {
    // Try different possible field names for points
    return user.pointBalance || 0;
  };

  // No backend fetch in static mode
  const fetchUsers = () => {
    // Optionally, could reset to initial static users
    setUserList((prev) => [...prev]);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Static create user: just return a mock result
  const createUser = async (userData) => {
    return { id: Date.now(), ...userData };
  };

  // Static update user: no backend
  const updateUser = async (userId, userData) => {
    return { id: userId, ...userData };
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!form.email || !form.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!editUserId && (!form.firstName || !form.lastName || !form.password)) {
      setError("All fields are required for new users");
      return;
    }

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
                  pointBalance: Number(form.points) || 0,
                }
              : user
          )
        );
      } else {
        // Create new user
        const result = await createUser(form);
        console.log("User creation result:", result);

        // Create the new user object immediately
        const newUser = {
          id: result?.id || result?.user?.id || Date.now(),
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          pointBalance: Number(form.points) || 0,
          role: form.role,
        };

        // Add to local state immediately for better UX
        setUserList((prevList) => {
          const currentList = Array.isArray(prevList) ? prevList : [];
          return [...currentList, newUser];
        });

        // No backend refresh needed in static mode
      }

      // Clear form and close modal
      setShowModal(false);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user", // Changed default to "user"
        points: "",
      });
      setEditUserId(null);
      setError(""); // Clear any previous errors
      console.log("User operation completed successfully");
    } catch (err) {
      console.error("Error in handleAddUser:", err);
      setError(
        editUserId
          ? "Failed to update user"
          : "Failed to create user. Please check your input and try again."
      );
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
      role: user.role || "user",
      points: getUserPoints(user) || "",
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
      role: "user", // Changed default to "user"
      points: "",
    });
    setEditUserId(null);
    setError("");
  };

  const handleDeleteClick = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUserList((prevList) =>
        Array.isArray(prevList)
          ? prevList.filter((user) => user.id !== userId)
          : []
      );
    }
  };
  // Filter to only show users (not admins)
  const filteredUsers = Array.isArray(userList)
    ? userList.filter(
        (user) =>
          user.role !== "admin" && // Exclude admins
          (`${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()))
      )
    : [];

  return (
    <div>
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          User Management (Users Only)
        </h1>
        <div className="flex space-x-2">
          <button
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
            onClick={() => fetchUsers()}
            disabled={loading}
          >
            <Loader
              className={`mr-2 ${loading ? "animate-spin" : ""}`}
              size={18}
            />
            Refresh
          </button>
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
            <form onSubmit={handleAddUser} className="space-y-4">
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
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
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
                value={0}
                readOnly
                onChange={handleChange}
              />
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
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center"
                  disabled={loading}
                >
                  {loading && (
                    <Loader className="mr-2 animate-spin" size={16} />
                  )}
                  {editUserId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        {loading && (!userList || userList.length === 0) ? (
          <div className="flex justify-center items-center py-8">
            <Loader className="animate-spin mr-2" size={24} />
            <span>Loading users...</span>
          </div>
        ) : (
          <>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No users found.{" "}
                {userList.length > 0 &&
                  "All users may be admins or filtered out."}
              </div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="py-2 text-left text-gray-600">Name</th>
                    <th className="py-2 text-left text-gray-600">Email</th>
                    <th className="py-2 text-left text-gray-600">Role</th>
                    <th className="py-2 text-left text-gray-600">Points</th>
                    <th className="py-2 text-left text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="py-3">
                        <div className="font-semibold">
                          {user.firstName} {user.lastName}
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="text-sm text-gray-600">
                          {user.email}
                        </div>
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 text-sm rounded-full ${
                            user.role === "admin"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="font-medium">
                          {getUserPoints(user)}
                        </span>
                        <div className="text-xs text-gray-500">
                          Debug:{" "}
                          {JSON.stringify({
                            pointBalance: user.pointBalance,
                            points: user.points,
                            point_balance: user.point_balance,
                            totalPoints: user.totalPoints,
                          })}
                        </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
