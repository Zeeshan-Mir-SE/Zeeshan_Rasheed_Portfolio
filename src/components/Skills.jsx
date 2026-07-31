import React, { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'
import { skills as SKILLS } from '../data/skills.js'

function TiltCard({ skill, isNight, index, prefersReducedMotion }) {
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Raw rotation mapped from mouse position, then smoothed with a spring
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 18,
  })

  function handleMouseMove(e) {
    if (!ref.current || prefersReducedMotion) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.06 }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`group relative rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer
          transition-shadow duration-300 ${isNight ? 'glass-dark hover:shadow-glow' : 'glass-light hover:shadow-glow-sun'}`}
      >
        <motion.div
          style={{ transform: 'translateZ(40px)' }}
          animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 3 + (index % 4) * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          className={`text-4xl ${isNight ? 'text-night-accent2' : 'text-sky-sun'}`}
        >
          <Icon />
        </motion.div>
        <span
          style={{ transform: 'translateZ(25px)' }}
          className={`font-body text-sm font-medium ${isNight ? 'text-night-text' : 'text-sky-text'}`}
        >
          {skill.name}
        </span>
        <span
          style={{ transform: 'translateZ(20px)' }}
          className={`text-xs font-mono ${isNight ? 'text-night-text/50' : 'text-sky-text/50'}`}
        >
          {skill.level}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const { theme } = useTheme()
  const isNight = theme === 'night'
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section
      id="skills"
      className={`relative w-full py-24 sm:py-32 transition-colors duration-700 ${
        isNight ? 'bg-night-bg2' : 'bg-sky-bg2'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className={`font-mono text-sm mb-3 text-center ${isNight ? 'text-night-accent2' : 'text-sky-sun'}`}
        >
          Skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`font-display font-semibold text-3xl sm:text-4xl mb-12 text-center ${
            isNight ? 'text-night-text' : 'text-sky-text'
          }`}
        >
          Tools I build with
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {SKILLS.map((skill, i) => (
            <TiltCard
              key={skill.name}
              skill={skill}
              isNight={isNight}
              index={i}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
