import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isNight = theme === 'night'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isNight ? 'Switch to sky (light) theme' : 'Switch to stars (dark) theme'}
      className={`relative h-9 w-16 rounded-full transition-colors duration-500 flex items-center px-1 shrink-0
        ${isNight ? 'bg-night-bg2 border border-night-accent/40' : 'bg-sky-bg2 border border-sky-sun/40'}`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className={`h-7 w-7 rounded-full flex items-center justify-center shadow-md
          ${isNight ? 'bg-night-accent text-night-bg ml-7' : 'bg-sky-sun text-white ml-0'}`}
      >
        {isNight ? <Moon size={16} fill="currentColor" /> : <Sun size={16} />}
      </motion.span>
    </button>
  )
}
