import { Plus, Trash, Edit, Loader } from "lucide-react";
import { useState, useEffect } from "react";

const API_BASE_URL = "https://ncs-bpb4.onrender.com";

const Users = () => {
  const [userList, setUserList] = useState([]);
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

  // You'll need to replace this with your actual auth token
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJkc2xrTnhsY2tzbmR4bHZrbnNmQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MTM2MDgwMSwiZXhwIjoxNzUxNDQ3MjAxfQ.icW5oe6WXImYodjoMt9_ByN87LVRrMikkLuRSwxi3Gk";

  // Helper function to get points value from user object
  const getUserPoints = (user) => {
    // Try different possible field names for points
    return user.pointBalance || 0;
  };

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log("Fetching users...");

      const response = await fetch(`${API_BASE_URL}/user/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Users fetched successfully:", data);
      console.log(response.data);
      console.log("Sample user object:", data.data?.[0]); // Debug: log first user to see field names

      // Handle the API response structure: {message: '...', total: 24, data: Array(10)}
      if (data && Array.isArray(data.data)) {
        setUserList(data.data);
        console.log(Array.isArray(data.data));
        console.log("wfxvbwvcbgwc", data.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Using fallback data.");

      // Fallback to mock data if API fails
      // eslint-disable-next-line no-undef
      //setUserList(data.data);
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
      console.log("Creating user with data:", userData);

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

      console.log("Create user response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Create user error:", errorData);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      // Handle both cases: API returns data or empty response
      let result;
      try {
        result = await response.json();
        console.log("User created successfully with response:", result);
      } catch (jsonError) {
        // If no JSON response, create a mock result
        console.log("No JSON response, user likely created successfully");
        result = { success: true };
      }

      return result;
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      console.log("Updating user:", userId, "with data:", userData);

      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
        }),
      });

      console.log("Update user response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Update user error:", errorData);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const result = await response.json().catch(() => ({}));
      console.log("User updated successfully:", result);
      return result;
    } catch (err) {
      console.error("Error updating user:", err);
      throw err;
    }
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

        // Try to refresh the user list to sync with backend (but don't wait for it)
        setTimeout(async () => {
          try {
            await fetchUsers();
            console.log("User list refreshed successfully");
          } catch (refreshError) {
            console.error("Failed to refresh user list:", refreshError);
            // The user is already added to local state, so this is just for sync
          }
        }, 1000); // Small delay to allow backend to process
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
      try {
        // Make API call to delete from database
        const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Include authorization token if needed
            // 'Authorization': `Bearer ${yourAuthToken}`
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        // Only update the local state if the database deletion was successful
        setUserList((prevList) =>
          Array.isArray(prevList)
            ? prevList.filter((user) => user.id !== userId)
            : []
        );
      } catch (error) {
        console.error("Error deleting user:", error);
        // Optionally show an error message to the user
        alert("Failed to delete user. Please try again.");
      }
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
