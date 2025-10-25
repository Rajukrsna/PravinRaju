import React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView) setHasAnimated(true);
  }, [isInView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.2 },
    }),
  };


  const experiences = [
    {
      title: 'Cloud Ops IAAS Intern',
      company: 'Accenture India',
      location: 'Gurugram, Haryana',
      period: '20-2-2025 - 20-6-2025',
      description: [
        'Trained and worked on real-world IT projects focused on infrastructure management for enterprise clients.',
        'Gained hands-on experience in provisioning and maintaining Azure Virtual Networks (VNets), Virtual Machines (VMs), and other core cloud infrastructure services.',
        'Practiced cloud operations while preparing for Azure AZ-104 and AWS SysOps Administrator certifications.',
        'Worked with Azure Cloud Shell, CI/CD pipelines, Docker containers, and understood end-to-end SDLC practices in a corporate environment.'
      ],
      technologies: ['Azure', 'AWS', 'JIRA', 'JENKINS', 'Docker','Git']
    },
    {
      title: 'Frontend Developer - Freelance',
      company: 'Outlier ',
      location: 'Remote',
      period: 'June 2025 - July 2025',
      description: [
        'Reviewed and optimized AI-generated websites produced by Large Language Models (LLMs), enhancing visual design and user experience to meet Fortune 500-level UI/UX standards',
        'Rebuilt and customized frontend components using HTML, CSS, JavaScript, and modern frameworks (React.js and Next.js) to ensure responsive design, accessibility, and cross-browser compatibility',
        ' Conducted peer code reviews and usability audits, providing actionable feedback to contributors to maintain high-quality coding practices and design consistency'
      ],
      technologies: ['React.js', 'TailwindCSS', 'Next.js', 'Javascript', 'Typescript', 'HTML', 'CSS ']
    }
    ,
    {
      title: 'Full Stack Software Engineer',
      company: 'Unplex Me',
      location: 'Remote',
      period: 'August 2025 - October 2025',
      description: [
        'Designed and scaled backend services on Azure Function Apps (Node.js) integrating MySQL, Redis, and Cosmos DB to ensure high availability.',
        'Developed and optimized the 7Ronins web and mobile platforms, delivering responsive, user-centric interfaces using modern mobile-first techniques.',
        'Engineered a Human–AI Co-Creation Platform enabling real-time collaboration between AI agents and users to generate complex visual concepts.',
        'Architected the Fluid Framework with Server-Side Client (SSC) architecture to support scalable, low-latency real-time interactions.'
      ],
      technologies: ['Node.js', 'Azure Functions', 'MySQL', 'Redis', 'Cosmos DB', 'Fluid Framework', 'Real-time']
    }
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.2,
      },
    }),
  };

  return (
    <section ref={ref} className="relative section-padding bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#3b82f650_1px,transparent_1px)] bg-[length:20px_20px] opacity-10"></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Work <span className="text-primary-400">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full shadow-lg"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary-700 rounded-full"></div>

          {/* Timeline items */}
          <div className="space-y-20">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
                custom={index}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:items-start md:flex-row' : 'md:flex-row-reverse md:items-start'
                } group`}
              >
                {/* Floating Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-primary-600 border-4 border-white rounded-full shadow-lg z-20 group-hover:scale-125 transition-transform duration-300"></div>

                {/* Card */}
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:pr-10 md:mr-auto' : 'md:pl-10 md:ml-auto'
                  }`}
                >
                <motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  className="bg-secondary-800/90 text-white backdrop-blur-lg p-6 rounded-2xl border border-primary-600/30 shadow-xl hover:shadow-2xl transition-all duration-300"
>

                    <h3 className="text-xl font-semibold text-white mb-1">
                      {exp.title}
                    </h3>
                    <h4 className="text-lg font-medium text-primary-400 mb-3">
                      {exp.company}
                    </h4>

                    <div className="flex flex-wrap gap-4 text-sm text-secondary-300 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={16} /> {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4 text-secondary-200 text-sm leading-relaxed">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary-400 mr-2 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;