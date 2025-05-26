import React from "react";
import { useNavigate } from "react-router-dom";
import DataFlowDiagram from "./DataFlowDiagram";
import LiveFeedSection from "./LiveFeedSection";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();
  const signup = () => navigate("/signup");
  const signin = () => navigate("/login");

  const steps = [
    {
      title: "Connect",
      desc: "Grab your key and test /sample in 5 min.",
      icon: "🔑",
    },
    {
      title: "Scale",
      desc: "Metered plans scale per-call and per-feed.",
      icon: "📈",
    },
    {
      title: "Act",
      desc: "Webhooks & WebSockets trigger real-time maneuvers.",
      icon: "🚀",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060818] via-[#091a3c] to-black text-white">
      {/* ---------- HERO ---------- */}
      <section className="pt-36 pb-0 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-6 left-6 z-20 flex items-center space-x-3">
          <img src={`${process.env.PUBLIC_URL}/logos/33.png`} alt="Taurus Logo" className="w-10 h-auto sm:w-20" />
          <span className="text-xl sm:text-2xl font-semibold text-white tracking-wide font-orbitron">
            TAURUS <span className="text-teal-400">SPACE</span>
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Space-grade situational&nbsp;awareness<br />
            <span className="text-teal-400">delivered as an API</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300">
            Stream real-time AI-powered maneuver suggestions, conjunction alerts, and telemetry in minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={signup}
              className="rounded-lg bg-teal-500 hover:bg-teal-400 px-8 py-3 text-lg font-semibold shadow-lg shadow-teal-500/30 focus:outline-none"
            >
              Get your free API key
            </button>
            <button
              onClick={signin}
              className="rounded-lg border border-teal-400 px-8 py-3 text-lg font-semibold hover:bg-teal-400/10"
            >
              Sign&nbsp;in
            </button>
          </div>
        </div>
      </section>

      {/* ---------- SAMPLE FEED ---------- */}
      <LiveFeedSection signup={signup} />

      {/* ---------- DATA FLOW VISUAL ---------- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">End-to-end data pipeline</h2>
          <p className="mt-2 text-slate-400">
            See how satellite telemetry transforms into maneuver recommendations and live data feeds.
          </p>
        </div>
        <div className="w-full h-[320px]">
          <DataFlowDiagram />
        </div>
      </section>

      {/* ---------- PICS OF APP ---------- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Inside the Platform</h2>
          <p className="text-slate-400 mb-10">
            A glimpse into how Taurus Space delivers real-time telemetry and decision support.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-[350px] overflow-hidden rounded-lg shadow-md">
              <img
                src={`${process.env.PUBLIC_URL}/screenshots/dashboard.png`}
                alt="Dashboard"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-[350px] overflow-hidden rounded-lg shadow-md">
              <img
                src={`${process.env.PUBLIC_URL}/screenshots/datafeeds.png`}
                alt="Data Feeds"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center">How it works</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="rounded-2xl bg-[#1c1f2e]/80 p-6 backdrop-blur-md border border-white/10 shadow-lg"
              >
                <div className="text-5xl">{step.icon}</div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-slate-300">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PRICING ---------- */}
{/*      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, usage-based pricing</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {["Starter", "Developer", "Pro", "Enterprise"].map((tier, i) => (
              <div
                key={tier}
                className="rounded-2xl border border-white/10 bg-[#1c1f2e]/80 p-6 flex flex-col"
              >
                <h3 className="text-xl font-semibold">{tier}</h3>
                <p className="mt-2 text-4xl font-extrabold">
                  {["$49", "$129", "$899", "Custom"][i]}
                </p>
                <p className="mt-1 text-slate-400">
                  {["100 calls / mo", "10 k calls / mo", "250 k calls / mo", "Unlimited"][i]}
                </p>
                <button
                  onClick={signup}
                  className="mt-6 rounded-lg bg-teal-500 hover:bg-teal-400 py-2 font-semibold text-white shadow-md shadow-teal-500/30"
                >
                  {["Get started", "Choose plan", "Choose plan", "Contact us"][i]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* ---------- CONTACT FORM ---------- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="mt-2 text-slate-400">
            Want a demo, a conversation, or something else? Drop us a line.
          </p>
        </div>
        <form
          className="space-y-6 bg-[#1a1e2a]/80 backdrop-blur-md p-8 rounded-xl border border-white/10"
          action="https://formspree.io/f/xovjwpka"
          method="POST"
        >
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-slate-300">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-slate-300">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 font-medium text-slate-300">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-teal-500 hover:bg-teal-400 px-6 py-2 font-semibold text-white shadow-md shadow-teal-500/30"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="text-slate-400 border-t border-white/10 mt-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-1">
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/careers" className="hover:text-white">Careers</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h4 className="text-white font-semibold mb-3">Follow Us</h4>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://www.linkedin.com/company/taurusspace/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  {/* LinkedIn SVG icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.7v2.2h.1c.7-1.3 2.4-2.6 5-2.6 5.3 0 6.3 3.5 6.3 8V24h-5v-7c0-1.7 0-4-2.4-4s-2.7 1.9-2.7 3.9V24h-5V8z" />
                  </svg>
                  
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs">
          © {new Date().getFullYear()} Taurus Space. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
