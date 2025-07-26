/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      // for App Router
    "./pages/**/*.{js,ts,jsx,tsx}",    // if using Pages Router
    "./components/**/*.{js,ts,jsx,tsx}" // reusable components
  ],
	theme: {
		extend: {
			colors: {
				'blue-main': '#0DA4F5',
				gray1: '#9C9C9C',
				gray2: '#1D1E2D80',
				gray3: '#636363',
				gray4: '#88888880',
				gray5: '#D9D9D9',
				gray6: '#464646',
				gray7: '#272727',
				gray8: '#7B7B7B',
				gray9: '#1B1B1B',
				gray10: '#8F8F8F',
				gray11: '#2F2E2E',
				gray12: '#F7F8FA',
				gray13: '#696969',
				gray14: '#555555',
				black1: '#101010',
				black2: '#2A2C2E',
				black3: '#0F1011',
				black4: '#1E1E1E',
				blue1: '#0054D3',
				blue2: '#0065FF',
				blue3: '#029EF5',
				blue4: "#0079A7",
				green1: "#00FF1A",
				green2: "#0BA91B",
				yellow1: "#FAD022",
				purple1: "#8A38F5",
				purple2: "#9747FF",
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
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				'10': '10px',
				'20': '20px',
				'100': '100px',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontSize:{
				17: "17px",
				25: "25px",
				60:"60px",
			},
			screens:{
				s:"440px",
				"2xl":"1400px"
			},
			minWidth:{


			},
			padding: {
				'30': '30px',
				'50': '50px',
				'70': '70px',
				'100': '100px',
				'130': '130px',
				'150': '150px',
				'200': '200px'
			},
			margin: {
				'25': '25px',
				'30': '30px',
				'50': '50px',
				'100': '100px',
				'150': '150px',
				'200': '200px',
				'300': '300px'
			},
			width: {
				'50': '50px',
				'100': '100px',
				'200': '200px',
				'250': '250px',
				'300': '300px',
				'400': '400px',
				'650': '650px',
				'700': '700px'
			},
			height: {
				'50': '50px',
				'90': '90px',
				'100': '100px',
				'300': '300px',
				'400': '400px',
				'650': '650px'
			},
			gap: {
				'50': '50px',
				'70': '70px'
			},
			blur: {
				'100': '100px',
				'150': '150px',
				'200': '200px',
				'250': '250px'
			}
		}
	},
  plugins: [require("tailwindcss-animate")],
}
