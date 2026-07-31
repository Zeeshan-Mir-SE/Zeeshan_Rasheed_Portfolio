import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'
import profilePic from '../assets/profile.png'
import { bio, highlights } from '../data/about.js'

export default function About() {
  const { theme } = useTheme()
  const isNight = theme === 'night'
  const sectionRef = useRef(null)
  const photoRef = useRef(null)
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Track scroll progress of this section to drive the parallax offsets
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Text moves a little slower, image moves a little faster -> parallax feel
  const textY = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : 40, prefersReducedMotion ? 0 : -40])
  const imageY = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : -70, prefersReducedMotion ? 0 : 70])

  // Real 3D tilt on the profile photo, driven by mouse position (same pattern as Skills cards)
  const photoMouseX = useMotionValue(0)
  const photoMouseY = useMotionValue(0)
  const photoRotateX = useSpring(useTransform(photoMouseY, [-0.5, 0.5], [14, -14]), { stiffness: 200, damping: 18 })
  const photoRotateY = useSpring(useTransform(photoMouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 200, damping: 18 })

  function handlePhotoMouseMove(e) {
    if (!photoRef.current || prefersReducedMotion) return
    const rect = photoRef.current.getBoundingClientRect()
    photoMouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    photoMouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handlePhotoMouseLeave() {
    photoMouseX.set(0)
    photoMouseY.set(0)
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative w-full overflow-hidden py-24 sm:py-32 transition-colors duration-700
        ${isNight ? 'bg-night-bg2' : 'bg-sky-bg2'}`}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
        {/* Parallax + 3D tilt image */}
        <motion.div style={{ y: imageY, perspective: 900 }} className="flex justify-center md:justify-start">
          <motion.div
            ref={photoRef}
            onMouseMove={handlePhotoMouseMove}
            onMouseLeave={handlePhotoMouseLeave}
            style={{ rotateX: photoRotateX, rotateY: photoRotateY, transformStyle: 'preserve-3d' }}
            animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className={`relative w-56 h-56 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 shadow-2xl cursor-pointer
              ${isNight ? 'border-night-bg2 hover:shadow-glow' : 'border-white hover:shadow-glow-sun'}`}
          >
            <img
              src={profilePic}
              alt="Zeeshan Rasheed"
              style={{ transform: 'translateZ(30px)' }}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Parallax text + glassmorphism bio card */}
        <motion.div style={{ y: textY }}>
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
            className={`font-display font-semibold text-3xl sm:text-4xl mb-6 ${
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
            className={`rounded-2xl p-6 sm:p-8 ${isNight ? 'glass-dark' : 'glass-light'}`}
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
