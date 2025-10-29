/**
 * ============================================
 * LANDING THEME MANAGEMENT
 * ============================================
 * 
 * Handles theme state persistence and synchronization across landing page.
 * Ensures theme preference is maintained across sessions and properly
 * applied to all visual components.
 */

const THEME_STORAGE_KEY = 'agri_advisory_theme_preference';

/**
 * Initialize theme from localStorage or system preference
 */
export function initTheme() {
  // Check saved preference
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  
  if (savedTheme) {
    applyTheme(savedTheme);
    return savedTheme;
  }
  
  // Check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const systemTheme = prefersDark ? 'dark' : 'light';
  
  applyTheme(systemTheme);
  return systemTheme;
}

/**
 * Apply theme to document
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

/**
 * Get current theme
 */
export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Only auto-switch if user hasn't set a preference
  if (!localStorage.getItem(THEME_STORAGE_KEY)) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});
