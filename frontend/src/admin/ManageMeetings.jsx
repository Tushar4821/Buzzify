
import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  CalendarDays,
  Clock,
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
  X,
  Beer,
  Filter,
  ChevronDown,
} from "lucide-react";

const API_URL = "http://localhost:3000/api/meeting";

const statuses = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

export default function ManageMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all meetings
  const fetchMeetings = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("buzzifyToken");

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch meetings"
        );
      }

      const meetingList =
        data.meetings ||
        data.data?.meetings ||
        [];

      setMeetings(
        Array.isArray(meetingList) ? meetingList : []
      );
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  // Format date
  const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Invalid date";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format date and time
  const formatDateTime = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Status badge
  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      completed: "bg-green-500/10 text-green-400 border-green-500/20",
      cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
    };

    return styles[status] || styles.pending;
  };

  // Update meeting status
  const updateStatus = async (meetingId, status) => {
    const token = localStorage.getItem("buzzifyToken");

    setUpdatingId(meetingId);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/${meetingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update meeting status"
        );
      }

      setMeetings((prev) =>
        prev.map((meeting) =>
          meeting._id === meetingId
            ? { ...meeting, ...data.meeting }
            : meeting
        )
      );

      if (selectedMeeting?._id === meetingId) {
        setSelectedMeeting((prev) => ({
          ...prev,
          ...data.meeting,
        }));
      }

      setSuccess(`Meeting marked as ${status}.`);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete meeting
  const deleteMeeting = async (meeting) => {
    const confirmed = window.confirm(
      `Delete the meeting request from ${meeting.name}? This cannot be undone.`
    );

    if (!confirmed) return;

    const token = localStorage.getItem("buzzifyToken");

    setDeletingId(meeting._id);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/${meeting._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete meeting"
        );
      }

      setMeetings((prev) =>
        prev.filter((item) => item._id !== meeting._id)
      );

      if (selectedMeeting?._id === meeting._id) {
        setSelectedMeeting(null);
      }

      setSuccess("Meeting request deleted successfully.");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  // Open meeting details
  const openMeetingDetails = async (meeting) => {
    setSelectedMeeting(meeting);
    setError("");

    try {
      const token = localStorage.getItem("buzzifyToken");

      const response = await fetch(
        `${API_URL}/${meeting._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch meeting details"
        );
      }

      if (data.meeting) {
        setSelectedMeeting(data.meeting);
      }
    } catch (err) {
      setError(err.message || "Failed to load meeting details");
    }
  };

  // Search and filter
  const filteredMeetings = meetings.filter((meeting) => {
    const searchText = search.toLowerCase();

    const matchesSearch = [
      meeting.name,
      meeting.email,
      meeting.company,
      meeting.service,
    ]
      .filter(Boolean)
      .some((value) =>
        String(value).toLowerCase().includes(searchText)
      );

    const matchesStatus =
      statusFilter === "all" ||
      meeting.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Dashboard counts
  const counts = {
    total: meetings.length,
    pending: meetings.filter(
      (meeting) => meeting.status === "pending"
    ).length,
    confirmed: meetings.filter(
      (meeting) => meeting.status === "confirmed"
    ).length,
    completed: meetings.filter(
      (meeting) => meeting.status === "completed"
    ).length,
    cancelled: meetings.filter(
      (meeting) => meeting.status === "cancelled"
    ).length,
  };

  // Status actions
  const getNextActions = (status) => {
    if (status === "pending") {
      return [
        { label: "Confirm", value: "confirmed" },
        { label: "Cancel", value: "cancelled" },
      ];
    }

    if (status === "confirmed") {
      return [
        { label: "Complete", value: "completed" },
        { label: "Cancel", value: "cancelled" },
      ];
    }

    return [];
  };

  return (
    <div className="min-h-screen bg-[#171717] p-4 text-white sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
            Buzzify Admin
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Manage Meetings
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage client meeting requests and appointments.
          </p>
        </div>

        <button
          onClick={fetchMeetings}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#242424] px-5 py-3 text-sm font-semibold transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
        >
          <RefreshCw
            size={18}
            className={loading ? "animate-spin" : ""}
          />
          Refresh Requests
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          <span>{error}</span>
          <button onClick={() => setError("")}>
            <X size={17} />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
          <span>{success}</span>
          <button onClick={() => setSuccess("")}>
            <X size={17} />
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-5">
        {[
          {
            label: "Total Requests",
            value: counts.total,
            color: "text-white",
          },
          {
            label: "Pending",
            value: counts.pending,
            color: "text-yellow-400",
          },
          {
            label: "Confirmed",
            value: counts.confirmed,
            color: "text-blue-400",
          },
          {
            label: "Completed",
            value: counts.completed,
            color: "text-green-400",
          },
          {
            label: "Cancelled",
            value: counts.cancelled,
            color: "text-red-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-[#242424] p-5"
          >
            <p className="text-xs text-gray-500 sm:text-sm">
              {stat.label}
            </p>

            <p
              className={`mt-3 text-3xl font-bold ${stat.color}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search and filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, company or service..."
            className="w-full rounded-xl border border-white/10 bg-[#242424] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#D4AF37]"
          />
        </div>

        <div className="relative sm:w-56">
          <Filter
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none rounded-xl border border-white/10 bg-[#242424] py-3 pl-11 pr-10 text-sm text-gray-300 outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Statuses</option>

            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() +
                  status.slice(1)}
              </option>
            ))}
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* Meeting requests */}
      {loading ? (
        <div className="flex min-h-64 items-center justify-center text-gray-400">
          <RefreshCw
            size={20}
            className="mr-3 animate-spin"
          />
          Loading meeting requests...
        </div>
      ) : filteredMeetings.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#242424] px-6 py-16 text-center">
          <Beer
            size={42}
            className="mx-auto mb-4 text-[#D4AF37]"
          />

          <h2 className="text-xl font-semibold">
            No meeting requests found
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {meetings.length === 0
              ? "New client requests will appear here."
              : "Try changing your search or status filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting._id}
              className="rounded-2xl border border-white/10 bg-[#242424] p-5 transition hover:border-[#D4AF37]/30 sm:p-6"
            >
              <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
                {/* Client information */}
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold">
                      {meeting.name}
                    </h2>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                        meeting.status
                      )}`}
                    >
                      {meeting.status}
                    </span>
                  </div>

                  <div className="grid gap-3 text-sm text-gray-400 sm:grid-cols-2 xl:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <Mail
                        size={16}
                        className="shrink-0 text-[#D4AF37]"
                      />
                      <span className="break-all">
                        {meeting.email}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone
                        size={16}
                        className="shrink-0 text-[#D4AF37]"
                      />
                      {meeting.phone || "No phone provided"}
                    </div>

                    <div className="flex items-center gap-2">
                      <Building2
                        size={16}
                        className="shrink-0 text-[#D4AF37]"
                      />
                      {meeting.company || "No company provided"}
                    </div>

                    <div className="flex items-center gap-2">
                      <BriefcaseBusinessIcon />
                      {meeting.service}
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={16}
                        className="shrink-0 text-[#D4AF37]"
                      />
                      {formatDate(meeting.preferredDate)}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock
                        size={16}
                        className="shrink-0 text-[#D4AF37]"
                      />
                      Requested: {formatDate(meeting.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                  <button
                    onClick={() => openMeetingDetails(meeting)}
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-sm text-gray-300 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <Eye size={16} />
                    Details
                  </button>

                  {getNextActions(meeting.status).map(
                    (action) => (
                      <button
                        key={action.value}
                        disabled={updatingId === meeting._id}
                        onClick={() =>
                          updateStatus(
                            meeting._id,
                            action.value
                          )
                        }
                        className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${
                          action.value === "confirmed"
                            ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                            : action.value === "completed"
                            ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                            : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        }`}
                      >
                        {updatingId === meeting._id ? (
                          <RefreshCw
                            size={15}
                            className="animate-spin"
                          />
                        ) : action.value === "confirmed" ? (
                          <CheckCircle2 size={15} />
                        ) : action.value === "completed" ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          <XCircle size={15} />
                        )}

                        {action.label}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => deleteMeeting(meeting)}
                    disabled={deletingId === meeting._id}
                    title="Delete meeting"
                    className="rounded-lg border border-white/10 p-2.5 text-gray-400 transition hover:border-red-500 hover:text-red-400 disabled:opacity-50"
                  >
                    {deletingId === meeting._id ? (
                      <RefreshCw
                        size={16}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Meeting details modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-[#242424] p-5 shadow-2xl sm:p-7">
            <div className="mb-7 flex items-start justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Meeting Details
                </p>

                <h2 className="text-2xl font-bold">
                  {selectedMeeting.name}
                </h2>

                <span
                  className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                    selectedMeeting.status
                  )}`}
                >
                  {selectedMeeting.status}
                </span>
              </div>

              <button
                onClick={() => setSelectedMeeting(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: selectedMeeting.email,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: selectedMeeting.phone || "Not provided",
                },
                {
                  icon: Building2,
                  label: "Company",
                  value: selectedMeeting.company || "Not provided",
                },
                {
                  icon: BriefcaseBusinessIcon,
                  label: "Interested Service",
                  value: selectedMeeting.service,
                },
                {
                  icon: CalendarDays,
                  label: "Preferred Date",
                  value: formatDate(selectedMeeting.preferredDate),
                },
                {
                  icon: Clock,
                  label: "Submitted On",
                  value: formatDateTime(selectedMeeting.createdAt),
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-[#171717] p-4"
                  >
                    <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                      <Icon
                        size={15}
                        className="text-[#D4AF37]"
                      />
                      {item.label}
                    </div>

                    <p className="wrap-break-word text-sm font-medium text-gray-200">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-[#171717] p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <MessageSquare
                  size={17}
                  className="text-[#D4AF37]"
                />
                Client Message
              </div>

              <p className="whitespace-pre-wrap text-sm leading-7 text-gray-400">
                {selectedMeeting.message}
              </p>
            </div>

            {getNextActions(selectedMeeting.status).length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {getNextActions(selectedMeeting.status).map(
                  (action) => (
                    <button
                      key={action.value}
                      disabled={
                        updatingId === selectedMeeting._id
                      }
                      onClick={() =>
                        updateStatus(
                          selectedMeeting._id,
                          action.value
                        )
                      }
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition disabled:opacity-50 ${
                        action.value === "confirmed"
                          ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                          : action.value === "completed"
                          ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                          : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      }`}
                    >
                      {action.label}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Small icon component for the service information
function BriefcaseBusinessIcon() {
  return (
    <Beer
      size={16}
      className="shrink-0 text-[#D4AF37]"
    />
  );
}
