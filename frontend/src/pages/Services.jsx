
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Megaphone,
  TrendingUp,
  Users,
  Target,
  Zap,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

const iconMap = {
  "briefcase-business": BriefcaseBusiness,
  megaphone: Megaphone,
  "trending-up": TrendingUp,
  users: Users,
  target: Target,
  zap: Zap,
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/service`);

      if (!response.ok) {
        throw new Error("Unable to load services. Please try again.");
      }

      const data = await response.json();

      if (data.success) {
        setServices(data.services || []);
      } else {
        throw new Error(data.message || "Failed to fetch services.");
      }
    } catch (err) {
      setError(
        err.message || "Could not connect to the Buzzify server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <main className="min-h-screen bg-[#171717] text-white">
      {/* Hero */}
      <section className="px-6 pb-16 pt-28 text-center md:pb-20 md:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]"
        >
          What we do
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-4xl font-semibold leading-tight md:text-6xl"
        >
          Marketing that moves
          <span className="text-[#D4AF37]"> brands forward.</span>
        </motion.h1>

        <p className="mx-auto mt-6 max-w-2xl leading-7 text-gray-400 md:text-lg">
          From building brand awareness to driving measurable growth,
          we help businesses make their mark in the digital world.
        </p>
      </section>

      {/* Services from MongoDB */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              EXPLORE OUR EXPERTISE
            </p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              Our Services
            </h2>
          </div>

          <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400">
            {services.length} {services.length === 1 ? "service" : "services"}
          </span>
        </div>

        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-gray-400">
            <LoaderCircle className="animate-spin text-[#D4AF37]" size={36} />
            <p>Loading our services...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/20 bg-[#202020] px-6 py-12 text-center">
            <p className="text-gray-300">{error}</p>
            <button
              onClick={fetchServices}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 font-semibold text-black transition hover:bg-[#e6c65b]"
            >
              <RefreshCw size={16} /> Try again
            </button>
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#202020] px-6 py-16 text-center">
            <BriefcaseBusiness
              className="mx-auto mb-5 text-[#D4AF37]"
              size={42}
            />
            <h3 className="text-xl font-semibold">
              Something exciting is coming.
            </h3>
            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-400">
              Our services will appear here as soon as they're added
              to the Buzzify database.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon =
                iconMap[service.icon] || BriefcaseBusiness;

              return (
                <motion.article
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: (index % 3) * 0.1,
                  }}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-[#222222] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:bg-[#262626]"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10">
                    <Icon size={27} className="text-[#D4AF37]" />
                  </div>

                  <h3 className="text-xl font-semibold transition group-hover:text-[#D4AF37]">
                    {service.title}
                  </h3>

                  <p className="mt-3 flex-1 leading-7 text-gray-400">
                    {service.description}
                  </p>

                  {service.features?.length > 0 && (
                    <ul className="mt-6 space-y-3 border-t border-white/10 pt-5">
                      {service.features.map((feature, i) => (
                        <li
                          key={`${service._id}-${i}`}
                          className="flex items-start gap-3 text-sm text-gray-300"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <a
                    href="/#contact"
                    className="mt-7 inline-flex items-center gap-2 self-start font-medium text-[#D4AF37] transition hover:text-white"
                  >
                    Let's discuss <ArrowUpRight size={18} />
                  </a>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#1c1c1c] px-6 py-20 text-center md:py-24">
        <h2 className="mx-auto max-w-3xl text-3xl font-semibold md:text-5xl">
          Ready to grow your
          <span className="text-[#D4AF37]"> brand?</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-400">
          Let's find the right marketing strategy for your business.
        </p>

        <a
          href="/#contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 font-semibold text-black transition hover:bg-[#e6c65b]"
        >
          Get in touch <ArrowUpRight size={18} />
        </a>
      </section>
    </main>
  );
}
