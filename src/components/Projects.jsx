import React from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, Octahedron, Torus, Sparkles, Stars } from '@react-three/drei'
import { Github, ExternalLink } from 'lucide-react'
import TiltCard from './TiltCard.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { PROJECTS } from '../data/projects.js'

function ProjectsBackdrop({ isNight }) {
  const color = isNight ? '#4169E1' : '#5AA9E6'
  const color2 = isNight ? '#C7F000' : '#FDB750'

  return (
    <Canvas
      dpr={[1, 1.1]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: false, alpha: true }}
      style={{ position: 'absolute', inset: 0, opacity: 0.5 }}
    >
      <ambientLight intensity={isNight ? 0.4 : 1} />
      <directionalLight position={[2, 3, 2]} intensity={isNight ? 0.3 : 0.8} />
      {isNight ? (
        <Stars radius={50} depth={30} count={450} factor={2} fade speed={0.1} />
      ) : (
        <Sparkles count={18} scale={[8, 5, 3]} size={1.4} speed={0.2} color="#ffffff" opacity={0.28} />
      )}
      <Float speed={0.5} rotationIntensity={0.5} floatIntensity={0.7}>
        <Octahedron args={[0.32, 0]} position={[-4.4, -1.6, -3]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isNight ? 0.4 : 0.1} roughness={0.3} metalness={0.3} />
        </Octahedron>
      </Float>
      <Float speed={0.6} rotationIntensity={0.55} floatIntensity={0.75}>
        <Torus args={[0.3, 0.1, 16, 32]} position={[4.5, 2, -3.5]}>
          <meshStandardMaterial color={color2} emissive={color2} emissiveIntensity={isNight ? 0.4 : 0.1} roughness={0.3} metalness={0.2} />
        </Torus>
      </Float>
    </Canvas>
  )
}

const previewThemes = {
  store: 'from-orange-400 via-rose-500 to-fuchsia-600',
  tasks: 'from-violet-400 via-indigo-500 to-blue-600',
  blog: 'from-rose-300 via-pink-500 to-purple-600',
  homes: 'from-emerald-300 via-teal-500 to-cyan-700',
}

function ProjectPreview({ project, index }) {
  const Icon = project.icon
  const visual = project.visual

  return (
    <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${previewThemes[visual] || previewThemes.store}`}>
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '18px 18px' }} />
      <div className="absolute -right-10 -top-14 h-48 w-48 rounded-full border-[24px] border-white/10" />
      <div className="absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

      <div className="absolute left-[8%] top-[15%] w-[72%] rounded-xl border border-white/60 bg-white/90 p-3 shadow-2xl shadow-black/20 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
        <div className="mb-3 flex items-center gap-1.5 border-b border-slate-200/80 pb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="ml-auto h-1.5 w-12 rounded-full bg-slate-200" />
        </div>

        {visual === 'tasks' ? (
          <div className="grid grid-cols-3 gap-2">
            {['To do', 'In progress', 'Done'].map((column, columnIndex) => (
              <div key={column} className="rounded-md bg-slate-100 p-1.5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[7px] font-semibold text-slate-500">{column}</span>
                  <span className="h-1 w-3 rounded bg-slate-300" />
                </div>
                {[0, 1].slice(0, columnIndex === 2 ? 1 : 2).map((item) => (
                  <div key={item} className="mb-1.5 rounded bg-white p-1.5 shadow-sm">
                    <span className={`mb-1 block h-1 w-4/5 rounded ${columnIndex === 1 ? 'bg-violet-300' : 'bg-indigo-200'}`} />
                    <span className="block h-1 w-1/2 rounded bg-slate-200" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : visual === 'blog' ? (
          <div className="flex gap-3">
            <div className="flex-1 py-1">
              <span className="mb-2 block h-1 w-10 rounded bg-pink-300" />
              <span className="mb-1 block h-2 w-4/5 rounded bg-slate-700" />
              <span className="mb-2 block h-2 w-3/5 rounded bg-slate-700" />
              <span className="block h-1 w-full rounded bg-slate-200" />
              <span className="mt-1 block h-1 w-4/5 rounded bg-slate-200" />
            </div>
            <div className="h-16 w-1/3 rounded-lg bg-gradient-to-br from-amber-200 via-rose-300 to-fuchsia-400" />
          </div>
        ) : visual === 'homes' ? (
          <div className="relative h-16 overflow-hidden rounded-lg bg-gradient-to-b from-sky-200 to-emerald-100">
            <div className="absolute bottom-0 h-5 w-full rounded-[50%] bg-emerald-300" />
            <div className="absolute bottom-3 left-[38%] h-7 w-10 rounded-t-sm bg-white shadow-sm">
              <div className="absolute -top-3 left-[-3px] h-4 w-12 rotate-[-8deg] rounded-sm bg-teal-600" />
              <div className="mx-auto mt-2 h-3 w-2 rounded-t bg-amber-300" />
            </div>
            <div className="absolute bottom-4 left-[18%] h-5 w-5 rounded-full bg-emerald-500" />
            <div className="absolute bottom-4 right-[14%] h-6 w-6 rounded-full bg-emerald-600" />
          </div>
        ) : (
          <div className="flex gap-3">
            <div className="h-16 w-1/2 rounded-lg bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400" />
            <div className="flex flex-1 flex-col justify-center">
              <span className="mb-2 block h-1 w-10 rounded bg-orange-300" />
              <span className="mb-1 block h-2 w-4/5 rounded bg-slate-700" />
              <span className="mb-3 block h-1 w-3/5 rounded bg-slate-300" />
              <span className="h-4 w-12 rounded-full bg-slate-800" />
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-[13%] right-[8%] flex h-14 w-14 items-center justify-center rounded-2xl border border-white/50 bg-white/25 text-white shadow-xl backdrop-blur-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
        <Icon size={27} strokeWidth={1.7} />
      </div>
      <span className="absolute bottom-4 left-5 rounded-full border border-white/30 bg-black/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
        {project.category}
      </span>
      <span className="absolute right-5 top-4 font-mono text-[10px] tracking-widest text-white/75">
        0{index + 1} / 04
      </span>
    </div>
  )
}

function ProjectCard({ project, isNight, index }) {
  return (
    <TiltCard className="group h-full" maxTilt={5}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className={`relative h-full overflow-hidden rounded-2xl flex flex-col transition-all duration-300 group-hover:-translate-y-1 ${
          isNight ? 'glass-dark group-hover:shadow-glow' : 'glass-light group-hover:shadow-glow-sun'
        }`}
      >
        <div className="relative">
          {project.image ? (
            <img src={project.image} alt={`${project.title} preview`} className="h-52 w-full object-cover" />
          ) : (
            <ProjectPreview project={project} index={index} />
          )}
          {project.featured && (
            <span className="absolute right-3 top-3 rounded-full border border-white/40 bg-black/20 px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] text-white backdrop-blur-sm">
              FEATURED
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className={`mb-2 font-display text-lg font-semibold leading-snug ${isNight ? 'text-night-text' : 'text-sky-text'}`}>
            {project.title}
          </h3>
          <p className={`mb-5 flex-1 font-body text-sm leading-relaxed ${isNight ? 'text-night-text/70' : 'text-sky-text/70'}`}>
            {project.desc}
          </p>

          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className={`rounded-full border px-2.5 py-1 font-mono text-[10px] ${
                  isNight ? 'bg-night-accent/15 text-night-accent2' : 'bg-sky-sun/15 text-sky-text'
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          <div className={`flex items-center justify-between border-t pt-4 ${isNight ? 'border-white/10' : 'border-slate-900/10'}`}>
            <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${isNight ? 'text-night-text/45' : 'text-sky-text/45'}`}>
              Sample project
            </span>
            <div className="flex gap-4">
              {project.github !== '#' ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isNight ? 'text-night-text/80 hover:text-night-accent2' : 'text-sky-text/80 hover:text-sky-sun'
                  }`}
                >
                  <Github size={15} /> Code
                </a>
              ) : (
                <span className={`flex items-center gap-1.5 text-xs ${isNight ? 'text-night-text/40' : 'text-sky-text/40'}`}>
                  <Github size={14} /> Coming soon
                </span>
              )}
              {project.live !== '#' && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isNight ? 'text-night-text/80 hover:text-night-accent2' : 'text-sky-text/80 hover:text-sky-sun'
                  }`}
                >
                  <ExternalLink size={15} /> Live
                </a>
              )}
            </div>
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
    <section id="projects" className={`relative overflow-hidden py-24 px-6 ${isNight ? 'bg-night-bg' : 'bg-sky-bg2'}`}>
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
          A few concept builds exploring thoughtful interfaces and useful tools.
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
