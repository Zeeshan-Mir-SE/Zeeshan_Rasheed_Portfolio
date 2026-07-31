// import React from 'react'
// import { motion } from 'framer-motion'
// import { Quote, Star } from 'lucide-react'
// import TiltCard from './TiltCard.jsx'
// import { useTheme } from '../context/ThemeContext.jsx'

// // Placeholder — replace with real client/colleague feedback whenever you have it
// const TESTIMONIALS = [
//   {
//     name: 'Client Name',
//     role: 'Freelance Client',
//     quote:
//       'Delivered exactly what we asked for, communicated clearly throughout, and fixed issues fast whenever they came up.',
//     rating: 5,
//   },
//   {
//     name: 'Client Name',
//     role: 'Freelance Client',
//     quote:
//       'Great to work with — understood the requirements quickly and the final product worked smoothly on both desktop and mobile.',
//     rating: 5,
//   },
//   {
//     name: 'Client Name',
//     role: 'Freelance Client',
//     quote:
//       'Reliable and easy to reach. Would recommend for anyone needing a full-stack web app built from scratch.',
//     rating: 5,
//   },
// ]

// export default function Testimonials() {
//   const { theme } = useTheme()
//   const isNight = theme === 'night'

//   return (
//     <section className={`py-24 px-6 ${isNight ? 'bg-night-bg2' : 'bg-sky-bg2'}`}>
//       <div className="max-w-6xl mx-auto">
//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true, amount: 0.3 }}
//           className={`font-mono text-sm mb-2 ${isNight ? 'text-night-accent2' : 'text-sky-sun'}`}
//         >
//           What people say
//         </motion.p>
//         <motion.h2
//           initial={{ opacity: 0, y: 10 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           className={`font-display text-3xl sm:text-4xl font-semibold mb-3 ${isNight ? 'text-night-text' : 'text-sky-text'}`}
//         >
//           Testimonials
//         </motion.h2>
//         <p className={`font-body text-sm mb-12 ${isNight ? 'text-night-text/60' : 'text-sky-text/60'}`}>
//           Placeholder reviews below — send real client feedback and I&apos;ll swap it in.
//         </p>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {TESTIMONIALS.map((t, i) => (
//             <TiltCard key={i} className="group h-full" maxTilt={8}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.2 }}
//                 transition={{ delay: i * 0.1 }}
//                 className={`rounded-2xl p-6 h-full flex flex-col ${isNight ? 'glass-dark' : 'glass-light'}`}
//               >
//                 <Quote className={`mb-3 ${isNight ? 'text-night-accent2' : 'text-sky-sun'}`} size={26} />
//                 <p className={`font-body text-sm leading-relaxed flex-1 mb-5 ${isNight ? 'text-night-text/80' : 'text-sky-text/80'}`}>
//                   &ldquo;{t.quote}&rdquo;
//                 </p>
//                 <div className="flex gap-1 mb-3">
//                   {Array.from({ length: t.rating }).map((_, s) => (
//                     <Star key={s} size={14} className={isNight ? 'text-night-accent2 fill-night-accent2' : 'text-sky-sun fill-sky-sun'} />
//                   ))}
//                 </div>
//                 <div>
//                   <p className={`font-display font-semibold text-sm ${isNight ? 'text-night-text' : 'text-sky-text'}`}>{t.name}</p>
//                   <p className={`font-body text-xs ${isNight ? 'text-night-text/50' : 'text-sky-text/50'}`}>{t.role}</p>
//                 </div>
//               </motion.div>
//             </TiltCard>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
