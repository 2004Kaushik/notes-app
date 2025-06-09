// src/lib/theme.js
let currentTheme = localStorage.getItem('theme') || "coffee";
let listener = null;

export const getTheme = () => currentTheme;

export const toggleTheme = () => {
  currentTheme = currentTheme === "coffee" ? "forest" : "coffee";
  localStorage.setItem('theme', currentTheme);
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (listener) listener(currentTheme);
};

export const onThemeChange = (callback) => {
  listener = callback;
  // Initialize theme on first load
  document.documentElement.setAttribute('data-theme', currentTheme);
  callback(currentTheme);
  return () => {
    if (listener === callback) listener = null;
  };
};

export const isDarkTheme = () => currentTheme === "forest";

export const getThemeLabel = () => {
  return currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
};
