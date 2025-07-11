import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface HeaderProps {
	onNewNote: () => void;
}

export default function Header({ onNewNote }: HeaderProps) {
	return (
		<header className="border-b border-white p-4 bg-black">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold text-white">Notes Look</h1>
				<div className="flex gap-3">
					<Button
						type="button"
						variant="outline"
						onClick={onNewNote}
						size="lg"
						className="cursor-pointer border-white text-white bg-black hover:bg-white hover:text-black">
						<Plus className="h-4 w-4" />
						New Note
					</Button>
				</div>
			</div>
		</header>
	);
}
  