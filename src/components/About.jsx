import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'
import { bio, highlights } from '../data/about.js'

export default function About() {
  const { theme } = useTheme()
  const isNight = theme === 'night'
  const sectionRef = useRef(null)
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : 30, prefersReducedMotion ? 0 : -30])

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative w-full overflow-hidden py-24 sm:py-32 transition-colors duration-700
        ${isNight ? 'bg-night-bg2' : 'bg-sky-bg2'}`}
    >
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div style={{ y: contentY }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className={`font-mono text-sm mb-3 ${isNight ? 'text-night-accent2' : 'text-sky-sun'}`}
          >
            About Me
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`font-display font-semibold text-3xl sm:text-4xl mb-8 ${
              isNight ? 'text-night-text' : 'text-sky-text'
            }`}
          >
            A little about who I am
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            style={{ transformPerspective: 1000 }}
            className={`text-left rounded-2xl p-6 sm:p-8 ${isNight ? 'glass-dark' : 'glass-light'}`}
          >
            <p className={`font-body leading-relaxed ${isNight ? 'text-night-text/85' : 'text-sky-text/85'}`}>
              {bio}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {highlights.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className={`flex items-center gap-3 text-sm ${
                    isNight ? 'text-night-text/80' : 'text-sky-text/80'
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                      isNight ? 'bg-night-accent/15 text-night-accent2' : 'bg-sky-sun/15 text-sky-sun'
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  {label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}