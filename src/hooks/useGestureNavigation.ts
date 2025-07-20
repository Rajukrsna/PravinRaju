// Create: src/hooks/useGestureNavigation.ts
import { useState, useCallback } from 'react';

export const useGestureNavigation = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const sections = ['home', 'about', 'skills', 'projects', 'github', 'contact'];
  
  const navigateToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const navigateToNext = useCallback(() => {
    const nextIndex = Math.min(currentSection + 1, sections.length - 1);
    setCurrentSection(nextIndex);
    navigateToSection(sections[nextIndex]);
  }, [currentSection, navigateToSection, sections]);

  const navigateToPrevious = useCallback(() => {
    const prevIndex = Math.max(currentSection - 1, 0);
    setCurrentSection(prevIndex);
    navigateToSection(sections[prevIndex]);
  }, [currentSection, navigateToSection, sections]);

  const handleSwipeLeft = useCallback(() => {
    navigateToNext();
  }, [navigateToNext]);

  const handleSwipeRight = useCallback(() => {
    navigateToPrevious();
  }, [navigateToPrevious]);

  return {
    currentSection,
    handleSwipeLeft,
    handleSwipeRight,
    navigateToSection,
    sections
  };
};