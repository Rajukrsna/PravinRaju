import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {


  const currentYear = new Date().getFullYear();
 
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Rajukrsna', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/pravin-raju-t-m-164648252/', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-secondary-900 text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        
        {/* Brand Info */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Code2 className="h-9 w-9 text-primary-400" />
            <h2 className="text-2xl font-bold tracking-tight">Pravin Raju T M</h2>
          </div>
          <p className="text-secondary-300 text-sm leading-relaxed max-w-md">
            Full Stack Developer passionate about crafting beautiful, scalable, and performant apps using modern tools and best practices.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: 'Home', href: '#home' },
              { name: 'About', href: '#about' },
              { name: 'Experience', href: '#experience' },
              { name: 'Skills', href: '#skills' },
              { name: 'Projects', href: '#projects' },
              { name: 'Contact', href: '#contact' },
            ].map(({ name, href }) => (
              <motion.li
                key={name}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href={href}
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-300"
                >
                  {name}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
          <div className="flex space-x-4 mb-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-secondary-800 rounded-xl hover:bg-primary-600 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
          <p className="text-sm text-secondary-300 max-w-xs">
            Feel free to reach out — let’s create something extraordinary together!
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-secondary-800 mt-12 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-400">
          <p>© {currentYear} Pravin Raju T M. All rights reserved.</p>
          <div className="flex items-center space-x-2">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <Heart className="text-red-500 w-4 h-4" />
            </motion.div>
            <span>and React</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
