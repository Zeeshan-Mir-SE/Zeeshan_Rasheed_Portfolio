import React from 'react'
import { motion } from 'framer-motion'
import { Layout, Server, Database } from 'lucide-react'
import TiltCard from './TiltCard.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const SERVICES = [
  {
    icon: Layout,
    title: 'Frontend Development',
    desc: 'Responsive, accessible interfaces built with React and Tailwind CSS.',
  },
  {
    icon: Server,
    title: 'Backend Development',
    desc: 'REST APIs and server logic with Node.js, Express, and FastAPI.',
  },
  {
    icon: Database,
    title: 'Full-Stack Web Apps',
    desc: 'End-to-end MERN applications — from database design to deployment.',
  },
]

export default function Services() {
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
          How I can help
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`font-display text-3xl sm:text-4xl font-semibold mb-12 ${isNight ? 'text-night-text' : 'text-sky-text'}`}
        >
          Services
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <TiltCard key={s.title} className="group h-full">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl p-6 h-full ${isNight ? 'glass-dark' : 'glass-light'}`}
                >
                  <span
                    className={`inline-flex h-12 w-12 rounded-xl items-center justify-center mb-4 ${
                      isNight ? 'bg-night-accent/15 text-night-accent2' : 'bg-sky-sun/15 text-sky-sun'
                    }`}
                  >
                    <Icon size={22} />
                  </span>
                  <h3 className={`font-display font-semibold mb-2 ${isNight ? 'text-night-text' : 'text-sky-text'}`}>
                    {s.title}
                  </h3>
                  <p className={`font-body text-sm leading-relaxed ${isNight ? 'text-night-text/70' : 'text-sky-text/70'}`}>
                    {s.desc}
                  </p>
                </motion.div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
