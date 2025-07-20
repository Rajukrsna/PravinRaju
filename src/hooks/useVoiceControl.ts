import { useState, useEffect, useRef } from 'react';

interface VoiceControlOptions {
  onCommand?: (command: string, confidence: number) => void;
  continuous?: boolean;
  interimResults?: boolean;
  language?: string;
}

export const useVoiceControl = (options: VoiceControlOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = options.continuous !== false; // Default to true
      recognition.interimResults = options.interimResults || true;
      recognition.lang = options.language || 'en-US';
      recognition.maxAlternatives = 3; // Get multiple alternatives

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        console.log('Voice recognition started');
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;

          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            console.log('Final transcript:', transcript, 'Confidence:', confidence);
            if (options.onCommand && transcript.trim().length > 0) {
              options.onCommand(transcript.toLowerCase().trim(), confidence || 0.8);
            }
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        
        // Handle different error types
        switch (event.error) {
          case 'no-speech':
            setError('No speech detected. Try again.');
            // Auto-restart after no-speech error
            if (isListening) {
              restartTimeoutRef.current = setTimeout(() => {
                if (recognitionRef.current && isListening) {
                  try {
                    recognitionRef.current.start();
                  } catch (e) {
                    console.error('Failed to restart recognition:', e);
                  }
                }
              }, 1000);
            }
            break;
          case 'audio-capture':
            setError('Microphone not available');
            setIsListening(false);
            break;
          case 'not-allowed':
            setError('Microphone permission denied');
            setIsListening(false);
            break;
          case 'network':
            setError('Network error. Check connection.');
            break;
          default:
            setError(`Error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        console.log('Voice recognition ended');
        
        // Only restart if we're supposed to be listening
        if (isListening) {
          // Auto-restart recognition to keep it continuous
          restartTimeoutRef.current = setTimeout(() => {
            if (recognitionRef.current && isListening) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                console.error('Failed to restart recognition:', e);
                setIsListening(false);
              }
            }
          }, 500);
        } else {
          setIsListening(false);
        }
      };
    }

    return () => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [options, isListening]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setError(null);
      setTranscript('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error('Failed to start recognition:', e);
        setError('Failed to start voice recognition');
      }
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return {
    isListening,
    isSupported,
    transcript,
    error,
    startListening,
    stopListening,
    toggleListening
  };
};