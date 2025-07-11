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
		<Card className="flex flex-col border rounded-lg bg-white dark:bg-black dark:text-white shadow-md h-full">
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
					<ScrollArea className="max-h-[calc(85vh-85px)] h-full overflow-y-auto">
						<div className="space-y-2">
							{[...notes]
								.sort(
									(a, b) =>
										new Date(b.createdAt).getTime() -
										new Date(a.createdAt).getTime()
								)
								.map((note) => (
									<div
										key={note.id}
										onClick={() => onSelectNote(note)}
										className={`p-3 rounded-md cursor-pointer hover:bg-accent transition-colors ${
											activeNoteId === note.id
												? "border border-gray-400 bg-gray-900 dark:bg-zinc-800 text-white"
												: "border border-gray-400"
										}`}>
										<div className="flex justify-between items-center px-1 py-1 rounded-md">
											<div>
												<h3 className="font-bold text-l">
													{note.title.substring(0, 20)}
													{note.title.length > 20 ? "..." : ""}
												</h3>
												<p className="text-[0.90rem] mb-1 text-muted-foreground whitespace-pre-wrap">
													{note.content.substring(0, 20)}
													{note.content.length > 20 ? "..." : ""}
												</p>
												<p className="text-[0.75rem] text-muted-foreground">
													{formateDate(note.createdAt)}
												</p>
											</div>
											<Button
												type="button"
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
   