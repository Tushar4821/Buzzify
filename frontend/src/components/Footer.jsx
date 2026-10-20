import { Link } from 'react-router-dom'
import buzzifyLogo from "../assets/Buzzify Logo.png"
import {
  ArrowUpRight,
  AtSign,
  Mail,
  MapPin,
  MoveUpRight,
  Phone,
  Sparkles,
} from 'lucide-react'

const services = [
  'Influencer Marketing',
  'Social Media Marketing',
  'Network Marketing',
  'Performance Marketing',
]

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#141414] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr] lg:gap-10">

          {/* BRAND */}
         <div>
  <Link to="/" className="inline-flex items-center gap-3">
    <img
      src={buzzifyLogo}
      alt="Buzzify Logo"
      className="h-12 w-auto object-contain"
    />

    
  </Link>


            <p className="mt-6 max-w-xs text-sm leading-7 text-white/45">
              We turn bold ideas into meaningful brand experiences.
              Let's make your brand impossible to ignore.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#D4AF37]">
              <Sparkles size={16} />
              Make some noise. Make it buzz.
            </div>

            {/* SOCIAL LINKS */}
            <div className="mt-7 flex gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
              >
                <AtSign size={18} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
              >
                <AtSign size={18} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-white/45">
              <li>
                <Link to="/" className="transition hover:text-[#D4AF37]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition hover:text-[#D4AF37]"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="transition hover:text-[#D4AF37]"
                >
                  Our Work
                </Link>
              </li>
              <li>
                <Link
                  to="/meeting"
                  className="transition hover:text-[#D4AF37]"
                >
                  Schedule a Meeting
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="transition hover:text-[#D4AF37]"
                >
                  Client Login
                </Link>
              </li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">
              What We Do
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-white/45">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="transition hover:text-[#D4AF37]"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT CTA */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">
              Let's Connect
            </h3>

            <p className="mt-6 text-sm leading-7 text-white/45">
              Have a project in mind or looking to grow your brand?
              Let's start a conversation.
            </p>

            <Link
              to="/meeting"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#171717] transition hover:bg-[#E6C75A]"
            >
              Let's Talk
              <ArrowUpRight size={17} />
            </Link>

            <div className="mt-7 space-y-4 text-sm text-white/45">
              <a
                href="mailto:hello@buzzify.com"
                className="flex items-center gap-3 transition hover:text-[#D4AF37]"
              >
                <Mail size={17} className="shrink-0 text-[#D4AF37]" />
                hello@buzzify.com
              </a>

              {/* Add verified business contact details when available. */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-[#D4AF37]"
                />
                <span>Let's connect and discuss your project.</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 border-t border-white/8 pt-7">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-white/35">
              © {new Date().getFullYear()} Buzzify. All rights reserved.
            </p>

            <p className="inline-flex items-center gap-1.5 text-xs text-white/35">
              Built for brands that want to stand out.
              <MoveUpRight size={13} className="text-[#D4AF37]" />
            </p>

            <Link
              to="/meeting"
              className="inline-flex items-center gap-1 text-xs text-white/45 transition hover:text-[#D4AF37]"
            >
              Work with us <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}