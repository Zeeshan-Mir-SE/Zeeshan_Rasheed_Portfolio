import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Footer() {
  const { theme } = useTheme()
  const isNight = theme === 'night'

  return (
    <footer className={`relative px-6 py-10 ${isNight ? 'bg-night-bg2 border-t border-white/10' : 'bg-sky-bg2 border-t border-black/10'}`}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className={`font-display font-semibold ${isNight ? 'text-night-text' : 'text-sky-text'}`}>
          Zeeshan<span className={isNight ? 'text-night-accent' : 'text-sky-sun'}>.</span>
        </p>

        <div className="flex gap-4">
          <a
            href="https://github.com/Zeeshan-Mir-SE/"
            target="_blank"
            rel="noreferrer"
            className={`cursor-pointer ${isNight ? 'text-night-text/70 hover:text-night-accent' : 'text-sky-text/70 hover:text-sky-sun'}`}
          >
            <Github size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/zeeshan-mir-742535371/"
            target="_blank"
            rel="noreferrer"
            className={`cursor-pointer ${isNight ? 'text-night-text/70 hover:text-night-accent' : 'text-sky-text/70 hover:text-sky-sun'}`}
          >
            <Linkedin size={18} />
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=zeeshan.mir.001300@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`cursor-pointer ${isNight ? 'text-night-text/70 hover:text-night-accent' : 'text-sky-text/70 hover:text-sky-sun'}`}
          >
            <Mail size={18} />
          </a>
        </div>

        <p className={`font-body text-xs ${isNight ? 'text-night-text/40' : 'text-sky-text/40'}`}>
          © {new Date().getFullYear()} Zeeshan Rasheed. All rights reserved.
        </p>
      </div>

      <motion.a
        href="#top"
        whileHover={{ y: -3 }}
        className={`cursor-pointer absolute -top-5 right-6 h-10 w-10 rounded-full flex items-center justify-center shadow-md ${
          isNight ? 'bg-night-accent text-night-bg' : 'bg-sky-sun text-white'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </motion.a>
    </footer>
  )
}