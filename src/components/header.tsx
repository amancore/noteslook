import React from "react";
import { Button } from "./ui/button";
import { Plus, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface HeaderProps {
	onNewNote: () => void;
}

export default function Header({ onNewNote }: HeaderProps) {
	const { theme, toggleTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => setMounted(true), []);

	return (
		<header className="border-b p-4 bg-card">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">Notes Look</h1>
				<div className="flex gap-3">
					<Button variant="outline" onClick={onNewNote} size="lg" className="cursor-pointer">
						<Plus className="h-4 w-4"/>
						New Note
					</Button>
					{mounted && (
						<Button
							onClick={toggleTheme}
							variant="outline"
							size="icon"
							aria-label="Toggle theme">
							{theme === "dark" ? (
								<Sun className="h-6 w-6" />
							) : (
								<Moon className="h-6 w-6" />
							)}
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
