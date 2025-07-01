module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	// ...other config
};
module.exports = {
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				accent: "var(--accent)",
				"accent-foreground": "var(--accent-foreground)",
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				mono: ["Roboto Mono", "monospace"],
			},
		},
	},
};