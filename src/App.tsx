import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VoiceControl from './components/VoiceControl';
import LoadingSpinner from './components/LoadingSpinner';

import { Analytics } from '@vercel/analytics/react'; // Add this import
const Projects = React.lazy(() => import('./components/Projects'));
const GitHubActivity = React.lazy(() => import('./components/GitHubActivity'));
const PersonalTouch = React.lazy(() => import('./components/PersonalTouch'));
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
            
            <Suspense fallback={<LoadingSpinner />}>
            <section id="projects"><Projects /></section>
            <section id="github-activity"><GitHubActivity /></section>
            <section id="personal"><PersonalTouch /></section>
          </Suspense>
          
            <section id="contact">
              <Contact />
            </section>
          </motion.main>
          
          <Footer />
       <VoiceControl />
               <Analytics />

      </div>
    </Router>
  );
}

export default App;