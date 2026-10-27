
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";

const categories = [
  "All Work",
  "Influencer Marketing",
  "Social Media Marketing",
  "Performance Marketing",
  "Network Marketing",
];

// Temporary sample content. Replace with real portfolio data later.
const projects = [
  {
    id: 1,
    title: "Creator Campaign",
    category: "Influencer Marketing",
    description:
      "Connecting brands with creators to build awareness and meaningful audience engagement.",
    number: "01",
    style: "from-amber-900/60 via-[#29231a] to-[#171717]",
  },
  {
    id: 2,
    title: "Social Presence",
    category: "Social Media Marketing",
    description:
      "Building a consistent social identity through creative content and platform strategy.",
    number: "02",
    style: "from-stone-700/60 via-[#252525] to-[#171717]",
  },
  {
    id: 3,
    title: "Growth Campaign",
    category: "Performance Marketing",
    description:
      "A campaign concept focused on reaching relevant audiences and measurable outcomes.",
    number: "03",
    style: "from-yellow-900/50 via-[#29251b] to-[#171717]",
  },
  {
    id: 4,
    title: "Community Connect",
    category: "Network Marketing",
    description:
      "A concept for strengthening connections and creating long-term brand advocacy.",
    number: "04",
    style: "from-neutral-700/60 via-[#252525] to-[#171717]",
  },
];

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("All Work");

  const filteredProjects =
    activeCategory === "All Work"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  return (
    <main className="min-h-screen bg-[#171717] text-white">
      {/* Hero */}
      <section className="px-6 pb-14 pt-28 text-center md:pb-20 md:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]"
        >
          Our Work
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-4xl font-semibold leading-tight md:text-6xl"
        >
          Ideas into{" "}
          <span className="text-[#D4AF37]">impact.</span>
        </motion.h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
          Explore the ideas, strategies, and creative thinking behind
          powerful brand experiences. This portfolio will showcase
          Buzzify's work across marketing channels.
        </p>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 flex gap-3 overflow-x-auto pb-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full border px-5 py-3 text-sm transition ${
                activeCategory === category
                  ? "border-[#D4AF37] bg-[#D4AF37] font-semibold text-black"
                  : "border-white/10 text-gray-400 hover:border-[#D4AF37]/60 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <motion.div
          layout
          className="grid gap-7 md:grid-cols-2"
        >
          {filteredProjects.map((project) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#202020] transition hover:border-[#D4AF37]/40"
            >
              {/* Visual placeholder for future project images */}
              <div
                className={`relative flex aspect-16/10 items-center justify-center overflow-hidden bg-linear-to-br ${project.style}`}
              >
                <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/0" />

                <span className="absolute left-6 top-6 text-sm tracking-[0.2em] text-white/50">
                  BUZZIFY / {project.number}
                </span>

                <BriefcaseBusiness
                  size={64}
                  strokeWidth={1}
                  className="text-[#D4AF37]/70 transition duration-500 group-hover:scale-110 group-hover:text-[#D4AF37]"
                />

                <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 transition group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black">
                  <ArrowUpRight size={20} />
                </span>
              </div>

              <div className="p-6 md:p-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                  {project.category}
                </p>

                <h2 className="text-2xl font-semibold">
                  {project.title}
                </h2>

                <p className="mt-3 max-w-lg leading-7 text-gray-400">
                  {project.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="py-16 text-center text-gray-400">
            No projects in this category yet.
          </p>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#1c1c1c] px-6 py-20 text-center md:py-24">
        <h2 className="mx-auto max-w-3xl text-3xl font-semibold md:text-5xl">
          Have a project in mind?
          <span className="mt-2 block text-[#D4AF37]">
            Let's make it happen.
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-400">
          Let's talk about your brand, your goals, and what's possible.
        </p>

        <a
          href="/#contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 font-semibold text-black transition hover:bg-[#e6c65b]"
        >
          Start a conversation <ArrowUpRight size={18} />
        </a>
      </section>
    </main>
  );
}
