import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'SmartVerify - A Secure Seller Verification System',
      longDescription: 'Developed a secure seller verification system using AI and blockchain technology. The platform ensures tamper-proof consent through video verification and AI sentiment analysis, enhancing trust in online transactions.',
      description: 'A platform that ensures secure, transparent, and tamper-proof seller consent using video verification, AI sentiment analysis, and blockchain storage.',
      image: 'https://i.ibb.co/BH58PPnq/Seller-Dashboard.png',
      videoUrl: 'dJxrhjwAT6I',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JWT', 'Material-UI','GCP-Vision API'],
      liveUrl: 'https://smart-verify2-0.vercel.app',
      githubUrl: 'https://github.com/Rajukrsna/SmartVerify2.0',
      category: 'Full Stack'
    },
    {
      id: 2,
      title: 'StoryTime.AI',
      description: 'We envisioned Storytime AI as a platform where human imagination and AI co-write epic tales — enabling both solo and collaborative storytelling powered by artificial intelligence',
      longDescription: 'Storytelling has been the foundation of human connection, creativity, and education for centuries. Yet, many aspiring writers lack a collaborative space or creative prompts to kickstart their imagination. We envisioned Storytime AI as a platform where human imagination and AI co-write epic tales — enabling both solo and collaborative storytelling powered by artificial intelligence.',
      image: 'https://i.ibb.co/Jh8K0Lp/image1.png',
      videoUrl: 'T7jHiYPwpMk',
      technologies: ['Next.js', 'Express.js', 'RAG', 'MongoDB-Atlas','MongoDB-VectorSearch' ,'Cloudinary', 'Tailwind CSS ', 'Gemini', 'TypeScript'],
      liveUrl: 'https://story-time-ai-2-o.vercel.app',
      githubUrl: 'https://github.com/Rajukrsna/StoryTimeAI-2.o',
      category: 'Full Stack'
    },
    {
      id: 3,
      title: 'FoodCultureMap - A Culinary Exploration App',
      description: 'We aimed to combine semantic AI with vector search in MongoDB to unearth food stories that are not just historically accurate but contextually relevant to the users query.',
      longDescription: 'FoodCultureMap is a culinary exploration app that uses semantic AI and vector search to connect users with authentic food stories and recipes from around the world. By leveraging MongoDBs advanced search capabilities, we aimed to combine semantic AI with vector search to unearth food stories that are not just historically accurate but contextually relevant to the users query.',
      image: 'https://i.ibb.co/Y7L1ZJRP/gallery-1.jpg',
      videoUrl: 'eoEL4JHPLdc',
      technologies: ['React', 'TypeScript', 'MongoDB-Vector Search', 'RAG(Retrieval Augment Generation)', 'Tailwind','JWT'],
      liveUrl: 'https://frontend-app-575377833580.asia-south1.run.app/login',
      githubUrl: 'https://github.com/Rajukrsna/FoodCultureMap',
      category: 'Frontend'
    },
    {
      id: 4,
      title: 'GlobeTrotter.ai - A Travel Planning Assistant',
      description: 'Globetrotter AI is your personal AI-powered travel planner that uses semantic search and RAG (Retrieval Augmented Generation) to craft bespoke itineraries based on your unique taste profile.',
      longDescription: 'Simply tell us what you love – like "I love BTS, Studio Ghibli, and ramen" – and we will create a personalized travel experience with interactive 3D map visualizations',
      image: 'https://i.ibb.co/vvBgDjKS/gallery.jpg',
      videoUrl: 'tbqXbJZbzD0',
      technologies: ['Node.js', 'Express', 'MongoDB', 'gemini', 'Tailwind CSS', 'TypeScript', 'RAG(Retrieval Augment Generation)'],
      liveUrl: 'https://globtrotter-ai.vercel.app/',
      githubUrl: 'https://github.com/Rajukrsna/GlobtrotterAI',
      category: 'Backend'
    },
    {
      id: 5,
      title: 'CosmoPT - A Space Exploration App',
      description: 'CosmoPT is a web app that makes space learning fun, hands-on, and immersive through simulations, missions, and interactive labs.',
      longDescription: 'As space enthusiasts, we noticed a lack of truly interactive, engaging, and gamified educational platforms that make space learning fun, hands-on, and immersive. We envisioned a web app that not only teaches users about the cosmos but lets them explore it through simulations, missions, and interactive labs—just like astronauts or space scientists. This led to the creation of CosmoPT: a powerful blend of education, gamification, and interactivity.',
      image: 'https://i.ibb.co/dsPbMHNQ/gallery-3.jpg',
      videoUrl: 'c_1qQywAJTs',
      technologies: ['React', 'Express.js', 'Tailwind CSS', 'Vite','MongoDB'],
      liveUrl: 'https://cosmo-pt.vercel.app',
      githubUrl: 'https://github.com/Rajukrsna/CosmoPT',
      category: 'Frontend'
    },
    {
      id: 6,
      title: 'BrightMindsSTEM - A interactive Educational Learning Platform',
      description: 'As students ourselves, we have experienced the challenges of learning complex subjects through traditional methods—often relying on rote memorization rather than true understanding. This website improves how students learn complex subjects like math, physics, and chemistry throughc.',
      longDescription: 'BrightMindsSTEM is designed to make learning STEM subjects (Science, technology, engineering, and math) both fun and effective. Their simulations for every STEM subject in our labs. these experiment allows students to engage with real-world applications and understand complex topics. To further enhance engagement, the platform includes a gamification system, where students earn experience points (XP) as they complete activities. As they progress, they can achieve different ranks, such as Bronze, Silver, and Gold, which serve as motivation to continue learning.',
      image: 'https://i.ibb.co/Dgf76L0n/gallery-2.jpg',
      videoUrl: '5-40bS-zVqQ',
      technologies: ['React', 'D3.js', 'matter-js', 'RESTFUL-API', 'Node.js', 'Express.js', 'MongoDB', 'Material-UI'],
      liveUrl: 'https://stem-edu.vercel.app',
      githubUrl: 'https://github.com/Rajukrsna/StemEdu',
      category: 'Full Stack'
    }
  ];

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section className="section-padding gradient-bg" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="text-white font-semibold"
                    >
                      View Details
                    </motion.div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-secondary-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    <motion.a
                      href={project.liveUrl}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                      <span>Live</span>
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 text-secondary-600 hover:text-secondary-700 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* YouTube Video Embed */}
                  <div className="w-full h-64 md:h-80">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedProject.videoUrl}?autoplay=0&rel=0&modestbranding=1`}
                      title={selectedProject.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-secondary-800 mb-4">
                    {selectedProject.title}
                  </h3>
                  <p className="text-secondary-600 mb-6 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-secondary-800 mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <motion.a
                      href={selectedProject.liveUrl}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <ExternalLink size={20} />
                      <span>View Live</span>
                    </motion.a>
                    <motion.a
                      href={selectedProject.githubUrl}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <Github size={20} />
                      <span>View Code</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;