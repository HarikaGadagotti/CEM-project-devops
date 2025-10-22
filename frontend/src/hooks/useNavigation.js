// hooks/useNavigation.js
import { useState, useEffect, useCallback } from 'react';

export const useNavigation = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const sections = ["home", "events", "host", "manage", "clubs"];

  const navigateTo = useCallback((section) => {
    if (sections.includes(section)) {
      window.location.hash = section;
      setCurrentSection(section);
    }
  }, [sections]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (sections.includes(hash)) {
        setCurrentSection(hash);
      }
    };

    // Initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [sections]);

  return {
    currentSection,
    navigateTo,
    sections
  };
};