import React, { useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, HelpCircle, X } from 'lucide-react';
import { useVoiceControl } from '../hooks/useVoiceControl';

const VoiceControl = () => {
  const [showCommands, setShowCommands] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [commandFeedback, setCommandFeedback] = useState('');

  // Voice commands mapping
  const commands = {
    // Navigation commands
    'go to home': () => scrollToSection('home'),
    'home': () => scrollToSection('home'),
    'go to about': () => scrollToSection('about'),
    'about': () => scrollToSection('about'),
    'about me': () => scrollToSection('about'),
    'go to experience': () => scrollToSection('experience'),
    'experience': () => scrollToSection('experience'),
    'work experience': () => scrollToSection('experience'),
    'go to skills': () => scrollToSection('skills'),
    'skills': () => scrollToSection('skills'),
    'my skills': () => scrollToSection('skills'),
    'go to projects': () => scrollToSection('projects'),
    'projects': () => scrollToSection('projects'),
    'my projects': () => scrollToSection('projects'),
    'go to github': () => scrollToSection('github-activity'),
    'github': () => scrollToSection('github-activity'),
    'github activity': () => scrollToSection('github-activity'),
    'go to contact': () => scrollToSection('contact'),
    'contact': () => scrollToSection('contact'),
    'contact me': () => scrollToSection('contact'),
    
    // Navigation actions
    'scroll up': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    'scroll down': () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
    'scroll to top': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    'scroll to bottom': () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
    
    // Help commands
    'help': () => setShowCommands(true),
    'show commands': () => setShowCommands(true),
    'what can i say': () => setShowCommands(true),
    'voice commands': () => setShowCommands(true),
    
    // Close commands
    'close': () => setShowCommands(false),
    'hide commands': () => setShowCommands(false),
    'dismiss': () => setShowCommands(false),
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCommandFeedback(`Navigating to ${sectionId.replace('-', ' ')}`);
    } else {
      setCommandFeedback(`Section ${sectionId} not found`);
    }
  };

  const handleVoiceCommand = useCallback((command: string, confidence: number) => {
    setLastCommand(command);
    
    // Find matching command
    const matchedCommand = Object.keys(commands).find(cmd => 
      command.toLowerCase().includes(cmd.toLowerCase()) ||
      cmd.toLowerCase().includes(command.toLowerCase())
    );

    if (matchedCommand && confidence > 0.5) { // Lowered confidence threshold
      commands[matchedCommand as keyof typeof commands]();
      setCommandFeedback(`✓ ${matchedCommand}`);
    } else {
      setCommandFeedback(`Command not recognized: "${command}"`);
    }

    // Clear feedback after 3 seconds
    setTimeout(() => setCommandFeedback(''), 3000);
  }, []);

  const {
    isListening,
    isSupported,
    transcript,
    error,
    toggleListening
  } = useVoiceControl({
    onCommand: handleVoiceCommand,
    continuous: true,
    interimResults: true // Changed to true for better responsiveness
  });

  // Clear transcript after processing
  useEffect(() => {
    if (transcript && !isListening) {
      setTimeout(() => {
        // Clear transcript display
      }, 2000);
    }
  }, [transcript, isListening]);

  if (!isSupported) {
    return null; // Hide if not supported
  }

  return (
    <>
      {/* Voice Control Button - Fixed positioning with proper z-index */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 z-[60] md:z-50" // Higher z-index for mobile
        style={{ zIndex: 60 }} // Inline style as backup
      >
        <motion.button
          onClick={toggleListening}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-4 rounded-full shadow-xl transition-all duration-300 ${
            isListening
              ? 'bg-red-500 text-white animate-pulse shadow-red-200'
              : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-200'
          }`}
          title={isListening ? 'Stop listening' : 'Start voice control'}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </motion.button>

        {/* Help Button - Positioned better for mobile */}
        <motion.button
          onClick={() => setShowCommands(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-2 p-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 shadow-xl transition-all duration-300"
          title="Show voice commands"
          style={{ zIndex: 60 }} // Ensure it's above other elements
        >
          <HelpCircle className="w-5 h-5 text-white" />
        </motion.button>
      </motion.div>

      {/* Voice Status Indicator - Better positioning */}
      <AnimatePresence>
        {(isListening || commandFeedback || error) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-4 z-[60] md:bottom-20"
            style={{ zIndex: 60 }}
          >
            <div className="bg-white rounded-lg shadow-xl p-4 max-w-sm border border-secondary-200">
              {isListening && (
                <div className="flex items-center space-x-2 text-red-600">
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span className="text-sm font-medium">Listening...</span>
                  {transcript && (
                    <div className="ml-2 text-xs text-secondary-500">
                      "{transcript}"
                    </div>
                  )}
                </div>
              )}
              
              {commandFeedback && !isListening && (
                <div className="flex items-center space-x-2 text-green-600">
                  <span className="text-sm">{commandFeedback}</span>
                </div>
              )}
              
              {error && (
                <div className="flex items-center space-x-2 text-red-600">
                  <VolumeX className="w-4 h-4" />
                  <span className="text-sm">Error: {error}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Commands Modal */}
      <AnimatePresence>
        {showCommands && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[70]"
            style={{ zIndex: 70 }}
            onClick={() => setShowCommands(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-secondary-800">
                    Voice Commands
                  </h3>
                  <button
                    onClick={() => setShowCommands(false)}
                    className="text-secondary-400 hover:text-secondary-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-secondary-800 mb-3">
                      Navigation
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Go to section:</span>
                        <span className="font-mono text-primary-600">"Go to home"</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">About page:</span>
                        <span className="font-mono text-primary-600">"About me"</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Skills:</span>
                        <span className="font-mono text-primary-600">"Skills"</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Projects:</span>
                        <span className="font-mono text-primary-600">"Projects"</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">GitHub:</span>
                        <span className="font-mono text-primary-600">"GitHub"</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Contact:</span>
                        <span className="font-mono text-primary-600">"Contact me"</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-secondary-800 mb-3">
                      Scrolling
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Scroll to top:</span>
                        <span className="font-mono text-primary-600">"Scroll up"</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Scroll to bottom:</span>
                        <span className="font-mono text-primary-600">"Scroll down"</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-secondary-800 mb-3 mt-6">
                      Help
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Show commands:</span>
                        <span className="font-mono text-primary-600">"Help"</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Close modal:</span>
                        <span className="font-mono text-primary-600">"Close"</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
                  <p className="text-sm text-secondary-700">
                    <strong>Tip:</strong> Click the microphone button to start/stop voice control. 
                    Speak clearly and wait for the command to be processed. Voice recognition 
                    works best in quiet environments.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceControl;