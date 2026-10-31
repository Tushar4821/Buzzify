
import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  RefreshCw,
  Search,
  BriefcaseBusiness,
} from "lucide-react";

const API_URL = "http://localhost:3000/api/service";

const emptyForm = {
  title: "",
  description: "",
  icon: "briefcase-business",
  features: "",
};

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all services
  const fetchServices = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch services");
      }

      const serviceList =
        data.services ||
        data.data?.services ||
        data.data ||
        [];

      setServices(Array.isArray(serviceList) ? serviceList : []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Open form for adding a service
  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // Open form for editing a service
  const openEditForm = (service) => {
    setForm({
      title: service.title || "",
      description: service.description || "",
      icon: service.icon || "briefcase-business",
      features: Array.isArray(service.features)
        ? service.features.join(", ")
        : "",
    });

    setEditingId(service._id);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create or update a service
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("buzzifyToken");

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      icon: form.icon.trim() || "briefcase-business",
      features: form.features
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean),
    };

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save service");
      }

      setSuccess(
        editingId
          ? "Service updated successfully!"
          : "Service created successfully!"
      );

      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);

      await fetchServices();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // Delete a service
  const handleDelete = async (service) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${service.title}"?`
    );

    if (!confirmed) return;

    const token = localStorage.getItem("buzzifyToken");

    setDeletingId(service._id);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/${service._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete service");
      }

      setSuccess("Service deleted successfully!");
      await fetchServices();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  // Filter services
  const filteredServices = services.filter((service) =>
    service.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#171717] p-4 text-white sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
            Buzzify Admin
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Manage Services
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Create, update, and manage the services Buzzify offers.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 font-semibold text-black transition hover:bg-[#e6c34f]"
        >
          <Plus size={20} />
          Add New Service
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
          {success}
        </div>
      )}

      {/* Search and count */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#242424] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span>
            Total Services:{" "}
            <span className="font-semibold text-[#D4AF37]">
              {services.length}
            </span>
          </span>

          <button
            onClick={fetchServices}
            disabled={loading}
            title="Refresh services"
            className="rounded-lg border border-white/10 p-2 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>

      {/* Services list */}
      {loading ? (
        <div className="flex min-h-60 items-center justify-center text-gray-400">
          <RefreshCw className="mr-3 animate-spin" size={20} />
          Loading services...
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#242424] px-6 py-16 text-center">
          <BriefcaseBusiness
            size={42}
            className="mx-auto mb-4 text-[#D4AF37]"
          />

          <h2 className="text-xl font-semibold">
            {search ? "No matching services" : "No services yet"}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {search
              ? "Try searching with a different name."
              : "Add your first service to get started."}
          </p>

          {!search && (
            <button
              onClick={openAddForm}
              className="mt-6 rounded-lg bg-[#D4AF37] px-5 py-2.5 font-semibold text-black transition hover:bg-[#e6c34f]"
            >
              Add Service
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className="flex flex-col rounded-2xl border border-white/10 bg-[#242424] p-5 transition hover:border-[#D4AF37]/40"
            >
              {/* Card header */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <BriefcaseBusiness size={23} />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditForm(service)}
                    title="Edit service"
                    className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    onClick={() => handleDelete(service)}
                    disabled={deletingId === service._id}
                    title="Delete service"
                    className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-red-500 hover:text-red-400"
                  >
                    {deletingId === service._id ? (
                      <RefreshCw size={17} className="animate-spin" />
                    ) : (
                      <Trash2 size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Service details */}
              <h2 className="mb-3 text-xl font-semibold">
                {service.title}
              </h2>

              <p className="mb-5 text-sm leading-6 text-gray-400">
                {service.description}
              </p>

              {/* Features */}
              {service.features?.length > 0 && (
                <div className="mt-auto border-t border-white/10 pt-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Features
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-3 py-1 text-xs text-[#D4AF37]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-xl rounded-2xl border border-white/10 bg-[#242424] p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs uppercase tracking-widest text-[#D4AF37]">
                  Service Management
                </p>

                <h2 className="text-2xl font-bold">
                  {editingId ? "Edit Service" : "Add New Service"}
                </h2>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Service Title
                </label>

                <input
                  name="title"
                  type="text"
                  required
                  maxLength={100}
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Influencer Marketing"
                  className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Description
                </label>

                <textarea
                  name="description"
                  required
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe what this service offers..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#171717] px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                />
              </div>

              {/* Icon */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Icon Name
                </label>

                <input
                  name="icon"
                  type="text"
                  value={form.icon}
                  onChange={handleChange}
                  placeholder="briefcase-business"
                  className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Enter a Lucide icon name, such as megaphone or chart-no-axes-combined.
                </p>
              </div>

              {/* Features */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Features
                </label>

                <textarea
                  name="features"
                  rows={3}
                  value={form.features}
                  onChange={handleChange}
                  placeholder="Brand Awareness, Audience Growth, Campaign Strategy"
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#171717] px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Separate each feature with a comma.
                </p>
              </div>

              {/* Form error */}
              {error && (
                <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </p>
              )}

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e6c34f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <RefreshCw size={16} className="animate-spin" />
                  )}

                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Service"
                    : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
