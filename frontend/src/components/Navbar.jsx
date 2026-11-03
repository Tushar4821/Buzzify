
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ArrowUpRight,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import buzzifyLogo from "../assets/Buzzify Logo.png";

const navLinks = [
  { name: "Home", path: "/", end: true },
  { name: "Services", path: "/service" },
  { name: "Our Work", path: "/portfolio" },
  { name: "About Us", path: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  // Check login and admin status
  useEffect(() => {
    const updateAuth = () => {
      const token = localStorage.getItem("buzzifyToken");

      let admin = false;

      try {
        const user = JSON.parse(
          localStorage.getItem("buzzifyUser")
        );

        admin = user?.role === "admin";
      } catch {
        admin = false;
      }

      setIsLoggedIn(Boolean(token));
      setIsAdmin(Boolean(token) && admin);
    };

    updateAuth();

    window.addEventListener("storage", updateAuth);
    window.addEventListener("buzzify-auth-change", updateAuth);

    return () => {
      window.removeEventListener("storage", updateAuth);
      window.removeEventListener("buzzify-auth-change", updateAuth);
    };
  }, []);

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-[#D4AF37]"
        : "text-white/70 hover:text-[#D4AF37]"
    }`;

  // Let's Talk navigation
  const handleLetsTalk = () => {
    setMenuOpen(false);

    if (isLoggedIn) {
      navigate("/meeting");
    } else {
      navigate("/login");
    }
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("buzzifyToken");
    localStorage.removeItem("buzzifyUser");

    setIsLoggedIn(false);
    setIsAdmin(false);
    setMenuOpen(false);

    window.dispatchEvent(new Event("buzzify-auth-change"));

    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#171717]/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* BRAND LOGO */}
        <Link to="/" className="shrink-0">
          <img
            src={buzzifyLogo}
            alt="Buzzify - Creative Marketing Agency"
            className="h-14 w-auto object-contain sm:h-16 lg:h-20"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={linkClass}
            >
              {link.name}
            </NavLink>
          ))}

          {/* ADMIN DASHBOARD - Only for admins */}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={linkClass}
            >
              Admin Dashboard
            </NavLink>
          )}
        </div>

        {/* DESKTOP ACTION BUTTONS */}
        <div className="hidden items-center gap-3 md:flex">

          {/* LOGOUT */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-red-400/50 hover:text-red-400"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}

          {/* LET'S TALK */}
          <button
            onClick={handleLetsTalk}
            className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#171717] transition hover:bg-[#E6C75A]"
          >
            Let's Talk
            <ArrowUpRight size={17} />
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <div className="space-y-6 border-t border-white/10 bg-[#171717] px-6 py-6 md:hidden">

          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block transition-colors ${
                  isActive
                    ? "text-[#D4AF37]"
                    : "text-white/70 hover:text-[#D4AF37]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* MOBILE ADMIN DASHBOARD */}
          {isAdmin && (
            <NavLink
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 transition-colors ${
                  isActive
                    ? "text-[#D4AF37]"
                    : "text-[#D4AF37] hover:text-white"
                }`
              }
            >
              <LayoutDashboard size={18} />
              Admin Dashboard
            </NavLink>
          )}

          {/* MOBILE LET'S TALK */}
          <button
            onClick={handleLetsTalk}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 font-semibold text-[#171717]"
          >
            Let's Talk
            <ArrowUpRight size={17} />
          </button>

          {/* MOBILE LOGOUT */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 font-medium text-white transition hover:border-red-400 hover:text-red-400"
            >
              <LogOut size={17} />
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
