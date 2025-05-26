
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(0 0% 85%)',
				input: 'hsl(0 0% 90%)',
				ring: 'hsl(0 0% 0%)',
				background: 'hsl(0 0% 100%)',
				foreground: 'hsl(0 0% 0%)',
				primary: {
					DEFAULT: 'hsl(0 0% 0%)',
					foreground: 'hsl(0 0% 100%)'
				},
				secondary: {
					DEFAULT: 'hsl(0 0% 95%)',
					foreground: 'hsl(0 0% 10%)'
				},
				destructive: {
					DEFAULT: 'hsl(0 0% 0%)',
					foreground: 'hsl(0 0% 100%)'
				},
				muted: {
					DEFAULT: 'hsl(0 0% 96%)',
					foreground: 'hsl(0 0% 40%)'
				},
				accent: {
					DEFAULT: 'hsl(0 0% 90%)',
					foreground: 'hsl(0 0% 10%)'
				},
				popover: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(0 0% 0%)'
				},
				card: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(0 0% 0%)'
				},
				gray: {
					50: 'hsl(0 0% 98%)',
					100: 'hsl(0 0% 95%)',
					200: 'hsl(0 0% 90%)',
					300: 'hsl(0 0% 80%)',
					400: 'hsl(0 0% 60%)',
					500: 'hsl(0 0% 40%)',
					600: 'hsl(0 0% 30%)',
					700: 'hsl(0 0% 20%)',
					800: 'hsl(0 0% 10%)',
					900: 'hsl(0 0% 5%)',
				},
				// Visa brand colors
				'visa-blue': 'hsl(221, 83%, 53%)',
				'visa-navy': 'hsl(221, 100%, 25%)',
				'visa-light': 'hsl(221, 100%, 97%)',
				'visa-gold': 'hsl(45, 100%, 50%)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				serif: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			keyframes: {
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					from: { opacity: '0', transform: 'translateX(-10px)' },
					to: { opacity: '1', transform: 'translateX(0)' }
				}
			},
			animation: {
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'slide-in': 'slide-in 0.3s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
