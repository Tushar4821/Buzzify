
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FolderKanban,
  CalendarCheck,
  Users,
  ArrowLeft,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { name: "Services", path: "/admin/services", icon: BriefcaseBusiness },
  { name: "Our Work", path: "/admin/work", icon: FolderKanban },
  { name: "Meetings", path: "/admin/meetings", icon: CalendarCheck },
  { name: "Clients", path: "/admin/clients", icon: Users },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // We will connect this to your actual JWT storage key next.
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      {/* Mobile header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#171717] px-5 py-4 lg:hidden">
        <span className="text-xl font-bold tracking-widest text-[#D4AF37]">
          BUZZIFY
        </span>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-white hover:bg-white/10"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/10 bg-[#1D1D1D] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-white/10 px-6 py-7">
          <h1 className="text-2xl font-bold tracking-[0.2em] text-[#D4AF37]">
            BUZZIFY
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-gray-500">
            Admin Control Center
          </p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Workspace
          </p>

          {navItems.map(({ name, path, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {name}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-2 border-t border-white/10 p-4">
          <button
            onClick={() => navigate("/")}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft size={18} />
            View Website
          </button>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 lg:ml-64">
        <div className="mx-auto max-w-7xl p-5 sm:p-8 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
