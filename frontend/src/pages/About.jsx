import { motion } from "framer-motion";
import { ArrowUpRight, Target, Zap, Users } from "lucide-react";
import krishFounder from "../assets/krishFounder.jpeg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Strategy First",
      description:
        "Every great campaign starts with a clear strategy built around your brand's goals.",
    },
    {
      icon: Zap,
      title: "Creative Growth",
      description:
        "We combine creativity, digital trends, and performance-driven thinking to help brands grow.",
    },
    {
      icon: Users,
      title: "Real Partnerships",
      description:
        "We believe in building long-term relationships and creating value beyond campaigns.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      {/* Hero */}
      <section className="px-6 pt-24 pb-16 text-center md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]"
        >
          Get to know us
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-4xl font-semibold leading-tight md:text-6xl"
        >
          We turn bold ideas into{" "}
          <span className="text-[#D4AF37]">brand growth.</span>
        </motion.h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
          Buzzify is a modern marketing agency helping brands stand out,
          connect with the right audience, and grow in the digital world.
        </p>
      </section>

      {/* Founder */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-3 rounded-3xl border border-[#D4AF37]/30" />

          <img
  src={krishFounder}
  alt="Krish, founder of Buzzify"
  className="relative h-105 w-full rounded-2xl object-cover object-center md:h-130"
/>

          <div className="absolute bottom-5 left-5 rounded-xl border border-white/10 bg-black/70 px-5 py-3 backdrop-blur-md">
            <p className="text-sm text-gray-300">Founder of Buzzify</p>
            <p className="text-lg font-semibold text-[#D4AF37]">Krish</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
            Meet the founder
          </p>

          <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
            Hi, I'm Krish.
            <span className="mt-2 block text-[#D4AF37]">
              The mind behind Buzzify.
            </span>
          </h2>

          <div className="mt-6 space-y-4 leading-7 text-gray-400">
            <p>
              I founded Buzzify with a simple vision: to help brands unlock
              their potential through smarter marketing, meaningful
              connections, and creative ideas.
            </p>

            <p>
              From influencer and social media marketing to performance
              campaigns and network marketing, our goal is to help businesses
              reach the right people and turn attention into growth.
            </p>

            <p>
              For me, Buzzify is more than a marketing agency. It's about
              building partnerships, challenging the ordinary, and helping
              ambitious brands move forward.
            </p>
          </div>

          <a
            href="/#contact"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-7 py-3.5 font-semibold text-black transition hover:bg-[#e6c65b]"
          >
            Let's work together <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </section>

      {/* Values */}
      <section className="border-t border-white/10 bg-[#1c1c1c] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              What drives us
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Built on purpose. Driven by growth.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="rounded-2xl border border-white/10 bg-[#242424] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50"
                >
                  <Icon className="mb-5 text-[#D4AF37]" size={30} />

                  <h3 className="mb-3 text-xl font-semibold">
                    {value.title}
                  </h3>

                  <p className="leading-7 text-gray-400">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-20 text-center md:py-24">
        <h2 className="mx-auto max-w-3xl text-3xl font-semibold md:text-5xl">
          Your next big move starts with{" "}
          <span className="text-[#D4AF37]">the right team.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-gray-400">
          Have a vision for your brand? Let's turn it into something
          extraordinary.
        </p>

        <a
          href="/#contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D4AF37] px-7 py-3.5 font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
        >
          Start a conversation <ArrowUpRight size={18} />
        </a>
      </section>
    </div>
  );
};

export default About;