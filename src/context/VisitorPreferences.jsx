import React, { createContext, useCallback, useContext, useState } from 'react';

export const THEME_OPTIONS = [
  { id: 'auto', name: 'Automatic', note: 'Let the calendar pick the mood', colours: ['#4c3bee', '#ff7b24', '#347552', '#c4b3dc'] },
  { id: 'original', name: 'The original', note: 'The everyday Cut Room', colours: ['#f5f0e6', '#4c3bee', '#ff5c35'] },
  { id: 'halloween', name: 'Halloween', note: 'After dark. A little spooky.', colours: ['#100d18', '#ff7b24', '#7031c8'] },
  { id: 'christmas', name: 'Christmas', note: 'Pine, lights & a little magic', colours: ['#102d24', '#c83b48', '#f2cd83'] },
  { id: 'birthday', name: 'Birthday', note: 'Cosy colours. Happy little doodles.', colours: ['#fff2dc', '#c4b3dc', '#b9cfb5', '#f0cdb5'] },
];

export const isThemeChoice = (value) => THEME_OPTIONS.some(({ id }) => id === value);
const STORAGE_KEY = 'jmm-visitor-theme';
const PreferencesContext = createContext({ theme: 'auto', setTheme: () => {}, panel: null, openPanel: () => {}, closePanel: () => {} });

const readTheme = () => {
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    return isThemeChoice(saved) ? saved : 'auto';
  } catch {
    return 'auto';
  }
};

export const VisitorPreferencesProvider = ({ children }) => {
  const [theme, updateTheme] = useState(readTheme);
  const [panel, setPanel] = useState(null);
  const setTheme = useCallback((choice) => {
    if (!isThemeChoice(choice)) return;
    updateTheme(choice);
    try { window.sessionStorage.setItem(STORAGE_KEY, choice); } catch { /* Settings still work when storage is unavailable. */ }
  }, []);
  const openPanel = useCallback((choice) => {
    if (choice === 'theme' || choice === 'language') setPanel(choice);
  }, []);
  const closePanel = useCallback(() => setPanel(null), []);

  return (
    <PreferencesContext.Provider value={{ theme, setTheme, panel, openPanel, closePanel }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const useVisitorPreferences = () => useContext(PreferencesContext);
