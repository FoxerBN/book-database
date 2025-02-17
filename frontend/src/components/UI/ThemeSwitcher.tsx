// src/components/ThemeSwitcher.tsx
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeSwitcher: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { theme, setTheme } = themeContext;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as "light" | "dark" | "brown");
  };

  return (
    <select
      value={theme}
      onChange={handleChange}
      style={{ backgroundColor: "var(--nav-bg-color)", color: "var(--text-color)" }}
      className="bg-gray-700 text-white p-1 rounded focus:outline-none"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="brown">Brown</option>
    </select>
  );
};

export default ThemeSwitcher;
