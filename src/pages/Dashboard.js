import { FiUsers, FiBox, FiAward, FiDollarSign } from "react-icons/fi";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className={`text-3xl p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Bottles Recycled',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(52, 211, 153, 0.5)',
                borderColor: 'rgba(52, 211, 153, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back, Admin!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <StatCard icon={<FiUsers />} label="Total Users" value="1,234" color="text-blue-500 bg-blue-100" />
                <StatCard icon={<FiBox />} label="Bottles Recycled" value="56,789" color="text-green-500 bg-green-100" />
                <StatCard icon={<FiAward />} label="Rewards Redeemed" value="2,345" color="text-yellow-500 bg-yellow-100" />
                <StatCard icon={<FiDollarSign />} label="Total Revenue" value="$12,345" color="text-purple-500 bg-purple-100" />
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800">Monthly Recycling Growth</h2>
                <div className="mt-4">
                    <Bar data={chartData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 