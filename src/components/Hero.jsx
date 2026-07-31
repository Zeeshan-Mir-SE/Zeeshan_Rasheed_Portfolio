import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import SkyDayNightScene from './SkyDayNightScene.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import profilePic from '../assets/profile.png'

const ROLES = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'Building web experiences',
]

function useTypewriter(words, { typingMs = 70, pauseMs = 1400, deletingMs = 35 } = {}) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingMs)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingMs)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setWordIndex((i) => i + 1)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typingMs, pauseMs, deletingMs])

  return text
}

export default function Hero() {
  const { theme } = useTheme()
  const isNight = theme === 'night'
  const typed = useTypewriter(ROLES)
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section
      id="top"
      className={`relative min-h-screen w-full overflow-hidden flex items-center transition-colors duration-700
        ${isNight ? 'bg-gradient-to-b from-night-bg to-night-bg2' : 'bg-gradient-to-b from-sky-bg to-sky-bg2'}`}
    >
      {!prefersReducedMotion && <SkyDayNightScene isNight={isNight} />}

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full grid md:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`font-mono text-sm mb-4 ${isNight ? 'text-night-accent2' : 'text-sky-sun'}`}
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`font-display font-semibold text-5xl sm:text-6xl md:text-7xl tracking-tight
            ${isNight ? 'text-night-text' : 'text-sky-text'}`}
        >
          Zeeshan Rasheed
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={`font-mono text-lg sm:text-xl mt-4 h-8 ${isNight ? 'text-night-accent' : 'text-sky-text/80'}`}
        >
          {typed}
          <span className="animate-pulse">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className={`mt-6 max-w-xl font-body leading-relaxed ${isNight ? 'text-night-text/80' : 'text-sky-text/80'}`}
        >
          BSc Software Engineering student at UET Lahore, with a year of freelance
          experience building full-stack web applications with the MERN stack.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <a
            href="#contact"
            className={`cursor-pointer px-6 py-3 rounded-full font-body text-sm font-medium transition-transform hover:-translate-y-0.5
              ${isNight ? 'bg-night-accent text-night-bg shadow-glow' : 'bg-sky-text text-white shadow-glow-sun'}`}
          >
            Hire Me
          </a>
          <a
            href="#projects"
            className={`cursor-pointer px-6 py-3 rounded-full font-body text-sm font-medium border transition-transform hover:-translate-y-0.5
              ${isNight ? 'border-night-accent/50 text-night-text' : 'border-sky-text/30 text-sky-text'}`}
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download
            className={`cursor-pointer px-6 py-3 rounded-full font-body text-sm font-medium flex items-center gap-2 transition-transform hover:-translate-y-0.5
              ${isNight ? 'glass-dark text-night-text' : 'glass-light text-sky-text'}`}
          >
            <Download size={16} /> Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex gap-5"
        >
          <a
            href="https://github.com/Zeeshan-Mir-SE/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`cursor-pointer ${isNight ? 'text-night-text/80 hover:text-night-accent' : 'text-sky-text/70 hover:text-sky-sun'}`}
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/zeeshan-mir-742535371/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className={`cursor-pointer ${isNight ? 'text-night-text/80 hover:text-night-accent' : 'text-sky-text/70 hover:text-sky-sun'}`}
          >
            <Linkedin size={22} />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=zeeshan.mir.001300@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className={`cursor-pointer ${isNight ? 'text-night-text/80 hover:text-night-accent' : 'text-sky-text/70 hover:text-sky-sun'}`}
          >
            <Mail size={22} />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative flex justify-center md:justify-end"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-64 h-64 sm:w-80 sm:h-80"
        >
          {/* Glow ring behind the photo, theme aware */}
          <motion.div
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className={`absolute -inset-3 rounded-full ${
              isNight
                ? 'bg-gradient-to-tr from-night-accent via-night-accent2 to-night-accent opacity-60 blur-md'
                : 'bg-gradient-to-tr from-sky-sun via-white to-sky-sun opacity-70 blur-md'
            }`}
          />
          {/* Orbiting dot, like a tiny satellite / star */}
          {!prefersReducedMotion && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
              style={{ transformOrigin: '50% 50%' }}
            >
              <span
                className={`absolute -top-2 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full ${
                  isNight ? 'bg-night-accent2 shadow-glow' : 'bg-sky-sun shadow-glow-sun'
                }`}
              />
            </motion.div>
          )}

          <div
            className={`relative w-full h-full rounded-full overflow-hidden border-4 ${
              isNight ? 'border-night-bg2' : 'border-white'
            } shadow-2xl`}
          >
            <img
              src={profilePic}
              alt="Zeeshan Rasheed"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
      </div>
    </section>
  )
}