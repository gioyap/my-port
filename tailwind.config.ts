import type { Config } from "tailwindcss";

export default {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			typography: {
				h1: {
					fontSize: "2.25rem", // 36px
					fontWeight: "700", // Bold
					lineHeight: "1.2", // Tight line spacing
				},
				h2: {
					fontSize: "1.875rem", // 30px
					fontWeight: "600", // Semi-bold
					lineHeight: "1.3",
				},
				h3: {
					fontSize: "1.5rem", // 24px
					fontWeight: "500", // Medium weight
					lineHeight: "1.4",
				},
				h4: {
					fontSize: "1.25rem", // 20px
					fontWeight: "400", // Regular weight
					lineHeight: "1.5",
				},
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
} satisfies Config;
