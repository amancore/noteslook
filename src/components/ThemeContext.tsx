"use client";
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";

export type Theme = "light" | "dark";
export type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined
);

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
	return ctx;
}

function getInitialTheme(): Theme {
	if (typeof window !== "undefined") {
		const stored = localStorage.getItem("theme");
		if (stored === "light" || stored === "dark") return stored as Theme;
		if (window.matchMedia("(prefers-color-scheme: dark)").matches)
			return "dark";
	}
	return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
