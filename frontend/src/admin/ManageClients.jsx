
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  RefreshCw,
  UserRound,
  Mail,
  CalendarDays,
} from "lucide-react";

const API_URL = "http://localhost:3000/api";

export default function ManageClients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("buzzifyToken");

      const response = await fetch(`${API_URL}/users/admin/clients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch clients");
      }

      setClients(data.clients || data.users || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const name = client.name || "";
      const email = client.email || "";

      return `${name} ${email}`
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [clients, search]);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8 text-white">
      {/* Heading */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
          Client Management
        </p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Registered Clients
        </h1>

        <p className="mt-3 text-sm text-gray-400">
          View and manage the people who have registered with Buzzify.
        </p>
      </div>

      {/* Stats */}
      <div className="rounded-2xl border border-white/10 bg-[#202020] p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
            <Users size={23} />
          </div>

          <div>
            <p className="text-sm text-gray-400">Total Clients</p>
            <h2 className="mt-1 text-3xl font-semibold">
              {clients.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Search and refresh */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search clients by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#202020] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#D4AF37]/50"
          />
        </div>

        <button
          onClick={fetchClients}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#202020] px-5 py-3 text-sm font-medium transition hover:border-[#D4AF37]/40 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Client table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#202020]">
        <div className="border-b border-white/10 px-6 py-5">
          <h2 className="font-semibold">Client Accounts</h2>
          <p className="mt-1 text-sm text-gray-500">
            {filteredClients.length} accounts found
          </p>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-gray-400">
            Loading client accounts...
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-sm text-red-400">{error}</p>

            <button
              onClick={fetchClients}
              className="mt-4 text-sm text-[#D4AF37] hover:underline"
            >
              Try again
            </button>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="p-12 text-center">
            <Users
              size={32}
              className="mx-auto mb-3 text-gray-600"
            />

            <p className="text-sm text-gray-400">
              {search
                ? "No clients match your search."
                : "No registered clients found."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-162.5 text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Joined</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.map((client) => (
                  <tr
                    key={client._id}
                    className="border-b border-white/5 transition hover:bg-white/2"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]">
                          <UserRound size={18} />
                        </div>

                        <div>
                          <p className="text-sm font-medium">
                            {client.name || "Unnamed Client"}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            Client Account
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Mail size={15} />
                        {client.email}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <CalendarDays size={15} />
                        {formatDate(client.createdAt)}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          client.isActive !== false
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {client.isActive !== false
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
