import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Github, Star, GitFork, Users, BookOpen } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

// CHANGE THIS to your real GitHub username once you send it over
const GITHUB_USERNAME = 'Zeeshan-Mir-SE'

function Counter({ value, isNight }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.2, ease: 'easeOut' })
    const unsub = rounded.on('change', (v) => setDisplay(v))
    return () => {
      controls.stop()
      unsub()
    }
  }, [value])

  return (
    <span className={`font-display text-3xl font-semibold ${isNight ? 'text-night-text' : 'text-sky-text'}`}>
      {display}
    </span>
  )
}

export default function GitHubStats() {
  const { theme } = useTheme()
  const isNight = theme === 'night'
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
        ])
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')
        const user = await userRes.json()
        const repos = await reposRes.json()
        const stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
        const forks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)
        if (!cancelled) {
          setStats({
            repos: user.public_repos ?? repos.length,
            followers: user.followers ?? 0,
            stars,
            forks,
          })
        }
      } catch (e) {
        if (!cancelled) setError(true)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const CARDS = stats
    ? [
        { icon: BookOpen, label: 'Public Repos', value: stats.repos },
        { icon: Users, label: 'Followers', value: stats.followers },
        { icon: Star, label: 'Total Stars', value: stats.stars },
        { icon: GitFork, label: 'Total Forks', value: stats.forks },
      ]
    : []

  return (
    <section className={`py-24 px-6 ${isNight ? 'bg-night-bg2' : 'bg-sky-bg2'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className={`font-mono text-sm mb-2 flex items-center gap-2 ${isNight ? 'text-night-accent2' : 'text-sky-sun'}`}
        >
          <Github size={16} /> Live from GitHub
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className={`font-display text-3xl sm:text-4xl font-semibold mb-12 ${isNight ? 'text-night-text' : 'text-sky-text'}`}
        >
          GitHub Activity
        </motion.h2>

        {error && (
          <p className={`font-body text-sm ${isNight ? 'text-night-text/60' : 'text-sky-text/60'}`}>
            Couldn&apos;t load live GitHub stats right now — this will show real numbers once the
            username in <code>GitHubStats.jsx</code> is set to yours.
          </p>
        )}

        {!error && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {(stats ? CARDS : Array.from({ length: 4 })).map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl p-6 text-center ${isNight ? 'glass-dark' : 'glass-light'}`}
              >
                {c ? (
                  <>
                    <c.icon className={`mx-auto mb-3 ${isNight ? 'text-night-accent2' : 'text-sky-sun'}`} size={24} />
                    <Counter value={c.value} isNight={isNight} />
                    <p className={`font-body text-xs mt-2 ${isNight ? 'text-night-text/60' : 'text-sky-text/60'}`}>
                      {c.label}
                    </p>
                  </>
                ) : (
                  <div className={`h-16 rounded-lg animate-pulse ${isNight ? 'bg-white/10' : 'bg-black/10'}`} />
                )}
              </motion.div>
            ))}
          </div>
        )}

        <motion.a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-full font-body text-sm font-medium transition-transform hover:-translate-y-0.5 ${
            isNight ? 'bg-night-accent text-night-bg shadow-glow' : 'bg-sky-text text-white shadow-glow-sun'
          }`}
        >
          <Github size={16} /> View Full Profile
        </motion.a>
      </div>
    </section>
  )
}
