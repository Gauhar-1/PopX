import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        // PopX Palette
        'popx-bg': '#F9FAFB',
        'popx-heading': '#111827',
        'popx-paragraph': '#6B7280',
        'popx-primary': '#7C3AED',
        'popx-primary-hover': '#6D28D9', // Assuming a darker shade for hover
        'popx-secondary': '#C4B5FD',
        'popx-secondary-text': '#1F2937',
        'popx-gray': '#E5E7EB', // borders, disabled bg
        'popx-label': '#8B5CF6',
        'popx-gray-disabled-text': '#9CA3AF',
        'popx-gray-light-disabled': '#D1D5DB', // for signin button disabled
        'popx-header-text': '#374151', // also bio text
        'popx-white': '#FFFFFF',
        'popx-black': '#000000',


        // ShadCN UI theme (can be overridden or extended by PopX)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))', // border color for inputs by default
        ring: 'hsl(var(--ring))', // focus ring
      },
  		borderRadius: {
        lg: '12px', // PopX card radius
        md: '8px',  // PopX button & input radius
        sm: '6px',
        DEFAULT: '8px',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
      borderWidth: {
        '1.5': '1.5px',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
