
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  FolderKanban,
  CalendarCheck,
  Users,
  ArrowUpRight,
} from "lucide-react";

const sections = [
  {
    title: "Manage Services",
    description: "Add and update Buzzify's marketing services.",
    path: "/admin/services",
    icon: BriefcaseBusiness,
    number: "01",
  },
  {
    title: "Manage Our Work",
    description: "Showcase portfolio entries and client projects.",
    path: "/admin/work",
    icon: FolderKanban,
    number: "02",
  },
  {
    title: "Meeting Requests",
    description: "Review requests and update their status.",
    path: "/admin/meetings",
    icon: CalendarCheck,
    number: "03",
  },
  {
    title: "Client Accounts",
    description: "Review registered client accounts.",
    path: "/admin/clients",
    icon: Users,
    number: "04",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      {/* Page heading */}
      <div className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
          Workspace Overview
        </p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome to the Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
          Manage Buzzify's services, portfolio, meetings, and client accounts
          from one place.
        </p>
      </div>

      {/* Welcome panel */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-linear-to-br from-[#29251A] to-[#202020] p-6 sm:p-8">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex rounded-full border border-[#D4AF37]/30 px-3 py-1 text-xs text-[#D4AF37]">
            ADMIN WORKSPACE
          </span>

          <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">
            Build something remarkable.
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            Keep your services up to date and make it easy for clients to
            discover the work Buzzify delivers.
          </p>

          <Link
            to="/admin/services"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#E5C45B]"
          >
            Manage Services
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border border-[#D4AF37]/10" />
        <div className="pointer-events-none absolute -right-4 -top-8 h-40 w-40 rounded-full border border-[#D4AF37]/10" />
      </div>

      {/* Management cards */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Quick Access</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose a section to get started.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <Link
              key={section.path}
              to={section.path}
              className="group rounded-2xl border border-white/10 bg-[#202020] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-[#242424]"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Icon size={23} />
                </div>

                <span className="text-sm text-gray-600">
                  {section.number}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold transition group-hover:text-[#D4AF37]">
                  {section.title}
                </h3>
                <ArrowUpRight
                  size={19}
                  className="shrink-0 text-gray-500 transition group-hover:text-[#D4AF37]"
                />
              </div>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                {section.description}
              </p>
            </Link>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-gray-600">
        Buzzify Admin · Dashboard preview
      </p>
    </div>
  );
}
