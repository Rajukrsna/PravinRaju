// Create: src/components/PersonalTouch.tsx
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Coffee, 
  Music, 
  Monitor, 
  Headphones, 
  Code2, 
  Heart, 
  Gamepad2, 
  MapPin,
  Clock,
  Zap,
  Play,
  Pause,
  SkipForward,
  Volume2,
  ExternalLink,
  Camera,
  Mouse,

} from 'lucide-react';

const PersonalTouch = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [activePlaylist, setActivePlaylist] = useState(0);

  
  const workspaceImages = [
    {
      id: 1,
      title: "Main Setup",
      description: "Raised Laptop setup with mechanical keyboard and Wireless Mouse",
      image: "/images/Room.jpeg", // You'll need to add these images
      featured: true
    },
    {
      id: 2,
      title: "Evening Vibes In Workspace",
      description: "Only GO-TO place when I need peace and focus",
      image: "/images/Room2.jpeg",
      featured: true 
    },
 
  ];

 

  const techStack = [
    { name: "HP intel Core i3 gen", icon: Monitor },
    { name: "Some Headphones with Brand Unknown", icon: Headphones },
    { name: "Zebronics Keyboard ", icon: Code2 },
    { name: "Zebronics Wireless Mouse", icon: Mouse }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-50 via-white to-primary-50" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
            Personal <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Get to know me beyond the code - my workspace setup, tech stack, and the little things that inspire my work.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </motion.div>


        {/* Workspace Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-secondary-800 mb-12">
            My Coding Workspace
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Workspace Images */}
           {/* Workspace Images - CORRECTED */}
<div className="space-y-4">
  {workspaceImages.map((image, index) => (
    <motion.div
      key={image.id}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
      className={`relative overflow-hidden rounded-xl ${
        image.featured ? 'h-64' : 'h-32'
      }`}
    >
      {/* Image goes directly here, not inside placeholder */}
      <img 
        src={image.image} 
        alt={image.title} 
        className="w-full h-full object-cover"
        onLoad={() => console.log('✅ Image loaded:', image.image)}
        onError={(e) => {
          console.log('❌ Image failed to load:', image.image);
          // Hide image and show placeholder
          (e.target as HTMLElement).style.display = 'none';
          const placeholder = (e.target as HTMLElement).nextElementSibling as HTMLElement;
          if (placeholder) placeholder.style.display = 'flex';
        }}
      />
      
      {/* Placeholder only shows on error */}
      <div 
        className="w-full h-full bg-gradient-to-br from-primary-200 to-secondary-200 items-center justify-center absolute inset-0"
        style={{ display: 'none' }} // Hidden by default
      >
        <div className="text-center text-secondary-600">
          <Camera className="w-12 h-12 mx-auto mb-2" />
          <p className="font-medium">{image.title}</p>
          <p className="text-sm opacity-75">{image.description}</p>
          <p className="text-xs mt-2 text-red-500">Image not found</p>
        </div>
      </div>
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 text-white">
          <h4 className="font-bold text-lg">{image.title}</h4>
          <p className="text-sm opacity-90">{image.description}</p>
        </div>
      </div>
    </motion.div>
  ))}
</div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card p-8"
            >
              <h4 className="text-2xl font-bold text-secondary-800 mb-6">
                My Tech Stack
              </h4>
              
              <div className="space-y-4">
                {techStack.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      className="flex items-center space-x-4 p-3 bg-secondary-50 rounded-lg hover:bg-primary-50 transition-colors duration-300"
                    >
                      <IconComponent className="w-6 h-6 text-primary-600" />
                      <span className="font-medium text-secondary-800">
                        {item.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <h5 className="font-semibold text-primary-800 mb-2">Work Philosophy</h5>
                <p className="text-sm text-primary-700">
                 Discipline beats motivation when motivation fades.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        
      </div>
    </section>
  );
};

export default PersonalTouch;