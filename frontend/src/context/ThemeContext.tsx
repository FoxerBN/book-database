import React, { createContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "brown";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("app-theme") as Theme;
    if (storedTheme) {
      setThemeState(storedTheme);
      updateDocumentTheme(storedTheme);
    }
  }, []);

  const updateDocumentTheme = (theme: Theme) => {
    document.documentElement.classList.remove("theme-dark", "theme-brown");
    if (theme === "dark") document.documentElement.classList.add("theme-dark");
    else if (theme === "brown") document.documentElement.classList.add("theme-brown");
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("app-theme", newTheme);
    updateDocumentTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
