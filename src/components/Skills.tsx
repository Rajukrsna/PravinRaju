import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Monitor, 
  Server, 
  Settings, 
  Code2, 
  Palette, 
  Layers, 
  Database, 
  Globe, 
  Cloud, 
  Container, 
  Gift, 
  Terminal,
  Cpu,
  Zap,
  Search,
  TestTube,
  Wrench,
  Figma,
  PenTool
} from 'lucide-react';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Monitor,
      skills: [
        { name: 'React', level: 95, icon: Code2 },
        { name: 'TypeScript', level: 90, icon: Code2 },
        { name: 'Javascript', level: 85, icon: Code2 },
        { name: 'Next.js', level: 88, icon: Layers },
        { name: 'Tailwind CSS', level: 92, icon: Palette },
        { name: 'HTML5/CSS3', level: 95, icon: Palette }
      ]
    },
    {
      title: 'Backend',
      icon: Server,
      skills: [
        { name: 'Node.js', level: 90, icon: Server },
        { name: 'Express.js', level: 88, icon: Server },
        { name: 'EJS', level: 85, icon: Code2 },
        { name: 'PostgreSQL', level: 87, icon: Database },
        { name: 'MongoDB', level: 82, icon: Database },
        { name: 'REST APIs', level: 93, icon: Globe }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: Settings,
      skills: [
        { name: 'AWS', level: 80, icon: Cloud },
        { name: 'Docker', level: 85, icon: Container },
        { name: 'Git', level: 95, icon: Gift },
        { name: 'CI/CD', level: 78, icon: Settings },
        { name: 'Linux', level: 82, icon: Terminal },
        { name: 'Nginx', level: 75, icon: Server },
        { name: 'Jenkins', level: 80, icon: Settings },
        { name: 'Azure', level: 80, icon: Cloud }
      ]
    }
  ];

  const additionalTechnologies = [
    { name: 'GraphQL', icon: Globe },
    { name: 'Redis', icon: Database },
    { name: 'Elasticsearch', icon: Search },
    { name: 'Kubernetes', icon: Container },
    { name: 'Terraform', icon: Cloud },
    { name: 'Jest', icon: TestTube },
    { name: 'Cypress', icon: TestTube },
    { name: 'Webpack', icon: Wrench },
    { name: 'Vite', icon: Zap },
    { name: 'Figma', icon: Figma },
    { name: 'Adobe XD', icon: PenTool }
  ];

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="card p-6"
              >
                <div className="flex items-center justify-center mb-6">
                  <CategoryIcon className="w-8 h-8 text-primary-600 mr-3" />
                  <h3 className="text-2xl font-semibold text-secondary-800">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => {
                    const SkillIcon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <SkillIcon className="w-4 h-4 text-primary-600 mr-2" />
                            <span className="text-secondary-700 font-medium">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-primary-600 font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        
                        <div className="w-full bg-secondary-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ 
                              duration: 1.5, 
                              delay: categoryIndex * 0.2 + skillIndex * 0.1,
                              ease: "easeOut"
                            }}
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold text-secondary-800 mb-8">
            Additional Technologies
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {additionalTechnologies.map((tech, index) => {
              const TechIcon = tech.icon;
              return (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full font-medium hover:bg-primary-100 hover:text-primary-700 transition-all duration-300 cursor-default flex items-center space-x-2"
                >
                  <TechIcon className="w-4 h-4" />
                  <span>{tech.name}</span>
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;