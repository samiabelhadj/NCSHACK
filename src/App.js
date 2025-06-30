import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import "./App.css";

// Placeholder imports for pages (to be created)
import Dashboard from "./Dashboard";
import Users from "./Users";
import Bottles from "./Bottles";
import Partners from "./Partners";
import Bins from "./Bins";
import Rewards from "./Rewards";
import Analytics from "./Analytics";
import Sidebar from "./Sidebar";
import UserDetail from "./UserDetail";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-5xl px-2 md:px-6 py-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/bottles" element={<Bottles />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/bins" element={<Bins />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
