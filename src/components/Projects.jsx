import React from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, Octahedron, Torus, Sparkles, Stars } from '@react-three/drei'
import { Github, ExternalLink } from 'lucide-react'
import TiltCard from './TiltCard.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { PROJECTS } from '../data/projects.js'

function ProjectsBackdrop({ isNight }) {
  const color = isNight ? '#8B7CFF' : '#5AA9E6'
  const color2 = isNight ? '#33D6C0' : '#FDB750'

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, opacity: 0.5 }}
    >
      <ambientLight intensity={isNight ? 0.4 : 1} />
      <directionalLight position={[2, 3, 2]} intensity={isNight ? 0.3 : 0.8} />
      {isNight ? (
        <Stars radius={50} depth={30} count={1000} factor={2} fade speed={0.4} />
      ) : (
        <Sparkles count={18} scale={[8, 5, 3]} size={1.4} speed={0.2} color="#ffffff" opacity={0.28} />
      )}
      <Float speed={1} rotationIntensity={1} floatIntensity={1.2}>
        <Octahedron args={[0.32, 0]} position={[-4.4, -1.6, -3]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isNight ? 0.4 : 0.1} roughness={0.3} metalness={0.3} />
        </Octahedron>
      </Float>
      <Float speed={1.3} rotationIntensity={1.1} floatIntensity={1.3}>
        <Torus args={[0.3, 0.1, 16, 32]} position={[4.5, 2, -3.5]}>
          <meshStandardMaterial color={color2} emissive={color2} emissiveIntensity={isNight ? 0.4 : 0.1} roughness={0.3} metalness={0.2} />
        </Torus>
      </Float>
    </Canvas>
  )
}

function ProjectCard({ project, isNight, index }) {
  const Icon = project.icon
  return (
    <TiltCard className="group h-full" maxTilt={9}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className={`relative rounded-2xl overflow-hidden h-full flex flex-col transition-shadow duration-300 ${
          isNight ? 'glass-dark group-hover:shadow-glow' : 'glass-light group-hover:shadow-glow-sun'
        }`}
      >
        {project.featured && (
          <span
            className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full font-mono text-[10px] tracking-wide ${
              isNight ? 'bg-night-accent text-night-bg' : 'bg-sky-sun text-white'
            }`}
          >
            FEATURED
          </span>
        )}

        {/* Real screenshot if provided in data/projects.js, otherwise an animated icon placeholder */}
        <div
          className={`relative h-40 flex items-center justify-center overflow-hidden ${
            isNight
              ? 'bg-gradient-to-br from-night-bg2 to-night-bg'
              : 'bg-gradient-to-br from-sky-bg2 to-sky-bg'
          }`}
        >
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <>
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                className={`h-16 w-16 rounded-2xl flex items-center justify-center ${
                  isNight ? 'bg-night-accent/15 text-night-accent2' : 'bg-sky-sun/15 text-sky-sun'
                }`}
              >
                <Icon size={30} />
              </motion.div>
              <div
                className={`absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-40 ${
                  isNight ? 'bg-night-accent2' : 'bg-sky-sun'
                }`}
              />
            </>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className={`font-display font-semibold text-lg mb-2 ${isNight ? 'text-night-text' : 'text-sky-text'}`}>
            {project.title}
          </h3>
          <p className={`font-body text-sm leading-relaxed mb-4 flex-1 ${isNight ? 'text-night-text/70' : 'text-sky-text/70'}`}>
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((t) => (
              <span
                key={t}
                className={`px-2.5 py-1 rounded-full font-mono text-[11px] ${
                  isNight ? 'bg-night-accent/15 text-night-accent2' : 'bg-sky-sun/15 text-sky-text'
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isNight ? 'text-night-text/80 hover:text-night-accent' : 'text-sky-text/80 hover:text-sky-sun'
              }`}
            >
              <Github size={16} /> Code
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isNight ? 'text-night-text/80 hover:text-night-accent' : 'text-sky-text/80 hover:text-sky-sun'
              }`}
            >
              <ExternalLink size={16} /> Live
            </a>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  )
}

export default function Projects() {
  const { theme } = useTheme()
  const isNight = theme === 'night'

  return (
    <section id="projects" className={`relative overflow-hidden py-24 px-6 ${isNight ? 'bg-night-bg2' : 'bg-sky-bg2'}`}>
      <ProjectsBackdrop isNight={isNight} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className={`font-mono text-sm mb-2 ${isNight ? 'text-night-accent2' : 'text-sky-sun'}`}
        >
          What I&apos;ve built
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className={`font-display text-3xl sm:text-4xl font-semibold mb-3 ${isNight ? 'text-night-text' : 'text-sky-text'}`}
        >
          Projects
        </motion.h2>
        <p className={`font-body text-sm mb-12 ${isNight ? 'text-night-text/60' : 'text-sky-text/60'}`}>
          Sample projects shown below — edit src/data/projects.js to add your real ones.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} isNight={isNight} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
