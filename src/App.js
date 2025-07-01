import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Bottles from "./pages/Bottles";
import Partners from "./pages/Partners";
import Bins from "./pages/Bins";
import Rewards from "./pages/Rewards";

import Login from "./pages/Login";

function App() {
  // For now, we will assume the user is authenticated.
  // We will add the authentication logic later.
  const isAuthenticated = true;

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 p-6 sm:p-10">
          <Routes>
            <Route path="/login" element={<Login />} />
            {isAuthenticated ? (
              <>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetail />} />
                <Route path="/bottles" element={<Bottles />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/bins" element={<Bins />} />
                <Route path="/rewards" element={<Rewards />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
