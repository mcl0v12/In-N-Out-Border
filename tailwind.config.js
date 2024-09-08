// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './public/**/*.html',
    './assets/**/*.css',
  ],
    corePlugins: {
      preflight: false, // Deaktiviert die Standard-Basisstile von Tailwind
      transitionTimingFunction: false, 
    },
    theme: {
      extend: {
        colors: {
          'white': 'var(--white)',
          'black': 'var(--black)',
          'gray-100': 'var(--gray-100)',
          'gray-90': 'var(--gray-90)',
          'gray-80': 'var(--gray-80)',
          'gray-70': 'var(--gray-70)',
          'gray-60': 'var(--gray-60)',
          'gray-50': 'var(--gray-50)',
          'gray-40': 'var(--gray-40)',
          'gray-30': 'var(--gray-30)',
          'gray-20': 'var(--gray-20)',
          'gray-10': 'var(--gray-10)',
          'theme-color': 'var(--theme-color)',
          'white-color': 'var(--white)',
          'theme-bg': 'var(--theme-bg)',
          'semi-transparent': 'hsla(0, 0%, 98%, .1)',
        },         
        maxWidth: {
          base: 'var(--base-width)',
        },
        backgroundImage: {
          'gradient-shadow-top': 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0) 100%)',
        },
        padding: {
          'header': 'var(--header-start-height)', // Fügt py-header als Tailwind-Utility hinzu
        },
        spacing: {
          '9': '2.25rem', // 36px
          '10': '2.5rem',  // 40px
          '11': '2.75rem', // 44px
          '12': '3rem',    // 48px
          '14': '3.5rem',  // 56px
          '16': '4rem',    // 64px
          '18': '4.5rem',  // 72px
          '20': '5rem',    // 80px
          '24': '6rem',    // 96px
          '28': '7rem',    // 112px
          '32': '8rem',    // 128px
          '36': '9rem',    // 144px
          '40': '10rem',   // 160px
        },
        transform: {
          '3d-origin': 'translate3D(0, 0, 0)',
        },
        inset: {
          '0': '0%',
          '1/4': '25%',
          '1/2': '50%',
          '3/4': '75%',
          'full': '100%',
          '-1/4': '-25%',
          '-1/2': '-50%',
          '-3/4': '-75%',
          '-full': '-100%',
        },
        zIndex: {
          'header': '900',
          '1000': '1000',
        },
        screens: {
          'hr': { 
            'raw': '(orientation: landscape)',
          },
          'vt': { 
            'raw': '(orientation: portrait)',
          },
          'xs': { 
            'raw': '(max-width: 375px)',
          },
          'md': { 
            'raw': '(min-width: 768px)',
          },
          'vt-md': { 
            'raw': '(min-width: 768px) and (orientation: portrait)',
          },
          'lg': { 
            'raw': '(min-width: 1024px)',
          },
          'hr-lg': { 
            'raw': '(min-width: 1024px) and (orientation: landscape)',
          },
          'xl': { 
            'raw': '(min-width: 1280px)',
          },
          'hr-xl': { 
            'raw': '(min-width: 1280px) and (orientation: landscape)',
          },
        },
      },
    },
    plugins: [
      function ({ addUtilities }) {
        const newUtilities = {
          '.px-base': {
            paddingLeft: 'var(--padding-x)',
            paddingRight: 'var(--padding-x)',
          },
          '.flex-center': {
            alignItems: 'center',
            justifyContent: 'center',
          },
          '.bg-overlay': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          '.text-shadow': {
            'text-shadow': '1px 1px 2px black',
          },
          '.ease': {
            'transition-timing-function': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          },
          '.transition-height': {
            'transition-property': 'height',
          },
          '.transition-background': {
            'transition-property': 'background',
          },
          '.transition-filter': {
            'transition-property': 'filter',
          },
          '.transition-transform': {
            'transition-property': 'transform',
          },
          '.transition-color': {
            'transition-property': 'color',
          },
          '.children-h-full > *': {
            height: '100%',
          },
          '.children-w-full > *': {
            width: '100%',
          },
          '.scale-103': {
            transform: 'scale(1.03)',
          },
          '.ease-in-out': {
            'transition-timing-function': 'cubic-bezier(0.42, 0, 0.58, 1)',
          },
          '.ease-out': {
            'transition-timing-function': 'cubic-bezier(0, 0, 0.58, 1)',
          },
          '.ease-in': {
            'transition-timing-function': 'cubic-bezier(0.42, 0, 1, 1)',
          },
        };
  
        addUtilities(newUtilities, ['responsive', 'hover']);
      },
    ],
  };