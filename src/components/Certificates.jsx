import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

// Placeholder — replace with real certificates (title, issuer, date, image)
const CERTS = [
  { title: 'Certificate Name', issuer: 'Platform / Organization', date: '2025' },
  { title: 'Certificate Name', issuer: 'Platform / Organization', date: '2025' },
  { title: 'Certificate Name', issuer: 'Platform / Organization', date: '2025' },
]

function FlipCard({ cert, isNight }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="h-48 [perspective:1000px] cursor-pointer"
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 [backface-visibility:hidden] ${
            isNight ? 'glass-dark' : 'glass-light'
          }`}
        >
          <Award size={34} className={isNight ? 'text-night-accent2' : 'text-sky-sun'} />
          <p className={`font-display text-sm font-medium text-center px-4 ${isNight ? 'text-night-text' : 'text-sky-text'}`}>
            {cert.title}
          </p>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-1 px-5 text-center [backface-visibility:hidden] [transform:rotateY(180deg)] ${
            isNight ? 'bg-night-accent/90' : 'bg-sky-sun/90'
          }`}
        >
          <p className="font-display font-semibold text-white">{cert.title}</p>
          <p className="font-body text-sm text-white/90">{cert.issuer}</p>
          <p className="font-mono text-xs text-white/70 mt-1">{cert.date}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function Certificates() {
  const { theme } = useTheme()
  const isNight = theme === 'night'

  return (
    <section className={`py-24 px-6 ${isNight ? 'bg-night-bg2' : 'bg-sky-bg2'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`font-mono text-sm mb-2 ${isNight ? 'text-night-accent2' : 'text-sky-sun'}`}
        >
          Proof of work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`font-display text-3xl sm:text-4xl font-semibold mb-3 ${isNight ? 'text-night-text' : 'text-sky-text'}`}
        >
          Certificates
        </motion.h2>
        <p className={`font-body text-sm mb-12 ${isNight ? 'text-night-text/60' : 'text-sky-text/60'}`}>
          Hover or tap a card to flip it. Send your real certificates and I&apos;ll swap these in.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTS.map((c, i) => (
            <FlipCard key={i} cert={c} isNight={isNight} />
          ))}
        </div>
      </div>
    </section>
  )
}
