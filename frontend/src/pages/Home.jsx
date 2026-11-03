
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import heroImage from "../assets/buzzify-hero.jpg";

import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Megaphone,
  Camera,
  Zap,
  CircleDot,
  BriefcaseBusiness,
  Clapperboard,
  Palette,
  CalendarDays,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

// Dynamic service icons from MongoDB
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
  camera: Camera,
};

const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13 },
  },
};

export default function Home() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Dynamic services
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState("");

  // Fetch services from MongoDB
  const fetchServices = async () => {
    try {
      setServicesLoading(true);
      setServicesError("");

      const response = await fetch(`${API_URL}/api/service`);

      if (!response.ok) {
        throw new Error("Failed to load services.");
      }

      const data = await response.json();

      if (data.success) {
        setServices(data.services || []);
      } else {
        throw new Error(data.message || "Unable to load services.");
      }
    } catch (error) {
      console.error("Home services error:", error);
      setServicesError(error.message || "Something went wrong.");
    } finally {
      setServicesLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Login-aware meeting navigation
  const handleLetsTalk = () => {
    const token = localStorage.getItem("buzzifyToken");
    navigate(token ? "/meeting" : "/login");
  };

  // Reusable scroll animations
  const animation = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 35 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: {
            duration: 0.8,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        };

  return (
    <main className="overflow-hidden bg-[#171717] text-white">

      {/* =========================================
          HERO SECTION
      ========================================== */}

     
{/* =========================================
    BUZZIFY — CINEMATIC FULLSCREEN HERO
========================================== */}


{/* =========================================
    BUZZIFY — CINEMATIC HERO SECTION
========================================== */}

<section className="group relative isolate flex min-h-[90svh] w-full items-center justify-center overflow-hidden bg-[#171717] sm:min-h-[calc(100svh-80px)]">

  {/* BACKGROUND IMAGE WITH CINEMATIC ZOOM */}
  <motion.div
    initial={shouldReduceMotion ? false : { scale: 1.12 }}
    animate={
      shouldReduceMotion
        ? { scale: 1 }
        : { scale: [1, 1.055, 1] }
    }
    transition={{
      duration: 24,
      repeat: shouldReduceMotion ? 0 : Infinity,
      ease: "easeInOut",
    }}
    className="absolute inset-0 -z-30"
  >
    <img
      src={heroImage}
      alt="Buzzify creative marketing background"
      className="h-full w-full object-cover object-center"
    />
  </motion.div>

  {/* CINEMATIC DARK OVERLAY */}
  <div className="absolute inset-0 -z-20 bg-black/35" />

  <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/45 via-black/35 to-[#171717]/90" />

  <div className="absolute inset-0 -z-20 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

  {/* ANIMATED AMBIENT GOLD LIGHTS */}
  {!shouldReduceMotion && (
    <>
      <motion.div
        animate={{
          x: [0, 35, 0],
          y: [0, -30, 0],
          opacity: [0.12, 0.3, 0.12],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-20 top-[15%] -z-10 h-72 w-72 rounded-full bg-[#D4AF37]/25 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 35, 0],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-20 bottom-[10%] -z-10 h-80 w-80 rounded-full bg-[#D4AF37]/20 blur-[130px]"
      />
    </>
  )}

  {/* OCCASIONAL GOLD LIGHT SWEEP */}
  {!shouldReduceMotion && (
    <motion.div
      animate={{
        x: ["-150%", "250%"],
        opacity: [0, 0.35, 0],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        repeatDelay: 7,
        ease: "easeInOut",
      }}
      className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent blur-3xl"
    />
  )}

  {/* MAIN HERO CONTENT */}
  <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-32 pt-24 text-center sm:px-8 lg:pt-20">

    {/* TOP LABEL */}
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2 }}
      className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/25 bg-black/25 px-5 py-3 backdrop-blur-xl"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-70" />
        <span className="relative h-2 w-2 rounded-full bg-[#D4AF37]" />
      </span>

      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/90 sm:text-xs">
        Creative thinking. Real impact.
      </span>
    </motion.div>

    {/* MAIN HEADING */}
    <motion.h1
      initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.1,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="max-w-5xl text-[clamp(2.5rem,6.2vw,5.5rem)] font-semibold leading-[1.06] tracking-[-0.06em] text-white"
    >
      WE DON'T JUST
      <br />

      MARKET.
      <br />

      <motion.span
        animate={
          shouldReduceMotion
            ? {}
            : {
                textShadow: [
                  "0 0 0px rgba(212,175,55,0)",
                  "0 0 25px rgba(212,175,55,0.4)",
                  "0 0 0px rgba(212,175,55,0)",
                ],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative inline-block text-[#D4AF37]"
      >
        WE CREATE IMPACT.

        {/* ANIMATED GOLD UNDERLINE */}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.2,
            delay: 1.3,
            ease: "easeOut",
          }}
          className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-[#D4AF37]"
        />
      </motion.span>
    </motion.h1>

    {/* DESCRIPTION */}
    <motion.p
      initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.8 }}
      className="mt-9 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8 lg:text-lg"
    >
      We help ambitious brands stand out, build influence
      and create meaningful connections through creative
      marketing that moves people.
    </motion.p>

    {/* ACTION BUTTONS */}
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1 }}
      className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
    >
      <button
        onClick={handleLetsTalk}
        className="group/btn inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold text-[#171717] shadow-[0_10px_40px_rgba(212,175,55,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E8C75B] hover:shadow-[0_12px_45px_rgba(212,175,55,0.35)] sm:w-auto"
      >
        Let's Talk

        <ArrowUpRight
          size={19}
          className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
        />
      </button>

      <Link
        to="/portfolio"
        className="group/btn inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/40 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-white/10 hover:text-[#D4AF37] sm:w-auto"
      >
        Explore Our Work

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      </Link>
    </motion.div>

    {/* BRAND VALUES */}
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.4 }}
      className="mt-16 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/65 sm:text-xs"
    >
      <span>Strategy</span>
      <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
      <span>Creativity</span>
      <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
      <span>Influence</span>
      <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
      <span>Growth</span>
    </motion.div>

  </div>

  {/* SCROLL INDICATOR */}
  <motion.a
    href="#who-we-are"
    initial={shouldReduceMotion ? false : { opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.7 }}
    className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
  >
    <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/60">
      Scroll to explore
    </span>

    <motion.div
      animate={
        shouldReduceMotion
          ? {}
          : { scaleY: [0.3, 1, 0.3] }
      }
      transition={{
        duration: 1.6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="h-9 w-px origin-top bg-[#D4AF37]"
    />
  </motion.a>

</section>




      {/* =========================================
          MOVING BRAND MARQUEE
      ========================================== */}

      <section className="overflow-hidden border-y border-white/10 bg-[#202020] py-7">
        <motion.div
          animate={
            shouldReduceMotion ? {} : { x: ["0%", "-50%"] }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center gap-12 whitespace-nowrap"
        >
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center gap-12">
              {[
                "CREATIVITY",
                "STRATEGY",
                "INFLUENCE",
                "GROWTH",
                "IMPACT",
                "INNOVATION",
              ].map((word) => (
                <div key={word} className="flex items-center gap-12">
                  <span className="text-xl font-bold tracking-[0.18em] text-white/60 sm:text-2xl">
                    {word}
                  </span>

                  <CircleDot
                    size={17}
                    className="text-[#D4AF37]"
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>


      {/* =========================================
          INTRODUCTION SECTION
      ========================================== */}

      <section className="relative px-5 py-28 sm:px-8 lg:px-16 lg:py-36">
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#D4AF37]/5 blur-[130px]" />

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">

          <motion.div {...animation()}>
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              <span className="h-px w-8 bg-[#D4AF37]" />
              Who We Are
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Not another
              <br />
              marketing agency.
              <br />
              <span className="text-[#D4AF37]">
                A different mindset.
              </span>
            </h2>
          </motion.div>

          <motion.div {...animation(0.2)}>
            <p className="text-lg leading-9 text-white/55">
              At Buzzify, we believe great marketing starts with
              understanding people. We combine creative thinking,
              strategic planning and meaningful connections to
              help brands find their voice and stand apart.
            </p>

            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-3 border-b border-[#D4AF37]/50 pb-2 text-sm font-semibold text-[#D4AF37] transition hover:border-[#D4AF37]"
            >
              Discover Buzzify

              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>


      {/* =========================================
          DYNAMIC SERVICES SECTION
          Services fetched from MongoDB
      ========================================== */}

     
<section className="relative overflow-hidden bg-[#191919] px-5 py-28 sm:px-8 lg:px-16 lg:py-36">

  {/* Background lighting */}
  <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[150px]" />
  <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-[150px]" />

  <div className="relative mx-auto max-w-7xl">

    {/* Section heading */}
    <motion.div
      {...animation()}
      className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"
    >
      <div>
        <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
          <span className="h-px w-8 bg-[#D4AF37]" />
          What We Do
        </p>

        <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Ideas into
          <br />
          <span className="text-[#D4AF37]">action.</span>
        </h2>

        <p className="mt-5 max-w-md text-sm leading-7 text-white/45">
          Creative strategies and meaningful connections
          that help brands get noticed and grow.
        </p>
      </div>

      <Link
        to="/service"
        className="group inline-flex items-center gap-3 text-sm font-semibold text-white/70 transition hover:text-[#D4AF37]"
      >
        Explore All Services
        <ArrowUpRight
          size={19}
          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </Link>
    </motion.div>

    {/* Loading state */}
    {servicesLoading && (
      <div className="flex min-h-64 flex-col items-center justify-center gap-5">
        <LoaderCircle
          className="animate-spin text-[#D4AF37]"
          size={38}
        />
        <p className="text-sm uppercase tracking-[0.2em] text-white/40">
          Loading our services...
        </p>
      </div>
    )}

    {/* Error state */}
    {!servicesLoading && servicesError && (
      <div className="rounded-2xl border border-red-500/20 bg-[#242424] px-6 py-12 text-center">
        <p className="text-white/70">{servicesError}</p>

        <button
          onClick={fetchServices}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#171717] transition hover:bg-[#E8C75B]"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    )}

    {/* Empty state */}
    {!servicesLoading &&
      !servicesError &&
      services.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#242424] px-6 py-16 text-center">
          <BriefcaseBusiness
            size={40}
            className="mx-auto mb-5 text-[#D4AF37]"
          />
          <h3 className="text-xl font-semibold">
            Something exciting is coming.
          </h3>
          <p className="mt-3 text-sm text-white/45">
            Our services will appear here soon.
          </p>
        </div>
      )}

    {/* Dynamic service cards */}
    {!servicesLoading &&
      !servicesError &&
      services.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">

          {services.map((service, index) => {
            const Icon =
              iconMap[service.icon?.toLowerCase()] ||
              BriefcaseBusiness;

            return (
              <motion.div
                key={service._id}
                {...animation(index * 0.12)}
                whileHover={shouldReduceMotion ? {} : { y: -10 }}
                className="group relative isolate min-h-85 overflow-hidden rounded-[28px] border border-white/10 bg-[#222222] p-7 transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_70px_rgba(212,175,55,0.09)] sm:p-10"
              >

                {/* Card background glow */}
                <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#D4AF37]/0 blur-[90px] transition-all duration-700 group-hover:bg-[#D4AF37]/15" />

                {/* Oversized background icon */}
                <Icon
                  size={190}
                  strokeWidth={0.7}
                  className="pointer-events-none absolute -bottom-12 -right-8 -z-10 -rotate-12 text-white/2.5 transition-all duration-700 group-hover:rotate-0 group-hover:scale-110 group-hover:text-[#D4AF37]/[0.07]"
                />

                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37]/70">
                    SERVICE / {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.05)] transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#171717] group-hover:shadow-[0_0_35px_rgba(212,175,55,0.25)]">
                    <Icon size={29} strokeWidth={1.6} />
                  </div>
                </div>

                {/* Service content */}
                <div className="relative mt-14">
                  <h3 className="max-w-md text-3xl font-semibold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-[#D4AF37] sm:text-4xl">
                    {service.title}
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/45 transition-colors duration-300 group-hover:text-white/65">
                    {service.description}
                  </p>
                </div>

                {/* Bottom row */}
                <div className="relative mt-9 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 transition-colors group-hover:text-[#D4AF37]/70">
                    Let's create impact
                  </span>

                  <Link
                    to="/service"
                    aria-label={`Explore ${service.title}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#171717]"
                  >
                    <ArrowUpRight
                      size={20}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </Link>
                </div>

                {/* Gold bottom accent */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#D4AF37] transition-all duration-700 group-hover:w-full" />

              </motion.div>
            );
          })}

        </div>
      )}

  </div>
</section>



      {/* =========================================
          VISUAL STATEMENT SECTION
      ========================================== */}

      <section className="relative overflow-hidden px-5 py-32 sm:px-8 lg:px-16 lg:py-44">

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1800&q=85"
            alt="Creative workspace"
            className="h-full w-full object-cover opacity-20"
          />

          <div className="absolute inset-0 bg-[#171717]/85" />

          <div className="absolute inset-0 bg-linear-to-r from-[#171717] via-[#171717]/80 to-[#171717]" />
        </div>

        <motion.div
          {...animation()}
          className="relative mx-auto max-w-7xl text-center"
        >
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
            The Buzzify Philosophy
          </p>

          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl lg:text-8xl">
            ATTENTION IS
            <br />

            <span className="text-[#D4AF37]">
              EARNED.
            </span>

            <br />

            IMPACT IS
            <br />

            <span className="italic text-white/50">
              CREATED.
            </span>
          </h2>

          <p className="mx-auto mt-10 max-w-xl text-base leading-8 text-white/50">
            We don't believe in making noise just for the sake
            of it. We believe in making every idea count.
          </p>

          <motion.div
            animate={
              shouldReduceMotion ? {} : { scale: [1, 1.08, 1] }
            }
            transition={{ duration: 3, repeat: Infinity }}
            className="mx-auto mt-12 flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/50 text-[#D4AF37]"
          >
            <Sparkles size={27} />
          </motion.div>
        </motion.div>
      </section>


      {/* =========================================
          WORK SECTION
      ========================================== */}

      <section className="bg-[#1D1D1D] px-5 py-28 sm:px-8 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">

          <motion.div
            {...animation()}
            className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"
          >
            <div>
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                <span className="h-px w-8 bg-[#D4AF37]" />
                Our Work
              </p>

              <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                Creativity
                <br />
                <span className="text-[#D4AF37]">
                  in motion.
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-white/45">
              Great ideas deserve to be seen. Explore the work,
              creativity and thinking behind the brands we help grow.
            </p>
          </motion.div>


          {/* Visual portfolio teaser */}

          <div className="grid gap-5 md:grid-cols-5">

            <motion.div
              {...animation()}
              whileHover={
                shouldReduceMotion ? {} : { y: -8 }
              }
              className="group relative min-h-100 overflow-hidden rounded-2xl md:col-span-3"
            >
              <img
                src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=85"
                alt="Creative branding and design"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                  Creativity
                </span>

                <h3 className="mt-3 text-3xl font-semibold">
                  Think beyond ordinary.
                </h3>
              </div>
            </motion.div>


            <motion.div
              {...animation(0.15)}
              whileHover={
                shouldReduceMotion ? {} : { y: -8 }
              }
              className="group relative min-h-100 overflow-hidden rounded-2xl md:col-span-2"
            >
              <img
                src="https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=1000&q=85"
                alt="Creative digital marketing workspace"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                  Strategy
                </span>

                <h3 className="mt-3 text-3xl font-semibold">
                  Make every move count.
                </h3>
              </div>
            </motion.div>

          </div>


          <motion.div
            {...animation()}
            className="mt-12 text-center"
          >
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/50 px-8 py-4 text-sm font-semibold text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#171717]"
            >
              Explore Our Work
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>

        </div>
      </section>


      {/* =========================================
          FINAL CTA
      ========================================== */}

      <section className="relative overflow-hidden px-5 py-32 sm:px-8 lg:px-16 lg:py-44">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-size-[70px_70px]" />

        <motion.div
          {...animation()}
          className="relative mx-auto max-w-5xl text-center"
        >
          <div className="mb-9 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            <Sparkles size={15} />
            Your next big move starts here
          </div>

          <h2 className="text-5xl font-semibold leading-[1.08] tracking-tighter sm:text-7xl lg:text-8xl">
            READY TO
            <br />
            MAKE SOME
            <br />

            <span className="text-[#D4AF37]">
              NOISE?
            </span>
          </h2>

          <p className="mx-auto mt-9 max-w-lg text-base leading-8 text-white/50">
            Have an idea? Have a brand? Have a vision?
            Let's turn it into something people remember.
          </p>

          <button
            onClick={handleLetsTalk}
            className="group mt-11 inline-flex items-center gap-4 rounded-full bg-[#D4AF37] px-9 py-5 text-base font-bold text-[#171717] transition-all duration-300 hover:-translate-y-2 hover:bg-[#E8C75B] hover:shadow-[0_15px_60px_rgba(212,175,55,0.25)]"
          >
            Let's Build Something

            <ArrowUpRight
              size={21}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </motion.div>
      </section>

    </main>
  );
}
