(() => {
    'use strict';
  
    const storedTheme = localStorage.getItem('theme');
  
    const getPreferredTheme = () => {
      if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
  
    const setTheme = (theme) => {
      document.body.setAttribute('data-bs-theme', theme);
      localStorage.setItem('theme', theme);
    };
  
    setTheme(getPreferredTheme());
  
    const showActiveTheme = (theme, focus = false) => {
      const themeSwitcher = document.querySelector('#bd-theme');
      if (!themeSwitcher) return;
  
      const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
      if (!btnToActive) return;
  
      document.querySelectorAll('[data-bs-theme-value]').forEach((element) => {
        element.classList.remove('active');
        element.setAttribute('aria-pressed', 'false');
      });
  
      btnToActive.classList.add('active');
      btnToActive.setAttribute('aria-pressed', 'true');
  
      if (focus) themeSwitcher.focus();
    };
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (!['light', 'dark'].includes(localStorage.getItem('theme'))) {
        setTheme(getPreferredTheme());
      }
    });
  
    window.addEventListener('DOMContentLoaded', () => {
      showActiveTheme(getPreferredTheme());
  
      document.querySelectorAll('[data-bs-theme-value]').forEach((toggle) => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value');
          setTheme(theme);
          showActiveTheme(theme, true);
        });
      });
    });
  })();
  