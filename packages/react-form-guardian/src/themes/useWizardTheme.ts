import { useState, useCallback } from 'react';
import { WizardTheme, ThemeMode } from './types';
import { lightTheme, darkTheme } from './defaultThemes';

interface UseWizardThemeProps {
  initialTheme?: WizardTheme;
  mode?: ThemeMode;
}

export const useWizardTheme = ({ 
  initialTheme,
  mode = 'light'
}: UseWizardThemeProps = {}) => {
  const [currentTheme, setCurrentTheme] = useState<WizardTheme>(() => {
    if (initialTheme) return initialTheme;
    return mode === 'dark' ? darkTheme : lightTheme;
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>(mode);

  const toggleTheme = useCallback(() => {
    setThemeMode(prev => {
      const newMode = prev === 'dark' ? 'light' : 'dark';
      setCurrentTheme(newMode === 'dark' ? darkTheme : lightTheme);
      return newMode;
    });
  }, []);

  const updateTheme = useCallback((newTheme: Partial<WizardTheme>) => {
    setCurrentTheme(prev => ({
      ...prev,
      ...newTheme
    }));
    setThemeMode('custom');
  }, []);

  return {
    theme: currentTheme,
    themeMode,
    toggleTheme,
    updateTheme
  };
}; 