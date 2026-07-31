import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Github, Linkedin } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext.jsx'
import emailjs from "@emailjs/browser";

export default function Contact() {
  const { theme } = useTheme()
  const isNight = theme === 'night'
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  emailjs.send(
    "service_cyp49ym",
    "template_c2lfizp",
    {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
    },
    "7aXy5YuYOQ3HWK9-G"
  ).then(() => {
    alert("✅ Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  }).catch((error) => {
    console.error("EmailJS Error:", error);
    alert("❌ Failed to send message.");
  }).finally(() => setLoading(false));
}

  return (
    <section id="contact" className={`py-24 px-6 ${isNight ? 'bg-night-bg2' : 'bg-sky-bg2'}`}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className={`font-mono text-sm mb-2 text-center ${isNight ? 'text-night-accent2' : 'text-sky-sun'}`}
        >
          Let&apos;s talk
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className={`font-display text-3xl sm:text-4xl font-semibold mb-3 text-center ${isNight ? 'text-night-text' : 'text-sky-text'}`}
        >
          Get In Touch
        </motion.h2>
        <p className={`font-body text-sm mb-12 text-center ${isNight ? 'text-night-text/60' : 'text-sky-text/60'}`}>
          Have a project in mind? Send a message and I&apos;ll get back to you.
        </p>

        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          {/* Direct contact details */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=zeeshan.mir.001300@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`cursor-pointer flex items-center gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5 ${isNight ? 'glass-dark' : 'glass-light'}`}
            >
              <span className={`cursor-pointer h-11 w-11 rounded-xl flex items-center justify-center ${isNight ? 'bg-night-accent/15 text-night-accent2' : 'bg-sky-sun/15 text-sky-sun'}`}>
                <Mail size={20} />
              </span>
              <div>
                <p className={`font-body text-xs ${isNight ? 'text-night-text/50' : 'text-sky-text/50'}`}>Email</p>
                <p className={`font-body text-sm font-medium ${isNight ? 'text-night-text' : 'text-sky-text'}`}>
                  zeeshan.mir.001300@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://wa.me/923344851234?text=Hi%20Zeeshan,%20I%20visited%20your%20portfolio."
              target="_blank"
              rel="noopener noreferrer"
              className={`cursor-pointer flex items-center gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5 ${isNight ? 'glass-dark' : 'glass-light'}`}
            >
              <span className={`cursor-pointer h-11 w-11 rounded-xl flex items-center justify-center ${isNight ? 'bg-night-accent/15 text-night-accent2' : 'bg-sky-sun/15 text-sky-sun'}`}>
                <FaWhatsapp size={20} />
              </span>
              <div>
                <p className={`font-body text-xs ${isNight ? 'text-night-text/50' : 'text-sky-text/50'}`}>WhatsApp</p>
                <p className={`font-body text-sm font-medium ${isNight ? 'text-night-text' : 'text-sky-text'}`}>+92 334 4851234</p>
              </div>
            </a>

            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/Zeeshan-Mir-SE/"
                target="_blank"
                rel="noreferrer"
                className={`cursor-pointer h-11 w-11 rounded-xl flex items-center justify-center transition-transform hover:-translate-y-0.5 ${isNight ? 'glass-dark text-night-text' : 'glass-light text-sky-text'}`}
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/zeeshan-mir-742535371/"
                target="_blank"
                rel="noreferrer"
                className={`cursor-pointer h-11 w-11 rounded-xl flex items-center justify-center transition-transform hover:-translate-y-0.5 ${isNight ? 'glass-dark text-night-text' : 'glass-light text-sky-text'}`}
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className={`rounded-2xl p-6 space-y-4 ${isNight ? 'glass-dark' : 'glass-light'}`}
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className={`w-full rounded-xl px-4 py-3 font-body text-sm bg-transparent border outline-none transition-colors ${
                isNight ? 'border-white/15 text-night-text placeholder:text-night-text/40 focus:border-night-accent' : 'border-black/10 text-sky-text placeholder:text-sky-text/40 focus:border-sky-sun'
              }`}
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
              className={`w-full rounded-xl px-4 py-3 font-body text-sm bg-transparent border outline-none transition-colors ${
                isNight ? 'border-white/15 text-night-text placeholder:text-night-text/40 focus:border-night-accent' : 'border-black/10 text-sky-text placeholder:text-sky-text/40 focus:border-sky-sun'
              }`}
            />
            <textarea
              name="message"
              placeholder="Your message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
              className={`w-full rounded-xl px-4 py-3 font-body text-sm bg-transparent border outline-none resize-none transition-colors ${
                isNight ? 'border-white/15 text-night-text placeholder:text-night-text/40 focus:border-night-accent' : 'border-black/10 text-sky-text placeholder:text-sky-text/40 focus:border-sky-sun'
              }`}
            />
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer w-full flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-medium transition-transform hover:-translate-y-0.5 ${
                isNight ? 'bg-night-accent text-night-bg shadow-glow' : 'bg-sky-text text-white shadow-glow-sun'
              }`}
            >
              <Send size={16} /> {loading ? "Sending..." : "Send Message"}
            </button>
            <p className={`font-body text-xs text-center ${isNight ? 'text-night-text/40' : 'text-sky-text/40'}`}>
              Your message will be delivered directly to my inbox.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}