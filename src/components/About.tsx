import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const stats = [
    { label: 'Projects Completed', value: '28+' },
    { label: 'Years Experience', value: '2+' },
    { label: 'Technologies Mastered', value: '20+' },
    { label: 'Hackathons Won', value: '1' },
    { label: 'Github Repositories', value: '50+' },
    { label: 'Hackathons Participated', value: '30+' },
  ];

  return (
    <section ref={ref} className="section-padding bg-white relative overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f620_1px,transparent_1px)] bg-[length:24px_24px] opacity-20 pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary-800 mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full shadow-lg" />
        </motion.div>

<div className="grid grid-cols-1  gap-10 lg:gap-14 items-center">
          {/* Profile Image */}
         

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-secondary-800 leading-snug">
              Passionate Full Stack Developer
            </h3>

            <p className="text-lg text-secondary-700 leading-relaxed">
              Junior full-stack developer with 2+ years of experience crafting scalable, modular web applications using the MERN stack, Next.js, and TypeScript. Skilled in cloud infra (AWS, GCP), CI/CD pipelines, and AI integrations using LLMs, RAG, and transformers.
            </p>

            <p className="text-lg text-secondary-700 leading-relaxed">
              I love building meaningful products and writing clean, scalable code. I also contribute to open source, mentor aspiring devs, and explore emerging tech daily.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={isInView ? { opacity: 1, rotateX: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-sm text-center py-5 px-4 hover:shadow-lg transition duration-300"
                >
                  <div className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-secondary-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
