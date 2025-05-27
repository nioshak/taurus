import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataFlowDiagram from "./DataFlowDiagram";
import LiveFeedSection from "./LiveFeedSection";
import { motion, AnimatePresence } from "framer-motion";

// Toggle this to false to go live!
const COMING_SOON_MODE = true;

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false);

  // React Router navigation for live site
  const navigate = useNavigate();
  const signup = () => navigate("/signup");
  const signin = () => navigate("/login");

  // "Coming Soon" modal logic
  const handleComingSoon = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const steps = [
    { title: "Connect", desc: "Grab your key and test /sample in 5 min.", icon: "🛰️" },
    { title: "Scale", desc: "Metered plans scale per-call and per-feed.", icon: "📈" },
    { title: "Act", desc: "Webhooks & WebSockets trigger real-time maneuvers.", icon: "⚡" },
  ];

  // Universal handler for all buttons
  const signupHandler = COMING_SOON_MODE ? handleComingSoon : signup;
  const signinHandler = COMING_SOON_MODE ? handleComingSoon : signin;
  const pricingHandler = COMING_SOON_MODE ? handleComingSoon : signup;

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080d1c] via-[#142137] to-[#000212] text-white relative overflow-x-hidden">
      {/* ---- GLOBAL SMOOTH SCROLLING ---- */}
      <style>{`
        html, body, #root {
          scroll-behavior: smooth !important;
          -webkit-overflow-scrolling: touch !important;  /* iOS momentum scroll */
        }
        /* Extra smooth on all sections */
        section, .glassy-box, .glassmorphism {
          scroll-behavior: smooth !important;
        }
        /* Mobile/safari hardware-accelerated smooth */
        ::-webkit-scrollbar {
          width: 10px;
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(32,41,68,0.1);
          border-radius: 6px;
        }
      `}</style>
      {/* 
        To set the browser tab/title, edit public/index.html:
        <title>Taurus Space</title>
      */}

      {/* FULLSCREEN "COMING SOON" MODAL */}
      <AnimatePresence>
        {COMING_SOON_MODE && showModal && (
          // FULLSCREEN OVERLAY - covers entire viewport and centers the modal
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[99] bg-black/90 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* MODAL CONTENT */}
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="relative rounded-2xl bg-gradient-to-br from-[#14192b] via-[#1c2341] to-[#13151d] border border-teal-400/40 shadow-2xl px-10 py-12 max-w-md w-full text-center flex flex-col items-center"
            >
              {/* CLOSE ICON - top right inside modal */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-7 text-slate-400 hover:text-teal-400 text-3xl font-bold focus:outline-none"
                aria-label="Close"
                style={{ background: "none", border: "none" }}
              >
                ×
              </button>

              <div className="mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-[#0e1324]/80 shadow-lg border border-teal-500/40">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="#14b8a6" strokeWidth="2.5" fill="#1c2341" />
                  <path d="M14 24h20M24 14v20" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                Coming Soon
              </h2>
              <p className="mb-6 text-slate-300 text-lg">
                Access to this feature is not live yet.<br />Stay tuned for the public release!
              </p>
              <a
                href="https://www.linkedin.com/company/taurusspace/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeModal}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 px-7 py-3 font-bold text-white shadow-xl transition-all text-lg"
                style={{ textDecoration: 'none' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.267c-.966 0-1.75-.786-1.75-1.756 0-.971.784-1.759 1.75-1.759s1.75.788 1.75 1.759c0 .97-.784 1.756-1.75 1.756zm13.5 11.267h-3v-5.604c0-1.337-.026-3.062-1.867-3.062-1.868 0-2.154 1.459-2.154 2.967v5.699h-3v-10h2.881v1.367h.041c.402-.764 1.384-1.566 2.848-1.566 3.045 0 3.608 2.005 3.608 4.614v5.585z"/>
                </svg>
                Follow for Updates
              </a>
              <button
                onClick={closeModal}
                className="mt-6 text-slate-400 hover:text-teal-400 text-base underline focus:outline-none"
                style={{
                  background: "none",
                  border: "none",
                  boxShadow: "none",
                  padding: 0
                }}
                tabIndex={-1}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- HERO ---------- */}
      <section className="pt-40 pb-0 px-4 sm:px-6 lg:px-8 relative">
        {/* Logo + Brand - fixed in top-left, not part of animation order */}
        <div className="absolute top-8 left-8 z-20 flex items-center space-x-3 pointer-events-none select-none">
          <img
            src={`${process.env.PUBLIC_URL}/logos/33.png`}
            alt="Taurus Logo"
            className="w-12 h-auto sm:w-20 drop-shadow-lg"
          />
          <span className="text-xl sm:text-2xl font-semibold text-white tracking-wide font-orbitron">
            TAURUS <span className="text-teal-400">SPACE</span>
          </span>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 mx-auto max-w-5xl flex flex-col items-center text-center">
          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter drop-shadow-2xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Space-grade situational awareness<br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(20,184,166,0.25)]">
              delivered as an API
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-8 text-xl md:text-xl text-slate-300 max-w-3xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            Stream real-time <span className="text-teal-300 font-semibold">AI-powered maneuver suggestions</span>, conjunction alerts, and telemetry in minutes.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
          >
            <button
              onClick={signupHandler}
              className="rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 px-10 py-4 text-xl font-bold shadow-xl shadow-teal-500/30 tracking-wide transition-all"
            >
              Get your free API key
            </button>
            <button
              onClick={signinHandler}
              className="rounded-xl border-2 border-teal-400 px-10 py-4 text-xl font-bold hover:bg-teal-400/10 transition-all"
            >
              Sign&nbsp;in
            </button>
          </motion.div>
        </div>
      </section>


      {/* ---------- SAMPLE FEED ---------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.55}
      >
        <LiveFeedSection signup={signupHandler} />
      </motion.div>

      {/* ---------- DATA FLOW VISUAL ---------- */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.6}
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
            End-to-end data pipeline
          </h2>
          <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
            See how satellite telemetry transforms into maneuver recommendations and live data feeds.
          </p>
        </div>
        <div className="w-full h-[320px] glassy-box rounded-2xl overflow-hidden shadow-lg">
          <DataFlowDiagram />
        </div>
      </motion.section>

      {/* ---------- INSIDE PLATFORM ---------- */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.7}
      >
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-extrabold mb-7 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
            Inside the Platform
          </h2>
          <p className="text-lg text-slate-400 mb-12">
            A glimpse into how Taurus Space delivers real-time telemetry and decision support.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[350px] overflow-hidden rounded-2xl shadow-xl glassy-box border border-white/10">
              <img
                src={`${process.env.PUBLIC_URL}/screenshots/dashboard.png`}
                alt="Dashboard"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-[350px] overflow-hidden rounded-2xl shadow-xl glassy-box border border-white/10">
              <img
                src={`${process.env.PUBLIC_URL}/screenshots/datafeeds.png`}
                alt="Data Feeds"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ---------- HOW IT WORKS ---------- */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.8}
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
            How it works
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 + 0.8 }}
                className="rounded-2xl glassy-box p-8 border border-teal-400/30 shadow-xl hover:shadow-teal-400/20 transition-shadow"
              >
                <div className="text-6xl mb-4 drop-shadow-[0_1px_12px_rgba(20,184,166,0.25)]">{step.icon}</div>
                <h3 className="mt-2 text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">{step.title}</h3>
                <p className="mt-3 text-slate-300 text-lg">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ---------- PRICING ---------- */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.9}
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
            Simple, usage-based pricing
          </h2>
          {/* 
            Fix for responsive pricing: 
            - On sm: 1 col
            - md: 2 cols
            - lg+: 4 cols 
          */}
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {["Starter", "Developer", "Pro", "Enterprise"].map((tier, i) => (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2 + 1 }}
                className="rounded-2xl border border-teal-400/20 glassy-box bg-[#1c1f2e]/90 p-8 flex flex-col shadow-xl"
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">{tier}</h3>
                <p className="mt-3 text-5xl font-extrabold text-white/90">
                  {["$49", "$129", "$899", "Custom"][i]}
                </p>
                <p className="mt-1 text-slate-400 text-base">
                  {["100 calls / mo", "10k calls / mo", "250k calls / mo", "Unlimited"][i]}
                </p>
                <button
                  onClick={pricingHandler}
                  className="mt-8 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 py-2 font-bold text-white shadow-md shadow-teal-500/30 transition-all"
                >
                  {["Get started", "Choose plan", "Choose plan", "Contact us"][i]}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ---------- CONTACT FORM ---------- */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 text-white"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1.0}
      >
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">Contact Us</h2>
          <p className="mt-3 text-slate-400 text-lg">
            Want a demo, a conversation, or something else? Drop us a line.
          </p>
        </div>
        <form
          className="space-y-8 glassy-box bg-[#1a1e2a]/90 backdrop-blur-xl p-10 rounded-2xl border border-teal-400/20 shadow-lg"
          action="https://formspree.io/f/xovjwpka"
          method="POST"
        >
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold text-slate-200">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-5 py-3 rounded-lg bg-slate-800 border border-teal-400/20 text-white font-medium"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-slate-200">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-5 py-3 rounded-lg bg-slate-800 border border-teal-400/20 text-white font-medium"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 font-semibold text-slate-200">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full px-5 py-3 rounded-lg bg-slate-800 border border-teal-400/20 text-white font-medium"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 px-8 py-3 font-bold text-white shadow-md shadow-teal-500/30"
          >
            Send Message
          </button>
        </form>
      </motion.section>

      {/* ---------- FOOTER ---------- */}
      <footer className="text-slate-400 border-t border-white/10 mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white">About</a></li>
              <li><a href="/" className="hover:text-white">Careers</a></li>
              <li><a href="/" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          {/* Follow Us Section */}
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/company/taurusspace/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.7v2.2h.1c.7-1.3 2.4-2.6 5-2.6 5.3 0 6.3 3.5 6.3 8V24h-5v-7c0-1.7 0-4-2.4-4s-2.7 1.9-2.7 3.9V24h-5V8z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-8 text-center text-xs">
          © {new Date().getFullYear()} Taurus Space. All rights reserved.
        </div>
      </footer>

      {/* GLASSMORPHISM STYLES */}
      <style>
        {`
          .glassy-box {
            background: linear-gradient(120deg,rgba(26,34,54,0.83) 65%,rgba(20,184,166,0.08));
            backdrop-filter: blur(12px);
            box-shadow: 0 4px 64px 0 rgba(20,184,166,0.08), 0 1.5px 8px 0 rgba(0,0,0,0.16);
          }
        `}
      </style>
    </div>
  );
}
