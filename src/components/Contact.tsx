// Updated Contact.tsx with Lucide Icons replacing emojis
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Coffee,
  Laptop,
  ShieldX,
  AlertCircle,
  MessageCircle,
  HelpCircle,
  SmilePlus,
  Theater,
  AlertTriangle,
  CheckCircle,
  UserX,
  Ghost,
  Eye,
  Sparkles
  ,Frown,
  Smile,
  ArrowRight,
  Lightbulb
} from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<any>(null);
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'tmpravinraju@gmail.com',
      href: 'mailto:tmpravinraju@gmail.com',
      statusIcon: CheckCircle
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 9791540353',
      href: 'tel:+919791540353',
      statusIcon: CheckCircle
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Madurai, Tamil Nadu, India',
      href: '',
      statusIcon: CheckCircle
    }
  ];
  const lazyDeveloperMessages = [
    {
      icon: Coffee,
      title: "Oops! Developer Too Lazy Alert!",
      message: "Plot twist: I spent more time making this fancy form than connecting it to a backend! Please just email me directly at tmpravinraju@gmail.com.",
      action: "Email Me Instead",
      actionHref: "mailto:tmpravinraju@gmail.com?subject=Hi%20Pravin!&body=I%20tried%20your%20fancy%20form%20but%20you're%20too%20lazy%20for%20backends"
    },
    {
      icon: Laptop,
      title: "Backend? What Backend?",
      message: "Fun fact: This form is as functional as a chocolate teapot! I'm a frontend wizard but backend magic is still on my todo list.",
      action: "Send Real Email",
      actionHref: "mailto:tmpravinraju@gmail.com?subject=Your%20form%20is%20fake!&body=Hey%20lazy%20developer,%20your%20form%20doesn't%20work"
    },
    {
      icon: ShieldX,
      title: "Mission Failed Successfully!",
      message: "Congrats! You found my secret - I'm too lazy for backend! But hey, animations are smooth, right?",
      action: "Actually Contact Me",
      actionHref: "mailto:tmpravinraju@gmail.com?subject=Nice%20try%20with%20the%20form&body=Your%20form%20is%20beautiful%20but%20useless"
    },
    {
      icon: AlertCircle,
      title: "Error 404: Backend Not Found!",
      message: "This form looks great but does nothing! Save us time and email me instead.",
      action: "Skip The Nonsense",
      actionHref: "mailto:tmpravinraju@gmail.com?subject=Skipping%20your%20broken%20form&body=Hi%20there!%20Your%20form%20sent%20me%20here"
    },
    {
      icon: MessageCircle,
      title: "Surprise! Smoke & Mirrors!",
      message: "You've been pranked! This form is digital art. Email actually works, though!",
      action: "Get Revenge & Email Me",
      actionHref: "mailto:tmpravinraju@gmail.com?subject=You%20got%20me%20with%20that%20fake%20form!&body=That%20was%20sneaky,%20but%20clever!%20Let's%20chat%20properly."
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomMessage = lazyDeveloperMessages[Math.floor(Math.random() * lazyDeveloperMessages.length)];
    setCurrentMessage(randomMessage);
    setShowMessage(true);
    console.log('🎭 Another victim of the fake form!', {
      ...formData,
      timestamp: new Date().toISOString(),
      developerNote: "Maybe I should build a backend someday...",
      realityCheck: "This message goes nowhere but the console!"
    });
    setTimeout(() => setFormData({ name: '', email: '', subject: '', message: '' }), 3000);
  };

  const animatedIcons = [HelpCircle, SmilePlus, Mail, Laptop, Theater];

  return (
    <section className="section-padding bg-white" ref={ref}>
      {/* Funny Popup Message */}
      <AnimatePresence>
        {showMessage && currentMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -100 }}
            className="fixed inset-4 md:top-4 md:right-4 md:left-auto md:w-96 bg-white rounded-lg shadow-2xl border-2 border-red-500 z-50 p-6"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.8 }}
                className="inline-block mb-4"
              >
                <currentMessage.icon className="w-16 h-16 text-red-500 mx-auto" />
              </motion.div>
              <h3 className="text-xl font-bold text-red-600 mb-3">{currentMessage.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">{currentMessage.message}</p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                <p className="text-xs text-yellow-800">
                  <AlertTriangle className="inline w-4 h-4 mr-1" />
<strong>Developer's Confession:</strong> 3 hours for this popup. 0 hours for a backend. 
<Frown className="inline w-4 h-4 ml-1 text-yellow-600" />                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <motion.a
                  href={currentMessage.actionHref}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  <Mail className="inline w-4 h-4 mr-2" />
                  {currentMessage.action}
                </motion.a>
                <motion.button
                  onClick={() => setShowMessage(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                >
                  <Eye className="inline w-4 h-4 mr-1" />
                  Fine, I'll Pretend This Works
                </motion.button>
              </div>

              {/* Animated Icons */}
              <div className="flex justify-center space-x-2 mt-4">
                {animatedIcons.map((Icon, idx) => (
                  <motion.span
                    key={idx}
                    animate={{ y: [0, -8, 0], rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 1.5, delay: idx * 0.2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-lg"
                  >
                    <Icon className="w-5 h-5 text-gray-500" />
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Let's create something amazing together!
          </p>
          
          {/* Honest disclaimer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto"
          >
           <p className="text-sm text-yellow-800">
  <AlertTriangle className="inline w-4 h-4 mr-1" />
  <strong>Fair Warning:</strong> This form is prettier than it is functional. 
  Some lazy developer (me) didn't connect it to a backend.
  For guaranteed results, just email me directly below.
  <Smile className="inline w-4 h-4 ml-1 text-yellow-600" />
</p>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-secondary-800 mb-6">
                Let's Start a Conversation
              </h3>
              <p className="text-secondary-600 mb-8 leading-relaxed">
                I'm always interested in new opportunities and exciting projects. 
                Whether you're a company looking to hire, or you're a fellow developer 
                wanting to collaborate, don't hesitate to reach out.
              </p>
              
              {/* Extra encouragement to use real contact methods */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
               <p className="text-sm text-green-800">
  <Lightbulb className="inline w-4 h-4 mr-1" />
  <strong>Pro Tip:</strong> These contact methods actually work! 
  Unlike that fancy form over there...
  <ArrowRight className="inline w-4 h-4 ml-1" />
</p>
              </div>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-primary-50 transition-all duration-300 group border border-green-200 bg-green-50"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                    <info.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-800">{info.title}</h4>
                    <p className="text-secondary-600">{info.value}</p>
                    <p className="text-xs text-green-600"> Actually works!</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card p-8 relative"
          >
            {/* Warning badge */}
            <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold transform rotate-12">
              FAKE! 🎭
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                    Name * <span className="text-xs text-red-500">(will go nowhere)</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your awesome name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                    Email * <span className="text-xs text-red-500">(into the void)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                  Subject * <span className="text-xs text-red-500">(subject to deletion)</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                  Message * <span className="text-xs text-red-500">(message in a bottle)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me your hopes and dreams (that I'll never receive)..."
                />
              </div>

            <motion.button
  type="submit"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="w-full btn-primary flex items-center justify-center space-x-2 relative"
>
  <Send size={20} />
  <span>Send to See what happens!! (Surprise)</span>
  <Ghost className="w-4 h-4" />
</motion.button>

<p className="text-xs text-center text-gray-500 mt-2 flex items-center justify-center">
  <AlertTriangle className="w-4 h-4 mr-1" />
  Warning: This button is for entertainment purposes only
</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;