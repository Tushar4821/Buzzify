
import { useEffect, useState } from "react";
import {
  Beer,
  CalendarDays,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send,
  Sparkles,
  Users,
  XCircle,
} from "lucide-react";
import meetingHero from "../assets/meeting.jfif";

const API_URL = "http://localhost:3000/api/meeting";
const SERVICE_URL = "http://localhost:3000/api/service";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  preferredDate: "",
  message: "",
};

export default function Meeting() {
  const [form, setForm] = useState(initialForm);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Get available Buzzify services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(SERVICE_URL);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load services");
        }

        const serviceList =
          data.services ||
          data.data?.services ||
          data.data ||
          [];

        setServices(
          Array.isArray(serviceList)
            ? serviceList.filter((service) => service.isActive !== false)
            : []
        );
      } catch (err) {
        console.error("Service loading error:", err);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const payload = {
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        service: form.service,
        message: form.message.trim(),
        preferredDate: form.preferredDate
          ? new Date(`${form.preferredDate}T12:00:00`).toISOString()
          : undefined,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit your meeting request."
        );
      }

      setSuccess(true);
      setForm(initialForm);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#171717] text-white">
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(212,175,55,0.13),transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-16 lg:grid-cols-2 lg:px-10 lg:pb-24 lg:pt-24">
          {/* Hero content */}
          <div className="relative z-10">
            <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
              <Sparkles size={16} />
              Let's meet
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Beer <span className="text-[#D4AF37]">on Us.</span>
              <br />
              Let's Talk
              <br />
              <span className="text-[#D4AF37]">
                Marketing.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
              Great ideas deserve great conversations. Tell us
              about your brand, your goals, and what you're
              dreaming of building. We'll bring the marketing
              expertise. The first round is on us.
            </p>

            <div className="mt-9 flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <Beer className="text-[#D4AF37]" size={25} />
                <div>
                  <p className="font-semibold">Beer on us</p>
                  <p className="text-xs text-gray-500">
                    Good ideas deserve a toast
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="text-[#D4AF37]" size={25} />
                <div>
                  <p className="font-semibold">Real conversations</p>
                  <p className="text-xs text-gray-500">
                    No boring sales pitches
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#book-meeting"
              className="mt-10 inline-flex items-center gap-3 rounded-xl bg-[#D4AF37] px-7 py-4 font-bold text-black transition hover:-translate-y-1 hover:bg-[#e6c34f]"
            >
              Let's Grab a Beer
              <ArrowRight size={19} />
            </a>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-4xl border border-[#D4AF37]/20 rotate-2" />

            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10">
              <img
                src={meetingHero}
                alt="A creative team meeting over drinks"
                className="h-97.5 w-full object-cover sm:h-125 lg:h-142.5"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Good ideas. Great company.
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Let's make some buzz.
                </h2>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-[#D4AF37]/30 bg-[#242424] p-4 shadow-2xl sm:p-5">
              <Beer className="mb-2 text-[#D4AF37]" size={28} />
              <p className="font-bold">First round's on us.</p>
              <p className="text-xs text-gray-400">
                You bring the ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section
        id="book-meeting"
        className="relative scroll-mt-20 border-y border-white/10 bg-[#1d1d1d] px-5 py-20 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Form introduction */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              Book a meeting
            </p>

            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
              Let's Grab a Beer
              <br />
              <span className="text-[#D4AF37]">
                and Plan Something Great.
              </span>
            </h2>

            <p className="mt-6 max-w-md leading-8 text-gray-400">
              Fill out a few details and tell us what you're
              working on. Our team will get in touch to confirm
              your meeting.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <CalendarDays
                  className="shrink-0 text-[#D4AF37]"
                  size={23}
                />
                <div>
                  <h3 className="font-semibold">
                    Your schedule, your choice
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Tell us your preferred meeting date.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock
                  className="shrink-0 text-[#D4AF37]"
                  size={23}
                />
                <div>
                  <h3 className="font-semibold">
                    Personal follow-up
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    We'll contact you to confirm the details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Beer
                  className="shrink-0 text-[#D4AF37]"
                  size={23}
                />
                <div>
                  <h3 className="font-semibold">
                    A little something on us
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Because the best partnerships start with a
                    good conversation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking form */}
          <div className="rounded-3xl border border-white/10 bg-[#242424] p-5 shadow-2xl sm:p-8">
            {success ? (
              <div className="flex min-h-120 flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                  <CheckCircle2
                    size={43}
                    className="text-green-400"
                  />
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                  Request received
                </p>

                <h3 className="text-3xl font-bold">
                  You're on the list!
                </h3>

                <p className="mt-4 max-w-sm leading-7 text-gray-400">
                  Thanks for reaching out to Buzzify. Your
                  meeting request has been submitted. Our team
                  will contact you to confirm the details.
                </p>

                <div className="mt-8 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-5 py-4 text-sm text-[#D4AF37]">
                  Your request is currently pending confirmation.
                </div>

                <button
                  onClick={() => {
                    setSuccess(false);
                    setError("");
                  }}
                  className="mt-8 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
                >
                  Submit another request
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                    Tell us about yourself
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">
                    Let's make it happen.
                  </h3>
                </div>

                {error && (
                  <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    <XCircle size={19} className="shrink-0" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-gray-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        minLength={2}
                        maxLength={100}
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="meeting-input"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="meeting-input"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-300">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        maxLength={20}
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="meeting-input"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-300">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        maxLength={150}
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className="meeting-input"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-300">
                        Interested Service *
                      </label>
                      <select
                        name="service"
                        required
                        value={form.service}
                        onChange={handleChange}
                        disabled={loadingServices}
                        className="meeting-input"
                      >
                        <option value="">
                          {loadingServices
                            ? "Loading services..."
                            : "Select a service"}
                        </option>

                        {services.map((service) => (
                          <option
                            key={service._id}
                            value={service.title}
                          >
                            {service.title}
                          </option>
                        ))}

                        <option value="General Consultation">
                          General Consultation
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-300">
                        Preferred Meeting Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        min={minDate}
                        value={form.preferredDate}
                        onChange={handleChange}
                        className="meeting-input scheme-dark"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Tell us about your idea *
                    </label>
                    <textarea
                      name="message"
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="What are you building? What challenges are you facing? What would you like Buzzify to help you with?"
                      className="meeting-input resize-none"
                    />
                    <p className="mt-2 text-right text-xs text-gray-500">
                      {form.message.length}/2000
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#D4AF37] px-6 py-4 font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#e6c34f] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Clock size={19} className="animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Request My Meeting
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs leading-6 text-gray-500">
                    Submitting this form sends a meeting request.
                    Our team will contact you to confirm your
                    appointment.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* BOTTOM BENEFITS */}
      <section className="px-5 py-14 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 text-center sm:grid-cols-3">
          <div>
            <Beer className="mx-auto mb-3 text-[#D4AF37]" size={32} />
            <h3 className="font-bold">A Drink on Us</h3>
            <p className="mt-2 text-sm text-gray-500">
              Great ideas deserve a toast.
            </p>
          </div>

          <div>
            <Sparkles
              className="mx-auto mb-3 text-[#D4AF37]"
              size={32}
            />
            <h3 className="font-bold">Expert Insights</h3>
            <p className="mt-2 text-sm text-gray-500">
              Real strategies for your brand.
            </p>
          </div>

          <div>
            <Users
              className="mx-auto mb-3 text-[#D4AF37]"
              size={32}
            />
            <h3 className="font-bold">Let's Grow Together</h3>
            <p className="mt-2 text-sm text-gray-500">
              Your next big idea starts here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
