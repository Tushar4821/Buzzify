
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
  Clapperboard,
  Palette,
  CalendarDays,
  Sparkles,
  Check,
  Play,
} from "lucide-react";

import { Link } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

// Dynamic icon mapping
const iconMap = {
  "briefcase-business": BriefcaseBusiness,
  megaphone: Megaphone,
  "trending-up": TrendingUp,
  users: Users,
  target: Target,
  zap: Zap,
  instagram: CalendarDays,
  "calendar-days": CalendarDays,
  clapperboard: Clapperboard,
  palette: Palette,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
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
    <main className="min-h-screen overflow-hidden bg-[#171717] text-white">

      {/* ================= HERO ================= */}

      <section className="relative px-6 pb-24 pt-36 md:pb-32 md:pt-44">

        {/* Background glow */}

        <div className="pointer-events-none absolute left-1/2 top-0 h-112.5 w-187.5 -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.07] blur-[130px]" />

        <div className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-[#D4AF37]/4 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/6 px-5 py-2.5"
          >
            <Sparkles size={15} className="text-[#D4AF37]" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              What we bring to the table
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.12] tracking-tight sm:text-6xl md:text-8xl"
          >
            We don't just
            <br />

            <span className="bg-linear-to-r from-[#D4AF37] via-[#F6E2A0] to-[#D4AF37] bg-clip-text text-transparent">
              market brands.
            </span>

            <br />

            <span className="text-white">We move them.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-8 max-w-2xl text-base leading-8 text-gray-400 md:text-lg"
          >
            From building powerful brand identities to creating
            content that converts, we turn ambitious ideas into
            brands people notice, remember, and choose.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#our-services"
              className="group inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-7 py-4 font-semibold text-black transition duration-300 hover:-translate-y-1 hover:bg-[#F0CF66]"
            >
              Explore Services
              <ArrowUpRight
                size={19}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <span className="flex items-center gap-2 text-sm text-gray-500">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#D4AF37]" />
              Built for brands that want more.
            </span>
          </motion.div>

        </div>

        {/* Bottom decoration */}

        <div className="absolute bottom-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-linear-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      </section>


      {/* ================= SERVICES ================= */}

      <section
        id="our-services"
        className="relative mx-auto max-w-7xl px-6 py-24 md:py-32"
      >

        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              WHAT WE DO BEST
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Our expertise.
              <span className="text-gray-500"> Your advantage.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-gray-400 md:text-base">
            Everything your brand needs to build a stronger presence
            and create meaningful growth in the digital world.
          </p>

        </div>


        {/* Loading */}

        {loading ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-5">
            <LoaderCircle
              className="animate-spin text-[#D4AF37]"
              size={40}
            />
            <p className="text-sm tracking-widest text-gray-500">
              CREATING SOMETHING GREAT...
            </p>
          </div>

        ) : error ? (

          <div className="rounded-3xl border border-red-500/20 bg-[#202020] px-6 py-16 text-center">
            <p className="text-gray-300">{error}</p>

            <button
              onClick={fetchServices}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 font-semibold text-black transition hover:bg-[#F0CF66]"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>

        ) : services.length === 0 ? (

          <div className="rounded-3xl border border-white/10 bg-[#202020] px-6 py-20 text-center">
            <BriefcaseBusiness
              className="mx-auto mb-5 text-[#D4AF37]"
              size={45}
            />

            <h3 className="text-2xl font-semibold">
              Something exciting is coming.
            </h3>

            <p className="mt-3 text-gray-400">
              Our services will appear here soon.
            </p>
          </div>

        ) : (

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
          >

            {services.map((service, index) => {

              const Icon =
                iconMap[service.icon?.toLowerCase()] ||
                BriefcaseBusiness;

              return (

                <motion.article
                  key={service._id}
                  variants={cardVariants}
                  className="group relative flex flex-col overflow-hidden rounded-[28px] border border-white/8 bg-linear-to-br from-[#292929] via-[#202020] to-[#191919] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_70px_rgba(212,175,55,0.09)] sm:p-9"
                >

                  {/* Background glow */}

                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D4AF37]/4 blur-[80px] transition-all duration-700 group-hover:bg-[#D4AF37]/12" />

                  {/* Card top */}

                  <div className="relative mb-9 flex items-center justify-between">

                    <div className="flex h-16.5 w-16.5 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-linear-to-br from-[#D4AF37]/20 to-[#D4AF37]/3 shadow-[0_0_35px_rgba(212,175,55,0.07)] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">

                      <Icon
                        size={30}
                        strokeWidth={1.6}
                        className="text-[#D4AF37]"
                      />

                    </div>

                    <span className="font-mono text-sm tracking-[0.2em] text-gray-600 transition group-hover:text-[#D4AF37]">
                      0{index + 1}
                    </span>

                  </div>


                  {/* Title */}

                  <div className="relative">

                    <h3 className="text-2xl font-semibold leading-tight tracking-tight transition-colors duration-300 group-hover:text-[#D4AF37] sm:text-3xl">
                      {service.title}
                    </h3>

                    <div className="mt-4 h-0.5 w-12 bg-[#D4AF37]/70 transition-all duration-500 group-hover:w-24" />

                  </div>


                  {/* Description */}

                  <p className="relative mt-6 flex-1 text-sm leading-8 text-gray-400 sm:text-base">
                    {service.description}
                  </p>


                  {/* Features */}

                  {service.features?.length > 0 && (

                    <div className="relative mt-8 border-t border-white/8 pt-7">

                      <div className="mb-5 flex items-center gap-2">
                        <Sparkles
                          size={15}
                          className="text-[#D4AF37]"
                        />

                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                          What you get
                        </p>
                      </div>

                      <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">

                        {service.features.map((feature, i) => (

                          <div
                            key={`${service._id}-${i}`}
                            className="flex items-start gap-3 text-sm text-gray-300 transition-colors duration-300 hover:text-white"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10">
                              <Check
                                size={12}
                                className="text-[#D4AF37]"
                              />
                            </span>

                            <span className="leading-6">
                              {feature}
                            </span>
                          </div>

                        ))}

                      </div>

                    </div>

                  )}


                  {/* Card footer */}

                  <div className="relative mt-9 flex items-center justify-between border-t border-white/8 pt-6">

                    <Link
                      to="/meeting"
                      className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] transition hover:text-white"
                    >
                      Let's discuss

                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                      />
                    </Link>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
                      BUZZIFY
                    </span>

                  </div>


                </motion.article>

              );

            })}

          </motion.div>

        )}

      </section>


      {/* ================= BRAND STATEMENT ================= */}

      <section className="relative overflow-hidden border-y border-white/6 bg-[#1D1D1D] px-6 py-24 md:py-32">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <Sparkles
              size={30}
              className="mx-auto mb-8 text-[#D4AF37]"
            />

            <p className="mb-6 text-xs font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
              MORE THAN JUST MARKETING
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Your vision.
              <span className="text-[#D4AF37]"> Our creativity.</span>

              <br />

              One powerful brand.
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-gray-400">
              We believe great brands aren't built by doing more.
              They're built by doing the right things, with the
              right strategy, and a team that cares about the result.
            </p>

          </motion.div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="relative overflow-hidden px-6 py-28 md:py-36">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/[0.07] blur-[140px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-4xl text-center"
        >

          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/6 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            <Zap size={14} />
            Let's make it happen
          </span>

          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-7xl">
            Your next big move
            <br />

            <span className="bg-linear-to-r from-[#D4AF37] via-[#F5E2A2] to-[#D4AF37] bg-clip-text text-transparent">
              starts here.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-gray-400 md:text-lg">
            Have an idea, a business, or a brand ready to grow?
            Let's talk about what we can build together.
          </p>

          <Link
            to="/meeting"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-9 py-4 font-bold text-black shadow-[0_0_40px_rgba(212,175,55,0.12)] transition duration-300 hover:-translate-y-1 hover:bg-[#F0CF66] hover:shadow-[0_0_55px_rgba(212,175,55,0.25)]"
          >
            Book a Meeting

            <ArrowUpRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>

        </motion.div>

      </section>

    </main>
  );
}
