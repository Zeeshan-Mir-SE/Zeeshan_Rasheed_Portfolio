import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

const NAV_OFFSET = 72 // roughly the fixed navbar's height, so sections don't land hidden behind it

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme } = useTheme()
  const isNight = theme === 'night'

  function handleNavClick(e, href) {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setOpen(false)
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 ${isNight ? 'glass-dark' : 'glass-light'}`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setOpen(false) }}
          className={`font-display text-lg font-semibold tracking-tight ${isNight ? 'text-night-text' : 'text-sky-text'}`}
        >
          Zeeshan<span className={isNight ? 'text-night-accent' : 'text-sky-sun'}>.</span>
        </a>

        <ul className="hidden md:flex items-center gap-7 font-body text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className={`transition-colors hover:opacity-70 ${isNight ? 'text-night-text' : 'text-sky-text'}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X className={isNight ? 'text-night-text' : 'text-sky-text'} size={22} />
            ) : (
              <Menu className={isNight ? 'text-night-text' : 'text-sky-text'} size={22} />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`md:hidden overflow-hidden flex flex-col px-5 pb-4 gap-3 font-body text-sm ${isNight ? 'text-night-text' : 'text-sky-text'}`}
          >
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => handleNavClick(e, l.href)} className="block py-1">
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}