/** @format */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/globals.css',
  ],
  theme: {
    screens: {
      s: '0px',
      // => @media (min-width: 375px) { ... }

      xs: '375px',
      // => @media (min-width: 375px) { ... }

      sd: '480px',
      // => @media (min-width: 480px) { ... }

      sdm: '575px',
      // => @media (min-width: 575px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      xxl: '1536px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      backgroundImage: {
        gradient:
          'linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)',
      },
      animation: {
        opacity: 'opacity 0.25s ease-in-out',
        appearFromRight: 'appearFromRight 300ms ease-in-out',
        wiggle: 'wiggle 1.5s ease-in-out infinite',
        popup: 'popup 0.25s ease-in-out',
        shimmer: 'shimmer 3s ease-out infinite alternate',
      },
      keyframes: {
        opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        appearFromRight: {
          '0%': { opacity: 0.3, transform: 'translate(15%, 0px);' },
          '100%': { opacity: 1, transform: 'translate(0);' },
        },
        wiggle: {
          '0%, 20%, 80%, 100%': {
            transform: 'rotate(0deg)',
          },
          '30%, 60%': {
            transform: 'rotate(-2deg)',
          },
          '40%, 70%': {
            transform: 'rotate(2deg)',
          },
          '45%': {
            transform: 'rotate(-4deg)',
          },
          '55%': {
            transform: 'rotate(4deg)',
          },
        },
        popup: {
          '0%': { transform: 'scale(0.8)', opacity: 0.8 },
          '50%': { transform: 'scale(1.1)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '0 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
