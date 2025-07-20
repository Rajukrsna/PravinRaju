import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GitHubActivity from './components/GitHubActivity';
import VoiceControl from './components/VoiceControl';

function App() {

 

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Uncomment when gesture components are ready */}
     
          <Navbar />
          
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <section id="home">
              <Hero />
            </section>
            
            <section id="about">
              <About />
            </section>
            
            <section id="experience">
              <Experience />
            </section>
            
            <section id="skills">
              <Skills />
            </section>
            
            <section id="projects">
              <Projects />
            </section>
            
            <section id="github-activity">
              <GitHubActivity />
            </section>
            
            <section id="contact">
              <Contact />
            </section>
          </motion.main>
          
          <Footer />
       <VoiceControl />
      </div>
    </Router>
  );
}

export default App;