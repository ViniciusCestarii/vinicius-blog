/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: ({ theme }: any) => ({
        sky: {
          css: {
            '--tw-prose-body': theme('colors.green[800]'),
            '--tw-prose-headings': theme('colors.green[700]'),
            '--tw-prose-lead': theme('colors.green[700]'),
            '--tw-prose-links': theme('colors.green[900]'),
            '--tw-prose-bold': theme('colors.green[900]'),
            '--tw-prose-counters': theme('colors.green[600]'),
            '--tw-prose-bullets': theme('colors.green[400]'),
            '--tw-prose-hr': theme('colors.green[300]'),
            '--tw-prose-quotes': theme('colors.green[900]'),
            '--tw-prose-quote-borders': theme('colors.green[300]'),
            '--tw-prose-captions': theme('colors.green[700]'),
            '--tw-prose-code': theme('colors.green[900]'),
            '--tw-prose-pre-code': theme('colors.green[100]'),
            '--tw-prose-pre-bg': theme('colors.green[900]'),
            '--tw-prose-th-borders': theme('colors.green[300]'),
            '--tw-prose-td-borders': theme('colors.green[200]'),
            '--tw-prose-invert-body': theme('colors.green[200]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.green[300]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.green[400]'),
            '--tw-prose-invert-bullets': theme('colors.green[600]'),
            '--tw-prose-invert-hr': theme('colors.green[700]'),
            '--tw-prose-invert-quotes': theme('colors.green[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.green[700]'),
            '--tw-prose-invert-captions': theme('colors.green[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.green[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.green[600]'),
            '--tw-prose-invert-td-borders': theme('colors.green[700]'),
          },
        },
      }),
      screens: {
        sm: '40em',
        md: '48em',
        lg: '64em',
        xl: '80em',
      },
      size: {
        icon: '1.2rem',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        'geist-sans': 'var(--font-geist-sans)',
        'geist-mono': 'var(--font-geist-mono)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      minHeight: {
        main: 'calc(100vh - 3.75rem)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
export default config
