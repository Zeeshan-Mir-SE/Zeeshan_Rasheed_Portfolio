import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GraduationCap, Briefcase } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

const TIMELINE = [
  {
    icon: Briefcase,
    title: 'Freelance Full Stack Developer',
    place: 'Self-employed',
    time: '1 year',
    desc: 'Building full-stack web applications for clients using the MERN stack — from UI to API to database.',
  },
  {
    icon: GraduationCap,
    title: 'BSc Software Engineering',
    place: 'UET Lahore',
    time: 'In progress',
    desc: 'Studying software engineering fundamentals while applying them through freelance projects.',
  },
]

export default function Journey() {
  const { theme } = useTheme()
  const isNight = theme === 'night'
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" ref={ref} className={`py-24 px-6 ${isNight ? 'bg-night-bg2' : 'bg-sky-bg2'}`}>
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`font-mono text-sm mb-2 ${isNight ? 'text-night-accent2' : 'text-sky-sun'}`}
        >
          Where I&apos;ve been
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`font-display text-3xl sm:text-4xl font-semibold mb-14 ${isNight ? 'text-night-text' : 'text-sky-text'}`}
        >
          My Journey
        </motion.h2>

        <div className="relative pl-10">
          {/* Base line */}
          <div className={`absolute left-3 top-1 bottom-1 w-[2px] ${isNight ? 'bg-white/10' : 'bg-black/10'}`} />
          {/* Glowing animated fill line */}
          <motion.div
            style={{ height: lineHeight }}
            className={`absolute left-3 top-1 w-[2px] rounded-full ${
              isNight ? 'bg-night-accent2 shadow-glow' : 'bg-sky-sun shadow-glow-sun'
            }`}
          />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="relative"
                >
                  <span
                    className={`absolute -left-10 top-0 h-7 w-7 rounded-full flex items-center justify-center ${
                      isNight ? 'bg-night-accent text-night-bg' : 'bg-sky-sun text-white'
                    } shadow-md`}
                  >
                    <Icon size={14} />
                  </span>

                  <div className={`rounded-2xl p-5 ${isNight ? 'glass-dark' : 'glass-light'}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <h3 className={`font-display font-semibold ${isNight ? 'text-night-text' : 'text-sky-text'}`}>
                        {item.title}
                      </h3>
                      <span className={`font-mono text-xs ${isNight ? 'text-night-accent2' : 'text-sky-sun'}`}>
                        {item.time}
                      </span>
                    </div>
                    <p className={`font-body text-sm mb-2 ${isNight ? 'text-night-text/60' : 'text-sky-text/60'}`}>
                      {item.place}
                    </p>
                    <p className={`font-body text-sm leading-relaxed ${isNight ? 'text-night-text/80' : 'text-sky-text/80'}`}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
