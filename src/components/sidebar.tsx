import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "./empty-state";
import { Note } from "@/lib/types";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { formateDate } from "@/lib/storage";
import { ScrollArea } from "./ui/scroll-area";
interface SideBarProps {
	notes: Note[];
	onSelectNote: (note: Note) => void;
	createNewNote: () => void;
	onDeleteNote: (id: string) => void;
	activeNoteId?: string;
}
export default function SideBar({
	notes,
	onSelectNote,
	createNewNote,
	onDeleteNote,
	activeNoteId,
}: SideBarProps) {
	return (
		<Card className="flex flex-col border rounded-lg bg-white shadow-md h-full">
			<CardHeader>
				<CardTitle>My Notes</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 min-h-0">
				{notes.length === 0 ? (
					<EmptyState
						message="No notes yet"
						buttonText="Create your first note"
						onButtonClick={createNewNote}
					/>
				) : (
					<ScrollArea className="max-h-[calc(85vh-85px)] h-full overflow-y-auto ">
						<div>
							{notes.map((note) => (
								<div
									key={note.id}
									onClick={() => onSelectNote(note)}
									className={`p-2 rounded-md cursor-pointer hover:bg-accent transition-colors ${
										activeNoteId === note.id
											? "border border-gray-400 not-even:bg-gray-100 text-black"
											: "border border-gray-400"
									}`}>
									<div className="flex justify-between items-center px-2 py-1 rounded-md">
										<div>
											<h3 className="font-medium">
												{note.title.substring(0, 40)}
												{note.title.length > 40 ? "..." : ""}
											</h3>
											<p className="text-sm text-muted-foreground whitespace-pre-wrap">
												{note.content.substring(0, 40)}
												{note.content.length > 40 ? "..." : ""}
											</p>
											<p className="text-sm text-muted-foreground">
												{formateDate(note.createdAt)}
											</p>
										</div>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer"
											onClick={(e) => {
												e.stopPropagation();
												onDeleteNote(note.id);
											}}>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					</ScrollArea>
				)}
			</CardContent>
		</Card>
	);
}
