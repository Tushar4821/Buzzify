import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
    AtSign,
  Megaphone,
  MessageCircle,
  Play,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  Video,
  Zap,
} from 'lucide-react'
import { motion } from 'framer-motion'

const gold = '#D4AF37'

const services = [
  {
    number: '01',
    title: 'Influencer Marketing',
    description:
      'Turn creator partnerships into authentic conversations that bring your brand closer to the right audience.',
    icon: Video,
    tags: ['Creator campaigns', 'Brand collaborations'],
  },
  {
    number: '02',
    title: 'Social Media Marketing',
    description:
      'Build a recognizable digital presence with content that captures attention and keeps people coming back.',
    icon: AtSign,
    tags: ['Content strategy', 'Community growth'],
  },
  {
    number: '03',
    title: 'Network Marketing',
    description:
      'Create meaningful connections, strengthen brand advocacy, and build networks that support sustainable growth.',
    icon: Users,
    tags: ['Brand advocacy', 'Relationship building'],
  },
  {
    number: '04',
    title: 'Performance Marketing',
    description:
      'Make every campaign more intentional with data-driven advertising and a focus on measurable outcomes.',
    icon: BarChart3,
    tags: ['Paid campaigns', 'Performance insights'],
  },
]

const process = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We learn about your brand, your audience, your challenges, and where you want to go.',
  },
  {
    number: '02',
    title: 'Strategize',
    description:
      'We build a marketing direction around your goals instead of following one-size-fits-all trends.',
  },
  {
    number: '03',
    title: 'Execute',
    description:
      'We bring the strategy to life through creative campaigns and thoughtful execution.',
  },
  {
    number: '04',
    title: 'Grow',
    description:
      'We review performance, learn what works, and identify opportunities to improve.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

function SectionLabel({ children }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#D4AF37]">
      <Sparkles size={13} />
      {children}
    </div>
  )
}

function SectionHeading({ eyebrow, title, highlight, description }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65 }}
      className="max-w-3xl"
    >
      <SectionLabel>{eyebrow}</SectionLabel>

      <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        {title}{' '}
        {highlight && <span className="text-[#D4AF37]">{highlight}</span>}
      </h2>

      {description && (
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}

function ServiceCard({ service }) {
  const Icon = service.icon

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -7 }}
      transition={{ duration: 0.25 }}
      className="group flex h-full flex-col rounded-2xl border border-white/8 bg-[#202020] p-6 transition-colors duration-300 hover:border-[#D4AF37]/40 sm:p-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37] transition-colors group-hover:bg-[#D4AF37] group-hover:text-[#171717]">
          <Icon size={23} />
        </div>

        <span className="text-sm tracking-widest text-white/25">
          {service.number}
        </span>
      </div>

      <h3 className="mt-8 text-xl font-semibold">{service.title}</h3>

      <p className="mt-3 flex-1 text-sm leading-7 text-white/50">
        {service.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        to="/services"
        className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] transition-all group-hover:gap-3"
      >
        Explore service <ArrowUpRight size={16} />
      </Link>
    </motion.article>
  )
}

function MeetingScheduler() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    date: '',
    time: '',
    message: '',
  })

  const [notice, setNotice] = useState('')

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    // TODO: Connect this form to POST /api/meetings.
    // Do not show a booking confirmation until the backend responds.
    setNotice(
      'Your form is ready. Meeting requests will be enabled once the backend is connected.'
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div>
        <SectionLabel>Let's talk</SectionLabel>

        <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Good things start with a{' '}
          <span className="text-[#D4AF37]">conversation.</span>
        </h2>

        <p className="mt-6 leading-8 text-white/50">
          Tell us about your brand and what you're looking to achieve.
          Let's explore how we can make your next move count.
        </p>

        <div className="mt-9 space-y-5">
          <div className="flex items-start gap-4">
            <div className="rounded-xl border border-white/10 bg-white/4 p-3 text-[#D4AF37]">
              <CalendarDays size={20} />
            </div>
            <div>
              <p className="font-medium">A conversation, not a commitment</p>
              <p className="mt-1 text-sm leading-6 text-white/45">
                Share your goals and we'll discuss the right next steps.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl border border-white/10 bg-white/4 p-3 text-[#D4AF37]">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="font-medium">Built around your brand</p>
              <p className="mt-1 text-sm leading-6 text-white/45">
                Tell us what you need instead of choosing a fixed package.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5">
          <p className="text-sm leading-7 text-white/65">
            Have a big idea? A small business? A brand ready for its next
            chapter? We'd love to hear about it.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-[#202020] p-6 sm:p-8"
      >
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
            Start a conversation
          </p>
          <h3 className="mt-3 text-2xl font-semibold">
            Tell us about your project.
          </h3>
          <p className="mt-2 text-sm text-white/45">
            Fill in a few details to get started.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm text-white/65">
            Your name *
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              autoComplete="name"
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/60"
            />
          </label>

          <label className="block text-sm text-white/65">
            Work email *
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/60"
            />
          </label>

          <label className="block text-sm text-white/65 sm:col-span-2">
            Company or brand
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Your brand name"
              autoComplete="organization"
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/60"
            />
          </label>

          <label className="block text-sm text-white/65 sm:col-span-2">
            What are you looking for? *
            <div className="relative mt-2">
              <select
                required
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-white/10 bg-[#171717] px-4 py-3.5 text-white outline-none transition focus:border-[#D4AF37]/60"
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="Influencer Marketing">Influencer Marketing</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
                <option value="Network Marketing">Network Marketing</option>
                <option value="Performance Marketing">Performance Marketing</option>
                <option value="Multiple Services">Multiple Services</option>
                <option value="Not Sure Yet">Not Sure Yet</option>
              </select>
              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
              />
            </div>
          </label>

          <label className="block text-sm text-white/65">
            Preferred date
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              min={new Date().toLocaleDateString('en-CA')}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3.5 text-white outline-none transition focus:border-[#D4AF37]/60"
            />
          </label>

          <label className="block text-sm text-white/65">
            Preferred time
            <select
              name="time"
              value={form.time}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3.5 text-white outline-none transition focus:border-[#D4AF37]/60"
            >
              <option value="">Flexible</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </label>

          <label className="block text-sm text-white/65 sm:col-span-2">
            Tell us a little more
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="What's your goal, challenge, or big idea?"
              className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#171717] px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/60"
            />
          </label>
        </div>

        {notice && (
          <p
            role="status"
            className="mt-5 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-3 text-sm leading-6 text-[#E6C75A]"
          >
            {notice}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-4 font-semibold text-[#171717] transition hover:bg-[#E6C75A]"
        >
          Request a meeting <Send size={17} />
        </button>

        <p className="mt-4 text-center text-xs leading-5 text-white/30">
          Submitting this form does not confirm a meeting. The team will
          review requests and confirm them once booking is connected.
        </p>
      </form>
    </div>
  )
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#171717] text-white">
      {/* HERO */}
      <section className="relative">
        <div className="pointer-events-none absolute -right-40 top-0 h-112.5 w-112.5 rounded-full bg-[#D4AF37]/10 blur-[130px]" />
        <div className="pointer-events-none absolute -left-48 bottom-0 h-80 w-80 rounded-full bg-[#D4AF37]/5 blur-[110px]" />

        <div className="mx-auto grid min-h-[85vh] w-full max-w-7xl items-center gap-14 px-5 py-20 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-2 text-sm text-[#D4AF37]">
              <Sparkles size={15} />
              Strategy. Creativity. Growth.
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              Make some noise.
              <br />
              Make it{' '}
              <span className="text-[#D4AF37]">buzz.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/55 sm:text-lg">
              We help ambitious brands get noticed, connect with the right
              people, and turn creative ideas into meaningful growth.
              Your next big thing starts here.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3.5 font-semibold text-[#171717] transition hover:bg-[#E6C75A]"
              >
                Make a buzz with us <ArrowUpRight size={18} />
              </Link>

              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-medium text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                See our work <ArrowRight size={17} />
              </Link>
            </div>

            <a
              href="#services"
              className="mt-12 inline-flex items-center gap-3 text-sm text-white/40 transition hover:text-[#D4AF37]"
            >
              <ArrowDown size={16} />
              Scroll to explore
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute inset-4 rounded-full bg-[#D4AF37]/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#303030] via-[#202020] to-[#171717] p-7 shadow-2xl sm:p-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <span className="text-xs tracking-[0.25em] text-white/45">
                  THE BUZZIFY EFFECT
                </span>
                <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
              </div>

              <div className="relative py-12">
                <div className="absolute right-0 top-8 text-[#D4AF37]/10">
                  <Zap size={150} strokeWidth={0.7} />
                </div>

                <p className="relative text-8xl font-semibold tracking-tighter text-[#D4AF37] sm:text-9xl">
                  B.
                </p>

                <h2 className="relative mt-5 max-w-xs text-3xl font-medium leading-tight">
                  Attention is earned. Impact is created.
                </h2>

                <p className="relative mt-4 leading-7 text-white/45">
                  Creative minds. Clear strategy. Marketing with a purpose.
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-sm text-white/45">
                  Think bigger. Grow smarter.
                </span>
                <ArrowUpRight className="text-[#D4AF37]" />
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#242424] p-4 shadow-xl sm:-left-8">
              <div className="rounded-xl bg-[#D4AF37]/10 p-2.5 text-[#D4AF37]">
                <TrendingUp size={22} />
              </div>
              <div>
                <p className="text-sm font-medium">Growth with purpose</p>
                <p className="mt-1 text-xs text-white/40">
                  Every idea starts somewhere
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="border-y border-white/[0.07] bg-[#1D1D1D] px-5 py-7 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/35">
            One brand. More possibilities.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/65 sm:gap-x-7">
            <span>Influencer</span>
            <span className="text-[#D4AF37]">✳</span>
            <span>Social media</span>
            <span className="text-[#D4AF37]">✳</span>
            <span>Network</span>
            <span className="text-[#D4AF37]">✳</span>
            <span>Performance</span>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 px-5 py-24 md:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What we do"
              title="Your brand deserves"
              highlight="more than ordinary."
              description="From making your name known to turning attention into action, we bring the right marketing disciplines together to move your brand forward."
            />

            <Link
              to="/services"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[#D4AF37] hover:gap-3"
            >
              All services <ArrowUpRight size={17} />
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {services.map((service) => (
              <ServiceCard key={service.number} service={service} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY BUZZIFY */}
      <section className="border-y border-white/[0.07] bg-[#1D1D1D] px-5 py-24 md:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Why Buzzify"
              title="Not just more marketing."
              highlight="More meaning."
              description="We believe the best marketing doesn't just fill a feed. It gives people a reason to notice, remember, and choose your brand."
            />

            <div className="mt-9 space-y-5">
              {[
                'Strategy shaped around your goals',
                'Creative ideas built for your audience',
                'A focus on measurable business outcomes',
                'Learning and improving as campaigns evolve',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-[#D4AF37]"
                  />
                  <p className="text-sm leading-6 text-white/70 sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/services"
              className="mt-9 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 px-6 py-3 text-sm font-medium text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#171717]"
            >
              Discover our approach <ArrowUpRight size={17} />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-full bg-[#D4AF37]/5 blur-3xl" />

            <div className="relative rounded-3xl border border-white/10 bg-[#202020] p-6 sm:p-9">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Our mindset
                </span>
                <Sparkles size={19} className="text-[#D4AF37]" />
              </div>

              <div className="mt-10 space-y-0">
                {[
                  {
                    icon: Megaphone,
                    title: 'Get noticed',
                    text: 'Make your brand worth paying attention to.',
                  },
                  {
                    icon: Users,
                    title: 'Build connection',
                    text: 'Reach people who genuinely matter to your business.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Create momentum',
                    text: 'Turn thoughtful marketing into your next opportunity.',
                  },
                ].map((item, index) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.title}
                      className={`flex gap-5 py-6 ${
                        index !== 2 ? 'border-b border-white/8' : ''
                      }`}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/45">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-5 rounded-2xl bg-[#D4AF37] p-5 text-[#171717]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                  The Buzzify belief
                </p>
                <p className="mt-2 text-xl font-semibold">
                  Make it meaningful. Make it memorable.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-5 py-24 md:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How we work"
            title="Good strategy. Great execution."
            highlight="Real direction."
            description="A straightforward process that starts with understanding your brand and keeps the focus on where you want to go."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {process.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="relative border-t border-white/15 pt-6"
              >
                <span className="text-sm tracking-[0.2em] text-[#D4AF37]">
                  {step.number}
                </span>

                {index < process.length - 1 && (
                  <ArrowRight
                    size={17}
                    className="absolute right-0 top-7 hidden text-white/25 lg:block"
                  />
                )}

                <h3 className="mt-5 text-2xl font-medium">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/45">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PORTFOLIO CTA */}
      <section className="px-5 pb-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#292929] to-[#1D1D1D] p-8 sm:p-12 lg:p-16"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[90px]" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <SectionLabel>Ideas into impact</SectionLabel>
              <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
                Curious what we could create{' '}
                <span className="text-[#D4AF37]">together?</span>
              </h2>
              <p className="mt-5 leading-7 text-white/50">
                Explore our work and imagine what's possible for your brand.
              </p>
            </div>

            <Link
              to="/portfolio"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-4 font-semibold text-[#171717] transition hover:bg-[#E6C75A]"
            >
              Explore our work <ArrowUpRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>

           {/* MEETING CTA */}
      <section
        id="meeting"
        className="relative overflow-hidden border-t border-white/[0.07] bg-[#1D1D1D] px-5 py-24 md:px-8 lg:py-32"
      >
        <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#D4AF37]/5 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-linear-to-br from-[#292929] via-[#202020] to-[#191919] px-6 py-14 text-center sm:px-12 sm:py-20 lg:px-20"
        >
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
            <CalendarDays size={27} />
          </div>

          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#D4AF37]">
            Your next big idea starts here
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Want to make some{' '}
            <span className="text-[#D4AF37]">buzz</span> with us?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
            Let's talk about your brand, explore your ideas, and figure out
            how we can grow together. Your next move could start with one
            conversation.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/meeting"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-4 font-semibold text-[#171717] transition hover:bg-[#E6C75A]"
            >
              Schedule a Meeting
              <ArrowUpRight size={19} />
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-medium text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Explore Our Work
              <ArrowRight size={18} />
            </Link>
          </div>

          <p className="mt-7 text-xs text-white/30">
            Have an idea? We'd love to hear it.
          </p>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-24 text-center md:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
            <Zap size={27} />
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            Your next chapter starts here
          </p>

          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Ready to make some{' '}
            <span className="text-[#D4AF37]">buzz?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-white/50">
            Let's talk about your goals, explore your ideas, and find new
            ways to help your brand stand out.
          </p>

          <a
            href="#meeting"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-4 font-semibold text-[#171717] transition hover:bg-[#E6C75A]"
          >
            Let's talk <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </section>

      
    </main>
  )
}