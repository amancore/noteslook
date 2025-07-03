"use client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";

export type Theme = "dark";
export type ThemeContextType = {
	theme: Theme;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined
);

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
	return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		document.documentElement.classList.add("dark");
	}, []);

	return (
		<ThemeContext.Provider value={{ theme: "dark" }}>
			{children}
		</ThemeContext.Provider>
	);
}
