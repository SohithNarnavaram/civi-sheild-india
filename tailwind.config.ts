
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// CIVI-SHIELD specific colors
				emergency: {
					DEFAULT: '#FF4C4C',
					light: '#FF7A7A',
					dark: '#E73C3C'
				},
				medical: {
					DEFAULT: '#28C76F',
					light: '#4FD683',
					dark: '#1E8F4F'
				},
				disaster: {
					DEFAULT: '#FFB800',
					light: '#FFC933',
					dark: '#E6A600'
				},
				navy: {
					DEFAULT: '#1E2A38',
					light: '#2C3E50',
					dark: '#0F1419'
				}
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'poppins': ['Poppins', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				},
				'wave': {
					'0%, 100%': { transform: 'scaleY(0.5)' },
					'50%': { transform: 'scaleY(1.5)' }
				},
				'pulse-emergency': {
					'0%, 100%': { 
						backgroundColor: '#FF4C4C',
						transform: 'scale(1)'
					},
					'50%': { 
						backgroundColor: '#FF7A7A',
						transform: 'scale(1.05)'
					}
				},
				'progressBar': {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'wave': 'wave 1s ease-in-out infinite',
				'pulse-emergency': 'pulse-emergency 2s ease-in-out infinite',
				'progress-bar': 'progressBar 5s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
