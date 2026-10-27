
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import buzzifyLogo from "../assets/Buzzify Logo.png"

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/service' },
  { name: 'Our Work', path: '/portfolio' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? 'text-[#D4AF37]'
        : 'text-white/70 hover:text-[#D4AF37]'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#171717]/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* Brand logo */}
        <Link to="/" className="shrink-0">
          <img
            src={buzzifyLogo}
            alt="Buzzify - Creative Marketing Agency"
            className="h-14 w-auto object-contain sm:h-16 lg:h-20"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.slice(0, 1).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={linkClass}
            >
              {link.name}
            </NavLink>
          ))}

          <a
            href="/about"
            className="text-white/70 transition-colors hover:text-[#D4AF37]"
          >
            About Us
          </a>

          {navLinks.slice(1).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={linkClass}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          to="/login"
          className="hidden items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#171717] transition hover:bg-[#E6C75A] md:inline-flex"
        >
          Let's Talk <ArrowUpRight size={17} />
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="space-y-5 border-t border-white/10 bg-[#171717] px-6 py-6 md:hidden">
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className={linkClass}
          >
            Home
          </NavLink>

          <a
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="block text-white/70 hover:text-[#D4AF37]"
          >
            About Us
          </a>

          {navLinks.slice(1).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block ${isActive ? 'text-[#D4AF37]' : 'text-white/70'}`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 font-semibold text-[#171717]"
          >
            Let's Talk <ArrowUpRight size={17} />
          </Link>
        </div>
      )}
    </header>
  )
}
