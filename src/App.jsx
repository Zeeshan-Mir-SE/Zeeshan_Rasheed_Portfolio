import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Journey from './components/Journey.jsx'
import Projects from './components/Projects.jsx'
import Services from './components/Services.jsx'
import Certificates from './components/Certificates.jsx'
// import Testimonials from './components/Testimonials.jsx'
import GitHubStats from './components/GitHubStats.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="font-body">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Services />
      <Certificates />
      {/* <Testimonials /> */}
      <GitHubStats />
      <Contact />
      <Footer />
    </div>
  )
}
