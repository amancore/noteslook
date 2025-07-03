module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded', 'dark'],
  },
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				accent: "var(--accent)",
				"accent-foreground": "var(--accent-foreground)",
				card: "var(--card)",
				"muted-foreground": "var(--muted-foreground)",
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				mono: ["Roboto Mono", "monospace"],
			},
		},
	},
};
