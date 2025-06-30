import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: (
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0v6m0 0H7m6 0h6"
        />
      </svg>
    ),
  },
  {
    name: "Users",
    path: "/users",
    icon: (
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75"
        />
      </svg>
    ),
  },
  {
    name: "Bottles",
    path: "/bottles",
    icon: (
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v-6a3 3 0 016 0v6m-6 0a3 3 0 006 0m-6 0H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4"
        />
      </svg>
    ),
  },
  {
    name: "Partners",
    path: "/partners",
    icon: (
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75"
        />
      </svg>
    ),
  },
  {
    name: "Bins",
    path: "/bins",
    icon: (
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v-6a3 3 0 016 0v6m-6 0a3 3 0 006 0m-6 0H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4"
        />
      </svg>
    ),
  },
  {
    name: "Rewards",
    path: "/rewards",
    icon: (
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4zm6-4c0-3.31-2.69-6-6-6s-6 2.69-6 6"
        />
      </svg>
    ),
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: (
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 17a2 2 0 104 0 2 2 0 00-4 0zm-7 4a2 2 0 104 0 2 2 0 00-4 0zm14-4a2 2 0 104 0 2 2 0 00-4 0z"
        />
      </svg>
    ),
  },
];

export default function Sidebar() {
  return (
    <aside className="w-44 md:w-48 bg-gradient-to-b from-green-700 to-green-400 text-white shadow h-screen flex flex-col justify-between text-sm">
      <div>
        <div className="flex items-center p-4 font-bold text-lg tracking-tight border-b border-green-800">
          <svg
            className="w-6 h-6 mr-1 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="#22c55e"
            />
            <path
              d="M8 12l2 2 4-4"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          EcoDZ
        </div>
        <nav className="flex-1 p-2 md:p-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-2 py-2 rounded-lg hover:bg-green-600 transition ${
                      isActive
                        ? "bg-green-900 text-white font-semibold"
                        : "text-white/90"
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="p-2 border-t border-green-800 flex items-center">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Admin"
          className="w-8 h-8 rounded-full mr-2 border-2 border-white"
        />
        <div>
          <div className="font-semibold text-xs">Admin</div>
          <div className="text-xs text-white/70">Administrator</div>
        </div>
      </div>
    </aside>
  );
}
