/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Grok-inspired Cyberpunk Palette
        'cyber': {
          // Deep charcoal backgrounds (not pure black for comfort)
          'bg-deep': '#0D0D12',
          'bg-dark': '#13131A',
          'bg-surface': '#1A1A24',
          'bg-elevated': '#22222E',
          'bg-hover': '#2A2A38',

          // Neon blue primary (main accent - Grok style)
          'blue': '#00A3FF',
          'blue-light': '#4DC2FF',
          'blue-dark': '#0088CC',
          'blue-glow': 'rgba(0, 163, 255, 0.5)',

          // Golden neon secondary (CTAs & highlights)
          'gold': '#FFB800',
          'gold-light': '#FFD24D',
          'gold-dark': '#CC9300',
          'gold-glow': 'rgba(255, 184, 0, 0.5)',

          // Status colors
          'green': '#00FF88',
          'red': '#FF3366',
          'purple': '#B366FF',
          'cyan': '#00FFFF',
          'orange': '#FF9933',
        },

        // Legacy support (keep existing)
        'dark': {
          900: '#0D0D12',
          800: '#13131A',
          700: '#1A1A24',
          600: '#22222E',
          500: '#2A2A38',
          400: '#3F3F4F',
        },
        'cosmic': {
          purple: '#B366FF',
          blue: '#00A3FF',
          cyan: '#00FFFF',
          pink: '#EC4899',
          orange: '#FF9933',
        },
        'accent': {
          primary: '#00A3FF',
          secondary: '#FFB800',
          success: '#00FF88',
          warning: '#FF9933',
          danger: '#FF3366',
          critical: '#DC2626',
        },
        'text': {
          primary: '#F5F5F7',
          secondary: '#B4B4C0',
          tertiary: '#9797A7',
          muted: '#7A7A8E',
          disabled: '#5D5D6F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        'cyber': '0.75rem',
      },
      backgroundImage: {
        // Grok-style gradients
        'grok-dark': 'linear-gradient(135deg, #0D0D12 0%, #1A1A24 50%, #22222E 100%)',
        'neon-blue': 'linear-gradient(135deg, #00A3FF 0%, #4DC2FF 100%)',
        'neon-gold': 'linear-gradient(135deg, #FFB800 0%, #FFD24D 100%)',
        'cyber-glow': 'linear-gradient(135deg, #00FFFF 0%, #B366FF 100%)',
        'matrix-grid': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 163, 255, 0.03) 2px, rgba(0, 163, 255, 0.03) 4px)',

        // Legacy support
        'cosmic-gradient': 'linear-gradient(135deg, #0D0D12 0%, #1A1A24 50%, #22222E 100%)',
        'purple-gradient': 'linear-gradient(135deg, #B366FF 0%, #00A3FF 100%)',
        'cyber-gradient': 'linear-gradient(135deg, #00FFFF 0%, #B366FF 100%)',
        'solar-gradient': 'linear-gradient(135deg, #FF9933 0%, #EC4899 100%)',
        'aurora': 'linear-gradient(135deg, #B366FF 0%, #00A3FF 50%, #00FFFF 100%)',
      },
      boxShadow: {
        // Grok-style neon glows
        'neon-blue-sm': '0 0 10px rgba(0, 163, 255, 0.3)',
        'neon-blue': '0 0 20px rgba(0, 163, 255, 0.5)',
        'neon-blue-lg': '0 0 30px rgba(0, 163, 255, 0.7)',
        'neon-gold-sm': '0 0 10px rgba(255, 184, 0, 0.3)',
        'neon-gold': '0 0 20px rgba(255, 184, 0, 0.5)',
        'neon-gold-lg': '0 0 30px rgba(255, 184, 0, 0.7)',
        'cyber-glow': '0 0 15px rgba(0, 255, 255, 0.4)',
        'purple-glow': '0 0 20px rgba(179, 102, 255, 0.5)',

        // Card shadows
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 15px -3px rgba(0, 163, 255, 0.3), 0 4px 6px -2px rgba(0, 163, 255, 0.2)',
        'card-gold-hover': '0 10px 15px -3px rgba(255, 184, 0, 0.3), 0 4px 6px -2px rgba(255, 184, 0, 0.2)',

        // Legacy support
        'glow-sm': '0 0 10px rgba(0, 163, 255, 0.3)',
        'glow-md': '0 0 20px rgba(0, 163, 255, 0.4)',
        'glow-lg': '0 0 30px rgba(0, 163, 255, 0.5)',
        'cyber': '0 0 15px rgba(0, 255, 255, 0.4)',
        'neon': '0 0 20px rgba(255, 184, 0, 0.5)',
        'card-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'card-hover-dark': '0 10px 15px -3px rgba(0, 163, 255, 0.3), 0 4px 6px -2px rgba(0, 163, 255, 0.2)',
      },
      animation: {
        // Grok-style signature animations
        'scan-line': 'scanLine 3s ease-in-out infinite',
        'matrix-rain': 'matrixRain 20s linear infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',

        // Micro-interactions (150-250ms)
        'fade-in': 'fadeIn 200ms ease-out',
        'fade-in-slow': 'fadeIn 500ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
        'slide-up-slow': 'slideUp 500ms ease-out',
        'slide-down': 'slideDown 200ms ease-out',
        'slide-in-right': 'slideInRight 250ms ease-out',
        'scale-in': 'scaleIn 150ms ease-out',
        'scale-up': 'scaleUp 200ms ease-out',

        // Hover effects
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',

        // Loading states
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        // Signature Grok animations
        scanLine: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        neonPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 163, 255, 0.5)',
            borderColor: 'rgba(0, 163, 255, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(0, 163, 255, 0.9)',
            borderColor: 'rgba(0, 163, 255, 0.9)',
          },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 184, 0, 0.5)' },
          '50%': { boxShadow: '0 0 35px rgba(255, 184, 0, 0.9)' },
        },

        // Micro-interactions
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },

        // Hover effects
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },

        // Loading states
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 163, 255, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 163, 255, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

