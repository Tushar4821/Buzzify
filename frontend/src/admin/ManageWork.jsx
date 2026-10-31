
import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  RefreshCw,
  Search,
  BriefcaseBusiness,
  ExternalLink,
  Image as ImageIcon,
  Star,
  Eye,
} from "lucide-react";

const API_URL = "http://localhost:3000/api/portfolio";
const SERVICE_URL = "http://localhost:3000/api/service";

const emptyForm = {
  title: "",
  description: "",
  service: "",
  clientName: "",
  coverImage: "",
  projectUrl: "",
  results: "",
  isFeatured: false,
  isPublished: true,
};

export default function ManageWork() {
  const [workItems, setWorkItems] = useState([]);
  const [services, setServices] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch portfolio items
  const fetchWork = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch work");
      }

      const items =
        data.portfolioItems ||
        data.data?.portfolioItems ||
        data.data ||
        [];

      setWorkItems(Array.isArray(items) ? items : []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fetch services for the category dropdown
  const fetchServices = async () => {
    try {
      const response = await fetch(SERVICE_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch services");
      }

      const items =
        data.services ||
        data.data?.services ||
        data.data ||
        [];

      setServices(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    }
  };

  useEffect(() => {
    fetchWork();
    fetchServices();
  }, []);

  // Open create form
  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // Open edit form
  const openEditForm = (item) => {
    setForm({
      title: item.title || "",
      description: item.description || "",
      service:
        typeof item.service === "object"
          ? item.service?._id || ""
          : item.service || "",
      clientName: item.clientName || "",
      coverImage: item.coverImage || "",
      projectUrl: item.projectUrl || "",
      results: Array.isArray(item.results)
        ? item.results.join(", ")
        : "",
      isFeatured: Boolean(item.isFeatured),
      isPublished: item.isPublished !== false,
    });

    setEditingId(item._id);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Create or update work
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("buzzifyToken");

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      service: form.service,
      clientName: form.clientName.trim(),
      coverImage: form.coverImage.trim(),
      projectUrl: form.projectUrl.trim(),
      results: form.results
        .split(",")
        .map((result) => result.trim())
        .filter(Boolean),
      isFeatured: form.isFeatured,
      isPublished: form.isPublished,
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
        throw new Error(data.message || "Failed to save work");
      }

      setSuccess(
        editingId
          ? "Work updated successfully!"
          : "Work created successfully!"
      );

      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);

      await fetchWork();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // Delete work
  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.title}"?`
    );

    if (!confirmed) return;

    const token = localStorage.getItem("buzzifyToken");

    setDeletingId(item._id);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/${item._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete work");
      }

      setSuccess("Work deleted successfully!");
      await fetchWork();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  // Get service name
  const getServiceName = (item) => {
    if (item.service && typeof item.service === "object") {
      return item.service.title || "Uncategorized";
    }

    const service = services.find(
      (service) => service._id === item.service
    );

    return service?.title || "Uncategorized";
  };

  // Filter work
  const filteredWork = workItems.filter((item) => {
    const matchesSearch = [
      item.title,
      item.clientName,
      item.description,
    ]
      .filter(Boolean)
      .some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      );

    const itemServiceId =
      typeof item.service === "object"
        ? item.service?._id
        : item.service;

    const matchesService =
      serviceFilter === "all" ||
      itemServiceId === serviceFilter;

    return matchesSearch && matchesService;
  });

  return (
    <div className="min-h-screen bg-[#171717] p-4 text-white sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
            Buzzify Admin
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Manage Our Work
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Showcase and manage Buzzify's marketing campaigns.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 font-semibold text-black transition hover:bg-[#e6c34f]"
        >
          <Plus size={20} />
          Add New Work
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

      {/* Search and filters */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search projects or clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#242424] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#242424] px-4 py-3 text-sm text-gray-300 outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Services</option>

            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.title}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>
              Total:{" "}
              <span className="font-semibold text-[#D4AF37]">
                {workItems.length}
              </span>
            </span>

            <button
              onClick={() => {
                fetchWork();
                fetchServices();
              }}
              disabled={loading}
              title="Refresh work"
              className="rounded-lg border border-white/10 p-2 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Work list */}
      {loading ? (
        <div className="flex min-h-60 items-center justify-center text-gray-400">
          <RefreshCw className="mr-3 animate-spin" size={20} />
          Loading work...
        </div>
      ) : filteredWork.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#242424] px-6 py-16 text-center">
          <BriefcaseBusiness
            size={42}
            className="mx-auto mb-4 text-[#D4AF37]"
          />

          <h2 className="text-xl font-semibold">
            {search || serviceFilter !== "all"
              ? "No matching work"
              : "No work added yet"}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Add your first campaign or portfolio project.
          </p>

          {!search && serviceFilter === "all" && (
            <button
              onClick={openAddForm}
              className="mt-6 rounded-lg bg-[#D4AF37] px-5 py-2.5 font-semibold text-black transition hover:bg-[#e6c34f]"
            >
              Add Work
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredWork.map((item) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#242424] transition hover:border-[#D4AF37]/40"
            >
              {/* Cover image */}
              <div className="relative h-48 bg-[#1c1c1c]">
                {item.coverImage ? (
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-600">
                    <ImageIcon size={40} />
                  </div>
                )}

                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  {item.isFeatured && (
                    <span className="flex items-center gap-1 rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-semibold text-black">
                      <Star size={12} />
                      Featured
                    </span>
                  )}

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.isPublished
                        ? "bg-green-500/90 text-white"
                        : "bg-gray-700 text-gray-200"
                    }`}
                  >
                    {item.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-3 py-1 text-xs text-[#D4AF37]">
                    {getServiceName(item)}
                  </span>

                  {item.projectUrl && (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="Open project"
                      className="text-gray-500 transition hover:text-[#D4AF37]"
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}
                </div>

                <h2 className="mb-2 text-xl font-semibold">
                  {item.title}
                </h2>

                {item.clientName && (
                  <p className="mb-3 text-xs text-[#D4AF37]">
                    Client: {item.clientName}
                  </p>
                )}

                <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-400">
                  {item.description}
                </p>

                {/* Actions */}
                <div className="flex gap-3 border-t border-white/10 pt-4">
                  <button
                    onClick={() => openEditForm(item)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm text-gray-300 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item)}
                    disabled={deletingId === item._id}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm text-gray-300 transition hover:border-red-500 hover:text-red-400"
                  >
                    {deletingId === item._id ? (
                      <RefreshCw
                        size={16}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={16} />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-[#242424] p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs uppercase tracking-widest text-[#D4AF37]">
                  Portfolio Management
                </p>

                <h2 className="text-2xl font-bold">
                  {editingId ? "Edit Work" : "Add New Work"}
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
                  Project Title
                </label>

                <input
                  name="title"
                  type="text"
                  required
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Instagram Campaign for Brand X"
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
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the campaign or project..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#171717] px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                />
              </div>

              {/* Service and client */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Service Category
                  </label>

                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                  >
                    <option value="">Select a service</option>

                    {services.map((service) => (
                      <option
                        key={service._id}
                        value={service._id}
                      >
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Client Name
                  </label>

                  <input
                    name="clientName"
                    type="text"
                    value={form.clientName}
                    onChange={handleChange}
                    placeholder="e.g. Brand X"
                    className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Cover image */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Cover Image URL
                </label>

                <input
                  name="coverImage"
                  type="url"
                  value={form.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                />

                {form.coverImage && (
                  <img
                    src={form.coverImage}
                    alt="Cover preview"
                    className="mt-3 h-32 w-full rounded-xl object-cover"
                  />
                )}
              </div>

              {/* Project URL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Project URL
                </label>

                <input
                  name="projectUrl"
                  type="url"
                  value={form.projectUrl}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                />
              </div>

              {/* Results */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Campaign Results
                </label>

                <textarea
                  name="results"
                  rows={2}
                  value={form.results}
                  onChange={handleChange}
                  placeholder="2M+ reach, 35% engagement growth, 10K new followers"
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#171717] px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Separate each result with a comma.
                </p>
              </div>

              {/* Visibility controls */}
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#171717] p-4">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={form.isFeatured}
                    onChange={handleChange}
                    className="accent-[#D4AF37]"
                  />

                  <span className="flex items-center gap-2 text-sm text-gray-300">
                    <Star size={16} className="text-[#D4AF37]" />
                    Featured Work
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#171717] p-4">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={form.isPublished}
                    onChange={handleChange}
                    className="accent-[#D4AF37]"
                  />

                  <span className="flex items-center gap-2 text-sm text-gray-300">
                    <Eye size={16} className="text-[#D4AF37]" />
                    Published
                  </span>
                </label>
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
                    <RefreshCw
                      size={16}
                      className="animate-spin"
                    />
                  )}

                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Work"
                    : "Create Work"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
