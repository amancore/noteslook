import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { formateDate } from "@/lib/storage";
import { Note } from "@/lib/types";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface NoteViewProps {
	note: Note;
	onEdit: () => void;
}

export default function NoteView({ note, onEdit }: NoteViewProps) {
	return (
		<Card className="flex flex-col h-[calc(99vh-99px)]">
			<CardHeader>
				<CardTitle>{note.title}</CardTitle>
				<p className="text-sm text-muted-foreground">
					{formateDate(note.createdAt)}
				</p>
			</CardHeader>
			<CardContent className="flex-1 min-h-0">
				<ScrollArea className="h-full">
					<p className="text whitespace-pre-wrap">{note.content}</p>
				</ScrollArea>
			</CardContent>
			<CardFooter className="flex justify-end">
				<Button variant="outline" onClick={onEdit}>
					Edit Note
				</Button>
			</CardFooter>
		</Card>
	);
}
