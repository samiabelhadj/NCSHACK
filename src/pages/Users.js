import { FiDownload, FiPlus, FiTrash, FiEdit } from "react-icons/fi";

const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", bottles: 120, points: 1200, status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", bottles: 85, points: 850, status: "Active" },
    { id: 3, name: "Sam Wilson", email: "sam.wilson@example.com", bottles: 200, points: 2000, status: "Banned" },
    { id: 4, name: "Alice Johnson", email: "alice.j@example.com", bottles: 50, points: 500, status: "Active" },
];

const Users = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                <div className="flex space-x-2">
                    <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        <FiPlus className="mr-2" /> Add User
                    </button>
                    <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        <FiDownload className="mr-2" /> Export CSV
                    </button>
                </div>
            </div>

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
                        {users.map(user => (
                            <tr key={user.id} className="border-t">
                                <td className="py-3">
                                    <div className="font-semibold">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="py-3">{user.bottles}</td>
                                <td className="py-3">{user.points}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-1 text-sm rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-3">
                                    <div className="flex space-x-2">
                                        <button className="text-gray-500 hover:text-blue-600"><FiEdit /></button>
                                        <button className="text-gray-500 hover:text-red-600"><FiTrash /></button>
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