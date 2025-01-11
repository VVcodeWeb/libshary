'use client';
import useMediaQuery from '@web/hooks/useMediaQuery';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';

const lightMode = 'light';
const darkMode = 'dark';

type ThemeContextType = {
  theme: string;
  toggleTheme: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isDarkModeEnabled = useMediaQuery('(prefers-color-scheme:dark)');
  const [theme, setTheme] = useState<string>(
    isDarkModeEnabled ? darkMode : lightMode,
  );

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    setTheme(isDarkModeEnabled ? darkMode : lightMode);
  }, [isDarkModeEnabled]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightMode ? darkMode : lightMode));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
