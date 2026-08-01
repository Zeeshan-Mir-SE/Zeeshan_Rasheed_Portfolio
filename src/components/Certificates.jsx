import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'
import { certificates } from '../data/Certificates'

function FlipCard({ cert, isNight }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="h-56 [perspective:1000px] cursor-pointer"
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
          className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 p-5 text-center [backface-visibility:hidden] ${
            isNight ? 'glass-dark' : 'glass-light'
          }`}
        >
          <Award
            size={34}
            className={isNight ? 'text-night-accent2' : 'text-sky-sun'}
          />

          <h3
            className={`font-display text-lg font-semibold ${
              isNight ? 'text-night-text' : 'text-sky-text'
            }`}
          >
            {cert.title}
          </h3>

          <p
            className={`text-sm ${
              isNight ? 'text-night-text/70' : 'text-sky-text/70'
            }`}
          >
            {cert.issuer}
          </p>

          <p
            className={`text-xs ${
              isNight ? 'text-night-accent2' : 'text-sky-sun'
            }`}
          >
            {cert.date}
          </p>

          <span
            className={`text-xs mt-2 ${
              isNight ? 'text-night-text/50' : 'text-sky-text/50'
            }`}
          >
            Tap to View Certificate →
          </span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          {cert.image ? (
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center ${
                isNight ? 'bg-night-accent' : 'bg-sky-sun'
              }`}
            >
              <p className="text-white font-semibold">No Certificate</p>
            </div>
          )}
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
          className={`font-mono text-sm mb-2 ${
            isNight ? 'text-night-accent2' : 'text-sky-sun'
          }`}
        >
          Proof of work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`font-display text-3xl sm:text-4xl font-semibold mb-3 ${
            isNight ? 'text-night-text' : 'text-sky-text'
          }`}
        >
          Certificates
        </motion.h2>

        <p
          className={`font-body text-sm mb-12 ${
            isNight ? 'text-night-text/60' : 'text-sky-text/60'
          }`}
        >
          Tap any certificate card to view the original certificate.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <FlipCard key={i} cert={cert} isNight={isNight} />
          ))}
        </div>
      </div>
    </section>
  )
}